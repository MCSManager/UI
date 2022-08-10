// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import { INSTANCE_TYPE_TRANSLATION } from "./instance_type";
import i18n from "../i18n";

/**
 * @param {number} statusCode
 * @return {string}
 */
export function statusCodeToText(statusCode) {
  const $t = i18n.global.t
  let statusText = "--";
  if (statusCode == -1) statusText = $t("home.maintaining");
  if (statusCode == 0) statusText = $t("home.outOfRunning");
  if (statusCode == 1) statusText = $t("home.stopping");
  if (statusCode == 2) statusText = $t("home.starting");
  if (statusCode == 3) statusText = $t("home.running");
  return statusText;
}

export function typeTextToReadableText(type) {
  const text = INSTANCE_TYPE_TRANSLATION[type];
  if (text) return text;
  else return type;
}

export function processTypeList() {
  return JSON.parse(JSON.stringify(INSTANCE_TYPE_TRANSLATION));
}
