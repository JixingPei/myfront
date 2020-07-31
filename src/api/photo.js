import request from '@/utils/request'

export function getPhoto() {
  return request({
    url: '/photo',
    method: 'get'
  })
}
