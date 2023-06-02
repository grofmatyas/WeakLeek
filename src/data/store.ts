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

export const setObject = async <T extends Record<string, any> = Record<string, any>>(key: StoreKeys, val: T): Promise<void> => {
  if (storage) {
    storage.set(key, JSON.stringify(val));
  }
};

export const getObject = async <T extends Record<string, any> = Record<string, any>>(key: StoreKeys): Promise<T | null> => {
  if (storage) {
    const all = await storage.get(key);
    return JSON.parse(all);
  }
  return null;
};

