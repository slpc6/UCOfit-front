export interface UsuarioLogin {
    email: string;
    password: string;
  }


  export interface Usuario {
    nombre: string;
    apellido: string;
    password: string;
    email: string;
    descripcion: string;
    foto_perfil?: string;
    ciudad?: string;
    telefono?: string;
  }

  export interface UsuarioActualizar {
    nombre?: string;
    apellido?: string;
    email?: string;
    password?: string;
    descripcion?: string;
    foto_perfil?: string;
    ciudad?: string;
    telefono?: string;
  }