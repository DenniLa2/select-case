/**
 *  Created by Denis Abramyan (dennila2@ya.ru, dennila2@gmail.com)
 *  on 10.08.2020
 */
function selectCase(props = {}, keys, { isFx = false } = {}) {
  let entries;

  if (props instanceof Map) {
    entries = [...props];

  } else if (Array.isArray(props)) {
    entries = [...props];

  } else if (props instanceof Object) {
    entries = Object.entries(props);

  } else {
    throw new Error('Props must be an Array, Map or Object');
  }

  const arr = entries.map(([key, value]) => {
    if (['string', 'number'].includes(typeof key)) return [key.split(','), value];
    if (Array.isArray(key)) return [key, value];
    throw new Error(`key mast be Array, String or Number. key: ${key}`);
  });

  const _keys = Array.isArray(keys) ? [...keys] : [keys];
  let value;
  let defaultValue;

  for (let entry of arr) {
    const [entryKeys, entryValue] = entry;
    const isPresent = entryKeys.some(k => _keys.includes(k));
    if (isPresent) {
      value = entryValue;
      break;
    }

    const isDefault = entryKeys.some(k => k === 'default');
    if (isDefault) {
      defaultValue = entryValue;
    }
  }

  if (![null, undefined].includes(value)) return value;
  if (defaultValue) return defaultValue;
  if (isFx) return () => {
  };
  return value;
}

module.exports = { selectCase };
