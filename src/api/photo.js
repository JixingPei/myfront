import request from '@/utils/request'

export function getPhoto() {
  return request({
    url: '/photo',
    method: 'get'
  })
}
export function getPhotoWall() {
  return request({
    url: '/photowall',
    method: 'get'
  })
}
