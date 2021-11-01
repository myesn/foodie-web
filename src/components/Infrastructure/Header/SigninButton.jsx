import { useHistory } from 'react-router-dom';
import { Button } from '@douyinfe/semi-ui';
import { IconUserCircle } from '@douyinfe/semi-icons';

const SigninButton = () => {
  const history = useHistory();

  return (
    <Button
      icon={<IconUserCircle />}
      theme='solid'
      style={{ marginRight: 10 }}
      onClick={() => history.push('/signin')}>
      登录
    </Button>
  );
};

export default SigninButton;
