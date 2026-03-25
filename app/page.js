'use client';

import { useEffect, useMemo, useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  WagmiProvider,
  createConfig,
  http,
  useAccount,
  useConnect,
  useDisconnect,
  useReadContracts,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi';
import { base } from 'wagmi/chains';
import { coinbaseWallet, injected } from 'wagmi/connectors';
import { trackTransaction } from '@/utils/track';

const CONTRACT_ADDRESS = '0xa54b4dc2161adc3bf73525ee7d68711ff60c0210';
const APP_ID = 'app-001';
const APP_NAME = 'MiniNFT';

const contractAbi = [
  {
    inputs: [],
    name: 'mint',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function'
  },
  {
    inputs: [],
    name: 'totalSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [],
    name: 'maxSupply',
    outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
    stateMutability: 'view',
    type: 'function'
  },
  {
    inputs: [{ internalType: 'address', name: '', type: 'address' }],
    name: 'minted',
    outputs: [{ internalType: 'bool', name: '', type: 'bool' }],
    stateMutability: 'view',
    type: 'function'
  }
];

const wagmiConfig = createConfig({
  chains: [base],
  connectors: [
    coinbaseWallet({
      appName: APP_NAME
    }),
    injected()
  ],
  transports: {
    [base.id]: http()
  }
});

const queryClient = new QueryClient();

function MintView() {
  const { address, isConnected, chainId } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const { writeContract, data: txHash, isPending: isMintSubmitting, error: writeError } = useWriteContract();
  const [statusMessage, setStatusMessage] = useState('Connect a wallet on Base to mint your MiniNFT.');
  const [statusType, setStatusType] = useState('');
  const [hasTracked, setHasTracked] = useState(false);

  const { data, refetch, isLoading } = useReadContracts({
    allowFailure: false,
    contracts: [
      {
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: 'totalSupply'
      },
      {
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: 'maxSupply'
      },
      {
        address: CONTRACT_ADDRESS,
        abi: contractAbi,
        functionName: 'minted',
        args: [address || '0x0000000000000000000000000000000000000000']
      }
    ]
  });

  const { data: receipt, isLoading: isConfirming } = useWaitForTransactionReceipt({
    hash: txHash
  });

  const [totalSupply = 0n, maxSupply = 0n, hasMinted = false] = data || [];
  const mintedCount = Number(totalSupply);
  const maxCount = Number(maxSupply);
  const mintedPercent = maxCount > 0 ? Math.round((mintedCount / maxCount) * 100) : 0;

  useEffect(() => {
    if (writeError) {
      setStatusType('error');
      setStatusMessage(writeError.shortMessage || writeError.message || 'Mint failed.');
    }
  }, [writeError]);

  useEffect(() => {
    if (!txHash) {
      return;
    }

    setHasTracked(false);
    setStatusType('');
    setStatusMessage(`Transaction submitted: ${txHash}`);
  }, [txHash]);

  useEffect(() => {
    if (!receipt || hasTracked || !address) {
      return;
    }

    setHasTracked(true);
    setStatusType('success');
    setStatusMessage(`Mint confirmed on Base. Tx hash: ${receipt.transactionHash}`);
    trackTransaction(APP_ID, APP_NAME, address, receipt.transactionHash);
    refetch();
  }, [receipt, hasTracked, address, refetch]);

  const connectLabel = useMemo(() => {
    const coinbaseConnector = connectors.find((connector) => connector.name.toLowerCase().includes('coinbase'));
    return coinbaseConnector || connectors[0];
  }, [connectors]);

  const actionDisabled =
    !isConnected ||
    isMintSubmitting ||
    isConfirming ||
    hasMinted ||
    (maxCount > 0 && mintedCount >= maxCount) ||
    chainId !== base.id;

  const handleMint = async () => {
    if (!isConnected) {
      setStatusType('error');
      setStatusMessage('Connect your wallet before minting.');
      return;
    }

    if (chainId !== base.id) {
      setStatusType('error');
      setStatusMessage('Switch your wallet network to Base first.');
      return;
    }

    setStatusType('');
    setStatusMessage('Opening wallet for confirmation...');

    writeContract({
      address: CONTRACT_ADDRESS,
      abi: contractAbi,
      functionName: 'mint'
    });
  };

  return (
    <main className="page-shell">
      <section className="hero">
        <div className="hero-copy">
          <div>
            <span className="eyebrow">Base Mini App</span>
            <h1 className="title">Mint one clean NFT. Pay only gas.</h1>
            <p className="lede">
              MiniNFT is a minimal ERC721 style mint on Base. There is no mint fee, no allowlist, and each wallet can
              claim just one NFT while supply lasts.
            </p>
            <div className="stats">
              <div className="stat">
                <p className="stat-label">Minted</p>
                <p className="stat-value">{isLoading ? '...' : mintedCount}</p>
              </div>
              <div className="stat">
                <p className="stat-label">Max Supply</p>
                <p className="stat-value">{isLoading ? '...' : maxCount}</p>
              </div>
              <div className="stat">
                <p className="stat-label">Progress</p>
                <p className="stat-value">{isLoading ? '...' : `${mintedPercent}%`}</p>
              </div>
            </div>
          </div>
          <p className="footer-copy">
            Contract: {CONTRACT_ADDRESS}
            <br />
            Free mint mechanics, one address one claim, and transaction attribution tracking included.
          </p>
        </div>

        <div className="mint-card">
          <h2 className="card-title">Claim Your MiniNFT</h2>
          <p className="card-copy">The NFT itself is free. Your wallet only pays Base network gas.</p>
          <div className="art" aria-hidden="true" />
          {!isConnected ? (
            <button
              className="action-button"
              type="button"
              onClick={() => connect({ connector: connectLabel })}
              disabled={isConnecting || !connectLabel}
            >
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
          ) : (
            <>
              <button className="action-button" type="button" onClick={handleMint} disabled={actionDisabled}>
                {isMintSubmitting
                  ? 'Confirming in wallet...'
                  : isConfirming
                    ? 'Waiting for confirmation...'
                    : hasMinted
                      ? 'Already Minted'
                      : maxCount > 0 && mintedCount >= maxCount
                        ? 'Sold Out'
                        : 'Mint MiniNFT'}
              </button>
              <button className="secondary-button" type="button" onClick={() => disconnect()}>
                Disconnect
              </button>
            </>
          )}
          <p className={`status-note ${statusType}`}>{statusMessage}</p>
          <p className="helper-row">
            Wallet: {isConnected ? `${address.slice(0, 6)}...${address.slice(-4)}` : 'Not connected'}
          </p>
          <p className="helper-row">Network: {chainId === base.id ? 'Base' : isConnected ? `Chain ${chainId}` : 'Not connected'}</p>
          <p className="helper-row">Mint limit: one mint per wallet address.</p>
          <p className="contract-address">Explorer: https://basescan.org/address/{CONTRACT_ADDRESS}</p>
        </div>
      </section>
    </main>
  );
}

export default function Home() {
  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <MintView />
      </QueryClientProvider>
    </WagmiProvider>
  );
}


