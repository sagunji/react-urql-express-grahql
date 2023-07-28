export const invalidateFields = (cache, fields) => {
  const key = 'Query';
  for (const field of cache.inspectFields('Query')) {
    if (fields.includes(field.fieldName)) {
      cache.invalidate(key, field.fieldKey);
    }
  }
}