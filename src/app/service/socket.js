// Copyright (C) 2022 MCSManager <mcsmanager-dev@outlook.com>

import { io } from "socket.io-client";
import { ElNotification } from "element-plus";
import i18n from "@/app/i18n"
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
        title: i18n.global.t("instances.UnableToConnect"),
        message: `<span style="font-size: 12px;">${i18n.global.t('instance.UnableToConnectInfo')}</span>`,
        dangerouslyUseHTMLString: true,
        type: "error",
        duration: 0
      });
    }
  });

  // eslint-disable-next-line no-unused-vars
  socket.on("instance/stdout", (packet) => {
    // No thing need display
  });

  // eslint-disable-next-line no-unused-vars
  socket.on("instance/stopped", (packet) => {
    // const data = packet.data;
    console.log("i18n:", i18n)
    ElNotification({
      title: i18n.global.t("instances.exit"),
      dangerouslyUseHTMLString: true,
      type: "success",
      duration: 3000
    });
  });

  // eslint-disable-next-line no-unused-vars
  socket.on("instance/opened", (packet) => {
    // const data = packet.data;

    ElNotification({
      title: i18n.global.t("instances.open"),
      dangerouslyUseHTMLString: true,
      type: "success",
      duration: 3000
    });
  });

  // eslint-disable-next-line no-unused-vars
  socket.on("instance/failure", (packet) => {
    // const data = packet.data;
    ElNotification({
      title: i18n.global.t("instances.failed"),
      dangerouslyUseHTMLString: true,
      type: "error",
      duration: 5000
    });
  });

  socket.on("forward/instance", () => { });

  return socket;
}
