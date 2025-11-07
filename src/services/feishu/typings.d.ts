declare namespace API {
  /** 飞书群信息 */
  interface FeishuGroup {
    groupId: string;
    groupName: string;
    groupDescription?: string;
    memberCount?: number;
    createdAt?: number;
  }

  /** 飞书消息 */
  interface FeishuMessage {
    messageId: string;
    groupId: string;
    sender: {
      userId: string;
      userName: string;
      userAvatar?: string;
    };
    content: string;
    messageType: 'text' | 'image' | 'audio' | 'video' | 'file' | 'mixed';
    attachments?: {
      name: string;
      type: string;
      size?: number;
      url?: string;
    }[];
    mentionedUsers?: {
      userId: string;
      userName: string;
    }[];
    sendTime: number;
    createdAt: number;
  }

  /** 消息统计结果 */
  interface MessageStatisticsResult {
    singleFieldStats: SingleFieldStat[];
    multiFieldStats: MultiFieldStat[];
  }

  /** 单字段统计 */
  interface SingleFieldStat {
    keyword: string;
    totalOccurrences: number;
    messageCount: number;
    topSenders: {
      userId: string;
      userName: string;
      count: number;
    }[];
  }

  /** 多字段统计 */
  interface MultiFieldStat {
    keywords: string[];
    cooccurrenceCount: number;
  }

  /** 分页结果 */
  interface PageResult<T> {
    list: T[];
    total: number;
    current: number;
    pageSize: number;
  }
}