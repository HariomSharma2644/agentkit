// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title OilWiseCertification
 * @dev Smart contract for managing low-oil product certifications
 */
contract OilWiseCertification {
    
    struct Certificate {
        uint256 id;
        address partner;
        string productName;
        uint256 oilContent; // in grams
        string certificationType; // 'low-oil', 'healthy-oil', 'domestic-oil'
        uint256 issuedAt;
        uint256 expiresAt;
        bool isActive;
        string verificationHash;
    }
    
    struct Partner {
        address walletAddress;
        string name;
        string partnerType; // 'restaurant', 'manufacturer', 'retailer'
        bool isVerified;
        uint256 registeredAt;
    }
    
    // State variables
    mapping(uint256 => Certificate) public certificates;
    mapping(address => Partner) public partners;
    mapping(address => uint256[]) public partnerCertificates;
    
    uint256 public certificateCounter = 0;
    address public admin;
    
    // Events
    event CertificateIssued(
        uint256 indexed certificateId,
        address indexed partner,
        string productName,
        uint256 oilContent
    );
    
    event CertificateVerified(
        uint256 indexed certificateId,
        bool isActive
    );
    
    event PartnerRegistered(
        address indexed partner,
        string name,
        string partnerType
    );
    
    event PartnerVerified(
        address indexed partner,
        bool isVerified
    );
    
    // Modifiers
    modifier onlyAdmin() {
        require(msg.sender == admin, "Only admin can call this function");
        _;
    }
    
    modifier onlyVerifiedPartner() {
        require(partners[msg.sender].isVerified, "Partner not verified");
        _;
    }
    
    // Constructor
    constructor() {
        admin = msg.sender;
    }
    
    /**
     * Register a new partner
     */
    function registerPartner(
        string memory _name,
        string memory _partnerType
    ) public {
        require(partners[msg.sender].walletAddress == address(0), "Partner already registered");
        
        partners[msg.sender] = Partner({
            walletAddress: msg.sender,
            name: _name,
            partnerType: _partnerType,
            isVerified: false,
            registeredAt: block.timestamp
        });
        
        emit PartnerRegistered(msg.sender, _name, _partnerType);
    }
    
    /**
     * Verify a partner (admin only)
     */
    function verifyPartner(address _partner) public onlyAdmin {
        require(partners[_partner].walletAddress != address(0), "Partner not found");
        partners[_partner].isVerified = true;
        emit PartnerVerified(_partner, true);
    }
    
    /**
     * Issue a certificate for a product
     */
    function issueCertificate(
        string memory _productName,
        uint256 _oilContent,
        string memory _certificationType,
        string memory _verificationHash
    ) public onlyVerifiedPartner returns (uint256) {
        uint256 certificateId = certificateCounter++;
        
        uint256 expiresAt = block.timestamp + (365 days);
        
        certificates[certificateId] = Certificate({
            id: certificateId,
            partner: msg.sender,
            productName: _productName,
            oilContent: _oilContent,
            certificationType: _certificationType,
            issuedAt: block.timestamp,
            expiresAt: expiresAt,
            isActive: true,
            verificationHash: _verificationHash
        });
        
        partnerCertificates[msg.sender].push(certificateId);
        
        emit CertificateIssued(
            certificateId,
            msg.sender,
            _productName,
            _oilContent
        );
        
        return certificateId;
    }
    
    /**
     * Verify certificate authenticity
     */
    function verifyCertificate(uint256 _certificateId) public view returns (bool) {
        Certificate memory cert = certificates[_certificateId];
        
        if (!cert.isActive) return false;
        if (block.timestamp > cert.expiresAt) return false;
        if (!partners[cert.partner].isVerified) return false;
        
        return true;
    }
    
    /**
     * Get certificate details
     */
    function getCertificate(uint256 _certificateId) public view returns (Certificate memory) {
        return certificates[_certificateId];
    }
    
    /**
     * Get partner certificates
     */
    function getPartnerCertificates(address _partner) public view returns (uint256[] memory) {
        return partnerCertificates[_partner];
    }
    
    /**
     * Revoke a certificate (admin only)
     */
    function revokeCertificate(uint256 _certificateId) public onlyAdmin {
        certificates[_certificateId].isActive = false;
        emit CertificateVerified(_certificateId, false);
    }
    
    /**
     * Get partner details
     */
    function getPartner(address _partner) public view returns (Partner memory) {
        return partners[_partner];
    }
}

