import { NavLink } from 'react-router-dom';
import { Home, Clock, BarChart3 } from 'lucide-react';
import logoImg from '../assets/logo.png';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 backdrop-blur-md border-b border-[#e5e4e7] px-6 py-4 flex items-center justify-between">
      {/* Left side: Brand Logo */}
      <NavLink to="/" className="flex items-center gap-2 hover:opacity-90 transition-opacity">
        <img 
          src={logoImg} 
          alt="KeenKeeper Logo" 
          className="h-8 w-auto"
        />
      </NavLink>

      {/* Right side: Navigation Links */}
      <nav className="flex items-center gap-4">
        <NavLink 
          to="/" 
          end
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-2 px-4 py-2 bg-[#1e463a] text-white rounded-md font-medium transition-all shadow-sm" 
              : "flex items-center gap-2 px-3 py-2 text-[#6b6375] hover:text-[#1e463a] hover:bg-[#1e463a]/5 rounded-md transition-all font-medium"
          }
        >
          <Home size={18} />
          <span>Home</span>
        </NavLink>

        <NavLink 
          to="/timeline" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-2 px-4 py-2 bg-[#1e463a] text-white rounded-md font-medium transition-all shadow-sm" 
              : "flex items-center gap-2 px-3 py-2 text-[#6b6375] hover:text-[#1e463a] hover:bg-[#1e463a]/5 rounded-md transition-all font-medium"
          }
        >
          <Clock size={18} />
          <span>Timeline</span>
        </NavLink>

        <NavLink 
          to="/stats" 
          className={({ isActive }) => 
            isActive 
              ? "flex items-center gap-2 px-4 py-2 bg-[#1e463a] text-white rounded-md font-medium transition-all shadow-sm" 
              : "flex items-center gap-2 px-3 py-2 text-[#6b6375] hover:text-[#1e463a] hover:bg-[#1e463a]/5 rounded-md transition-all font-medium"
          }
        >
          <BarChart3 size={18} />
          <span>Stats</span>
        </NavLink>
      </nav>
    </header>
  );
};

export default Navbar;
