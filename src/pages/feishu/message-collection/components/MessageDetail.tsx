import {
  AudioOutlined,
  FileTextOutlined,
  MessageOutlined,
  PaperClipOutlined,
  PictureOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Card, Descriptions, Modal, Space, Tag } from 'antd';
import React from 'react';
import type { Message } from '@/models/feishu';

interface MessageDetailProps {
  visible: boolean;
  message: Message | null;
  onClose: () => void;
}

const MessageDetail: React.FC<MessageDetailProps> = ({
  visible,
  message,
  onClose,
}) => {
  if (!message) return null;

  // 根据消息类型获取对应的图标
  const getMessageTypeIcon = (type: string) => {
    switch (type) {
      case 'text':
        return <MessageOutlined style={{ color: '#1890ff', fontSize: 24 }} />;
      case 'post':
        return <FileTextOutlined style={{ color: '#52c41a', fontSize: 24 }} />;
      case 'image':
        return <PictureOutlined style={{ color: '#fa8c16', fontSize: 24 }} />;
      case 'audio':
        return <AudioOutlined style={{ color: '#722ed1', fontSize: 24 }} />;
      case 'video':
        return (
          <VideoCameraOutlined style={{ color: '#eb2f96', fontSize: 24 }} />
        );
      default:
        return <MessageOutlined style={{ color: '#1890ff', fontSize: 24 }} />;
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

  // 格式化文件大小
  const formatFileSize = (size: number) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <Modal
      title="消息详情"
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={700}
    >
      <Card>
        <Descriptions column={1} bordered>
          <Descriptions.Item label="消息类型">
            <Space align="center">
              {getMessageTypeIcon(message.type)}
              {getMessageTypeTag(message.type)}
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="发送人">
            <Space align="center">
              <img
                src={message.sender.avatar}
                alt={message.sender.name}
                style={{ width: 40, height: 40, borderRadius: '50%' }}
              />
              <span style={{ fontSize: 16, fontWeight: 500 }}>
                {message.sender.name}
              </span>
              <Tag color="blue">ID: {message.sender.id}</Tag>
            </Space>
          </Descriptions.Item>
          <Descriptions.Item label="发送时间">
            {new Date(message.timestamp).toLocaleString()}
          </Descriptions.Item>
          <Descriptions.Item label="消息内容">
            <div
              style={{
                whiteSpace: 'pre-wrap',
                wordBreak: 'break-word',
                fontSize: 14,
              }}
            >
              {message.content}
            </div>
          </Descriptions.Item>
          {message.mentionedUsers && message.mentionedUsers.length > 0 && (
            <Descriptions.Item label="@成员">
              <Space wrap>
                {message.mentionedUsers.map((user) => (
                  <Tag key={user.id} color="blue" icon={<UserOutlined />}>
                    {user.name} (ID: {user.id})
                  </Tag>
                ))}
              </Space>
            </Descriptions.Item>
          )}
          {message.attachments && message.attachments.length > 0 && (
            <Descriptions.Item label="附件">
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                {message.attachments.map((attach) => (
                  <div
                    key={`${attach.name}-${attach.type}-${attach.size}`}
                    style={{ display: 'flex', alignItems: 'center', gap: 8 }}
                  >
                    <PaperClipOutlined style={{ color: '#1890ff' }} />
                    <span style={{ flex: 1 }}>{attach.name}</span>
                    {attach.size && (
                      <Tag color="gray">{formatFileSize(attach.size)}</Tag>
                    )}
                  </div>
                ))}
              </Space>
            </Descriptions.Item>
          )}
        </Descriptions>
      </Card>
    </Modal>
  );
};

export default MessageDetail;
