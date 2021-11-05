import React from 'react';
import { Layout, Skeleton } from '@douyinfe/semi-ui';

const Content = (props) => (
  <Layout.Content
    style={{
      padding: '24px',
      backgroundColor: 'var(--semi-color-bg-0)',
    }}>
    {/* <Breadcrumb
      style={{
        marginBottom: '24px',
      }}
      routes={['首页', '当这个页面标题很长时需要省略', '上一页', '详情页']}
    /> */}
    <div
      style={{
        borderRadius: '10px',
        border: '1px solid var(--semi-color-border)',
        height: '376px',
        padding: '32px',
      }}>
      <Skeleton placeholder={<Skeleton.Paragraph rows={2} />} loading={false}>
        {props.children}
      </Skeleton>
    </div>
  </Layout.Content>
);

export default Content;
