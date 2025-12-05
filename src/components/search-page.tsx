import { useState, useEffect } from 'react';
import { FilterSidebar, FilterState } from './filter-sidebar';
import { UniversityCard } from './university-card';
import { universities, cities } from '../data/universities';
import { Search, SlidersHorizontal, X } from 'lucide-react';
import { University } from '../data/universities';

interface SearchPageProps {
  onNavigateToUniversity: (id: string) => void;
  initialFilter?: string;
}

export function SearchPage({ onNavigateToUniversity, initialFilter }: SearchPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [comparisonList, setComparisonList] = useState<string[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    entScoreRange: [60, 140],
    tuitionRange: [0, 5000000],
    cities: [],
    hasMilitaryDepartment: false,
    hasDormitory: false,
    hasGrantProgram: false,
  });

  // Apply initial filter
  useEffect(() => {
    if (initialFilter) {
      switch (initialFilter) {
        case 'almaty':
          setFilters(prev => ({ ...prev, cities: ['Алматы'] }));
          break;
        case 'it':
          setSearchQuery('IT');
          break;
        case 'dormitory':
          setFilters(prev => ({ ...prev, hasDormitory: true }));
          break;
        case 'grants':
          setFilters(prev => ({ ...prev, hasGrantProgram: true }));
          break;
        default:
          setSearchQuery(initialFilter);
      }
    }
  }, [initialFilter]);

  const filteredUniversities = universities.filter((uni) => {
    // Search query filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesName = uni.name.toLowerCase().includes(query) || 
                         uni.nameKz.toLowerCase().includes(query);
      const matchesMajor = uni.popularMajors.some(m => m.toLowerCase().includes(query));
      const matchesTags = uni.tags.some(t => t.toLowerCase().includes(query));
      
      if (!matchesName && !matchesMajor && !matchesTags) return false;
    }

    // ENT Score filter
    if (uni.entScore.average < filters.entScoreRange[0] || 
        uni.entScore.average > filters.entScoreRange[1]) {
      return false;
    }

    // Tuition filter
    if (uni.tuition.min > filters.tuitionRange[1] || 
        uni.tuition.max < filters.tuitionRange[0]) {
      return false;
    }

    // City filter
    if (filters.cities.length > 0 && !filters.cities.includes(uni.city)) {
      return false;
    }

    // Additional filters
    if (filters.hasDormitory && !uni.hasDormitory) return false;
    if (filters.hasGrantProgram && !uni.hasGrantProgram) return false;
    if (filters.hasMilitaryDepartment && !uni.hasMilitaryDepartment) return false;

    return true;
  });

  const handleAddToComparison = (id: string) => {
    if (comparisonList.includes(id)) {
      setComparisonList(comparisonList.filter(uid => uid !== id));
    } else if (comparisonList.length < 3) {
      setComparisonList([...comparisonList, id]);
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      {/* Header with Search */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted" size={20} />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск по названию или специальности..."
                className="w-full pl-12 pr-4 py-3 rounded-xl border border-border focus:border-primary focus:outline-none"
              />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="lg:hidden px-4 py-3 bg-primary text-white rounded-xl flex items-center gap-2"
            >
              <SlidersHorizontal size={20} />
              Фильтры
            </button>
          </div>

          {/* Results count */}
          <div className="mt-4 text-sm text-text-secondary">
            Найдено {filteredUniversities.length} {filteredUniversities.length === 1 ? 'университет' : 'университетов'}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-8">
          {/* Filters Sidebar - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <FilterSidebar
              filters={filters}
              onFilterChange={setFilters}
              availableCities={cities}
            />
          </aside>

          {/* Filters Sidebar - Mobile */}
          {showFilters && (
            <div className="lg:hidden fixed inset-0 bg-black/50 z-50" onClick={() => setShowFilters(false)}>
              <div className="absolute right-0 top-0 h-full w-80 bg-white" onClick={(e) => e.stopPropagation()}>
                <FilterSidebar
                  filters={filters}
                  onFilterChange={setFilters}
                  availableCities={cities}
                  isMobile
                  onClose={() => setShowFilters(false)}
                />
              </div>
            </div>
          )}

          {/* University Cards */}
          <div className="flex-1">
            {comparisonList.length > 0 && (
              <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-sm">
                      Выбрано для сравнения: {comparisonList.length}/3
                    </span>
                  </div>
                  <button
                    className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors text-sm"
                  >
                    Сравнить
                  </button>
                </div>
              </div>
            )}

            {filteredUniversities.length === 0 ? (
              <div className="text-center py-16">
                <div className="w-16 h-16 bg-surface rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} className="text-text-muted" />
                </div>
                <h4 className="mb-2">Университеты не найдены</h4>
                <p className="text-text-secondary">
                  Попробуйте изменить параметры поиска или фильтры
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredUniversities.map((university) => (
                  <UniversityCard
                    key={university.id}
                    university={university}
                    onClick={() => onNavigateToUniversity(university.id)}
                    onCompare={() => handleAddToComparison(university.id)}
                    showCompareButton={true}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
