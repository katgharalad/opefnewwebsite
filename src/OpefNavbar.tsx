import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import OpefMenu from './OpefMenu';

const OpefNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Platform');
  const [logoFilled, setLogoFilled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Logo fill animation on mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setLogoFilled(true);
    }, 100); // Start animation after 100ms

    return () => clearTimeout(timer);
  }, []);

  const navItems = [
    { name: 'Platform', href: '#platform', animation: 'bottom-up' },
    { name: 'Features', href: '#features', animation: 'right-left' },
    { name: 'Who It\'s For', href: '#who-its-for', animation: 'bottom-up' },
    { name: 'How It Works', href: '#how-it-works', animation: 'right-left' },
    { name: 'Team', href: '#team', animation: 'bottom-up' },
    { name: 'Vision', href: '#vision', animation: 'right-left' },
    { name: 'Beta', href: '#beta', animation: 'bottom-up' }
  ];

  return (
    <>
      {/* Font Import */}
      <link
        href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700&display=swap"
        rel="stylesheet"
      />
      
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 h-16 md:h-20 transition-all duration-200 ${
          isScrolled ? 'shadow-[0_1px_20px_rgba(255,255,255,0.05)]' : ''
        }`}
        style={{ 
          fontFamily: 'Satoshi, sans-serif',
          backgroundColor: 'var(--ink-900)'
        }}
      >
        <div className="h-full px-4 md:px-8 lg:px-16 relative">
          {/* Animated brand fill with reduced saturation */}
          <div 
            className={`absolute inset-y-0 left-0 transition-transform duration-300 ease-out ${
              logoFilled ? 'translate-x-0' : '-translate-x-full'
            }`}
            style={{ 
              transformOrigin: 'left',
              width: '380px', // Extended width to reach Platform button margin
              maxWidth: '380px',
              background: 'linear-gradient(180deg, hsl(78 28% 22%), hsl(78 26% 18%))',
              opacity: 0.9
            }}
          />
          
          {/* Neutral veil to de-saturate the greens */}
          <div
            className="absolute inset-y-0 left-0 pointer-events-none"
            style={{
              width: '380px',
              maxWidth: '380px',
              background: 'linear-gradient(180deg, rgba(8,10,8,0.30), rgba(8,10,8,0.18))'
            }}
          />
          
          <div className="flex items-center justify-between h-full relative z-10">
            
            {/* Left Cluster - Logo */}
            <div className="flex-shrink-0 relative h-full">
              <a 
                href="/" 
                className="relative inline-flex items-center justify-center px-3 md:px-6 py-3 md:py-4 text-xl md:text-2xl font-bold tracking-[0.02em] hover:text-white transition-colors duration-200 z-10"
                style={{ 
                  fontWeight: 900,
                  color: 'var(--paper)'
                }}
              >
                <span className="relative z-10">OPEF™</span>
              </a>
            </div>

            {/* Center Cluster - Navigation Links */}
            <div className="hidden lg:flex items-center h-full">
              {navItems.map((item) => (
                <div key={item.name} className="flex items-center h-full relative">
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      onClick={() => {
                        console.log('Rulepacks link clicked!');
                        setActiveLink(item.name);
                      }}
                      className={`text-sm font-medium tracking-[0.02em] px-6 lg:px-8 py-4 h-full flex items-center justify-center border-l border-r border-[var(--ink-700)] relative overflow-hidden ${
                        activeLink === item.name 
                          ? 'text-black' 
                          : 'text-[var(--paper)] hover:text-[var(--paper)]'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {/* Animated background fill */}
                      <div 
                        className={`absolute inset-0 bg-white transition-all duration-200 ease-out ${
                          activeLink === item.name 
                            ? 'opacity-100' 
                            : 'opacity-0'
                        } ${
                          item.animation === 'bottom-up' 
                            ? activeLink === item.name 
                              ? 'translate-y-0' 
                              : 'translate-y-full'
                            : activeLink === item.name 
                              ? 'translate-x-0' 
                              : 'translate-x-full'
                        }`}
                      />
                      
                      {/* Text content */}
                      <div className="relative z-10 text-center">
                        <div className="uppercase">{item.name}</div>
                      </div>
                    </Link>
                  ) : (
                    <a
                      href={item.href}
                      onClick={() => setActiveLink(item.name)}
                      className={`text-sm font-medium tracking-[0.02em] px-6 lg:px-8 py-4 h-full flex items-center justify-center border-l border-r border-[var(--ink-700)] relative overflow-hidden ${
                        activeLink === item.name 
                          ? 'text-black' 
                          : 'text-[var(--paper)] hover:text-[var(--paper)]'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {/* Animated background fill */}
                      <div 
                        className={`absolute inset-0 bg-white transition-all duration-200 ease-out ${
                          activeLink === item.name 
                            ? 'opacity-100' 
                            : 'opacity-0'
                        } ${
                          item.animation === 'bottom-up' 
                            ? activeLink === item.name 
                              ? 'translate-y-0' 
                              : 'translate-y-full'
                            : activeLink === item.name 
                              ? 'translate-x-0' 
                              : 'translate-x-full'
                        }`}
                      />
                      
                      {/* Text content */}
                      <div className="relative z-10 text-center">
                        <div className="uppercase">{item.name}</div>
                      </div>
                    </a>
                  )}
                </div>
              ))}
              
              {/* Command Palette Menu - Hidden for now */}
              {/* <div className="ml-2 lg:ml-4">
                <OpefMenu />
              </div> */}
            </div>

            {/* Right Cluster - Status/CTA */}
            <div className="flex-shrink-0 flex items-center gap-2">
              <div className="hidden md:block text-xs lg:text-sm text-[var(--paper)] font-medium tracking-[0.02em]">
                Beta Access
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-[var(--paper)] hover:text-[var(--paper)] transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5 md:w-6 md:h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div 
            className="lg:hidden absolute top-16 md:top-20 left-0 right-0 border-b border-[var(--ink-700)] shadow-lg"
            style={{ backgroundColor: 'var(--ink-900)' }}
          >
            <div className="px-4 md:px-8 py-6 space-y-3">
              {navItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith('/') ? (
                    <Link
                      to={item.href}
                      onClick={() => {
                        setActiveLink(item.name);
                        setIsOpen(false);
                      }}
                      className={`block text-sm md:text-base font-medium tracking-[0.02em] uppercase transition-colors duration-200 py-2 ${
                        activeLink === item.name 
                          ? 'text-[var(--olive-300)]' 
                          : 'text-[var(--paper)] hover:text-[var(--paper)]'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {item.name}
                    </Link>
                  ) : (
                    <a
                      key={item.name}
                      href={item.href}
                      onClick={() => {
                        setActiveLink(item.name);
                        setIsOpen(false);
                      }}
                      className={`block text-sm md:text-base font-medium tracking-[0.02em] uppercase transition-colors duration-200 py-2 ${
                        activeLink === item.name 
                          ? 'text-[var(--olive-300)]' 
                          : 'text-[var(--paper)] hover:text-[var(--paper)]'
                      }`}
                      style={{ fontWeight: 500 }}
                    >
                      {item.name}
                    </a>
                  )}
                </div>
              ))}
              
              {/* Mobile Command Menu - Hidden for now */}
              {/* <div className="pt-4 border-t border-[var(--ink-700)]">
                <OpefMenu />
              </div> */}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-16 md:h-20" />
    </>
  );
};

export default OpefNavbar;
