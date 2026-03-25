import './globals.css';

const appUrl = process.env.NEXT_PUBLIC_URL || 'https://mini-nft-kappa.vercel.app';
const ogImage = `${appUrl}/og-image.svg`;

export const metadata = {
  metadataBase: new URL(appUrl),
  title: 'MiniNFT',
  description: 'ERC721 style minimal NFT on Base with free mint and one mint per wallet.',
  applicationName: 'MiniNFT',
  openGraph: {
    title: 'MiniNFT',
    description: 'Mint a minimalist NFT on Base. Free mint, you only pay gas.',
    url: appUrl,
    siteName: 'MiniNFT',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 630,
        alt: 'MiniNFT'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MiniNFT',
    description: 'Mint a minimalist NFT on Base. Free mint, you only pay gas.',
    images: [ogImage]
  },
  alternates: {
    canonical: appUrl
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="base:app_id" content="69c380456d153fb47b06adb8" />
        <meta
          name="talentapp:project_verification"
          content="58c288e0054d29715ba8c8aebfefb23ac530ae7da925a34f1de325e3802c99470633001928a701dbfa26868626b26813deb04842e2c517ac76000fdd1d05f584"
        />
        <meta name="theme-color" content="#0a4bff" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="mobile-web-app-capable" content="yes" />
      </head>
      <body>{children}</body>
    </html>
  );
}

