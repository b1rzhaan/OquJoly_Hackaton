import { Search } from 'lucide-react';
import { useState } from 'react';

interface HeroSectionProps {
  onSearch: (query: string) => void;
  onQuickFilter: (filter: string) => void;
}

export function HeroSection({ onSearch, onQuickFilter }: HeroSectionProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchQuery);
  };

  return (
    <div className="relative bg-gradient-to-br from-[#1e5a4a] via-[#2a6b5a] to-[#1e5a4a] overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Hero Image */}
        <div className="relative w-full h-[400px] lg:h-[500px] mb-12 rounded-3xl overflow-hidden shadow-2xl">
          <img
            src="https://images.unsplash.com/photo-1718569348592-cee8d389f3f2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx1bml2ZXJzaXR5JTIwY2FtcHVzJTIwc3R1ZGVudHMlMjBLYXpha2hzdGFufGVufDF8fHx8MTc2NDk0ODU5MHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
            alt="University Campus"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
        </div>

        {/* Content Section */}
        <div className="text-white text-center max-w-4xl mx-auto pb-16">
          <div className="mb-8">
            <div className="inline-block mb-4 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <span className="text-sm tracking-wide">🎓 ТВОЁ БУДУЩЕЕ НАЧИНАЕТСЯ ЗДЕСЬ</span>
            </div>
            
            <h1 className="mb-6 text-white leading-tight text-4xl lg:text-6xl">
              Найди свой идеальный университет
              <span className="block mt-2 text-4xl lg:text-5xl bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                в Казахстане
              </span>
            </h1>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSubmit} className="mb-6 max-w-3xl mx-auto">
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск университета или специальности..."
                className="w-full px-6 py-5 pl-14 rounded-2xl border-2 border-white/30 bg-white/15 backdrop-blur-md text-white text-lg placeholder-white/70 focus:border-white focus:outline-none focus:bg-white/25 transition-all shadow-xl"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-white/70" size={24} />
              <button
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 px-6 py-2.5 bg-white text-primary rounded-xl hover:bg-white/90 transition-all"
              >
                Найти
              </button>
            </div>
          </form>

          {/* Quick Filters */}
          <div className="max-w-3xl mx-auto">
            <p className="text-sm text-white/80 mb-3">Популярные поиски:</p>
            <div className="flex flex-wrap gap-3 justify-center">
              <button
                onClick={() => onQuickFilter('almaty')}
                className="px-5 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all duration-200 border border-white/40 hover:scale-105 hover:shadow-lg"
              >
                📍 Вузы Алматы
              </button>
              <button
                onClick={() => onQuickFilter('it')}
                className="px-5 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all duration-200 border border-white/40 hover:scale-105 hover:shadow-lg"
              >
                💻 IT специальности
              </button>
              <button
                onClick={() => onQuickFilter('grants')}
                className="px-5 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all duration-200 border border-white/40 hover:scale-105 hover:shadow-lg"
              >
                🎓 Гранты
              </button>
              <button
                onClick={() => onQuickFilter('dormitory')}
                className="px-5 py-3 bg-white/20 backdrop-blur-md hover:bg-white/30 text-white rounded-xl transition-all duration-200 border border-white/40 hover:scale-105 hover:shadow-lg"
              >
                🏠 С общежитием
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Separator at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full">
        <svg viewBox="0 0 1440 120" className="w-full h-auto" preserveAspectRatio="none">
          <path 
            fill="#f9fafb" 
            d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
          />
        </svg>
      </div>
    </div>
  );
}