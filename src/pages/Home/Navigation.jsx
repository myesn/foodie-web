import { useState, useEffect, useCallback } from 'react';
import { Nav } from '@douyinfe/semi-ui';

import api from '../../api';
import task from '../../utils/task';

const Navigation = () => {
  const [selectedRootCategoryId, setSelectedRootCategoryId] = useState(null);
  const [categories, setCategories] = useState([]);
  const retriveRootCategories = useCallback(async () => {
    const [data, error] = await task(api.home.fetchRootCategories());
    if (error) {
      return;
    }

    setCategories(
      data.map((x) => ({ itemKey: x.id, text: x.name, items: [] }))
    );
  }, []);

  const retriveSubCategories = useCallback(async () => {
    const [data, error] = await task(
      api.home.fetchSubCategories(selectedRootCategoryId)
    );
    if (error) {
      return;
    }
    const findRootCategory = () =>
      categories.find(({ itemKey }) => itemKey === selectedRootCategoryId);
    const findRootCategoryIndex = () =>
      categories.findIndex(({ itemKey }) => itemKey === selectedRootCategoryId);
    const rootCategory = findRootCategory();
    const rootCategoryIndex = findRootCategoryIndex();
    rootCategory.items = data.map(({ id, name, subCategories }) => {
      const items = subCategories.map(({ subId, subName }) => ({
        itemKey: subId,
        text: subName,
      }));

      return { itemKey: id, text: name, items };
    });

    categories[rootCategoryIndex] = rootCategory;

    setCategories(categories);
  }, [selectedRootCategoryId]);

  useEffect(() => {
    retriveRootCategories();
  }, [retriveRootCategories]);

  useEffect(() => {
    if (!selectedRootCategoryId) {
      return;
    }

    retriveSubCategories();
  }, [retriveSubCategories]);

  return (
    <Nav
      mode='vertical'
      defaultSelectedKeys={['Home']}
      items={categories}
      onClick={({ itemKey, domEvent, isOpen }) => {
        setSelectedRootCategoryId(itemKey);
        // console.log('click: ', itemKey, domEvent, isOpen);
      }}
    />
  );
};

export default Navigation;
