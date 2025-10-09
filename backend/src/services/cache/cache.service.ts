import { createServiceLogger } from "../../utils/logger.util";
import getCacheAdapter from "../../lib/cache/cache.factory";
import cacheConfig, { getPrefixedKey } from "../../config/cache.config";
import { serialize, deserialize } from "../../utils/cache.util";

const logger = createServiceLogger("CacheService");

const adapter = getCacheAdapter();

/**
 * getOrSet: read from cache, otherwise call fetcher(), set and return.
 * TTL defaults to cacheConfig.defaultTTLSeconds
 */
export async function getOrSet<T>(
  key: string,
  fetcher: () => Promise<T>,
  ttlSeconds?: number
): Promise<T> {
  const prefixed = getPrefixedKey(key);

  try {
    const raw = await adapter.getRaw(prefixed);
    if (raw) {
      const parsed = deserialize<T>(raw);
      if (parsed !== null) return parsed;
    }
  } catch (err) {
    logger.error("cache get failed", { key, err });
    // fall through to fetcher
  }

  const value = await fetcher();

  try {
    const toStore = serialize(value);
    await adapter.setRaw(
      prefixed,
      toStore,
      ttlSeconds ?? cacheConfig.defaultTTLSeconds
    );
  } catch (err) {
    logger.error("cache set failed", { key, err });
  }

  return value;
}

export async function del(key: string): Promise<boolean> {
  const prefixed = getPrefixedKey(key);
  try {
    return await adapter.del(prefixed);
  } catch (err) {
    logger.error("cache del failed", { key, err });
    return false;
  }
}

// Simple versioning strategy: store version key and include it in cache keys when needed
export const versionKey = (name: string) => `version:${name}`;

export async function bumpVersion(name: string): Promise<number | null> {
  const key = getPrefixedKey(versionKey(name));
  try {
    const v = await adapter.incr(key);
    return v;
  } catch (err) {
    logger.error("bumpVersion failed", { name, err });
    return null;
  }
}

export async function getVersion(name: string): Promise<number> {
  const key = getPrefixedKey(versionKey(name));
  try {
    const v = await adapter.incr(key); // incr returns number; but if not set, this will set to 1
    if (v === null) return 0;
    return v;
  } catch (err) {
    logger.error("getVersion failed", { name, err });
    return 0;
  }
}

export default {
  getOrSet,
  del,
  bumpVersion,
  getVersion,
};
