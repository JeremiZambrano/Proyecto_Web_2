import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios
import { PracticasService } from '../service/practicas.service'; // Importar el servicio de Prácticas
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario

@Component({
  selector: 'app-aplicar-practica', // Selector para el componente
  templateUrl: './aplicar-practica.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './aplicar-practica.component.css', // Ruta del archivo de estilos CSS
})
export class AplicarPracticaComponent implements OnInit {
  usuarioActual: Usuario | null = null; // Variable para almacenar el usuario actual
  formularioSolicitud: FormGroup; // Variable para el formulario de solicitud

  // Inyectar FormBuilder, ToastrService, UsuariosService y PracticasService en el constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly toastr: ToastrService,
    private readonly usuarioServicio: UsuariosService,
    private readonly practicaServicio: PracticasService
  ) {
    // Inicializar el formulario con validadores
    this.formularioSolicitud = this.fb.group({
      empresa: ['', [Validators.required]],
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
    if (this.formularioSolicitud.valid) {
      // Crear una nueva práctica con los datos del formulario
      this.practicaServicio.crearPractica(this.formularioSolicitud.value);
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }
}
