export class Farm {
  constructor(data) {
    this.id = data.id;
    this.name = data.name;
    this.description = data.description? data.description: '';
    this.avatar = data.avatar? data.avatar: '/assets/img/bg/02.jpg';
  }
}
