import { Component, OnInit } from '@angular/core';
import { Usuario } from '../modelos/modelos'; // Importar el modelo de Usuario
import { UsuariosService } from '../service/usuarios.service'; // Importar el servicio de Usuarios

@Component({
  selector: 'app-about', // Selector para el componente
  templateUrl: './about.component.html', // Ruta del archivo de plantilla HTML
  styleUrl: './about.component.css', // Ruta del archivo de estilos CSS
})
export class AboutComponent implements OnInit {
  usuarioActual: Usuario | null = null; // Variable para almacenar el usuario actual

  // Inyectar el servicio de Usuarios en el constructor
  constructor(private readonly usuarioServicio: UsuariosService) {}

  // Método que se ejecuta al inicializar el componente
  ngOnInit(): void {
    // Obtener el usuario actual al inicializar el componente
    this.usuarioActual = this.usuarioServicio.obtenerUsuarioActual();
  }

  // Método para cerrar sesión
  cerrarSesion(): void {
    this.usuarioServicio.cerrarSesion();
  }
}
