/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

export enum MessageSender {
  USER = 'USER',
  MODEL = 'MODEL',
  SYSTEM = 'SYSTEM',
}

export interface UrlContextMetadataItem {
  urlRetrievalStatus: string;
  retrievedUrl: string;
}

export interface ChatMessage {
  sender: MessageSender;
  text: string;
  isLoading?: boolean;
  urlContext?: UrlContextMetadataItem[];
}

// --- Patient Data Model ---

export interface PersonalData {
  nombreCompleto: string;
  cedula: string;
  fechaNacimiento: string;
  edad: number;
  genero: string;
  estadoCivil: string;
  lugarNacimiento: string;
  nacionalidad: string;
}

export interface SociodemographicData {
  direccion: string;
  barrio: string;
  localidad: string;
  estrato: number;
  telefono: string;
  email: string;
  tipoVivienda: string;
  personasACargo: number;
}

export interface AcademicData {
  nivelEducativo: string;
  tituloObtenido: string;
  institucion: string;
  anoGraduacion: number;
}

export interface HealthData {
  eps: string;
  regimen: string;
  tipoDiscapacidad: string;
  diagnosticoPrincipal: string;
  antecedentesMedicos: string[];
  medicamentosActuales: string[];
  ultimaConsulta: string;
}

export interface EmploymentData {
  situacionLaboral: string;
  ocupacion: string;
  empresa: string;
  ingresosMensuales: string;
}

export interface Patient {
  _id?: string; // Changed from id to _id to match MongoDB
  personal: PersonalData;
  sociodemografico: SociodemographicData;
  academico: AcademicData;
  salud: HealthData;
  laboral: EmploymentData;
}
