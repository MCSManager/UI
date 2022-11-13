import i18n from "../i18n";

export function isEN() {
  return i18n.global.locale === "en_us";
}

export function isCN() {
  console.log("L:", i18n);
  return i18n.global.locale === "zh_cn";
}
