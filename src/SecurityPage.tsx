import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Lock, Shield, Server, Globe, CheckCircle, FileText, Download, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpefNavbar from './OpefNavbar';

const SecurityPage: React.FC = () => {
  const heroRef = useRef(null);
  const pillarsRef = useRef(null);
  const provenanceRef = useRef(null);
  const complianceRef = useRef(null);
  const auditRef = useRef(null);
  const ethicsRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const pillarsInView = useInView(pillarsRef, { once: true });
  const provenanceInView = useInView(provenanceRef, { once: true });
  const complianceInView = useInView(complianceRef, { once: true });
  const auditInView = useInView(auditRef, { once: true });
  const ethicsInView = useInView(ethicsRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const securityPillars = [
    {
      icon: Lock,
      title: "ENCRYPTION",
      description: "AES-256 data encryption at rest and in transit."
    },
    {
      icon: Shield,
      title: "PROVENANCE",
      description: "Every file, model, and rule is hashed with verifiable metadata."
    },
    {
      icon: Server,
      title: "AUDITABILITY",
      description: "Immutable logs and version control for full chain-of-custody."
    },
    {
      icon: Globe,
      title: "COMPLIANCE",
      description: "Architected to align with FedRAMP, SOC 2, and OMB M-25-21."
    }
  ];

  const provenanceSteps = [
    {
      step: "Ingestion",
      description: "Policy documents ingested with cryptographic signatures",
      metadata: "sha256: 8ad91d67f2f..."
    },
    {
      step: "Parsing",
      description: "Structured parsing with lineage tracking",
      metadata: "timestamp: 2025-10-21T22:00Z"
    },
    {
      step: "Validation",
      description: "Rule validation with provenance metadata",
      metadata: "rulepack: NEPA_CE_01"
    },
    {
      step: "Compilation",
      description: "Rulepack compilation with audit trail",
      metadata: "version: v1.2.3"
    },
    {
      step: "Audit Trail",
      description: "Immutable audit bundle generation",
      metadata: "status: OK"
    }
  ];

  const complianceStandards = [
    {
      name: "SOC 2",
      status: "In Progress",
      description: "Security, availability, and confidentiality controls"
    },
    {
      name: "FedRAMP Alignment",
      status: "Certified",
      description: "Cloud security authorization for federal agencies"
    },
    {
      name: "OMB M-25-21 AI Governance",
      status: "Implemented",
      description: "Federal AI governance and risk management"
    },
    {
      name: "EU AI Act Principles",
      status: "Aligned",
      description: "European Union AI regulation compliance"
    },
    {
      name: "ISO/IEC 27001",
      status: "Certified",
      description: "Information security management systems"
    }
  ];

  const ethicsPrinciples = [
    {
      title: "Explainability",
      description: "Transparent model behavior prevents compliance blind spots."
    },
    {
      title: "Fairness",
      description: "Bias checks ensure consistency across project reviews."
    },
    {
      title: "Accountability",
      description: "Traceability guarantees model outputs are auditable."
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1B12] text-[#F3F5F0]">
      <OpefNavbar />
      
      {/* Back Button */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-32 py-8">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-[#97B34D] hover:text-[#97B34D]/80 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Hero Section */}
      <section ref={heroRef} className="py-24 px-8 md:px-16 lg:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Statement */}
            <div className="lg:col-span-7">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-semibold leading-[0.85] tracking-tight mb-8"
              >
                Trust{' '}
                <span className="relative group cursor-pointer">
                  engineered
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#97B34D]"
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                {' '}into every layer.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed text-[#F3F5F0]/80 mb-8"
              >
                OPEF ensures the confidentiality, integrity, and provenance of all regulatory data — from ingestion to audit bundle export.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="border border-[#97B34D] text-[#97B34D] px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#97B34D] hover:text-black transition-colors">
                  Read the Security Whitepaper →
                </button>
              </motion.div>
            </div>

            {/* Right Column - Lock/Grid Visual */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full h-96 flex items-center justify-center"
              >
                {/* Animated Grid with Lock Silhouette */}
                <div className="relative">
                  {/* Grid Background */}
                  <div className="absolute inset-0 w-64 h-64">
                    {Array.from({ length: 8 }).map((_, i) => (
                      Array.from({ length: 8 }).map((_, j) => (
                        <motion.div
                          key={`${i}-${j}`}
                          initial={{ opacity: 0, scale: 0 }}
                          animate={heroInView ? { 
                            opacity: 0.1, 
                            scale: 1 
                          } : { 
                            opacity: 0, 
                            scale: 0 
                          }}
                          transition={{ 
                            duration: 0.3, 
                            delay: 0.5 + (i * 0.05) + (j * 0.02) 
                          }}
                          className="absolute w-2 h-2 bg-[#97B34D]"
                          style={{
                            left: `${j * 8}px`,
                            top: `${i * 8}px`,
                          }}
                        />
                      ))
                    ))}
                  </div>
                  
                  {/* Lock Silhouette */}
                  <motion.div
                    initial={{ scale: 0, opacity: 0 }}
                    animate={heroInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="relative w-32 h-40 mx-auto"
                  >
                    {/* Lock Body */}
                    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-24 border-4 border-[#97B34D] rounded-lg bg-[#97B34D]/10"></div>
                    {/* Lock Shackle */}
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-16 h-16 border-4 border-[#97B34D] rounded-full border-b-0"></div>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Security Pillars */}
      <section ref={pillarsRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={pillarsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Core Security Pillars
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              OPEF's four foundational principles of data protection and system integrity.
            </p>
          </motion.div>

          {/* 4-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {securityPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={pillarsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                  className="group cursor-pointer"
                >
                  <div className="border border-[#97B34D]/30 p-6 h-full hover:border-[#97B34D] hover:-translate-y-1 transition-all duration-300">
                    <Icon className="w-8 h-8 text-[#97B34D] mb-4" strokeWidth={1.5} />
                    <h3 className="text-lg font-bold uppercase tracking-wider mb-3">{pillar.title}</h3>
                    <p className="text-sm text-[#0D1B12]/70 leading-relaxed">{pillar.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Data Provenance Flow */}
      <section ref={provenanceRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={provenanceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Data Provenance System
            </h2>
            <p className="text-lg text-[#F3F5F0]/70">
              OPEF logs every data transformation, from policy ingestion to output generation, with timestamped provenance metadata.
            </p>
          </motion.div>

          {/* 5-node horizontal chain */}
          <div className="relative">
            {/* Connection Lines */}
            <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-[#97B34D]/30 transform -translate-y-1/2"></div>
            
            {/* Nodes */}
            <div className="flex justify-between items-center">
              {provenanceSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={provenanceInView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ duration: 0.6, delay: 0.3 + (index * 0.2) }}
                  className="group relative flex flex-col items-center"
                >
                  {/* Node Circle */}
                  <div className="w-16 h-16 border-4 border-[#97B34D] rounded-full bg-[#0D1B12] flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#97B34D]/20 transition-all">
                    <div className="w-2 h-2 bg-[#97B34D] rounded-full"></div>
                  </div>
                  
                  {/* Step Info */}
                  <div className="text-center">
                    <h3 className="text-sm font-bold uppercase tracking-wider mb-2">{step.step}</h3>
                    <p className="text-xs text-[#F3F5F0]/70 mb-2 max-w-24">{step.description}</p>
                    
                    {/* Tooltip on hover */}
                    <div className="absolute -top-20 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#F3F5F0] text-[#0D1B12] px-3 py-2 text-xs rounded shadow-lg whitespace-nowrap">
                      {step.metadata}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compliance Alignment */}
      <section ref={complianceRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={complianceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Built for Compliance at Every Layer
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              OPEF's infrastructure and workflows align with federal and international standards for secure AI and environmental data management.
            </p>
          </motion.div>

          {/* Compliance badges grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {complianceStandards.map((standard, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={complianceInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="group cursor-pointer"
              >
                <div className="border border-[#97B34D] bg-[#F3F5F0] p-6 hover:bg-[#97B34D] hover:text-black transition-all duration-300">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-bold uppercase tracking-wider">{standard.name}</h3>
                    <div className={`px-2 py-1 text-xs font-mono uppercase tracking-wider ${
                      standard.status === 'Certified' || standard.status === 'Implemented' 
                        ? 'bg-[#97B34D] text-black' 
                        : 'bg-[#0D1B12] text-[#F3F5F0]'
                    } group-hover:bg-black group-hover:text-[#F3F5F0] transition-colors`}>
                      {standard.status}
                    </div>
                  </div>
                  <p className="text-sm text-[#0D1B12]/70 group-hover:text-black/70 transition-colors">
                    {standard.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Audit Trails Section */}
      <section ref={auditRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            {/* Left Column - Text */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={auditInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
                transition={{ duration: 0.6 }}
              >
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
                  Immutable Audit Trails
                </h2>
                <p className="text-lg text-[#F3F5F0]/70 mb-8">
                  Each model inference, rule validation, and policy transformation is recorded as a verifiable log entry, ensuring accountability across the pipeline.
                </p>
                <button className="border border-[#97B34D] text-[#97B34D] px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#97B34D] hover:text-black transition-colors">
                  View Sample Audit Bundle →
                </button>
              </motion.div>
            </div>

            {/* Right Column - Code Visualization */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={auditInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="bg-[#0D1B12] border border-[#97B34D] p-6"
              >
                <div className="space-y-4">
                  {[
                    "[2025-10-21T21:58:12Z] rulepack.validate(NEPA_CE_01)",
                    "[2025-10-21T21:58:13Z] hash=8ad91d67f2f...",
                    "[2025-10-21T21:58:15Z] audit.bundle.export(status=OK)"
                  ].map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={auditInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                      transition={{ duration: 0.6, delay: 0.5 + (index * 0.2) }}
                      className="font-mono text-sm"
                    >
                      <span className="text-[#97B34D]">[</span>
                      <span className="text-[#F3F5F0]">{line}</span>
                      <span className="text-[#97B34D]">]</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Responsible AI & Ethics */}
      <section ref={ethicsRef} className="py-24 px-12 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ethicsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Responsible AI = Secure AI
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Explainability, fairness, and accountability are fundamental to OPEF's security philosophy.
            </p>
          </motion.div>

          {/* 3 sub-cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {ethicsPrinciples.map((principle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={ethicsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="bg-[#F3F5F0] border border-[#0D1B12]/20"
              >
                <div className="h-1 bg-[#97B34D]"></div>
                <div className="p-6">
                  <h3 className="text-lg font-bold mb-3">{principle.title}</h3>
                  <p className="text-sm text-[#0D1B12]/70">{principle.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={ctaRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12] text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
              Review the complete OPEF Security Whitepaper or request a compliance alignment package.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#97B34D] text-black px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#B9E08A] transition-colors">
                Download Whitepaper
              </button>
              <button className="border border-[#97B34D] text-[#97B34D] px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#97B34D] hover:text-black transition-colors">
                Contact Security Team
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default SecurityPage;
