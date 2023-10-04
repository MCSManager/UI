import i18n from "../i18n";

export function isEN() {
  return i18n.global.locale === "en_us";
}

export function isCN() {
  return i18n.global.locale === "zh_cn";
}

export function isRU() {
  return i18n.global.locale === "ru_ru";
}
