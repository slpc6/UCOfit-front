export interface User {
    email: string;
    password: string;
    rol: string;
  }
  

  export interface AuthResponse {
    access_token: string;
    token_type: string;
  }


  export interface UserProfile {
    nombre: string;
    apellido: string;
    email: string;
    descripcion: string;
    rol: string;
    puntuacion: number;
  }