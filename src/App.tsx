import { ArrowRight, Box, Circle, Square } from 'lucide-react';
import { useState } from 'react';

function App() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-[#2d3a2e] text-white relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 border border-white/5" />
        <div className="absolute bottom-0 left-0 w-72 h-72 border border-white/5" />
        <div className="absolute top-1/3 left-1/4 w-48 h-48 border border-white/5 rotate-45" />
      </div>

      <div className="relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <nav className="flex items-start justify-between mb-32 pt-8">
            <div className="flex items-center gap-3">
              <Box className="w-8 h-8" strokeWidth={1} />
              <div className="text-xl font-bold tracking-tight">OPEF</div>
            </div>
            <button className="px-6 py-2 border border-white/20 hover:bg-white hover:text-[#2d3a2e] transition-all duration-300 font-mono text-sm">
              BETA
            </button>
          </nav>

          <section className="mb-48">
          <div className="mb-12">
            <div className="inline-flex items-center gap-2 mb-8 px-4 py-2 border border-white/20 text-xs font-mono">
              <Circle className="w-3 h-3 fill-white" strokeWidth={0} />
              <span>MACHINE-LITERATE GOVERNANCE</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-bold leading-[0.9] mb-12 tracking-tighter max-w-5xl">
              TRANSLATING ENVIRONMENTAL LAW INTO MACHINE-READABLE INFRASTRUCTURE
            </h1>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 max-w-4xl">
            <div className="space-y-4 border-l border-white/20 pl-6">
              <p className="text-base leading-relaxed font-light text-white/80">
                Our governance systems remain trapped in paper and PDFs — human-readable but not machine-actionable. OPEF bridges that gap.
              </p>
            </div>
            <div className="space-y-4 border-l border-white/40 pl-6">
              <p className="text-base leading-relaxed font-light text-white/80">
                We teach machines the language of environmental judgment through structured, interpretable rulepacks that encode procedures, thresholds, and dependencies.
              </p>
            </div>
          </div>
        </section>
        </div>

        <section className="bg-white text-[#2d3a2e] py-24 mb-0">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border border-[#2d3a2e]/20 p-12 md:p-16">
              <Square className="w-12 h-12 mb-12 text-[#2d3a2e]/40" strokeWidth={1} />
              <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">The Platform</h2>

            <div className="space-y-12 mb-16">
              <p className="text-lg font-light leading-relaxed max-w-3xl">
                OPEF (Open Platform for Environmental Frameworks) translates complex statutes — NEPA, CWA, ESA, NHPA — into structured, machine-interpretable "rulepacks."
              </p>
              <p className="text-lg font-light leading-relaxed max-w-3xl">
                Each rulepack encodes procedures, thresholds, and dependencies that allow AI systems to reason about compliance with traceable logic.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12 border-t border-[#2d3a2e]/20">
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#2d3a2e]/40">01</div>
                <h3 className="text-xl font-bold">Accelerated reviews</h3>
                <p className="text-sm font-light text-[#2d3a2e]/70">AI-assisted drafting and cross-agency analysis</p>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#2d3a2e]/40">02</div>
                <h3 className="text-xl font-bold">Transparent reasoning</h3>
                <p className="text-sm font-light text-[#2d3a2e]/70">Every output linked to statute and precedent</p>
              </div>
              <div className="space-y-4">
                <div className="text-xs font-mono text-[#2d3a2e]/40">03</div>
                <h3 className="text-xl font-bold">Human-centered oversight</h3>
                <p className="text-sm font-light text-[#2d3a2e]/70">Experts remain in the loop as interpreters, not clerks</p>
              </div>
            </div>
          </div>
          </div>
        </section>

        <section className="bg-[#2d3a2e] text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-5">
                <h2 className="text-5xl font-bold mb-8 tracking-tight">Why It Matters</h2>
              </div>
              <div className="md:col-span-7 space-y-8">
                <p className="text-lg font-light leading-relaxed border-l-2 border-white pl-8">
                  Environmental decisions are sociotechnical decisions — they mix ecology, infrastructure, policy, and moral judgment.
                </p>
                <p className="text-lg font-light leading-relaxed">
                  By making environmental law machine-literate, OPEF turns code into a partner in governance, not a replacement for it.
                </p>
                <p className="text-xl font-light leading-relaxed">
                  It's a step toward systems that are not only efficient, but also accountable to the public imagination.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-white text-[#2d3a2e] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-[#2d3a2e]/20 pt-16">
              <p className="text-sm font-mono text-[#2d3a2e]/40 uppercase tracking-wider mb-12">Who It's For</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="space-y-8">
                  <div className="border-l-4 border-[#2d3a2e] pl-6 py-2">
                    <h3 className="text-xl font-bold mb-2">Consulting firms</h3>
                    <p className="text-sm font-light text-[#2d3a2e]/70">Modernizing environmental reviews with explainable AI</p>
                  </div>
                  <div className="border-l-4 border-[#2d3a2e]/30 pl-6 py-2">
                    <h3 className="text-xl font-bold mb-2">Agencies</h3>
                    <p className="text-sm font-light text-[#2d3a2e]/70">Seeking compliance clarity and institutional memory</p>
                  </div>
                </div>
                <div className="space-y-8">
                  <div className="border-l-4 border-[#2d3a2e]/30 pl-6 py-2">
                    <h3 className="text-xl font-bold mb-2">Corporate sustainability teams</h3>
                    <p className="text-sm font-light text-[#2d3a2e]/70">Managing environmental permits, ESG reporting, or audit trails</p>
                  </div>
                  <div className="border-l-4 border-[#2d3a2e]/30 pl-6 py-2">
                    <h3 className="text-xl font-bold mb-2">Researchers & universities</h3>
                    <p className="text-sm font-light text-[#2d3a2e]/70">Exploring the intersection of AI governance, law, and society</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2d3a2e] text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="bg-white text-[#2d3a2e] p-12 md:p-24">
            <h2 className="text-4xl md:text-6xl font-bold mb-16 tracking-tight">How It Works</h2>
            <div className="space-y-12">
              <div className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-[#2d3a2e]/10 flex-shrink-0">01</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Ingest</h3>
                  <p className="text-base font-light">OPEF parses regulatory frameworks and agency guidance into modular logic maps.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-[#2d3a2e]/10 flex-shrink-0">02</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Encode</h3>
                  <p className="text-base font-light">Human experts annotate conditions, thresholds, and dependencies.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-[#2d3a2e]/10 flex-shrink-0">03</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Deploy</h3>
                  <p className="text-base font-light">AI models use these "rulepacks" to generate audit-ready documentation, citations, and analyses.</p>
                </div>
              </div>
              <div className="flex gap-8 items-start">
                <div className="text-6xl font-bold text-[#2d3a2e]/10 flex-shrink-0">04</div>
                <div>
                  <h3 className="text-2xl font-bold mb-3">Explain</h3>
                  <p className="text-base font-light">Every output includes an interpretable trail of reasoning — a human-readable chain of compliance logic.</p>
                </div>
              </div>
            </div>
            <div className="mt-16 pt-12 border-t border-[#2d3a2e]/20">
              <p className="text-sm font-mono uppercase tracking-wider">Transparency by design. No black boxes.</p>
            </div>
          </div>
          </div>
        </section>

        <section className="bg-white text-[#2d3a2e] py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-12">
              <div className="md:col-span-7">
                <h2 className="text-5xl md:text-7xl font-bold mb-12 tracking-tight leading-none">The Vision</h2>
                <div className="space-y-6 text-lg font-light leading-relaxed">
                  <p>Regulation is infrastructure.</p>
                  <p>
                    OPEF's mission is to rebuild that infrastructure — open, interpretable, and interoperable — so that environmental governance can evolve with the same clarity and adaptability as the ecosystems it seeks to protect.
                  </p>
                  <p className="text-xl pt-8">
                    In the long term, OPEF aims to form a global commons of environmental logic — a shared library of machine-readable rules for public good.
                  </p>
                </div>
              </div>
              <div className="md:col-span-5 flex items-center justify-center">
                <div className="w-64 h-64 border-2 border-[#2d3a2e]/20 flex items-center justify-center">
                  <div className="w-48 h-48 border border-[#2d3a2e]/40 flex items-center justify-center">
                    <div className="w-32 h-32 border border-[#2d3a2e]/60 flex items-center justify-center">
                      <Circle className="w-16 h-16" strokeWidth={1} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-[#2d3a2e] text-white py-24">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-4 border-white p-12 md:p-24">
            <h2 className="text-6xl md:text-8xl font-bold mb-8 tracking-tighter">Join the Waitlist</h2>
            <p className="text-xl font-light mb-16 max-w-2xl">
              Be among the first to shape this new language of governance.
              Join the OPEF beta, collaborate with our research network, and help design the tools that will define the next generation of environmental intelligence.
            </p>

            {!submitted ? (
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="flex flex-col md:flex-row gap-4">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="your@email.com"
                    required
                    className="flex-1 bg-transparent border-2 border-white px-6 py-4 text-lg font-mono focus:outline-none focus:border-white/60 placeholder:text-white/30"
                  />
                  <button
                    type="submit"
                    className="group bg-white text-[#2d3a2e] px-12 py-4 font-bold hover:bg-transparent hover:text-white border-2 border-white transition-all duration-300 flex items-center justify-center gap-3 text-lg"
                  >
                    JOIN
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" strokeWidth={2} />
                  </button>
                </div>
                <p className="text-xs font-mono text-white/40">No spam. Just early invites, research insights, and meaningful progress.</p>
              </form>
            ) : (
              <div className="py-8">
                <p className="text-2xl font-bold">SUBMITTED_SUCCESSFULLY</p>
                <p className="text-sm font-mono text-white/60 mt-2">You'll hear from us soon.</p>
              </div>
            )}
          </div>
          </div>
        </section>

        <footer className="bg-white text-[#2d3a2e] py-16">
          <div className="max-w-7xl mx-auto px-6">
            <div className="border-t border-[#2d3a2e]/20 pt-16 pb-12">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-12">
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-8">
                    <Box className="w-6 h-6" strokeWidth={1} />
                    <div className="text-lg font-bold">OPEF</div>
                  </div>
                  <p className="text-sm font-light text-[#2d3a2e]/60 max-w-md">
                    Built by a team of researchers, designers, and founders translating environmental judgment into digital systems.
                  </p>
                  <p className="text-sm font-mono text-[#2d3a2e]/40">
                    OPEF is where science, law, and code meet.
                  </p>
                </div>
                <div className="flex items-end justify-start md:justify-end">
                  <p className="text-xs font-mono text-[#2d3a2e]/40">
                    © 2025 OPEN PLATFORM FOR ENVIRONMENTAL FRAMEWORKS
                  </p>
                </div>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;
