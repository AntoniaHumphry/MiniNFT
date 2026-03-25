# MiniNFT

MiniNFT is a Base mini app for minting one free ERC721-style NFT per wallet. Users only pay gas.

## Features

- Base mainnet mint flow wired to `0xa54b4dc2161adc3bf73525ee7d68711ff60c0210`
- One mint per wallet with live supply reads
- Base metadata tags and project verification tags
- Transaction attribution tracking via `utils/track.js`

## Local development

```bash
npm install
npm run dev
```

## Production

Set `NEXT_PUBLIC_URL` to the deployed site URL so metadata points to the live app.
