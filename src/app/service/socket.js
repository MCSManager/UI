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

import { io } from "socket.io-client";
import { ElNotification } from "element-plus";

// import { API_URL } from "./common";

export function connectRemoteService(
  addr,
  password,
  connectCallback = () => {},
  errorCallbackCallback = () => {}
) {
  console.log("浏览器正在连接守护进程:", addr);
  console.log("临时密码:", password);
  const socket = io(addr, {}).connect();

  socket.on("connect", () => {
    console.log("[WS->Daemon] Websocket 成功连接");
    socket.emit("stream/auth", {
      data: { password }
    });
  });

  socket.on("reconnect", () => {
    console.log("[WS->Daemon] Websocket 重连成功");
    socket.emit("stream/auth", {
      data: { password }
    });
  });

  socket.on("disconnect", () => {
    console.log("[WS->Daemon] Websocket 连接断开");
  });

  socket.on("connect_error", (error) => {
    console.log("[WS->Daemon] 连接错误:", error);
    errorCallbackCallback(error);
  });

  socket.on("stream/auth", (packet) => {
    const data = packet.data;
    if (data === true) {
      console.log("[WS->Daemon/stream/auth] Websocket 身份验证成功");
      connectCallback();
    } else {
      console.log("身份认证错误:", data);
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
