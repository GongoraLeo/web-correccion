// FIX: Import `ReactNode` to resolve the 'Cannot find namespace React' error.
import type { ReactNode } from 'react';

export interface Service {
  title: string;
  description: string;
  icon: ReactNode;
}

export interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  date: string;
  fullContent: string;
}

export interface NewsArticle {
  title: string;
  summary: string;
  url?: string;
}