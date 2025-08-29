import type { MetadataRoute } from 'next'
 
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/', // This will allow everything
    },
    sitemap: 'https://coachos.fit/sitemap.xml',
  }
}