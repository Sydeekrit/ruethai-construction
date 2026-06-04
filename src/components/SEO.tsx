import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  type?: string;
}

export default function SEO({
  title,
  description,
  keywords,
  image = '/images/general/Logo.webp',
  type = 'website'
}: SEOProps) {
  const { pathname } = useLocation();

  useEffect(() => {
    // 1. Update Document Title
    const formattedTitle = title.includes('ฤทัยคอนสตรัคชั่น') 
      ? title 
      : `${title} | ฤทัยคอนสตรัคชั่น รับสร้างบ้านคุณภาพเชียงใหม่`;
    document.title = formattedTitle;

    // Helper to edit or create a meta tag helper
    const updateMetaTag = (selector: string, attributeName: string, attributeValue: string, contentValue: string) => {
      let element = document.querySelector(selector);
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attributeName, attributeValue);
        document.head.appendChild(element);
      }
      element.setAttribute('content', contentValue);
    };

    // 2. Update Description
    updateMetaTag('meta[name="description"]', 'name', 'description', description);
    
    // 3. Update Keywords - emphasizing requested keywords like ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, รับสร้างบ้านเชียงใหม่
    const defaultKeywords = 'ขายทาวน์เฮ้าส์เชียงใหม่, ห้องแถวราคาถูก, รับสร้างบ้านเชียงใหม่, ทาวน์เฮ้าส์เชียงใหม่, บ้านจัดสรรเชียงใหม่, บ้านราคาถูกเชียงใหม่, โครงการบ้านเชียงใหม่, ออกแบบบ้านเชียงใหม่';
    const finalKeywords = keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords;
    updateMetaTag('meta[name="keywords"]', 'name', 'keywords', finalKeywords);

    // 4. Update Open Graph Tags for social crawlers / search indexers
    updateMetaTag('meta[property="og:title"]', 'property', 'og:title', formattedTitle);
    updateMetaTag('meta[property="og:description"]', 'property', 'og:description', description);
    updateMetaTag('meta[property="og:image"]', 'property', 'og:image', image);
    updateMetaTag('meta[property="og:type"]', 'property', 'og:type', type);
    updateMetaTag('meta[property="og:url"]', 'property', 'og:url', window.location.origin + pathname);

    // 5. Update Canonical Link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.setAttribute('rel', 'canonical');
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute('href', window.location.origin + pathname);

  }, [title, description, keywords, image, type, pathname]);

  return null;
}
