import request from '@/utils/request'

export function getPhoto(params) {
  console.log(params)
  return request({
    url: '/photo',
    method: 'post',
    params: params
  })
}
