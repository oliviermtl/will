import {createSyncStoragePersister} from '@tanstack/query-sync-storage-persister';
import {MMKV} from 'react-native-mmkv';
import {QueryClient} from '@tanstack/react-query';

const storage = new MMKV();

export const clientStorage = {
  setItem: (key, value) => {
    storage.set(key, value);
  },
  getItem: key => {
    const value = storage.getString(key);
    return value === undefined ? null : value;
  },
  removeItem: key => {
    storage.delete(key);
  },
};

export const clientPersister = createSyncStoragePersister({
  storage: clientStorage,
});

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      cacheTime: 86400000, // 24 hours
    },
  },
});

export default queryClient;
