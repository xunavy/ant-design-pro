import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Card, Tabs, Space, Button } from 'antd';
import { ExportOutlined } from '@ant-design/icons';
import StatisticsFilter from './components/StatisticsFilter';
import SingleKeywordStats from './components/SingleKeywordStats';
import MultiKeywordStats from './components/MultiKeywordStats';
import type { MessageStatisticsResult } from '@/services/feishu/typings';

const { TabPane } = Tabs;

const Statistics: React.FC = () => {
  const [statisticsResult, setStatisticsResult] = useState<MessageStatisticsResult | null>(null);
  const [filterParams, setFilterParams] = useState<any>({});

  const handleFilterChange = (params: any) => {
    setFilterParams(params);
    // 这里可以调用统计API获取结果
    // mock data for now
    const mockResult: MessageStatisticsResult = {
      singleKeywordStats: [
        {
          keyword: '测试',
          totalOccurrences: 50,
          messageCount: 30,
          topSenders: [
            { senderId: 'user_1', senderName: '用户1', count: 15 },
            { senderId: 'user_2', senderName: '用户2', count: 10 },
            { senderId: 'user_3', senderName: '用户3', count: 5 },
          ],
        },
        {
          keyword: '任务',
          totalOccurrences: 30,
          messageCount: 20,
          topSenders: [
            { senderId: 'user_2', senderName: '用户2', count: 8 },
            { senderId: 'user_1', senderName: '用户1', count: 7 },
            { senderId: 'user_4', senderName: '用户4', count: 5 },
          ],
        },
      ],
      multiKeywordStats: {
        coOccurrences: [
          { keywords: ['测试', '任务'], count: 15 },
          { keywords: ['测试', '完成'], count: 10 },
          { keywords: ['任务', '完成'], count: 8 },
        ],
        comparison: [
          { keyword: '测试', count: 50 },
          { keyword: '任务', count: 30 },
          { keyword: '完成', count: 25 },
        ],
      },
    };
    setStatisticsResult(mockResult);
  };

  const handleExport = () => {
    // 这里可以调用导出API
    console.log('Exporting statistics...', filterParams);
  };

  return (
    <PageContainer title="飞书消息统计">
      <Card style={{ marginBottom: 20 }}>
        <StatisticsFilter onFilterChange={handleFilterChange} />
        <div style={{ textAlign: 'right', marginTop: 16 }}>
          <Button type="primary" icon={<ExportOutlined />} onClick={handleExport}>
            导出统计结果
          </Button>
        </div>
      </Card>

      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
        <TabPane tab="单字段统计" key="1">
          {statisticsResult && <SingleKeywordStats data={statisticsResult.singleKeywordStats} />}
        </TabPane>
        <TabPane tab="多字段统计" key="2">
          {statisticsResult && <MultiKeywordStats data={statisticsResult.multiKeywordStats} />}
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default Statistics;