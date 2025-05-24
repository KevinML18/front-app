import { ElMessage } from 'element-plus'

export function $showError(message) {
  ElMessage({
    message,
    type: 'error',
    duration: 3000,
  })
}

export function $showSuccess(message) {
  ElMessage({
    message,
    type: 'success',
    duration: 3000,
  })
}