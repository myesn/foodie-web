import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Layout, Nav, Button } from '@douyinfe/semi-ui';
import {
  IconSemiLogo,
  IconBell,
  IconHelpCircle,
  IconHome,
  IconLive,
  IconSetting,
} from '@douyinfe/semi-icons';

import LoggedInAvatar from './LoggedInAvatar';
import SigninButton from './SigninButton';
import NavItems from './NavItems';
import { selectIsAuthenticated } from '../../../utils/commonSelector';

const getUserButtonView = (isAuthenticated) => {
  return isAuthenticated ? <LoggedInAvatar /> : <SigninButton />;
};

const Header = () => {
  const history = useHistory();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userButtonView = getUserButtonView(isAuthenticated);

  const navItems = [
    {
      itemKey: 'Home',
      text: '首页',
      icon: <IconHome size='large' />,
      onClick: () => {
        history.push('/');
      },
    },
    { itemKey: 'Live', text: '直播', icon: <IconLive size='large' /> },
    { itemKey: 'Setting', text: '设置', icon: <IconSetting size='large' /> },
  ];

  return (
    <Layout.Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <div>
        <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
          <Nav.Header>
            <IconSemiLogo style={{ fontSize: 36 }} />
          </Nav.Header>
          <NavItems items={navItems} />
          <Nav.Footer style={{ marginRight: 10 }}>
            <Button
              theme='borderless'
              icon={<IconBell size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            <Button
              theme='borderless'
              icon={<IconHelpCircle size='large' />}
              style={{
                color: 'var(--semi-color-text-2)',
                marginRight: '12px',
              }}
            />
            {userButtonView}
          </Nav.Footer>
        </Nav>
      </div>
    </Layout.Header>
  );
};

export default Header;
