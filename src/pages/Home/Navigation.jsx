import { Nav } from '@douyinfe/semi-ui';

export default function Navigation({
  categories,
  style,
  handleNavClick,
  openKeys,
}) {
  return (
    <Nav
      style={style}
      limitIndent={false}
      items={categories}
      openKeys={openKeys}
      onClick={({ itemKey, domEvent, isOpen }) => {
        handleNavClick({ itemKey, domEvent, isOpen });
      }}
    />
  );
}
