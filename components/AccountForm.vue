<template>
  <div class="flex flex-col items-center justify-center mt-10 mb-5">
    <div
      v-if="authUser.foto"
      class="relative w-30 h-30 mx-auto group"
    >
      <img
        :src="authUser.foto !== 'null' ? authUser.foto : '/default_pic.png'"
        alt="profilePic"
        :class="authUser.foto !== 'null' ? 'w-full h-full rounded-full object-cover transition duration-300 group-hover:brightness-50' : 'bg-cyan-50 rounded-full object-cover transition duration-300 group-hover:brightness-50'"
      >
      <div
        class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300"
      >
        <Pencil @click="editPhoto" class="cursor-pointer hover:text-emerald-500" />
      </div>
    </div>
    <el-upload
      ref="uploadRef"
      v-show="false"
      :http-request="uploadToCloudinary"
      :show-file-list="false"
      :before-upload="beforePhotoUpload"
    />
    <div
      v-if="!authUser.foto"
      class="w-25 h-25 border rounded-full border-dashed border-white active:border-emerald-700 m-4 flex items-center justify-center group hover:border-emerald-600 cursor-pointer"
      @click="editPhoto"
    >
      <Plus class="w-auto h-15 text-white group-hover:text-emerald-600 active:text-emerald-700" />
    </div>
    <span class="text-2xl text-emerald-500 mt-2">{{ authUser.nombre_usuario }}</span>
  </div>

  <div class="flex flex-col items-center justify-center pb-2">
    <ElForm
      class="custom-form"
      require-asterisk-position="right"
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-position="top"
    >
      <ElFormItem
        :label="$t('name')"
        prop="name"
        @keydown.enter.prevent="submit(ruleFormRef)"
      >
        <ElInput v-model="form.name" class="input-custom" :placeholder="authUser.nombre"/>
      </ElFormItem>
      <ElFormItem
        :label="$t('last_name')"
        prop="lastname"
        @keydown.enter.prevent="submit(ruleFormRef)"
      >
        <ElInput v-model="form.lastname" class="input-custom" :placeholder="authUser.apellidos"/>
      </ElFormItem>
      <ElFormItem
        :label="$t('username')"
        prop="username"
        @keydown.enter.prevent="submit(ruleFormRef)"
      >
        <ElInput v-model="form.username" class="input-custom" :placeholder="authUser.nombre_usuario"/>
      </ElFormItem>
      <ElFormItem
        :label="$t('email')"
        prop="userEmail"
        type="email"
        @keydown.enter.prevent="submit(ruleFormRef)"
      >
        <ElInput v-model="form.userEmail" class="input-custom" :placeholder="authUser.email"/>
      </ElFormItem>
      <div class="flex flex-col gap-2 w-100 mb-3">
        <button
          class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 flex items-center justify-center"
          @click.prevent="submit"
        >
          <DotLottieVue
            v-if="loading"
            src="animations/loading2.lottie"
            autoplay
            loop
            class="w-27 h-6"
          />
          <span v-else>{{ $t('save_changes') }}</span>
        </button>
        <button class="bg-orange-400 hover:bg-orange-500 active:bg-orange-600 cursor-pointer rounded-md p-0.5"
          @click.prevent="handlePasswordForm"
        >
          {{ $t('change_password') }}
        </button>
      </div>
    </ElForm>
    <transition name="slide-down">
      <ElForm
        v-if="passwordInput"
        class="custom-form"
        require-asterisk-position="right"
        :model="passwordForm"
        label-position="top"
      >
        <ElFormItem
          :label="$t('new_password')"
          prop="password"
          @keydown.enter.prevent="submit(ruleFormRef)"
        >
          <ElInput v-model="passwordForm.password" type="password" show-password class="input-custom" />
        </ElFormItem>
        <button
          v-if="passwordInput"
          class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 w-100"
          @click.prevent="updatePassword"
        >
          <DotLottieVue
            v-if="loading"
            src="animations/loading2.lottie"
            autoplay
            loop
            class="w-27 h-6"
          />
          <span v-else>{{ $t('update_password') }}</span>
        </button>
      </ElForm>
    </transition>
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInput, ElUpload } from 'element-plus'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next'
import { useAuth } from '~/composables/auth/useAuth'
import { useRouter } from 'vue-router'
import { DotLottieVue } from '@lottiefiles/dotlottie-vue'

const { authUser } = useAuth()
const { t } = useI18n()
const router = useRouter()

const ruleFormRef = ref()
const imageUrl = ref('')
const uploadRef = ref(null)
const passwordInput = ref(false)
const loading = ref(false)

const form = reactive({
  name: '',
  lastname: '',
  username: '',
  userEmail: ''
})

const rules = reactive({
  userEmail: [
    {
      type: 'email',
      message: t('invalid_email'),
      trigger: ['blur', 'change'],
    }
  ]
})

const passwordForm = reactive({
  password: ''
})

const handlePasswordForm = () => {
  if (passwordForm.password) {
    passwordForm.password = ''
  }
  passwordInput.value = !passwordInput.value
}

const submit = async () => {
  if (
    !form.name.trim() && !form.lastname.trim() &&
    !form.username.trim() && !form.userEmail.trim()
  ) {
    $showError(t('nothing_to_change'))
    return
  }
  try {
    await ruleFormRef.value.validate()
    updateUser()
  } catch (errors) {
    $showError(t('invalid_email'))
  }
}

const updatePassword = async() => {
  if (!passwordForm.password || passwordForm.password.trim() === '') {
    $showError(t('invalid_password'))
    return
  }

  const url = `${getApiUrl()}/api/v1/usuarios/${encodeURIComponent(authUser.value.id)}/password?password=${encodeURIComponent(passwordForm.password)}`
  try {
    const response = await fetch(url, { method: 'PUT' })
    const data = await response.json()
    if ("exito" in data) {
      $showSuccess(t('password_updated'))
    } else {
      $showError(t('operation_error'))
    }
    handlePasswordForm()
  } catch (err) {
    $showError(t('operation_error'))
  }
}

const updateUser = async() => {
  loading.value = true
  const newUsername = form.username.trim() || authUser.value.nombre_usuario
  const newName = form.name.trim() || authUser.value.nombre
  const newLastname = form.lastname.trim() || authUser.value.apellidos
  const newEmail = form.userEmail.trim() || authUser.value.email
  
  const url = `${getApiUrl()}/api/v1/usuarios/${encodeURIComponent(authUser.value.id)}?nombre_usuario=${encodeURIComponent(newUsername)}&nombre=${encodeURIComponent(newName)}&apellidos=${encodeURIComponent(newLastname)}&email=${encodeURIComponent(newEmail)}`
  try {
    const response = await fetch(url, { method: 'PUT' })
    const data = await response.json()

    if ("error" in data) {
      $showError(data.msg)
    } else {
      authUser.value = {
        ...authUser.value,
        nombre_usuario: newUsername,
        nombre: newName,
        apellidos: newLastname,
        email: newEmail
      }
      router.go(0)
      $showSuccess(t('updated_profile'))
    }
  } catch (err) {
    console.error(err)
    $showError(t('database_error'))
  } finally {
    loading.value = true
  }
}

const uploadToCloudinary = async ({ file, onSuccess, onError }) => {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('upload_preset', getCloudinaryPreset())

  try {
    const response = await fetch(`https://api.cloudinary.com/v1_1/${getCloudinaryName()}/image/upload`, {
      method: 'POST',
      body: formData,
    })
    const data = await response.json()
    const transformedUrl = data.secure_url.replace(
      '/upload/',
      '/upload/ar_1:1,c_fill,g_auto/'
    )
    imageUrl.value = transformedUrl

    const url = `${getApiUrl()}/api/v1/usuarios/${encodeURIComponent(authUser.value.id)}/foto?foto=${encodeURIComponent(imageUrl.value)}`
    const uploadResponse = await fetch(url, { method: 'PUT' })
    const uploadData = await uploadResponse.json()
    if ("error" in uploadData) {
      $showError(uploadData.msg)
    }
    onSuccess(data)
    authUser.value = {
      ...authUser.value,
      foto: imageUrl.value
    }
    router.go(0)
  } catch (err) {
    $showError(t('upload_image_error'))
    onError(err)
  }
}

const beforePhotoUpload = (rawFile) => {
  const validTypes = ['image/jpeg', 'image/png', 'image/webp']
  const isValidType = validTypes.includes(rawFile.type)
  const isvalidSize = rawFile.size / 1024 / 1024 < 5

  if (!isValidType) {
    $showError(t('image_format_invalid'))
    return false
  }
  if (!isvalidSize) {
    $showError(t('image_size_error'))
    return false
  }
  return true
}

const deletePhoto = async() => {
  authUser.value.foto = null
  router.go(0)
}

const editPhoto = () => {
  const inputEl = uploadRef.value?.$el?.querySelector('input[type="file"]')
  if (inputEl) {
    inputEl.click()
  }
}
</script>

<style scoped>
.slide-down-enter-active,
.slide-down-leave-active {
  transition: all 0.5s ease;
}

.slide-down-enter-from,
.slide-down-leave-to {
  opacity: 0;
  transform: translateY(-20px);
}

.slide-down-enter-to,
.slide-down-leave-from {
  opacity: 1;
  transform: translateY(0);
}

</style>