export function setStorage(StorageKey, Storage) {
  return localStorage.setItem(StorageKey, Storage)
}
export function getStorage(StorageKey) {
  return localStorage.getItem(StorageKey)
}
export function removeStorage(StorageKey) {
  return localStorage.removeItem(StorageKey)
}