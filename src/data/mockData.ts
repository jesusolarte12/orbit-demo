// Mock data for Orbit CRM Demo

export interface Cliente {
  id: string;
  nombre: string;
  telefono: string;
  sede: string;
  ultimaInteraccion: string;
  estadoLlamada: 'contactado' | 'no_contactado';
  numLlamadas: number;
  fechaLlamada: string | null;
  estadoInteres: 'interesado' | 'no_interesado' | 'no_contesto' | null;
  estado: 'registrado' | 'no_registrado';
  seguimiento: boolean;
  comercial: string;
  notas: string;
  edad: string;
  fechaRegistro: string;
}

export interface Usuario {
  id: string;
  nombre: string;
  email: string;
  tipo: 'Administrador' | 'Comercial';
  estado: boolean;
}

export interface Mensaje {
  id: string;
  contenido: string;
  fecha: string;
  esIA: boolean;
  esUsuario: boolean;
}

export interface Chat {
  id: string;
  clienteNombre: string;
  estado: 'Borrador' | 'Desconocido';
  estadoContacto: 'contactado' | 'no_contactado';
  hora: string;
  mensajesSinLeer: number;
  mensajes: Mensaje[];
}

export interface Plantilla {
  id: string;
  nombre: string;
  contenido: string;
  tieneBoton: boolean;
}

export interface DashboardStats {
  usuariosTotales: number;
  usuariosNuevos: number;
  usuariosRegistrados: number;
  tasaConversion: number;
  sinRespuesta: number;
  noContesto: number;
  noInteresados: number;
  interesados: number;
  noContactados: number;
  contactados: number;
}

// Clientes Mock Data
export const clientesMock: Cliente[] = [
  { id: '1', nombre: 'Jose David Pelaez', telefono: '312 456 7890', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 17:57', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: null, estado: 'no_registrado', seguimiento: false, comercial: 'Victor Guzmán', notas: '', edad: 'N/A', fechaRegistro: '2025-12-16' },
  { id: '2', nombre: 'Nicolás Pedraza', telefono: '315 789 1234', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 17:42', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: null, estado: 'no_registrado', seguimiento: false, comercial: 'Victor Guzmán', notas: '', edad: 'N/A', fechaRegistro: '2025-12-01' },
  { id: '3', nombre: 'Aldair', telefono: '320 111 2222', sede: 'Bucaramanga', ultimaInteraccion: '2026-01-14 16:32', estadoLlamada: 'contactado', numLlamadas: 2, fechaLlamada: '2025-11-12', estadoInteres: 'no_interesado', estado: 'no_registrado', seguimiento: true, comercial: 'Victor Guzmán', notas: '', edad: 'N/A', fechaRegistro: '2025-12-01' },
  { id: '4', nombre: 'Oscar Araque', telefono: '318 333 4444', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 15:35', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: null, estado: 'no_registrado', seguimiento: false, comercial: 'Diana Margarita', notas: '', edad: 'N/A', fechaRegistro: '2025-11-27' },
  { id: '5', nombre: 'Sebastian', telefono: '317 555 6666', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 15:06', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: null, estado: 'no_registrado', seguimiento: false, comercial: 'Juan Sebastian', notas: '', edad: 'N/A', fechaRegistro: '2025-11-27' },
  { id: '6', nombre: 'ARKADE', telefono: '310 777 8888', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 14:57', estadoLlamada: 'contactado', numLlamadas: 1, fechaLlamada: '2025-11-20', estadoInteres: 'interesado', estado: 'no_registrado', seguimiento: false, comercial: 'Victor Guzmán', notas: '', edad: 'N/A', fechaRegistro: '2025-11-20' },
  { id: '7', nombre: 'Felipe Durango', telefono: '319 999 0000', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 14:16', estadoLlamada: 'contactado', numLlamadas: 1, fechaLlamada: '2025-12-10', estadoInteres: 'no_contesto', estado: 'no_registrado', seguimiento: false, comercial: 'Mafe', notas: '', edad: 'N/A', fechaRegistro: '2025-11-19' },
  { id: '8', nombre: 'Que', telefono: '321 123 4567', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 14:05', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: null, estado: 'no_registrado', seguimiento: false, comercial: 'John Comercial', notas: '', edad: 'N/A', fechaRegistro: '2025-11-12' },
  { id: '9', nombre: 'Usuario desconocido', telefono: '322 234 5678', sede: 'Desconocido', ultimaInteraccion: '2026-01-14 13:38', estadoLlamada: 'contactado', numLlamadas: 1, fechaLlamada: '2025-09-22', estadoInteres: 'no_contesto', estado: 'no_registrado', seguimiento: false, comercial: 'Victor Guzmán', notas: '', edad: 'N/A', fechaRegistro: '2025-09-22' },
  { id: '10', nombre: 'Oscar Ortega', telefono: '323 345 6789', sede: 'Bogotá', ultimaInteraccion: '2026-01-13 12:30', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: 'interesado', estado: 'registrado', seguimiento: true, comercial: 'Victor Guzmán', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-12-16' },
  { id: '11', nombre: 'Kenthomakentheking', telefono: '324 456 7890', sede: 'Medellín', ultimaInteraccion: '2026-01-12 11:20', estadoLlamada: 'contactado', numLlamadas: 3, fechaLlamada: '2025-12-15', estadoInteres: 'interesado', estado: 'registrado', seguimiento: true, comercial: 'Victor Guzmán', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-12-01' },
  { id: '12', nombre: 'MARISOL', telefono: '325 567 8901', sede: 'Cali', ultimaInteraccion: '2026-01-11 10:15', estadoLlamada: 'contactado', numLlamadas: 2, fechaLlamada: '2025-12-14', estadoInteres: 'interesado', estado: 'no_registrado', seguimiento: true, comercial: 'Victor Guzmán', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-12-01' },
  { id: '13', nombre: 'Colmedica', telefono: '326 678 9012', sede: 'Cartagena', ultimaInteraccion: '2026-01-10 09:00', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: 'interesado', estado: 'registrado', seguimiento: true, comercial: 'Victor Guzmán', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-12-01' },
  { id: '14', nombre: 'Juan Diego Colmenares', telefono: '327 789 0123', sede: 'Barranquilla', ultimaInteraccion: '2026-01-09 08:45', estadoLlamada: 'contactado', numLlamadas: 1, fechaLlamada: '2025-12-13', estadoInteres: 'no_contesto', estado: 'no_registrado', seguimiento: true, comercial: 'Diana Margarita', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-11-27' },
  { id: '15', nombre: 'Yuly Tavera', telefono: '328 890 1234', sede: 'Pereira', ultimaInteraccion: '2026-01-08 07:30', estadoLlamada: 'no_contactado', numLlamadas: 0, fechaLlamada: null, estadoInteres: 'no_interesado', estado: 'registrado', seguimiento: true, comercial: 'Mafe', notas: 'Sin comentarios', edad: 'N/A', fechaRegistro: '2025-11-19' },
];

// Usuarios Mock Data
export const usuariosMock: Usuario[] = [
  { id: '1', nombre: 'DiegoT', email: 'diego@orbit.com', tipo: 'Administrador', estado: true },
  { id: '2', nombre: 'Jhon Jairo Marin Diaz', email: 'jhon@orbit.com', tipo: 'Administrador', estado: false },
  { id: '3', nombre: 'Juan Sebastian adm', email: 'juans@orbit.com', tipo: 'Administrador', estado: true },
  { id: '4', nombre: 'Davisson adm', email: 'davisson@orbit.com', tipo: 'Administrador', estado: false },
  { id: '5', nombre: 'Valentina adm', email: 'valentina@orbit.com', tipo: 'Administrador', estado: false },
  { id: '6', nombre: 'Davisson', email: 'davisson.c@orbit.com', tipo: 'Comercial', estado: false },
  { id: '7', nombre: 'Valentina', email: 'valentina.c@orbit.com', tipo: 'Comercial', estado: false },
  { id: '8', nombre: 'Juan Sebastian', email: 'juans.c@orbit.com', tipo: 'Comercial', estado: true },
  { id: '9', nombre: 'Otras Sedes', email: 'sedes@orbit.com', tipo: 'Comercial', estado: true },
  { id: '10', nombre: 'Mafe', email: 'mafe@orbit.com', tipo: 'Comercial', estado: true },
];

// Chats Mock Data
export const chatsMock: Chat[] = [
  {
    id: '1',
    clienteNombre: '♡~Pati~♡',
    estado: 'Desconocido',
    estadoContacto: 'no_contactado',
    hora: '17:45',
    mensajesSinLeer: 5,
    mensajes: [
      { id: '1', contenido: '¡Excelente! Me alegra que hayas completado tus datos. Ya que elegiste la opción de pago directo, un asesor se comunicará contigo lo antes posible para finalizar tu inscripción y darte todos los detalles.\n\n¿Hay algo más en lo que pueda ayudarte mientras esperas la llamada?', fecha: '05/01/2026, 13:02', esIA: true, esUsuario: false },
      { id: '2', contenido: 'Cual es el precio de los cursos', fecha: '05/01/2026, 13:02', esIA: false, esUsuario: true },
      { id: '3', contenido: '¡Entiendo tu interés en el valor de la formación! En Campuslands, el costo se adapta al programa que elijas y a tu plan de pago. Como ya completaste tu registro y seleccionaste la opción de pago directo, un asesor se comunicará contigo para darte todos los detalles específicos y las cifras exactas.\n\n¿Te gustaría que te contacten pronto para resolver todas tus dudas?', fecha: '05/01/2026, 13:03', esIA: true, esUsuario: false },
      { id: '4', contenido: 'Sí', fecha: '05/01/2026, 13:03', esIA: false, esUsuario: true },
      { id: '5', contenido: '¡Excelente! Ya le he notificado a nuestro equipo para que se pongan en contacto contigo lo antes posible y te brinden toda la información detallada sobre el precio y los siguientes pasos para tu inscripción.\n\n¡Pronto estarás un paso más cerca de tu transformación profesional en tecnología!', fecha: '05/01/2026, 13:03', esIA: true, esUsuario: false },
    ]
  },
  {
    id: '2',
    clienteNombre: 'Jose David Pelaez',
    estado: 'Borrador',
    estadoContacto: 'no_contactado',
    hora: '16:57',
    mensajesSinLeer: 0,
    mensajes: [
      { id: '1', contenido: 'Hola, me interesa saber más sobre los programas', fecha: '05/01/2026, 16:55', esIA: false, esUsuario: true },
      { id: '2', contenido: '¡Hola! Gracias por tu interés en Campuslands. Tenemos programas de desarrollo de software y tecnología. ¿Te gustaría que te cuente más?', fecha: '05/01/2026, 16:57', esIA: true, esUsuario: false },
    ]
  },
  {
    id: '3',
    clienteNombre: 'Nicolás Pedraza',
    estado: 'Borrador',
    estadoContacto: 'no_contactado',
    hora: '16:42',
    mensajesSinLeer: 4,
    mensajes: [
      { id: '1', contenido: 'Buenos días, quisiera información', fecha: '05/01/2026, 16:40', esIA: false, esUsuario: true },
    ]
  },
  {
    id: '4',
    clienteNombre: 'Aldair',
    estado: 'Borrador',
    estadoContacto: 'contactado',
    hora: '15:32',
    mensajesSinLeer: 58,
    mensajes: [
      { id: '1', contenido: 'Hola, ya me contactaron pero tengo más preguntas', fecha: '05/01/2026, 15:30', esIA: false, esUsuario: true },
    ]
  },
  {
    id: '5',
    clienteNombre: 'Oscar Araque',
    estado: 'Borrador',
    estadoContacto: 'no_contactado',
    hora: '14:35',
    mensajesSinLeer: 2,
    mensajes: []
  },
  {
    id: '6',
    clienteNombre: 'Sebastian',
    estado: 'Borrador',
    estadoContacto: 'no_contactado',
    hora: '14:06',
    mensajesSinLeer: 2,
    mensajes: []
  },
  {
    id: '7',
    clienteNombre: 'ARKADE',
    estado: 'Borrador',
    estadoContacto: 'contactado',
    hora: '13:57',
    mensajesSinLeer: 4,
    mensajes: []
  },
];

// Plantillas Mock Data
export const plantillasMock: Plantilla[] = [
  { id: '1', nombre: 'virtual', contenido: '🚀 Trabajas de día... pero sabes que tu futuro puede ir más lejos. En Campuslands...', tieneBoton: false },
  { id: '2', nombre: 'bienvenida', contenido: 'Hola, mi nombre es Orbit', tieneBoton: false },
  { id: '3', nombre: 'seguimiento_full_info', contenido: 'Hola 👋 Hace poco intenté llamarte por tu interés en Campuslands, pero no logramos...', tieneBoton: false },
  { id: '4', nombre: 'seguimiento_no_contestado', contenido: 'Hola 👋, intenté comunicarme contigo, pero no fue posible. Como vi tu interés en...', tieneBoton: true },
  { id: '5', nombre: 'reactivacion_septiembre3', contenido: 'Hola, soy Iza de Campuslands. Hace un tiempo mostraste interés en formarte como...', tieneBoton: true },
  { id: '6', nombre: 'campaa_sept2', contenido: '🚀 Hoy es el momento de dar el paso hacia tu futuro profesional. En *Campusland...', tieneBoton: true },
  { id: '7', nombre: 'campaa_sept', contenido: '🚀 Hoy es el momento de dar el paso hacia tu futuro profesional. En *Campusland...', tieneBoton: true },
  { id: '8', nombre: 'mensaje_prueba_plantilla', contenido: '⚡ *Solo 5 cupos disponibles* ⚡ El *grupo de la mañana* arranca su *período de pr...', tieneBoton: true },
  { id: '9', nombre: 'prueba_platilla', contenido: 'Hola mundo prueba dos botones', tieneBoton: true },
  { id: '10', nombre: 'reactivacion_septiembre2', contenido: '⚡ *Solo 5 cupos disponibles* ⚡ El *grupo de la mañana* arranca su *periodo de pr...', tieneBoton: false },
  { id: '11', nombre: 'reactivacion_septiembre', contenido: '⚡ *Solo 5 cupos disponibles* ⚡ El *grupo de la mañana* arranca su *periodo de pr...', tieneBoton: false },
  { id: '12', nombre: 'reactivacion_agosto', contenido: 'Hola 👋, te saluda Iza desde Campuslands. Hace un tiempo mostraste tu interés...', tieneBoton: false },
  { id: '13', nombre: 'reactivacion_julio2025cam...', contenido: '👩‍💻Hola! Espero que estés muy bien Hace un tiempo nos escribiste con interés...', tieneBoton: false },
  { id: '14', nombre: 'msj_acercamiento2_novaria...', contenido: '? ¿Te gustaría aprender a programar y trabajar en tecnología en menos de 1 año?...', tieneBoton: false },
  { id: '15', nombre: 'example_cv_campus_24_abr_...', contenido: '? ¡Hola! Te saludamos desde Campuslands ? Hemos recibido tu hoja de vida pa...', tieneBoton: false },
  { id: '16', nombre: 'welcome_cajasan', contenido: '¡Hola! Te saluda Iza Márquez de Campuslands ? Sabemos que la tecnología y l...', tieneBoton: false },
];

// Dashboard Stats Mock Data
export const dashboardStatsMock: DashboardStats = {
  usuariosTotales: 280,
  usuariosNuevos: 186,
  usuariosRegistrados: 0,
  tasaConversion: 0,
  sinRespuesta: 0,
  noContesto: 0,
  noInteresados: 0,
  interesados: 0,
  noContactados: 0,
  contactados: 0,
};

// Chart data for dashboard
export const chartDataMock = {
  barChart: [
    { fecha: '8 Jul', usuariosTotales: 25, usuariosRegistrados: 20 },
    { fecha: '9 Jul', usuariosTotales: 22, usuariosRegistrados: 18 },
    { fecha: '10 Jul', usuariosTotales: 40, usuariosRegistrados: 35 },
    { fecha: '11 Jul', usuariosTotales: 65, usuariosRegistrados: 55 },
    { fecha: '12 Jul', usuariosTotales: 90, usuariosRegistrados: 95 },
    { fecha: '13 Jul', usuariosTotales: 10, usuariosRegistrados: 35 },
    { fecha: '14 Jul', usuariosTotales: 30, usuariosRegistrados: 25 },
  ],
  pieChart: [
    { name: '25/07-09', value: 189, color: '#3b82f6' },
    { name: '25/07-10', value: 145, color: '#06b6d4' },
    { name: '25/07-11', value: 156, color: '#ec4899' },
    { name: '25/07-12', value: 98, color: '#f59e0b' },
    { name: '25/07-13', value: 278, color: '#10b981' },
    { name: '25/07-14', value: 234, color: '#a855f7' },
    { name: '25/07-15', value: 167, color: '#ef4444' },
  ],
};

// Sedes options
export const sedesOptions = ['Todas', 'Bucaramanga', 'Bogotá', 'Medellín', 'Cali', 'Cartagena', 'Barranquilla', 'Pereira', 'Desconocido'];

// Comerciales options
export const comercialesOptions = ['Todos', 'Victor Guzmán', 'Diana Margarita', 'Juan Sebastian', 'Mafe', 'John Comercial'];

// Prioridad options
export const prioridadOptions = ['Todas', 'Alta', 'Media', 'Baja'];
