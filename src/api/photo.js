import request from '@/utils/request'

export function getPhoto(params) {
  return request({
    url: '/photo',
    method: 'post'
  })
}
