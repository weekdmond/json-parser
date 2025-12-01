import type { Metadata } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  metadataBase: new URL('https://jsoncd.com'),
  title: "JSON Parser & Formatter - Secure, Offline & Fast (No Server)",
  description: "Privacy-first JSON parser and formatter. All data processed locally in your browser. No server uploads. Works offline. Free, open-source, and lightning fast.",
  keywords: ["json parser", "json formatter", "json validator", "offline json tool", "privacy-first", "no server", "secure json"],
  authors: [{ name: "JSON Parser Team" }],
  creator: "JSON Parser Team",
  publisher: "JSON Parser",

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://jsoncd.com',
    siteName: 'JSON Parser & Formatter',
    title: 'JSON Parser & Formatter - Privacy-First Online Tool',
    description: 'Free online JSON parser and formatter. All processing happens locally in your browser. No data uploads, works offline, open-source.',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'JSON Parser Logo',
      }
    ],
  },

  // Twitter Card
  twitter: {
    card: 'summary',
    title: 'JSON Parser & Formatter - Privacy-First',
    description: 'Free JSON parser & formatter. 100% local processing, no server uploads, works offline.',
    images: ['/icon-512.png'],
    creator: '@jsonparser',
  },

  // PWA
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "JSON Parser",
  },

  // Additional
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  // Verification (add your codes when you have them)
  // verification: {
  //   google: 'your-google-verification-code',
  //   yandex: 'your-yandex-verification-code',
  // },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4c9ed9" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <link rel="canonical" href="https://jsoncd.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'WebApplication',
              name: 'JSON Parser & Formatter',
              url: 'https://jsoncd.com',
              description: 'Privacy-first JSON parser and formatter. All data processed locally in your browser.',
              applicationCategory: 'DeveloperApplication',
              operatingSystem: 'Any',
              offers: {
                '@type': 'Offer',
                price: '0',
                priceCurrency: 'USD',
              },
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: '5',
                ratingCount: '1',
              },
              featureList: [
                'JSON Parsing',
                'JSON Formatting',
                'JSON Validation',
                'JSON Schema Validation',
                'Offline Support',
                'Privacy-First',
                'No Server Upload',
              ],
            }),
          }}
        />
      </head>
      <body>
        {children}
        <Script id="register-sw" strategy="afterInteractive">
          {`
            if ('serviceWorker' in navigator) {
              window.addEventListener('load', function() {
                navigator.serviceWorker.register('/sw.js').then(
                  function(registration) {
                    console.log('ServiceWorker registration successful');
                  },
                  function(err) {
                    console.log('ServiceWorker registration failed: ', err);
                  }
                );
              });
            }
          `}
        </Script>
      </body>
    </html>
  );
}
