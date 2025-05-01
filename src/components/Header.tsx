import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, MessageSquare, User, LogOut } from 'lucide-react';
import CTAButton from './CTAButton';
import LoginButton from './LoginButton';

interface HeaderProps {
  isLoggedIn?: boolean;
  userInitial?: string;
  onLogin?: (userData: any) => void;
  onLogout?: () => void;
}

const Header: React.FC<HeaderProps> = ({ 
  isLoggedIn = false, 
  userInitial = '', 
  onLogin, 
  onLogout 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogin = (userData: any) => {
    if (onLogin) {
      onLogin(userData);
    }
    navigate('/dashboard');
  };

  const handleLogout = () => {
    setIsUserMenuOpen(false);
    if (onLogout) {
      onLogout();
    }
    // Navigate to home page after logout
    navigate('/');
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="relative">
              {/* Logo container with custom gradient bubble shape */}
              <motion.div 
                className="w-12 h-12 rounded-tr-2xl rounded-bl-2xl rounded-tl-lg rounded-br-lg bg-gradient-to-br from-primary-700 via-primary-600 to-tertiary-400 flex items-center justify-center shadow-lg relative"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                initial={{ rotate: 0 }}
                animate={{ 
                  rotate: [0, 2, 0, -2, 0],
                  boxShadow: [
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                    "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
                    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  ]
                }}
                transition={{ 
                  rotate: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  boxShadow: { duration: 2, repeat: Infinity, ease: "easeInOut" }
                }}
              >
                {/* Center speech bubble icon */}
                <MessageSquare size={24} className="text-white" />
                
                {/* Animated sound waves */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="absolute rounded-full border border-white/30"
                      initial={{ width: "30%", height: "30%", opacity: 0.8 }}
                      animate={{ 
                        width: ["30%", "100%"], 
                        height: ["30%", "100%"], 
                        opacity: [0.8, 0],
                        borderWidth: [1, 0.5]
                      }}
                      transition={{ 
                        duration: 2, 
                        repeat: Infinity, 
                        delay: i * 0.5,
                        ease: "easeOut"
                      }}
                    />
                  ))}
                </div>
                
                {/* Small audio dot indicator */}
                <motion.div 
                  className="absolute top-1 right-1 w-2 h-2 rounded-full bg-secondary-400"
                  animate={{ 
                    opacity: [1, 0.5, 1],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 1.5, 
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                />
              </motion.div>
            </div>
            
            {/* Text logo with gradient effect */}
            <motion.span 
              className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-700 to-tertiary-400 group-hover:from-primary-800 group-hover:to-tertiary-500 transition-all"
              whileHover={{ y: -2 }}
            >
              FinishTheList
            </motion.span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link to="/about" className="text-lg text-gray-700 hover:text-primary-700 font-medium transition-colors">
              About
            </Link>
            <Link to="/contact" className="text-lg text-gray-700 hover:text-primary-700 font-medium transition-colors">
              Contact
            </Link>
            <a href="#faq" className="text-lg text-gray-700 hover:text-primary-700 font-medium transition-colors">
              FAQ
            </a>
            
            {isLoggedIn ? (
              <div className="relative">
                <button 
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-700 to-tertiary-400 flex items-center justify-center text-white font-bold"
                >
                  {userInitial}
                </button>
                
                <AnimatePresence>
                  {isUserMenuOpen && (
                    <motion.div 
                      className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                    >
                      <Link 
                        to="/dashboard" 
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-100 flex items-center"
                        onClick={() => setIsUserMenuOpen(false)}
                      >
                        <User size={16} className="mr-2" />
                        Dashboard
                      </Link>
                      <button 
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-red-600 hover:bg-red-50 flex items-center"
                      >
                        <LogOut size={16} className="mr-2" />
                        Log Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <>
                <LoginButton 
                  onLoginSuccess={handleLogin} 
                />
                <CTAButton text="TRY FOR FREE" />
              </>
            )}
          </nav>

          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden text-gray-700" 
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            className="md:hidden bg-white/95 backdrop-blur-md py-4 px-6 shadow-lg"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.nav 
              className="flex flex-col space-y-4"
              initial="closed"
              animate="open"
              exit="closed"
              variants={{
                open: { transition: { staggerChildren: 0.1 } },
                closed: { transition: { staggerChildren: 0.05, staggerDirection: -1 } }
              }}
            >
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 }
                }}
              >
                <Link 
                  to="/about" 
                  className="text-gray-700 hover:text-primary-700 font-medium py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  About
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 }
                }}
              >
                <Link 
                  to="/contact" 
                  className="text-gray-700 hover:text-primary-700 font-medium py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Contact
                </Link>
              </motion.div>
              <motion.div
                variants={{
                  open: { opacity: 1, y: 0 },
                  closed: { opacity: 0, y: -10 }
                }}
              >
                <a 
                  href="#faq" 
                  className="text-gray-700 hover:text-primary-700 font-medium py-2 block"
                  onClick={() => setIsMenuOpen(false)}
                >
                  FAQ
                </a>
              </motion.div>
              
              {isLoggedIn ? (
                <>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <Link 
                      to="/dashboard" 
                      className="text-gray-700 hover:text-primary-700 font-medium py-2 block flex items-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <User size={16} className="mr-2" />
                      Dashboard
                    </Link>
                  </motion.div>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                  >
                    <button 
                      onClick={() => {
                        setIsMenuOpen(false);
                        handleLogout();
                      }}
                      className="text-red-600 hover:text-red-700 font-medium py-2 block flex items-center w-full text-left"
                    >
                      <LogOut size={16} className="mr-2" />
                      Log Out
                    </button>
                  </motion.div>
                </>
              ) : (
                <>
                  <motion.div
                    variants={{
                      open: { opacity: 1, y: 0 },
                      closed: { opacity: 0, y: -10 }
                    }}
                    className="flex flex-col space-y-3"
                  >
                    <LoginButton 
                      onLoginSuccess={(userData) => {
                        setIsMenuOpen(false);
                        handleLogin(userData);
                      }}
                      className="justify-center"
                    />
                    <CTAButton text="TRY FOR FREE" className="w-full justify-center" />
                  </motion.div>
                </>
              )}
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;