import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Form, Button, Col, Row, Toast } from '@douyinfe/semi-ui';

import awaiter from '../../utils/awaiter';
import { required, min } from '../../utils/formRule';
import { user } from '../../api';

const Signup = () => {
  const [signupLoading, setSignupLoading] = useState(false);
  const history = useHistory();
  const inputProps = {
    labelPosition: 'left',
    labelAlign: 'right',
    labelWidth: '84px',
    style: { width: '190px' },
  };

  const validateUsername = async (value) => {
    if (!value) {
      return '用户名不能为空';
    }

    const [, error] = await awaiter(user.checkUsername(value));
    if (error) {
      return error.response.data.message;
    }

    return '';
  };

  const handleSignupClick = async (formApi) => {
    const [values, formError] = await awaiter(formApi.validate());
    if (formError) {
      return;
    }

    const { signup } = user;

    setSignupLoading(true);
    const [, error] = await awaiter(signup(values));
    setSignupLoading(false);

    if (error) {
      return;
    }

    Toast.success('注册成功');
    history.push('/signin');
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
                validate={validateUsername}
                trigger='blur'
                rules={[required('用户名不能为空')]}
              />
              <Form.Input
                field='password'
                label='密码'
                {...inputProps}
                rules={[required('密码不能为空'), min('密码长度不能小于6位')]}
              />
              <Form.Input
                field='confirmPassword'
                label='确认密码'
                {...inputProps}
                rules={[
                  required('确认密码不能为空'),
                  min('确认密码长度不能小于6位'),
                ]}
              />
              <Button
                type='primary'
                theme='solid'
                loading={signupLoading}
                block
                onClick={() => {
                  handleSignupClick(formApi);
                }}>
                注册
              </Button>
            </>
          )}></Form>
      </Col>
    </Row>
  );
};

export default Signup;
