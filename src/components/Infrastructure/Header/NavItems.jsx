import { Nav } from '@douyinfe/semi-ui';

const NavItems = (props) => {
  return props.items.map((itemProperty) => {
    return <Nav.Item {...itemProperty} key={itemProperty.itemKey} />;
  });
};

export default NavItems;
