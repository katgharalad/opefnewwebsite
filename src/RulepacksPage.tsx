import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, CheckCircle, Code, FileText, Shield, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpefNavbar from './OpefNavbar';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

const RulepacksPage: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isValidating, setIsValidating] = useState(false);
  const [validationResult, setValidationResult] = useState<boolean | null>(null);
  
  const heroRef = useRef(null);
  const whatAreRef = useRef(null);
  const howWorkRef = useRef(null);
  const frameworksRef = useRef(null);
  const schemaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const whatAreInView = useInView(whatAreRef, { once: true });
  const howWorkInView = useInView(howWorkRef, { once: true });
  const frameworksInView = useInView(frameworksRef, { once: true });
  const schemaInView = useInView(schemaRef, { once: true });

  // Scroll animation for "How They Work" section
  useEffect(() => {
    const handleScroll = () => {
      if (howWorkInView) {
        const steps = document.querySelectorAll('[data-step]');
        steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.7) {
            setActiveStep(index);
          }
        });
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [howWorkInView]);

  const validateRulepack = async () => {
    setIsValidating(true);
    // Simulate validation
    await new Promise(resolve => setTimeout(resolve, 1500));
    setValidationResult(true);
    setIsValidating(false);
  };

  const exampleRulepack = {
    "rule_id": "NEPA_102_CE1",
    "trigger": "project_type == 'federal'",
    "condition": "impact < threshold",
    "output": "Categorical Exclusion",
    "source": "40 CFR §1508.4",
    "metadata": {
      "version": "1.0",
      "last_updated": "2024-10-22",
      "validated": true
    }
  };

  const frameworks = [
    {
      name: "NEPA",
      fullName: "National Environmental Policy Act",
      description: "Procedural compliance framework for federal actions"
    },
    {
      name: "ESA", 
      fullName: "Endangered Species Act",
      description: "Species protection and habitat conservation rules"
    },
    {
      name: "CWA",
      fullName: "Clean Water Act", 
      description: "Water quality standards and discharge permits"
    },
    {
      name: "NHPA",
      fullName: "National Historic Preservation Act",
      description: "Cultural resource and historic preservation compliance"
    }
  ];

  const processSteps = [
    {
      title: "Environmental Statute",
      description: "Raw regulatory text from federal agencies and state frameworks.",
      icon: FileText
    },
    {
      title: "NLP & Semantic Parser", 
      description: "Machine learning models extract structured logic from natural language.",
      icon: Code
    },
    {
      title: "Schema Validation",
      description: "Each rule undergoes consistency checks before becoming a verified Rulepack.",
      icon: Shield
    },
    {
      title: "Executable JSON Rulepack",
      description: "Machine-readable output with full provenance and validation metadata.",
      icon: Zap
    }
  ];

  return (
    <div className="min-h-screen bg-[#0D1B12] text-[#F3F5F0]">
      <OpefNavbar />
      
      {/* Back Button */}
      <div className="pt-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
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
      <section ref={heroRef} className="min-h-screen flex items-center">
        <div className="max-w-7xl mx-auto px-6 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Column - Copy */}
            <div className="lg:col-span-7 max-w-2xl">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter mb-6"
              >
                Every rule,{' '}
                <span className="relative">
                  machine-readable
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#97B34D]"
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                . Every decision, explainable.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl leading-relaxed text-[#F3F5F0]/80 mb-8"
              >
                OPEF Rulepacks translate environmental frameworks like NEPA and ESA into interoperable JSON schemas that machines — and humans — can both interpret.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="bg-[#97B34D] text-black px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#B9E08A] transition-colors">
                  Explore Rulepacks
                </button>
              </motion.div>
            </div>

            {/* Right Column - Globe */}
            <div className="lg:col-span-5 lg:pr-20">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative w-full h-96 flex items-center justify-center"
              >
                <RotatingEarth
                  width={400}
                  height={400}
                  className="opacity-90"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* What Are Rulepacks Section */}
      <section ref={whatAreRef} className="py-24 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto px-6">
          {/* Olive highlight strip */}
          <div className="h-0.5 w-24 bg-[#97B34D] mb-8"></div>
          
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={whatAreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight mb-4"
            >
              What Are Rulepacks?
            </h2>
            <p 
              className="text-xl text-[#0D1B12]/70 mb-16"
            >
              Structured representations of environmental policy.
            </p>
          </motion.div>

          {/* Three-column process */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={whatAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-center"
            >
              <div className="bg-[#0D1B12] text-[#F3F5F0] p-6 rounded-lg mb-4 h-32 flex items-center justify-center">
                <div className="text-sm font-mono">
                  <div className="text-[#97B34D]">NEPA §1508.4</div>
                  <div className="mt-2 opacity-70">"Categorical exclusion means..."</div>
                  <div className="mt-1 opacity-50">"a category of actions..."</div>
                </div>
              </div>
              <h3 className="font-black mb-2">Unstructured Environmental Text</h3>
              <p className="text-sm text-[#0D1B12]/70">NEPA, ESA, CWA, NHPA regulatory frameworks</p>
            </motion.div>

            {/* Transformation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={whatAreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-center"
            >
              <div className="bg-[#0D1B12] text-[#F3F5F0] p-6 rounded-lg mb-4 h-32 flex items-center justify-center">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-[#97B34D] rounded-full animate-pulse"></div>
                  <div className="w-2 h-2 bg-[#97B34D] rounded-full animate-pulse" style={{ animationDelay: '0.2s' }}></div>
                  <div className="w-2 h-2 bg-[#97B34D] rounded-full animate-pulse" style={{ animationDelay: '0.4s' }}></div>
                </div>
              </div>
              <h3 className="font-black mb-2">Machine-Literate Parsing</h3>
              <p className="text-sm text-[#0D1B12]/70">Rule compilation and logic extraction</p>
            </motion.div>

            {/* Output */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={whatAreInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="text-center"
            >
              <div className="bg-[#0D1B12] text-[#F3F5F0] p-6 rounded-lg mb-4 h-32 flex items-center justify-center">
                <div className="text-xs font-mono">
                  <div className="text-[#97B34D]">{"{"}</div>
                  <div className="ml-2">"rule_id": "NEPA_102"</div>
                  <div className="ml-2">"trigger": "federal"</div>
                  <div className="text-[#97B34D]">{"}"}</div>
                </div>
              </div>
              <h3 className="font-black mb-2">OPEF Rulepack (JSON Schema)</h3>
              <p className="text-sm text-[#0D1B12]/70">Machine-readable with full provenance</p>
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={whatAreInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="text-center mt-12 text-lg font-mono"
          >
            A Rulepack is a compact, machine-readable framework that defines environmental rules, triggers, and outcomes — all with full provenance and validation.
          </motion.p>
        </div>
      </section>

      {/* How They Work Section */}
      <section ref={howWorkRef} className="py-24 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={howWorkInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-center"
            >
              How They Work
            </h2>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {processSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  data-step={index}
                  initial={{ opacity: 0, x: -40 }}
                  animate={howWorkInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className={`flex items-center gap-8 mb-16 ${
                    activeStep >= index ? 'opacity-100' : 'opacity-50'
                  }`}
                >
                  {/* Left: Icon and Content */}
                  <div className="flex items-center gap-6">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center border-2 ${
                      activeStep >= index 
                        ? 'border-[#97B34D] bg-[#97B34D]/10' 
                        : 'border-[#F3F5F0]/20'
                    }`}>
                      <Icon className={`w-6 h-6 ${
                        activeStep >= index ? 'text-[#97B34D]' : 'text-[#F3F5F0]/40'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-xl font-black mb-2">{step.title}</h3>
                      <p className="text-[#F3F5F0]/70">{step.description}</p>
                    </div>
                  </div>

                  {/* Right: Connection Line */}
                  {index < processSteps.length - 1 && (
                    <div className="flex-1 flex justify-center">
                      <div className={`w-px h-16 ${
                        activeStep >= index ? 'bg-[#97B34D]' : 'bg-[#F3F5F0]/20'
                      }`}></div>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Frameworks Supported Section */}
      <section ref={frameworksRef} className="py-24 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={frameworksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight mb-16 text-center"
            >
              Built for the frameworks that shape our world.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {frameworks.map((framework, index) => (
              <motion.div
                key={framework.name}
                initial={{ opacity: 0, y: 20 }}
                animate={frameworksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group bg-[#0D1B12] border border-[#97B34D]/20 rounded-lg p-6 hover:border-[#97B34D] hover:shadow-[0_0_20px_rgba(151,179,77,0.2)] transition-all"
              >
                <h3 className="text-2xl font-black text-[#97B34D] mb-2">{framework.name}</h3>
                <p className="text-sm text-[#F3F5F0]/60 mb-3">{framework.fullName}</p>
                <p className="text-sm text-[#F3F5F0]/80 group-hover:text-[#F3F5F0] transition-colors">
                  {framework.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema Visualization Section */}
      <section ref={schemaRef} className="py-24 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={schemaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight mb-8"
            >
              Inside a Rulepack
            </h2>
            <p 
              className="text-xl text-[#0D1B12]/70 mb-12 max-w-3xl"
            >
              Each Rulepack contains structured logic, validation metadata, and full provenance tracking for complete transparency.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* JSON Viewer */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={schemaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-[#0D1B12] rounded-lg p-6 overflow-x-auto"
            >
              <pre className="text-sm font-mono text-[#F3F5F0]">
                <code>
{JSON.stringify(exampleRulepack, null, 2)}
                </code>
              </pre>
            </motion.div>

            {/* Validation Widget */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={schemaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="space-y-6"
            >
              <div className="bg-white border border-[#97B34D]/20 rounded-lg p-6">
                <h3 className="font-black mb-4">Schema Validation</h3>
                <p className="text-sm text-[#0D1B12]/70 mb-4">
                  Verify rulepack structure and compliance with OPEF standards.
                </p>
                <button 
                  onClick={validateRulepack}
                  disabled={isValidating}
                  className="border border-[#97B34D] text-[#97B34D] px-4 py-2 rounded hover:bg-[#97B34D] hover:text-black transition-colors disabled:opacity-50"
                >
                  {isValidating ? 'Validating...' : 'Validate Rulepack'}
                </button>
                
                {validationResult !== null && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="mt-4 flex items-center gap-2"
                  >
                    <CheckCircle className="w-5 h-5 text-green-500" />
                    <span className="text-sm text-green-600">Valid Rulepack Schema</span>
                  </motion.div>
                )}
              </div>

              <div className="space-y-3">
                <h4 className="font-black">Key Components:</h4>
                <div className="space-y-2 text-sm">
                  <div><span className="text-[#97B34D] font-mono">rule_id:</span> Unique identifier</div>
                  <div><span className="text-[#97B34D] font-mono">trigger:</span> Activation condition</div>
                  <div><span className="text-[#97B34D] font-mono">condition:</span> Evaluation logic</div>
                  <div><span className="text-[#97B34D] font-mono">output:</span> Result classification</div>
                  <div><span className="text-[#97B34D] font-mono">source:</span> Regulatory citation</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0D1B12] text-center">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h2 
              className="text-4xl md:text-6xl font-black tracking-tight mb-8"
            >
              Explore the full library of machine-readable environmental rulepacks.
            </h2>
            
            <button className="bg-[#97B34D] text-black px-8 py-4 font-mono tracking-wider uppercase text-lg rounded-sm hover:bg-[#B9E08A] transition-colors mb-6">
              View All Rulepacks
            </button>
            
            <p 
              className="text-[#F3F5F0]/70"
            >
              Available for NEPA, CWA, ESA, NHPA, and custom internal frameworks.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default RulepacksPage;