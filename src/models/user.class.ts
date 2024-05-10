export class User {
  id?: string;
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  birthDate: number = 0;
  street: string = '';
  zipCode: number = 0;
  city: string = '';
  email: string = '';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
