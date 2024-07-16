import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios

@Component({
  selector: 'app-definir-tutor', // Selector para el componente
  templateUrl: './definir-tutor.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './definir-tutor.component.css', // Ruta del archivo de estilos CSS
})
export class DefinirTutorComponent implements OnInit {
  usuarioActual: Usuario | null = null; // Variable para almacenar el usuario actual
  listaUsuarios: Usuario[] = []; // Variable para almacenar la lista de usuarios
  listaProfesores: Usuario[] = []; // Variable para almacenar la lista de profesores

  // Inyectar el servicio de Usuarios en el constructor
  constructor(private readonly usuarioServicio: UsuariosService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el usuario actual al inicializar el componente
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioActual();
    // Obtener la lista de usuarios al inicializar el componente
    this.listaUsuarios = this.usuarioServicio.obtenerUsuarios();
    // Filtrar la lista de usuarios para obtener solo los profesores
    this.listaProfesores = this.listaUsuarios.filter(
      (usuario) => usuario.tipo === 'Profesor'
    );
  }

  // Método para asignar un tutor a un estudiante
  asignarTutor(idEstudiante: string, event: Event): void {
    const selectElement = event.target as HTMLSelectElement;
    const idProfesor = selectElement.value;
    this.usuarioServicio.asignarTutor(idEstudiante, idProfesor);
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioServicio.cerrarSesion();
  }
}
