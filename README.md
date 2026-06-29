# MiniNFT

MiniNFT is a Base mini app for minting one free ERC721-style NFT per wallet.

The app is designed around a simple mint flow: connect a wallet, view the current supply, and mint once.  
The mint itself is free; users only pay the network gas fee.

## Repository

GitHub: https://github.com/AntoniaHumphry/MiniNFT.git

## Overview

MiniNFT provides a compact web interface for an NFT mint on Base mainnet.

It includes:

- A Base mainnet mint flow
- One mint per wallet
- Live supply reads
- Base metadata and project verification tags
- Transaction attribution tracking through `utils/track.js`

## Features

- Mint contract configured at `0xa54b4dc2161adc3bf73525ee7d68711ff60c0210`
- Free mint flow with gas paid by the user
- Wallet-based mint limit
- Live supply display
- Metadata configured for the deployed app URL
- Transaction tracking helper located in `utils/track.js`
- Built for deployment as a Base mini app

## Tech Stack

The project uses a JavaScript web app setup with npm scripts.

The original setup includes:

- `npm install` for dependency installation
- `npm run dev` for local development
- `NEXT_PUBLIC_URL` for production metadata configuration

## Getting Started

Clone the repository:

```bash
git clone https://github.com/AntoniaHumphry/MiniNFT.git
cd MiniNFT
```

Install dependencies:

```bash
npm install
```

Start the local development server:

```bash
npm run dev
```

After the development server starts, open the local URL shown in your terminal.

## Configuration

For production deployments, set the following environment variable:

```bash
NEXT_PUBLIC_URL=https://your-deployed-site.example
```

`NEXT_PUBLIC_URL` should point to the live deployed site so that app metadata resolves correctly.

## Usage

1. Open the MiniNFT app.
2. Connect a supported wallet.
3. Review the current supply information.
4. Mint the NFT if the connected wallet has not minted before.
5. Confirm the transaction and pay the required gas fee.

## Contract

MiniNFT is wired to the following Base mainnet contract:

```text
0xa54b4dc2161adc3bf73525ee7d68711ff60c0210
```

## Development Notes

The app is intended for the Base mainnet mint flow.

When making changes, verify that:

- The contract address remains correct.
- The mint limit behavior still works as expected.
- Supply reads continue to display current information.
- Metadata points to the correct deployed URL.
