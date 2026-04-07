export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.PLANT_ID_API_KEY
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' })
  }

  const { base64 } = req.body
  if (!base64) {
    return res.status(400).json({ error: 'Missing base64 image' })
  }

  try {
    // 1. Identify the plant
    const identifyRes = await fetch('https://api.plant.id/v3/identification', {
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

    if (!identifyRes.ok) {
      return res.status(identifyRes.status).json({ error: 'Plant ID API error' })
    }

    const data = await identifyRes.json()
    const suggestions = data.result?.classification?.suggestions || []

    if (suggestions.length === 0) {
      return res.json({ suggestions: [] })
    }

    const top = suggestions[0]
    const scientificName = top.name

    // 2. Search for plant details
    let details = null
    try {
      const searchRes = await fetch(
        `https://api.plant.id/v3/kb/plants/name_search?q=${encodeURIComponent(scientificName)}&limit=1&lang=es`,
        { headers: { 'Api-Key': apiKey } }
      )

      if (searchRes.ok) {
        const searchData = await searchRes.json()
        const entity = searchData.entities?.[0]

        if (entity?.access_token) {
          // 3. Get full plant details
          const plantRes = await fetch(
            `https://api.plant.id/v3/kb/plants/${entity.access_token}?details=common_names,url,description,taxonomy,best_light_condition,best_soil_type,toxicity,common_uses&lang=es`,
            { headers: { 'Api-Key': apiKey } }
          )

          if (plantRes.ok) {
            details = await plantRes.json()
          }
        }
      }
    } catch (err) {
      console.warn('Plant details fetch error:', err)
    }

    return res.json({
      suggestions,
      details,
    })
  } catch (err) {
    console.error('Plant identify error:', err)
    return res.status(500).json({ error: 'Internal server error' })
  }
}
