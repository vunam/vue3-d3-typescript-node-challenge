export const transformPayloadAll = (item: any) => {
  const { name, parent } = item['_fields'][0].properties;

  return { name, parent };
};

export const transformPayloadSingle = (item: any) => {
  const { name, description } = item['_fields'][0].properties;

  return { name, description };
};
