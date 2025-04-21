# Decentralized File Storage System

A decentralized file storage system built with Next.js, Solidity, and IPFS. This project allows users to store files securely on the blockchain with IPFS integration.

## Features

- File upload and storage on IPFS
- Smart contract-based storage management
- Token-based payment system
- File access control and permissions
- Real-time file status updates
- Responsive and modern UI

## Technology Stack

- **Frontend**: Next.js, React, TailwindCSS
- **Blockchain**: Solidity, Hardhat, Ethers.js
- **Storage**: IPFS
- **Network**: Sepolia Testnet
- **Payment**: ERC20 Token (MockToken for testing)

## Project Structure

```
├── contracts/
│   ├── FileStorage.sol
│   └── MockToken.sol
├── scripts/
│   └── deploy.js
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   └── upload/
│   ├── components/
│   │   ├── FileUpload.tsx
│   │   └── FileList.tsx
│   ├── contracts/
│   │   └── FileStorage.json
│   └── hooks/
│       ├── useWeb3.ts
│       └── useContract.ts
├── .env
├── .env.local
├── hardhat.config.js
└── package.json
```

## Smart Contracts

### FileStorage.sol
- Manages file storage and access control
- Handles payment processing
- Integrates with IPFS for file storage
- Provides file metadata management

### MockToken.sol
- ERC20 token for testing payments
- Used for storage cost calculations
- Supports token transfers and approvals

## Frontend Components

### FileUpload.tsx
- Handles file selection and upload
- Manages upload progress and status
- Integrates with IPFS for file storage
- Handles payment processing

### FileList.tsx
- Displays user's stored files
- Shows file metadata and status
- Provides file access controls
- Supports file deletion

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd <project-directory>
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
Create `.env` file:
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Create `.env.local` file:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

4. Deploy smart contracts:
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

5. Start the development server:
```bash
npm run dev
```

## File Storage Details

### Storage Process
1. File is uploaded to IPFS
2. IPFS hash is stored on the blockchain
3. File metadata is recorded in the smart contract
4. Payment is processed for storage duration

### Storage Locations
- **IPFS**: Primary file storage
- **Blockchain**: File metadata and access control
- **Smart Contract**: File ownership and permissions

### File Retrieval
1. Get file hash from smart contract
2. Access file through IPFS gateway
3. Verify file ownership and permissions
4. Download or view file content

### Redundancy
- Files are stored on multiple IPFS nodes
- Blockchain provides immutable record
- Smart contract ensures access control

## Viewing Files with IPFS Desktop

1. **Install IPFS Desktop**
   - Download from [IPFS Desktop](https://github.com/ipfs/ipfs-desktop/releases)
   - Install and launch the application

2. **Connect to Files**
   - Open IPFS Desktop
   - Click "Import" button
   - Enter the IPFS hash (CID) from your dashboard
   - Click "Import"

3. **Access Files**
   - Files will appear in your IPFS Desktop
   - Right-click for options:
     - Share
     - Copy path
     - Download
     - Pin/Unpin

4. **Sharing Files**
   - Copy IPFS path
   - Share with others
   - Generate shareable links

5. **Managing Files**
   - Pin files for persistence
   - View file details
   - Monitor file status

6. **Troubleshooting**
   - Check IPFS Desktop connection
   - Verify hash is correct
   - Ensure file is pinned

## Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to the branch
5. Create a new Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
