// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取飞书群列表 GET /api/feishu/groups */
export async function getFeishuGroups(options?: { [key: string]: any }) {
  return request<{ data: API.FeishuGroup[] }>('/api/feishu/groups', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 获取历史消息 GET /api/feishu/messages/history */
export async function getHistoryMessages(
  params: {
    groupId: string;
    startTime?: number;
    endTime?: number;
    current?: number;
    pageSize?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ data: API.PageResult<API.FeishuMessage> }>('/api/feishu/messages/history', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 获取实时消息 GET /api/feishu/messages/realtime */
export async function getRealtimeMessages(
  params: {
    groupId: string;
    lastMessageId?: string;
  },
  options?: { [key: string]: any },
) {
  return request<{ data: API.FeishuMessage[] }>('/api/feishu/messages/realtime', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 统计消息 GET /api/feishu/messages/statistics */
export async function getMessageStatistics(
  params: {
    groupId: string;
    keywords: string[];
    matchMode: 'exact' | 'fuzzy';
    startTime?: number;
    endTime?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ data: API.MessageStatisticsResult }>('/api/feishu/messages/statistics', {
    method: 'GET',
    params,
    ...(options || {}),
  });
}

/** 导出统计结果 POST /api/feishu/messages/export */
export async function exportStatistics(
  params: {
    groupId: string;
    keywords: string[];
    matchMode: 'exact' | 'fuzzy';
    startTime?: number;
    endTime?: number;
  },
  options?: { [key: string]: any },
) {
  return request<{ data: string }>('/api/feishu/messages/export', {
    method: 'POST',
    responseType: 'blob',
    data: params,
    ...(options || {}),
  });
}