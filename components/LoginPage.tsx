/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useState } from 'react';
import { FileText, Lock, Search, Shield, Upload, Users, ArrowRight } from 'lucide-react';
import LoginModal from './LoginModal';

interface LoginPageProps {
  onLogin: (role: 'admin' | 'user') => void;
}

const LoginPage: React.FC<LoginPageProps> = ({ onLogin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const features = [
    {
      icon: Upload,
      title: "Captura Inteligente",
      description: "Digitaliza documentos físicos con OCR avanzado. Importa desde Excel, PDFs, fotos y correos electrónicos."
    },
    {
      icon: FileText,
      title: "Clasificación Automática",
      description: "IA clasifica automáticamente en: datos personales, sociodemográficos, académicos, salud y laborales."
    },
    {
      icon: Users,
      title: "Perfil Unificado",
      description: "Identificador único por cédula. Elimina duplicados y consolida toda la información del paciente."
    },
    {
      icon: Lock,
      title: "Control de Acceso",
      description: "Roles diferenciados (Administrador/Paciente) con permisos específicos por categoría de datos."
    },
    {
      icon: Search,
      title: "Búsqueda Avanzada",
      description: "Búsquedas inteligentes con múltiples filtros. Vista organizada por pestañas temáticas."
    },
    {
      icon: Shield,
      title: "Trazabilidad Total",
      description: "Auditoría completa de accesos, consultas y modificaciones. Cumplimiento normativo garantizado."
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white antialiased">
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogin={onLogin} />

      {/* Hero Section */}
      <section className="relative bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 opacity-20" 
          style={{ backgroundImage: `url('data:image/svg+xml,%3csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" fill="none" stroke="rgb(255 255 255 / 0.1)"%3e%3cpath d="M0 .5H31.5V32"/%3e%3c/svg%3e')`}} 
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/80 via-transparent to-[#121212]"></div>
        <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
          <div className="max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <Shield className="h-4 w-4 text-indigo-300" />
              <span className="text-sm font-medium text-gray-200">Gestión Inteligente de Documentos</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
              Sistema de Gestión Documental para ASODISVALLE
            </h1>
            <p className="text-lg md:text-xl mb-8 text-gray-300">
              Digitalización inteligente con IA para la gestión eficiente de información de pacientes.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-white text-indigo-600 font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition-all duration-300"
              >
                Acceder al Sistema
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-[#121212]">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              Tecnología de IA al Servicio de la Salud
            </h2>
            <p className="text-lg text-gray-400">
              Solución completa para digitalizar, clasificar y gestionar documentos de pacientes con la máxima seguridad y eficiencia.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-900/20 transition-all duration-300">
                  <div className="h-12 w-12 rounded-lg bg-indigo-600/10 flex items-center justify-center mb-4 border border-indigo-500/20">
                    <Icon className="h-6 w-6 text-indigo-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
              ¿Listo para Digitalizar tu Gestión Documental?
            </h2>
            <p className="text-xl mb-8 text-gray-300">
              Únete a ASODISVALLE en la transformación digital de la gestión de pacientes.
            </p>
            <button
                onClick={() => setIsModalOpen(true)}
                className="group inline-flex items-center justify-center gap-2 px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg shadow-lg hover:bg-indigo-700 transition-all duration-300"
              >
                Comenzar Ahora
            </button>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-[#121212] border-t border-gray-800 py-8">
        <div className="container mx-auto px-4 text-center text-gray-500">
          <p>© {new Date().getFullYear()} ASODISVALLE - Asociación de Discapacitados del Valle</p>
          <p className="text-sm mt-2">Sistema de Gestión Documental con IA</p>
        </div>
      </footer>
    </div>
  );
};

export default LoginPage;
