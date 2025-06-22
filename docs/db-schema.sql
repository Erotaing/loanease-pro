-- =====================================================
-- LoanEase Pro Database Schema
-- Professional Loan Management Platform
-- =====================================================
-- 
-- This schema represents the MongoDB collections structure
-- converted to SQL format for documentation purposes.
-- The actual implementation uses MongoDB with Mongoose ODM.
--
-- Version: 1.0.0
-- Last Updated: 2024-01-15
-- =====================================================

-- =====================================================
-- USERS COLLECTION
-- =====================================================
-- Stores user account information including borrowers,
-- loan officers, and administrators
-- =====================================================

CREATE TABLE users (
    _id VARCHAR(24) PRIMARY KEY,
    firstName VARCHAR(100) NOT NULL,
    lastName VARCHAR(100) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL, -- Hashed using bcrypt
    role ENUM('borrower', 'loan_officer', 'admin') DEFAULT 'borrower',
    phone VARCHAR(20),
    
    -- Address Information
    address_street VARCHAR(255),
    address_city VARCHAR(100),
    address_state VARCHAR(50),
    address_zipCode VARCHAR(20),
    address_country VARCHAR(100),
    
    -- Personal Information
    dateOfBirth DATE,
    
    -- Employment Information
    employment_employer VARCHAR(255),
    employment_position VARCHAR(255),
    employment_yearsEmployed DECIMAL(4,2),
    employment_monthlyIncome DECIMAL(12,2),
    
    -- Financial Information
    creditScore INT CHECK (creditScore >= 300 AND creditScore <= 850),
    
    -- Account Status
    status ENUM('active', 'suspended', 'inactive') DEFAULT 'active',
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_email (email),
    INDEX idx_role (role),
    INDEX idx_status (status),
    INDEX idx_created_at (createdAt)
);

-- =====================================================
-- LOANS COLLECTION
-- =====================================================
-- Stores loan application information and status
-- =====================================================

CREATE TABLE loans (
    _id VARCHAR(24) PRIMARY KEY,
    user VARCHAR(24) NOT NULL, -- Reference to users._id
    
    -- Loan Details
    amount DECIMAL(15,2) NOT NULL CHECK (amount >= 1000 AND amount <= 1000000),
    term INT NOT NULL CHECK (term >= 6 AND term <= 360), -- Term in months
    purpose TEXT NOT NULL,
    
    -- Application Status
    status ENUM('draft', 'submitted', 'approved', 'rejected', 'disbursed') DEFAULT 'draft',
    
    -- Risk Assessment
    riskScore DECIMAL(5,4), -- Risk score between 0 and 1
    
    -- Decision Information
    decision_by VARCHAR(24), -- Reference to users._id (decision maker)
    decision_at TIMESTAMP NULL,
    decision_comments TEXT,
    
    -- Calculated Fields
    interestRate DECIMAL(5,4), -- Annual interest rate
    monthlyPayment DECIMAL(12,2), -- Calculated monthly payment
    totalPayment DECIMAL(15,2), -- Total amount to be paid
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user) REFERENCES users(_id) ON DELETE CASCADE,
    FOREIGN KEY (decision_by) REFERENCES users(_id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_user (user),
    INDEX idx_status (status),
    INDEX idx_amount (amount),
    INDEX idx_created_at (createdAt),
    INDEX idx_decision_at (decision_at),
    INDEX idx_risk_score (riskScore)
);

-- =====================================================
-- DOCUMENTS COLLECTION
-- =====================================================
-- Stores document metadata and file information
-- =====================================================

CREATE TABLE documents (
    _id VARCHAR(24) PRIMARY KEY,
    user VARCHAR(24) NOT NULL, -- Reference to users._id
    loan VARCHAR(24), -- Reference to loans._id (optional)
    
    -- Document Information
    name VARCHAR(255) NOT NULL,
    type ENUM('id_proof', 'income_proof', 'address_proof', 'bank_statement', 'tax_return', 'other') NOT NULL,
    
    -- File Information
    fileUrl VARCHAR(500) NOT NULL, -- Path to stored file
    originalName VARCHAR(255) NOT NULL, -- Original filename
    mimeType VARCHAR(100) NOT NULL,
    size BIGINT NOT NULL, -- File size in bytes
    
    -- Upload Information
    uploadedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Verification Status
    status ENUM('pending', 'verified', 'rejected') DEFAULT 'pending',
    verifiedBy VARCHAR(24), -- Reference to users._id (verifier)
    verifiedAt TIMESTAMP NULL,
    verificationComments TEXT,
    
    -- OCR and Processing
    ocrData JSON, -- Extracted text and data from OCR
    metadata JSON, -- Additional metadata
    
    -- Security
    checksum VARCHAR(64), -- File integrity checksum
    encrypted BOOLEAN DEFAULT FALSE,
    
    -- Timestamps
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    
    -- Foreign Keys
    FOREIGN KEY (user) REFERENCES users(_id) ON DELETE CASCADE,
    FOREIGN KEY (loan) REFERENCES loans(_id) ON DELETE SET NULL,
    FOREIGN KEY (verifiedBy) REFERENCES users(_id) ON DELETE SET NULL,
    
    -- Indexes
    INDEX idx_user (user),
    INDEX idx_loan (loan),
    INDEX idx_type (type),
    INDEX idx_status (status),
    INDEX idx_uploaded_at (uploadedAt),
    INDEX idx_verified_at (verifiedAt)
);

-- =====================================================
-- AUDIT_LOGS COLLECTION
-- =====================================================
-- Stores audit trail for all system activities
-- =====================================================

CREATE TABLE audit_logs (
    _id VARCHAR(24) PRIMARY KEY,
    
    -- Actor Information
    user VARCHAR(24), -- Reference to users._id (can be null for system actions)
    userEmail VARCHAR(255), -- Denormalized for audit purposes
    userRole VARCHAR(50),
    
    -- Action Information
    action VARCHAR(100) NOT NULL, -- e.g., 'CREATE_LOAN', 'APPROVE_LOAN', 'UPLOAD_DOCUMENT'
    resource VARCHAR(50) NOT NULL, -- e.g., 'loan', 'user', 'document'
    resourceId VARCHAR(24), -- ID of the affected resource
    
    -- Request Information
    method VARCHAR(10), -- HTTP method
    endpoint VARCHAR(255), -- API endpoint
    ipAddress VARCHAR(45), -- IPv4 or IPv6
    userAgent TEXT,
    
    -- Change Information
    oldValues JSON, -- Previous state (for updates)
    newValues JSON, -- New state
    
    -- Result Information
    success BOOLEAN NOT NULL,
    errorMessage TEXT,
    
    -- Timestamps
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    
    -- Indexes
    INDEX idx_user (user),
    INDEX idx_action (action),
    INDEX idx_resource (resource, resourceId),
    INDEX idx_timestamp (timestamp),
    INDEX idx_success (success)
);

-- =====================================================
-- SAMPLE DATA INSERTS
-- =====================================================
-- Sample data for development and testing
-- =====================================================

-- Sample System Settings
INSERT INTO system_settings (category, key, value, description, dataType) VALUES
('loan_limits', 'min_amount', '1000', 'Minimum loan amount in USD', 'number'),
('loan_limits', 'max_amount', '1000000', 'Maximum loan amount in USD', 'number'),
('loan_limits', 'min_term', '6', 'Minimum loan term in months', 'number'),
('loan_limits', 'max_term', '360', 'Maximum loan term in months', 'number'),
('interest_rates', 'base_rate', '0.05', 'Base interest rate (5%)', 'number'),
('risk_thresholds', 'auto_approve_threshold', '0.2', 'Auto-approve if risk score below this', 'number'),
('risk_thresholds', 'auto_reject_threshold', '0.8', 'Auto-reject if risk score above this', 'number');

-- =====================================================
-- VIEWS FOR REPORTING
-- =====================================================

-- Loan Summary View
CREATE VIEW loan_summary AS
SELECT 
    l._id,
    l.amount,
    l.term,
    l.status,
    l.riskScore,
    l.createdAt,
    u.firstName,
    u.lastName,
    u.email,
    u.creditScore,
    COUNT(d._id) as documentCount
FROM loans l
JOIN users u ON l.user = u._id
LEFT JOIN documents d ON l._id = d.loan
GROUP BY l._id;

-- Monthly Statistics View
CREATE VIEW monthly_stats AS
SELECT 
    DATE_FORMAT(createdAt, '%Y-%m') as month,
    COUNT(*) as applications,
    COUNT(CASE WHEN status = 'approved' THEN 1 END) as approvals,
    COUNT(CASE WHEN status = 'rejected' THEN 1 END) as rejections,
    SUM(amount) as totalAmount,
    AVG(amount) as averageAmount,
    AVG(riskScore) as averageRiskScore
FROM loans
GROUP BY DATE_FORMAT(createdAt, '%Y-%m')
ORDER BY month DESC;

/*
Database Design Notes:

1. Primary Keys:
   - All tables use VARCHAR(24) for _id to match MongoDB ObjectId format
   - This maintains compatibility with the existing MongoDB implementation

2. Foreign Key Relationships:
   - users -> loans (one-to-many)
   - users -> documents (one-to-many)
   - loans -> documents (one-to-many)

3. JSON Fields:
   - Used for flexible schema parts (metadata, ocrData, etc.)
   - Allows for future extensibility without schema changes

4. Audit Trail:
   - All important operations are logged in audit_logs
   - Maintains compliance and security requirements

5. Performance Considerations:
   - Indexes on frequently queried columns
   - Composite indexes for common query patterns
   - Views for complex reporting queries

6. Security Features:
   - Password hashing (handled in application layer)
   - File integrity checksums
   - Audit logging

7. Data Integrity:
   - Check constraints for valid ranges
   - Foreign key constraints
   - Enum types for controlled values
*/