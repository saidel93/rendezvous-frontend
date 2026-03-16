export function buildDictionary(rows: any[]) {
  const dict: Record<string, string> = {}

  if (!rows || rows.length === 0) return dict

  // We assume one translation document per site+locale
  const doc = rows[0]

  Object.keys(doc).forEach((key) => {
    if (
      key !== '_id' &&
      key !== '_type' &&
      key !== '_createdAt' &&
      key !== '_updatedAt' &&
      key !== '_rev'
    ) {
      const value = doc[key]

      if (typeof value === 'string') {
        dict[key] = value
      }
    }
  })

  return dict
}