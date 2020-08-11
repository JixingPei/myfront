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
export function getTypePhotos() {
  return request({
    url: '/typePhoto',
    method: 'get'
  })
}
export function getPhotoType() {
  return request({
    url: '/photoType',
    method: 'get'
  })
}
export function addPhotoType(type) {
  return request({
    url: '/photoType',
    method: 'post',
    data: {
      type: type
    }
  })
}
export function updatePhotoType(params) {
  return request({
    url: '/photoType',
    method: 'put',
    params
  })
}
export function deletePhotoType(uniqueId) {
  return request({
    url: '/photoType',
    method: 'put',
    data: {
      uniqueId: uniqueId
    }
  })
}
