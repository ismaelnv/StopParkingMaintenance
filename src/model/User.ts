export interface User{

    idUsuario: number;
    nombres: string;
    apellidos: string;
    correo: string;
    telefono: string;
    direccion: string;
    fechaRegistro: Date;
    rolUsuario: string;
    estado: boolean;
    contraseña: string
}