// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import { io } from "socket.io-client";
import { ElNotification } from "element-plus";

// import { API_URL } from "./common";

export function connectRemoteService(
  addr,
  password,
  connectCallback = () => { },
  errorCallbackCallback = () => { }
) {
  const socket = io(addr, {}).connect();

  socket.on("connect", () => {
    socket.emit("stream/auth", {
      data: { password }
    });
  });

  socket.on("reconnect", () => {
    socket.emit("stream/auth", {
      data: { password }
    });
  });

  socket.on("disconnect", () => { });

  socket.on("connect_error", (error) => {
    errorCallbackCallback(error);
  });

  socket.on("stream/auth", (packet) => {
    const data = packet.data;
    if (data === true) {
      connectCallback();
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
    //
  });

  socket.on("instance/stopped", (packet) => {
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

    ElNotification({
      title: "操作失败",
      message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}<br>具体原因应该已在控制台显示</span>`,
      dangerouslyUseHTMLString: true,
      type: "error",
      duration: 5000
    });
  });

  socket.on("forward/instance", () => { });

  return socket;
}
