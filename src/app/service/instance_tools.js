/*
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-27 17:17:41
 * @LastEditTime: 2021-08-02 16:13:58
 * @Description:
 */

const PROCESS_TYPE_LIST = {
  TYPE_UNIVERSAL: "通用程序",
  TYPE_WEB_SHELL: "Web Shell",
  TYPE_LOW_PERMISSION: "低权限程序",

  TYPE_MINECRAFT: "MC 通用端",
  TYPE_MINECRAFT_SPIGOT: "MC Spigot",
  TYPE_MINECRAFT_BDS: "MC DBS",
  TYPE_MINECRAFT_PAPER: "MC Paper",
  TYPE_MINECRAFT_FORGE: "MC Forge",
  TYPE_MINECRAFT_PE: "Minecraft PE",
  TYPE_MINECRAFT_BUNGEECORD: "BungeeCord"
};

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
  const text = PROCESS_TYPE_LIST[type];
  if (text) return text;
  else return type;
}

export function processTypeList() {
  return JSON.parse(JSON.stringify(PROCESS_TYPE_LIST));
}
