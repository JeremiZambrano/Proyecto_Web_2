import { Component, OnInit } from '@angular/core';
import { Tarea, Usuario } from '../modelos/modelos'; // Importar los modelos de Tarea y Usuario
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios
import { TareasService } from '../service/tareas.service'; // Importar el servicio de Tareas

@Component({
  selector: 'app-seguimiento-practicas', // Selector para el componente
  templateUrl: './seguimiento-practicas.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './seguimiento-practicas.component.css', // Ruta del archivo de estilos CSS
})
export class SeguimientoPracticasComponent implements OnInit {
  usuarioActual: Usuario | null = null; // Variable para almacenar el usuario actual
  listaTareas: Tarea[] = []; // Variable para almacenar la lista de tareas

  // Inyectar UsuariosService y TareasService en el constructor
  constructor(
    private readonly usuarioServicio: UsuariosService,
    private readonly tareaServicio: TareasService
  ) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el usuario actual al inicializar el componente
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioActual();
    // Obtener la lista de tareas al inicializar el componente
    this.listaTareas = this.tareaServicio.obtenerTareas();
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioServicio.cerrarSesion();
  }
}
