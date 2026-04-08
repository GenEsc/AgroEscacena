const cache = new Map()

async function translateChunk(text) {
  if (cache.has(text)) return cache.get(text)

  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|es`
    )
    if (!res.ok) return text
    const data = await res.json()
    const translated = data.responseData?.translatedText
    if (translated && translated.toLowerCase() !== text.toLowerCase()) {
      cache.set(text, translated)
      return translated
    }
    return text
  } catch {
    return text
  }
}

function splitIntoChunks(text, maxLen = 450) {
  const sentences = text.match(/[^.!?]+[.!?]+\s*/g) || [text]
  const chunks = []
  let current = ''

  for (const sentence of sentences) {
    if ((current + sentence).length > maxLen && current) {
      chunks.push(current.trim())
      current = ''
    }
    current += sentence
  }
  if (current.trim()) chunks.push(current.trim())
  return chunks
}

export async function translateToEs(text) {
  if (!text || typeof text !== 'string') return text
  const trimmed = text.trim()
  if (!trimmed) return text
  if (cache.has(trimmed)) return cache.get(trimmed)

  if (trimmed.length <= 450) return translateChunk(trimmed)

  const chunks = splitIntoChunks(trimmed)
  const translated = await Promise.all(chunks.map(translateChunk))
  const result = translated.join(' ')
  cache.set(trimmed, result)
  return result
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
