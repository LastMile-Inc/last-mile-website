import { useLayoutEffect } from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  ogImage?: string;
  ogImageWidth?: string;
  ogImageHeight?: string;
  ogImageAlt?: string;
  ogType?: string;
  canonicalPath?: string;
  markdownPath?: string;
  jsonLd?: Record<string, unknown> | Array<Record<string, unknown>>;
  robots?: string;
}

function isPreviewEnvironment(): boolean {
  if (!import.meta.env.PROD) {
    return true;
  }
  if (typeof window !== 'undefined') {
    const host = window.location.hostname.toLowerCase();
    if (
      host === 'preview.lastmileinc.ai' ||
      host === 'review.lastmileinc.ai' ||
      host === 'localhost' ||
      host === '127.0.0.1'
    ) {
      return true;
    }
  }
  return false;
}

export function SEO({
  title,
  description,
  keywords = 'operational intelligence, industrial operations, industrial systems, workflows, authorized automation, Last Mile',
  ogImage = 'https://lastmileinc.ai/images/home/industrial-orchestration-hero-v3.png',
  ogImageWidth = '1672',
  ogImageHeight = '941',
  ogImageAlt = 'Industrial equipment and an operator connected by a visual path from a warning to a response',
  ogType = 'website',
  canonicalPath = '',
  markdownPath,
  jsonLd,
  robots,
}: SEOProps) {
  const baseUrl = 'https://lastmileinc.ai';
  const fullTitle = title.includes('Last Mile') ? title : `${title} | Last Mile`;
  const normalizedPath = canonicalPath ? (canonicalPath.startsWith('/') ? canonicalPath : `/${canonicalPath}`) : '/';
  const canonicalUrl = `${baseUrl}${normalizedPath}`;
  const effectiveRobots = robots ?? (isPreviewEnvironment() ? 'noindex, nofollow' : 'index, follow');
  const jsonLdEntries = Array.isArray(jsonLd)
    ? jsonLd
    : jsonLd
      ? [jsonLd]
      : [];

  useLayoutEffect(() => {
    // index.html ships static fallback tags (marked data-static-head) for first paint and non-JS crawlers.
    // React 19 renders this component's tags natively into <head>, so drop the static copies to avoid duplicates.
    document.head.querySelectorAll('[data-static-head]').forEach((node) => node.remove());
  }, [fullTitle, description, canonicalUrl, effectiveRobots]);

  return (
    <Helmet defer={false}>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />

      {/* Canonical URL */}
      <link rel="canonical" href={canonicalUrl} />
      {markdownPath ? (
        <link rel="alternate" type="text/markdown" href={`${baseUrl}${markdownPath}`} title="Markdown For Agents" />
      ) : null}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:image:width" content={ogImageWidth} />
      <meta property="og:image:height" content={ogImageHeight} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:site_name" content="Last Mile Inc." />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={canonicalUrl} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />

      {/* Additional SEO */}
      <meta name="robots" content={effectiveRobots} />
      <meta name="language" content="English" />
      <meta name="author" content="Last Mile Inc." />
      {jsonLdEntries.map((entry, index) => (
        <script key={`jsonld-${index}`} type="application/ld+json">
          {JSON.stringify(entry)}
        </script>
      ))}
    </Helmet>
  );
}
