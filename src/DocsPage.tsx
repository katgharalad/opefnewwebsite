import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Code, Terminal, FileText, Download, Copy, ChevronRight, CheckCircle, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpefNavbar from './OpefNavbar';

const DocsPage: React.FC = () => {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);
  const [activeApiSection, setActiveApiSection] = useState<string | null>(null);
  
  const heroRef = useRef(null);
  const quickstartRef = useRef(null);
  const apiRef = useRef(null);
  const schemaRef = useRef(null);
  const toolsRef = useRef(null);
  const changelogRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const quickstartInView = useInView(quickstartRef, { once: true });
  const apiInView = useInView(apiRef, { once: true });
  const schemaInView = useInView(schemaRef, { once: true });
  const toolsInView = useInView(toolsRef, { once: true });
  const changelogInView = useInView(changelogRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const quickstartSteps = [
    {
      step: "1",
      title: "Install CLI or SDK",
      description: "pip install opef-cli"
    },
    {
      step: "2",
      title: "Authenticate with API key",
      description: "opef auth --key YOUR_API_KEY"
    },
    {
      step: "3",
      title: "Run your first validation",
      description: "opef validate --input example_rulepack.json"
    },
    {
      step: "4",
      title: "Explore API endpoints",
      description: "curl https://api.opef.ai/v1/rulepacks/list"
    }
  ];

  const apiEndpoints = [
    {
      category: "Authentication",
      endpoints: [
        {
          method: "POST",
          path: "/v1/auth/token",
          description: "Generate API access token",
          parameters: ["api_key", "expires_in"],
          response: '{ "token": "eyJ...", "expires": "2025-10-22T00:00:00Z" }'
        }
      ]
    },
    {
      category: "Rulepack API",
      endpoints: [
        {
          method: "POST",
          path: "/v1/rulepacks/validate",
          description: "Validates a Rulepack against schema",
          parameters: ["file", "schema_version"],
          response: '{ "valid": true, "warnings": [], "errors": [] }'
        },
        {
          method: "GET",
          path: "/v1/rulepacks/list",
          description: "Retrieve available rulepacks",
          parameters: ["framework", "version", "status"],
          response: '{ "rulepacks": [...], "total": 42 }'
        }
      ]
    },
    {
      category: "Proof API",
      endpoints: [
        {
          method: "POST",
          path: "/v1/proof/generate",
          description: "Generate audit trail for analysis",
          parameters: ["analysis_id", "include_evidence"],
          response: '{ "proof_id": "abc123", "audit_trail": [...] }'
        }
      ]
    },
    {
      category: "Metrics API",
      endpoints: [
        {
          method: "GET",
          path: "/v1/metrics/performance",
          description: "Retrieve system performance metrics",
          parameters: ["timeframe", "metric_type"],
          response: '{ "latency": "0.003s", "throughput": "1000/min" }'
        }
      ]
    }
  ];

  const schemaExample = {
    "rule_id": "NEPA_CE_102",
    "trigger": "project_type == 'federal'",
    "condition": "impact < threshold",
    "output": "Categorical Exclusion",
    "source": "40 CFR §1508.4",
    "metadata": {
      "version": "3.2",
      "last_updated": "2025-10-15T00:00:00Z",
      "hash": "8ad91d67f2f..."
    }
  };

  const changelogEntries = [
    {
      date: "2025-10-15",
      version: "v3.2.0",
      changes: [
        "Added support for Rulepack v3.2 schema",
        "Introduced Proof API endpoints for audit trails",
        "Fixed schema validation error for NEPA triggers",
        "Enhanced CLI error reporting and debugging"
      ],
      latest: true
    },
    {
      date: "2025-10-08",
      version: "v3.1.2",
      changes: [
        "Improved API response times by 40%",
        "Added Python SDK documentation",
        "Fixed authentication token refresh bug",
        "Enhanced error messages for invalid schemas"
      ],
      latest: false
    },
    {
      date: "2025-10-01",
      version: "v3.1.0",
      changes: [
        "Launched Rulepack Explorer interface",
        "Added support for CWA Section 404 rules",
        "Implemented batch validation endpoints",
        "Updated CLI with new validation flags"
      ],
      latest: false
    }
  ];

  const copyToClipboard = async (text: string, id: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedCode(id);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const CodeBlock: React.FC<{ code: string; language?: string; id?: string }> = ({ code, language = "bash", id }) => (
    <div className="relative group">
      <div className="bg-[#0D1B12] border border-[#97B34D] p-4 font-mono text-sm">
        <div className="flex items-center justify-between mb-2">
          <span className="text-[#97B34D] text-xs uppercase tracking-wider">{language}</span>
          <button
            onClick={() => copyToClipboard(code, id || '')}
            className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:bg-[#97B34D]/20 rounded"
          >
            {copiedCode === id ? (
              <CheckCircle className="w-4 h-4 text-[#97B34D]" />
            ) : (
              <Copy className="w-4 h-4 text-[#F3F5F0]/60" />
            )}
          </button>
        </div>
        <pre className="text-[#F3F5F0] whitespace-pre-wrap">{code}</pre>
      </div>
    </div>
  );

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
            {/* Left Column - Copy */}
            <div className="lg:col-span-7">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-semibold leading-[0.85] tracking-tight mb-8"
              >
                Documentation for a{' '}
                <span className="relative group cursor-pointer">
                  Machine-Literate
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#97B34D]"
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                {' '}World.
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed text-[#F3F5F0]/80 mb-8"
              >
                Everything you need to integrate OPEF's Rulepack system into your workflow — from parsing APIs to schema validation.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="bg-[#97B34D] text-black px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#B9E08A] transition-colors">
                  Open API Reference →
                </button>
              </motion.div>
            </div>

            {/* Right Column - Animated Console */}
            <div className="lg:col-span-5">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="relative"
              >
                <div className="bg-[#0D1B12] border border-[#97B34D] p-6 font-mono text-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-[#F3F5F0]/60 ml-4">OPEF Terminal</span>
                  </div>
                  
                  <div className="space-y-2">
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 0.8 }}
                      className="text-[#97B34D]"
                    >
                      $ opef validate --rulepack nepa_ce.json
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 1.2 }}
                      className="flex items-center gap-2 text-green-400"
                    >
                      <CheckCircle className="w-4 h-4" />
                      Valid schema
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={heroInView ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ duration: 0.6, delay: 1.6 }}
                      className="text-[#F3F5F0]/60"
                    >
                      $ curl https://api.opef.ai/v1/rulepacks/list
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Quickstart Section */}
      <section ref={quickstartRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={quickstartInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Quickstart
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Get productive with OPEF in 60 seconds. Follow these steps to validate your first Rulepack.
            </p>
          </motion.div>

          {/* 2-column layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: Step list */}
            <div className="lg:col-span-5">
              <div className="border-l-4 border-[#97B34D] pl-8">
                {quickstartSteps.map((step, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={quickstartInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                    transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                    className="mb-8"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-8 h-8 bg-[#97B34D] text-black font-bold text-sm flex items-center justify-center rounded-full">
                        {step.step}
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                        <p className="text-sm text-[#0D1B12]/70 font-mono">{step.description}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Code snippet */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={quickstartInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <CodeBlock 
                  code={`# Install OPEF CLI
pip install opef-cli

# Authenticate with your API key
opef auth --key YOUR_API_KEY

# Validate your first Rulepack
opef validate --input example_rulepack.json

# List available rulepacks
curl https://api.opef.ai/v1/rulepacks/list \\
  -H "Authorization: Bearer YOUR_TOKEN"`}
                  language="bash"
                  id="quickstart-code"
                />
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* API Reference Index */}
      <section ref={apiRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={apiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              API Reference
            </h2>
            <p className="text-lg text-[#F3F5F0]/70">
              Complete API documentation for integrating OPEF into your applications.
            </p>
          </motion.div>

          {/* API Endpoints */}
          <div className="space-y-8">
            {apiEndpoints.map((category, categoryIndex) => (
              <motion.div
                key={categoryIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={apiInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (categoryIndex * 0.1) }}
                className="border border-[#F3F5F0]/20"
              >
                {/* Category Header */}
                <button
                  onClick={() => setActiveApiSection(activeApiSection === category.category ? null : category.category)}
                  className="w-full p-6 text-left hover:bg-[#F3F5F0]/5 transition-colors flex items-center justify-between"
                >
                  <h3 className="text-xl font-semibold">{category.category}</h3>
                  <ChevronRight 
                    className={`w-5 h-5 transition-transform ${
                      activeApiSection === category.category ? 'rotate-90' : ''
                    }`} 
                  />
                </button>

                {/* Endpoints */}
                {activeApiSection === category.category && (
                  <div className="border-t border-[#F3F5F0]/20">
                    {category.endpoints.map((endpoint, endpointIndex) => (
                      <motion.div
                        key={endpointIndex}
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3, delay: endpointIndex * 0.1 }}
                        className="p-6 border-b border-[#F3F5F0]/10 last:border-b-0"
                      >
                        <div className="flex items-center gap-4 mb-4">
                          <div className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${
                            endpoint.method === 'POST' 
                              ? 'bg-[#97B34D] text-black' 
                              : 'bg-[#F3F5F0] text-[#0D1B12]'
                          }`}>
                            {endpoint.method}
                          </div>
                          <code className="text-lg font-mono text-[#97B34D]">{endpoint.path}</code>
                        </div>
                        
                        <p className="text-sm text-[#F3F5F0]/70 mb-4">{endpoint.description}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-[#97B34D]">Parameters:</h4>
                            <ul className="text-sm text-[#F3F5F0]/70 space-y-1">
                              {endpoint.parameters.map((param, paramIndex) => (
                                <li key={paramIndex} className="font-mono">{param}</li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-sm font-semibold mb-2 text-[#97B34D]">Response:</h4>
                            <CodeBlock 
                              code={endpoint.response}
                              language="json"
                              id={`api-response-${categoryIndex}-${endpointIndex}`}
                            />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Schema Explorer */}
      <section ref={schemaRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={schemaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Rulepack Schema Explorer
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              The OPEF schema ensures that every rule definition, trigger, and output remains machine-consistent and auditable.
            </p>
          </motion.div>

          {/* Split grid layout */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Left: JSON viewer */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={schemaInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <CodeBlock 
                  code={JSON.stringify(schemaExample, null, 2)}
                  language="json"
                  id="schema-example"
                />
                <div className="mt-4">
                  <button className="bg-[#97B34D] text-black px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#B9E08A] transition-colors">
                    Validate Rulepack →
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Right: Field descriptions */}
            <div className="lg:col-span-5">
              <div className="space-y-6">
                {[
                  { field: "rule_id", description: "Unique identifier for the rule within the framework" },
                  { field: "trigger", description: "Conditional logic that determines when this rule applies" },
                  { field: "condition", description: "Specific criteria that must be met for the rule to activate" },
                  { field: "output", description: "The result or action when the rule conditions are satisfied" },
                  { field: "source", description: "Regulatory citation or legal basis for the rule" },
                  { field: "metadata", description: "Versioning, timestamps, and cryptographic hashes for audit trails" }
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={schemaInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                    transition={{ duration: 0.6, delay: 0.5 + (index * 0.1) }}
                    className="border-l-2 border-[#97B34D] pl-4"
                  >
                    <h4 className="font-mono text-sm font-semibold text-[#97B34D] mb-2">{item.field}</h4>
                    <p className="text-sm text-[#0D1B12]/70">{item.description}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CLI & SDK Tools */}
      <section ref={toolsRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              CLI & SDK Tools
            </h2>
            <p className="text-lg text-[#F3F5F0]/70">
              Developer utilities for integrating OPEF into your workflow.
            </p>
          </motion.div>

          {/* Two-column grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* CLI Tool */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="border border-[#F3F5F0]/20 p-6 hover:border-[#97B34D] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <Terminal className="w-6 h-6 text-[#97B34D]" />
                <h3 className="text-xl font-semibold">CLI Tool</h3>
              </div>
              
              <CodeBlock 
                code={`# Validate a rulepack
opef validate file.json

# Generate audit trail
opef audit export --analysis-id abc123

# List available frameworks
opef frameworks list

# Get help
opef --help`}
                language="bash"
                id="cli-examples"
              />
              
              <div className="mt-4">
                <button className="border border-[#97B34D] text-[#97B34D] px-4 py-2 font-mono tracking-wider uppercase hover:bg-[#97B34D] hover:text-black transition-colors">
                  View CLI Docs →
                </button>
              </div>
            </motion.div>

            {/* Python SDK */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={toolsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="border border-[#F3F5F0]/20 p-6 hover:border-[#97B34D] transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <Code className="w-6 h-6 text-[#97B34D]" />
                <h3 className="text-xl font-semibold">Python SDK</h3>
              </div>
              
              <CodeBlock 
                code={`from opef import Rulepack, Client

# Load and validate a rulepack
r = Rulepack.load("nepa_ce.json")
result = r.validate()

# Initialize API client
client = Client(api_key="your_key")

# List available rulepacks
rulepacks = client.rulepacks.list()

# Generate proof bundle
proof = client.proof.generate(
    analysis_id="abc123",
    include_evidence=True
)`}
                language="python"
                id="python-sdk"
              />
              
              <div className="mt-4">
                <button className="border border-[#97B34D] text-[#97B34D] px-4 py-2 font-mono tracking-wider uppercase hover:bg-[#97B34D] hover:text-black transition-colors">
                  Open SDK Reference →
                </button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Changelog Section */}
      <section ref={changelogRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={changelogInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Changelog
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Track ongoing product changes and SDK updates.
            </p>
          </motion.div>

          {/* Timeline layout */}
          <div className="relative">
            {/* Vertical olive line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-[#97B34D]"></div>
            
            <div className="space-y-8">
              {changelogEntries.map((entry, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -40 }}
                  animate={changelogInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -40 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  className="relative flex items-start gap-8"
                >
                  {/* Timeline dot */}
                  <div className={`flex-shrink-0 w-4 h-4 rounded-full ${
                    entry.latest ? 'bg-[#97B34D]' : 'bg-[#0D1B12]/20'
                  }`}></div>
                  
                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="font-mono text-sm text-[#0D1B12]/60">{entry.date}</span>
                      <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${
                        entry.latest 
                          ? 'bg-[#97B34D] text-black' 
                          : 'bg-[#0D1B12]/10 text-[#0D1B12]/70'
                      }`}>
                        {entry.version}
                      </span>
                    </div>
                    
                    <ul className="space-y-2">
                      {entry.changes.map((change, changeIndex) => (
                        <li key={changeIndex} className="text-sm text-[#0D1B12]/70 flex items-start gap-2">
                          <span className="text-[#97B34D] mt-1">•</span>
                          <span>{change}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
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
              Ready to build with OPEF?
            </h2>
            <p className="text-lg text-[#F3F5F0]/70 mb-8">
              Access API keys, SDKs, and integration docs.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-[#97B34D] text-black px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#B9E08A] transition-colors">
                Join Developer Beta
              </button>
              <button className="border border-[#97B34D] text-[#97B34D] px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#97B34D] hover:text-black transition-colors">
                View API Reference
              </button>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default DocsPage;
