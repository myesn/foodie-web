import { useState, useEffect } from 'react';
import { Nav } from '@douyinfe/semi-ui';

import api from '../../api';
import task from '../../utils/task';

export default function Navigation() {
  const [categories, setCategories] = useState([]);
  const [openKeys, setOpenKeys] = useState([]);
  const levelSeparator = '-';
  const retriveRootCategories = async () => {
    const [data, error] = await task(api.home.fetchRootCategories());
    if (error) {
      return;
    }

    // root category 的 itemKey 变为字符串类型，方便后续操作
    setCategories(data.map((x) => ({ itemKey: `${x.id}`, text: x.name })));
  };

  const retriveSubCategories = async (rootCategoryId) => {
    const [data, error] = await task(
      api.home.fetchSubCategories(rootCategoryId)
    );
    if (error) {
      return;
    }

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
  };

  useEffect(() => {
    retriveRootCategories();
  }, []);

  return (
    <Nav
      limitIndent={false}
      items={categories}
      openKeys={openKeys}
      onClick={async ({ itemKey, domEvent, isOpen }) => {
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
      }}
    />
  );
}
