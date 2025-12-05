interface ReportCardProps {
  grades: {
    academics: string;
    dormitories: string;
    studentLife: string;
    dining: string;
    safety: string;
    location: string;
  };
}

export function ReportCard({ grades }: ReportCardProps) {
  const categories = [
    { key: 'academics' as const, label: 'Академическая часть', icon: '📚' },
    { key: 'dormitories' as const, label: 'Общежития', icon: '🏠' },
    { key: 'studentLife' as const, label: 'Студенческая жизнь', icon: '🎉' },
    { key: 'dining' as const, label: 'Питание в столовой', icon: '🍽️' },
    { key: 'safety' as const, label: 'Безопасность', icon: '🛡️' },
    { key: 'location' as const, label: 'Расположение', icon: '📍' },
  ];

  const getGradeColor = (grade: string) => {
    if (grade === 'N/A') return 'bg-gray-100 text-gray-500 border-gray-200';
    if (grade.startsWith('A')) return 'bg-gradient-to-br from-green-500 to-green-600 text-white border-green-600';
    if (grade.startsWith('B')) return 'bg-gradient-to-br from-blue-500 to-blue-600 text-white border-blue-600';
    if (grade.startsWith('C')) return 'bg-gradient-to-br from-yellow-500 to-yellow-600 text-white border-yellow-600';
    if (grade.startsWith('D')) return 'bg-gradient-to-br from-orange-500 to-orange-600 text-white border-orange-600';
    return 'bg-gradient-to-br from-red-500 to-red-600 text-white border-red-600';
  };

  const getGradeDescription = (grade: string) => {
    if (grade === 'N/A') return 'Не применимо';
    if (grade.startsWith('A')) return 'Отлично';
    if (grade.startsWith('B')) return 'Хорошо';
    if (grade.startsWith('C')) return 'Удовлетворительно';
    if (grade.startsWith('D')) return 'Ниже среднего';
    return 'Плохо';
  };

  return (
    <div className="bg-white rounded-2xl border border-border p-8">
      <div className="mb-6">
        <h3 className="mb-2">Табель успеваемости</h3>
        <p className="text-text-secondary">
          Оценка университета по ключевым показателям на основе отзывов студентов и официальных данных
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((category) => {
          const grade = grades[category.key];
          return (
            <div 
              key={category.key}
              className="p-5 rounded-xl border border-border hover:shadow-md transition-all duration-200 bg-surface"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{category.icon}</span>
                  <div>
                    <div className="text-sm text-text-secondary">{category.label}</div>
                  </div>
                </div>
                <div className={`w-16 h-16 rounded-xl border-2 flex items-center justify-center ${getGradeColor(grade)} shadow-md`}>
                  <span className="text-2xl">{grade}</span>
                </div>
              </div>
              <div className="text-xs text-text-muted">
                {getGradeDescription(grade)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
