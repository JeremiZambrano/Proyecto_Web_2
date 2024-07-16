import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario

@Component({
  selector: 'app-registrar-usuario', // Selector para el componente
  templateUrl: './registrar-usuario.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './registrar-usuario.component.css', // Ruta del archivo de estilos CSS
})
export class RegistrarUsuarioComponent implements OnInit {
  formularioRegistro: FormGroup; // Variable para el formulario de registro
  usuarioActual: Usuario | null; // Variable para almacenar el usuario actual

  // Inyectar FormBuilder, UsuariosService y ToastrService en el constructor
  constructor(
    private readonly fb: FormBuilder,
    private readonly usuarioServicio: UsuariosService,
    private readonly toastr: ToastrService
  ) {
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioActual(); // Obtener el usuario actual
    // Inicializar el formulario con validadores
    this.formularioRegistro = this.fb.group({
      nombres: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      apellidos: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.pattern('^[a-zA-Z ]*$'),
        ],
      ],
      ci: [
        '',
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
        ],
      ],
      correo: [
        '',
        [
          Validators.required,
          Validators.email,
          Validators.pattern('^[ep][0-9]{10}@live.uleam.edu.ec$'),
        ],
      ],
      contrasena: [
        '',
        [
          Validators.required,
          Validators.minLength(6),
          this.validadorContrasena(),
        ],
      ],
      contrasena2: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  ngOnInit(): void {}

  // Validador de contraseña personalizado
  validadorContrasena(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const valor = control.value;

      if (!valor) {
        return null;
      }

      const tieneMayuscula = /[A-Z]/.test(valor);
      const tieneMinuscula = /[a-z]/.test(valor);
      const tieneNumero = /[0-9]/.test(valor);
      const tieneCaracterEspecial = /[!@#$%^&*(),.?":{}|<>]/.test(valor);
      const esValido =
        tieneMayuscula &&
        tieneMinuscula &&
        tieneNumero &&
        tieneCaracterEspecial;

      return !esValido ? { fortalezaContrasena: true } : null;
    };
  }

  // Método para enviar el formulario
  onSubmit(): void {
    // Verificar si el formulario es válido
    if (this.formularioRegistro.valid) {
      // Verificar si las contraseñas coinciden
      if (
        this.formularioRegistro.value.contrasena !==
        this.formularioRegistro.value.contrasena2
      ) {
        this.toastr.error('Las contraseñas no coinciden!', 'Error!');
      } else {
        console.log(this.formularioRegistro.value);

        // Registrar el nuevo usuario
        this.usuarioServicio.registrarUsuario(this.formularioRegistro.value);
      }
    } else {
      // Mostrar un mensaje de error si el formulario no es válido
      this.toastr.error('Rellene todos los campos correctamente!', 'Error!');
    }
  }

  // Método para prevenir números en ciertos campos
  prevenirNumeros(event: KeyboardEvent): void {
    const charCode = event.charCode;
    if (charCode >= 48 && charCode <= 57) {
      event.preventDefault();
    }
  }

  // Método para cerrar sesión
  cerrarSesion() {
    this.usuarioServicio.cerrarSesion();
  }
}
