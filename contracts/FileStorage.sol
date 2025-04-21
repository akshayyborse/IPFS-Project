// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/utils/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract FileStorage is AccessControl, ReentrancyGuard {
    bytes32 public constant OWNER_ROLE = keccak256("OWNER_ROLE");
    
    struct File {
        string ipfsHash;
        address owner;
        uint256 timestamp;
        bool isEncrypted;
        bool isPublic;
        uint256 storageCost;
        uint256 expiryDate;
    }

    mapping(string => File) public files;
    mapping(address => string[]) public userFiles;
    mapping(string => mapping(address => bool)) public fileAccess;
    
    uint256 public storagePricePerDay = 0.0000001 ether;
    IERC20 public paymentToken;
    
    event FileUploaded(
        string indexed ipfsHash,
        address indexed owner,
        uint256 timestamp,
        bool isEncrypted,
        bool isPublic
    );
    
    event FileAccessGranted(
        string indexed ipfsHash,
        address indexed owner,
        address indexed user
    );
    
    event FileAccessRevoked(
        string indexed ipfsHash,
        address indexed owner,
        address indexed user
    );
    
    event FileDeleted(
        string indexed ipfsHash,
        address indexed owner
    );
    
    constructor(address _paymentToken) {
        require(_paymentToken != address(0), "Invalid payment token address");
        paymentToken = IERC20(_paymentToken);
        
        // Initialize roles
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(OWNER_ROLE, msg.sender);
        
        // Set role hierarchy
        _setRoleAdmin(OWNER_ROLE, DEFAULT_ADMIN_ROLE);
    }
    
    function uploadFile(
        string memory _ipfsHash,
        bool _isEncrypted,
        bool _isPublic,
        uint256 _storageDuration
    ) external payable nonReentrant {
        require(bytes(_ipfsHash).length > 0, "Invalid IPFS hash");
        require(_storageDuration > 0 && _storageDuration <= 365, "Invalid storage duration");
        
        uint256 storageCost = calculateStorageCost(_storageDuration);
        require(msg.value >= storageCost, "Insufficient payment");
        
        files[_ipfsHash] = File({
            ipfsHash: _ipfsHash,
            owner: msg.sender,
            timestamp: block.timestamp,
            isEncrypted: _isEncrypted,
            isPublic: _isPublic,
            storageCost: storageCost,
            expiryDate: block.timestamp + (_storageDuration * 1 days)
        });
        
        userFiles[msg.sender].push(_ipfsHash);
        
        emit FileUploaded(_ipfsHash, msg.sender, block.timestamp, _isEncrypted, _isPublic);
    }
    
    function grantAccess(string memory _ipfsHash, address _user) external {
        require(files[_ipfsHash].owner == msg.sender, "Not file owner");
        require(!fileAccess[_ipfsHash][_user], "Access already granted");
        
        fileAccess[_ipfsHash][_user] = true;
        emit FileAccessGranted(_ipfsHash, msg.sender, _user);
    }
    
    function revokeAccess(string memory _ipfsHash, address _user) external {
        require(files[_ipfsHash].owner == msg.sender, "Not file owner");
        require(fileAccess[_ipfsHash][_user], "Access not granted");
        
        fileAccess[_ipfsHash][_user] = false;
        emit FileAccessRevoked(_ipfsHash, msg.sender, _user);
    }
    
    function deleteFile(string memory _ipfsHash) external {
        require(files[_ipfsHash].owner == msg.sender, "Not file owner");
        
        delete files[_ipfsHash];
        emit FileDeleted(_ipfsHash, msg.sender);
    }
    
    function getFile(string memory _ipfsHash) external view returns (File memory) {
        require(files[_ipfsHash].owner != address(0), "File not found");
        require(
            files[_ipfsHash].owner == msg.sender ||
            files[_ipfsHash].isPublic ||
            fileAccess[_ipfsHash][msg.sender],
            "Access denied"
        );
        
        return files[_ipfsHash];
    }
    
    function getUserFiles(address _user) external view returns (string[] memory) {
        return userFiles[_user];
    }
    
    function calculateStorageCost(uint256 _duration) public view returns (uint256) {
        return storagePricePerDay * _duration;
    }
    
    function setStoragePrice(uint256 _pricePerDay) external onlyRole(OWNER_ROLE) {
        storagePricePerDay = _pricePerDay;
    }
    
    function withdrawFunds() external onlyRole(OWNER_ROLE) {
        uint256 balance = address(this).balance;
        require(balance > 0, "No funds to withdraw");
        
        (bool success, ) = msg.sender.call{value: balance}("");
        require(success, "Transfer failed");
    }
} 