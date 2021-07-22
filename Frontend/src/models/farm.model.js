import User from './user.model';

export class Farm {
  constructor(data) {
    this.id = data._id? data._id: null;
    this.name = data.name? data.name: null;
    this.description = data.description? data.description: null;
    this.avatar = data.avatar? data.avatar: '/assets/img/bg/02.jpg';

    this.user = data.user? {
      id: data.user._id? data.user._id: null,
      username: data.user.username? data.user.username: null,
      email: data.user.email? data.user.email: null,
      avatar: data.user.avatar? data.user.avatar: '/assets/img/avatar/22.png',
      isAdmin: data.user.is_admin? true: false,
      detail: data.user.detail? {
        prefix: data.user.detail.prefix? data.user.detail.prefix: null,
        firstname: data.user.detail.firstname? data.user.detail.firstname: null,
        lastname: data.user.detail.lastname? data.user.detail.lastname: null,
        phone: data.user.detail.phone? data.user.detail.phone: null,
        address: data.user.detail.address? data.user.detail.address: null,
        province: data.user.detail.province? data.user.detail.province: null,
        zipcode: data.user.detail.zipcode? data.user.detail.zipcode: null,
      }: {}
    }: {
      id: null,
      username: null,
      email: null,
      avatar: '/assets/img/avatar/22.png',
      isAdmin: false,
      detail: {}
    }
    
  }
}
