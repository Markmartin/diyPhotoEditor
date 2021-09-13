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

export const apiUploadAvatar = async () => {
  let formData = new FormData()
  // formData.append('image', imagefile.files[0])
  return await baseRequest({
    method: 'post',
    url: 'head/upload',
    'content-Type': 'multipart/form-data',
    data: {
      ...formData
    }
  })
}
