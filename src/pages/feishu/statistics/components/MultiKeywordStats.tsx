import { Card, Space, Table } from 'antd';
import React from 'react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import type { MultiFieldStat } from '@/services/feishu/typings';

interface MultiKeywordStatsProps {
  data: {
    coOccurrences: MultiFieldStat[];
    comparison: { keyword: string; count: number }[];
  };
}

const MultiKeywordStats: React.FC<MultiKeywordStatsProps> = ({ data }) => {
  // 表格列配置
  const coOccurrencesColumns = [
    {
      title: '关键字组合',
      dataIndex: 'keywords',
      key: 'keywords',
      render: (keywords: string[]) => keywords.join(' & '),
    },
    {
      title: '共现次数',
      dataIndex: 'cooccurrenceCount',
      key: 'cooccurrenceCount',
      align: 'right',
    },
  ];

  return (
    <Space direction="vertical" size="large" style={{ width: '100%' }}>
      <Card title="字段共现次数" bordered={false}>
        <Table
          dataSource={data.coOccurrences}
          columns={coOccurrencesColumns}
          pagination={false}
          rowKey={(record) => record.keywords.join('-')}
          size="middle"
        />
      </Card>

      <Card title="各字段出现次数对比" bordered={false}>
        <div style={{ height: 400 }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data.comparison}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="keyword" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="count" fill="#1890ff" name="出现次数" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </Space>
  );
};

export default MultiKeywordStats;
