export class User {
  constructor(data) {
    this.id = data._id? data._id: null;
    this.username = data.username? data.username: null;
    this.email = data.email? data.email: null;
    this.avatar = data.avatar? data.avatar: '/assets/img/avatar/22.png';
    this.isAdmin = data.is_admin? true: false;
    this.detail = data.detail? {
      prefix: data.detail.prefix? data.detail.prefix: null,
      firstname: data.detail.firstname? data.detail.firstname: null,
      lastname: data.detail.lastname? data.detail.lastname: null,
      phone: data.detail.phone? data.detail.phone: null,
      address: data.detail.address? data.detail.address: null,
      province: data.detail.province? data.detail.province: null,
      zipcode: data.detail.zipcode? data.detail.zipcode: null,
    }: {};
  }
}
