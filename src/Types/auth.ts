export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
}

export interface AuthResponse {
  success?: boolean;
  message?: string;
  data: {
    token: string;
    user: User;
  };
}

export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}
