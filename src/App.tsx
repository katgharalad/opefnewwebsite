import { ArrowRight, Box, CheckCircle2, CircuitBoard, FileText, ShieldCheck } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import OpefNavbar from './OpefNavbar';
import WhyItMatters from './WhyItMatters';
import RotatingEarth from '@/components/ui/wireframe-dotted-globe';

function App() {
  const [email, setEmail] = useState('');
  const [displayText, setDisplayText] = useState('');
  const [showCursor, setShowCursor] = useState(true);
  const [fillProgress, setFillProgress] = useState(0);
  const [section2Ref, setSection2Ref] = useState<HTMLElement | null>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [activePersona, setActivePersona] = useState<'agencies'|'consulting'|'sustainability'|'researchers'>('agencies');
  const proofSectionRef = useRef(null);
  const [visionCountersVisible, setVisionCountersVisible] = useState(false);
  const [visionTextVisible, setVisionTextVisible] = useState(false);
  const [visionTypewriterText, setVisionTypewriterText] = useState('');
  const visionSectionRef = useRef(null);
  const [betaVisible, setBetaVisible] = useState(false);
  const betaSectionRef = useRef(null);

  const fullText = "Bury Bureaucracy. Work Easier.";

  // Team data
  const team = {
    headline: "Why Us?",
    subhead: "Applied, explainable AI for environmental systems — built by product operatives, researchers, and domain experts.",
    founders: [
      {
        name: "Inesh Tickoo",
        title: "Founder, CEO (Product & GTM)",
        headshot: "/images/inesh.jpeg",
        placeholder: "https://picsum.photos/320/320?random=1",
        tags: ["Product", "GTM", "Design", "Research"]
      },
      {
        name: "Aarav Singh",
        title: "Founder, CTO & Chief of Staff",
        headshot: "/images/aarav.jpg",
        placeholder: "https://picsum.photos/320/320?random=2",
        tags: ["AI", "Data", "ESG", "Automation"]
      }
    ],
    advisors: [
      { 
        name: "Matt Bixler", 
        title: "Advisory — Product Management, GTM, Sales", 
        headshot: "/images/mattbixler.jpg",
        tags: ["Product", "Sales", "GTM"] 
      },
      { 
        name: "JP Diogo", 
        title: "Advisory — Technology OM, GTM, Growth, Investments", 
        headshot: "/images/jpdiogo.jpeg",
        tags: ["Ops", "Growth", "Investments"] 
      },
      { 
        name: "Tim Hayes", 
        title: "Advisory — AI Technology & Software Engineering", 
        headshot: "/images/tim.jpeg",
        tags: ["AI", "ML", "Engineering"] 
      },
      { 
        name: "Conner Brown", 
        title: "Advisory — GTM Strategy and Technical Operations", 
        headshot: "/images/connorbrown.jpg",
        tags: ["GTM", "Ops"] 
      },
      { 
        name: "Memme Onwudiwe", 
        title: "Advisory — Legal & Strategic Partnerships", 
        headshot: "/images/memme.webp",
        tags: ["Legal", "Partnerships"] 
      },
    ],
    proofLine: "100+ years combined across technology, strategy, law, and GTM.",
  };

  // Custom hook for reveal animations
  const useReveal = (threshold = 0.2) => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [visible, setVisible] = useState(false);
    useEffect(() => {
      const el = ref.current;
      if (!el) return;
      const io = new IntersectionObserver(([e]) => e.isIntersecting && setVisible(true), { threshold });
      io.observe(el);
      return () => io.disconnect();
    }, [threshold]);
    return { ref, visible };
  };

  // Check for reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);
    
    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    let i = 0;
    const id = setInterval(() => {
      setDisplayText(fullText.slice(0, i + 1));
      i++;
      if (i >= fullText.length) clearInterval(id);
    }, 50); // Faster typing speed
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const cursorTimer = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);

    return () => clearInterval(cursorTimer);
  }, []);

  // Vertical rails scroll-based animation
  useEffect(() => {
    const leftRail = document.querySelector('[data-anim="left-rail"]') as HTMLElement | null;
    const rightRail = document.querySelector('[data-anim="right-rail"]') as HTMLElement | null;
    const capLine = document.querySelector('[data-anim="cap-line"]') as HTMLElement | null;
    const section = document.querySelector('[data-section="how-it-works"]') as HTMLElement | null;

    if (!leftRail || !rightRail || !capLine || !section) return;

    // Smooth transitions
    const railTransition = 'transform 0.45s cubic-bezier(0.25,1,0.5,1), opacity 0.3s ease';
    leftRail.style.transition = railTransition;
    rightRail.style.transition = railTransition;

    // Cap transitions
    capLine.style.transition = 'transform 420ms cubic-bezier(0.2,0.9,0.2,1), opacity 180ms ease';

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

    let pinnedVisible = false; // once true, don't hide on scroll up

    const onScroll = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Section progress (0 → 1 while traversing the section)
      const start = vh * 0.2;       // when top is 20% from top of viewport
      const end = rect.height + vh * 0.6; // allows rails to finish just before bottom
      const raw = (start - rect.top) / end;
      const progress = clamp01(raw);
      const easedRail = easeOutCubic(progress);

      // Rails: grow from TOP (you already set transformOrigin:"top")
      leftRail.style.transform = `scaleY(${easedRail})`;
      rightRail.style.transform = `scaleY(${easedRail})`;
      const railVisible = progress > 0.08;
      leftRail.style.opacity = railVisible ? '1' : '0';
      rightRail.style.opacity = railVisible ? '1' : '0';

      // Cap: 2-way loading bar that grows from center as user scrolls through section
      // Start growing when section is 20% visible, finish when section bottom hits viewport
      const CAP_START_PROGRESS = 0.2;  // Start cap animation when section is 20% visible
      const capProgress = Math.max(0, (progress - CAP_START_PROGRESS) / (1 - CAP_START_PROGRESS));
      const easedCap = easeOutCubic(capProgress);

      // 2-way loading bar effect: scale from center outward
      capLine.style.transform = `scaleX(${easedCap})`;
      capLine.style.opacity = capProgress > 0.05 ? '1' : '0';

      // Pin rails once visible
      if (!pinnedVisible && progress > 0.08) {
        pinnedVisible = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Scroll-based fill effect for Section 2
  useEffect(() => {
    const handleScroll = () => {
      if (!section2Ref) return;

      const section2Rect = section2Ref.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // C_sec = vertical center of Section 2
      const sectionCenter = section2Rect.top + section2Rect.height / 2;
      // C_vp = vertical center of the viewport
      const viewportCenter = viewportHeight / 2;
      // H_sec = Section 2 height
      const sectionHeight = section2Rect.height;
      
      // Distance between section center and viewport center
      const distance = sectionCenter - viewportCenter;
      
      // Start when section center is H_sec/2 below viewport center
      const startDistance = sectionHeight / 2;
      // End when section center coincides with viewport center
      const endDistance = 0;
      
      // Map distance linearly from startDistance → endDistance into 1 → 0
      const rawProgress = (startDistance - distance) / (startDistance - endDistance);
      const clampedProgress = Math.max(0, Math.min(1, rawProgress));
      
      setFillProgress(clampedProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [section2Ref]);

  // Proof section cap line animation
  useEffect(() => {
    const section = document.querySelector('[data-section="proof"]') as HTMLElement | null;
    const cap = document.querySelector('[data-anim="proof-cap"]') as HTMLElement | null;
    if (!section || !cap) return;

    const clamp01 = (v: number) => Math.max(0, Math.min(1, v));
    const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);

    const onScroll = () => {
      const r = section.getBoundingClientRect();
      const vh = window.innerHeight;

      // Progress of the *bottom* of the section through the viewport
      const start = vh * 0.55;                  // when bottom enters lower half
      const end = vh * 0.95;                    // just before it hits the bottom edge
      const raw = (end - (r.bottom)) / (end - start);
      const p = clamp01(raw);
      const eased = easeOut(p);

      cap.style.transform = `scaleX(${eased})`;
      cap.style.opacity = p > 0.02 ? '1' : '0';
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    requestAnimationFrame(onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);


  // Vision section animations
  useEffect(() => {
    const visionSection = visionSectionRef.current;
    if (!visionSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisionCountersVisible(true);
            
            // Start typewriter effect after counters
            setTimeout(() => {
              setVisionTextVisible(true);
              // Typewriter effect for "The Vision"
              let index = 0;
              const visionText = "The Vision";
              const typewriterInterval = setInterval(() => {
                if (index < visionText.length) {
                  setVisionTypewriterText(visionText.slice(0, index + 1));
                  index++;
                } else {
                  clearInterval(typewriterInterval);
                }
              }, 100);
            }, 1000);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(visionSection);
    return () => observer.disconnect();
  }, []);

  // Beta section animations
  useEffect(() => {
    const betaSection = betaSectionRef.current;
    if (!betaSection) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setBetaVisible(true);
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(betaSection);
    return () => observer.disconnect();
  }, []);

  // Easing functions
  const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
  const smoothstep = (edge0: number, edge1: number, x: number) => {
    const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
    return t * t * (3 - 2 * t);
  };

  // Calculate fill and text color values
  const fillScale = easeOutCubic(fillProgress);
  const headingMix = smoothstep(0.10, 0.50, fillProgress);
  const bodyMix = smoothstep(0.15, 0.85, fillProgress);

  // Personas data model
  const personas = [
    {
      id: 'agencies' as const,
      title: 'Agencies',
      promise: 'Cut Review Time',
      body: 'Accelerate NEPA reviews with explainable reasoning, cross-agency mapping, and citation validation.',
      bullets: [
        'Draft EA scaffolds with live citation checks',
        'Cross-regulation triggers in one view',
        'Immutable audit trail for every change'
      ],
      stat: { value: '85–95%', label: 'drafting time saved' },
      receipt: { before: '6–12 months', after: '2–4 weeks' }
    },
    {
      id: 'consulting' as const,
      title: 'Consulting Firms',
      promise: 'Billable Output, Not Busywork',
      body: 'Replace repetition with defensible automation and precedent-aware drafting.',
      bullets: [
        'Precedent insert in one click',
        'Gap scans across citations',
        'Client-ready exports'
      ],
      stat: { value: '95%', label: 'citations with provenance' },
      receipt: { before: 'manual QA', after: 'auto-flagged' }
    },
    {
      id: 'sustainability' as const,
      title: 'Sustainability Teams',
      promise: 'Permit Confidence',
      body: 'Manage permits and ESG outputs with machine-checked rulepacks and exportable matrices.',
      bullets: [
        'Zero-to-matrix in under 60s',
        'Versioned obligations map',
        'Instant audit-ready exports'
      ],
      stat: { value: '↓70%', label: 'manual checklist work' },
      receipt: { before: 'days', after: 'minutes' }
    },
    {
      id: 'researchers' as const,
      title: 'Researchers',
      promise: 'Machine-Literate Law',
      body: 'Author and test rulepacks across NEPA, CWA, ESA, NHPA with traceable logic maps.',
      bullets: [
        'Rulepack authoring tools',
        'Interpretable dependency graphs',
        'Reproducible benchmarks'
      ],
      stat: { value: '4+', label: 'frameworks supported' },
      receipt: { before: 'ad-hoc', after: 'structured' }
    }
  ];

  const currentPersona = personas.find(p => p.id === activePersona);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // Form submitted
    }
  };

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <OpefNavbar />
      
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white/5" />
        <div className="absolute bottom-0 left-0 w-72 h-72 border border-white/5" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 border border-white/5 rotate-45" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">

          <section className="relative overflow-hidden bg-black text-white mb-48">
            {/* soft olive wash + faint grid */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0"
              style={{
                background:
                  "radial-gradient(120% 80% at 0% 0%, rgba(151,179,77,0.12), transparent 55%)"
              }}
            />
            <svg
              aria-hidden
              className="absolute inset-0 opacity-[0.06]"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M10 0H0V10" stroke="#97B34D" strokeWidth="0.15" fill="none" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#g)" />
            </svg>

            <div className="relative z-10 max-w-8xl mx-auto px-8 py-12">
              {/* Two-column layout: Text on left, Globe on right */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                
                {/* Left Column - Text Content */}
                <div className="space-y-8 lg:pr-8">
                  {/* Pill */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0, duration: 0.2, ease: "easeOut" }}
                    className="inline-flex items-center gap-2 mb-8 px-3 py-1 border border-white/15 bg-white/5 text-[11px] md:text-xs font-mono tracking-widest uppercase"
                  >
                    <span className="inline-block w-2 h-2 rounded-full bg-[#97B34D]" />
                    OPEF — Machine-Literate Governance
                  </motion.div>

                  {/* Headline */}
                  <h1 className="text-5xl md:text-7xl font-black leading-[0.85] tracking-tighter">
                    <span className="inline-block" style={{ minWidth: '100%' }}>
                      <span className="inline-block min-h-[1.2em]">
                        {displayText}
                        <span
                          className={`inline-block w-1 h-16 bg-white ml-2 transition-opacity ${
                            showCursor ? "opacity-100" : "opacity-0"
                          }`}
                        />
                      </span>
                    </span>
                  </h1>

                  {/* Description */}
                  <motion.div
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.03, duration: 0.2, ease: "easeOut" }}
                    className="space-y-6"
                  >
                    <div className="relative">
                      <div className="absolute -left-4 top-1 bottom-1 w-px bg-white/15" />
                      <div className="absolute -left-4 top-1 w-1.5 h-1.5 rounded-[2px] bg-[#97B34D]" />
                      <p className="text-base leading-relaxed font-light text-white/80">
                        OPEF transforms environmental compliance from a consulting bottleneck into an AI-driven system.
                      </p>
                    </div>

                    <div className="relative">
                      <div className="absolute -left-4 top-1 bottom-1 w-px bg-white/15" />
                      <div className="absolute -left-4 top-1 w-1.5 h-1.5 rounded-[2px] bg-[#97B34D]" />
                      <p className="text-base leading-relaxed font-light text-white/80">
                        Built for agencies and contractors modernizing under the OMB M-25-21 federal AI mandate.
                        <br />
                        <span className="inline-block mt-2">
                          ↳ From rulebooks to audit-ready drafts — <em>in hours, not years.</em>
                        </span>
                      </p>
                    </div>
                  </motion.div>

                  {/* subtle bottom olive rail to suggest continuation */}
                  <motion.div
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={{ scaleX: 1, opacity: 1 }}
                    transition={{ delay: 0.05, duration: 0.3, ease: [0.25, 1, 0.5, 1] }}
                    className="h-[2px] w-40 md:w-56 bg-gradient-to-r from-[#97B34D] to-transparent origin-left"
                  />
                </div>

                {/* Right Column - Globe */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.05, duration: 0.3, ease: "easeOut" }}
                  className="flex justify-center lg:justify-end lg:pl-8 lg:pr-12"
                >
                  <div className="w-full max-w-xl lg:max-w-2xl">
                    <RotatingEarth 
                      width={494} 
                      height={494} 
                      className="opacity-90 hover:opacity-100 transition-opacity duration-300" 
                    />
                  </div>
                </motion.div>
              </div>
          </div>
        </section>
        </div>

        <section 
          id="platform"
          ref={setSection2Ref}
          className="bg-white text-[#2d3a2e] py-24 mb-0 relative overflow-hidden"
          style={{
            '--fill-progress': fillProgress,
            '--heading-mix': headingMix,
            '--body-mix': bodyMix,
          } as React.CSSProperties}
        >
          {/* Olive fill layer */}
          <div 
            className={`absolute inset-0 pointer-events-none ${
              prefersReducedMotion ? 'transition-opacity duration-300' : ''
            }`}
            style={{
              background: prefersReducedMotion 
                ? `linear-gradient(to bottom, var(--olive-fill) 0%, var(--olive-dark) 100%)`
                : `linear-gradient(to bottom, var(--olive-fill) 0%, var(--olive-dark) 100%)`,
              transform: prefersReducedMotion 
                ? 'none'
                : `scaleX(${fillScale})`,
              transformOrigin: 'left center',
              opacity: prefersReducedMotion ? fillProgress : 1,
            }}
          >
            {/* Hairline highlight at leading edge */}
            {!prefersReducedMotion && (
              <div 
                className="absolute top-0 bottom-0 w-px bg-white/16"
                style={{
                  left: `${fillScale * 100}%`,
                  transform: 'translateX(-1px)',
                }}
              />
            )}
          </div>

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* System frame (olive hairlines, no heavy box) */}
            <div
              className="relative rounded-[18px] p-8 md:p-14"
              style={{
                border: '1px solid rgba(45,58,46,0.12)',
                boxShadow:
                  'inset 0 0 0 1px rgba(151,179,77,0.18), 0 12px 40px rgba(0,0,0,0.05)',
                background:
                  'linear-gradient(180deg, rgba(255,255,255,0.02), rgba(255,255,255,0) 70%)'
              }}
            >
              {/* system chips */}
              <div className="flex flex-wrap gap-2 mb-6">
                {['NEPA','CWA','ESA','NHPA'].map(tag => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono tracking-[0.18em] uppercase px-2 py-1 border rounded-sm"
                    style={{
                      color: 'rgba(45,58,46,0.76)',
                      borderColor: 'rgba(45,58,46,0.18)',
                      background: 'rgba(255,255,255,0.35)'
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* header grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-14">
                <div className="md:col-span-7">
                  <h2
                    className="text-[44px] md:text-[72px] font-black leading-[0.9] tracking-tight"
                    style={{
                      color: prefersReducedMotion 
                        ? fillProgress > 0.5 ? 'var(--ink-invert)' : 'var(--ink-base)'
                        : `color-mix(in srgb, var(--ink-base) ${(1 - headingMix) * 100}%, var(--ink-invert) ${headingMix * 100}%)`
                    }}
                  >
                    The Platform
                  </h2>
                  
                  <div className="mt-6 pl-6 border-l border-[#2d3a2e]/20">
                    <h3 
                      className="text-xl md:text-2xl font-mono tracking-tight"
                      style={{
                        color: prefersReducedMotion 
                          ? fillProgress > 0.5 ? 'var(--ink-invert)' : 'var(--ink-base)'
                          : `color-mix(in srgb, var(--ink-base) ${(1 - headingMix) * 100}%, var(--ink-invert) ${headingMix * 100}%)`
                      }}
                    >
                      Turning regulations into code.
                    </h3>
                    <p 
                      className="mt-3 leading-relaxed"
                      style={{
                        color: prefersReducedMotion 
                          ? fillProgress > 0.5 ? 'var(--ink-invert-body)' : 'var(--ink-base-body)'
                          : `color-mix(in srgb, var(--ink-base-body) ${(1 - bodyMix) * 100}%, var(--ink-invert-body) ${bodyMix * 100}%)`
                      }}
                    >
                      OPEF converts NEPA, CWA, ESA, and NHPA procedures into structured "rulepacks"—
                      machine-readable frameworks that enable explainable reasoning and defensible automation.
              </p>
            </div>
            </div>

                <div className="md:col-span-5">
                  {/* Rulepack Anatomy */}
                  <div className="mt-6 md:mt-0 md:ml-auto max-w-md rounded-xl border border-[#2d3a2e]/15 bg-white/75 backdrop-blur-sm">
                    <div className="px-5 py-3 text-[10px] font-mono tracking-widest uppercase text-[#2d3a2e]/60 border-b border-[#2d3a2e]/10">
                      Rulepack · Anatomy
              </div>
                    <div className="p-5 font-mono text-[12px] leading-relaxed text-[#2d3a2e]">
                      <div className="grid grid-cols-3 gap-y-3">
                        <div className="col-span-1 text-[#2d3a2e]/60">id</div>
                        <div className="col-span-2">nepa.eis.v1</div>

                        <div className="col-span-1 text-[#2d3a2e]/60">source</div>
                        <div className="col-span-2">40 CFR §1500–1508</div>

                        <div className="col-span-1 text-[#2d3a2e]/60">deps</div>
                        <div className="col-span-2">cwa.404, esa.7, nhpa.106</div>

                        <div className="col-span-1 text-[#2d3a2e]/60">thresholds</div>
                        <div className="col-span-2">significance, alternatives, mitigation</div>

                        <div className="col-span-1 text-[#2d3a2e]/60">exceptions</div>
                        <div className="col-span-2">categorical exclusions, emergency</div>

                        <div className="col-span-1 text-[#2d3a2e]/60">citations[]</div>
                        <div className="col-span-2">passage-level, versioned, hash-sealed</div>
              </div>

                      <div className="mt-4 pt-4 border-t border-[#2d3a2e]/10 flex items-center justify-between">
                        <span className="text-[10px] uppercase tracking-widest text-[#2d3a2e]/60">Validation</span>
                        <span className="inline-flex items-center gap-2 text-[11px]">
                          <span className="inline-block w-2 h-2 rounded-full bg-[#97B34D] shadow-[0_0_10px_rgba(151,179,77,0.5)]" />
                          Ready for Drafting
                        </span>
              </div>
            </div>
          </div>
                </div>
              </div>

              {/* capabilities list */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  { icon: CircuitBoard, title: 'Ingestion Engine', blurb: 'OCR → hierarchical JSON with section lineage.' },
                  { icon: FileText, title: 'Rulepack Library', blurb: 'Versioned logic graphs with embedded citations.' },
                  { icon: ShieldCheck, title: 'Audit Exporter', blurb: 'Immutable log + evidence bundle for review.' }
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-6 backdrop-blur-sm"
                    style={{
                      borderColor: 'rgba(45,58,46,0.16)',
                      background: 'rgba(255,255,255,0.45)'
                    }}
                  >
                    <item.icon className="w-5 h-5 mb-3" />
                    <div className="text-lg font-semibold text-[#2d3a2e]">{item.title}</div>
                    <div className="text-sm mt-2 text-[#2d3a2e]/75">{item.blurb}</div>
              </div>
                ))}
              </div>

              {/* Pipeline Checkpoints */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { stage: 'Parse', status: 'Complete', detail: '394 sections ingested' },
                  { stage: 'Validate', status: 'Complete', detail: 'CFR citations verified' },
                  { stage: 'Deploy', status: 'Ready', detail: 'Rulepack v1.0 active' }
                ].map((checkpoint, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-3 p-4 rounded-lg border"
                    style={{
                      borderColor: 'rgba(45,58,46,0.16)',
                      background: 'rgba(255,255,255,0.35)'
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{
                          backgroundColor: checkpoint.status === 'Complete' ? '#97B34D' : '#A8B97B',
                          boxShadow: checkpoint.status === 'Complete' ? '0 0 8px rgba(151,179,77,0.4)' : 'none'
                        }}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold text-[#2d3a2e]">{checkpoint.stage}</div>
                      <div className="text-xs text-[#2d3a2e]/70">{checkpoint.detail}</div>
                    </div>
                    <div className="text-xs font-mono text-[#2d3a2e]/60 uppercase tracking-wider">
                      {checkpoint.status}
                    </div>
                  </div>
                ))}
              </div>

              {/* tiny reassurance line */}
              <div className="mt-6 flex items-center gap-2 text-xs font-mono text-[#2d3a2e]/60">
                <CheckCircle2 className="w-4 h-4" />
                Explainable by design • Provenance-first outputs
              </div>
            </div>

            {/* Animated hairline at bottom */}
            <div
              className="absolute left-0 right-0 bottom-0 h-[2px]"
              style={{
                background: `linear-gradient(90deg, rgba(151,179,77,0.0) 0%, rgba(151,179,77,0.9) 50%, rgba(151,179,77,0.0) 100%)`,
                transform: `scaleX(${Math.max(0, Math.min(1, fillProgress))})`,
                transformOrigin: 'left center',
                opacity: prefersReducedMotion ? fillProgress : 1,
                transition: 'transform 80ms linear',
              }}
            />
          </div>
        </section>

        <section 
          id="features"
          className="text-white py-32 md:py-48 relative"
          style={{
            background: `
              radial-gradient(ellipse at top left, rgba(151,179,77,0.08), transparent 70%),
              #000000
            `
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="border-l-4 border-[#97B34D] pl-6 mb-16">
              <h2 className="text-6xl md:text-8xl font-black tracking-tight leading-[0.85]">Features</h2>
              <h3 className="text-xl font-mono text-white/60 mt-4 uppercase">Automation that passes audits.</h3>
              </div>

            {/* Card Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              {/* Hero Card - Full Width */}
              <div className="lg:col-span-2">
                <div className="bg-[#0d0d0d] border border-white/10 p-12 hover:border-[#97B34D]/60 hover:shadow-[0_0_20px_rgba(151,179,77,0.15)] hover:-translate-y-1 transition-all duration-200">
                  <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block mb-4 tracking-widest">
                    01
              </div>
                  <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 hover:text-[#97B34D] transition-colors duration-150">
                    Accelerated Reviews
                  </h3>
                  <p className="font-mono text-[#97B34D]/80 text-sm mb-4">85–95% faster drafting</p>
                  <p className="text-sm text-white/70 leading-relaxed mb-6">
                    AI-assisted analysis and statutory mapping for rapid reviews across multiple agencies with real-time citation validation.
                  </p>
                  <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-xs text-white/50 font-mono">
                    <span>85–95%</span>
                    <span>Drafting Time Saved</span>
                  </div>
                </div>
            </div>

              {/* Two Equal Cards */}
              <div className="bg-[#0d0d0d] border border-white/10 p-8 hover:border-[#97B34D]/60 hover:shadow-[0_0_20px_rgba(151,179,77,0.15)] hover:-translate-y-1 transition-all duration-500">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block mb-4 tracking-widest">
                  02
              </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 hover:text-[#97B34D] transition-colors duration-300">
                  Transparent Reasoning
                </h3>
                <p className="font-mono text-[#97B34D]/80 text-sm mb-4">95% provenance</p>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Every output linked to statute and precedent with audit-ready trails and full citation mapping.
                </p>
                <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-xs text-white/50 font-mono">
                  <span>95%</span>
                  <span>Cited Passages with Provenance</span>
              </div>
              </div>
              
              <div className="bg-[#0d0d0d] border border-white/10 p-8 hover:border-[#97B34D]/60 hover:shadow-[0_0_20px_rgba(151,179,77,0.15)] hover:-translate-y-1 transition-all duration-500">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block mb-4 tracking-widest">
                  03
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-2 hover:text-[#97B34D] transition-colors duration-300">
                  Human Oversight
                </h3>
                <p className="font-mono text-[#97B34D]/80 text-sm mb-4">10k+ comments / 2h</p>
                <p className="text-sm text-white/70 leading-relaxed mb-6">
                  Experts stay in control while AI handles volume and repetition with intelligent workflow automation.
                </p>
                <div className="mt-6 border-t border-white/10 pt-3 flex items-center justify-between text-xs text-white/50 font-mono">
                  <span>10k+</span>
                  <span>Comments Processed in 2 Hours</span>
              </div>
              </div>
            </div>
          </div>
        </section>

        <WhyItMatters />

        <section 
          id="who-its-for"
          className="bg-white text-[#2d3a2e] py-28 md:py-40 relative"
          style={{ 
            backgroundImage: 'radial-gradient(120% 80% at 0% 0%, rgba(151,179,77,0.06), transparent 60%)' 
          }}
        >
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="border-l-4 border-[#97B34D] pl-6 mb-10 md:mb-14">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-[#2d3a2e]">Who It's For</h2>
              <h3 className="text-base md:text-lg font-mono text-[#2d3a2e]/60 mt-3">Built for the Builders of Policy.</h3>
                  </div>

            {/* Persona Pills */}
            <div className="mb-4">
              <p className="font-mono text-xs text-[#2d3a2e]/50 mb-2 tracking-widest uppercase">
                Hover to explore all four roles →
              </p>
                  </div>
            
            <div className="flex flex-wrap gap-3 md:gap-4 mb-10 md:mb-12">
              {personas.map((persona) => (
                <button
                  key={persona.id}
                  onMouseEnter={() => setActivePersona(persona.id)}
                  className={`text-xs md:text-sm font-mono uppercase tracking-wider px-3.5 py-2 rounded-full border transition-all focus:outline-none focus:ring-2 focus:ring-[#97B34D] focus:ring-offset-2 ${
                    activePersona === persona.id
                      ? 'bg-[#97B34D] border-[#97B34D] text-white'
                      : 'border-[#2d3a2e]/20 text-[#2d3a2e]/70 hover:border-[#2d3a2e]/40 hover:text-[#2d3a2e]'
                  }`}
                  aria-pressed={activePersona === persona.id}
                >
                  {persona.title}
                </button>
              ))}
                </div>

            {/* Main Panel */}
            {currentPersona && (
              <div 
                key={activePersona}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 transition-all duration-200 opacity-100 translate-y-0"
              >
                {/* Left Content Area */}
                <div className="lg:col-span-8">
                  <div className="border border-[#2d3a2e]/15 rounded-2xl p-8 md:p-10 bg-white/80 backdrop-blur-sm">
                    <h3 className="text-3xl md:text-4xl font-bold tracking-tight text-[#2d3a2e]">
                      {currentPersona.title}
                    </h3>
                    <p className="mt-2 font-mono text-[#6E8D25] text-xs md:text-sm tracking-wider uppercase">
                      {currentPersona.promise}
                    </p>
                    <p className="mt-5 text-base md:text-lg text-[#2d3a2e]/80 leading-relaxed">
                      {currentPersona.body}
                    </p>
                    
                    {/* Bullets */}
                    <div className="mt-6 space-y-3">
                      {currentPersona.bullets.map((bullet, index) => (
                        <div key={index} className="flex items-start gap-3 text-sm md:text-base text-[#2d3a2e]/80">
                          <span className="mt-2 inline-block w-1.5 h-1.5 bg-[#97B34D] rounded-[2px]" />
                          <span>{bullet}</span>
                  </div>
                      ))}
                  </div>
                </div>
              </div>

                {/* Right Stats Area */}
                <div className="lg:col-span-4">
                  <div className="border border-[#2d3a2e]/15 rounded-2xl p-6 md:p-8 bg-white/60">
                    {/* Big Stat */}
                    <div className="text-5xl md:text-6xl font-black tracking-tight text-[#2d3a2e]">
                      {currentPersona.stat.value}
            </div>
                    <div className="font-mono text-xs md:text-sm text-[#2d3a2e]/60 mt-1">
                      {currentPersona.stat.label}
              </div>
                    
                    {/* Divider */}
                    <div className="my-6 border-t border-[#2d3a2e]/15"></div>
                    
                    {/* Receipt */}
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-xs md:text-sm font-mono">
                        <span className="text-[#2d3a2e]/60">Before:</span>
                        <span className="text-[#2d3a2e]">{currentPersona.receipt.before}</span>
              </div>
                      <div className="flex items-center justify-between text-xs md:text-sm font-mono">
                        <span className="text-[#2d3a2e]/60">After:</span>
                        <span className="text-[#2d3a2e]">{currentPersona.receipt.after}</span>
            </div>
          </div>
                    
                    {/* Optional CTA */}
                    <div className="mt-6">
                      <button className="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-[#2d3a2e] underline underline-offset-4 hover:text-[#6E8D25] transition-colors duration-100">
                        Learn more →
                      </button>
                  </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Editorial Divider — Marquee Strip */}
        <section
          aria-label="Section Divider"
          className="relative py-8 md:py-12 bg-white overflow-visible"
        >
          {/* Marquee Container */}
          <div className="relative">
            {/* Top Border */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#6B7E45]/30 to-transparent"></div>
            
            {/* Marquee Text */}
            <div className="py-6 md:py-8 overflow-hidden">
              <div className="flex animate-marquee whitespace-nowrap">
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-600 uppercase mr-24">
                  BUILT FOR BUILDERS &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; TESTED BY POLICY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; AUDIT-READY BY DESIGN &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE-LITERATE GOVERNANCE &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; DEFENSIBLE BY DEFAULT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM INSIGHT TO IMPLEMENTATION &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; HUMAN OVERSIGHT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; STRUCTURE BEFORE SPEED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; EXPLAINABILITY BEFORE OUTPUT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OPEF V0.9 &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; NEPA/CWA/ESA/NHPA &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OMB M-25-21 ALIGNED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM USE-CASE TO SYSTEM &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM TEXT TO TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-600 uppercase mr-24">
                  BUILT FOR BUILDERS &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; TESTED BY POLICY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; AUDIT-READY BY DESIGN &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE-LITERATE GOVERNANCE &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; DEFENSIBLE BY DEFAULT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM INSIGHT TO IMPLEMENTATION &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; HUMAN OVERSIGHT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; STRUCTURE BEFORE SPEED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; EXPLAINABILITY BEFORE OUTPUT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OPEF V0.9 &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; NEPA/CWA/ESA/NHPA &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OMB M-25-21 ALIGNED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM USE-CASE TO SYSTEM &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM TEXT TO TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                <span className="text-[10px] md:text-xs font-mono tracking-[0.2em] text-neutral-600 uppercase">
                  BUILT FOR BUILDERS &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; TESTED BY POLICY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; AUDIT-READY BY DESIGN &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE-LITERATE GOVERNANCE &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; DEFENSIBLE BY DEFAULT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM INSIGHT TO IMPLEMENTATION &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; HUMAN OVERSIGHT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; MACHINE TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; STRUCTURE BEFORE SPEED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; EXPLAINABILITY BEFORE OUTPUT &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OPEF V0.9 &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; NEPA/CWA/ESA/NHPA &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; OMB M-25-21 ALIGNED &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM USE-CASE TO SYSTEM &nbsp;&nbsp;&nbsp;&nbsp; <span className="text-[14px] md:text-[16px]">●</span> &nbsp;&nbsp;&nbsp;&nbsp; FROM TEXT TO TRACEABILITY &nbsp;&nbsp;&nbsp;&nbsp;
                </span>
                </div>
              </div>
            
            {/* Bottom Border */}
            <div className="h-px bg-gradient-to-r from-transparent via-[#6B7E45]/30 to-transparent"></div>
                </div>
        </section>

        <section 
          id="how-it-works"
          className="bg-white text-[#2d3a2e] py-28 md:py-40 relative"
          style={{ 
            backgroundImage: 'radial-gradient(120% 80% at 0% 0%, rgba(151,179,77,0.03), transparent 60%)' 
          }}
          data-section="how-it-works"
        >
          {/* Vertical Rails - Left and Right */}
          <div
            className="hidden md:block pointer-events-none absolute left-[60px] top-0 bottom-0 w-[8px] bg-[#97B34D] opacity-0 z-30 origin-top will-change-transform"
            data-anim="left-rail"
            style={{ transform: 'scaleY(0)', boxShadow: '0 0 20px rgba(151,179,77,0.32)' }}
          />
          <div
            className="hidden md:block pointer-events-none absolute right-[60px] top-0 bottom-0 w-[8px] bg-[#97B34D] opacity-0 z-30 origin-top will-change-transform"
            data-anim="right-rail"
            style={{ transform: 'scaleY(0)', boxShadow: '0 0 20px rgba(151,179,77,0.32)' }}
          />

          {/* Bottom Cap — grows from center to meet rails */}
          <div
            className="hidden md:block absolute bottom-0 left-[60px] right-[60px] h-[8px] rounded-full opacity-0 z-40 pointer-events-none will-change-transform"
            data-anim="cap-line"
            style={{
              transform: 'scaleX(0)',
              transformOrigin: 'center',
              backgroundColor: '#97B34D',
              boxShadow: '0 0 24px rgba(151,179,77,0.28), inset 0 0 2px rgba(151,179,77,0.6)'
            }}
          />
          
          <div className="max-w-6xl mx-auto px-6">
            {/* Section Header */}
            <div className="border-l-4 border-[#97B34D] pl-6 mb-12">
              <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-[#2d3a2e]">How It Works</h2>
              <h3 className="text-base md:text-lg font-mono text-[#2d3a2e]/60 mt-3">From PDF to Proof — AI automation that passes audits.</h3>
              </div>

            {/* Flow Diagram */}
            <div className="relative flex flex-col md:flex-row items-start justify-between gap-10 mb-14">
              {/* Desktop Flow — upgraded */}
              <div className="hidden md:block w-full rounded-2xl overflow-hidden relative">
                {/* techy background */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(120% 80% at 0% 0%, rgba(151,179,77,0.08), transparent 60%), radial-gradient(80% 60% at 100% 0%, rgba(151,179,77,0.05), transparent 50%)",
                  }}
                />
                {/* faint grid */}
                <svg className="absolute inset-0 opacity-[0.06]" viewBox="0 0 100 100" preserveAspectRatio="none">
                  <defs>
                    <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                      <path d="M 10 0 L 0 0 0 10" fill="none" stroke="#2d3a2e" strokeWidth="0.2" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* diagram */}
                <svg viewBox="0 0 920 360" className="relative w-full h-auto">
                  <defs>
                    {/* olive gradient for strokes */}
                    <linearGradient id="oliveStroke" x1="0" y1="0" x2="1" y2="0">
                      <stop offset="0%" stopColor="#97B34D" stopOpacity="0.9" />
                      <stop offset="100%" stopColor="#6E8D25" stopOpacity="0.9" />
                    </linearGradient>

                    {/* soft node glow */}
                    <filter id="nodeGlow" x="-50%" y="-50%" width="200%" height="200%">
                      <feDropShadow dx="0" dy="1" stdDeviation="6" floodColor="#97B34D" floodOpacity="0.15" />
                    </filter>

                    {/* arrowheads */}
                    <marker id="arrow" viewBox="0 0 10 10" refX="10" refY="5" markerWidth="8" markerHeight="8" orient="auto-start-reverse">
                      <path d="M 0 0 L 10 5 L 0 10 z" fill="#7f9f39" />
                    </marker>
                  </defs>

                  {/* === NODES (rendered first so paths appear on top) === */}
                  {/* Input */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="90" y="145" width="140" height="70" rx="14"
                      fill="rgba(45,58,46,0.05)" stroke="#2d3a2e" strokeWidth="1.2" />
                    <text x="160" y="173" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">PDF / DOCX</text>
                    <text x="160" y="190" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]/70">Input</text>
                  </g>

                  {/* Parsing */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="260" y="145" width="140" height="70" rx="14"
                      fill="rgba(151,179,77,0.10)" stroke="#97B34D" strokeWidth="1.2" />
                    <text x="330" y="172" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">Parsing + NLP</text>
                    <text x="330" y="189" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]/75">Engine</text>
                  </g>

                  {/* Rulepack */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="430" y="145" width="140" height="70" rx="14"
                      fill="rgba(151,179,77,0.15)" stroke="#97B34D" strokeWidth="1.6" />
                    <text x="500" y="172" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">Rulepack</text>
                    <text x="500" y="189" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]">Library</text>
                  </g>

                  {/* Critique Agent */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="580" y="90" width="140" height="70" rx="14"
                      fill="rgba(151,179,77,0.10)" stroke="#97B34D" strokeWidth="1.2" />
                    <text x="650" y="117" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">Compliance</text>
                    <text x="650" y="134" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]/80">Critique Agent</text>
                  </g>

                  {/* Scaffold Agent */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="580" y="230" width="140" height="70" rx="14"
                      fill="rgba(151,179,77,0.10)" stroke="#97B34D" strokeWidth="1.2" />
                    <text x="650" y="257" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">Scaffold</text>
                    <text x="650" y="274" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]/80">Generator Agent</text>
                  </g>

                  {/* Audit */}
                  <g filter="url(#nodeGlow)" className="group">
                    <rect x="760" y="150" width="140" height="70" rx="14"
                      fill="rgba(45,58,46,0.08)" stroke="#2d3a2e" strokeWidth="1.6" />
                    <text x="830" y="176" textAnchor="middle" className="font-mono text-[12px] fill-[#2d3a2e]">Audit Log &</text>
                    <text x="830" y="193" textAnchor="middle" className="font-mono text-[11px] fill-[#2d3a2e]/80">Export Package</text>
                  </g>

                  {/* === PATHS (segmented to only show between nodes) === */}
                  {/* Input -> Parsing */}
                  <path id="p-input-parsing"
                    d="M 230 180 L 260 180"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="3" markerEnd="url(#arrow)"
                    strokeDasharray="8 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.8s" repeatCount="indefinite" />
                  </path>

                  {/* Parsing -> Rulepack */}
                  <path id="p-parsing-rulepack"
                    d="M 400 180 L 430 180"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="3" markerEnd="url(#arrow)"
                    strokeDasharray="8 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-18" dur="0.8s" repeatCount="indefinite" />
                  </path>

                  {/* Rulepack -> Audit (main path) */}
                  <path id="p-rulepack-audit"
                    d="M 570 180 C 620 180, 680 180, 730 180"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="3" markerEnd="url(#arrow)"
                    strokeDasharray="8 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-36" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  {/* Rulepack -> Critique (branch up) */}
                  <path id="p-up"
                    d="M 500 145 C 520 120, 550 100, 580 125"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="6 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  {/* Rulepack -> Scaffold (branch down) */}
                  <path id="p-down"
                    d="M 500 215 C 520 240, 550 260, 580 235"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="6 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-32" dur="1.2s" repeatCount="indefinite" />
                  </path>

                  {/* Critique -> Audit */}
                  <path id="p-crit-audit"
                    d="M 720 125 C 740 140, 750 155, 760 170"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="6 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.0s" repeatCount="indefinite" />
                  </path>

                  {/* Scaffold -> Audit */}
                  <path id="p-scaf-audit"
                    d="M 720 235 C 740 220, 750 205, 760 190"
                    fill="none" stroke="url(#oliveStroke)" strokeWidth="2" markerEnd="url(#arrow)" strokeDasharray="6 10">
                    <animate attributeName="stroke-dashoffset" from="0" to="-24" dur="1.0s" repeatCount="indefinite" />
                  </path>

                  {/* === FLOW PACKETS (circles following the paths) === */}
                  <g className="motion-safe:opacity-100 motion-reduce:opacity-0">
                    {/* Main flow packets */}
                    <circle r="5" fill="#97B34D">
                      <animateMotion dur="2.4s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-input-parsing" />
                      </animateMotion>
                    </circle>
                    <circle r="5" fill="#97B34D">
                      <animateMotion dur="2.4s" begin="0.8s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-parsing-rulepack" />
                      </animateMotion>
                    </circle>
                    <circle r="5" fill="#97B34D">
                      <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-rulepack-audit" />
                      </animateMotion>
                    </circle>
                    
                    {/* Branch packets */}
                    <circle r="4" fill="#A6C45A">
                      <animateMotion dur="2.4s" begin="1.6s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-up" />
                      </animateMotion>
                    </circle>
                    <circle r="4" fill="#A6C45A">
                      <animateMotion dur="2.4s" begin="2.0s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-down" />
                      </animateMotion>
                    </circle>
                    
                    {/* Join packets */}
                    <circle r="3.5" fill="#8CAB3D">
                      <animateMotion dur="2.0s" begin="2.8s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-crit-audit" />
                      </animateMotion>
                    </circle>
                    <circle r="3.5" fill="#8CAB3D">
                      <animateMotion dur="2.0s" begin="3.2s" repeatCount="indefinite">
                        <mpath xlinkHref="#p-scaf-audit" />
                      </animateMotion>
                    </circle>
                  </g>
                </svg>
                </div>

              {/* Mobile Flow */}
              <div className="md:hidden w-full space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#97B34D] rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#97B34D] to-transparent"></div>
              </div>
                <div className="bg-white/80 border border-[#2d3a2e]/15 rounded-xl p-4">
                  <div className="text-sm font-mono text-[#2d3a2e]">PDF / DOCX Input</div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#97B34D] rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#97B34D] to-transparent"></div>
              </div>
                <div className="bg-white/80 border border-[#97B34D]/30 rounded-xl p-4">
                  <div className="text-sm font-mono text-[#2d3a2e]">Parsing + NLP Engine</div>
            </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#97B34D] rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#97B34D] to-transparent"></div>
            </div>
                <div className="bg-white/80 border border-[#97B34D]/40 rounded-xl p-4">
                  <div className="text-sm font-mono text-[#2d3a2e]">Rulepack Library</div>
          </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#97B34D] rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#97B34D] to-transparent"></div>
          </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-white/80 border border-[#97B34D]/30 rounded-xl p-4">
                    <div className="text-sm font-mono text-[#2d3a2e]">Compliance Critique</div>
                  </div>
                  <div className="bg-white/80 border border-[#97B34D]/30 rounded-xl p-4">
                    <div className="text-sm font-mono text-[#2d3a2e]">Scaffold Generator</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-4 h-4 bg-[#97B34D] rounded-full"></div>
                  <div className="flex-1 h-px bg-gradient-to-r from-[#97B34D] to-transparent"></div>
                </div>
                <div className="bg-white/80 border border-[#2d3a2e]/20 rounded-xl p-4">
                  <div className="text-sm font-mono text-[#2d3a2e]">Audit Log & Export Package</div>
                </div>
              </div>
            </div>

            {/* Steps Grid */}
            <div className="grid md:grid-cols-4 gap-6 mt-14">
              {/* Step 1 - Ingest */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block tracking-widest">
                  01
                </div>
                <h3 className="text-xl font-bold tracking-tight text-[#2d3a2e]">Ingest</h3>
                <p className="text-sm text-[#2d3a2e]/80 leading-relaxed">
                  PDFs/DOCX parsed through OPEF's OCR + NLP engine → hierarchical JSON rulepacks.
                </p>
                <p className="text-xs font-mono text-[#2d3a2e]/60 mt-2">
                  Turns 400-page federal manuals into structured, machine-readable "rulepacks" in seconds.
                  </p>
                </div>

              {/* Step 2 - Encode */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block tracking-widest">
                  02
              </div>
                <h3 className="text-xl font-bold tracking-tight text-[#2d3a2e]">Encode</h3>
                <p className="text-sm text-[#2d3a2e]/80 leading-relaxed">
                  Domain experts annotate exceptions, conditions, and dependencies with versioning + multi-tenancy.
                </p>
                <p className="text-xs font-mono text-[#2d3a2e]/60 mt-2">
                  Human expertise meets machine structure — policies become interactive logic maps.
                </p>
                    </div>

              {/* Step 3 - Deploy */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block tracking-widest">
                  03
                  </div>
                <h3 className="text-xl font-bold tracking-tight text-[#2d3a2e]">Deploy</h3>
                <p className="text-sm text-[#2d3a2e]/80 leading-relaxed">
                  LLM agents draft EA/EIS text via Scaffold Generator using validated rulepacks with embedded citations.
                </p>
                <p className="text-xs font-mono text-[#2d3a2e]/60 mt-2">
                  AI drafts Environmental Assessments with citations already embedded — no manual cut-paste.
                </p>
                </div>

              {/* Step 4 - Explain */}
              <div className="space-y-3">
                <div className="text-xs font-mono text-[#97B34D]/80 border border-[#97B34D]/40 px-2 py-1 inline-block tracking-widest">
                  04
                  </div>
                <h3 className="text-xl font-bold tracking-tight text-[#2d3a2e]">Explain</h3>
                <p className="text-sm text-[#2d3a2e]/80 leading-relaxed">
                  Compliance Critique Agent generates audit checklist and immutable log bundled into Exported Compliance Package.
                </p>
                <p className="text-xs font-mono text-[#2d3a2e]/60 mt-2">
                  Every paragraph is traceable. Every citation is verifiable. Every decision can be audited.
                </p>
                  </div>
                </div>

            {/* Footer Caption */}
            <div className="mt-12 text-center">
              <p className="font-mono text-xs text-[#2d3a2e]/60">
                Each step is explainable, version-controlled, and auditable.
              </p>
                  </div>

            {/* System Modules */}
            <div className="mt-16 pt-8 border-t border-[#2d3a2e]/15">
              <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
                {[
                  { name: 'Ingestion Engine', caption: 'Auto-structures regulations' },
                  { name: 'Rulepack Library', caption: 'Validates EIS' },
                  { name: 'Critique Agent', caption: 'Generates audit trails' },
                  { name: 'Scaffold Generator', caption: 'Drafts compliance docs' },
                  { name: 'Audit Exporter', caption: 'Packages deliverables' }
                ].map((module, index) => (
                  <div key={index} className="group cursor-pointer">
                    <div className="text-xs font-mono uppercase text-[#2d3a2e]/70 group-hover:text-[#97B34D] transition-colors duration-100 group-hover:underline">
                      {module.name}
                  </div>
                    <div className="text-xs font-mono text-[#2d3a2e]/50 mt-1 opacity-0 group-hover:opacity-100 transition-opacity duration-100">
                      {module.caption}
                </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="team"
          ref={proofSectionRef}
          className="bg-white text-[#2d3a2e] py-24 md:py-32 relative"
        >
          {/* top/btm hairlines to bracket the section */}
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--olive-500)_30%,transparent)] to-transparent" />
          <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-[color-mix(in_srgb,var(--olive-500)_30%,transparent)] to-transparent" />

          <div className="max-w-7xl mx-auto px-6">
            {/* Header */}
            <div
              ref={useReveal(0.2).ref}
              className={`transition-all duration-300 ${
                useReveal(0.2).visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
              }`}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tight text-[#2d3a2e]">
                {team.headline}
              </h2>
              <p className="mt-3 text-base md:text-lg text-[#2d3a2e]/70 max-w-3xl">
                {team.subhead}
              </p>
            </div>

            {/* THE TEAM Heading */}
            <div className="mt-16 mb-8">
              <div className="border-l-4 border-[#97B34D] pl-6">
                <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-[0.9] text-[#2d3a2e]">
                  THE TEAM
                </h2>
              </div>
            </div>

            {/* Unified Team Grid - All Same Size */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Founders */}
              {team.founders.map((member, index) => (
                <motion.article
                  key={member.name}
                  className="group relative rounded-2xl border border-[color-mix(in_srgb,var(--olive-500)_22%,transparent)] bg-white/90 backdrop-blur-[2px] p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, ease: "easeOut", delay: index * 0.05 }}
                  tabIndex={0}
                >
                  {/* Olive left rail */}
                  <span className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[color-mix(in_srgb,var(--olive-500)_55%,transparent)] opacity-70" />
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[var(--ink-800)] ring-1 ring-[color-mix(in_srgb,var(--olive-500)_22%,transparent)] mb-4">
                      <img 
                        src={member.headshot} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: member.name === 'Conner Brown' ? 'center 30%' :
                                         member.name === 'Memme Onwudiwe' ? 'center 25%' :
                                         member.name === 'Matt Bixler' ? 'center 30%' :
                                         'center'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'grid';
                        }}
                      />
                      <div className="w-full h-full grid place-items-center text-xl font-bold text-[var(--paper)]/70 hidden">
                        {member.name.split(" ").map(p => p[0]).join("").slice(0,2)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold tracking-tight text-[#2d3a2e]">
                      {member.name}
                    </h3>
                    <p className="text-sm font-mono text-[#2d3a2e]/60 mt-1">{member.title}</p>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                      {member.tags.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#97B34D]/30 text-[10px] font-mono tracking-wider text-[#97B34D] bg-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}

              {/* Advisors */}
              {team.advisors.map((member, index) => (
                <motion.article
                  key={member.name}
                  className="group relative rounded-2xl border border-[color-mix(in_srgb,var(--olive-500)_22%,transparent)] bg-white/90 backdrop-blur-[2px] p-6 hover:shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:-translate-y-0.5 transition-all"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: "easeOut", delay: (team.founders.length + index) * 0.1 }}
                  tabIndex={0}
                >
                  {/* Olive left rail */}
                  <span className="absolute left-0 top-5 bottom-5 w-[3px] rounded-full bg-[color-mix(in_srgb,var(--olive-500)_55%,transparent)] opacity-70" />
                  
                  <div className="flex flex-col items-center text-center">
                    {/* Avatar */}
                    <div className="relative w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden bg-[var(--ink-800)] ring-1 ring-[color-mix(in_srgb,var(--olive-500)_22%,transparent)] mb-4">
                      <img 
                        src={member.headshot} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        style={{
                          objectPosition: member.name === 'Conner Brown' ? 'center 30%' :
                                         member.name === 'Memme Onwudiwe' ? 'center 25%' :
                                         member.name === 'Matt Bixler' ? 'center 30%' :
                                         'center'
                        }}
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.style.display = 'none';
                          const fallback = target.nextElementSibling as HTMLElement;
                          if (fallback) fallback.style.display = 'grid';
                        }}
                      />
                      <div className="w-full h-full grid place-items-center text-xl font-bold text-[var(--paper)]/70 hidden">
                        {member.name.split(" ").map(p => p[0]).join("").slice(0,2)}
                      </div>
                    </div>
                    
                    {/* Content */}
                    <h3 className="text-lg font-bold tracking-tight text-[#2d3a2e]">
                      {member.name}
                    </h3>
                    <p className="text-sm font-mono text-[#2d3a2e]/60 mt-1">{member.title}</p>
                    
                    {/* Tags */}
                    <div className="mt-4 flex flex-wrap gap-1.5 justify-center">
                      {member.tags?.map(tag => (
                        <span key={tag} className="inline-flex items-center px-2.5 py-1 rounded-md border border-[#97B34D]/30 text-[10px] font-mono tracking-wider text-[#97B34D] bg-white/80">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>

            {/* Ticker / proof strip */}
            <div className="mt-12 relative overflow-hidden rounded-lg border border-[color-mix(in_srgb,var(--olive-500)_18%,transparent)] bg-white/70">
              <div className="py-3 whitespace-nowrap animate-marquee font-mono text-xs tracking-[0.22em] text-[#2d3a2e]/70">
                <span className="mx-10">
                  {team.proofLine} • TESTED BY POLICY • AUDIT-READY BY DESIGN • DEFENSIBLE BY DEFAULT
                </span>
                <span className="mx-10">
                  {team.proofLine} • TESTED BY POLICY • AUDIT-READY BY DESIGN • DEFENSIBLE BY DEFAULT
                </span>
              </div>
            </div>
          </div>
        </section>

        <section 
          id="vision"
          ref={visionSectionRef}
          className="bg-white text-[#2d3a2e] py-24 relative overflow-hidden"
        >
          {/* Animated Counter Bar */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={visionCountersVisible ? { y: 0, opacity: 1 } : { y: -50, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-r from-[#F9FAF5] to-[#F0F4E8] border-b border-[#97B34D]/20"
          >
            <div className="max-w-7xl mx-auto px-6 h-full flex items-center justify-between">
              {/* Counter Items */}
              {[
                { value: "54%", label: "Budget cuts", delay: 0 },
                { value: "23%", label: "Workforce reductions", delay: 0.2 },
                { value: "80+", label: "Agencies rewriting NEPA", delay: 0.4 },
                { value: "2026", label: "Deadline", delay: 0.6 }
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={visionCountersVisible ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                  transition={{ delay: item.delay, duration: 0.3 }}
                  className="text-center"
                >
                  <div className="text-3xl font-black text-[#1D2B1D] font-mono">
                    <CountUp
                      start={0}
                      end={item.value.includes('%') ? parseInt(item.value) : item.value.includes('+') ? 80 : parseInt(item.value)}
                      duration={1.0}
                      delay={item.delay + 0.3}
                      enableScrollSpy
                      scrollSpyOnce
                      suffix={item.value.includes('%') ? '%' : item.value.includes('+') ? '+' : ''}
                      separator=""
                      decimal=""
                    />
                    </div>
                  <div className="text-xs font-mono text-[#2B3228]/60 uppercase tracking-wider mt-1">
                    {item.label}
                  </div>
                </motion.div>
              ))}
                </div>
          </motion.div>

          {/* Main Content */}
          <div className="max-w-7xl mx-auto px-6 pt-32">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              {/* Left Content */}
              <div className="md:col-span-7">
                {/* Typewriter Headline */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={visionTextVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3 }}
                  className="mb-8"
                >
                  <h2 className="text-5xl md:text-7xl font-black tracking-tight leading-none text-[#1D2B1D]">
                    {visionTypewriterText}
                    {visionTextVisible && visionTypewriterText.length < 9 && (
                      <span className="animate-pulse">|</span>
                    )}
                  </h2>
                </motion.div>

                {/* Animated Subhead */}
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={visionTextVisible ? { scale: 1, opacity: 1 } : { scale: 0.8, opacity: 0 }}
                  transition={{ delay: 0.6, duration: 0.3, ease: "easeOut" }}
                  className="mb-12"
                >
                  <h3 className="text-2xl font-bold tracking-tight text-[#1D2B1D]">
                    Regulation is Infrastructure.
                  </h3>
                  {/* Animated underline */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={visionTextVisible ? { scaleX: 1 } : { scaleX: 0 }}
                    transition={{ delay: 0.8, duration: 0.4 }}
                    className="w-32 h-1 bg-[#97B34D] mt-2 origin-left"
                  />
                </motion.div>

                {/* Paragraph Reveal Animation */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={visionTextVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 0.9, duration: 0.4 }}
                  className="space-y-6 text-lg font-light leading-relaxed"
                >
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={visionTextVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    className="text-[#2B3228]/80"
                  >
                    OPEF is rebuilding it—open, interoperable, and explainable.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={visionTextVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.1, duration: 0.3 }}
                    className="text-[#2B3228]/80"
                  >
                    We're creating the first shared library of environmental logic:
                    a foundation where code, policy, and proof intersect.
                  </motion.p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={visionTextVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    className="text-[#2B3228]/80 font-medium"
                  >
                    When regulation becomes infrastructure,
                    innovation follows — faster, fairer, and future-proof.
                  </motion.p>
                </motion.div>
              </div>

              {/* Right Visual - Proof Loop Animation */}
              <div className="md:col-span-5 flex items-center justify-center">
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={visionTextVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                  transition={{ delay: 0.8, duration: 0.4 }}
                  className="relative w-80 h-80"
                >
                  {/* Rotating Rings */}
                  {[0, 1, 2].map((ring, index) => (
                    <motion.div
                      key={ring}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={visionTextVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ 
                        delay: 2.2 + (index * 0.2), 
                        duration: 0.6,
                        ease: "easeOut"
                      }}
                      className="absolute inset-0 rounded-full border-2 border-[#97B34D]/30"
                      style={{
                        width: `${100 - (ring * 25)}%`,
                        height: `${100 - (ring * 25)}%`,
                        top: `${ring * 12.5}%`,
                        left: `${ring * 12.5}%`,
                      }}
                    >
                      {/* Rotating Animation */}
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ 
                          duration: 8 + (index * 2),
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="w-full h-full rounded-full border border-[#97B34D]/50"
                      />
                    </motion.div>
                  ))}

                  {/* Rotating Dots */}
                  {[0, 1, 2].map((ringIndex, index) => (
                    <motion.div
                      key={`dots-${ringIndex}`}
                      initial={{ scale: 0, opacity: 0 }}
                      animate={visionTextVisible ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
                      transition={{ delay: 2.8 + (index * 0.2), duration: 0.6 }}
                      className="absolute inset-0 flex items-center justify-center"
                    >
                      <motion.div
                        animate={{ rotate: index % 2 === 0 ? 360 : -360 }}
                        transition={{ 
                          duration: 6 + (index * 2),
                          repeat: Infinity,
                          ease: "linear"
                        }}
                        className="relative"
                        style={{
                          width: `${100 - (ringIndex * 25)}%`,
                          height: `${100 - (ringIndex * 25)}%`,
                        }}
                      >
                        {/* Dots positioned around the ring */}
                        {Array.from({ length: 8 + (ringIndex * 4) }).map((_, dotIndex) => (
                          <div
                            key={dotIndex}
                            className="absolute w-2 h-2 bg-[#97B34D] rounded-full"
                            style={{
                              top: '50%',
                              left: '50%',
                              transformOrigin: '0 0',
                              transform: `rotate(${(dotIndex * 360) / (8 + (ringIndex * 4))}deg) translateY(-${50 - (ringIndex * 12.5)}%)`,
                            }}
                          />
                        ))}
                      </motion.div>
                    </motion.div>
                  ))}

                  {/* Center Circle - Fixed */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={visionTextVisible ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: 1.2, duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <div className="w-16 h-16 bg-[#97B34D] rounded-full flex items-center justify-center">
                      <div className="text-white font-mono text-xs font-bold">
                        OPEF
                      </div>
                    </div>
                  </motion.div>
                </motion.div>
          </div>
            </div>
          </div>

          {/* Faint Gridlines */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="absolute inset-0 pointer-events-none"
          >
            <div 
              className="w-full h-full opacity-5"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2397B34D'%3E%3Cpath d='M0 0h40v1H0zM0 0v40h1V0z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
              }}
            />
          </motion.div>
        </section>

        <section 
          id="beta"
          ref={betaSectionRef}
          className="py-24 relative overflow-hidden"
          style={{ backgroundColor: '#0C0E0A' }}
        >
          {/* Cinematic fade transition overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-20%" }}
            transition={{ duration: 0.8 }}
            className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black pointer-events-none"
          />

          {/* Animated olive pulse line */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            animate={betaVisible ? { x: "100%", opacity: 1 } : { x: "-100%", opacity: 0 }}
            transition={{ delay: 0.5, duration: 2.0, ease: "easeInOut" }}
            className="absolute top-16 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#A2B879] to-transparent"
          />

          <div className="max-w-7xl mx-auto px-6 relative z-10">
            {/* Main terminal container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={betaVisible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
              transition={{ delay: 0.8, duration: 1.0, ease: "easeOut" }}
              className="relative"
            >
              {/* Radial olive glow behind box */}
              <motion.div
                animate={{ 
                  opacity: [0.06, 0.12, 0.06],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-lg"
                style={{
                  background: 'radial-gradient(circle at center, rgba(140,160,90,0.06) 0%, transparent 70%)',
                  filter: 'blur(20px)'
                }}
              />

              {/* Triple border system */}
              <motion.div
                initial={{ clipPath: "inset(100% 0 0 0)" }}
                animate={betaVisible ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
                transition={{ delay: 1.2, duration: 1.5, ease: "easeOut" }}
                className="absolute inset-0"
              >
                {/* Outer border */}
                <div className="absolute inset-0 border-2 border-[#E6E8DA] rounded-lg"></div>
                {/* Middle border */}
                <div className="absolute inset-1 border border-[#A2B879] rounded-lg"></div>
                {/* Inner border */}
                <div className="absolute inset-2 border-2 border-white rounded-lg"></div>
              </motion.div>

              {/* Soft shadow */}
              <motion.div
                animate={{ 
                  opacity: [0.1, 0.2, 0.1],
                  scale: [1, 1.01, 1]
                }}
                transition={{ 
                  duration: 8,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-lg"
                style={{
                  boxShadow: '0 0 40px rgba(162,184,121,0.15)'
                }}
              />

              {/* Content */}
              <div className="p-12 md:p-24 relative z-10">
                {/* Monospace headline */}
                <motion.div
                  initial={{ clipPath: "inset(100% 0 0 0)" }}
                  animate={betaVisible ? { clipPath: "inset(0% 0 0 0)" } : { clipPath: "inset(100% 0 0 0)" }}
                  transition={{ delay: 1.5, duration: 0.8, ease: "easeOut" }}
                  className="mb-8"
                >
                  <h2 className="text-6xl md:text-8xl font-black tracking-tighter font-mono" style={{ color: '#F9FAF5' }}>
                    Join the Beta
                  </h2>
                </motion.div>

                {/* Olive-accented subhead */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={betaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 2.0, duration: 0.6 }}
                  className="mb-8"
                >
                  <h3 className="text-2xl font-medium tracking-tight" style={{ color: '#A8B97B' }}>
                    Help define the infrastructure for explainable regulation.
                  </h3>
                </motion.div>

                {/* Light gray body copy */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={betaVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ delay: 2.2, duration: 0.6 }}
                  className="mb-8"
                >
                  <p className="text-xl font-light max-w-2xl leading-relaxed" style={{ color: '#C6C6C6' }}>
                    Collaborate with our research network, test the platform, and shape the systems that will govern the next era of environmental intelligence.
                  </p>
                </motion.div>

                {/* Version number */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={betaVisible ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ delay: 2.3, duration: 0.6 }}
                  className="mb-12"
                >
                  <p className="text-sm font-mono" style={{ color: '#A8B97B' }}>
                    Version 0.9 – Access by invitation.
                  </p>
                </motion.div>

                {/* Form with enhanced interactions */}
                {true ? (
                  <motion.form
                    initial={{ opacity: 0 }}
                    animate={betaVisible ? { opacity: 1 } : { opacity: 0 }}
                    transition={{ delay: 1.0, duration: 0.3 }}
                    onSubmit={handleSubmit}
                    className="space-y-8"
                  >
                <div className="flex flex-col md:flex-row gap-4">
                      {/* Email input with refined styling */}
                      <motion.input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                        className="flex-1 bg-transparent border-2 border-white px-6 py-4 text-lg font-mono focus:outline-none focus:border-[#97B34D] focus:ring-2 focus:ring-[#97B34D]/20 transition-all duration-300 placeholder:text-[#7E7E7E] placeholder:italic"
                        style={{ 
                          color: email ? '#97B34D' : '#F9FAF5'
                        }}
                        whileFocus={{ scale: 1.02 }}
                      />
                      
                      {/* CTA button with inverted hover */}
                      <motion.button
                    type="submit"
                        className="group bg-white text-[#0C0E0A] px-12 py-4 font-bold hover:bg-[#A2B879] hover:text-white border-2 border-white transition-all duration-300 flex items-center justify-center gap-3 text-lg relative overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <span className="relative z-10">Request Early Access</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform relative z-10" strokeWidth={2} />
                      </motion.button>
                </div>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={betaVisible ? { opacity: 1 } : { opacity: 0 }}
                      transition={{ delay: 1.1, duration: 0.3 }}
                      className="text-xs font-mono"
                      style={{ color: '#7E7E7E' }}
                    >
                      No spam. Just early invites, research insights, and meaningful progress.
                    </motion.p>
                  </motion.form>
                ) : (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6 }}
                    className="py-8 text-center"
                  >
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-2xl font-bold mb-2"
                      style={{ color: '#F9FAF5' }}
                    >
                      Welcome to the Network.
                    </motion.p>
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-sm font-mono"
                      style={{ color: '#A8B97B' }}
                    >
                      You'll hear from us soon.
                    </motion.p>
                  </motion.div>
            )}
          </div>
            </motion.div>
          </div>

          {/* Enhanced footer tagline with verification pulse */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ delay: 3.0, duration: 0.8 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.p
              animate={{ 
                opacity: [0.65, 1, 0.65],
                textShadow: [
                  '0 0 10px rgba(170,190,110,0.4)',
                  '0 0 15px rgba(170,190,110,0.6)',
                  '0 0 10px rgba(170,190,110,0.4)'
                ]
              }}
              transition={{ 
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="text-xs font-mono uppercase tracking-wider"
              style={{ color: '#D2E0A0' }}
            >
              TESTED BY POLICY • AUDIT-READY BY DESIGN • DEFENSIBLE BY DEFAULT
            </motion.p>
          </motion.div>
        </section>

        <footer className="bg-white text-[#2d3a2e] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-[#2d3a2e]/20 pt-16 pb-12">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4 tracking-tight">OPEF is where science, law, and code meet.</h2>
                <p className="text-sm font-light text-[#2d3a2e]/60 max-w-2xl mx-auto">
                  Built by researchers, engineers, and founders translating environmental judgment into digital systems.
                </p>
              </div>
              <div className="flex items-center justify-center gap-3 mb-8">
                    <Box className="w-6 h-6" strokeWidth={1} />
                    <div className="text-lg font-bold">OPEF</div>
                  </div>
              <div className="text-center">
                  <p className="text-xs font-mono text-[#2d3a2e]/40">
                  © 2025 Open Platform for Environmental Frameworks | Docs · Security · Press · Contact
                  </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
