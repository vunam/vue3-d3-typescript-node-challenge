export const transformPayloadAll = (item: any) => {
  const { name, parent } = item['_fields'][0].properties;

  return { name, parent };
};
