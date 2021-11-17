import { useNavigate } from 'react-router-dom';
import { Button } from '@douyinfe/semi-ui';
import { IconUserCircle } from '@douyinfe/semi-icons';

const SigninButton = () => {
  const navigate = useNavigate();

  return (
    <Button
      icon={<IconUserCircle />}
      theme='solid'
      style={{ marginRight: 10 }}
      onClick={() => navigate('/signin')}>
      登录
    </Button>
  );
};

export default SigninButton;
