/*
 * @Author: Copyright(c) 2020 Suwings
 * @Date: 2021-05-18 16:16:27
 * @LastEditTime: 2021-07-02 20:08:19
 * @Description:
 */
import { io } from "socket.io-client";
import { ElNotification } from "element-plus";

import { API_URL } from "./common";

const socket = io(API_URL, {}).connect();

socket.on("connect", () => {
  console.log("【重要事件】Websocket 成功连接");
  socket.emit("test");
});

socket.on("disconnect", () => {
  console.log("【重要事件】Websocket 连接断开");
});

socket.on("connect_error", (error) => {
  console.log("Websocket 错误:", error);
});

socket.on("instance/stdout", (data) => {
  console.log("Event: instance/stdout data:", data);
});

socket.on("instance/stopped", (data) => {
  console.log("Event: 实例关闭", data);
  ElNotification({
    title: "实例已关闭",
    message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}</span>`,
    dangerouslyUseHTMLString: true,
    type: "success",
    duration: 3000
  });
});

socket.on("instance/opened", (data) => {
  console.log("Event: 实例启动:", data);
  ElNotification({
    title: "实例已启动",
    message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}</span>`,
    dangerouslyUseHTMLString: true,
    type: "success",
    duration: 3000
  });
});

socket.on("instance/failure", (data) => {
  console.log("Event: 实例失败:", data);
  ElNotification({
    title: "操作失败",
    message: `<span style="font-size: 12px;">${data.instanceName}<br>${data.instanceUuid}<br>具体原因应该已在控制台显示</span>`,
    dangerouslyUseHTMLString: true,
    type: "error",
    duration: 5000
  });
});

socket.on("forward/instance", (data) => {
  if (data === true) {
    console.log("Websocket 成功请求转发（或取消）实例IO流");
  } else {
    console.log("Websocket 请求转发（或取消）实例IO流失败，错误：", data);
  }
});
export default socket;
