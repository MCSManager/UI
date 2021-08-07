/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-18 16:16:27
 * @LastEditTime: 2021-07-17 13:17:57
 * @Description:
 */
import { io } from "socket.io-client";
import { ElNotification } from "element-plus";

// import { API_URL } from "./common";

export function connectRemoteService(addr, password) {
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

  socket.on("instance/stdout", (packet) => {
    console.log("Event: instance/stdout data:", packet);
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
