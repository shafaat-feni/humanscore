export interface SeoMetaProps {
  title: string;
  description: string;
  canonicalPath?: string;
}

export function updatePageMeta({ title, description, canonicalPath }: SeoMetaProps) {
  document.title = `${title} — HumanScore`;
  
  let metaDesc = document.querySelector('meta[name="description"]');
  if (!metaDesc) {
    metaDesc = document.createElement('meta');
    metaDesc.setAttribute('name', 'description');
    document.head.appendChild(metaDesc);
  }
  metaDesc.setAttribute('content', description);

  // Canonical handling
  const domain = 'https://humanscore.netlify.app'; // Update upon custom domain connection
  const canonicalUrl = canonicalPath ? `${domain}${canonicalPath}` : domain;

  let canonicalLink = document.querySelector('link[rel="canonical"]');
  if (!canonicalLink) {
    canonicalLink = document.createElement('link');
    canonicalLink.setAttribute('rel', 'canonical');
    document.head.appendChild(canonicalLink);
  }
  canonicalLink.setAttribute('href', canonicalUrl);
}