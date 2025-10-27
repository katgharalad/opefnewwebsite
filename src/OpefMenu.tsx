import { useEffect, useId, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const OLIVE = "#97B34D";

type Item = { label: string; href: string; kbd?: string };
const GROUPS: { title: string; items: Item[] }[] = [
  {
    title: "Platform",
    items: [
      { label: "Overview", href: "#platform", kbd: "P" },
      { label: "How It Works", href: "#how-it-works", kbd: "H" },
      { label: "Rulepacks", href: "/rulepacks" },
    ],
  },
  {
    title: "Proof",
    items: [
      { label: "Metrics", href: "/metrics", kbd: "M" },
      { label: "Security", href: "/security" },
      { label: "Docs", href: "/docs" },
    ],
  },
  {
    title: "Company",
    items: [
      { label: "Insights", href: "/insights" },
      { label: "Team", href: "#team" },
      { label: "Contact", href: "#contact", kbd: "C" },
    ],
  },
];

export default function OpefMenu() {
  const [open, setOpen] = useState(false);
  const btnRef = useRef<HTMLButtonElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const firstItemRef = useRef<HTMLAnchorElement | null>(null);
  const id = useId();
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches;

  // close on outside click
  useEffect(() => {
    if (!open) return;
    const onClick = (e: MouseEvent) => {
      if (!panelRef.current || !btnRef.current) return;
      if (
        panelRef.current.contains(e.target as Node) ||
        btnRef.current.contains(e.target as Node)
      )
        return;
      setOpen(false);
    };
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        btnRef.current?.focus();
      }
    };
    window.addEventListener("mousedown", onClick);
    window.addEventListener("keydown", onEsc);
    window.addEventListener("resize", () => setOpen(false));
    window.addEventListener("scroll", () => setOpen(false), { passive: true });
    return () => {
      window.removeEventListener("mousedown", onClick);
      window.removeEventListener("keydown", onEsc);
      window.removeEventListener("resize", () => setOpen(false));
      window.removeEventListener("scroll", () => setOpen(false));
    };
  }, [open]);

  // focus first item on open
  useEffect(() => {
    if (open) {
      // small delay for panel to mount
      const t = setTimeout(() => firstItemRef.current?.focus(), 10);
      return () => clearTimeout(t);
    }
  }, [open]);

  // keyboard nav inside menu
  const handleMenuKey = (e: React.KeyboardEvent) => {
    const items = panelRef.current?.querySelectorAll<HTMLAnchorElement>(
      '[role="menuitem"]'
    );
    if (!items || items.length === 0) return;

    const currentIndex = Array.from(items).findIndex((el) => el === document.activeElement);
    const clamp = (n: number) => (n + items.length) % items.length;

    if (["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) e.preventDefault();

    if (e.key === "ArrowDown") items[clamp(currentIndex + 1)]?.focus();
    if (e.key === "ArrowUp") items[clamp(currentIndex - 1)]?.focus();
    if (e.key === "Home") items[0]?.focus();
    if (e.key === "End") items[items.length - 1]?.focus();
  };

  return (
    <div className="relative">
      <button
        ref={btnRef}
        id={`menu-btn-${id}`}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={`menu-panel-${id}`}
        onClick={() => setOpen((v) => !v)}
        onKeyDown={(e) => {
          if (e.key === "ArrowDown") {
            e.preventDefault();
            setOpen(true);
          }
        }}
        className="inline-flex items-center gap-1.5 md:gap-2 px-2 md:px-3 py-1.5 md:py-2 border border-white/20 text-[10px] md:text-xs font-mono tracking-wider uppercase hover:border-white/40 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97B34D]"
      >
        {/* Two horizontal lines */}
        <div className="flex flex-col justify-center space-y-0.5 md:space-y-1">
          <div className="w-3 md:w-4 h-px bg-white"></div>
          <div className="w-3 md:w-4 h-px bg-white"></div>
        </div>
        
        {/* 45-degree tilted arrow with dot */}
        <div className="relative">
          <ArrowRight 
            className={`h-2.5 md:h-3 w-2.5 md:w-3 transition-transform duration-200 ${open ? "rotate-45" : "rotate-45"}`} 
            strokeWidth={1.5}
          />
          <div className="absolute -top-0.5 -right-0.5 w-0.5 md:w-1 h-0.5 md:h-1 bg-[#97B34D] rounded-full"></div>
        </div>
      </button>

      {/* Panel */}
      {open && (
        <div
          ref={panelRef}
          id={`menu-panel-${id}`}
          role="menu"
          aria-labelledby={`menu-btn-${id}`}
          onKeyDown={handleMenuKey}
          className="absolute right-0 mt-2 w-[320px] sm:w-[360px] max-w-[95vw] z-[80] rounded-none bg-[#0F120E] text-white border border-white/80 shadow-[0_0_0_1px_rgba(255,255,255,0.25)]"
          style={{
            // entrance animation without framer-motion (keeps footprint tiny)
            animation: prefersReduced ? undefined : "o-menu-in 160ms cubic-bezier(.2,.9,.2,1) both",
          }}
        >
          {/* olive rail */}
          <div
            className="absolute left-0 top-0 h-full w-[6px] origin-top"
            style={{
              backgroundColor: OLIVE,
              filter: "drop-shadow(0 0 12px rgba(151,179,77,.35))",
              transform: "scaleY(0)",
              animation: prefersReduced ? undefined : "o-rail 220ms cubic-bezier(.25,1,.5,1) forwards",
            }}
            aria-hidden
          />

          {/* subtle grid background */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{
              backgroundImage:
                "linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)",
              backgroundSize: "14px 14px",
            }}
            aria-hidden
          />

          {/* content */}
          <div className="relative p-2 md:p-3">
            {GROUPS.map((g, gi) => (
              <div key={g.title} className={`px-2 md:px-3 py-1.5 md:py-2 ${gi !== 0 ? "border-t border-white/10" : ""}`}>
                <div className="text-[10px] md:text-[11px] leading-3 md:leading-4 tracking-[0.08em] font-mono uppercase text-white/60 mb-1">
                  {g.title}
                </div>
                <ul className="space-y-1 md:space-y-1.5">
                  {g.items.map((item, ii) => {
                    const isFirst = gi === 0 && ii === 0;
                    return (
                      <li key={item.label}>
                        {item.href.startsWith('/') ? (
                          <Link
                            ref={isFirst ? firstItemRef : null}
                            role="menuitem"
                            to={item.href}
                            className="group flex items-center justify-between gap-2 md:gap-3 px-1.5 md:px-2 py-1.5 md:py-2 rounded-[2px] text-[13px] md:text-[14px] leading-4 md:leading-5 text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97B34D]"
                            style={{
                              boxShadow:
                                "inset 0 -1px 0 rgba(255,255,255,0.06)",
                              animation: prefersReduced
                                ? undefined
                                : `o-item 140ms ${80 + (gi * 3 + ii) * 30
                                  }ms cubic-bezier(.2,.9,.2,1) both`,
                            }}
                            onClick={() => setOpen(false)}
                          >
                            <span className="relative">
                              {item.label}
                              <span className="block max-w-0 group-hover:max-w-full transition-[max-width] duration-200 ease-out border-b border-[#97B34D] mt-[2px]" />
                            </span>
                            <span className="flex items-center gap-1 md:gap-2">
                              {item.kbd && (
                                <kbd className="hidden sm:inline-block border border-white/20 px-1 md:px-1.5 py-[1px] text-[9px] md:text-[10px] font-mono text-white/60">
                                  {item.kbd}
                                </kbd>
                              )}
                              <ArrowRight className="h-3 md:h-4 w-3 md:w-4 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </span>
                          </Link>
                        ) : (
                          <a
                            ref={isFirst ? firstItemRef : null}
                            role="menuitem"
                            href={item.href}
                            className="group flex items-center justify-between gap-2 md:gap-3 px-1.5 md:px-2 py-1.5 md:py-2 rounded-[2px] text-[13px] md:text-[14px] leading-4 md:leading-5 text-white/90 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#97B34D]"
                            style={{
                              boxShadow:
                                "inset 0 -1px 0 rgba(255,255,255,0.06)",
                              animation: prefersReduced
                                ? undefined
                                : `o-item 140ms ${80 + (gi * 3 + ii) * 30
                                  }ms cubic-bezier(.2,.9,.2,1) both`,
                            }}
                            onClick={() => setOpen(false)}
                          >
                            <span className="relative">
                              {item.label}
                              <span className="block max-w-0 group-hover:max-w-full transition-[max-width] duration-200 ease-out border-b border-[#97B34D] mt-[2px]" />
                            </span>
                            <span className="flex items-center gap-1 md:gap-2">
                              {item.kbd && (
                                <kbd className="hidden sm:inline-block border border-white/20 px-1 md:px-1.5 py-[1px] text-[9px] md:text-[10px] font-mono text-white/60">
                                  {item.kbd}
                                </kbd>
                              )}
                              <ArrowRight className="h-3 md:h-4 w-3 md:w-4 opacity-0 translate-x-[-4px] group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                            </span>
                          </a>
                        )}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </div>

          {/* footer ribbon */}
          <div className="relative border-t border-white/10">
            <div
              className="px-2 md:px-3 py-1.5 md:py-2 font-mono text-[9px] md:text-[10px] tracking-[0.18em] uppercase text-[#B9D36C]"
              style={{
                whiteSpace: "nowrap",
                overflow: "hidden",
                maskImage: "linear-gradient(90deg, transparent, #000 12%, #000 88%, transparent)",
              }}
            >
              <span
                className="inline-block"
                style={{
                  animation: prefersReduced ? undefined : "o-ribbon 16s linear infinite",
                }}
              >
                TESTED BY POLICY • AUDIT-READY BY DESIGN • DEFENSIBLE BY DEFAULT •&nbsp;
              </span>
              {!prefersReduced && (
                <span className="inline-block" aria-hidden>
                  TESTED BY POLICY • AUDIT-READY BY DESIGN • DEFENSIBLE BY DEFAULT •&nbsp;
                </span>
              )}
            </div>
          </div>
        </div>
      )}

      {/* keyframe defs */}
      <style>{`
        @keyframes o-menu-in {
          from { opacity: 0; transform: translateY(-4px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes o-rail {
          from { transform: scaleY(0); }
          to   { transform: scaleY(1); }
        }
        @keyframes o-item {
          from { opacity: 0; transform: translateY(-2px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes o-ribbon {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}
