export interface Report {
  id: string;
  title: string;
  type: 'vandalism' | 'erosion' | 'crack' | 'other';
  description: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'new' | 'processing' | 'closed';
  imageUrl: string;
  date: string;
  has3D: boolean;
  sketchfabId?: string;
}

// Atyrau region coordinates
export const initialReports: Report[] = [
  {
    id: 'report-001',
    title: 'Мавзолей Акмечеть — береговая эрозия',
    type: 'erosion',
    description: 'Активная эрозия берега реки Урал угрожает археологическому памятнику. Требуется срочный мониторинг и укрепление.',
    location: {
      lat: 46.9519,
      lng: 51.9234,
      address: 'Атырауская область, берег реки Урал',
    },
    status: 'new',
    imageUrl: '/placeholder.svg',
    date: '2024-01-15',
    has3D: true,
    sketchfabId: '9e5af82945d84c7bb0c0a4b92813927e',
  },
  {
    id: 'report-002',
    title: 'Исторический некрополь — вандализм',
    type: 'vandalism',
    description: 'Обнаружены следы вандализма на территории исторического некрополя. Надписи на камнях, повреждение ограждения.',
    location: {
      lat: 46.9678,
      lng: 51.8876,
      address: 'Атырау, историческая часть города',
    },
    status: 'processing',
    imageUrl: '/placeholder.svg',
    date: '2024-01-10',
    has3D: false,
  },
  {
    id: 'report-003',
    title: 'Караван-сарай — трещины в стенах',
    type: 'crack',
    description: 'Обнаружены структурные трещины в стенах древнего караван-сарая. Проведён первичный осмотр, угрозы обрушения нет.',
    location: {
      lat: 46.9432,
      lng: 51.9567,
      address: 'Атырауская область, торговый путь',
    },
    status: 'closed',
    imageUrl: '/placeholder.svg',
    date: '2023-12-20',
    has3D: true,
    sketchfabId: '9e5af82945d84c7bb0c0a4b92813927e',
  },
  {
    id: 'report-004',
    title: 'Прибрежное поселение — климатический риск',
    type: 'erosion',
    description: 'Береговая эрозия Каспийского моря угрожает остаткам древнего поселения. Рекомендуется срочная оцифровка.',
    location: {
      lat: 46.8234,
      lng: 51.7654,
      address: 'Побережье Каспийского моря',
    },
    status: 'new',
    imageUrl: '/placeholder.svg',
    date: '2024-01-18',
    has3D: false,
  },
];

export const problemTypes = [
  { value: 'vandalism', label: 'Вандализм' },
  { value: 'erosion', label: 'Эрозия' },
  { value: 'crack', label: 'Трещина' },
  { value: 'other', label: 'Прочее' },
];

export const statusLabels: Record<Report['status'], string> = {
  new: 'Новое',
  processing: 'В обработке',
  closed: 'Закрыто',
};

export const getStatusClass = (status: Report['status']) => {
  switch (status) {
    case 'new':
      return 'status-new';
    case 'processing':
      return 'status-processing';
    case 'closed':
      return 'status-closed';
  }
};
