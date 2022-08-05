// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import { INSTANCE_TYPE_TRANSLATION } from "./instance_type";

/**
 * @param {number} statusCode
 * @return {string}
 */
export function statusCodeToText(statusCode) {
  let statusText = "--";
  if (statusCode == -1) statusText = "维护中";
  if (statusCode == 0) statusText = "未运行";
  if (statusCode == 1) statusText = "停止中";
  if (statusCode == 2) statusText = "启动中";
  if (statusCode == 3) statusText = "正在运行";
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
