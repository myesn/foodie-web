import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Descriptions } from '@douyinfe/semi-ui';

import api from '../../../api';

export default function ItemDetail() {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get('itemId');
  const [detail, setDetail] = useState({});

  // 根据选中的商品规格动态切换 itemSpecs
  const descriptions = [
    { key: '店铺优惠', value: '1' }, // itemSpecs.discounts
    { key: '促销价', value: '1' }, // itemSpecs.priceDiscount
    { key: '原价', value: '1' }, // itemSpecs.priceNormal
    { key: '累计销售', value: '1' }, // item.sellCounts
  ];

  // 库存 itemSpecs.stock

  useEffect(() => {
    api.item.fetchDetail(itemId).then((data) => {
      setDetail({ ...data });
    });
  }, [itemId]);

  return <Descriptions data={descriptions} />;
}
