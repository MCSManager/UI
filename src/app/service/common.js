/*
  Copyright (C) 2022 Suwings <Suwings@outlook.com>

  This program is free software: you can redistribute it and/or modify
  it under the terms of the GNU Affero General Public License as published by
  the Free Software Foundation, either version 3 of the License, or
  (at your option) any later version.
  
  According to the AGPL, it is forbidden to delete all copyright notices, 
  and if you modify the source code, you must open source the
  modified source code.

  版权所有 (C) 2022 Suwings <Suwings@outlook.com>

  该程序是免费软件，您可以重新分发和/或修改据 GNU Affero 通用公共许可证的条款，
  由自由软件基金会，许可证的第 3 版，或（由您选择）任何更高版本。

  根据 AGPL 与用户协议，您必须保留所有版权声明，如果修改源代码则必须开源修改后的源代码。
  可以前往 https://mcsmanager.com/ 阅读用户协议，申请闭源开发授权等。
*/

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


export const TERMINAL_CODE = [
  { label: "UTF-8（通用）", value: "UTF-8" },
  { label: "GBK（中文）", value: "GBK" },
  { label: "BIG5（繁中）", value: "BIG5" },
  { label: "Shift_JIS（日文）", value: "Shift_JIS" },
  { label: "KS_C_5601（韩文）", value: "KS_C_5601" },
  { label: "GB2312（中文）", value: "GB2312" },
  { label: "GB18030（中文）", value: "GB18030" },
  { label: "Big5-HKSCS（繁中）", value: "Big5-HKSCS" },
  { label: "UTF-16", value: "UTF-16" }
]

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

// 适用于配置文件解析成 JSON 格式后再解析成网页可循环的二维表格式
// 其具体原理是实现一个简单双向绑定，来对应每一个具体的配置项目
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
