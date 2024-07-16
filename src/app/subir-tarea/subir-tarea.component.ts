import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario
import { TareasService } from '../service/tareas.service'; // Importar el servicio de Tareas
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios

@Component({
  selector: 'app-subir-tarea', // Selector para el componente
  templateUrl: './subir-tarea.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './subir-tarea.component.css', // Ruta del archivo de estilos CSS
})
export class SubirTareaComponent implements OnInit {
  usuarioActual: Usuario | null = null; // Variable para almacenar el usuario actual
  formularioTarea: FormGroup; // Variable para el formulario de tarea

  // Inyectar FormBuilder, ToastrService, TareasService y UsuariosService en el constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly tareaServicio: TareasService,
    private readonly usuarioServicio: UsuariosService
  ) {
    // Inicializar el formulario con validadores
    this.formularioTarea = this.fb.group({
      titulo: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(20),
        ],
      ],
      detalles: [
        '',
        [
          Validators.required,
          Validators.minLength(20),
          Validators.maxLength(50),
        ],
      ],
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el usuario actual al inicializar el componente
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioActual();
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioServicio.cerrarSesion();
  }

  // Método para manejar el envío del formulario
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formularioTarea.valid) {
      // Crear una nueva tarea con los datos del formulario
      this.tareaServicio.crearTarea(this.formularioTarea.value);
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }
}
