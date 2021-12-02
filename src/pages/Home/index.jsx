import { useState, useEffect } from 'react';
import { Row, Col } from '@douyinfe/semi-ui';

import Navigation from './Navigation';
import Carousel from './Carousel';
import CategoryItem from './CategoryItem';

import api from '../../api';

import './index.scss';

export default function Home() {
  const [rootCategoryIds, setRootCategoryIds] = useState([]);
  const [categories, setCategories] = useState([]);
  const [items, setItems] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const levelSeparator = '-';

  async function retriveRootCategories() {
    const data = await api.home.fetchRootCategories();

    // root category 的 itemKey 变为字符串类型，方便后续操作
    setRootCategoryIds(data.map((x) => x.id));
    setCategories(data.map((x) => ({ itemKey: `${x.id}`, text: x.name })));
  }
  async function retriveSubCategories(rootCategoryId) {
    const data = await api.home.fetchSubCategories(rootCategoryId);

    const rootCategoryIndex = categories.findIndex(
      ({ itemKey }) => itemKey === rootCategoryId
    );
    const items = data.map(({ id, name, subCategories }) => {
      const itemKey = `${rootCategoryId}${levelSeparator}${id}`;
      const items = subCategories.map(({ subId, subName }) => {
        // console.log('level3: ', `${itemKey}${levelSeparator}${subId}`);
        return {
          itemKey: `${itemKey}${levelSeparator}${subId}`,
          text: subName,
        };
      });

      // console.log('level2: ', itemKey);
      return { itemKey, text: name, items };
    });

    categories[rootCategoryIndex] = {
      ...categories[rootCategoryIndex],
      items,
    };
    setCategories([...categories]);
  }
  async function handleNavClick({ itemKey, domEvent, isOpen }) {
    const itemKeys = itemKey.split(levelSeparator);

    // 如果已经获取了二级或三级数据，就不再执行后续
    if (categories.find((x) => x.itemKey === itemKeys[0])?.items) {
      if (itemKeys.length === 1) {
        // 一级菜单
        setOpenKeys(isOpen ? [itemKey] : []);
      } else if (itemKeys.length === 2) {
        // 二级菜单
        setOpenKeys(isOpen ? [itemKeys[0], itemKey] : [itemKeys[0]]);
      } else if (itemKeys.length === 3) {
        // 三级菜单
        setOpenKeys([
          itemKeys[0],
          `${itemKeys[0]}${levelSeparator}${itemKeys[1]}`,
          itemKey,
        ]);
      } else throw Error('不支持的菜单层级');

      return;
    }

    // 只有一级分类才调用获取下级分类接口，二级或三级分类不调用接口
    if (itemKey.includes(levelSeparator)) {
      return;
    }

    await retriveSubCategories(itemKey);
    setOpenKeys([itemKey]);
    // console.log('click: ', itemKey, domEvent, isOpen);
  }

  useEffect(() => {
    retriveRootCategories();
  }, []);

  useEffect(() => {
    async function retriveSixItems() {
      if (!rootCategoryIds) {
        return;
      }
      for (const rootCategoryId of rootCategoryIds) {
        await api.home.fetchCategorySixItems(rootCategoryId).then((data) => {
          setItems((state) => [...state, data]);
        });
      }
    }

    retriveSixItems();
  }, [rootCategoryIds]);

  return (
    <>
      <Row type='flex'>
        <Col span={23}>
          <Navigation
            style={{ position: 'absolute', zIndex: 1 }}
            openKeys={openKeys}
            categories={categories}
            handleNavClick={handleNavClick}
          />
          <Carousel />
        </Col>
      </Row>
      <Row
        type='flex'
        gutter={1}
        style={{
          marginTop: '40px',
        }}>
        {items.map((item) => {
          return (
            <Col span={12} key={item.rootCategoryId}>
              <CategoryItem {...item} />
            </Col>
          );
        })}
      </Row>
    </>
  );
}
