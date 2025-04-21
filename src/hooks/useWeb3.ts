import { useState, useEffect } from 'react';
import { ethers } from 'ethers';

// Define the Ethereum provider type
declare global {
  interface Window {
    ethereum?: {
      isMetaMask?: boolean;
      request: (args: { method: string; params?: any[] }) => Promise<any>;
      on: (eventName: string, callback: (params: any) => void) => void;
      removeListener: (eventName: string, callback: (params: any) => void) => void;
      selectedAddress?: string;
    };
  }
}

export function useWeb3() {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [error, setError] = useState<string | null>(null);

  const connect = async () => {
    try {
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to use this application');
      }

      // Request account access
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      // Check if we're on the correct network (Sepolia)
      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      const sepoliaChainId = '0xaa36a7'; // Sepolia chain ID

      if (chainId !== sepoliaChainId) {
        try {
          // Request network switch
          await window.ethereum.request({
            method: 'wallet_switchEthereumChain',
            params: [{ chainId: sepoliaChainId }],
          });
        } catch (switchError: any) {
          // If the network doesn't exist, add it
          if (switchError.code === 4902) {
            await window.ethereum.request({
              method: 'wallet_addEthereumChain',
              params: [
                {
                  chainId: sepoliaChainId,
                  chainName: 'Sepolia Test Network',
                  nativeCurrency: {
                    name: 'Sepolia ETH',
                    symbol: 'ETH',
                    decimals: 18,
                  },
                  rpcUrls: ['https://sepolia.infura.io/v3/221b3a63c8e14a2c9963438fce0eada9'],
                  blockExplorerUrls: ['https://sepolia.etherscan.io/'],
                },
              ],
            });
          } else {
            throw switchError;
          }
        }
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      setProvider(provider);
      setAccount(accounts[0]);
    } catch (err) {
      console.error('Error connecting to wallet:', err);
      setError(err instanceof Error ? err.message : 'Failed to connect wallet');
    }
  };

  useEffect(() => {
    // Check if already connected
    if (window.ethereum) {
      window.ethereum
        .request({ method: 'eth_accounts' })
        .then((accounts: string[]) => {
          if (accounts.length > 0) {
            setAccount(accounts[0]);
            if (window.ethereum) {
              setProvider(new ethers.BrowserProvider(window.ethereum));
            }
          }
        })
        .catch((err) => {
          console.error('Error checking wallet connection:', err);
          setError(err instanceof Error ? err.message : 'Failed to check wallet connection');
        });
    }

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', (accounts: string[]) => {
        if (accounts.length > 0) {
          setAccount(accounts[0]);
        } else {
          setAccount(null);
        }
      });

      window.ethereum.on('chainChanged', (chainId: string) => {
        const sepoliaChainId = '0xaa36a7';
        if (chainId !== sepoliaChainId) {
          setError('Please switch to the Sepolia network');
        } else {
          setError(null);
        }
      });
    }

    return () => {
      if (window.ethereum) {
        window.ethereum.removeListener('accountsChanged', () => {});
        window.ethereum.removeListener('chainChanged', () => {});
      }
    };
  }, []);

  return {
    account,
    provider,
    error,
    connect,
  };
} 