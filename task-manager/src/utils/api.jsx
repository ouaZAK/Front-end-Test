import { useAuthStore } from '../stores/authStore'

export const authFetch = (url, options = {}) => {
  const obj = useAuthStore.getState().token
  console.log(obj.token)
  console.log("----- url ----")
  console.log(url)
  console.log("----- token ----")
  console.log("----- t ----")
  return fetch('https://recruter-backend.vercel.app/'+url, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${obj.token}`,
      'Content-Type': 'application/json',
    },
  })
}
