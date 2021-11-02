import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Avatar, Dropdown, Typography } from '@douyinfe/semi-ui';

import { selectAvatar, selectNickName } from '../../../utils/commonSelector';
import { signoutAction } from '../../../actions/user';

const LoggedInAvatar = () => {
  const avatar = useSelector(selectAvatar);
  const nickName = useSelector(selectNickName);
  const dispatch = useDispatch();
  const history = useHistory();
  const { Text } = Typography;

  const handleSignoutClick = () => dispatch(signoutAction());
  const handleAvatarClick = () => history.push('/profile');
  const menus = [
    {
      node: 'title',
      name: <Text>{nickName}</Text>,
      type: 'tertiary',
    },
    {
      node: 'item',
      name: '退出登录',
      type: 'danger',
      onClick: handleSignoutClick,
    },
  ];

  return (
    <Dropdown trigger='hover' menu={menus}>
      <Avatar size='small' src={avatar} onClick={handleAvatarClick} />
    </Dropdown>
  );
};

export default LoggedInAvatar;
