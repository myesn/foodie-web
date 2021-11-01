import { Layout } from '@douyinfe/semi-ui';

import Header from './Header';
import Content from './Content';
import Footer from './Footer';

const Infrastructure = (props) => {
  return (
    <Layout style={{ border: '1px solid var(--semi-color-border)' }}>
      <Header />
      <Content>{props.children}</Content>
      <Footer />
    </Layout>
  );
};

export default Infrastructure;
