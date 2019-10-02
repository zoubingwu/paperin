import { useHistory } from 'react-router';
import { useEffect } from 'react';
import { useStore } from '../models';

export function usePrivatePage() {
  const history = useHistory();
  const session = useStore('session');
  useEffect(() => {
    if (!session.token) {
      history.push('/login');
    }
  }, []);
}
