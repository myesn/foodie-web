import { Layout } from '@douyinfe/semi-ui';
import { Outlet } from 'react-router';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Infrastructure = (props) => {
  return (
    <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Header />
      <Content>
        <Outlet />
      </Content>
      <Footer />
    </Layout>
  );
};

export default Infrastructure;
