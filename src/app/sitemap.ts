import type { MetadataRoute } from 'next';

const SITE_URL = 'https://aadishjain.dev';

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    { url: `${SITE_URL}/`, lastModified, changeFrequency: 'monthly', priority: 1 },
    { url: `${SITE_URL}/experience/pw`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects/career-wallah`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects/tracker-360`, lastModified, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${SITE_URL}/projects/labeasy`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/projects/intervuex`, lastModified, changeFrequency: 'monthly', priority: 0.7 },
  ];
}
