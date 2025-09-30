/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { Patient } from '../types';
import { User, Home, BookOpen, HeartPulse, Briefcase } from 'lucide-react';

interface PatientProfileProps {
  patient: Patient;
}

const DetailItem: React.FC<{ label: string; value: React.ReactNode }> = ({ label, value }) => (
  <div className="py-3 sm:grid sm:grid-cols-3 sm:gap-4">
    <dt className="text-sm font-medium text-gray-400">{label}</dt>
    <dd className="mt-1 text-sm text-white sm:mt-0 sm:col-span-2">{value || 'N/A'}</dd>
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 animate-[fadeIn_0.5s_ease-in-out]">
    <h3 className="text-lg leading-6 font-semibold text-indigo-300 mb-4">{title}</h3>
    <div className="divide-y divide-gray-700">{children}</div>
  </div>
);

const PatientProfile: React.FC<PatientProfileProps> = ({ patient }) => {
  const [activeTab, setActiveTab] = useState<'personal' | 'sociodemografico' | 'academico' | 'salud' | 'laboral'>('personal');

  const tabs = [
    { id: 'personal', label: 'Personal Data', icon: User },
    { id: 'sociodemografico', label: 'Sociodemographic', icon: Home },
    { id: 'academico', label: 'Academic', icon: BookOpen },
    { id: 'salud', label: 'Health', icon: HeartPulse },
    { id: 'laboral', label: 'Employment', icon: Briefcase },
  ];
  
  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <Section title="Personal Information">
            <DetailItem label="Full Name" value={patient.personal.nombreCompleto} />
            <DetailItem label="Cédula" value={patient.personal.cedula} />
            <DetailItem label="Date of Birth" value={patient.personal.fechaNacimiento} />
            <DetailItem label="Age" value={patient.personal.edad} />
            <DetailItem label="Gender" value={patient.personal.genero} />
            <DetailItem label="Marital Status" value={patient.personal.estadoCivil} />
            <DetailItem label="Place of Birth" value={patient.personal.lugarNacimiento} />
            <DetailItem label="Nationality" value={patient.personal.nacionalidad} />
          </Section>
        );
      case 'sociodemografico':
        return (
          <Section title="Sociodemographic & Contact Information">
            <DetailItem label="Address" value={patient.sociodemografico.direccion} />
            <DetailItem label="Neighborhood" value={patient.sociodemografico.barrio} />
            <DetailItem label="Phone" value={patient.sociodemografico.telefono} />
            <DetailItem label="Email" value={patient.sociodemografico.email} />
            <DetailItem label="Housing Type" value={patient.sociodemografico.tipoVivienda} />
            <DetailItem label="Dependents" value={patient.sociodemografico.personasACargo} />
            <DetailItem label="Stratum" value={patient.sociodemografico.estrato} />
          </Section>
        );
      case 'academico':
        return (
          <Section title="Academic History">
            <DetailItem label="Education Level" value={patient.academico.nivelEducativo} />
            <DetailItem label="Degree" value={patient.academico.tituloObtenido} />
            <DetailItem label="Institution" value={patient.academico.institucion} />
            <DetailItem label="Year of Graduation" value={patient.academico.anoGraduacion} />
          </Section>
        );
      case 'salud':
        return (
          <Section title="Clinical History">
            <DetailItem label="EPS" value={patient.salud.eps} />
            <DetailItem label="Regimen" value={patient.salud.regimen} />
            <DetailItem label="Disability Type" value={<span className="font-semibold text-amber-300">{patient.salud.tipoDiscapacidad}</span>} />
            <DetailItem label="Primary Diagnosis" value={patient.salud.diagnosticoPrincipal} />
            <DetailItem label="Medical History" value={patient.salud.antecedentesMedicos.join(', ')} />
            <DetailItem label="Current Medications" value={patient.salud.medicamentosActuales.join(', ')} />
            <DetailItem label="Last Consultation" value={patient.salud.ultimaConsulta} />
          </Section>
        );
      case 'laboral':
        return (
          <Section title="Employment Information">
            <DetailItem label="Employment Status" value={patient.laboral.situacionLaboral} />
            <DetailItem label="Occupation" value={patient.laboral.ocupacion} />
            <DetailItem label="Company" value={patient.laboral.empresa} />
            <DetailItem label="Monthly Income (COP)" value={patient.laboral.ingresosMensuales} />
          </Section>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-full bg-[#1e1e1e] border border-gray-700 rounded-lg shadow-lg overflow-hidden">
        <div className="px-4 py-5 sm:px-6 bg-gray-900 border-b border-gray-700">
            <h3 className="text-xl leading-6 font-bold text-white">{patient.personal.nombreCompleto}</h3>
            <p className="mt-1 max-w-2xl text-sm text-gray-400">Cédula: {patient.personal.cedula}</p>
        </div>
        <div className="flex">
            <div className="w-1/4 border-r border-gray-700 bg-gray-900/30 p-4">
                <nav className="flex flex-col space-y-1">
                    {tabs.map(tab => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id as any)}
                                className={`flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                                    isActive 
                                    ? 'bg-indigo-600 text-white' 
                                    : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                }`}
                            >
                                <Icon size={16} />
                                <span>{tab.label}</span>
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className="w-3/4 p-6">
                {renderContent()}
            </div>
        </div>
    </div>
  );
};

export default PatientProfile;
