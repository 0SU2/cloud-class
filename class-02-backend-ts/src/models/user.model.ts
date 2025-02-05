export interface User {
    id?: string;
    nombre: string;
    apaterno: string;
    amaterno: string;
    direccion: string;
    telefono: string;
    ciudad:string;
    estado:string;
    username:string;
    password: string;
    rol: 'admin' | 'recursos' | 'marketing' | 'usuario';
}
