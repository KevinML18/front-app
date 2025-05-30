import { ElMessage } from 'element-plus'

export function $showError(message) {
  ElMessage({
    message,
    type: 'error',
    duration: 2000,
  })
}

export function $showSuccess(message) {
  ElMessage({
    message,
    type: 'success',
    duration: 2000,
  })
}