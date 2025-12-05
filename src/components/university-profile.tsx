import { useState } from 'react';
import { ArrowLeft, MapPin, Users, Calendar, TrendingUp, Star, ExternalLink, Home as HomeIcon } from 'lucide-react';
import { ReportCard } from './report-card';
import { University } from '../data/universities';

interface UniversityProfileProps {
  university: University;
  onBack: () => void;
  onNavigateHome: () => void;
}

export function UniversityProfile({ university, onBack, onNavigateHome }: UniversityProfileProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'admissions' | 'reviews'>('overview');

  return (
    <div className="min-h-screen bg-surface">
      {/* Header Navigation */}
      <div className="bg-white border-b border-border sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center gap-4">
          <button
            onClick={onBack}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            onClick={onNavigateHome}
            className="p-2 hover:bg-surface rounded-lg transition-colors"
          >
            <HomeIcon size={20} />
          </button>
          <div className="flex-1">
            <h5>{university.name}</h5>
          </div>
          <button className="px-6 py-3 bg-primary text-white rounded-xl hover:bg-primary-dark transition-colors">
            Подать заявку
          </button>
        </div>
      </div>

      {/* Cover Image & Header */}
      <div className="relative h-80 bg-gradient-to-br from-blue-600 to-purple-600 overflow-hidden">
        <img 
          src={university.coverImage} 
          alt={university.name}
          className="w-full h-full object-cover opacity-60"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="max-w-7xl mx-auto flex items-end gap-6">
            <img 
              src={university.logo}
              alt={university.name}
              className="w-24 h-24 rounded-2xl border-4 border-white shadow-xl bg-white"
            />
            <div className="flex-1 text-white pb-2">
              <h2 className="mb-2">{university.name}</h2>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <MapPin size={16} />
                  <span>{university.city}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users size={16} />
                  <span>{university.facts.studentsCount.toLocaleString()} студентов</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar size={16} />
                  <span>Основан в {university.facts.foundedYear}</span>
                </div>
              </div>
            </div>
            <div className="bg-white text-primary px-6 py-3 rounded-xl shadow-lg">
              <div className="text-sm text-text-secondary">Общая оценка</div>
              <div className="text-3xl">{university.overallGrade}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white border-b border-border sticky top-[73px] z-30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex gap-8">
            {[
              { id: 'overview' as const, label: 'Обзор' },
              { id: 'admissions' as const, label: 'Поступление' },
              { id: 'reviews' as const, label: 'Отзывы' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 border-b-2 transition-colors ${
                  activeTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Facts */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <TrendingUp className="text-primary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl">{university.facts.employmentRate}%</div>
                    <div className="text-sm text-text-secondary">Трудоустройство</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center">
                    <Star className="text-secondary" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl">{university.grantProbability}%</div>
                    <div className="text-sm text-text-secondary">Вероятность гранта</div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-6">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-12 h-12 bg-purple-50 rounded-xl flex items-center justify-center">
                    <Users className="text-purple-600" size={24} />
                  </div>
                  <div>
                    <div className="text-2xl">{university.entScore.average}</div>
                    <div className="text-sm text-text-secondary">Средний балл ЕНТ</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Report Card */}
            <ReportCard grades={university.reportCard} />

            {/* Description & Popular Majors */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white rounded-xl border border-border p-8">
                <h4 className="mb-4">О университете</h4>
                <p className="text-text-secondary leading-relaxed mb-6">
                  {university.description}
                </p>
                
                <h5 className="mb-3">Популярные специальности</h5>
                <div className="flex flex-wrap gap-2">
                  {university.popularMajors.map((major) => (
                    <span 
                      key={major}
                      className="px-4 py-2 bg-blue-50 text-primary rounded-lg"
                    >
                      {major}
                    </span>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-xl border border-border p-6">
                <h5 className="mb-4">Особенности</h5>
                <div className="space-y-3">
                  {university.hasGrantProgram && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Грантовые программы</span>
                    </div>
                  )}
                  {university.hasDormitory && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Общежитие</span>
                    </div>
                  )}
                  {university.hasMilitaryDepartment && (
                    <div className="flex items-center gap-2 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <span>Военная кафедра</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'admissions' && (
          <div className="space-y-8">
            {/* Admissions Stats */}
            <div className="bg-white rounded-xl border border-border p-8">
              <h3 className="mb-6">Статистика поступления</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                <div>
                  <div className="text-sm text-text-secondary mb-2">Минимальный балл ЕНТ</div>
                  <div className="text-3xl mb-4">{university.entScore.min}</div>
                  <div className="text-sm text-text-secondary mb-2">Средний балл поступивших</div>
                  <div className="text-3xl">{university.entScore.average}</div>
                </div>

                <div>
                  <div className="text-sm text-text-secondary mb-2">Стоимость обучения в год</div>
                  <div className="text-3xl mb-2">
                    {(university.tuition.min / 1000000).toFixed(1)} - {(university.tuition.max / 1000000).toFixed(1)} млн ₸
                  </div>
                  <div className="text-sm text-text-muted">
                    В зависимости от специальности
                  </div>
                </div>
              </div>

              {/* ENT Score Chart */}
              <div className="bg-surface rounded-xl p-6">
                <h5 className="mb-4">Твой балл vs Средний балл поступивших</h5>
                <div className="relative h-48 flex items-end gap-2">
                  <div className="flex-1 bg-blue-200 rounded-t-lg" style={{ height: '60%' }}>
                    <div className="text-center pt-2 text-sm">Минимум: {university.entScore.min}</div>
                  </div>
                  <div className="flex-1 bg-primary rounded-t-lg" style={{ height: '80%' }}>
                    <div className="text-center pt-2 text-sm text-white">Средний: {university.entScore.average}</div>
                  </div>
                  <div className="flex-1 bg-green-500 rounded-t-lg" style={{ height: '95%' }}>
                    <div className="text-center pt-2 text-sm text-white">Топ 10%: {university.entScore.average + 10}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grant Probability */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl border border-green-200 p-8">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 bg-secondary rounded-2xl flex items-center justify-center text-white">
                  <TrendingUp size={32} />
                </div>
                <div>
                  <h4>Вероятность получения гранта</h4>
                  <div className="text-3xl text-secondary">{university.grantProbability}%</div>
                </div>
              </div>
              <p className="text-text-secondary">
                На основе данных о поступлении за последние 3 года и количестве доступных грантов
              </p>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6">
            <div className="bg-white rounded-xl border border-border p-8">
              <h3 className="mb-6">Отзывы студентов</h3>
              
              <div className="space-y-6">
                {university.studentReviews.map((review) => (
                  <div key={review.id} className="pb-6 border-b border-border last:border-0">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-primary text-white rounded-full flex items-center justify-center">
                        {review.author.charAt(0)}
                      </div>
                      <div>
                        <div>{review.author}</div>
                        <div className="text-sm text-text-secondary">{review.date}</div>
                      </div>
                      <div className="ml-auto flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={16}
                            className={i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
                          />
                        ))}
                      </div>
                    </div>
                    
                    <p className="mb-3 text-text-secondary">{review.text}</p>
                    
                    <div className="flex flex-wrap gap-2">
                      {review.tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-3 py-1 text-xs bg-surface border border-border rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-6 py-3 border border-primary text-primary rounded-xl hover:bg-blue-50 transition-colors">
                Показать больше отзывов
              </button>
            </div>

            {/* Popular Tags */}
            <div className="bg-white rounded-xl border border-border p-8">
              <h4 className="mb-4">Часто упоминаемые теги</h4>
              <div className="flex flex-wrap gap-3">
                {['Хороший Wi-Fi', 'Строгие преподы', 'Современные лаборатории', 'Вкусная еда', 
                  'Много практики', 'Хорошая библиотека', 'Активная студенческая жизнь'].map((tag) => (
                  <span 
                    key={tag}
                    className="px-4 py-2 bg-surface border border-border rounded-full hover:border-primary cursor-pointer transition-colors"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
