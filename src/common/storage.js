
export const setStorage = (key, val, type = 1) => {
  if(!key) throw new Error("key值不能为空");
  if(!val) throw new Error("val值不能为空");
  const typeStr = type ? 'localStorage' : 'sessionStorage';
  const storage = window[typeStr];
  if(typeof val === 'object') {
    val = JSON.stringify(val);
  }
  storage.setItem(key, val);
}

export const getStorage = (key, type = 1, isToObject = true) => { 
  const typeStr = type ? 'localStorage' : 'sessionStorage';
  // console.log(key, type, isToObject, typeStr);
  const storage = window[typeStr];
  let val = storage.getItem(key);
  if(!val) return null;
  if(isToObject) {
    return JSON.parse(val);
  }
  return val;
}

export const removeStorage = (key, type = 1) => {
  const typeStr = type ? 'localStorage' : 'sessionStorage';
  const storage = window[typeStr];
  storage.removeItem(key);
}

export const clearStorage = (type = 1) => {
  const typeStr = type ? 'localStorage' : 'sessionStorage';
  const storage = window[typeStr];
  storage.clear();
}