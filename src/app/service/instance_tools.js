/*
  Copyright (C) 2022 Suwings(https://github.com/Suwings)

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.

  This program is distributed in the hope that it will be useful,
  but WITHOUT ANY WARRANTY; without even the implied warranty of
  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
  GNU General Public License for more details.
  

  版权所有 (C) 2022 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
*/

import { INSTANCE_TYPE_TRANSLATION } from "./instance_type";

/**
 * @param {number} statusCode
 * @return {string}
 */
export function statusCodeToText(statusCode) {
  let statusText = "--";
  if (statusCode == -1) statusText = "忙碌";
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
