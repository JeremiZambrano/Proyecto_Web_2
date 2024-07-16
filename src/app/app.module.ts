import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module'; // Importar el módulo de enrutamiento
import { AppComponent } from './app.component'; // Importar el componente principal de la aplicación
import { InicioComponent } from './inicio/inicio.component'; // Importar el componente Inicio
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component'; // Importar el componente RegistrarUsuario
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component'; // Importar el componente IniciarSesion
import { AplicarPracticaComponent } from './aplicar-practica/aplicar-practica.component'; // Importar el componente AplicarPractica
import { DefinirTutorComponent } from './definir-tutor/definir-tutor.component'; // Importar el componente DefinirTutor
import { SeguimientoPracticasComponent } from './seguimiento-practicas/seguimiento-practicas.component'; // Importar el componente SeguimientoPracticas
import { AboutComponent } from './about/about.component'; // Importar el componente About
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importar el módulo de animaciones del navegador
import { ToastrModule } from 'ngx-toastr'; // Importar el módulo de Toastr para notificaciones
import { SubirTareaComponent } from './subir-tarea/subir-tarea.component'; // Importar el componente SubirTarea
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar los módulos de formularios reactivos y plantillas

@NgModule({
  declarations: [
    AppComponent, // Declarar el componente principal de la aplicación
    InicioComponent, // Declarar el componente Inicio
    RegistrarUsuarioComponent, // Declarar el componente RegistrarUsuario
    IniciarSesionComponent, // Declarar el componente IniciarSesion
    AplicarPracticaComponent, // Declarar el componente AplicarPractica
    DefinirTutorComponent, // Declarar el componente DefinirTutor
    SeguimientoPracticasComponent, // Declarar el componente SeguimientoPracticas
    AboutComponent, // Declarar el componente About
    SubirTareaComponent, // Declarar el componente SubirTarea
  ],
  imports: [
    BrowserModule, // Importar el módulo BrowserModule
    ReactiveFormsModule, // Importar el módulo ReactiveFormsModule para formularios reactivos
    FormsModule, // Importar el módulo FormsModule para formularios basados en plantillas
    AppRoutingModule, // Importar el módulo de enrutamiento
    BrowserAnimationsModule, // Importar el módulo de animaciones del navegador
    ToastrModule.forRoot(), // Configurar el módulo Toastr para notificaciones
  ],
  providers: [], // Proveedores de servicios (vacío en este caso)
  bootstrap: [AppComponent], // Componente de arranque de la aplicación
})
export class AppModule {}
