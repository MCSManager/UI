// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

export const API_URL = "//" + window.location.host;

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
export const API_FILE_COMPRESS = `${API_URL}/api/files/compress`;
export const API_FILE_STATUS = `${API_URL}/api/files/status`;

export const API_USER = `${API_URL}/api/auth/`;
export const API_SEARCH = `${API_URL}/api/auth/search`;
export const API_USER_LIST = `${API_URL}/api/auth/overview`;
export const API_USER_REGISTER = `${API_URL}/api/auth/register`;
export const API_USER_LOGIN = `${API_URL}/api/auth/login`;
export const API_USER_LOGIN_INFO = `${API_URL}/api/auth/login_info`;
export const API_USER_TOKEN = `${API_URL}/api/auth/token`;
export const API_USER_LOGOUT = `${API_URL}/api/auth/logout`;
export const API_USER_DELETE = `${API_URL}/api/auth/delete`;
export const API_USER_UPDATE = `${API_URL}/api/auth/update`;

export const API_USER_API = `${API_URL}/api/auth/api`;

export const API_OVERVIEW = `${API_URL}/api/overview`;
export const API_UPDATE_SETTING_WHEN_INSTALL = `${API_URL}/api/overview/install`;

export const API_INSTANCE = `${API_URL}/api/instance`;
export const API_INSTANCE_UPLOAD = `${API_URL}/api/instance/upload`;
export const API_INSTANCE_LOW_PERMISSION_PUT = `${API_URL}/api/protected_instance/low_permission`;
export const API_INSTANCE_OPEN = `${API_URL}/api/protected_instance/open`;
export const API_INSTANCE_STOP = `${API_URL}/api/protected_instance/stop`;
export const API_INSTANCE_KILL = `${API_URL}/api/protected_instance/kill`;
export const API_INSTANCE_REMOTE_SERVICE_STREAM = `${API_URL}/api/protected_instance/stream_channel`;
export const API_INSTANCE_UPDATE = `${API_URL}/api/protected_instance/instance_update`;
export const API_INSTANCE_RESTART = `${API_URL}/api/protected_instance/restart`;
export const API_INSTANCE_OUTPUT = `${API_URL}/api/protected_instance/outputlog`;
export const API_INSTANCE_ASYNC_TASK = `${API_URL}/api/protected_instance/asynchronous`;
export const API_INSTANCE_ASYNC_QUERY = `${API_URL}/api/protected_instance/query_asynchronous`;
export const API_INSTANCE_ASYNC_STOP = `${API_URL}/api/protected_instance/stop_asynchronous`;

export const API_PROCESS_CONFIG_LIST = `${API_URL}/api/protected_instance/process_config/list`;
export const API_PROCESS_CONFIG_FILE = `${API_URL}/api/protected_instance/process_config/file`;

export const API_SCHEDULE = `${API_URL}/api/protected_schedule`;

export const API_SETTINGS = `${API_URL}/api/overview/setting`;

export const API_IMAGES = `${API_URL}/api/environment/image`;
export const API_CONTAINERS = `${API_URL}/api/environment/containers`;
export const API_NETWORK_MODES = `${API_URL}/api/environment/networkModes`;
export const API_PROGRESS = `${API_URL}/api/environment/progress`;

export const API_PANEL_STATUS = `${API_URL}/api/auth/status`;
export const API_PANEL_INSTALL = `${API_URL}/api/auth/install`;

export const API_GET_QUICK_INSTALL_LIST_ADDR = `${API_URL}/api/instance/quick_install_list`;

export const TERMINAL_CODE = [
  { label: "UTF-8", value: "UTF-8" },
  { label: "GBK", value: "GBK" },
  { label: "GB2312", value: "GB2312" },
  { label: "GB18030", value: "GB18030" },
  { label: "BIG5", value: "BIG5" },
  { label: "Big5-HKSCS", value: "Big5-HKSCS" },
  { label: "Shift_JIS", value: "Shift_JIS" },
  { label: "KS_C_5601", value: "KS_C_5601" },
  { label: "UTF-16", value: "UTF-16" }
];

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
  const arr = title.split("/");
  function _exec(keys = [], _description) {
    if (!_description) return null;
    const title = keys.shift();
    if (keys.length != 0) {
      return _exec(keys, _description[title]);
    } else {
      return _description[title];
    }
  }
  return _exec(arr, description);
}

// It is suitable for parsing the configuration file into JSON format and then parsing it into a two-dimensional table format that can be cycled by web pages
// The specific principle is to implement a simple two-way binding to correspond to each specific configuration item
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
      if (typeof value[0] === "object") {
        jsonToMap(value, title, map);
      } else {
        Object.defineProperty(map, title, {
          enumerable: true,
          configurable: true,
          get() {
            return json[key];
          },
          set(v) {
            json[key] = String(v).split(",");
          }
        });
      }
    } else if (typeof value === "object") {
      jsonToMap(value, title, map);
    } else {
      Object.defineProperty(map, title, {
        enumerable: true,
        configurable: true,
        get() {
          return json[key];
        },
        set(v) {
          const preValue = json[key];
          if (typeof preValue === "number" && !isNaN(Number(v))) return (json[key] = Number(v));
          json[key] = v;
        }
      });
    }
  }
  return map;
}

export function toUnicode(str) {
  var value = "";
  for (var i = 0; i < str.length; i++) {
    if (/([\u4E00-\u9FA5]|[\uFE30-\uFFA0])/g.test(str[i])) {
      value += "\\u" + leftZero4(parseInt(str.charCodeAt(i)).toString(16));
    } else {
      value += str[i];
    }
  }
  return value;
}
function leftZero4(str) {
  if (str != null && str != "" && str != "undefined") {
    if (str.length == 2) {
      return "00" + str;
    }
  }
  return str;
}