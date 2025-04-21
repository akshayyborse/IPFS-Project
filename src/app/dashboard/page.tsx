'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../hooks/useWeb3';
import { useContract } from '../../hooks/useContract';
import { TrashIcon, LockClosedIcon, GlobeAltIcon, ClipboardIcon, ClipboardDocumentCheckIcon } from '@heroicons/react/24/outline';
import type { ReactElement } from 'react';

interface FileData {
  ipfsHash: string;
  owner: string;
  timestamp: number;
  isEncrypted: boolean;
  isPublic: boolean;
  storageCost: number;
  expiryDate: number;
}

export default function Dashboard(): ReactElement {
  const { account } = useWeb3();
  const { contract, error: contractError } = useContract();
  const [files, setFiles] = useState<FileData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const [deletingHash, setDeletingHash] = useState<string | null>(null);

  const fetchFiles = useCallback(async () => {
    if (!contract || !account) {
      console.log('No contract or account available:', { contract: !!contract, account });
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      console.log('Starting to fetch files for account:', account);

      // Log contract address and verify contract
      const contractAddress = await contract.getAddress();
      console.log('Contract address:', contractAddress);
      
      // Get user files
      console.log('Getting user files...');
      const userFiles = await contract.getUserFiles(account);
      console.log('User files:', userFiles);

      if (userFiles.length === 0) {
        console.log('No files found for user');
        setFiles([]);
        setLoading(false);
        return;
      }

      // Get file details for each file
      console.log('Getting file details...');
      const fileDetails = await Promise.all(
        userFiles.map(async (ipfsHash: string) => {
          try {
            console.log('Getting details for file:', ipfsHash);
            const fileData = await contract.getFile(ipfsHash);
            console.log('File data:', fileData);
            
            return {
              ipfsHash,
              owner: fileData.owner,
              timestamp: Number(fileData.timestamp),
              isEncrypted: fileData.isEncrypted,
              isPublic: fileData.isPublic,
              storageCost: Number(fileData.storageCost),
              expiryDate: Number(fileData.expiryDate)
            };
          } catch (err) {
            console.error(`Error fetching file ${ipfsHash}:`, err);
            return null;
          }
        })
      );

      // Filter out any null values
      const validFiles = fileDetails.filter((file): file is FileData => file !== null);
      console.log('Valid files:', validFiles);
      
      setFiles(validFiles);
    } catch (err) {
      console.error('Error fetching files:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch files');
    } finally {
      setLoading(false);
    }
  }, [contract, account]);

  useEffect(() => {
    fetchFiles();
  }, [fetchFiles]);

  const handleDeleteFile = async (ipfsHash: string) => {
    if (!contract || !account) return;
    
    try {
      setDeletingHash(ipfsHash);
      const tx = await contract.deleteFile(ipfsHash);
      await tx.wait();
      console.log('File deleted successfully');
      
      // Refresh files
      fetchFiles();
    } catch (err) {
      console.error('Error deleting file:', err);
      setError(err instanceof Error ? err.message : 'Failed to delete file');
    } finally {
      setDeletingHash(null);
    }
  };

  const copyToClipboard = async (hash: string) => {
    try {
      await navigator.clipboard.writeText(hash);
      setCopiedHash(hash);
      setTimeout(() => setCopiedHash(null), 2000);
    } catch (err) {
      console.error('Failed to copy hash:', err);
    }
  };

  if (!account) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Please connect your wallet to view your files
        </h2>
      </div>
    );
  }

  if (contractError) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
          Error connecting to the contract: {contractError}
        </h2>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          Please check if you're connected to the correct network and the contract address is correct.
        </p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-12"
      >
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white">
          Your Files
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Manage your stored files and their access permissions
        </p>
      </motion.div>

      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 dark:border-indigo-400 mx-auto"></div>
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400">
            Error: {error}
          </h2>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Please check the console for more details
          </p>
        </div>
      ) : files.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-gray-500 dark:text-gray-400">
            You haven't uploaded any files yet.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {files.map((file) => (
            <motion.div
              key={file.ipfsHash}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center">
                  {file.isEncrypted ? (
                    <LockClosedIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                  ) : (
                    <GlobeAltIcon className="h-5 w-5 text-green-600 dark:text-green-400" />
                  )}
                  <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                    {file.isPublic ? 'Public' : 'Private'}
                  </span>
                </div>
                <button
                  onClick={() => handleDeleteFile(file.ipfsHash)}
                  disabled={deletingHash === file.ipfsHash}
                  className={`text-gray-400 hover:text-red-500 dark:hover:text-red-400 ${
                    deletingHash === file.ipfsHash ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Uploaded: {new Date(file.timestamp * 1000).toLocaleDateString()}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Expires: {new Date(file.expiryDate * 1000).toLocaleDateString()}
                </p>
                <div className="mt-2">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                      IPFS Hash:
                    </p>
                    <button
                      onClick={() => copyToClipboard(file.ipfsHash)}
                      className="ml-2 text-gray-400 hover:text-indigo-500 dark:hover:text-indigo-400"
                      title="Copy IPFS hash"
                    >
                      {copiedHash === file.ipfsHash ? (
                        <ClipboardDocumentCheckIcon className="h-5 w-5" />
                      ) : (
                        <ClipboardIcon className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                  <p className="mt-1 text-xs font-mono text-gray-500 dark:text-gray-400 break-all">
                    {file.ipfsHash}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
} 