import { useState, useEffect } from 'react';
import { Nav } from '@douyinfe/semi-ui';

import api from '../../api';
import awaiter from '../../utils/awaiter';

const Navigation = () => {
  const [rootCategories, setRootCategories] = useState([]);
  const retriveRootCategories = async () => {
    const [data, error] = await awaiter(api.home.fetchRootCategories());
    if (error) {
      return;
    }

    setRootCategories(data.map((x) => ({ itemKey: x.id, text: x.name })));
  };

  useEffect(() => {
    retriveRootCategories();
  }, []);

  return (
    <Nav
      mode='vertical'
      defaultSelectedKeys={['Home']}
      items={rootCategories}
    />
  );
};

export default Navigation;
