import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { ArrowLeft, Calendar, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpefNavbar from './OpefNavbar';

const InsightsPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isFilterBarSticky, setIsFilterBarSticky] = useState(false);
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  
  const heroRef = useRef(null);
  const featuredRef = useRef(null);
  const filterBarRef = useRef(null);
  const gridRef = useRef(null);
  const quoteRef = useRef(null);
  const newsletterRef = useRef(null);
  const ctaRef = useRef(null);
  
  const heroInView = useInView(heroRef, { once: true });
  const featuredInView = useInView(featuredRef, { once: true });
  const filterBarInView = useInView(filterBarRef, { once: true });
  const gridInView = useInView(gridRef, { once: true });
  const quoteInView = useInView(quoteRef, { once: true });
  const newsletterInView = useInView(newsletterRef, { once: true });
  const ctaInView = useInView(ctaRef, { once: true });

  const filterCategories = ['All', 'Research', 'Case Studies', 'Policy', 'Platform Updates'];

  const featuredInsights = [
    {
      id: 1,
      category: 'Research',
      title: 'Rulepack Validation Accuracy: Benchmarking Machine-Literate Regulation',
      summary: 'A comparative study of explainability and validation rates across OPEF\'s schema framework, demonstrating 95% accuracy in environmental compliance automation.',
      author: 'OPEF Research Team',
      date: 'October 2025',
      readTime: '12 min read',
      featured: true
    },
    {
      id: 2,
      category: 'Policy',
      title: 'AI Explainability in NEPA Environmental Assessments',
      summary: 'A case analysis of how model transparency improves environmental decision traceability and reduces review times by 60% in federal agencies.',
      author: 'Dr. Sarah Chen',
      date: 'September 2025',
      readTime: '8 min read',
      featured: true
    }
  ];

  const allInsights = [
    {
      id: 1,
      category: 'Research',
      title: 'Rulepack Validation Accuracy: Benchmarking Machine-Literate Regulation',
      summary: 'A comparative study of explainability and validation rates across OPEF\'s schema framework.',
      author: 'OPEF Research Team',
      date: 'October 2025',
      readTime: '12 min read',
      featured: true
    },
    {
      id: 2,
      category: 'Policy',
      title: 'AI Explainability in NEPA Environmental Assessments',
      summary: 'A case analysis of how model transparency improves environmental decision traceability.',
      author: 'Dr. Sarah Chen',
      date: 'September 2025',
      readTime: '8 min read',
      featured: true
    },
    {
      id: 3,
      category: 'Case Studies',
      title: 'Federal Agency Deployment: Lessons from NEPA Automation',
      summary: 'Real-world insights from implementing OPEF across multiple federal agencies, including performance metrics and lessons learned.',
      author: 'OPEF Implementation Team',
      date: 'September 2025',
      readTime: '15 min read',
      featured: false
    },
    {
      id: 4,
      category: 'Research',
      title: 'Building Explainable AI for Environmental Decision-Making',
      summary: 'Deep dive into the technical architecture behind OPEF\'s explainable AI system and how it ensures audit-ready compliance.',
      author: 'Alex Rodriguez',
      date: 'August 2025',
      readTime: '10 min read',
      featured: false
    },
    {
      id: 5,
      category: 'Policy',
      title: 'OMB M-25-21: What It Means for Environmental Agencies',
      summary: 'Analysis of the federal AI governance mandate and its implications for environmental compliance modernization.',
      author: 'OPEF Policy Team',
      date: 'August 2025',
      readTime: '6 min read',
      featured: false
    },
    {
      id: 6,
      category: 'Platform Updates',
      title: 'Rulepack v3.2: Enhanced Schema Validation',
      summary: 'New features in OPEF\'s latest rulepack framework, including improved validation accuracy and expanded regulatory coverage.',
      author: 'OPEF Engineering',
      date: 'July 2025',
      readTime: '5 min read',
      featured: false
    },
    {
      id: 7,
      category: 'Case Studies',
      title: 'CWA Section 404: Automation Opportunities and Challenges',
      summary: 'Exploring how machine-readable regulations can streamline Clean Water Act compliance while maintaining environmental protections.',
      author: 'Environmental Law Institute',
      date: 'July 2025',
      readTime: '9 min read',
      featured: false
    },
    {
      id: 8,
      category: 'Research',
      title: 'Machine Learning in Environmental Impact Assessment',
      summary: 'Research on applying ML techniques to EIA processes while ensuring transparency and regulatory compliance.',
      author: 'Dr. Maria Santos',
      date: 'June 2025',
      readTime: '11 min read',
      featured: false
    },
    {
      id: 9,
      category: 'Policy',
      title: 'Building Trust in AI-Driven Compliance Systems',
      summary: 'Policy framework for ensuring public trust and regulatory acceptance of AI-powered environmental compliance tools.',
      author: 'OPEF Policy Team',
      date: 'June 2025',
      readTime: '7 min read',
      featured: false
    }
  ];

  const filteredInsights = activeFilter === 'All' 
    ? allInsights 
    : allInsights.filter(insight => insight.category === activeFilter);

  useEffect(() => {
    const handleScroll = () => {
      const filterBar = filterBarRef.current;
      if (filterBar) {
        const rect = (filterBar as HTMLElement).getBoundingClientRect();
        setIsFilterBarSticky(rect.top <= 0);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setEmail('');
      setTimeout(() => setIsSubscribed(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1B12] text-[#F3F5F0]">
      <OpefNavbar />
      
      {/* Back Button */}
      <div className="pt-20">
        <div className="max-w-4xl mx-auto px-8 md:px-16 lg:px-32 py-8">
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
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-7xl font-semibold leading-[0.85] tracking-tight mb-8"
          >
            Insights from the{' '}
            <span className="relative group cursor-pointer">
              Machine-Literate Future
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
            className="text-lg leading-relaxed text-[#F3F5F0]/80 mb-8 max-w-3xl mx-auto"
          >
            Explore how OPEF's explainable systems, data frameworks, and AI-driven policy tools are transforming environmental governance.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <button className="border border-[#97B34D] text-[#97B34D] px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#97B34D] hover:text-black transition-colors">
              Explore Publications →
            </button>
          </motion.div>
        </div>
        
        {/* Bottom gradient divider */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={heroInView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="h-0.5 w-full bg-gradient-to-r from-transparent via-[#97B34D] to-transparent mt-16"
        />
      </section>

      {/* Featured Insights */}
      <section ref={featuredRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Featured Research
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Top research and publication pieces from OPEF's research team.
            </p>
          </motion.div>

          <div className="space-y-8">
            {featuredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={featuredInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.1) }}
                className={`group cursor-pointer ${
                  index % 2 === 0 ? 'bg-[#F3F5F0]' : 'bg-[#0D1B12] text-[#F3F5F0]'
                } p-8 hover:scale-[1.02] transition-all duration-300`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  {/* Left: Thumbnail placeholder */}
                  <div className="lg:col-span-4">
                    <div className={`w-full h-48 border-l-3 border-[#97B34D] ${
                      index % 2 === 0 ? 'bg-[#0D1B12]/5' : 'bg-[#F3F5F0]/5'
                    } flex items-center justify-center`}>
                      <div className="text-center">
                        <div className={`text-2xl font-bold mb-2 ${
                          index % 2 === 0 ? 'text-[#0D1B12]' : 'text-[#F3F5F0]'
                        }`}>
                          {insight.category}
                        </div>
                        <div className={`text-sm ${
                          index % 2 === 0 ? 'text-[#0D1B12]/60' : 'text-[#F3F5F0]/60'
                        }`}>
                          Research Visual
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Content */}
                  <div className="lg:col-span-8">
                    <div className="flex items-center gap-4 mb-4">
                      <span className={`px-3 py-1 text-xs font-mono uppercase tracking-wider ${
                        index % 2 === 0 
                          ? 'bg-[#97B34D] text-black' 
                          : 'bg-[#F3F5F0] text-[#0D1B12]'
                      }`}>
                        {insight.category}
                      </span>
                      <span className={`text-sm ${
                        index % 2 === 0 ? 'text-[#0D1B12]/60' : 'text-[#F3F5F0]/60'
                      }`}>
                        {insight.readTime}
                      </span>
                    </div>
                    
                    <h3 className={`text-2xl font-semibold mb-4 group-hover:text-[#97B34D] transition-colors ${
                      index % 2 === 0 ? 'text-[#0D1B12]' : 'text-[#F3F5F0]'
                    }`}>
                      {insight.title}
                    </h3>
                    
                    <p className={`text-base leading-relaxed mb-6 ${
                      index % 2 === 0 ? 'text-[#0D1B12]/70' : 'text-[#F3F5F0]/70'
                    }`}>
                      {insight.summary}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <div className={`text-sm ${
                        index % 2 === 0 ? 'text-[#0D1B12]/60' : 'text-[#F3F5F0]/60'
                      }`}>
                        By {insight.author} • {insight.date}
                      </div>
                      <button className={`px-4 py-2 font-mono tracking-wider uppercase text-sm transition-colors ${
                        index % 2 === 0
                          ? 'text-[#97B34D] hover:text-black border border-[#97B34D] hover:bg-[#97B34D]'
                          : 'text-[#F3F5F0] hover:text-[#0D1B12] border border-[#F3F5F0] hover:bg-[#F3F5F0]'
                      }`}>
                        Read Insight →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Category Filter Bar */}
      <div 
        ref={filterBarRef}
        className={`sticky top-0 z-10 transition-all duration-200 ${
          isFilterBarSticky 
            ? 'bg-[#0D1B12]/95 backdrop-blur-sm shadow-lg border-b border-[#97B34D]' 
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-32 py-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={filterBarInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
            className="flex flex-wrap gap-3 justify-center"
          >
            {filterCategories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveFilter(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeFilter === category
                    ? 'bg-[#97B34D] text-black'
                    : 'text-[#F3F5F0] hover:text-[#97B34D] hover:bg-[#97B34D]/10'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Grid of Posts */}
      <section ref={gridRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              All Insights
            </h2>
            <p className="text-lg text-[#0D1B12]/70">
              Research, case studies, and policy analysis from OPEF's research team.
            </p>
          </motion.div>

          {/* Responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredInsights.map((insight, index) => (
              <motion.div
                key={insight.id}
                initial={{ opacity: 0, y: 20 }}
                animate={gridInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.1 + (index * 0.05) }}
                className="group cursor-pointer bg-[#F3F5F0] hover:bg-[#F3F5F0]/95 transition-all duration-300"
              >
                <div className="p-6 border-b border-[#0D1B12]/10">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2 py-1 bg-[#0D1B12]/10 text-xs font-mono uppercase tracking-wider text-[#0D1B12]/70">
                      {insight.category}
                    </span>
                    <span className="text-xs text-[#0D1B12]/60 font-mono">
                      {insight.readTime}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold mb-3 group-hover:text-[#97B34D] transition-colors relative">
                    {insight.title}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-[#97B34D] group-hover:w-full transition-all duration-300" />
                  </h3>
                  
                  <p className="text-sm text-[#0D1B12]/70 mb-4 leading-relaxed">
                    {insight.summary}
                  </p>
                  
                  <div className="flex items-center justify-between text-xs text-[#0D1B12]/60">
                    <div className="flex items-center gap-2">
                      <User className="w-3 h-3" />
                      <span>{insight.author}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-3 h-3" />
                      <span>{insight.date}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote / Research Highlight */}
      <section ref={quoteRef} className="py-24 px-12 md:px-16 lg:px-32 bg-[#0D1B12] text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={quoteInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <blockquote className="text-2xl md:text-3xl font-semibold leading-relaxed tracking-[0.02em] mb-6">
              "Transparency is not optional — it's foundational to environmental governance."
            </blockquote>
            <cite className="text-lg text-[#F3F5F0]/70 font-medium">
              — OPEF Research Group, 2025
            </cite>
            
            {/* Olive underline animation */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={quoteInView ? { scaleX: 1 } : { scaleX: 0 }}
              transition={{ duration: 1, delay: 0.5 }}
              className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-1 w-32 bg-[#97B34D]"
            />
          </motion.div>
        </div>
      </section>

      {/* Newsletter / Subscription CTA */}
      <section ref={newsletterRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#F3F5F0] text-[#0D1B12]">
        <div className="max-w-2xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={newsletterInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-[#0D1B12]/70 mb-8">
              Get the latest research and policy insights from OPEF.
            </p>
            
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="flex-1 px-4 py-3 border border-[#97B34D] rounded focus:outline-none focus:ring-2 focus:ring-[#97B34D]/20 font-mono"
                  required
                />
                <button
                  type="submit"
                  className="bg-[#97B34D] text-black px-6 py-3 font-mono tracking-wider uppercase hover:bg-[#B9E08A] transition-colors rounded"
                >
                  {isSubscribed ? 'Subscribed!' : 'Subscribe'}
                </button>
              </div>
              
              <div className="flex items-center justify-center gap-2 text-sm text-[#0D1B12]/60">
                <input type="checkbox" id="agree" className="rounded" />
                <label htmlFor="agree">I agree to receive updates</label>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Footer CTA */}
      <section ref={ctaRef} className="py-24 px-8 md:px-16 lg:px-32 bg-[#0D1B12] text-center">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-6xl font-semibold tracking-tight mb-8">
              Explore the full library of OPEF research and technical publications.
            </h2>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
              <button className="bg-[#97B34D] text-black px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#B9E08A] transition-colors">
                Read Whitepaper →
              </button>
              <button className="border border-[#97B34D] text-[#97B34D] px-8 py-4 font-mono tracking-wider uppercase text-lg hover:bg-[#97B34D] hover:text-black transition-colors">
                Contact Research Team
              </button>
            </div>
            
            <p className="text-sm text-[#F3F5F0]/60">
              Citations and data available upon request.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default InsightsPage;
