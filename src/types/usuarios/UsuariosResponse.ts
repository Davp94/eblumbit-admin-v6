export interface UsuariosResponse {
    id: number;
    username: string;
    correo: string;
    nombres: string;
    apellidos: string;
    rolIds: number[];
    sucursalId: number[];
}