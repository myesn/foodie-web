import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import {
  Form,
  Button,
  Typography,
  Row,
  Col,
  Space,
  Toast,
} from '@douyinfe/semi-ui';

import { required, min } from '../../utils/formRule';
import awaiter from '../../utils/awaiter';
import { signinAction } from '../../actions/user';

const Signin = () => {
  const { Text } = Typography;
  const [signInLoading, setSignInLoading] = useState(false);
  const dispatch = useDispatch();
  const history = useHistory();
  const inputProps = {
    labelPosition: 'left',
    labelAlign: 'right',
    labelWidth: '80px',
    style: { width: '176px' },
  };
  const handleSignInClick = async (formApi) => {
    const [values, formError] = await awaiter(formApi.validate());
    if (formError) {
      return;
    }

    setSignInLoading(true);
    const [, error] = await awaiter(dispatch(signinAction(values)));
    setSignInLoading(false);
    if (error) {
      return;
    }

    Toast.success('登录成功');
    history.push('/');
  };

  return (
    <Row type='flex' justify='center'>
      <Col>
        <Form
          render={({ formApi }) => (
            <>
              <Form.Input
                field='username'
                label='用户名'
                {...inputProps}
                rules={[required('用户名不能为空')]}
              />
              <Form.Input
                field='password'
                label='密码'
                {...inputProps}
                rules={[required('密码不能为空'), min('密码长度不能小于6位')]}
              />

              <Space spacing='medium' vertical style={{ width: '100%' }}>
                <Button
                  theme='solid'
                  type='primary'
                  block
                  loading={signInLoading}
                  onClick={() => handleSignInClick(formApi)}>
                  登录
                </Button>
                <Text>
                  还没有账号？
                  <Link to='/signup'>
                    <Text underline mark strong>
                      去注册
                    </Text>
                  </Link>
                </Text>
              </Space>
            </>
          )}></Form>
      </Col>
    </Row>
  );
};

export default Signin;
