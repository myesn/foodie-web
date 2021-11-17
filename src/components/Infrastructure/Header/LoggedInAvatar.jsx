import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Avatar, Dropdown, Typography } from '@douyinfe/semi-ui';

import awaiter from '../../../utils/awaiter';
import {
  selectAvatar,
  selectNickName,
  selectUserId,
} from '../../../utils/commonSelector';
import { signoutAction } from '../../../actions/user';

const LoggedInAvatar = () => {
  const avatar = useSelector(selectAvatar);
  const nickName = useSelector(selectNickName);
  const userId = useSelector(selectUserId);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Text } = Typography;

  const handleSignoutClick = async () => {
    const [, error] = await awaiter(dispatch(signoutAction(userId)));
    if (error) {
      return;
    }
  };
  const handleAvatarClick = () => navigate('/profile');
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
