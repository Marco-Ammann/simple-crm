export class User {
  id?: string;
  title: string = '';
  firstName: string = '';
  lastName: string = '';
  birthDate: number = 0;
  street: string = '';
  zipCode?: number;
  city: string = '';
  email: string = '';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}
