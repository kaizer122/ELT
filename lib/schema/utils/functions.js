import graphQLFields from "graphql-fields";

const queryItem = ({
  parentKey,
  field,
  select,
  populate,
  populatedFields,
  populatedParams
}) => {
  let populateItem = null;
  const fields = Object.keys(field);
  if (parentKey.indexOf(".") === -1 && populatedFields.includes(parentKey)) {
    populateItem = { path: parentKey };
    if (populatedParams[parentKey])
      populateItem = {
        path: parentKey,
        ...populatedParams[parentKey]
      };
  }
  if (fields.length > 0) {
    fields.forEach(key => {
      const fullKey = `${parentKey}.${key}`;

      if (populateItem && populatedFields.includes(fullKey)) {
        let item = {
          path: key
        };
        if (populatedParams[fullKey])
          item = {
            path: key,
            ...populatedParams[fullKey]
          };
        if (!populateItem.populate) populateItem.populate = [item];
        else populateItem.populate.push(item);
      }
      queryItem({
        parentKey: `${parentKey}.${key}`,
        field: field[key],
        select,
        populate,
        populatedFields
      });
    });
    // eslint-disable-next-line no-param-reassign
  } else select[parentKey] = 1;
  if (populateItem) populate.push(populateItem);
};

export const getQueryInfos = (
  info,
  populatedFields = [],
  populatedParams = {}
) => {
  const fields = graphQLFields(info);
  const select = {};
  const populate = [];
  Object.keys(fields).forEach(key => {
    queryItem({
      parentKey: key,
      field: fields[key],
      select,
      populate,
      populatedFields,
      populatedParams
    });
  });
  const queryInfos = {
    select
  };
  if (populate.length > 0) queryInfos.populate = populate;
  return queryInfos;
};
