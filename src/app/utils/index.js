import { ElMessage } from "element-plus";

export async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    ElMessage({
      message: "复制成功",
      type: "success"
    });
  } catch (err) {
    ElMessage({
      message: "操作失败",
      type: "error"
    });
  }
}
