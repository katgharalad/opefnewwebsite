import { motion, useInView, useAnimation } from "framer-motion";
import { useEffect, useRef } from "react";
import { Count } from "./Count";

export default function WhyItMatters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40% 0px" });
  const controls = useAnimation();

  useEffect(() => {
    if (inView) controls.start("visible");
  }, [inView, controls]);

  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 1) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.15, duration: 0.6, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative bg-black text-white px-6 md:px-20 py-28 overflow-hidden"
    >
      {/* background gradient wash */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 0.9 } : { opacity: 0 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 bg-gradient-to-t from-[#0F120E] to-black"
      />

      {/* subtle olive grain overlay */}
      <div 
        className="absolute inset-0 opacity-[0.08] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2397B34D' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3Ccircle cx='15' cy='15' r='0.5'/%3E%3Ccircle cx='45' cy='45' r='0.5'/%3E%3Ccircle cx='45' cy='15' r='0.5'/%3E%3Ccircle cx='15' cy='45' r='0.5'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          backgroundPosition: 'center',
          backgroundSize: 'cover'
        }}
      />

      {/* content */}
      <div className="relative z-10 grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
        <motion.div
          variants={fadeUp}
          animate={controls}
          custom={0}
          className="font-bold text-4xl md:text-5xl leading-tight"
        >
          Why It{" "}
          <span className="relative inline-block">
            <motion.span
              initial={{ backgroundPosition: "100% 0" }}
              animate={inView ? { backgroundPosition: "0% 0" } : { backgroundPosition: "100% 0" }}
              transition={{ delay: 1.2, duration: 0.8, ease: "easeOut" }}
              className="bg-gradient-to-r from-red-500 to-red-500 bg-[length:200%_100%] bg-clip-text text-transparent"
              style={{
                backgroundImage: "linear-gradient(to right, red 0%, red 50%, white 50%, white 100%)",
                backgroundSize: "200% 100%",
                backgroundPosition: "100% 0"
              }}
            >
              Matters
            </motion.span>
          </span>
        </motion.div>

        <div className="relative">
          {/* divider animation - moved to left of text */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={inView ? { scaleY: 1 } : { scaleY: 0 }}
            transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
            className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#97B34D] origin-top"
          />
          
          <div className="pl-8">
            <motion.h3
              variants={fadeUp}
              animate={controls}
              custom={1}
              className="font-mono text-lg text-white/90 mt-2"
            >
              Less Money. Fewer People. Same Deadlines.
            </motion.h3>

            {/* stat line with count-up */}
            <div className="text-sm font-mono text-white/80 space-y-3">
              <motion.p
                variants={fadeUp}
                animate={controls}
                custom={2}
              >
                Agencies face{" "}
                <Count target={-54} suffix="%" /> budgets and{" "}
                <Count target={-23} suffix="%" /> staff cuts, yet must deliver 2-year EIS completions.
              </motion.p>

              <motion.p variants={fadeUp} animate={controls} custom={3}>
                OPEF turns compliance pressure into progress — a platform that sustains output, consistency, and defensibility at scale.
              </motion.p>

              <motion.p
                variants={fadeUp}
                animate={controls}
                custom={4}
                className="pt-6 text-white/50 tracking-wide"
              >
                Open Platform for Environmental Frameworks.
              </motion.p>
            </div>
          </div>
        </div>
      </div>

      {/* footer line with olive glow pulse */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : { opacity: 0 }}
        transition={{ delay: 2.0, duration: 0.8 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#97B34D] to-transparent"
        style={{
          boxShadow: "0 0 8px rgba(151,179,77,0.3)",
          animation: "pulse 2s ease-in-out infinite"
        }}
      />
    </section>
  );
}
