/*
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-19 10:59:17
 * @LastEditTime: 2021-12-22 22:01:02
 * @Description: Vuex 状态管理
 */

import { createStore } from "vuex";

const stateModel = {
  token: "",
  userInfo: {
    uuid: "",
    userName: "",
    loginTime: "",
    registerTime: "",
    permission: 10,
    instances: [],
    apiKey: ""
  },
  gameProfile: null,
  onlineNotice: null
};

const store = createStore({
  state() {
    return stateModel;
  },
  mutations: {
    setToken(state, v) {
      state.token = v;
    },
    setUserInfo(state, v) {
      state.userInfo = v;
    },
    setGameProfile(state, v) {
      state.gameProfile = v;
    },
    setOnlineNotice(state, v) {
      state.onlineNotice = v;
    },
    setApiKey(state, v) {
      state.userInfo.apiKey = v;
    }
  }
});

window.store = store;

export default store;
