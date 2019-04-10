import NodeCache from "node-cache";
const OTPCache = new NodeCache({ stdTTL: 6000, checkperiod: 120 });

export function saveToCache(key: string, value: string): boolean {
  return OTPCache.set(key, value);
}

export function getValueFromCache(key: string): string {
  return OTPCache.get(key);
}

export function deleteValueFromCache(key: string) {
  OTPCache.del(key);
}
