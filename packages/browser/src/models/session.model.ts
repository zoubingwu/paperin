import { observable, action } from 'mobx';
import { rq } from '../utils/fetch';
import { history } from '../history';

export class SessionModel {
  @observable curretUserEmail: string;
  @observable curretUserId: number;
  @observable token: string;
  @observable loading = false;

  @action setUser(id: number, email: string, token: string) {
    this.token = token;
    this.curretUserEmail = email;
    this.curretUserId = id;
  }

  @action login(email: string, password: string) {
    this.loading = true;
    rq.post('/api/login', {
      email,
      password,
    }).then(action(res => {
      const token = res.data.access_token;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('email', res.data.email);
      window.localStorage.setItem('id', res.data.id);
      this.setUser(res.data.id, res.data.email, token);
      history.push('/');
    })).finally(action(() => {
      this.loading = false;
    }));
  }
}

export const session = new SessionModel();
