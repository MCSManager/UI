
import axios from "axios";
import store from "../store";
import { API_USER, API_USER_TOKEN } from "./common";

// 每个请求必须携带 X-Requested-With: XMLHttpRequest 头
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.withCredentials = true;

// axios 请求 token 必须携带
axios.interceptors.request.use(async function (config) {
  let token = store.state.token;
  if (!token && !config.params?.__mcsm_init__) {
    console.log("Token 未获取，正在尝试初始化...");
    try {
      await setupUserInfo();
    } catch (err) {
      console.log("初始化 Token 错误:", err);
    }
  }
  if (!config.params) config.params = {};
  config.params.token = store.state.token;
  delete config.params?.__mcsm_init__;
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
    params: { advanced, __mcsm_init__: true }
  });
  store.commit("setUserInfo", info);
  store.commit("setToken", info.token);
  console.log("用户身份", store.state.userInfo);
  return info;
}

export async function setupUserInfo() {
  await requestUserInfo();
}

export function parseforwardAddress(addr = "", require = "http") {
  // 保存其协议头
  // ws://127.0.0.1:25565
  let protocol = `${window.location.protocol}//`;
  const addrProtocolString = addr.toLocaleLowerCase();
  if (require === "http") {
    if (addrProtocolString.indexOf("ws://") === 0) protocol = "http://";
    else if (addrProtocolString.indexOf("wss://") === 0) protocol = "https://";
    else if (addrProtocolString.indexOf("http://") === 0) protocol = "http://";
    else if (addrProtocolString.indexOf("https://") === 0) protocol = "https://";
    else if (protocol === "https://") protocol = "https://";
    else protocol = "http://";
  }
  if (require === "ws") {
    if (addrProtocolString.indexOf("http://") === 0) protocol = "ws://";
    else if (addrProtocolString.indexOf("https://") === 0) protocol = "wss://";
    else if (addrProtocolString.indexOf("ws://") === 0) protocol = "ws://";
    else if (addrProtocolString.indexOf("wss://") === 0) protocol = "wss://";
    else if (protocol === "https://") protocol = "wss://";
    else protocol = "ws://";
  }

  // 删除潜在的多余头
  addr = deleteWebsocketHeader(deleteHttpHeader(addr));

  // 端口与ip分开
  let daemonPort = null;
  let onlyAddr = null;
  if (addr.split(":").length === 2) {
    onlyAddr = addr.split(":")[0];
    daemonPort = parseInt(addr.split(":")[1]);
    if (isNaN(daemonPort)) throw new Error(`地址 ${addr} 解析失败，端口不正确`);
  } else {
    onlyAddr = addr;
  }

  // 根据分开的端口和ip重新组合地址
  const checkAddr = onlyAddr.toLocaleLowerCase();
  if (checkAddr.indexOf("localhost") === 0 || checkAddr.indexOf("127.0.0.") === 0) {
    addr = `${protocol}${window.location.hostname}${daemonPort ? `:${daemonPort}` : ""}`;
  } else {
    addr = `${protocol}${onlyAddr}${daemonPort ? `:${daemonPort}` : ""}`;
  }
  return addr;
}

window.parseforwardAddress = parseforwardAddress;

// Daemon 端的 ws 地址转换成 http 地址
export function daemonWsAddressToHttp(wsAddr = "") {
  if (wsAddr.toLocaleLowerCase().indexOf("ws://") === 0) {
    return `http://${wsAddr.slice(5)}`;
  } else if (wsAddr.toLocaleLowerCase().indexOf("wss://") === 0) {
    return `https://${wsAddr.slice(6)}`;
  }
  return wsAddr;
}

export function deleteWebsocketHeader(wsAddr) {
  if (wsAddr.toLocaleLowerCase().indexOf("ws://") === 0) {
    return `${wsAddr.slice(5)}`;
  } else if (wsAddr.toLocaleLowerCase().indexOf("wss://") === 0) {
    return `${wsAddr.slice(6)}`;
  }
  return wsAddr;
}

export function deleteHttpHeader(addr) {
  if (addr.toLocaleLowerCase().indexOf("http://") === 0) {
    return `${addr.slice(7)}`;
  } else if (addr.toLocaleLowerCase().indexOf("https://") === 0) {
    return `${addr.slice(8)}`;
  }
  return addr;
}

// Daemon 端的 ws 地址转为本地 ws 地址
export function daemonWsAddressToWs(wsAddr = "") {
  if (
    wsAddr.toLocaleLowerCase().indexOf("ws://") !== 0 &&
    wsAddr.toLocaleLowerCase().indexOf("wss://") !== 0
  ) {
    return `ws://${wsAddr}`;
  }
  return wsAddr;
}
