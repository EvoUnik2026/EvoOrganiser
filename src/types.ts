export type Language = 'en' | 'nl' | 'ar';
export type AppTheme = 'light' | 'dark' | 'system';
export type CalendarFormat = 'gregorian' | 'dual' | 'hijri';

export interface Subtask {
  id: string;
  title: string;
  completed: boolean;
}

export interface AttachedLink {
  id: string;
  title: string;
  url: string;
  domain: string;
  description: string;
  image?: string;
  type?: 'doc' | 'figma' | 'spec' | 'font';
}

export interface Task {
  id: string;
  title: string;
  completed: boolean;
  priority: 'high' | 'medium' | 'low';
  category: string;
  time?: string;
  dueDateCategory: 'today' | 'upcoming' | 'all';
  dueDateText?: string;
  dateStr?: string;
  subtasks: Subtask[];
  notes?: string;
  attachedLinks: AttachedLink[];
  locales?: string[];
  isRtl?: boolean;
  dirAttr?: string;
  discussSnippet?: string;
}

export interface LibraryItem {
  id: string;
  type: 'link' | 'note';
  title: string;
  tags: string[];
  starred: boolean;
  domain?: string;
  url?: string;
  image?: string;
  readTime?: string;
  taskBadge?: string;
  memoCategory?: string;
  content?: string;
  translationPairs?: Array<{ from: string; to: string }>;
  codeItems?: string[];
  noteBulletPoints?: string[];
  footerInfo?: string;
  specBadge?: string;
}

export interface UserProfile {
  name: string;
  email: string;
  avatar: string;
  isPro: boolean;
  cloudSync: boolean;
  lastSynced: string;
}

export interface AppSettings {
  language: Language;
  autoRtl: boolean;
  calendarFormat: CalendarFormat;
  theme: AppTheme;
  notifications: boolean;
  linkScraping: boolean;
  openInAppBrowser: boolean;
  arabicFont?: 'noto' | 'cairo' | 'ibm';
  numeralSystem?: 'western' | 'eastern';
}
