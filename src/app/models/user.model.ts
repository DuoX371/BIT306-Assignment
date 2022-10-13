export interface User {
  id: string;
  username: string;
  password: string;
  type: string;
}

export interface Volunteer extends User {
  fullname: string;
  email: string;
  phone: string;
  occupation: string;
  dateofbirth: string;
}

export interface SchoolAdmin extends User {
  fullname: string;
  email: string;
  phone: string;
  staffid: string;
  position: string;
  schoolId?: string;
}
