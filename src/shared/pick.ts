// Keys input => ["page", "limit", "sortBy", "sortOrder"]

const pick = <T extends Record<string, unknown>, k extends keyof T>(
  obj: T,
  keys: k[],
): Partial<T> => {
  // Partial<T> => Partial is a typescript types that means we will receive some/partial data from T not everything from T.
  const finalObject: Partial<T> = {};

  for (const key of keys) {
    if (obj && Object.hasOwnProperty.call(obj, key)) {
      finalObject[key] = obj[key];
    }
  }

  return finalObject;
};

export default pick;
