import request from '@/utils/request'

export function chatHistoryApi() {
  return request({
    url: '/api/v1/chat/history',
    method: 'get'
  })
}
