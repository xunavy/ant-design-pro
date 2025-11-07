import {
  ClearOutlined,
  FilterOutlined,
  MinusOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  Space,
  Tag,
} from 'antd';
import type { RangePickerProps } from 'antd/es/date-picker';
import type { FormInstance } from 'antd/es/form';
import React, { useState } from 'react';

const { Option } = Select;
const { RangePicker } = DatePicker;

interface StatisticsFilterProps {
  onFilterChange: (params: any) => void;
}

const StatisticsFilter: React.FC<StatisticsFilterProps> = ({
  onFilterChange,
}) => {
  const [form] = Form.useForm<FormInstance>();
  const [dateRange, setDateRange] = useState<RangePickerProps['value']>([]);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState('');

  const handleAddKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const handleRemoveKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const handleSearch = () => {
    form.validateFields().then((values) => {
      const params = {
        ...values,
        keywords,
        startTime: dateRange?.[0]?.format('YYYY-MM-DD HH:mm:ss'),
        endTime: dateRange?.[1]?.format('YYYY-MM-DD HH:mm:ss'),
      };
      onFilterChange(params);
    });
  };

  const handleReset = () => {
    form.resetFields();
    setDateRange([]);
    setKeywords([]);
    setKeywordInput('');
    onFilterChange({});
  };

  return (
    <div
      style={{
        background: '#fff',
        padding: 20,
        borderRadius: 8,
        boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{ matchMode: 'fuzzy' }}
      >
        <Row gutter={16}>
          <Col span={12}>
            <Form.Item label="关键字">
              <div
                style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}
              >
                <Input
                  placeholder="输入关键字"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onPressEnter={handleAddKeyword}
                  style={{ flex: 1 }}
                />
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={handleAddKeyword}
                  disabled={!keywordInput.trim()}
                >
                  添加
                </Button>
              </div>
              <div
                style={{
                  marginTop: 8,
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 8,
                }}
              >
                {keywords.map((keyword) => (
                  <Tag
                    key={keyword}
                    color="blue"
                    closable
                    onClose={() => handleRemoveKeyword(keyword)}
                  >
                    {keyword}
                    <MinusOutlined style={{ marginLeft: 4 }} />
                  </Tag>
                ))}
              </div>
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name="matchMode" label="匹配模式">
              <Select placeholder="选择匹配模式">
                <Option value="fuzzy">模糊匹配</Option>
                <Option value="exact">精确匹配</Option>
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
                onChange={(date, _dateString) => setDateRange(date)}
                placeholder={['开始时间', '结束时间']}
                style={{ width: '100%' }}
              />
            </Form.Item>
          </Col>
          <Col
            span={12}
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'flex-end',
            }}
          >
            <Space size="middle">
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                统计
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

export default StatisticsFilter;
