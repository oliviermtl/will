import {clientStorage} from './clientPersister';

export const getPreferredPoints = async () => {
  const items = clientStorage.getItem('preferredPoints');
  return JSON.parse(items);
};

export const addPreferredPoint = async point => {
  const items = await getPreferredPoints();
  items.push(point);
  clientStorage.setItem('preferredPoints', JSON.stringify(items));
  return items;
};

export const removePreferredPoint = async point => {
  const items = await getPreferredPoints();
  const newItems = items.filter(item => item.name !== point.name);
  clientStorage.setItem('preferredPoints', JSON.stringify(newItems));
  return items;
};
