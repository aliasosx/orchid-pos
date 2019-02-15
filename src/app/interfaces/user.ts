export interface User {
  userId: string;
  userName: string;
  password: string;
  employeeCode: string;
  gender: string;
  fullName: string;
  dateOfbirth: Date;
  placeOfBirth: string;
  idCardno: string;
  photo: string;
  tel: string;
  mobile: string;
  enabled: boolean;
  role: {
    roleName: string;
    menus: any;
  },
  registeringDate: Date;
  employedDate: Date;
}
