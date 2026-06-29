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
