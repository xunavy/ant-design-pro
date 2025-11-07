import React, { useState } from 'react';
import { PageContainer } from '@ant-design/pro-components';
import { Tabs } from 'antd';
import MessageList from './components/MessageList';
import MessageFilter from './components/MessageFilter';
import type { Message } from '@/models/feishu';

const { TabPane } = Tabs;

const MessageCollection: React.FC = () => {
  const [filterParams, setFilterParams] = useState({
    keyword: '',
    startTime: '',
    endTime: '',
    messageType: '',
  });

  const handleFilterChange = (params: any) => {
    setFilterParams(params);
  };

  return (
    <PageContainer title="飞书消息收集">
      <MessageFilter onFilterChange={handleFilterChange} />
      <Tabs defaultActiveKey="1" style={{ marginTop: 20 }}>
        <TabPane tab="历史消息" key="1">
          <MessageList filterParams={filterParams} type="history" />
        </TabPane>
        <TabPane tab="实时消息" key="2">
          <MessageList filterParams={filterParams} type="realtime" />
        </TabPane>
      </Tabs>
    </PageContainer>
  );
};

export default MessageCollection;