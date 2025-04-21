'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { useWeb3 } from '../../hooks/useWeb3';
import FileUpload from '../../components/FileUpload';
import { CloudArrowUpIcon, LockClosedIcon, GlobeAltIcon } from '@heroicons/react/24/outline';
import type { ReactElement } from 'react';

export default function UploadPage(): ReactElement {
  const { account } = useWeb3();

  if (!account) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          Please connect your wallet to upload files
        </h2>
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
          Upload Files
        </h1>
        <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">
          Store your files securely on the decentralized network
        </p>
      </motion.div>

      <div className="space-y-8">
        <FileUpload />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Storage Features */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Storage Features
            </h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <CloudArrowUpIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Decentralized Storage
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your files are distributed across the IPFS network for maximum reliability
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <LockClosedIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    End-to-End Encryption
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Optional AES encryption for your private files
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <GlobeAltIcon className="h-6 w-6 text-indigo-600 dark:text-indigo-400 mt-1" />
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-gray-900 dark:text-white">
                    Access Control
                  </h3>
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Manage file permissions with blockchain-based access control
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Storage Pricing */}
          <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Storage Pricing
            </h2>
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Price per day</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">0.0000001 ETH</p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Duration</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Minimum: 1 day<br />
                  Maximum: 365 days<br />
                  30 days storage: 0.000003 ETH
                </p>
              </div>
              <div>
                <h3 className="text-sm font-medium text-gray-900 dark:text-white">Tips</h3>
                <ul className="mt-1 text-sm text-gray-500 dark:text-gray-400 list-disc list-inside space-y-1">
                  <li>Choose encryption for sensitive files</li>
                  <li>Set appropriate storage duration</li>
                  <li>Keep your private keys safe</li>
                  <li>Monitor storage expiration dates</li>
                  <li>Use public access for shared files</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 