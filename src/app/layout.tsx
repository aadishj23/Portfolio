import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';

const TITLE = 'Aadish Jain - Full Stack Developer | SDE at Physics Wallah';
const DESCRIPTION =
  'Software Development Engineer at Physics Wallah. Full Stack Developer specializing in React.js, Node.js, Typescript, MongoDB, Express.js, and PostgreSQL.';
const SITE_URL = 'https://aadishjain.dev';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  authors: [{ name: 'Aadish Jain' }],
  keywords: [
    'backend developer',
    'node.js developer',
    'startup developer',
    'scalable systems',
    'microservices',
    'API development',
    'React.js',
    'Node.js',
    'Typescript',
    'MongoDB',
    'Express.js',
    'PostgreSQL',
    'Full Stack Developer',
    'Aadish Jain',
    "Aadish Jain's Portfolio",
  ],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  icons: { icon: '/favicon.png' },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    type: 'website',
    url: SITE_URL,
    siteName: 'Aadish Jain Portfolio',
    locale: 'en_US',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Aadish Jain - Full Stack Developer Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@AadishJ23',
    creator: '@AadishJ23',
    title: TITLE,
    description: DESCRIPTION,
    images: ['/og-image.jpg'],
  },
  other: {
    'geo.region': 'IN',
    'geo.placename': 'Delhi, India',
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
};

const personLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Aadish Jain',
  alternateName: 'AadishJ23',
  jobTitle: 'Full Stack Developer',
  url: `${SITE_URL}/`,
  image: `${SITE_URL}/og-image.jpg`,
  description: DESCRIPTION,
  email: 'mailto:aadishjain017@gmail.com',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Delhi',
    addressRegion: 'Delhi',
    addressCountry: 'IN',
  },
  sameAs: [
    'https://linkedin.com/in/aadishj23',
    'https://github.com/aadishj23',
    'https://x.com/AadishJ23',
  ],
  knowsAbout: [
    'Backend Development',
    'Node.js',
    'Full Stack Web Development',
    'React.js',
    'TypeScript',
    'MongoDB',
    'PostgreSQL',
    'Express.js',
    'Microservices',
    'API Development',
    'Scalable Systems',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Physics Wallah Limited',
    url: 'https://www.pw.live/',
  },
  hasOccupation: {
    '@type': 'Occupation',
    name: 'Software Development Engineer',
    occupationLocation: { '@type': 'Organization', name: 'Physics Wallah Limited' },
  },
};

const websiteLd = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Aadish Jain Portfolio',
  url: `${SITE_URL}/`,
  description: 'Full Stack Developer Portfolio showcasing projects, skills, and experience',
  author: { '@type': 'Person', name: 'Aadish Jain' },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteLd) }}
        />
      </head>
      <body>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {children}
        </TooltipProvider>
      </body>
    </html>
  );
}
