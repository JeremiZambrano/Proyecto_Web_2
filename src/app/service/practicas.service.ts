import { Injectable } from '@angular/core';
import { UsuariosService } from './usuarios.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Practica, Usuario } from '../modelos/modelos';

@Injectable({
  providedIn: 'root',
})
export class PracticasService {
  private listaPracticas: Practica[] = [];

  constructor(
    private readonly toastr: ToastrService,
    private readonly enrutador: Router,
    private readonly usuarioServicio: UsuariosService
  ) {
    this.cargarPracticas();
  }

  // Cargar las prácticas desde el almacenamiento local
  private cargarPracticas(): void {
    const practicasAlmacenadas = localStorage.getItem('practicas');
    this.listaPracticas = practicasAlmacenadas
      ? JSON.parse(practicasAlmacenadas)
      : [];
  }

  // Obtener la lista de prácticas
  obtenerPracticas(): Practica[] {
    return this.listaPracticas;
  }

  // Generar un UUID para identificar de manera única a cada práctica
  private generarUUID(): string {
    return 'xxxxyxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
      const r = (Math.random() * 16) | 0,
        v = c == 'x' ? r : (r & 0x3) | 0x8;
      return v.toString(16);
    });
  }

  // Crear una nueva práctica
  crearPractica(nuevaPractica: Practica): void {
    const estudiante = this.usuarioServicio.obtenerUsuarioActual();
    this.listaPracticas.push({
      id: this.generarUUID(),
      estado: 'Pendiente',
      estudiante: estudiante!,
      tutor: estudiante!.tutor,
      empresa: nuevaPractica.empresa,
    });
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.toastr.success('Práctica registrada con éxito', 'Ok!');
    this.enrutador.navigate(['/index']);
  }

  // Buscar una práctica por ID
  private buscarPractica(id: string): number {
    return this.listaPracticas.findIndex((practica) => practica.id === id);
  }

  // Aceptar una práctica
  aceptarPractica(id: string): void {
    const indice = this.buscarPractica(id);
    this.listaPracticas[indice] = {
      ...this.listaPracticas[indice],
      estado: 'Aprobada',
    };
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.cargarPracticas();
  }

  // Culminar una práctica
  culminarPractica(id: string): void {
    const indice = this.buscarPractica(id);
    this.listaPracticas[indice] = {
      ...this.listaPracticas[indice],
      estado: 'Culminada',
    };
    localStorage.setItem('practicas', JSON.stringify(this.listaPracticas));
    this.cargarPracticas();
  }

  // Buscar una práctica por el ID del usuario
  buscarPracticaPorUsuario(id: string): Practica | undefined {
    return this.listaPracticas.find(
      (practica) => practica.estudiante?.id === id
    );
  }
}
