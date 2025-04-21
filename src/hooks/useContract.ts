import { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWeb3 } from './useWeb3';
import FileStorage from '../contracts/FileStorage.json';

export function useContract() {
  const { provider, account } = useWeb3();
  const [contract, setContract] = useState<ethers.Contract | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!provider || !account) {
      setContract(null);
      return;
    }

    try {
      const contractAddress = process.env.NEXT_PUBLIC_CONTRACT_ADDRESS;
      if (!contractAddress) {
        throw new Error('Contract address not found in environment variables');
      }

      const contract = new ethers.Contract(
        contractAddress,
        FileStorage.abi,
        provider
      );

      setContract(contract);
      setError(null);
    } catch (err) {
      console.error('Error initializing contract:', err);
      setError(err instanceof Error ? err.message : 'Failed to initialize contract');
      setContract(null);
    }
  }, [provider, account]);

  return {
    contract,
    error,
  };
} 