import { Storage, Drivers } from "@ionic/storage";

let storage: Storage | false = false;

export const createStore = async (name = "__mydb"): Promise<void> => {
  storage = new Storage({
    name,
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });

  await storage.create();
};

export const set = (key: string, val: string): void => {
  if (storage) {
    storage.set(key, val);
  }
};

export const get = async (key: string): Promise<string | null> => {
  if (storage) {
    const val = await storage.get(key);
    return val;
  }
  return null;
};

export const remove = async (key: string): Promise<void> => {
  if (storage) {
    await storage.remove(key);
  }
};

export const clear = async (): Promise<void> => {
  if (storage) {
    await storage.clear();
  }
};

export const setObject = async <T extends Record<string, any> = Record<string, any>>(key: string, id: string, val: T): Promise<void> => {
  if (storage) {
    const all = await storage.get(key);
    const objIndex = all.findIndex((a: any) => parseInt(a.id) === parseInt(id));

    all[objIndex] = val;
    set(key, all);
  }
};

export const removeObject = async (key: string, id: string): Promise<void> => {
  if (storage) {
    const all = await storage.get(key);
    const objIndex = all.findIndex((a: any) => parseInt(a.id) === parseInt(id));

    all.splice(objIndex, 1);
    set(key, all);
  }
};

export const getObject = async <T extends Record<string, any> = Record<string, any>>(key: string, id: string): Promise<T | null> => {
  if (storage) {
    const all = await storage.get(key);
    const obj = all.filter((a: any) => parseInt(a.id) === parseInt(id))[0];
    return obj;
  }
  return null;
};
