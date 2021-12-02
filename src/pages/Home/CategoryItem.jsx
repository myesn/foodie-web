import { Card, List } from '@douyinfe/semi-ui';

export default function CategoryItem({
  rootCategoryName,
  rootCategorySlogan,
  rootCategoryBackgroundColor,
  items,
}) {
  const { Meta } = Card;
  const data = items?.map((item) => item.itemName);

  return (
    <Card
      bordered={false}
      title={<Meta title={rootCategoryName} description={rootCategorySlogan} />}
      style={{
        backgroundColor: rootCategoryBackgroundColor,
      }}>
      <List
        bordered={false}
        dataSource={data}
        renderItem={(item) => <List.Item>{item}</List.Item>}
      />
    </Card>
  );
}
