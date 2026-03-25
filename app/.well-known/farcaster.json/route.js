function withValidProperties(properties) {
  return Object.fromEntries(
    Object.entries(properties).filter(([, value]) => {
      if (Array.isArray(value)) return value.length > 0;
      if (value && typeof value === 'object') return Object.keys(value).length > 0;
      return Boolean(value);
    })
  );
}

export async function GET() {
  const url = process.env.NEXT_PUBLIC_URL || 'https://mini-nft-kappa.vercel.app';
  const imageUrl = `${url}/og-image.svg`;

  const accountAssociation = withValidProperties({
    header: process.env.FARCASTER_HEADER,
    payload: process.env.FARCASTER_PAYLOAD,
    signature: process.env.FARCASTER_SIGNATURE
  });

  return Response.json(
    withValidProperties({
      accountAssociation,
      frame: withValidProperties({
        version: '1',
        name: 'MiniNFT',
        iconUrl: imageUrl,
        homeUrl: url,
        imageUrl,
        buttonTitle: 'Mint MiniNFT',
        splashImageUrl: imageUrl,
        splashBackgroundColor: '#07111f'
      })
    })
  );
}
