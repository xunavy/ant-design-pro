import React, { useState, useEffect } from 'react';
import { Table, Pagination, Card, Tag, Space, Tooltip } from 'antd';
import { 
  MessageOutlined, 
  FileTextOutlined, 
  PictureOutlined, 
  AudioOutlined, 
  VideoCameraOutlined, 
  UserOutlined,
  EyeOutlined
} from '@ant-design/icons';
import { useModel, useDispatch } from '@umijs/max';
import type { FeishuMessage } from '@/services/feishu/typings';
import MessageDetail from './MessageDetail';

interface MessageListProps {
  filterParams: any;
  type: 'history' | 'realtime';
}

const MessageList: React.FC<MessageListProps> = ({ filterParams, type }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [detailVisible, setDetailVisible] = useState(false);
  
  const { initialState } = useModel('@@initialState');

  // 模拟消息数据
  const mockMessages: Message[] = Array.from({ length: 50 }, (_, i) => ({
    id: `msg_${i + 1}`,
    chatId: 'oc_1234567890abcdef',
    chatName: '测试群',
    sender: {
      id: `user_${(i % 10) + 1}`,
      name: `用户${(i % 10) + 1}`,
      avatar: `https://ui-avatars.com/api/?name=用户${(i % 10) + 1}&background=random`
    },
    content: `这是一条${i % 2 === 0 ? '文本' : '富文本'}消息，包含关键字测试 ${i + 1}`,
    type: i % 5 === 0 ? 'text' : i % 5 === 1 ? 'post' : i % 5 === 2 ? 'image' : i % 5 === 3 ? 'file' : 'audio',
    timestamp: Date.now() - i * 60000, // 模拟不同时间的消息
    mentionedUsers: i % 3 === 0 ? [{ id: 'user_1', name: '用户1' }] : [],
    attachments: i % 4 === 0 ? [{ name: `附件${i + 1}.pdf`, size: 1024 * 1024 }] : []
  }));

  // 根据消息类型获取对应的图标
  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <MessageOutlined style={{ color: '#1890ff' }} />;
      case 'post':
        return <FileTextOutlined style={{ color: '#52c41a' }} />;
      case 'image':
        return <PictureOutlined style={{ color: '#fa8c16' }} />;
      case 'audio':
        return <AudioOutlined style={{ color: '#722ed1' }} />;
      case 'video':
        return <VideoCameraOutlined style={{ color: '#eb2f96' }} />;
      default:
        return <MessageOutlined style={{ color: '#1890ff' }} />;
    }
  };

  // 根据消息类型获取对应的标签
  const getMessageTypeTag = (type: string) => {
    switch (type) {
      case 'text':
        return <Tag color="blue">文本</Tag>;
      case 'post':
        return <Tag color="green">富文本</Tag>;
      case 'image':
        return <Tag color="orange">图片</Tag>;
      case 'file':
        return <Tag color="purple">文件</Tag>;
      case 'audio':
        return <Tag color="magenta">音频</Tag>;
      case 'video':
        return <Tag color="red">视频</Tag>;
      default:
        return <Tag color="gray">未知</Tag>;
    }
  };

  // 加载消息数据
  const loadMessages = () => {
    setLoading(true);
    
    // 模拟API请求延迟
    setTimeout(() => {
      // 这里可以根据filterParams进行实际的API请求
      // 目前使用模拟数据
      const startIndex = (currentPage - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      const paginatedMessages = mockMessages.slice(startIndex, endIndex);
      
      setMessages(paginatedMessages);
      setTotal(mockMessages.length);
      setLoading(false);
    }, 500);
  };

  // 当筛选条件变化时，重新加载第一页数据
  useEffect(() => {
    setCurrentPage(1);
  }, [filterParams]);

  // 当页码或每页条数变化时，重新加载数据
  useEffect(() => {
    loadMessages();
  }, [currentPage, pageSize]);

  // 实时消息轮询
  useEffect(() => {
    if (type === 'realtime') {
      const interval = setInterval(() => {
        // 模拟实时消息推送
        const newMessage: Message = {
          id: `msg_${Date.now()}`,
          chatId: 'oc_1234567890abcdef',
          chatName: '测试群',
          sender: {
            id: `user_${Math.floor(Math.random() * 10) + 1}`,
            name: `用户${Math.floor(Math.random() * 10) + 1}`,
            avatar: `https://ui-avatars.com/api/?name=用户${Math.floor(Math.random() * 10) + 1}&background=random`
          },
          content: `这是一条实时消息 ${new Date().toLocaleTimeString()}`,
          type: 'text',
          timestamp: Date.now(),
          mentionedUsers: [],
          attachments: []
        };
        
        setMessages(prev => [newMessage, ...prev]);
      }, 5000);

      return () => clearInterval(interval);
    }
  }, [type]);

  // 表格列配置
  const columns = [
    {
      title: '消息类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => (
        <Space>
          {getMessageTypeIcon(type)}
          {getMessageTypeTag(type)}
        </Space>
      )
    },
    {
      title: '发送人',
      dataIndex: 'sender',
      key: 'sender',
      width: 120,
      render: (sender: { name: string; avatar: string }) => (
        <Space align="center">
          <img src={sender.avatar} alt={sender.name} style={{ width: 32, height: 32, borderRadius: '50%' }} />
          <span>{sender.name}</span>
        </Space>
      )
    },
    {
      title: '消息内容',
      dataIndex: 'content',
      key: 'content',
      ellipsis: true,
      render: (content: string, record: Message) => (
        <Tooltip title={content}>
          <span>{content}</span>
        </Tooltip>
      )
    },
    {
      title: '@成员',
      dataIndex: 'mentionedUsers',
      key: 'mentionedUsers',
      width: 150,
      render: (users: { name: string }[]) => (
        <Space>
          {users.map((user, index) => (
            <Tag key={index} color="blue" icon={<UserOutlined />}>
              {user.name}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '附件',
      dataIndex: 'attachments',
      key: 'attachments',
      width: 120,
      render: (attachments: { name: string }[]) => (
        <Space direction="vertical" size="small">
          {attachments.map((attach, index) => (
            <Tag key={index} color="gray">
              {attach.name}
            </Tag>
          ))}
        </Space>
      )
    },
    {
      title: '发送时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      width: 180,
      sorter: (a: Message, b: Message) => a.timestamp - b.timestamp,
      render: (timestamp: number) => (
        <span>{new Date(timestamp).toLocaleString()}</span>
      )
    },
    {
      title: '操作',
      key: 'action',
      width: 80,
      render: (_, record: Message) => (
        <Space>
          <Tooltip title="查看详情">
            <EyeOutlined 
              style={{ cursor: 'pointer', color: '#1890ff' }} 
              onClick={() => {
                setSelectedMessage(record);
                setDetailVisible(true);
              }}
            />
          </Tooltip>
        </Space>
      )
    }
  ];

  return (
    <Card style={{ marginTop: 20 }}>
      <Table
        columns={columns}
        dataSource={messages}
        rowKey="id"
        loading={loading}
        pagination={false}
        scroll={{ x: 1000 }}
      />
      <Pagination
        current={currentPage}
        pageSize={pageSize}
        total={total}
        onChange={(page, size) => {
          setCurrentPage(page);
          setPageSize(size);
        }}
        showSizeChanger
        pageSizeOptions={['10', '20', '50', '100']}
        showTotal={(total) => `共 ${total} 条消息`}
        style={{ marginTop: 16, textAlign: 'right' }}
      />
      <MessageDetail
        visible={detailVisible}
        message={selectedMessage}
        onClose={() => setDetailVisible(false)}
      />
    </Card>
  );
};

export default MessageList;