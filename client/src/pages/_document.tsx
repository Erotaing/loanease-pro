import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en" className="scroll-smooth">
      <Head>
        {/* Meta Tags */}
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="googlebot" content="index, follow" />
        <meta name="author" content="LoanEase Pro" />
        <meta name="publisher" content="LoanEase Financial Services" />
        <meta name="copyright" content="© 2024 LoanEase Pro. All rights reserved." />
        <meta name="theme-color" content="#2563eb" />
        <meta name="msapplication-TileColor" content="#2563eb" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Favicon and Icons */}
        <link rel="icon" type="image/x-icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
        
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* Google Fonts - Inter for modern, professional look */}
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
        
        {/* Additional fonts for headings */}
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700;800&display=swap"
          rel="stylesheet"
        />
        
        {/* DNS Prefetch for performance */}
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        <link rel="dns-prefetch" href="//fonts.gstatic.com" />
        
        {/* Open Graph Meta Tags */}
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="LoanEase Pro" />
        <meta property="og:locale" content="en_US" />
        
        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@loaneasepro" />
        <meta name="twitter:creator" content="@loaneasepro" />
        
        {/* Structured Data for SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FinancialService',
              name: 'LoanEase Pro',
              description: 'Professional loan management and application platform',
              url: 'https://loaneasepro.com',
              logo: 'https://loaneasepro.com/logo.png',
              contactPoint: {
                '@type': 'ContactPoint',
                telephone: '+855 123-456-7890',
                contactType: 'Customer Service',
                availableLanguage: 'English',
                areaServed: 'US',
              },
              address: {
                '@type': 'PostalAddress',
                streetAddress: '123 Financial District',
                addressLocality: 'New York',
                addressRegion: 'NY',
                postalCode: '10004',
                addressCountry: 'US',
              },
              sameAs: [
                'https://facebook.com/loaneasepro',
                'https://twitter.com/loaneasepro',
                'https://linkedin.com/company/loaneasepro',
              ],
              serviceType: [
                'Personal Loans',
                'Home Loans',
                'Auto Loans',
                'Business Loans',
                'Student Loans',
              ],
            }),
          }}
        />
        
        {/* Security Headers */}
        <meta httpEquiv="X-Content-Type-Options" content="nosniff" />
        <meta httpEquiv="X-Frame-Options" content="DENY" />
        <meta httpEquiv="X-XSS-Protection" content="1; mode=block" />
        <meta httpEquiv="Referrer-Policy" content="strict-origin-when-cross-origin" />
        
        {/* Content Security Policy */}
        <meta
          httpEquiv="Content-Security-Policy"
          content="default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://fonts.googleapis.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https:; connect-src 'self' https:;"
        />
        
        {/* Preload critical resources */}
        {/* Font preloading removed - using Google Fonts instead */}
        
        {/* Critical CSS for above-the-fold content */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              /* Critical CSS */
              * {
                box-sizing: border-box;
              }
              
              html {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                line-height: 1.6;
                -webkit-text-size-adjust: 100%;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              
              body {
                margin: 0;
                padding: 0;
                background-color: #ffffff;
                color: #1f2937;
                font-size: 16px;
                font-weight: 400;
              }
              
              /* Loading state */
              .loading {
                display: flex;
                align-items: center;
                justify-content: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
                color: white;
                font-size: 18px;
                font-weight: 500;
              }
              
              /* Smooth scrolling */
              html {
                scroll-behavior: smooth;
              }
              
              /* Focus styles for accessibility */
              *:focus {
                outline: 2px solid #2563eb;
                outline-offset: 2px;
              }
              
              /* Remove focus outline for mouse users */
              .js-focus-visible *:focus:not(.focus-visible) {
                outline: none;
              }
              
              /* High contrast mode support */
              @media (prefers-contrast: high) {
                body {
                  background-color: #000000;
                  color: #ffffff;
                }
              }
              
              /* Reduced motion support */
              @media (prefers-reduced-motion: reduce) {
                *,
                *::before,
                *::after {
                  animation-duration: 0.01ms !important;
                  animation-iteration-count: 1 !important;
                  transition-duration: 0.01ms !important;
                  scroll-behavior: auto !important;
                }
              }
              
              /* Print styles */
              @media print {
                body {
                  background: white;
                  color: black;
                }
                
                .no-print {
                  display: none !important;
                }
              }
            `,
          }}
        />
      </Head>
      <body className="antialiased">
        {/* Loading fallback */}
        <div id="loading-fallback" className="loading">
          <div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mb-4 mx-auto"></div>
            Loading LoanEase Pro...
          </div>
        </div>
        
        {/* Main app content */}
        <Main />
        
        {/* Next.js scripts */}
        <NextScript />
        
        {/* Remove loading fallback once app loads */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              // Remove loading fallback once React hydrates
              document.addEventListener('DOMContentLoaded', function() {
                setTimeout(function() {
                  const loadingFallback = document.getElementById('loading-fallback');
                  if (loadingFallback) {
                    loadingFallback.style.display = 'none';
                  }
                }, 100);
              });
              
              // Add focus-visible polyfill class
              document.documentElement.classList.add('js-focus-visible');
              
              // Theme detection and application
              (function() {
                const theme = localStorage.getItem('loanease_theme') || 'light';
                if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                  document.documentElement.classList.add('dark');
                }
              })();
              
              // Performance monitoring
              if ('performance' in window && 'measure' in window.performance) {
                window.addEventListener('load', function() {
                  setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    if (perfData) {
                      console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                    }
                  }, 0);
                });
              }
            `,
          }}
        />
      </body>
    </Html>
  );
}