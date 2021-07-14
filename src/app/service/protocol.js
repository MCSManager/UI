/*
 * @Author: Copyright 2021 Suwings
 * @Date: 2021-07-13 19:19:54
 * @LastEditTime: 2021-07-13 19:26:54
 * @Description: Ajax 请求封装层
 */
import axios from "axios";
export function request(self, ...p) {
  try {
    return axios.request(...p);
  } catch (error) {
    self.$message({ type: "error", message: `操作错误: ${error.message}` });
  }
}
