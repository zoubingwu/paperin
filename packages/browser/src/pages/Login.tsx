import * as React from 'react';
import { createUseStyles } from 'react-jss';
import { Form, Icon, Input, Button } from 'antd';
import { useStore } from '../models';
import { observer } from 'mobx-react';

const useStyles = createUseStyles({
  form: {
    position: 'absolute',
    top: '45%',
    left: '50%',
    margin: '-160px 0 0 -160px',
    width: '320px',
    height: '240px',
    padding: '36px',
    boxShadow: '0 0 100px rgba(0,0,0,.08)',
  },
  button: {
    width: '100%',
  },
});

export const Login: React.FC = observer(() => {
  const classes = useStyles();
  const session = useStore('session');

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleLogin = React.useCallback(() => {
    if (!email || !password) {
      return;
    }

    session.login(email, password);
  }, [email, password]);

  return (
    <Form className={classes.form}>
      <Form.Item>
        <Input
          prefix={<Icon type='user' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='email'
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type='lock' style={{ color: 'rgba(0,0,0,.25)' }} />}
          placeholder='password'
          type='password'
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
      </Form.Item>
      <Form.Item>
        <Button
          className={classes.button}
          type='primary'
          onClick={handleLogin}
          disabled={session.loading}
        >
          {session.loading ? '登录中...' : '登录'}
        </Button>
      </Form.Item>
    </Form>
  );
});
