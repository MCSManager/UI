/*
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-13 19:19:54
 * @LastEditTime: 2021-07-28 15:18:22
 * @Description: Ajax 请求封装层
 */
import axios from "axios";
import store from "../store";
import { API_USER, API_USER_TOKEN } from "./common";

// axios 全局设置
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
axios.defaults.withCredentials = true;

class ServiceResponseException extends Error {
  constructor(p) {
    super(p);
  }
}

export async function request(p) {
  try {
    const result = await axios.request(p);
    if (result.status != 200) throw new Error("错误的响应代码");
    if (result.data && result.data.data) return result.data.data;
    throw new Error("无从得知的响应值异常");
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
