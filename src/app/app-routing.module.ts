import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component'; // Importar el componente Inicio
import { AboutComponent } from './about/about.component'; // Importar el componente About
import { AplicarPracticaComponent } from './aplicar-practica/aplicar-practica.component'; // Importar el componente AplicarPractica
import { DefinirTutorComponent } from './definir-tutor/definir-tutor.component'; // Importar el componente DefinirTutor
import { IniciarSesionComponent } from './iniciar-sesion/iniciar-sesion.component'; // Importar el componente IniciarSesion
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component'; // Importar el componente RegistrarUsuario
import { SeguimientoPracticasComponent } from './seguimiento-practicas/seguimiento-practicas.component'; // Importar el componente SeguimientoPracticas
import { SubirTareaComponent } from './subir-tarea/subir-tarea.component'; // Importar el componente SubirTarea

const routes: Routes = [
  { path: '', redirectTo: 'index', pathMatch: 'full' }, // Ruta por defecto redirige a 'index'
  {
    path: 'index',
    component: InicioComponent, // Ruta para el componente Inicio
  },
  {
    path: 'about',
    component: AboutComponent, // Ruta para el componente About
  },
  {
    path: 'solicitar',
    component: AplicarPracticaComponent, // Ruta para el componente AplicarPractica
  },
  {
    path: 'asignar',
    component: DefinirTutorComponent, // Ruta para el componente DefinirTutor
  },
  {
    path: 'login',
    component: IniciarSesionComponent, // Ruta para el componente IniciarSesion
  },
  {
    path: 'registro',
    component: RegistrarUsuarioComponent, // Ruta para el componente RegistrarUsuario
  },
  {
    path: 'seguimiento',
    component: SeguimientoPracticasComponent, // Ruta para el componente SeguimientoPracticas
  },
  {
    path: 'agregar',
    component: SubirTareaComponent, // Ruta para el componente SubirTarea
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)], // Importar las rutas
  exports: [RouterModule], // Exportar RouterModule
})
export class AppRoutingModule {}
