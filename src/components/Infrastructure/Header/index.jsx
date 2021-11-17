import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Layout, Nav } from '@douyinfe/semi-ui';
import { IconSemiLogo } from '@douyinfe/semi-icons';

import LoggedInAvatar from './LoggedInAvatar';
import SigninButton from './SigninButton';
import { selectIsAuthenticated } from '../../../utils/commonSelector';

const getUserButtonView = (isAuthenticated) => {
  return isAuthenticated ? <LoggedInAvatar /> : <SigninButton />;
};

const Header = () => {
  const navigate = useNavigate();
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const userButtonView = getUserButtonView(isAuthenticated);

  return (
    <Layout.Header style={{ backgroundColor: 'var(--semi-color-bg-1)' }}>
      <Nav mode='horizontal' defaultSelectedKeys={['Home']}>
        <Nav.Header>
          <IconSemiLogo
            style={{ fontSize: 36 }}
            onClick={() => navigate('/')}
          />
        </Nav.Header>
        <Nav.Footer style={{ marginRight: 10 }}>{userButtonView}</Nav.Footer>
      </Nav>
    </Layout.Header>
  );
};

export default Header;
