export interface User {
  userId: string;
  googleId: number;
  userName: string;
  password: string;
  employeeCode: string;
  gender: string;
  fullName: string;
  dateOfbirth: Date;
  placeOfBirth: string;
  idCardno: string;
  photo: string;
  mobile: string;
  enabled: boolean;
  role: {
    roleName: string;
    menus: any;
  },
  registeringDate: Date;
  employedDate: Date;
}
