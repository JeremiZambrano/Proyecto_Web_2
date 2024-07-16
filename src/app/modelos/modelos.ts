// Interfaz para el modelo de Usuario
export interface Usuario {
  id?: string; // Identificador único del usuario
  nombres?: string; // Nombres del usuario
  apellidos?: string; // Apellidos del usuario
  ci?: string; // Cédula de identidad del usuario
  correo?: string; // Correo electrónico del usuario
  contrasena?: string; // Contraseña del usuario
  tipo?: string; // Tipo de usuario (e.g., Estudiante, Profesor)
  tutor?: Usuario; // Tutor asignado al usuario (aplicable para estudiantes)
}

// Interfaz para el modelo de Practica
export interface Practica {
  id?: string; // Identificador único de la práctica
  empresa?: string; // Empresa donde se realiza la práctica
  tutor?: Usuario; // Tutor asignado a la práctica
  estudiante?: Usuario; // Estudiante asignado a la práctica
  estado?: string; // Estado de la práctica (e.g., Pendiente, Aprobada, Culminada)
}

// Interfaz para el modelo de Tarea
export interface Tarea {
  id?: string; // Identificador único de la tarea
  titulo?: string; // Título de la tarea
  detalles?: string; // Detalles de la tarea
  practica?: Practica; // Práctica asociada a la tarea
}
