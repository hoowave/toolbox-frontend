export interface Link {
  text: string;
  url: string;
}

export interface Experience {
  id: number;
  title: string;
  date: string;
  role: string;
  description: string;
  details: string[];
  color: string;
}

export interface Project {
  id: number;
  title: string;
  date: string;
  description: string;
  subDescription?: string | string[];
  links: Link[];
  color: string;
} 