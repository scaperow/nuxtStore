import dayjs from 'dayjs'
import { Observable } from 'rxjs'
import { computed, reactive, ref } from 'vue'
import { get } from 'lodash'

export const session = reactive({
  user: JSON.parse(localStorage.user || '{}') || null,
  license: null,
  licenseExpireAt: null,
  loading: false,
  token: localStorage.token,
  scene: localStorage.scene
})

export const sharedProducts = ref([
  {
    id: 1,
    days: 3,
    price: 1.9,
  },
  {
    id: 2,
    days: 6,
    price: 3.9,
  },
  {
    id: 3,
    days: 12,
    price: 4.9,
  },
])

export const licenseExpireAt = computed(() => {
  if (session.licenseExpireAt) {
    return dayjs(session.licenseExpireAt)
  }

  return null
})

export const currentLicense = computed(() => {
  return sharedProducts.value.find((a) => {
    return a.id === session.license
  })
})

export default { session }

// export const setUser = (user: any) => {
//   session.user = user
// }

// export const setLicense = (license: any) => {
//   session.license = license
// }

// export const setLicenseExpireAt = (licenseExpireAt: any) => {
//   session.licenseExpireAt = licenseExpireAt
// }

// export const setLoading = (loading: boolean) => {
//   session.loading = loading
// }

// const $user = new Observable(setUser)
// const $license = new Observable(setLicense)
// const $licenseExpireAt = new Observable()
// const $loading = new Observable()

// export default { $user, $license, $licenseExpireAt, $loading, }
// const setUser = (user:any)=>{
//     session.user = user;
// }
// const setLicense = (user:any)=>{
//     session.user = user;
// }
// const setUser = (user:any)=>{
//     session.user = user;
// }const setUser = (user:any)=>{
//     session.user = user;
// }
