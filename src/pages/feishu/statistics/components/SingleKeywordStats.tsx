import { MessageOutlined, NumberOutlined } from '@ant-design/icons';
import { Card, Space, Statistic, Table } from 'antd';
import React from 'react';
import type { SingleFieldStat } from '@/services/feishu/typings';

interface SingleKeywordStatsProps {
  data: SingleFieldStat[];
}

const SingleKeywordStats: React.FC<SingleKeywordStatsProps> = ({ data }) => {
  // 表格列配置
  const topSendersColumns = [
    { title: '发送人', dataIndex: 'userName', key: 'userName' },
    { title: '发送次数', dataIndex: 'count', key: 'count', align: 'right' },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      {data.map((item) => (
        <Card
          key={item.keyword}
          title={`关键字: ${item.keyword}`}
          bordered={false}
        >
          <div style={{ marginBottom: 24 }}>
            <Space size="large">
              <Statistic
                title="总出现次数"
                value={item.totalOccurrences}
                prefix={<NumberOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Statistic
                title="包含该字段的消息数"
                value={item.messageCount}
                prefix={<MessageOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
            </Space>
          </div>

          <div>
            <h4 style={{ marginBottom: 16 }}>Top 发送人</h4>
            <Table
              dataSource={item.topSenders}
              columns={topSendersColumns}
              pagination={false}
              rowKey="userId"
              size="middle"
            />
          </div>
        </Card>
      ))}
    </Space>
  );
};

export default SingleKeywordStats;
