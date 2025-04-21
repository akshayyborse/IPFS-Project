'use client';

import { motion } from 'framer-motion';
import { useWeb3 } from '../hooks/useWeb3';
import type { ReactElement } from 'react';

export default function Home(): ReactElement {
  const { account, connect } = useWeb3();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <h1 className="text-5xl font-bold text-gray-900 dark:text-white mb-6">
          Decentralized File Storage
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Secure, encrypted, and decentralized storage powered by IPFS and blockchain technology
        </p>

        {!account ? (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={connect}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Connect Wallet to Get Started
          </motion.button>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-4"
          >
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Welcome! You're connected with address:
            </p>
            <p className="text-lg font-mono text-indigo-600 dark:text-indigo-400">
              {account}
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-400">
              Start uploading files or check your dashboard.
            </p>
          </motion.div>
        )}

        <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Secure Storage
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Your files are encrypted and distributed across the IPFS network
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Access Control
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Manage who can access your files with blockchain-based permissions
            </p>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-white dark:bg-gray-800 shadow rounded-lg p-6"
          >
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
              Pay-as-you-go
            </h3>
            <p className="text-gray-600 dark:text-gray-400">
              Only pay for the storage you use with cryptocurrency
            </p>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
