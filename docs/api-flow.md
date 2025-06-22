# LoanEase Pro API Flow Documentation

## Overview

This document outlines the API flow patterns, request/response cycles, and business logic for the LoanEase Pro loan management platform.

## Table of Contents

1. [Authentication Flow](#authentication-flow)
2. [Loan Application Flow](#loan-application-flow)
3. [Document Management Flow](#document-management-flow)
4. [Admin Operations Flow](#admin-operations-flow)
5. [Error Handling](#error-handling)
6. [Security Considerations](#security-considerations)

---

## Authentication Flow

### User Registration

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database
    participant EmailService
    
    Client->>API: POST /api/auth/register
    Note over Client,API: { firstName, lastName, email, password, role }
    
    API->>API: Validate input data
    API->>API: Hash password (bcrypt)
    API->>Database: Check if email exists
    
    alt Email already exists
        Database-->>API: User found
        API-->>Client: 400 Bad Request
        Note over API,Client: { error: "Email already registered" }
    else Email available
        Database-->>API: No user found
        API->>Database: Create new user
        Database-->>API: User created
        API->>API: Generate JWT token
        API->>EmailService: Send welcome email
        API-->>Client: 201 Created
        Note over API,Client: { user: {...}, token: "jwt_token" }
    end
```

### User Login

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database
    
    Client->>API: POST /api/auth/login
    Note over Client,API: { email, password }
    
    API->>Database: Find user by email
    
    alt User not found
        Database-->>API: No user found
        API-->>Client: 401 Unauthorized
        Note over API,Client: { error: "Invalid credentials" }
    else User found
        Database-->>API: User data
        API->>API: Compare password (bcrypt)
        
        alt Password invalid
            API-->>Client: 401 Unauthorized
            Note over API,Client: { error: "Invalid credentials" }
        else Password valid
            API->>API: Generate JWT token
            API->>Database: Update last login
            API-->>Client: 200 OK
            Note over API,Client: { user: {...}, token: "jwt_token" }
        end
    end
```

---

## Loan Application Flow

### Create Loan Application

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant Database
    participant RiskEngine
    participant NotificationService
    
    Client->>API: POST /api/loans
    Note over Client,API: Authorization: Bearer {token}
    Note over Client,API: { amount, term, purpose }
    
    API->>API: Validate JWT token
    API->>API: Validate loan data
    
    alt Invalid data
        API-->>Client: 400 Bad Request
        Note over API,Client: { errors: [...] }
    else Valid data
        API->>Database: Create loan record
        Database-->>API: Loan created
        
        API->>RiskEngine: Calculate risk score
        Note over API,RiskEngine: { userId, amount, term, creditScore }
        RiskEngine-->>API: Risk score calculated
        
        API->>Database: Update loan with risk score
        API->>NotificationService: Send confirmation
        
        API-->>Client: 201 Created
        Note over API,Client: { loan: {...}, riskScore: 0.25 }
    end
```

### Loan Approval Process

```mermaid
sequenceDiagram
    participant LoanOfficer
    participant API
    participant Database
    participant NotificationService
    participant AuditService
    
    LoanOfficer->>API: PUT /api/loans/{id}/approve
    Note over LoanOfficer,API: Authorization: Bearer {token}
    Note over LoanOfficer,API: { comments, interestRate }
    
    API->>API: Validate JWT token
    API->>API: Check user role (loan_officer/admin)
    
    alt Insufficient permissions
        API-->>LoanOfficer: 403 Forbidden
    else Authorized
        API->>Database: Get loan details
        Database-->>API: Loan data
        
        alt Loan not found or invalid status
            API-->>LoanOfficer: 404 Not Found / 400 Bad Request
        else Valid loan
            API->>API: Calculate monthly payment
            API->>Database: Update loan status to 'approved'
            Database-->>API: Loan updated
            
            API->>NotificationService: Notify borrower
            API->>AuditService: Log approval action
            
            API-->>LoanOfficer: 200 OK
            Note over API,LoanOfficer: { loan: {...}, message: "Loan approved" }
        end
    end
```

---

## Document Management Flow

### Document Upload

```mermaid
sequenceDiagram
    participant Client
    participant API
    participant FileStorage
    participant Database
    participant OCRService
    
    Client->>API: POST /api/documents/upload
    Note over Client,API: multipart/form-data
    Note over Client,API: { file, type, loanId? }
    
    API->>API: Validate file type and size
    
    alt Invalid file
        API-->>Client: 400 Bad Request
        Note over API,Client: { error: "Invalid file type" }
    else Valid file
        API->>API: Generate unique filename
        API->>FileStorage: Store file
        FileStorage-->>API: File URL
        
        API->>Database: Create document record
        Database-->>API: Document created
        
        API->>OCRService: Extract text (async)
        Note over API,OCRService: For supported document types
        
        API-->>Client: 201 Created
        Note over API,Client: { document: {...} }
        
        OCRService-->>API: OCR results (webhook)
        API->>Database: Update document with OCR data
    end
```

### Document Verification

```mermaid
sequenceDiagram
    participant LoanOfficer
    participant API
    participant Database
    participant NotificationService
    
    LoanOfficer->>API: PUT /api/documents/{id}/verify
    Note over LoanOfficer,API: { status, comments }
    
    API->>Database: Get document
    Database-->>API: Document data
    
    alt Document not found
        API-->>LoanOfficer: 404 Not Found
    else Document found
        API->>Database: Update verification status
        Database-->>API: Document updated
        
        API->>NotificationService: Notify document owner
        
        API-->>LoanOfficer: 200 OK
        Note over API,LoanOfficer: { document: {...} }
    end
```

---

## Admin Operations Flow

### Dashboard Statistics

```mermaid
sequenceDiagram
    participant Admin
    participant API
    participant Database
    participant CacheService
    
    Admin->>API: GET /api/admin/dashboard
    
    API->>CacheService: Check cached stats
    
    alt Cache hit
        CacheService-->>API: Cached data
        API-->>Admin: 200 OK (cached)
    else Cache miss
        CacheService-->>API: No cache
        
        API->>Database: Query loan statistics
        API->>Database: Query user statistics
        API->>Database: Query document statistics
        
        Database-->>API: Aggregated data
        
        API->>CacheService: Store in cache (5 min TTL)
        API-->>Admin: 200 OK
        Note over API,Admin: { totalLoans, approvalRate, ... }
    end
```

---

## Error Handling

### Standard Error Response Format

```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": [
      {
        "field": "amount",
        "message": "Amount must be between $1,000 and $1,000,000"
      }
    ],
    "timestamp": "2024-01-15T10:30:00Z",
    "requestId": "req_123456789"
  }
}
```

### Error Codes

| Code | HTTP Status | Description |
|------|-------------|-------------|
| `VALIDATION_ERROR` | 400 | Request validation failed |
| `AUTHENTICATION_ERROR` | 401 | Invalid or missing authentication |
| `AUTHORIZATION_ERROR` | 403 | Insufficient permissions |
| `RESOURCE_NOT_FOUND` | 404 | Requested resource not found |
| `DUPLICATE_RESOURCE` | 409 | Resource already exists |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests |
| `INTERNAL_SERVER_ERROR` | 500 | Unexpected server error |
| `SERVICE_UNAVAILABLE` | 503 | External service unavailable |

---

## Security Considerations

### Request Security

1. **Rate Limiting**: All endpoints are rate-limited
   - Authentication: 5 requests per minute
   - General API: 100 requests per minute
   - File upload: 10 requests per minute

2. **Input Validation**: All inputs are validated and sanitized
   - SQL injection prevention
   - XSS protection
   - File type validation

3. **Authentication**: JWT tokens with expiration
   - Access token: 15 minutes
   - Refresh token: 7 days

### Data Protection

1. **Encryption**: Sensitive data encrypted at rest
2. **Audit Logging**: All operations logged for compliance
3. **File Security**: Uploaded files scanned for malware

### API Security Headers

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Strict-Transport-Security: max-age=31536000; includeSubDomains
Content-Security-Policy: default-src 'self'
```

---

## Response Time SLAs

| Operation Type | Target Response Time | Maximum Response Time |
|----------------|---------------------|----------------------|
| Authentication | < 200ms | < 500ms |
| Loan CRUD | < 300ms | < 1s |
| Document Upload | < 2s | < 10s |
| Admin Dashboard | < 500ms | < 2s |
| File Download | < 1s | < 5s |

---

## Monitoring and Alerting

### Key Metrics

1. **Performance Metrics**
   - Response time percentiles (P50, P95, P99)
   - Request rate (requests per second)
   - Error rate percentage

2. **Business Metrics**
   - Loan application rate
   - Approval/rejection rates
   - Document processing time

3. **System Metrics**
   - CPU and memory usage
   - Database connection pool
   - File storage usage

### Alert Thresholds

- Error rate > 5%
- Response time P95 > 2 seconds
- Database connections > 80% of pool
- Disk usage > 85%

---

*This document is maintained by the LoanEase Pro development team and updated with each API version release.*