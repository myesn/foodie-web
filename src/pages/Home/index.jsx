import { Layout } from '@douyinfe/semi-ui';

import Navigation from './Navigation';
import Carousel from './Carousel';

import './index.scss';

const Home = () => {
  const { Sider } = Layout;

  return (
    <Layout>
      <Sider>
        <Navigation />
      </Sider>
      <Layout.Content>
        <Carousel />
      </Layout.Content>
    </Layout>
  );
};

export default Home;
