import { Storage, Drivers } from "@ionic/storage";

let storage: Storage | false = false;

export type StoreKeys = 'garbage' | 'bills';

export const createStore = async (name = "__mydb"): Promise<void> => {
  storage = new Storage({
    name,
    driverOrder: [Drivers.IndexedDB, Drivers.LocalStorage]
  });

  await storage.create();
};

export const set = (key: StoreKeys, val: string): void => {
  if (storage) {
    storage.set(key, val);
  }
};

export const get = async (key: StoreKeys): Promise<string | null> => {
  if (storage) {
    const val = await storage.get(key);
    return val;
  }
  return null;
};

export const remove = async (key: StoreKeys): Promise<void> => {
  if (storage) {
    await storage.remove(key);
  }
};

export const clear = async (): Promise<void> => {
  if (storage) {
    await storage.clear();
  }
};

export const setObject = async <T extends Record<string, any> = Record<string, any>>(key: StoreKeys, val: T): Promise<void> => {
  if (storage) {
    const all = await storage.get(key);
    set(key, all);
  }
};

export const removeObject = async (key: StoreKeys): Promise<void> => {
  if (storage) {
    const all = await storage.get(key);
    set(key, all);
  }
};

export const getObject = async <T extends Record<string, any> = Record<string, any>>(key: StoreKeys): Promise<T | null> => {
  if (storage) {
    const all = await storage.get(key);
    return all;
  }
  return null;
};

