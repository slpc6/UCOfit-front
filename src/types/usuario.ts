export interface UsuarioLogin {
    email: string;
    password: string;
  }
  

  export interface AuthResponse {
    access_token: string;
    token_type: string;
  }


  export interface Usuario {
    nombre: string;
    apellido: string;
    password: string;
    email: string;
    descripcion: string;
  }