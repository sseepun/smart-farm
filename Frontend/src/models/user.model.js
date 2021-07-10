export class User {
  constructor(data) {
    this.id = data.id;
    this.firstname = data.firstname? data.firstname: '';
    this.lastname = data.lastname? data.lastname: '';
    this.username = data.username;
    this.email = data.email;
    this.avatar = data.avatar? data.avatar: '/assets/img/avatar/22.png';
    this.isAdmin = data.is_admin? true: false;

    this.accessToken = data.access_token;
    this.refreshToken = data.refresh_token;
  }
}
