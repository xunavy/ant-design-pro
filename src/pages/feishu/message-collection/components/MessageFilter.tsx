import React, { useState } from 'react';
import { Form, Input, Select, DatePicker, Button, Space, Row, Col } from 'antd';
import { SearchOutlined, FilterOutlined, ClearOutlined } from '@ant-design/icons';
import type { FormInstance } from 'antd/es/form';
import type { RangePickerProps } from 'antd/es/date-picker';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface MessageFilterProps {
  onFilterChange: (params: any) => void;
}

const MessageFilter: React.FC<MessageFilterProps> = ({ onFilterChange }) => {
  const [form] = Form.useForm<FormInstance>();
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>([]);

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const params = {
        ...values,
        startTime: dateRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      };
      onFilterChange(params);
    });
  };

  const handleReset = () => {
    form.resetFields();
    setDateRange([]);
    onFilterChange({});
  };

  return (
    <div style={{ background: '#fff', padding: 20, borderRadius: 8, boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)' }}>
      <Form form={form} layout="vertical" initialValues={{ matchMode: 'fuzzy', messageType: 'all' }}>
        <Row gutter={16}>
          <Col span={8}>
            <Form.Item name="keyword" label="关键字">
              <Input placeholder="输入关键字，多个关键字用逗号分隔" prefix={<SearchOutlined />} />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="matchMode" label="匹配模式">
              <Select placeholder="选择匹配模式">
                <Option value="fuzzy">模糊匹配</Option>
                <Option value="exact">精确匹配</Option>
              </Select>
            </Form.Item>
          </Col>
          <Col span={8}>
            <Form.Item name="messageType" label="消息类型">
              <Select placeholder="选择消息类型">
                <Option value="all">全部</Option>
                <Option value="text">文本消息</Option>
                <Option value="post">富文本消息</Option>
                <Option value="image">图片消息</Option>
                <Option value="file">文件消息</Option>
                <Option value="audio">音频消息</Option>
                <Option value="video">视频消息</Option>
                <Option value="sticker">表情消息</Option>
                <Option value="location">位置消息</Option>
                <Option value="share_chat">分享会话消息</Option>
                <Option value="share_user">分享用户消息</Option>
              </Select>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="时间范围">
              <RangePicker
                showTime
                value={dateRange}
                onChange={(date, dateString) => setDateRange(date)}
                placeholder={['开始时间', '结束时间']}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col span={12} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Space size="middle">
              <Button type="primary" icon={<SearchOutlined />} onClick={handleSearch}>
                搜索
              </Button>
              <Button icon={<FilterOutlined />} onClick={handleSearch}>
                筛选
              </Button>
              <Button icon={<ClearOutlined />} onClick={handleReset}>
                重置
              </Button>
            </Space>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default MessageFilter;