import type { Metadata, Viewport } from "next";
import { Inter, Sora } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
});

export const metadata: Metadata = {
  title: "ChamaConnect — Digital Chama Management",
  description: "Manage your chama groups, contributions, and finances digitally.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "ChamaConnect",
  },
  icons: {
    apple: "/chamma.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#22c55e",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sora.variable}`}>
      <head>
        <link rel="apple-touch-icon" href="/chamma.png" />
      </head>
      <body className="bg-background text-foreground antialiased">
        {children}

        <div
          id="pwa-install-banner"
          style={{
            display: "none",
            position: "fixed",
            bottom: "1.25rem",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: "#0a0a0a",
            border: "1px solid #22c55e",
            borderRadius: "12px",
            padding: "0.875rem 1.25rem",
            alignItems: "center",
            gap: "1rem",
            boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
            width: "calc(100% - 2rem)",
            maxWidth: "420px",
          }}
        >
          <img src="/chamma.png" alt="" width={36} height={36} style={{ borderRadius: "8px", flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#fff", margin: 0 }}>
              Install ChamaConnect
            </p>
            <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
              Add to home screen for the best experience
            </p>
          </div>
          <button
            id="pwa-install-btn"
            style={{
              background: "#22c55e",
              color: "#fff",
              border: "none",
              borderRadius: "8px",
              padding: "0.5rem 1rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              cursor: "pointer",
              flexShrink: 0,
            }}
          >
            Install
          </button>
          <button
            id="pwa-dismiss-btn"
            style={{
              background: "none",
              border: "none",
              color: "#9ca3af",
              cursor: "pointer",
              fontSize: "1.25rem",
              lineHeight: 1,
              padding: "0 0.25rem",
              flexShrink: 0,
            }}
          >
            ×
          </button>
        </div>

        <script dangerouslySetInnerHTML={{
          __html: `
            (function() {
              var deferredPrompt = null;

              window.addEventListener('beforeinstallprompt', function(e) {
                e.preventDefault();
                deferredPrompt = e;
                var banner = document.getElementById('pwa-install-banner');
                if (banner) banner.style.display = 'flex';
              });

              document.getElementById('pwa-install-btn').addEventListener('click', function() {
                if (deferredPrompt) {
                  deferredPrompt.prompt();
                  deferredPrompt.userChoice.then(function(result) {
                    var banner = document.getElementById('pwa-install-banner');
                    if (banner) banner.style.display = 'none';
                    deferredPrompt = null;
                  });
                }
              });

              document.getElementById('pwa-dismiss-btn').addEventListener('click', function() {
                var banner = document.getElementById('pwa-install-banner');
                if (banner) banner.style.display = 'none';
              });

              window.addEventListener('appinstalled', function() {
                var banner = document.getElementById('pwa-install-banner');
                if (banner) banner.style.display = 'none';
                deferredPrompt = null;
              });

              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js');
                });
              }
            })();
          `
        }}/>
      </body>
    </html>
  );
}