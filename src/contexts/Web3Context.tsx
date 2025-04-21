'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { BrowserProvider } from 'ethers';

interface Web3ContextType {
  account: string | null;
  provider: BrowserProvider | null;
  connect: () => Promise<void>;
  disconnect: () => void;
}

const Web3Context = createContext<Web3ContextType>({
  account: null,
  provider: null,
  connect: async () => {},
  disconnect: () => {},
});

export function Web3Provider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [provider, setProvider] = useState<BrowserProvider | null>(null);

  useEffect(() => {
    checkConnection();
  }, []);

  const checkConnection = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        const accounts = await provider.send('eth_accounts', []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setProvider(provider);
        }
      } catch (error) {
        console.error('Error checking connection:', error);
      }
    }
  };

  const connect = async () => {
    if (typeof window !== 'undefined' && window.ethereum) {
      try {
        const provider = new BrowserProvider(window.ethereum);
        await provider.send('eth_requestAccounts', []);
        const accounts = await provider.send('eth_accounts', []);
        if (accounts.length > 0) {
          setAccount(accounts[0]);
          setProvider(provider);
        }
      } catch (error) {
        console.error('Error connecting:', error);
      }
    }
  };

  const disconnect = () => {
    setAccount(null);
    setProvider(null);
  };

  return (
    <Web3Context.Provider value={{ account, provider, connect, disconnect }}>
      {children}
    </Web3Context.Provider>
  );
}

export function useWeb3() {
  return useContext(Web3Context);
} 