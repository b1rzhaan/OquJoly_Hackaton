import { Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface HeaderProps {
  onLoginClick: () => void;
  onRegisterClick: () => void;
  onNavigateHome: () => void;
  currentPage: string;
}

export function Header({ onLoginClick, onRegisterClick, onNavigateHome, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Университеты', href: '#' },
    { name: 'Рейтинги', href: '#' },
    { name: 'Специальности', href: '#' },
    { name: 'Стипендии и гранты', href: '#' },
    { name: 'О платформе', href: '#' },
  ];

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <button 
            onClick={onNavigateHome}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <div className="text-2xl bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">OquJoly</div>
          </button>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6">
            {navigation.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-sm text-text-secondary hover:text-primary transition-colors"
              >
                {item.name}
              </a>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button className="p-2.5 hover:bg-blue-50 rounded-xl transition-all hover:scale-105">
              <Search size={20} className="text-text-secondary" />
            </button>
            
            <button
              onClick={onLoginClick}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm text-primary border-2 border-primary rounded-xl hover:bg-blue-50 transition-all hover:scale-105 hover:shadow-md"
            >
              <span>Войти</span>
            </button>
            
            <button
              onClick={onRegisterClick}
              className="hidden sm:flex items-center gap-2 px-6 py-2.5 text-sm bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 hover:from-blue-600 hover:to-primary"
            >
              <span>Зарегистрироваться</span>
            </button>

            <button 
              className="lg:hidden p-2 hover:bg-surface rounded-lg"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-4 border-t border-border">
            <nav className="space-y-2 mb-4">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block py-2 text-sm text-text-secondary hover:text-primary transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </nav>
            <div className="flex flex-col gap-2">
              <button
                onClick={onLoginClick}
                className="w-full px-5 py-2.5 text-sm text-primary border-2 border-primary rounded-xl hover:bg-blue-50 transition-colors"
              >
                Войти
              </button>
              <button
                onClick={onRegisterClick}
                className="w-full px-5 py-2.5 text-sm bg-gradient-to-r from-primary to-blue-600 text-white rounded-xl hover:shadow-lg transition-colors"
              >
                Зарегистрироваться
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
