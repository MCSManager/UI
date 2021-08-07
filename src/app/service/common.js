/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-18 10:00:35
 * @LastEditTime: 2021-08-06 16:04:54
 * @Description:
 */

export const API_URL = "http://127.0.0.1:8088";

export const API_SERVICE_INSTANCES = `${API_URL}/api/service/remote_service_instances`;
export const API_SERVICE_LIST = `${API_URL}/api/service/remote_services_list`;
export const API_SERVICE = `${API_URL}/api/service/remote_services`;
export const API_SERVICE_CURD = `${API_URL}/api/service/remote_service`;
export const API_SERVICE_URL = `${API_URL}/api/service`;
export const API_FORWARD = `${API_URL}/api/service/remote_services`;

export const API_FILE_URL = `${API_URL}/api/files`;
export const API_FILE_LIST = `${API_URL}/api/files/list`;
export const API_FILE_DOWNLOAD = `${API_URL}/api/files/download/`;
export const API_FILE_UPLOAD = `${API_URL}/api/files/upload/`;
export const API_FILE_MKDIR = `${API_URL}/api/files/mkdir`;
export const API_FILE_COPY = `${API_URL}/api/files/copy`;
export const API_FILE_MOVE = `${API_URL}/api/files/move`;

export const API_USER = `${API_URL}/api/auth/`;
export const API_SEARCH = `${API_URL}/api/auth/search`;
export const API_USER_LIST = `${API_URL}/api/auth/overview`;
export const API_USER_REGISTER = `${API_URL}/api/auth/register`;
export const API_USER_LOGIN = `${API_URL}/api/auth/login`;
export const API_USER_TOKEN = `${API_URL}/api/auth/token`;
export const API_USER_LOGOUT = `${API_URL}/api/auth/logout`;
export const API_USER_DELETE = `${API_URL}/api/auth/delete`;

export const API_OVERVIEW = `${API_URL}/api/overview`;

export const API_INSTANCE = `${API_URL}/api/instance`;
export const API_INSTANCE_LOW_PERMISSION_PUT = `${API_URL}/api/protected_instance/low_permission`;
export const API_INSTANCE_OPEN = `${API_URL}/api/protected_instance/open`;
export const API_INSTANCE_STOP = `${API_URL}/api/protected_instance/stop`;
export const API_INSTANCE_KILL = `${API_URL}/api/protected_instance/kill`;
export const API_INSTANCE_REMOTE_SERVICE_STREAM = `${API_URL}/api/protected_instance/stream_channel`;

export const API_PROCESS_CONFIG_LIST = `${API_URL}/api/protected_instance/process_config/list`;
export const API_PROCESS_CONFIG_FILE = `${API_URL}/api/protected_instance/process_config/file`;


export function sleep(t) {
  return new Promise((s) => {
    setTimeout(s, t);
  });
}


// export function getSubElementDelivery(key = [], obj = {}) {

//   console.log("getSubElementDelivery:", key, "Value:", obj)
//   const title = key.shift()
//   if (key.length != 0) {
//     return getSubElementDelivery(key, obj[title]);
//   } else {
//     return obj[title];
//   }
// }

// export function setSubElementDelivery(key = [], obj = {}, val = null) {
//   const title = key.shift()
//   if (key.length != 0) {
//     setSubElementDelivery(key, obj[title]);
//   } else {
//     obj[title] = val;
//   }
// }

// export function getSubElementDelivery(key = [], obj = {}) {

//   console.log("getSubElementDelivery:", key, "Value:", obj)
//   const title = key.shift()
//   if (key.length != 0) {
//     return getSubElementDelivery(key, obj[title]);
//   } else {
//     return obj[title];
//   }
// }

export function getDescriptionByTitle(description, title = "") {
  const arr = title.split("/")
  console.log(arr)
  function _exec(keys = [], _description) {
    if (!_description) return null;
    const title = keys.shift()
    if (keys.length != 0) {
      return _exec(keys, _description[title]);
    } else {
      return _description[title];
    }
  }
  return _exec(arr, description);
}

export function jsonToMap(json, topTitle = "", map = {}) {
  for (const key in json) {
    let title = null;
    if (topTitle) {
      title = `${topTitle}/${key}`;
    } else {
      title = `${key}`;
    }
    const value = json[key];
    if (value instanceof Array) {
      Object.defineProperty(map, title, {
        enumerable: true,
        configurable: true,
        get() { return json[key] },
        set(v) { json[key] = String(v).split(",") }
      })
    } else if (typeof value === "object") {
      jsonToMap(value, title, map)
    } else {
      Object.defineProperty(map, title, {
        enumerable: true,
        configurable: true,
        get() { return json[key] },
        set(v) { json[key] = v }
      })
    }
  }
  return map;
}
