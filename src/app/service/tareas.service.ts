import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { PracticasService } from './practicas.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Practica, Tarea, Usuario } from '../modelos/modelos';

@Injectable({
  providedIn: 'root',
})
export class TareasService {
  private listaTareas: Tarea[] = [];
  listaPracticas: Practica[] = [];

  constructor(
    private readonly usuarioServicio: UsuariosService,
    private readonly practicaServicio: PracticasService,
    private readonly enrutador: Router,
    private readonly toastr: ToastrService,
    private readonly tareasService: TareasService
  ) {
    this.cargarTareas();
    this.listaTareas = tareasService.obtenerTareas();
  }

  // Obtener la lista de tareas
  obtenerTareas(): Tarea[] {
    return this.listaTareas;
  }

  // Cargar las tareas desde el almacenamiento local
  private cargarTareas(): void {
    const tareasAlmacenadas = localStorage.getItem('tareas');
    this.listaTareas = tareasAlmacenadas ? JSON.parse(tareasAlmacenadas) : [];
  }

  // Generar un UUID para identificar de manera única a cada tarea
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Crear una nueva tarea
  crearTarea(nuevaTarea: Tarea): void {
    const estudiante = this.usuarioServicio.obtenerUsuarioActual();
    const practica = this.listaPracticas.find(
      (item) => item.estudiante?.id === estudiante?.id
    );
    this.listaTareas.push({
      id: this.generarUUID(),
      titulo: nuevaTarea.titulo,
      detalles: nuevaTarea.detalles,
      practica: practica,
    });
    localStorage.setItem('tareas', JSON.stringify(this.listaTareas));
    this.toastr.success('Tarea registrada con éxito', 'Ok!');
    this.enrutador.navigate(['/index']);
  }
}
