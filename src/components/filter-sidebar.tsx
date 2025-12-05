import { useState } from 'react';
import { X } from 'lucide-react';

export interface FilterState {
  entScoreRange: [number, number];
  tuitionRange: [number, number];
  cities: string[];
  hasMilitaryDepartment: boolean;
  hasDormitory: boolean;
  hasGrantProgram: boolean;
}

interface FilterSidebarProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  availableCities: string[];
  isMobile?: boolean;
  onClose?: () => void;
}

export function FilterSidebar({ 
  filters, 
  onFilterChange, 
  availableCities,
  isMobile = false,
  onClose
}: FilterSidebarProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const handleFilterUpdate = (updates: Partial<FilterState>) => {
    const newFilters = { ...localFilters, ...updates };
    setLocalFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleCityToggle = (city: string) => {
    const newCities = localFilters.cities.includes(city)
      ? localFilters.cities.filter(c => c !== city)
      : [...localFilters.cities, city];
    handleFilterUpdate({ cities: newCities });
  };

  const resetFilters = () => {
    const defaultFilters: FilterState = {
      entScoreRange: [60, 140],
      tuitionRange: [0, 5000000],
      cities: [],
      hasMilitaryDepartment: false,
      hasDormitory: false,
      hasGrantProgram: false,
    };
    setLocalFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className={`bg-white rounded-xl border border-border p-6 ${isMobile ? 'h-full overflow-y-auto' : 'sticky top-6'}`}>
      <div className="flex items-center justify-between mb-6">
        <h4>Фильтры</h4>
        {isMobile && (
          <button onClick={onClose} className="p-2 hover:bg-surface rounded-lg">
            <X size={20} />
          </button>
        )}
      </div>

      {/* ENT Score Range */}
      <div className="mb-6">
        <label className="block mb-3 text-sm">
          Проходной балл ЕНТ: {localFilters.entScoreRange[0]} - {localFilters.entScoreRange[1]}
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="60"
            max="140"
            value={localFilters.entScoreRange[0]}
            onChange={(e) => handleFilterUpdate({ 
              entScoreRange: [Number(e.target.value), localFilters.entScoreRange[1]] 
            })}
            className="w-full accent-primary"
          />
          <input
            type="range"
            min="60"
            max="140"
            value={localFilters.entScoreRange[1]}
            onChange={(e) => handleFilterUpdate({ 
              entScoreRange: [localFilters.entScoreRange[0], Number(e.target.value)] 
            })}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Tuition Range */}
      <div className="mb-6">
        <label className="block mb-3 text-sm">
          Стоимость: {(localFilters.tuitionRange[0] / 1000000).toFixed(1)} - {(localFilters.tuitionRange[1] / 1000000).toFixed(1)} млн ₸
        </label>
        <div className="space-y-2">
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={localFilters.tuitionRange[0]}
            onChange={(e) => handleFilterUpdate({ 
              tuitionRange: [Number(e.target.value), localFilters.tuitionRange[1]] 
            })}
            className="w-full accent-primary"
          />
          <input
            type="range"
            min="0"
            max="5000000"
            step="100000"
            value={localFilters.tuitionRange[1]}
            onChange={(e) => handleFilterUpdate({ 
              tuitionRange: [localFilters.tuitionRange[0], Number(e.target.value)] 
            })}
            className="w-full accent-primary"
          />
        </div>
      </div>

      {/* Cities */}
      <div className="mb-6">
        <label className="block mb-3 text-sm">Город</label>
        <div className="space-y-2">
          {availableCities.map((city) => (
            <label key={city} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={localFilters.cities.includes(city)}
                onChange={() => handleCityToggle(city)}
                className="w-4 h-4 accent-primary"
              />
              <span className="text-sm">{city}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Additional Filters */}
      <div className="mb-6 space-y-2">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.hasDormitory}
            onChange={(e) => handleFilterUpdate({ hasDormitory: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm">Есть общежитие</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.hasGrantProgram}
            onChange={(e) => handleFilterUpdate({ hasGrantProgram: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm">Доступны гранты</span>
        </label>
        
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={localFilters.hasMilitaryDepartment}
            onChange={(e) => handleFilterUpdate({ hasMilitaryDepartment: e.target.checked })}
            className="w-4 h-4 accent-primary"
          />
          <span className="text-sm">Военная кафедра</span>
        </label>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2 text-sm text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors"
      >
        Сбросить фильтры
      </button>
    </div>
  );
}
