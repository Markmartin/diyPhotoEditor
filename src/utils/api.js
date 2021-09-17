import { baseRequest } from '@/utils/baseRequest'

export const apiScene = async (page, size) =>
  await baseRequest({
    method: 'get',
    url: 'image/list',
    params: { page, size }
  })

export const apiSceneLayer = async (id) =>
  await baseRequest({
    method: 'get',
    url: `image/${id}`
  })

export const apiUploadAvatar = async (file) => {
  const formData = new FormData()
  formData.append('fileName', file)
  return await baseRequest({
    method: 'post',
    url: 'head/upload',
    headers: {
      'content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const apiUploadImage = async (file) => {
  const formData = new FormData()
  formData.append('fileName', file)
  return await baseRequest({
    method: 'post',
    url: 'image/upload',
    headers: {
      'content-Type': 'multipart/form-data'
    },
    data: formData
  })
}

export const apiOrder = async (data) =>
  await baseRequest({
    method: 'post',
    url: 'order/save',
    data
  })
