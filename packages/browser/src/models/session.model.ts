import { observable, action } from 'mobx';
import { rq } from '../utils/fetch';
import { history } from '../history';

export class SessionModel {
  @observable curretUserEmail: string;
  @observable curretUserId: string;
  @observable loading = false;
  @observable token: string;

  @action login(email: string, password: string) {
    this.loading = true;
    rq.post('/api/login', {
      email,
      password,
    }).then(action(res => {
      const token = res.data.access_token;
      window.localStorage.setItem('token', token);

      this.token = token;
      this.curretUserEmail = res.data.email;
      this.curretUserId = res.data.id;

      history.push('/');
    })).finally(action(() => {
      this.loading = false;
    }));
  }
}

export const session = new SessionModel();
