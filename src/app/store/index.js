
import { createStore } from "vuex";

// Vuex 状态管理
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
