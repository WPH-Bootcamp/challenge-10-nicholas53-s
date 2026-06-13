// Data user dari server.
export interface User {
  id: number;
  name: string;
  email: string;
  phone?: string;
  avatar?: string | null;
}

// Response sukses dari login/register.

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}

// Payload yang dikirim ke endpoint register.
export interface RegisterPayload {
  name: string;
  email: string;
  phone: string;
  password: string;
}

// Payload login.
export interface LoginPayload {
  email: string;
  password: string;
}
