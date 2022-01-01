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

import axios from "axios";
import store from "../store";
import { API_USER, API_USER_TOKEN } from "./common";

// 每个请求必须携带 X-Requested-With: XMLHttpRequest 头
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.withCredentials = true;

// axios 请求 token 必须携带
axios.interceptors.request.use(function (config) {
  // console.log("请求:", config);
  if (!config.params) config.params = {};
  config.params.token = store.state.token;
  return config;
});

// 服务响应异常
class ServiceResponseException extends Error {
  constructor(p) {
    super(p);
  }
}

// 针对面板端响应格式封装的 axios 通用请求器
export async function request(p) {
  try {
    const result = await axios.request(p);
    if (result.status != 200) throw new Error("错误的响应代码");
    if (result.data && result.data.data != null) return result.data.data;
    throw new Error("面板响应数据格式异常");
  } catch (error) {
    const response = error.response;
    if (response && response.data && response.data.data != undefined) {
      throw new ServiceResponseException(response.data.data);
    } else {
      throw error;
    }
  }
}

// 获取令牌一次
export async function requestToken() {
  // 请求令牌
  const token = await request({
    method: "GET",
    url: API_USER_TOKEN
  });
  if (!token) throw new Error("身份令牌为空");
  // 对全局管理中设置令牌
  store.commit("setToken", token);
  console.log("身份令牌:", store.state.token);
  return token;
}

// 获取用户自身的资料，获取后会顺便同步到全局状态管理中
export async function requestUserInfo(advanced = null) {
  const info = await request({
    method: "GET",
    url: API_USER,
    params: { advanced }
  });
  store.commit("setUserInfo", info);
  store.commit("setToken", info.token);
  console.log("用户身份", store.state.userInfo);
  return info;
}

export async function setupUserInfo() {
  await requestUserInfo();
}

export function parseforwardAddress(addr) {
  const daemonPort = addr.split(":")[1];
  const checkAddr = addr.toLocaleLowerCase();
  if (
    checkAddr.indexOf("localhost") === 0 ||
    checkAddr.indexOf("127.") === 0 ||
    checkAddr.indexOf("192.") === 0
  ) {
    addr = `${window.location.hostname}:${daemonPort ? daemonPort : 24444}`;
  }
  return addr;
}
