export interface User {
  userId: string;
  googleId: number;
  email: string;
  userName: string;
  password?: string;
  employeeCode: string;
  gender: string;
  fullName: string;
  dateOfbirth: Date;
  placeOfBirth: string;
  idCardno: string;
  photo: string;
  mobile: string;
  enabled: boolean;
  kitchen?: string;
  role: {
    roleName: string;
    menus: any;
  };
  menus?: any;
  registeringDate: Date;
  employedDate: Date;
}
