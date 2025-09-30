/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

// This file contains mock patient data.
// You should copy the objects inside the mockPatients array and insert them 
// as documents into the 'patients' collection in your 'asodisvalle' MongoDB database.

import { Patient } from '../types';

export const mockPatients: Patient[] = [
  {
    personal: {
      nombreCompleto: "Ana María Rojas Gómez",
      cedula: "1122334455",
      fechaNacimiento: "1998-05-15",
      edad: 26,
      genero: "Femenino",
      estadoCivil: "Soltera",
      lugarNacimiento: "Cali, Valle del Cauca",
      nacionalidad: "Colombiana",
    },
    sociodemografico: {
      direccion: "Carrera 25 # 10-45",
      barrio: "San Fernando",
      localidad: "Cali",
      estrato: 3,
      telefono: "3101234567",
      email: "ana.rojas@email.com",
      tipoVivienda: "Familiar",
      personasACargo: 0,
    },
    academico: {
      nivelEducativo: "Bachillerato",
      tituloObtenido: "Bachiller Académico",
      institucion: "Colegio Santa Librada",
      anoGraduacion: 2015,
    },
    salud: {
      eps: "Sura EPS",
      regimen: "Contributivo",
      tipoDiscapacidad: "Física (Movilidad Reducida)",
      diagnosticoPrincipal: "Paraparesia espástica",
      antecedentesMedicos: ["Asma"],
      medicamentosActuales: ["Baclofeno 10mg", "Salbutamol Inhalador"],
      ultimaConsulta: "2024-03-20",
    },
    laboral: {
      situacionLaboral: "Desempleada",
      ocupacion: "N/A",
      empresa: "N/A",
      ingresosMensuales: "0",
    },
  },
  {
    personal: {
      nombreCompleto: "Carlos Alberto Pérez Rodríguez",
      cedula: "79888777",
      fechaNacimiento: "1975-11-02",
      edad: 48,
      genero: "Masculino",
      estadoCivil: "Casado",
      lugarNacimiento: "Bogotá, Cundinamarca",
      nacionalidad: "Colombiana",
    },
    sociodemografico: {
      direccion: "Calle 100 # 15-30, Apto 501",
      barrio: "Chapinero",
      localidad: "Bogotá",
      estrato: 4,
      telefono: "3157654321",
      email: "carlos.perez@email.com",
      tipoVivienda: "Propia",
      personasACargo: 2,
    },
    academico: {
      nivelEducativo: "Técnico",
      tituloObtenido: "Técnico en Sistemas",
      institucion: "SENA",
      anoGraduacion: 1995,
    },
    salud: {
      eps: "Compensar EPS",
      regimen: "Contributivo",
      tipoDiscapacidad: "Visual (Baja Visión)",
      diagnosticoPrincipal: "Retinopatía diabética",
      antecedentesMedicos: ["Diabetes Mellitus Tipo 2", "Hipertensión Arterial"],
      medicamentosActuales: ["Metformina 850mg", "Losartán 50mg", "Insulina NPH"],
      ultimaConsulta: "2024-05-10",
    },
    laboral: {
      situacionLaboral: "Empleado",
      ocupacion: "Soporte Técnico",
      empresa: "TecnoSoluciones SAS",
      ingresosMensuales: "2,500,000",
    },
  },
  {
    personal: {
      nombreCompleto: "Luisa Fernanda Gómez Soto",
      cedula: "29111222",
      fechaNacimiento: "1952-01-20",
      edad: 72,
      genero: "Femenino",
      estadoCivil: "Viuda",
      lugarNacimiento: "Medellín, Antioquia",
      nacionalidad: "Colombiana",
    },
    sociodemografico: {
      direccion: "Circular 4 # 70-10",
      barrio: "Laureles",
      localidad: "Medellín",
      estrato: 2,
      telefono: "3009876543",
      email: "luisa.gomez@email.com",
      tipoVivienda: "Arrendada",
      personasACargo: 0,
    },
    academico: {
      nivelEducativo: "Primaria",
      tituloObtenido: "N/A",
      institucion: "Escuela Marco Fidel Suárez",
      anoGraduacion: 1964,
    },
    salud: {
      eps: "Savia Salud EPS",
      regimen: "Subsidiado",
      tipoDiscapacidad: "Auditiva (Hipoacusia Profunda)",
      diagnosticoPrincipal: "Hipoacusia neurosensorial bilateral",
      antecedentesMedicos: ["Artrosis de rodilla", "Hipotiroidismo"],
      medicamentosActuales: ["Levotiroxina 75mcg", "Acetaminofén 500mg"],
      ultimaConsulta: "2024-04-15",
    },
    laboral: {
      situacionLaboral: "Pensionada",
      ocupacion: "N/A",
      empresa: "N/A",
      ingresosMensuales: "1,300,000",
    },
  },
  {
    personal: {
      nombreCompleto: "David Santiago Restrepo Vélez",
      cedula: "1017250360",
      fechaNacimiento: "2003-08-30",
      edad: 20,
      genero: "Masculino",
      estadoCivil: "Soltero",
      lugarNacimiento: "Bucaramanga, Santander",
      nacionalidad: "Colombiana",
    },
    sociodemografico: {
      direccion: "Avenida Siempre Viva 123",
      barrio: "Cabecera",
      localidad: "Bucaramanga",
      estrato: 4,
      telefono: "3215558899",
      email: "david.restrepo@email.com",
      tipoVivienda: "Familiar",
      personasACargo: 0,
    },
    academico: {
      nivelEducativo: "Universitario (en curso)",
      tituloObtenido: "N/A",
      institucion: "Universidad Industrial de Santander",
      anoGraduacion: 0,
    },
    salud: {
      eps: "Sanitas EPS",
      regimen: "Beneficiario",
      tipoDiscapacidad: "Intelectual (Síndrome de Asperger)",
      diagnosticoPrincipal: "Trastorno del Espectro Autista Nivel 1",
      antecedentesMedicos: ["Rinitis alérgica"],
      medicamentosActuales: ["N/A"],
      ultimaConsulta: "2024-02-28",
    },
    laboral: {
      situacionLaboral: "Estudiante",
      ocupacion: "Estudiante de Ingeniería de Software",
      empresa: "N/A",
      ingresosMensuales: "0",
    },
  }
];
