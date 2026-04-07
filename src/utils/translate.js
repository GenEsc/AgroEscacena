const cache = new Map()

export async function translateToEs(text) {
  if (!text || typeof text !== 'string') return text
  const trimmed = text.trim()
  if (!trimmed) return text
  if (cache.has(trimmed)) return cache.get(trimmed)

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=en|es`
    )
    if (!res.ok) return text
    const data = await res.json()
    const translated = data.responseData?.translatedText
    if (translated && translated.toLowerCase() !== trimmed.toLowerCase()) {
      cache.set(trimmed, translated)
      return translated
    }
    return text
  } catch {
    return text
  }
}

export async function translateFields(fields) {
  const entries = Object.entries(fields)
  const translated = await Promise.all(
    entries.map(async ([key, value]) => {
      if (value == null) return [key, value]
      if (Array.isArray(value)) {
        const items = await Promise.all(value.map((v) => translateToEs(v)))
        return [key, items]
      }
      return [key, await translateToEs(value)]
    })
  )
  return Object.fromEntries(translated)
}
