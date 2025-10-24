export interface PasswordRecoveryRequest {
  email: string;
}

export interface PasswordResetRequest {
  token: string;
  new_password: string;
}

export interface TokenValidationResponse {
  valid: boolean;
  msg: string;
}
