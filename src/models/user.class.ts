export class User {
  title: string;
  firstName: string;
  lastName: string;
  birthDate: number;
  street: string;
  zipCode: number;
  city: string;
  email: string;

  constructor(obj?: any) {
    this.title = obj ? obj.title : '';
    this.firstName = obj ? obj.firstName : '';
    this.lastName = obj ? obj.lastName : '';
    this.birthDate = obj ? obj.birthDate : 0;
    this.street = obj ? obj.street : '';
    this.zipCode = obj ? obj.zipCode : 0;
    this.city = obj ? obj.city : '';
    this.email = obj ? obj.email : '';
  }
}
