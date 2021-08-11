const storage = sessionStorage;

const getItem = (key: any) => {
  const item: any = storage.getItem(key);
  try {
    return JSON.parse(item);
  } catch (e) {
    return item;
  }
};

const setItem = (key: any, data: any) => {
  if (typeof data === "object") {
    storage.setItem(key, JSON.stringify(data));
  }
};

const clear = () => storage.clear();

const removeItem = (key: any) => {
  storage.removeItem(key);
};

const exportedObject = {
  getItem,
  setItem,
  clear,
  removeItem
}

export default exportedObject;
