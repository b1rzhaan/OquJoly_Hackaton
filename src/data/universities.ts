export interface University {
  id: string;
  name: string;
  nameKz: string;
  city: string;
  logo: string;
  coverImage: string;
  overallGrade: string;
  tuition: {
    min: number;
    max: number;
  };
  entScore: {
    min: number;
    average: number;
  };
  hasGrantProgram: boolean;
  hasDormitory: boolean;
  hasMilitaryDepartment: boolean;
  grantProbability: number;
  admissionChance: 'Высокий' | 'Средний' | 'Низкий';
  tags: string[];
  reportCard: {
    academics: string;
    dormitories: string;
    studentLife: string;
    dining: string;
    safety: string;
    location: string;
  };
  description: string;
  studentReviews: Array<{
    id: string;
    rating: number;
    text: string;
    tags: string[];
    author: string;
    date: string;
  }>;
  facts: {
    studentsCount: number;
    foundedYear: number;
    employmentRate: number;
  };
  popularMajors: string[];
}

export const universities: University[] = [
  {
    id: '1',
    name: 'Казахстанско-Британский Технический Университет',
    nameKz: 'ҚБТУ',
    city: 'Алматы',
    logo: 'https://images.unsplash.com/photo-1562774053-701939374585?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200&h=400&fit=crop',
    overallGrade: 'A+',
    tuition: {
      min: 1800000,
      max: 2500000,
    },
    entScore: {
      min: 110,
      average: 118,
    },
    hasGrantProgram: true,
    hasDormitory: true,
    hasMilitaryDepartment: false,
    grantProbability: 78,
    admissionChance: 'Средний',
    tags: ['IT', 'Инженерия', 'Английский язык'],
    reportCard: {
      academics: 'A+',
      dormitories: 'A-',
      studentLife: 'A',
      dining: 'B+',
      safety: 'A',
      location: 'A+',
    },
    description: 'Ведущий технический университет с программами на английском языке',
    studentReviews: [
      {
        id: 'r1',
        rating: 5,
        text: 'Отличные преподаватели и современное оборудование',
        tags: ['Хороший Wi-Fi', 'Современные лаборатории', 'Сильная программа'],
        author: 'Асель К.',
        date: '2024-11-15',
      },
      {
        id: 'r2',
        rating: 4,
        text: 'Качественное образование, но высокая нагрузка',
        tags: ['Строгие преподы', 'Много практики', 'Хорошая библиотека'],
        author: 'Данияр М.',
        date: '2024-10-20',
      },
    ],
    facts: {
      studentsCount: 6500,
      foundedYear: 2001,
      employmentRate: 89,
    },
    popularMajors: ['Computer Science', 'Petroleum Engineering', 'Chemical Engineering'],
  },
  {
    id: '2',
    name: 'Назарбаев Университет',
    nameKz: 'Назарбаев Университеті',
    city: 'Астана',
    logo: 'https://images.unsplash.com/photo-1599305445671-ac291c95aaa9?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1498243691581-b145c3f54a5a?w=1200&h=400&fit=crop',
    overallGrade: 'A+',
    tuition: {
      min: 0,
      max: 3000000,
    },
    entScore: {
      min: 125,
      average: 133,
    },
    hasGrantProgram: true,
    hasDormitory: true,
    hasMilitaryDepartment: false,
    grantProbability: 45,
    admissionChance: 'Низкий',
    tags: ['Исследования', 'IT', 'Международный'],
    reportCard: {
      academics: 'A+',
      dormitories: 'A+',
      studentLife: 'A',
      dining: 'A-',
      safety: 'A+',
      location: 'A',
    },
    description: 'Автономный университет исследовательского типа с международными стандартами',
    studentReviews: [
      {
        id: 'r3',
        rating: 5,
        text: 'Лучший университет в Казахстане, невероятные возможности',
        tags: ['Отличные общежития', 'Международные преподаватели', 'Много стипендий'],
        author: 'Айдар Б.',
        date: '2024-11-28',
      },
    ],
    facts: {
      studentsCount: 4000,
      foundedYear: 2010,
      employmentRate: 94,
    },
    popularMajors: ['Computer Science', 'Medicine', 'Mining Engineering'],
  },
  {
    id: '3',
    name: 'Казахский Национальный Университет им. аль-Фараби',
    nameKz: 'Әл-Фараби атындағы ҚазҰУ',
    city: 'Алматы',
    logo: 'https://images.unsplash.com/photo-1571260899304-425eee4c7efc?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?w=1200&h=400&fit=crop',
    overallGrade: 'A',
    tuition: {
      min: 800000,
      max: 1500000,
    },
    entScore: {
      min: 95,
      average: 105,
    },
    hasGrantProgram: true,
    hasDormitory: true,
    hasMilitaryDepartment: true,
    grantProbability: 65,
    admissionChance: 'Высокий',
    tags: ['Классический', 'Много специальностей', 'Гранты'],
    reportCard: {
      academics: 'A',
      dormitories: 'B',
      studentLife: 'A+',
      dining: 'B-',
      safety: 'B+',
      location: 'A+',
    },
    description: 'Крупнейший классический университет Казахстана с богатой историей',
    studentReviews: [
      {
        id: 'r4',
        rating: 4,
        text: 'Большой выбор специальностей и активная студенческая жизнь',
        tags: ['Много мероприятий', 'Разные специальности', 'Хорошая локация'],
        author: 'Камила Т.',
        date: '2024-11-10',
      },
    ],
    facts: {
      studentsCount: 20000,
      foundedYear: 1934,
      employmentRate: 76,
    },
    popularMajors: ['Международные отношения', 'Журналистика', 'Математика'],
  },
  {
    id: '4',
    name: 'Казахстанский Национальный Медицинский Университет',
    nameKz: 'ҚазҰМУ',
    city: 'Алматы',
    logo: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=1200&h=400&fit=crop',
    overallGrade: 'A',
    tuition: {
      min: 1200000,
      max: 2000000,
    },
    entScore: {
      min: 108,
      average: 115,
    },
    hasGrantProgram: true,
    hasDormitory: true,
    hasMilitaryDepartment: false,
    grantProbability: 58,
    admissionChance: 'Средний',
    tags: ['Медицина', 'Клиническая база', 'Практика'],
    reportCard: {
      academics: 'A+',
      dormitories: 'B+',
      studentLife: 'B',
      dining: 'C+',
      safety: 'A',
      location: 'A',
    },
    description: 'Ведущий медицинский вуз с собственными клиниками',
    studentReviews: [
      {
        id: 'r5',
        rating: 4,
        text: 'Отличная практика в клиниках, но очень сложная программа',
        tags: ['Строгие преподы', 'Много практики', 'Современное оборудование'],
        author: 'Ерлан С.',
        date: '2024-10-05',
      },
    ],
    facts: {
      studentsCount: 8500,
      foundedYear: 1931,
      employmentRate: 88,
    },
    popularMajors: ['Общая медицина', 'Стоматология', 'Фармация'],
  },
  {
    id: '5',
    name: 'КИМЭП',
    nameKz: 'KIMEP University',
    city: 'Алматы',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=1200&h=400&fit=crop',
    overallGrade: 'A',
    tuition: {
      min: 2200000,
      max: 3000000,
    },
    entScore: {
      min: 100,
      average: 110,
    },
    hasGrantProgram: true,
    hasDormitory: false,
    hasMilitaryDepartment: false,
    grantProbability: 40,
    admissionChance: 'Средний',
    tags: ['Бизнес', 'Английский язык', 'Международный'],
    reportCard: {
      academics: 'A',
      dormitories: 'N/A',
      studentLife: 'A-',
      dining: 'B',
      safety: 'A',
      location: 'A+',
    },
    description: 'Международный университет с фокусом на бизнес и экономику',
    studentReviews: [
      {
        id: 'r6',
        rating: 5,
        text: 'Отличные связи с бизнесом и возможности для карьеры',
        tags: ['Хороший Wi-Fi', 'Бизнес-связи', 'Международная среда'],
        author: 'Диана А.',
        date: '2024-11-20',
      },
    ],
    facts: {
      studentsCount: 3500,
      foundedYear: 1992,
      employmentRate: 85,
    },
    popularMajors: ['Business Administration', 'Finance', 'Marketing'],
  },
  {
    id: '6',
    name: 'Satbayev University',
    nameKz: 'Сәтбаев Университеті',
    city: 'Алматы',
    logo: 'https://images.unsplash.com/photo-1581092918484-8313e1f7e8d4?w=200&h=200&fit=crop',
    coverImage: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=1200&h=400&fit=crop',
    overallGrade: 'A-',
    tuition: {
      min: 900000,
      max: 1800000,
    },
    entScore: {
      min: 98,
      average: 108,
    },
    hasGrantProgram: true,
    hasDormitory: true,
    hasMilitaryDepartment: true,
    grantProbability: 70,
    admissionChance: 'Высокий',
    tags: ['IT', 'Инженерия', 'Гранты'],
    reportCard: {
      academics: 'A-',
      dormitories: 'B',
      studentLife: 'B+',
      dining: 'C',
      safety: 'B+',
      location: 'A',
    },
    description: 'Технический университет с сильными инженерными программами',
    studentReviews: [
      {
        id: 'r7',
        rating: 4,
        text: 'Хорошая техническая подготовка и доступные цены',
        tags: ['Доступная цена', 'Много грантов', 'Техническая база'],
        author: 'Нурлан К.',
        date: '2024-09-15',
      },
    ],
    facts: {
      studentsCount: 12000,
      foundedYear: 1934,
      employmentRate: 82,
    },
    popularMajors: ['Горное дело', 'IT', 'Нефтегазовое дело'],
  },
];

export const cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе'];

export const topITUniversities = universities.filter(u => 
  u.tags.includes('IT') || u.popularMajors.some(m => m.toLowerCase().includes('computer'))
).slice(0, 5);

export const topMedicalUniversities = universities.filter(u => 
  u.tags.includes('Медицина') || u.popularMajors.some(m => m.toLowerCase().includes('медицина'))
);
