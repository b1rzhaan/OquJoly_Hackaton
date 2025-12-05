import { MapPin, TrendingUp, Banknote, GraduationCap } from 'lucide-react';
import { University } from '../data/universities';

interface UniversityCardProps {
  university: University;
  onClick: () => void;
  onCompare?: () => void;
  showCompareButton?: boolean;
}

export function UniversityCard({ university, onClick, onCompare, showCompareButton = true }: UniversityCardProps) {
  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'bg-green-100 text-green-700 border-green-200';
    if (grade.startsWith('B')) return 'bg-blue-100 text-blue-700 border-blue-200';
    if (grade.startsWith('C')) return 'bg-yellow-100 text-yellow-700 border-yellow-200';
    return 'bg-gray-100 text-gray-700 border-gray-200';
  };

  const getChanceColor = (chance: string) => {
    if (chance === 'Высокий') return 'text-green-600';
    if (chance === 'Средний') return 'text-blue-600';
    return 'text-orange-600';
  };

  return (
    <div 
      className="bg-white rounded-xl border border-border hover:shadow-lg transition-all duration-300 overflow-hidden cursor-pointer group"
      onClick={onClick}
    >
      {/* University Logo & Header */}
      <div className="p-6 border-b border-border">
        <div className="flex items-start gap-4">
          <img 
            src={university.logo} 
            alt={university.name}
            className="w-16 h-16 rounded-lg object-cover border border-border"
          />
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2 mb-2">
              <h3 className="group-hover:text-primary transition-colors">
                {university.name}
              </h3>
              <span className={`px-3 py-1 rounded-lg border text-sm shrink-0 ${getGradeColor(university.overallGrade)}`}>
                {university.overallGrade}
              </span>
            </div>
            <div className="flex items-center gap-2 text-text-secondary">
              <MapPin size={16} />
              <span>{university.city}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Key Facts */}
      <div className="p-6 space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center shrink-0">
              <Banknote size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-xs text-text-secondary">Стоимость</div>
              <div className="text-sm">
                {(university.tuition.min / 1000000).toFixed(1)}-{(university.tuition.max / 1000000).toFixed(1)} млн ₸
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-green-50 flex items-center justify-center shrink-0">
              <GraduationCap size={20} className="text-secondary" />
            </div>
            <div>
              <div className="text-xs text-text-secondary">Средний балл ЕНТ</div>
              <div className="text-sm">{university.entScore.average}</div>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 bg-surface rounded-lg">
          <TrendingUp size={18} className={getChanceColor(university.admissionChance)} />
          <div>
            <span className="text-sm text-text-secondary">Шанс поступить: </span>
            <span className={`text-sm ${getChanceColor(university.admissionChance)}`}>
              {university.admissionChance}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2">
          {university.tags.slice(0, 3).map((tag) => (
            <span 
              key={tag}
              className="px-3 py-1 text-xs bg-blue-50 text-primary rounded-full"
            >
              {tag}
            </span>
          ))}
          {university.hasGrantProgram && (
            <span className="px-3 py-1 text-xs bg-green-50 text-green-700 rounded-full">
              Гранты доступны
            </span>
          )}
        </div>
      </div>

      {/* Actions */}
      {showCompareButton && (
        <div className="px-6 pb-6">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onCompare?.();
            }}
            className="w-full py-2 text-sm text-primary border border-primary rounded-lg hover:bg-blue-50 transition-colors"
          >
            Добавить в сравнение
          </button>
        </div>
      )}
    </div>
  );
}
