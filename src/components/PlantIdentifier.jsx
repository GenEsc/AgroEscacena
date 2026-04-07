import { useState, useRef } from 'react'
import {
  Leaf,
  Loader2,
  XCircle,
  Camera,
  ExternalLink,
  Sun,
  Thermometer,
  Info,
} from 'lucide-react'
import { t } from '../i18n'
import { translateFields } from '../utils/translate'

export default function PlantIdentifier() {
  const [image, setImage] = useState(null)
  const [preview, setPreview] = useState(null)
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const fileRef = useRef()

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setImage(file)
    setPreview(URL.createObjectURL(file))
    setResult(null)
    setError(null)
  }

  const toText = (val) => {
    if (val == null) return null
    if (typeof val === 'string') return val
    if (typeof val === 'number') return String(val)
    if (typeof val === 'boolean') return val ? 'Yes' : 'No'
    if (Array.isArray(val)) return val.map(toText).filter(Boolean).join(', ') || null
    if (typeof val === 'object') {
      if (val.value != null) return toText(val.value)
      if (val.text != null) return toText(val.text)
      if (val.name != null) return toText(val.name)
      if (val.min != null && val.max != null) return `${val.min}-${val.max}`
      if (val.description != null) return toText(val.description)
      const strValues = Object.values(val).map(toText).filter(Boolean)
      return strValues.length > 0 ? strValues.join(', ') : null
    }
    return String(val)
  }

  const identify = async () => {
    if (!image) return
    setLoading(true)
    setError(null)
    setResult(null)

    try {
      const reader = new FileReader()
      const base64 = await new Promise((resolve) => {
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.readAsDataURL(image)
      })

      const apiKey = import.meta.env.VITE_PLANT_ID_API_KEY
      if (!apiKey) {
        setError(t('plant.errorApiKey'))
        setLoading(false)
        return
      }

      const res = await fetch('https://api.plant.id/v3/identification', {
        method: 'POST',
        headers: {
          'Api-Key': apiKey,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          images: [`data:image/jpeg;base64,${base64}`],
          similar_images: true,
          classification_level: 'species',
        }),
      })

      if (!res.ok) throw new Error('API error')

      const data = await res.json()
      const suggestions = data.result?.classification?.suggestions || []

      if (suggestions.length === 0) {
        setError(t('plant.noResult'))
        return
      }

      const top = suggestions[0]
      const scientificName = top.name

      let details = null
      let translated = {}
      try {
        const detailsRes = await fetch(
          `https://api.plant.id/v3/kb/plants/name_search?q=${encodeURIComponent(scientificName)}&limit=1&lang=es`,
          { headers: { 'Api-Key': apiKey } }
        )
        if (detailsRes.ok) {
          const detailsData = await detailsRes.json()
          const entity = detailsData.entities?.[0]
          if (entity?.access_token) {
            const plantRes = await fetch(
              `https://api.plant.id/v3/kb/plants/${entity.access_token}?details=common_names,url,description,taxonomy,best_light_condition,best_soil_type,toxicity,common_uses&lang=es`,
              { headers: { 'Api-Key': apiKey } }
            )
            if (plantRes.ok) {
              details = await plantRes.json()

              const fieldsToTranslate = {}
              const l = toText(details?.best_light_condition)
              const s = toText(details?.best_soil_type)
              const tx = toText(details?.toxicity)
              const desc = toText(details?.description)
              if (l) fieldsToTranslate.light = l
              if (s) fieldsToTranslate.soil = s
              if (tx) fieldsToTranslate.toxicity = tx
              if (desc) fieldsToTranslate.description = desc

              const rawUses = Array.isArray(details?.common_uses)
                ? details.common_uses.filter((u) => typeof u === 'string')
                : null
              if (rawUses?.length) fieldsToTranslate.uses = rawUses

              translated = await translateFields(fieldsToTranslate)
            }
          }
        }
      } catch (err) {
        console.warn('Plant details/translation error:', err)
      }

      setResult({
        name: top.name,
        probability: top.probability,
        similarImage: top.similar_images?.[0]?.url,
        details,
        translated,
      })
    } catch {
      setError(t('plant.error'))
    } finally {
      setLoading(false)
    }
  }

  const reset = () => {
    setImage(null)
    setPreview(null)
    setResult(null)
    setError(null)
    if (fileRef.current) fileRef.current.value = ''
  }

  const d = result?.details
  const tr = result?.translated || {}

  const commonName = toText(d?.common_names?.[0]) || result?.name
  const description = tr.description || toText(d?.description)
  const light = tr.light || toText(d?.best_light_condition)
  const soil = tr.soil || toText(d?.best_soil_type)
  const toxicity = tr.toxicity || toText(d?.toxicity)
  const uses = Array.isArray(tr.uses)
    ? tr.uses
    : Array.isArray(d?.common_uses)
      ? d.common_uses.filter((u) => typeof u === 'string')
      : null
  const taxonomy =
    d?.taxonomy && typeof d.taxonomy === 'object' ? d.taxonomy : null
  const wikiUrl = typeof d?.url === 'string' ? d.url : null

  return (
    <section id="identificador" className="py-20 md:py-28 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 reveal">
          <h2 className="text-3xl md:text-4xl font-bold text-dark mb-4">
            {t('plant.title')}{' '}
            <span className="text-gold">{t('plant.titleHighlight')}</span>
          </h2>
          <p className="text-dark/60 max-w-2xl mx-auto text-lg">
            {t('plant.subtitle')}
          </p>
        </div>

        <div className="reveal max-w-2xl mx-auto">
          <div className="bg-white border border-dark/10 rounded-sm p-8 shadow-sm">
            {!preview ? (
              <label className="flex flex-col items-center justify-center gap-4 py-16 border-2 border-dashed border-dark/15 rounded-sm cursor-pointer hover:border-gold/40 transition-colors">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center">
                  <Camera className="text-gold" size={28} />
                </div>
                <div className="text-center">
                  <p className="text-dark font-medium mb-1">
                    {t('plant.uploadTitle')}
                  </p>
                  <p className="text-dark/50 text-sm">
                    {t('plant.uploadHint')}
                  </p>
                </div>
                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
            ) : (
              <div className="space-y-6">
                <div className="relative">
                  <img
                    src={preview}
                    alt={t('plant.identifyBtn')}
                    className="w-full h-72 object-cover rounded-sm"
                  />
                  <button
                    onClick={reset}
                    className="absolute top-2 right-2 bg-dark/60 text-white p-1.5 rounded-full hover:bg-dark/80 transition-colors"
                    aria-label={t('plant.removeImage')}
                  >
                    <XCircle size={20} />
                  </button>
                </div>

                {!result && !loading && !error && (
                  <button
                    onClick={identify}
                    className="w-full bg-gold hover:bg-gold-dark text-white font-semibold py-3.5 rounded-sm flex items-center justify-center gap-2 transition-colors"
                  >
                    <Leaf size={20} />
                    {t('plant.identifyBtn')}
                  </button>
                )}

                {loading && (
                  <div className="flex flex-col items-center gap-3 py-8">
                    <Loader2 size={36} className="text-gold animate-spin" />
                    <p className="text-dark/60">{t('plant.loading')}</p>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 text-red-700 p-4 rounded-sm text-center">
                    <p>{error}</p>
                    <button
                      onClick={reset}
                      className="mt-3 text-sm underline hover:no-underline"
                    >
                      {t('plant.tryAnother')}
                    </button>
                  </div>
                )}

                {result && (
                  <div className="space-y-5">
                    <div className="flex items-start gap-4">
                      {result.similarImage && (
                        <img
                          src={result.similarImage}
                          alt={result.name}
                          className="w-24 h-24 rounded-sm object-cover flex-shrink-0"
                        />
                      )}
                      <div>
                        <h3 className="text-xl font-bold text-dark font-heading">
                          {commonName}
                        </h3>
                        <p className="text-gold font-medium italic">
                          {result.name}
                        </p>
                        <p className="text-sm text-dark/50 mt-1">
                          {t('plant.probability')}:{' '}
                          {(result.probability * 100).toFixed(1)}%
                        </p>
                      </div>
                    </div>

                    {taxonomy && (
                      <div className="flex flex-wrap gap-2">
                        {typeof taxonomy.family === 'string' && (
                          <span className="text-xs bg-gold/10 text-gold-dark px-3 py-1 rounded-full font-medium">
                            {t('plant.family')}: {taxonomy.family}
                          </span>
                        )}
                        {typeof taxonomy.genus === 'string' && (
                          <span className="text-xs bg-gold/10 text-gold-dark px-3 py-1 rounded-full font-medium">
                            {t('plant.genus')}: {taxonomy.genus}
                          </span>
                        )}
                        {typeof taxonomy.order === 'string' && (
                          <span className="text-xs bg-dark/5 text-dark/60 px-3 py-1 rounded-full">
                            {t('plant.order')}: {taxonomy.order}
                          </span>
                        )}
                      </div>
                    )}

                    {description && (
                      <div>
                        <h4 className="font-semibold text-dark mb-2 flex items-center gap-2">
                          <Info size={16} className="text-gold" />
                          {t('plant.description')}
                        </h4>
                        <p className="text-dark/70 text-sm leading-relaxed">
                          {description.length > 400
                            ? description.slice(0, 400) + '...'
                            : description}
                        </p>
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {light && (
                        <div className="flex items-start gap-3 bg-amber-50/60 p-3 rounded-sm">
                          <Sun
                            size={18}
                            className="text-amber-500 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold text-dark/70 uppercase tracking-wide">
                              {t('plant.light')}
                            </p>
                            <p className="text-sm text-dark/80">{light}</p>
                          </div>
                        </div>
                      )}
                      {soil && (
                        <div className="flex items-start gap-3 bg-gold/5 p-3 rounded-sm">
                          <Leaf
                            size={18}
                            className="text-gold mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold text-dark/70 uppercase tracking-wide">
                              {t('plant.soil')}
                            </p>
                            <p className="text-sm text-dark/80">{soil}</p>
                          </div>
                        </div>
                      )}
                      {toxicity != null && (
                        <div className="flex items-start gap-3 bg-red-50/60 p-3 rounded-sm">
                          <Thermometer
                            size={18}
                            className="text-red-400 mt-0.5 flex-shrink-0"
                          />
                          <div>
                            <p className="text-xs font-semibold text-dark/70 uppercase tracking-wide">
                              {t('plant.toxicity')}
                            </p>
                            <p className="text-sm text-dark/80">
                              {toxicity || t('plant.nonToxic')}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>

                    {uses && uses.length > 0 && (
                      <div>
                        <h4 className="font-semibold text-dark mb-2 text-sm">
                          {t('plant.commonUses')}
                        </h4>
                        <div className="flex flex-wrap gap-2">
                          {uses.map((use, i) => (
                            <span
                              key={i}
                              className="text-xs bg-dark/5 text-dark/70 px-3 py-1 rounded-full"
                            >
                              {use}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {wikiUrl && (
                      <a
                        href={wikiUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gold/10 hover:bg-gold/20 text-gold-dark font-semibold py-3 rounded-sm transition-colors text-sm"
                      >
                        <ExternalLink size={16} />
                        {t('plant.moreInfo')}
                      </a>
                    )}

                    {!wikiUrl && (
                      <a
                        href={`https://es.wikipedia.org/wiki/${encodeURIComponent(result.name)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-2 w-full bg-gold/10 hover:bg-gold/20 text-gold-dark font-semibold py-3 rounded-sm transition-colors text-sm"
                      >
                        <ExternalLink size={16} />
                        {t('plant.searchWiki')}
                      </a>
                    )}

                    <button
                      onClick={reset}
                      className="w-full border border-gold text-gold hover:bg-gold hover:text-white font-semibold py-3 rounded-sm transition-colors"
                    >
                      {t('plant.identifyAnother')}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
