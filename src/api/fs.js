import request from '@/utils/request'

export function listFilesApi(page, page_size) {
  return request({
    url: '/api/v1/fs/list',
    method: 'get',
    params: {
      page, page_size
    }
  })
}

export function deleteFileApi(id) {
  return request({
    url: `/api/v1/fs/delete/${id}`,
    method: 'delete'
  })
}

export function setExportFileApi(id, exported) {
  return request({
    url: `/api/v1/fs/export/${id}`,
    method: 'post',
    data: { exported }
  })
}
