import { Report, initialReports } from './mockData';

const STORAGE_KEY = 'savearch_reports';

export const getReports = (): Report[] => {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    return JSON.parse(stored);
  }
  // Initialize with mock data
  localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
  return initialReports;
};

export const addReport = (report: Omit<Report, 'id' | 'date' | 'status'>): Report => {
  const reports = getReports();
  const newReport: Report = {
    ...report,
    id: `report-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
    status: 'new',
  };
  reports.push(newReport);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
  return newReport;
};

export const getReportById = (id: string): Report | undefined => {
  const reports = getReports();
  return reports.find((r) => r.id === id);
};

// Volunteers storage
const VOLUNTEERS_KEY = 'savearch_volunteers';

export interface Volunteer {
  id: string;
  name: string;
  email: string;
  city: string;
  interests: string;
  date: string;
}

export const addVolunteer = (data: Omit<Volunteer, 'id' | 'date'>): Volunteer => {
  const volunteers = getVolunteers();
  const newVolunteer: Volunteer = {
    ...data,
    id: `volunteer-${Date.now()}`,
    date: new Date().toISOString().split('T')[0],
  };
  volunteers.push(newVolunteer);
  localStorage.setItem(VOLUNTEERS_KEY, JSON.stringify(volunteers));
  return newVolunteer;
};

export const getVolunteers = (): Volunteer[] => {
  const stored = localStorage.getItem(VOLUNTEERS_KEY);
  return stored ? JSON.parse(stored) : [];
};

// Photo uploads storage
const UPLOADS_KEY = 'savearch_uploads';

export interface PhotoUpload {
  id: string;
  monumentName: string;
  photoCount: number;
  date: string;
  status: 'pending' | 'processing' | 'complete';
}

export const addPhotoUpload = (monumentName: string, photoCount: number): PhotoUpload => {
  const uploads = getPhotoUploads();
  const newUpload: PhotoUpload = {
    id: `upload-${Date.now()}`,
    monumentName,
    photoCount,
    date: new Date().toISOString().split('T')[0],
    status: 'pending',
  };
  uploads.push(newUpload);
  localStorage.setItem(UPLOADS_KEY, JSON.stringify(uploads));
  return newUpload;
};

export const getPhotoUploads = (): PhotoUpload[] => {
  const stored = localStorage.getItem(UPLOADS_KEY);
  return stored ? JSON.parse(stored) : [];
};
