<template>
  <div class="mb-20">
    <el-tabs v-model="tabActive" @tab-change="changeTab" stretch="false" class="">
      <el-tab-pane :label="$t('profile')" name="tab-1">
        <div class="flex flex-col items-center justify-center mt-10 mb-5">
          <div
            v-if="authUser.foto"
            class="relative w-30 h-30 mx-auto group"
          >
            <img
              :src="authUser.foto"
              alt="profilePic"
              class="w-full h-full rounded-full object-cover transition duration-300 group-hover:brightness-50"
            >
            <div
              class="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition duration-300"
            >
              <Pencil @click="editPhoto" class="cursor-pointer hover:text-emerald-500" />
              <Trash2 @click.stop="deletePhoto" class="cursor-pointer hover:text-rose-500" />
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

        <div class="flex items-center justify-center pb-2">
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
            <ElFormItem
              :label="$t('password')"
              prop="password"
              @keydown.enter.prevent="submit(ruleFormRef)"
            >
              <ElInput v-model="form.password" type="password" show-password class="input-custom" />
            </ElFormItem>
            <button
              class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 ml-2 mt-2"
              @click.prevent="submit"
            >
              {{ $t('save_changes') }}
            </button>
            <button class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2 mt-2"
              @click="deleteUser"
            >
              {{ $t('delete_account') }}
            </button>
          </ElForm>
        </div>
      </el-tab-pane>
      <el-tab-pane :label="$t('my_alerts')" name="tab-2">
        <div class="w-full p-4 flex flex-col items-center gap-5 mt-5">
          <ProductCard
            v-for="item in favourites"
            :key="item.url"
            :name="item.titulo"
            :price="item.precio"
            :url="item.url"
            :shop="item.tienda"
            :image="item.imagen_url"
            class="item w-[700px] md:w-[900px]"
            @delete-favourite="url => favourites = favourites.filter(p => p.url !== url)"
          />
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInput, ElTabs, ElTabPane, ElUpload } from 'element-plus'
import { Plus, Pencil, Trash2 } from 'lucide-vue-next';
import { useAuth } from '~/composables/auth/useAuth'
import { useRouter } from 'vue-router'

definePageMeta({
  middleware: 'auth'
})

const { authUser } = useAuth()
const { t } = useI18n()
const router = useRouter()

const tabActive = ref('tab-1')
const favourites = ref([])
const ruleFormRef = ref()
const imageUrl = ref('')
const uploadRef = ref(null)

const form = reactive({
  name: '',
  lastname: '',
  username: '',
  userEmail: '',
  password: ''
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

onMounted(() => {
  const savedTab = localStorage.getItem('activeTab')
  if (savedTab) {
    tabActive.value = savedTab
    localStorage.removeItem('activeTab')
  }
  getFavoritos()
})

const submit = async () => {
  try {
    await ruleFormRef.value.validate()
    updateUser()
  } catch (errors) {
    $showError(t('invalid_email'))
  }
}

const getFavoritos = async () => {
  const url = `${getApiUrl()}/mostrar_favorito/?id=${encodeURIComponent(parseInt(authUser.value.id))}`
  const response = await fetch(url, { method: 'GET'} )
  const data = await response.json()
  favourites.value = data
}

const updateUser = async() => {
  const newUsername = form.username || authUser.value.nombre_usuario
  const newName = form.name || authUser.value.nombre
  const newLastname = form.lastname || authUser.value.apellidos
  const newEmail = form.userEmail || authUser.value.email
  const photo = authUser.value.foto || null
  
  const url = `${getApiUrl()}/actualizar_usuario/?nombre_usuario=${encodeURIComponent(newUsername)}&nombre=${encodeURIComponent(newName)}&apellidos=${encodeURIComponent(newLastname)}&email=${encodeURIComponent(newEmail)}&password=${encodeURIComponent('123')}&foto=${photo}&id=${encodeURIComponent(authUser.value.id)}`

  const response = await fetch(url, { method: 'POST' })
  const data = await response.json()

  if ("error" in data) {
    $showError(data.msg)
  } else {
    authUser.value = {
      ...authUser.value,
      nombre_usuario: newUsername,
      nombre: newName,
      apellidos: newLastname,
      email: newEmail,
      foto: photo
    }
    router.go(0)
    $showSuccess('updated_profile')
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
    console.log('Imagen subida en:', imageUrl.value)
    onSuccess(data)
    authUser.value = {
      ...authUser.value,
      foto: imageUrl.value
    }
    router.go(0)
  } catch (err) {
    console.error(err)
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
@keyframes show {
  from {
    opacity: 0;
    transform: scale(0.1);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.item {
  animation-name: show;
  animation-duration: 0.18s;
  animation-fill-mode: both;
  animation-timing-function: ease-out;
}

:deep(.el-tabs__item) {
  color: #10b981;
  padding: 5px;
  font-size: 18px;
}

:deep(.el-tabs__item:hover) {
  color: #059669;
}

:deep(.el-tabs__item:active) {
  color: #047857;
}

:deep(.el-tabs__active-bar) {
  background-color: #10b981;
}

:deep(.el-tabs__nav-wrap) {
  justify-content: center;
}

:deep(.el-tabs__nav-scroll) {
  display: flex;
  justify-content: center;
}

:deep(.el-tabs__nav) {
  display: inline-flex;
}
</style>