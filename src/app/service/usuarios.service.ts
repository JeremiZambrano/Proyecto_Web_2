import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../modelos/modelos';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  private listaUsuarios: Usuario[] = [];

  constructor(
    private readonly enrutador: Router,
    private readonly toastr: ToastrService
  ) {
    this.cargarUsuarios();
  }

  // Cargar los usuarios desde el almacenamiento local
  private cargarUsuarios(): void {
    const usuariosAlmacenados = localStorage.getItem('usuarios');
    this.listaUsuarios = usuariosAlmacenados
      ? JSON.parse(usuariosAlmacenados)
      : [];
  }

  // Generar un UUID para identificar de manera única a cada usuario
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Obtener la lista de usuarios
  obtenerUsuarios(): Usuario[] {
    return this.listaUsuarios;
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuario: Usuario): void {
    const existe = this.listaUsuarios.find(
      (usr) => usr.correo === usuario.correo || usr.ci === usuario.ci
    );

    if (existe) {
      this.toastr.error('Usuario ya existe', 'Error!');
    } else {
      const nuevoUsuario: Usuario = {
        id: this.generarUUID(),
        nombres: usuario.nombres,
        apellidos: usuario.apellidos,
        ci: usuario.ci,
        correo: usuario.correo,
        contrasena: usuario.contrasena,
        tipo: usuario.correo?.at(0) === 'e' ? 'Estudiante' : 'Profesor',
      };
      this.listaUsuarios.push(nuevoUsuario);
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.enrutador.navigate(['/login']);
      this.toastr.success('Usuario registrado con éxito', 'Ok!');
    }
  }

  // Iniciar sesión de un usuario
  iniciarSesion(correo: string, contrasena: string): void {
    const usuarioEncontrado = this.listaUsuarios.find(
      (usuario) => usuario.correo === correo
    );
    if (usuarioEncontrado) {
      if (usuarioEncontrado.contrasena === contrasena) {
        this.toastr.success(`Bienvenido ${usuarioEncontrado.nombres}`);
        localStorage.setItem(
          'usuarioActual',
          JSON.stringify(usuarioEncontrado)
        );
        this.enrutador.navigate(['/index']);
      } else {
        this.toastr.error('Contraseña incorrecta', 'Error!');
      }
    } else {
      this.toastr.error('Usuario no existe', 'Error!');
    }
  }

  // Cerrar sesión del usuario actual
  cerrarSesion(): void {
    localStorage.removeItem('usuarioActual');
    this.enrutador.navigate(['/index']);
  }

  // Obtener el usuario actual desde el almacenamiento local
  obtenerUsuarioActual(): Usuario | null {
    const usuario = localStorage.getItem('usuarioActual');
    return usuario ? JSON.parse(usuario) : null;
  }

  // Buscar un usuario por ID
  buscarUsuario(id: string): Usuario | undefined {
    return this.listaUsuarios.find((usr) => usr.id === id);
  }

  // Asignar un tutor a un estudiante
  asignarTutor(idEstudiante: string, idTutor: string): void {
    const estudiante = this.buscarUsuario(idEstudiante);
    const profesor = this.buscarUsuario(idTutor);
    if (estudiante) {
      const indice = this.listaUsuarios.findIndex(
        (usuario) => usuario.id === idEstudiante
      );
      this.listaUsuarios[indice] = {
        ...this.listaUsuarios[indice],
        tutor: profesor,
      };
      localStorage.setItem('usuarios', JSON.stringify(this.listaUsuarios));
      this.cargarUsuarios();
    }
  }
}
