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

export const initialReports: Report[] = [
  {
    id: 'report-001',
    title: 'Береговая эрозия — поселение (Тест)',
    type: 'erosion',
    description: 'Активная эрозия берега угрожает археологическому памятнику. Обнаружены следы древнего поселения, которые могут быть утрачены.',
    location: {
      lat: 55.7558,
      lng: 37.6173,
      address: 'Москва, набережная',
    },
    status: 'new',
    imageUrl: 'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=400&h=300&fit=crop',
    date: '2024-01-15',
    has3D: true,
    sketchfabId: '9e5af82945d84c7bb0c0a4b92813927e',
  },
  {
    id: 'report-002',
    title: 'Граффити на статуе — центр города',
    type: 'vandalism',
    description: 'Вандалы нанесли граффити на историческую статую в центре города. Требуется реставрация.',
    location: {
      lat: 55.7520,
      lng: 37.6175,
      address: 'Москва, центр',
    },
    status: 'processing',
    imageUrl: 'https://images.unsplash.com/photo-1564399580075-5dfe19c205f3?w=400&h=300&fit=crop',
    date: '2024-01-10',
    has3D: false,
  },
  {
    id: 'report-003',
    title: 'Трещина в стене — храм',
    type: 'crack',
    description: 'Обнаружена крупная трещина в стене древнего храма. Проведён мониторинг, угрозы обрушения нет.',
    location: {
      lat: 55.7600,
      lng: 37.6200,
      address: 'Москва, историческая часть',
    },
    status: 'closed',
    imageUrl: 'https://images.unsplash.com/photo-1548013146-72479768bada?w=400&h=300&fit=crop',
    date: '2023-12-20',
    has3D: true,
    sketchfabId: '9e5af82945d84c7bb0c0a4b92813927e',
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
