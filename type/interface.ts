export interface UserDetails {
  fullName: string;
  dateOfBirth: string;
  maritalStatus: string;
  fatherName: string;
  motherMaidenName: string;
}

export interface FormErrors {
  fullName?: string;
  dateOfBirth?: string;
  maritalStatus?: string;
  fatherName?: string;
  motherMaidenName?: string;
}
