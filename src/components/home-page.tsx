import { HeroSection } from './hero-section';
import { UniversityCard } from './university-card';
import { MapSection } from './map-section';
import { topITUniversities, topMedicalUniversities } from '../data/universities';
import { Star, TrendingUp, Users } from 'lucide-react';

interface HomePageProps {
  onNavigateToSearch: (filter?: string) => void;
  onNavigateToUniversity: (id: string) => void;
}

export function HomePage({ onNavigateToSearch, onNavigateToUniversity }: HomePageProps) {
  const handleQuickFilter = (filter: string) => {
    onNavigateToSearch(filter);
  };

  const handleSearch = (query: string) => {
    onNavigateToSearch(query);
  };

  const handleCityClick = (city: string) => {
    onNavigateToSearch(city.toLowerCase());
  };

  const handleUniversityClickFromMap = (id: string) => {
    onNavigateToUniversity(id);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <HeroSection onSearch={handleSearch} onQuickFilter={handleQuickFilter} />

      {/* Featured Collections */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Info Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <div className="text-center p-8 bg-white rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Star size={32} className="text-primary" />
            </div>
            <h4 className="mb-2">120+ Университетов</h4>
            <p className="text-text-secondary">
              Полная база данных всех университетов Казахстана
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-green-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} className="text-secondary" />
            </div>
            <h4 className="mb-2">Реальные отзывы</h4>
            <p className="text-text-secondary">
              Читай мнения студентов и выпускников о вузах
            </p>
          </div>

          <div className="text-center p-8 bg-white rounded-2xl border border-border hover:shadow-lg transition-shadow">
            <div className="w-16 h-16 bg-purple-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <Users size={32} className="text-purple-600" />
            </div>
            <h4 className="mb-2">Интерактивная карта</h4>
            <p className="text-text-secondary">
              Найди университеты на карте и изучи возможности
            </p>
          </div>
        </div>

        {/* Top IT Universities */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Топ-5 вузов по IT</h2>
              <p className="text-text-secondary">
                Лучшие технические университеты с программами по информационным технологиям
              </p>
            </div>
            <button 
              onClick={() => onNavigateToSearch('it')}
              className="px-6 py-3 text-primary border border-primary rounded-xl hover:bg-blue-50 transition-colors"
            >
              Показать все
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topITUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onClick={() => onNavigateToUniversity(university.id)}
                showCompareButton={false}
              />
            ))}
          </div>
        </section>

        {/* Top Medical Universities */}
        <section className="mb-16">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="mb-2">Лучшие медицинские вузы</h2>
              <p className="text-text-secondary">
                Ведущие университеты с медицинскими программами
              </p>
            </div>
            <button 
              onClick={() => onNavigateToSearch('medical')}
              className="px-6 py-3 text-primary border border-primary rounded-xl hover:bg-blue-50 transition-colors"
            >
              Показать все
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topMedicalUniversities.map((university) => (
              <UniversityCard
                key={university.id}
                university={university}
                onClick={() => onNavigateToUniversity(university.id)}
                showCompareButton={false}
              />
            ))}
          </div>
        </section>

        {/* Map Section with 2GIS */}
        <MapSection onCityClick={handleCityClick} onUniversityClick={handleUniversityClickFromMap} />
      </div>
    </div>
  );
}