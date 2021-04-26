import request from '@/utils/request'

export function listArticleApi(page, page_size) {
  return request({
    url: '/api/v1/blog/article',
    method: 'get',
    params: {
      page, page_size
    }
  })
}

export function commitArticleApi(title, document) {
  return request({
    url: '/api/v1/blog/article',
    method: 'post',
    data: {
      title, document
    }
  })
}

export function queryArticleDetail(pk) {
  return request({
    url: `/api/v1/blog/article/${pk}`,
    method: 'get'
  })
}
