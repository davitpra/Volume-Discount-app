export const normalize = (views) => {
  const data = [];

  for (const view of views) {
    const existingDataItem = data.find((item) => item.name === view.data.name);

    if (existingDataItem) {
      existingDataItem.data.push({
        key: view.data.key,
        value: view.data.value,
      });
    } else {
      data.push({
        name: view.data.name,
        data: [{ key: view.data.key, value: view.data.value }],
        isComparison: view.data?.isComparison || false,
      });
    }
  }
  return data;
};
