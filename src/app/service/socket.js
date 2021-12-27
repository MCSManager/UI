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
  

  版权所有 (C) 2021 Suwings(https://github.com/Suwings)

  本程序为自由软件，你可以依据 GPL 的条款（第三版或者更高），再分发和/或修改它。
  该程序以具有实际用途为目的发布，但是并不包含任何担保，
  也不包含基于特定商用或健康用途的默认担保。具体细节请查看 GPL 协议。
*/

import { io } from "socket.io-client";
import { ElNotification } from "element-plus";

// import { API_URL } from "./common";

export function connectRemoteService(addr, password) {
  console.log("Websocket 连接守护进程:", password, addr);
  const socket = io(addr, {}).connect();

  socket.on("connect", () => {
    console.log("【重要事件】Websocket 成功连接");
    socket.emit("stream/auth", {
      data: { password }
    });
    console.log("连接密钥:", password);
  });

  socket.on("reconnect", () => {
    console.log("【重要事件】Websocket 重连成功");
    socket.emit("stream/auth", {
      data: { password }
    });
  });

  socket.on("disconnect", () => {
    console.log("【重要事件】Websocket 连接断开");
  });

  socket.on("connect_error", (error) => {
    console.log("【Websocket】连接错误:", error);
  });

  socket.on("stream/auth", (packet) => {
    const data = packet.data;
    if (data === true) {
      console.log("【重要事件/stream/auth】Websocket 身份验证成功");
    } else {
      ElNotification({
        title: "无法与终端建立连接",
        message: `<span style="font-size: 12px;">身份验证(stream/auth)失败，可能是守护进程导致，请刷新页面重试。</span>`,
        dangerouslyUseHTMLString: true,
        type: "error",
        duration: 0
      });
    }
  });

  // eslint-disable-next-line no-unused-vars
  socket.on("instance/stdout", (packet) => {
    // console.log("Event: instance/stdout data:", packet);
  });

  socket.on("instance/stopped", (packet) => {
    console.log("Event: 实例关闭", data);
    const data = packet.data;
    ElNotification({
      title: "实例已关闭",
      message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}</span>`,
      dangerouslyUseHTMLString: true,
      type: "success",
      duration: 3000
    });
  });

  socket.on("instance/opened", (packet) => {
    const data = packet.data;
    console.log("Event: 实例启动:", data);
    ElNotification({
      title: "实例已启动",
      message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}</span>`,
      dangerouslyUseHTMLString: true,
      type: "success",
      duration: 3000
    });
  });

  socket.on("instance/failure", (packet) => {
    const data = packet.data;
    console.log("Event: 实例失败:", data);
    ElNotification({
      title: "操作失败",
      message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}<br>具体原因应该已在控制台显示</span>`,
      dangerouslyUseHTMLString: true,
      type: "error",
      duration: 5000
    });
  });

  socket.on("forward/instance", (packet) => {
    const data = packet.data;
    if (data === true) {
      console.log("Websocket 成功请求转发（或取消）实例IO流");
    } else {
      console.log("Websocket 请求转发（或取消）实例IO流失败，错误：", data);
    }
  });

  return socket;
}
