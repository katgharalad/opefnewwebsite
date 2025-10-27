import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Search, Grid3X3, CheckCircle, BarChart3, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import OpefNavbar from './OpefNavbar';

const MetricsPage: React.FC = () => {
  const heroRef = useRef(null);
  const metricsRef = useRef(null);
  const visualizationRef = useRef(null);
  const transparencyRef = useRef(null);
  const benchmarksRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const metricsInView = useInView(metricsRef, { once: true });
  const visualizationInView = useInView(visualizationRef, { once: true });
  const transparencyInView = useInView(transparencyRef, { once: true });
  const benchmarksInView = useInView(benchmarksRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const coreMetrics = [
    {
      value: "1.3M+",
      label: "REGULATORY RULES PARSED",
      description: "Regulatory text converted per week"
    },
    {
      value: "92%",
      label: "REDUCTION IN DOCUMENT REVIEW TIME",
      description: "Average time savings across agencies"
    },
    {
      value: "100%",
      label: "PROVENANCE TRACEABILITY",
      description: "Every decision linked to source"
    },
    {
      value: "87%",
      label: "FASTER INTER-AGENCY COORDINATION",
      description: "Cross-agency workflow acceleration"
    },
    {
      value: "0.003s",
      label: "AVG RULE INFERENCE LATENCY",
      description: "Real-time compliance checking"
    },
    {
      value: "14x",
      label: "IMPROVEMENT IN EXPLAINABILITY CONSISTENCY",
      description: "Standardized reasoning paths"
    }
  ];

  const transparencyMetrics = [
    {
      icon: Search,
      title: "EXPLAINABILITY INDEX",
      description: "Tracks model reasoning paths and evidence chains."
    },
    {
      icon: Grid3X3,
      title: "COVERAGE SCORE",
      description: "Percentage of regulatory clauses mapped to executable rules."
    },
    {
      icon: CheckCircle,
      title: "VERIFICATION AUDIT",
      description: "Cross-validated with audit bundles in Proof subsystem."
    }
  ];

  // Sample data for visualization
  const chartData = [
    { month: 'Jan', coverage: 45 },
    { month: 'Feb', coverage: 52 },
    { month: 'Mar', coverage: 61 },
    { month: 'Apr', coverage: 68 },
    { month: 'May', coverage: 74 },
    { month: 'Jun', coverage: 82 },
    { month: 'Jul', coverage: 89 },
    { month: 'Aug', coverage: 94 },
    { month: 'Sep', coverage: 97 },
    { month: 'Oct', coverage: 100 }
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
            {/* Left Column - Copy */}
            <div className="lg:col-span-6">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-semibold leading-[0.85] tracking-tight mb-8"
              >
                Measure what{' '}
                <span className="relative group cursor-pointer">
                  matters
                  <motion.span 
                    className="absolute bottom-0 left-0 w-full h-1 bg-[#97B34D]"
                    initial={{ scaleX: 0 }}
                    animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </span>
                .
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-lg leading-relaxed text-[#F3F5F0]/80 mb-8"
              >
                OPEF quantifies explainability, coverage, and efficiency — transforming compliance into a measurable system of record.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <button className="bg-[#97B34D] text-black px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#B9E08A] transition-colors">
                  View Platform Report →
                </button>
              </motion.div>
            </div>

            {/* Right Column - Animated Counters */}
            <div className="lg:col-span-6">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="space-y-8"
              >
                {/* Counter 1 */}
                <div className="border-b border-[#F3F5F0]/20 pb-4">
                  <div className="text-4xl md:text-5xl font-bold text-[#97B34D] font-mono mb-2">
                    {heroInView && (
                      <CountUp
                        start={0}
                        end={1.3}
                        duration={1.5}
                        decimals={1}
                        suffix="M+"
                        useEasing={true}
                        easingFn={(t, b, c, d) => c * (t /= d) * t * t + b}
                      />
                    )}
                  </div>
                  <div className="text-sm text-[#F3F5F0]/60 uppercase tracking-wider">rules parsed</div>
                </div>

                {/* Counter 2 */}
                <div className="border-b border-[#F3F5F0]/20 pb-4">
                  <div className="text-4xl md:text-5xl font-bold text-[#97B34D] font-mono mb-2">
                    {heroInView && (
                      <CountUp
                        start={0}
                        end={92}
                        duration={1.5}
                        suffix="%"
                        useEasing={true}
                        easingFn={(t, b, c, d) => c * (t /= d) * t * t + b}
                      />
                    )}
                  </div>
                  <div className="text-sm text-[#F3F5F0]/60 uppercase tracking-wider">reduction in review time</div>
                </div>

                {/* Counter 3 */}
                <div>
                  <div className="text-4xl md:text-5xl font-bold text-[#97B34D] font-mono mb-2">
                    {heroInView && (
                      <CountUp
                        start={0}
                        end={100}
                        duration={1.5}
                        suffix="%"
                        useEasing={true}
                        easingFn={(t, b, c, d) => c * (t /= d) * t * t + b}
                      />
                    )}
                  </div>
                  <div className="text-sm text-[#F3F5F0]/60 uppercase tracking-wider">traceability index</div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Metrics Grid */}
      <section ref={metricsRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Core Platform Metrics
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Every model, rulepack, and output in OPEF is continuously measured for accuracy, speed, and defensibility.
            </p>
          </motion.div>

          {/* 6-card grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {coreMetrics.map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className="group cursor-pointer"
              >
                <div className="border-b border-[#97B34D]/30 pb-4 group-hover:border-[#97B34D] transition-colors">
                  <div className="text-4xl md:text-5xl font-bold text-[#97B34D] font-mono mb-2">
                    {metric.value}
                  </div>
                  <div className="text-sm text-[#0D1B12]/60 uppercase tracking-wider mb-2">
                    {metric.label}
                  </div>
                  <div className="text-sm text-[#0D1B12]/80">
                    {metric.description}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Visualization Section */}
      <section ref={visualizationRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={visualizationInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              System Performance Trends
            </h2>
            <p className="text-lg text-[#F3F5F0]/70">
              Performance metrics are aggregated across all Rulepacks and validated daily through the audit engine.
            </p>
          </motion.div>

          {/* Chart Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={visualizationInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="border-2 border-[#97B34D] p-8 bg-[#0D1B12]"
          >
            <div className="h-64 flex items-end justify-between gap-2">
              {chartData.map((point, index) => (
                <motion.div
                  key={index}
                  initial={{ height: 0 }}
                  animate={visualizationInView ? { height: `${point.coverage}%` } : { height: 0 }}
                  transition={{ duration: 1, delay: 0.5 + (index * 0.1) }}
                  className="flex-1 bg-[#97B34D] hover:bg-[#B9E08A] transition-colors group relative"
                  style={{ minHeight: '20px' }}
                >
                  {/* Tooltip */}
                  <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-[#0D1B12] text-[#F3F5F0] px-2 py-1 text-xs rounded">
                    {point.month}: {point.coverage}%
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="mt-4 text-sm text-[#F3F5F0]/60 font-mono">
              Automated rule coverage growth since launch
            </div>
          </motion.div>
        </div>
      </section>

      {/* Transparency Section */}
      <section ref={transparencyRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={transparencyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Transparent Metrics by Design
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              All metrics are derived from verifiable logs within the Proof Engine — never self-reported.
            </p>
          </motion.div>

          {/* 3 icon cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {transparencyMetrics.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={transparencyInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.6, delay: 0.2 + (index * 0.1) }}
                  className="text-center"
                >
                  <div className="w-16 h-16 mx-auto mb-6 flex items-center justify-center">
                    <Icon className="w-8 h-8 text-[#97B34D]" strokeWidth={1.5} />
                  </div>
                  <h3 className="text-sm font-mono text-[#0D1B12]/80 uppercase tracking-wider mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#0D1B12]/70">
                    {item.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benchmarks Comparison */}
      <section ref={benchmarksRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={benchmarksInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Benchmarks Comparison
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Machine-literate reviews are up to 20x faster and fully traceable.
            </p>
          </motion.div>

          {/* Split horizontal chart */}
          <div className="space-y-8">
            {/* Traditional Review */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">Traditional Review Workflow</h3>
                <div className="text-sm font-mono text-[#0D1B12]/60">Avg Time to Determination</div>
              </div>
              <div className="h-8 bg-[#B0B0B0] flex items-center justify-end pr-4">
                <span className="text-sm font-mono text-white">12 months</span>
              </div>
            </div>

            {/* OPEF Workflow */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-semibold">OPEF Workflow</h3>
                <div className="text-sm font-mono text-[#0D1B12]/60">Avg Time to Determination</div>
              </div>
              <motion.div
                initial={{ width: 0 }}
                animate={benchmarksInView ? { width: "20%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-8 bg-[#97B34D] flex items-center justify-end pr-4"
              >
                <span className="text-sm font-mono text-black">2.5 weeks</span>
              </motion.div>
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
              View live compliance metrics and transparency reports.
            </h2>
            
            <div className="space-y-4">
              <button className="bg-[#97B34D] text-black px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#B9E08A] transition-colors">
                Access Dashboard →
              </button>
              
              <div>
                <Link 
                  to="/"
                  className="text-[#97B34D] hover:text-[#B9E08A] transition-colors font-medium"
                >
                  Learn how OPEF measures defensibility
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default MetricsPage;
