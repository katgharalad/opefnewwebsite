import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

const OpefNavbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeLink, setActiveLink] = useState('Platform');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Platform', href: '#platform', animation: 'bottom-up' },
    { name: 'Features', href: '#features', animation: 'right-left' },
    { name: 'Who It\'s For', href: '#who-its-for', animation: 'bottom-up' },
    { name: 'How It Works', href: '#how-it-works', animation: 'right-left' },
    { name: 'Proof', href: '#proof', animation: 'bottom-up' },
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
        className={`fixed top-0 left-0 right-0 z-50 h-20 bg-[#0b0b0b] transition-all duration-200 ${
          isScrolled ? 'shadow-[0_1px_20px_rgba(255,255,255,0.05)]' : ''
        }`}
        style={{ fontFamily: 'Satoshi, sans-serif' }}
      >
        <div className="h-full px-16">
          <div className="flex items-center justify-between h-full">
            
            {/* Left Cluster - Logo */}
            <div className="flex-shrink-0">
              <a 
                href="/" 
                className="text-xl font-semibold text-white tracking-[0.02em] hover:text-white transition-colors duration-200"
                style={{ fontWeight: 600 }}
              >
                OPEF™
              </a>
            </div>

            {/* Center Cluster - Navigation Links */}
            <div className="hidden lg:flex items-center h-full">
              {navItems.map((item, index) => (
                <div key={item.name} className="flex items-center h-full relative">
                  <a
                    href={item.href}
                    onClick={() => setActiveLink(item.name)}
                    className={`text-sm font-medium tracking-[0.02em] px-8 py-4 h-full flex items-center justify-center border-l border-r border-white/20 relative overflow-hidden ${
                      activeLink === item.name 
                        ? 'text-black' 
                        : 'text-white hover:text-white'
                    }`}
                    style={{ fontWeight: 500 }}
                  >
                    {/* Animated background fill */}
                    <div 
                      className={`absolute inset-0 bg-white transition-all duration-500 ease-out ${
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
                      {item.count && (
                        <div className="text-xs mt-1">{item.count}</div>
                      )}
                    </div>
                  </a>
                </div>
              ))}
              
              {/* More menu icon */}
              <div className="ml-4">
                <div className="w-6 h-6 flex flex-col justify-center space-y-1">
                  <div className="w-full h-px bg-white"></div>
                  <div className="w-full h-px bg-white"></div>
                </div>
              </div>
            </div>

            {/* Right Cluster - Status/CTA */}
            <div className="flex-shrink-0">
              <div className="hidden lg:block text-sm text-white font-medium tracking-[0.02em]">
                Beta Access
              </div>
              
              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="lg:hidden text-white hover:text-white transition-colors duration-200 p-2"
                aria-label="Toggle menu"
              >
                {isOpen ? (
                  <X className="w-6 h-6" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-6 h-6" strokeWidth={1.5} />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Overlay */}
        {isOpen && (
          <div className="lg:hidden absolute top-20 left-0 right-0 bg-[#0b0b0b] border-b border-white/10 shadow-lg">
            <div className="px-16 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={() => {
                    setActiveLink(item.name);
                    setIsOpen(false);
                  }}
                  className={`block text-sm font-medium tracking-[0.02em] uppercase transition-colors duration-200 ${
                    activeLink === item.name 
                      ? 'text-[#22d3ee]' 
                      : 'text-white hover:text-white'
                  }`}
                  style={{ fontWeight: 500 }}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Spacer to prevent content from going under fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default OpefNavbar;
