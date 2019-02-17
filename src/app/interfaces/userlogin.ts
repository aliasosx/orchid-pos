export interface Userlogin {
  id: number;
  gender: string;
  family_name: string;
  given_name: string;
  name: string;
  picture: string;
  email: string;
  providerId: string;
  links: string;
  phonenumber?: string;
  locale: string;
  verified_email: boolean;
}
