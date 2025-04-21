# 📦 Decentralized File Storage System

A secure and decentralized file storage system built with **Next.js**, **Solidity**, and **IPFS**. This project allows users to upload and store files on IPFS with blockchain-based metadata management and token-based payments.

---

## 🚀 Features

- 📁 Upload & store files on IPFS
- 🔐 Access control & permissions via smart contracts
- 💰 Token-based payment system (MockToken)
- 🧠 Real-time file metadata and status updates
- 💡 Clean and responsive UI
- 🛠 Built on Sepolia testnet

---

## 🧱 Tech Stack

- **Frontend**: Next.js, React, Tailwind CSS  
- **Smart Contracts**: Solidity, Hardhat, Ethers.js  
- **Storage**: IPFS  
- **Blockchain Network**: Sepolia Testnet  
- **Payments**: ERC20 Mock Token  

---

## 📂 Project Structure

```
├── contracts/
│   ├── FileStorage.sol          # Manages file storage & payments
│   └── MockToken.sol            # ERC20 token for test payments
├── scripts/
│   └── deploy.js                # Deployment script
├── src/
│   ├── app/
│   │   ├── dashboard/           # User file dashboard
│   │   └── upload/              # Upload interface
│   ├── components/
│   │   ├── FileUpload.tsx       # Upload logic and UI
│   │   └── FileList.tsx         # Display stored files
│   ├── contracts/
│   │   └── FileStorage.json     # ABI for smart contract
│   └── hooks/
│       ├── useWeb3.ts           # Web3 connection
│       └── useContract.ts       # Contract interactions
├── .env
├── .env.local
├── hardhat.config.js
└── package.json
```

---

## ⚙️ Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/akshayyborse/IPFS-Project.git
cd IPFS-Project
```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment variables

Create a `.env` file:
```
SEPOLIA_RPC_URL=your_sepolia_rpc_url
PRIVATE_KEY=your_wallet_private_key
ETHERSCAN_API_KEY=your_etherscan_api_key
```

Create a `.env.local` file:
```
NEXT_PUBLIC_CONTRACT_ADDRESS=your_deployed_contract_address
```

### 4. Deploy smart contracts to Sepolia
```bash
npx hardhat run scripts/deploy.js --network sepolia
```

### 5. Start the development server
```bash
npm run dev
```

---

## 📡 How Storage Works

### Upload Flow

1. User selects a file via UI  
2. File is uploaded to IPFS  
3. IPFS hash and metadata stored on the blockchain  
4. Payment is processed via MockToken  

### File Access

- Use IPFS CID from smart contract  
- View via public IPFS gateways or IPFS Desktop  
- Access permissions enforced via smart contract  

---

## 🖥️ IPFS Desktop (Optional Viewing)

1. **Download** from [IPFS Desktop](https://github.com/ipfs/ipfs-desktop/releases)  
2. **Import File** using IPFS CID  
3. **Access**: Download, Pin, or Share files  

---

## 🤝 Contributing

1. Fork this repository  
2. Create a new branch: `git checkout -b feature-name`  
3. Commit changes: `git commit -m "Added feature"`  
4. Push: `git push origin feature-name`  
5. Open a Pull Request 🚀

---

## 📝 License

This project is licensed under the **MIT License**. See the [LICENSE](./LICENSE) file for details.

