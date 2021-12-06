import { Card, List } from '@douyinfe/semi-ui';
import { useNavigate } from 'react-router-dom';

export default function CategoryItem({
  rootCategoryName,
  rootCategorySlogan,
  rootCategoryBackgroundColor,
  items,
}) {
  const { Meta } = Card;
  const navigate = useNavigate();

  return (
    <Card
      bordered={false}
      title={<Meta title={rootCategoryName} description={rootCategorySlogan} />}
      style={{
        backgroundColor: rootCategoryBackgroundColor,
      }}>
      <List
        bordered={false}
        dataSource={items}
        renderItem={(item) => (
          <List.Item
            onClick={() => navigate(`/item/detail?itemId=${item.itemId}`)}>
            {item.itemName}
          </List.Item>
        )}
      />
    </Card>
  );
}
