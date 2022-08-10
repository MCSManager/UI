// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>


import axios from "axios";
import store from "../store";
import { API_PANEL_STATUS, API_USER, API_USER_TOKEN } from "./common";

// Each request must carry the X-Requested-With: XMLHttpRequest header
axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";
// axios.defaults.withCredentials = true;

// axios request token must carry
axios.interceptors.request.use(async function (config) {
  let token = store.state.token;
  if (!token && !config.params?.__mcsm_init__) {
    console.log("Token not obtained, trying to initialize...");
    try {
      await setupUserInfo();
    } catch (err) {
      console.log("Error initializing Token:", err);
    }
  }
  if (!config.params) config.params = {};
  config.params.token = store.state.token;
  delete config.params?.__mcsm_init__;
  return config;
});

// service response exception
class ServiceResponseException extends Error {
  constructor(p) {
    super(p);
  }
}

// Axios general requester encapsulated for panel-side response format
export async function request(p) {
  try {
    const result = await axios.request(p);
    if (result.status != 200) throw new Error("Incorrect response code");
    if (result.data && result.data.data != null) return result.data.data;
    throw new Error("The panel response data format is abnormal");
  } catch (error) {
    const response = error.response;
    if (response && response.data && response.data.data != undefined) {
      throw new ServiceResponseException(response.data.data);
    } else {
      throw error;
    }
  }
}

// get the token once
export async function requestToken() {
  // request token
  const token = await request({
    method: "GET",
    url: API_USER_TOKEN
  });
  if (!token) throw new Error("Identity token is empty");
  // Set the token in the global management
  store.commit("setToken", token);
  console.log("Identity token:", store.state.token);
  return token;
}

// Get the user's own data, which will be synchronized to the global state management by the way
export async function requestUserInfo(advanced = null) {
  const info = await request({
    method: "GET",
    url: API_USER,
    params: { advanced, __mcsm_init__: true }
  });
  store.commit("setUserInfo", info);
  store.commit("setToken", info.token);
  console.log("User identity information:", store.state.userInfo);
  return info;
}

export async function setupUserInfo() {
  await requestUserInfo();
}

export async function getPanelStatus() {
  const statusInfo = await request({
    method: "GET",
    url: API_PANEL_STATUS
  });
  store.commit("setPanelStatus", statusInfo);
  return statusInfo
}

export function parseforwardAddress(addr = "", require = "http") {
  // save its protocol header
  //ws://127.0.0.1:25565
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

  // remove potentially redundant headers
  addr = deleteWebsocketHeader(deleteHttpHeader(addr));

  // port and ip are separated
  let daemonPort = null;
  let onlyAddr = null;
  if (addr.split(":").length === 2) {
    onlyAddr = addr.split(":")[0];
    daemonPort = parseInt(addr.split(":")[1]);
    if (isNaN(daemonPort)) throw new Error(`The address ${addr} failed to resolve, the port is incorrect`);
  } else {
    onlyAddr = addr;
  }

  // Reassemble the address based on the separated port and ip
  const checkAddr = onlyAddr.toLocaleLowerCase();
  if (checkAddr.indexOf("localhost") === 0 || checkAddr.indexOf("127.0.0.") === 0) {
    addr = `${protocol}${window.location.hostname}${daemonPort ? `:${daemonPort}` : ""}`;
  } else {
    addr = `${protocol}${onlyAddr}${daemonPort ? `:${daemonPort}` : ""}`;
  }
  return addr;
}

window.parseforwardAddress = parseforwardAddress;

// The ws address on the Daemon side is converted into an http address
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

// The ws address on the Daemon side is converted to the local ws address
export function daemonWsAddressToWs(wsAddr = "") {
  if (
    wsAddr.toLocaleLowerCase().indexOf("ws://") !== 0 &&
    wsAddr.toLocaleLowerCase().indexOf("wss://") !== 0
  ) {
    return `ws://${wsAddr}`;
  }
  return wsAddr;
}