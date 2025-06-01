<template>
  <div class="mb-20">
    <el-tabs v-model="tabActive" @tab-change="changeTab" stretch="false" class="">
      <el-tab-pane :label="$t('profile')" name="tab-1">
        <div class="flex flex-col items-center justify-center mt-10">
          <img :src="authUser.foto ? authUser.foto : '/default_pic.png'" alt="profilePic" :class="authUser.foto ? 'w-25 h-25 rounded-full mx-auto': 'w-25 h-25 bg-cyan-50 rounded-full'">
          <span class="text-2xl text-emerald-500 mt-2">{{ authUser.nombre_usuario }}</span>
          <div class="flex flex-row">
            <button
              @click="updloadPhoto"
              class="bg-emerald-500 hover:bg-emerald-600 active:bg-emerald-700 cursor-pointer rounded-md p-0.5 ml-2 mt-5"
            >
              {{ $t('change') }}
            </button>
            <button
              @click="updateUser"
              class="bg-rose-600 hover:bg-rose-700 active:bg-rose-800 cursor-pointer rounded-md p-0.5 ml-2 mt-5"
            >
              {{ $t('delete') }}
            </button>
          </div>
        </div>
        <div class="flex items-center justify-center">
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

      <!-- <el-tab-pane :label="$t('following')" name="tab-3">
        <div class="w-full p-4 flex flex-col items-center gap-5">
          <UserCard
            v-for="user in followers" 
            :key="user.username"
            :user="user"
            class="item w-[600px] md:w-[700px]"
          />
        </div>
      </el-tab-pane> -->
      <!-- <el-tab-pane :label="$t('posts')" name="tab-4">
        
      </el-tab-pane> -->
    </el-tabs>
  </div>
</template>

<script setup>
import { ElForm, ElFormItem, ElInput, ElButton, ElTabs, ElTabPane } from 'element-plus'
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