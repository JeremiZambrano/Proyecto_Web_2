import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario

@Component({
  selector: 'app-iniciar-sesion', // Selector para el componente
  templateUrl: './iniciar-sesion.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './iniciar-sesion.component.css', // Ruta del archivo de estilos CSS
})
export class IniciarSesionComponent implements OnInit {
  formularioLogin: FormGroup; // Variable para el formulario de inicio de sesión
  usuarioActual: Usuario | null; // Variable para almacenar el usuario actual

  // Inyectar FormBuilder, UsuariosService y ToastrService en el constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioServicio: UsuariosService,
    private readonly toastr: ToastrService
  ) {
    this.usuarioActual = usuarioServicio.obtenerUsuarioActual(); // Obtener el usuario actual
    // Inicializar el formulario con validadores
    this.formularioLogin = this.fb.group({
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {}

  // Método para manejar el envío del formulario
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formularioLogin.valid) {
      const { correo, contrasena } = this.formularioLogin.value;
      // Iniciar sesión con los datos del formulario
      this.usuarioServicio.iniciarSesion(correo, contrasena);
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }
}
