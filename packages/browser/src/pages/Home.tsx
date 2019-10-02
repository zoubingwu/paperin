import * as React from 'react';
import { useHistory } from 'react-router';
import { usePrivatePage } from '../hooks/usePrivatePage';

export const Home: React.FC = () => {
  usePrivatePage();

  const history = useHistory();

  return (
    <>
      <h2>home</h2>
      <button onClick={() => history.push('/login')}>to login</button>
    </>
  );
};
