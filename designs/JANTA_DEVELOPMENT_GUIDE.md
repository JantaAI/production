# JANTA Development Guide

## 📋 Table of Contents
1. [Project Overview](#project-overview)
2. [Current Application Structure](#current-application-structure)
3. [What's Already Built](#whats-already-built)
4. [What's Missing (Backend Integration)](#whats-missing-backend-integration)
5. [File Structure & Location Guide](#file-structure--location-guide)
6. [Setup Instructions](#setup-instructions)
7. [Known Issues & Future Work](#known-issues--future-work)

---

## 🎯 Project Overview

JANTA is a healthcare platform with **three distinct user experiences**:
- **Employees**: Health chat, personal claims, doctor consultations, lab tests
- **Founders**: Company management, billing, employee roster, analytics
- **Internal (JANTA Staff)**: Incoming calls, claims management, onboarding controls, company files

### Design System
- **Primary Color**: `#482b22` (brown) - ONLY brown color used throughout
- **Text Colors**: White (`#f9f9f9`, `#f9f8f6`) - No gray text except in placeholders
- **Typography**: ABC Diatype font family
- **No Hover Effects**: All hover effects removed per design requirements

---

## 📂 Current Application Structure

### ✅ What's Already Built (Frontend Complete)

#### 1. **Authentication System**
- **Location**: `/components/Login.tsx`
- **Features**:
  - Login modal with phone number input
  - Password input with show/hide toggle
  - "Forgot password?" functionality (UI only)
  - Fully styled and functional (local state)
- **Note**: Currently uses mock authentication - no backend validation

#### 2. **Onboarding Flows** (2 Separate Systems)

##### Employee Onboarding
- **Page 1**: `/components/OnboardingECode.tsx`
  - Clean white code entry page
  - 8-digit unique code input
  - Validates code before proceeding
  
- **Page 2**: `/components/OnboardingE.tsx`
  - "Welcome Spencer!" message
  - 3 feature graphics (AI Doctor, Real Doctors, Lab Tests)
  - Password setup with brown container
  - Styled to match login page aesthetics
  - Redirects directly to front page on completion

##### Founder Onboarding
- **Single Page**: `/components/OnboardingF.tsx`
  - Comprehensive one-page setup
  - Company information collection
  - Employee information file upload
  - Company details (name, address, tax ID, email, phone)
  - "Thank you" message on completion
  
#### 3. **Main Dashboard** (Single Interface - NEEDS SPLITTING)

**Current State**: One dashboard for both E and F users
- **Location**: `/App.tsx` lines 1220-1450
- **Features**:
  - AI chat interface
  - Message history
  - File upload capability
  - Voice recording (mic button)
  - Send button (dual function: send/stop recording)
  
**Conditional Elements**:
- Wallet button: Only shown for founders (`userType === 'founder'`)
- Account Details: Only in wallet view for founders

**⚠️ ISSUE**: Should be TWO separate dashboards:
- **Employee Dashboard**: Personal health chat, claims, appointments
- **Founder Dashboard**: Company overview, employee roster, billing, analytics

#### 4. **Wallet View** (Founders Only)
- **Location**: `/App.tsx` lines 928-1220
- **Features**:
  - Total balance display
  - Payment method selection
  - Account overview
  - Past invoices view (separate sub-page)
  - Account details section (founders only)
  - Add payment method functionality
  - Styled invoice list

#### 5. **Internal Dashboard** (JANTA Staff)
- **Location**: `/App.tsx` lines 666-928
- **Button**: Removed from UI but functionality intact
- **Features**:
  - **Incoming Calls**: Live call information with AI summary
  - **Claims Management**: 
    - AI-powered search
    - Claim acceptance/denial
    - Employee and company details
  - **Onboarding Controls**:
    - Employee onboarding code generation
    - Founder onboarding code generation
    - Code display and management
  - **Companies & Employees**:
    - Company list with employee counts
    - File upload for company/employee data
    - Expandable company details

#### 6. **Customer Service Flow**
- **Location**: `/App.tsx` lines 614-663
- **Features**:
  - Profile menu dropdown
  - Phone number verification
  - Call initiation
  - Active call state with timer
  - End call functionality

#### 7. **UI Components**
- **Gradient Background**: `/components/GradientBackground.tsx`
- **Custom SVG imports**: `/imports/` directory
- **Asset management**: All images in Figma assets
- **UI Library**: Full component library in `/components/ui/`

---

## ❌ What's Missing (Backend Integration)

### 1. **API Endpoints Needed**

All backend integration points are clearly marked in the code with comments like:
```javascript
// BACKEND: POST /api/endpoint
```

#### Authentication APIs
```
POST /api/auth/login
Body: { phone: string, password: string }
Response: { success: boolean, token: string, user: { name, type, id } }

POST /api/auth/logout
Response: { success: boolean }

GET /api/auth/me
Response: { user: { name, email, phone, type } }

POST /api/auth/forgot-password
Body: { phone: string }
Response: { success: boolean, message: string }
```

#### Onboarding APIs
```
POST /api/onboarding/verify-code
Body: { code: string, type: 'employee' | 'founder' }
Response: { valid: boolean, userName?: string }

POST /api/onboarding/employee/complete
Body: { code: string, phone: string, password: string }
Response: { success: boolean, userId: string }

POST /api/onboarding/founder/complete
Body: { 
  code: string,
  phone: string, 
  password: string,
  companyName: string,
  companyAddress: string,
  companyTaxId: string,
  companyEmail: string,
  companyPhone: string,
  employeeFile?: File
}
Response: { success: boolean, companyId: string }

POST /api/onboarding/generate-code
Body: { type: 'employee' | 'founder' }
Response: { code: string }
```

#### Chat/AI APIs
```
POST /api/chat/message
Body: { message: string, files?: File[] }
Response: { 
  answer: string,
  messageId: string,
  timestamp: string
}

POST /api/chat/voice-record
Body: FormData with audio blob
Response: { 
  transcription: string,
  answer: string
}
```

#### Claims Management APIs
```
GET /api/claims/search?query={query}
Response: { claims: Array<Claim> }

GET /api/claims
Response: { claims: Array<Claim> }

POST /api/claims/:id/accept
Response: { success: boolean, claim: Claim }

POST /api/claims/:id/deny
Response: { success: boolean, claim: Claim }

Interface Claim {
  id: string;
  employee: string;
  company: string;
  phone: string;
  type: string;
  amount: string;
  date: string;
  status: 'pending' | 'accepted' | 'denied';
}
```

#### Companies & Employees APIs
```
GET /api/companies
Response: { 
  companies: Array<{
    id: string;
    name: string;
    employeeCount: number;
    employees: Array<Employee>;
  }>
}

POST /api/companies/:id/upload-file
Body: FormData with file
Response: { success: boolean, fileUrl: string }
```

#### Incoming Calls (Real-time)
```
WebSocket: ws://api/calls/incoming
Message format: {
  name: string;
  phone: string;
  company: string;
  reason: string;
  aiSummary: string;
}

POST /api/calls/:id/answer
Response: { success: boolean, callId: string }

POST /api/calls/:id/end
Response: { success: boolean, duration: number }
```

#### Wallet/Billing APIs
```
GET /api/wallet/balance
Response: { balance: number, currency: string }

GET /api/wallet/invoices
Response: { invoices: Array<Invoice> }

POST /api/wallet/payment-method
Body: { type: 'card' | 'bank', details: object }
Response: { success: boolean, methodId: string }

Interface Invoice {
  id: string;
  date: string;
  amount: string;
  description: string;
  status: 'paid' | 'pending' | 'overdue';
}
```

### 2. **Database Schema Needed**

#### Users Table
```sql
CREATE TABLE users (
  id UUID PRIMARY KEY,
  phone VARCHAR(20) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(100),
  email VARCHAR(100),
  user_type VARCHAR(20), -- 'employee' | 'founder' | 'internal'
  company_id UUID REFERENCES companies(id),
  avatar_url TEXT,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Companies Table
```sql
CREATE TABLE companies (
  id UUID PRIMARY KEY,
  name VARCHAR(200) NOT NULL,
  address TEXT,
  tax_id VARCHAR(50),
  email VARCHAR(100),
  phone VARCHAR(20),
  employee_info_file_url TEXT,
  balance DECIMAL(10, 2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Onboarding Codes Table
```sql
CREATE TABLE onboarding_codes (
  id UUID PRIMARY KEY,
  code VARCHAR(8) UNIQUE NOT NULL,
  type VARCHAR(20) NOT NULL, -- 'employee' | 'founder'
  used BOOLEAN DEFAULT FALSE,
  used_by UUID REFERENCES users(id),
  created_at TIMESTAMP DEFAULT NOW(),
  expires_at TIMESTAMP
);
```

#### Messages Table
```sql
CREATE TABLE messages (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  files JSONB, -- Array of file URLs
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Claims Table
```sql
CREATE TABLE claims (
  id UUID PRIMARY KEY,
  employee_id UUID REFERENCES users(id),
  company_id UUID REFERENCES companies(id),
  type VARCHAR(100),
  amount DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Invoices Table
```sql
CREATE TABLE invoices (
  id UUID PRIMARY KEY,
  company_id UUID REFERENCES companies(id),
  amount DECIMAL(10, 2),
  description TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  due_date DATE,
  paid_date DATE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

#### Calls Table
```sql
CREATE TABLE calls (
  id UUID PRIMARY KEY,
  caller_id UUID REFERENCES users(id),
  caller_name VARCHAR(100),
  caller_phone VARCHAR(20),
  company_id UUID REFERENCES companies(id),
  reason TEXT,
  ai_summary TEXT,
  status VARCHAR(20), -- 'incoming' | 'active' | 'ended'
  duration INTEGER, -- in seconds
  created_at TIMESTAMP DEFAULT NOW(),
  ended_at TIMESTAMP
);
```

### 3. **File Storage**
- Need cloud storage for:
  - Employee information files (company uploads)
  - Chat file attachments (images, documents)
  - User avatars
  - Voice recordings
- Suggested: AWS S3, Google Cloud Storage, or Supabase Storage

### 4. **Real-time Features**
- WebSocket connection for incoming calls
- Server-Sent Events for live claim updates
- Real-time chat message delivery

---

## 📁 File Structure & Location Guide

```
/
├── App.tsx                          # Main application file (2000+ lines)
│   ├── Lines 1-31:                  Backend integration guide comments
│   ├── Lines 144-168:               State management for all views
│   ├── Lines 284-340:               Login handlers
│   ├── Lines 344-363:               Onboarding save handlers
│   ├── Lines 575-665:               Header (logo, login, wallet, internal)
│   ├── Lines 666-928:               Internal Dashboard view
│   ├── Lines 928-1220:              Wallet view & Past Invoices
│   └── Lines 1220-1450:             Chat interface & main dashboard
│
├── components/
│   ├── Login.tsx                    # Login modal component
│   ├── OnboardingE.tsx              # Employee welcome page (page 2)
│   ├── OnboardingECode.tsx          # Employee code entry (page 1)
│   ├── OnboardingF.tsx              # Founder onboarding (single page)
│   ├── GradientBackground.tsx       # Background gradient component
│   │
│   ├── figma/
│   │   └── ImageWithFallback.tsx    # Protected - don't modify
│   │
│   └── ui/                          # Full UI component library
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ... (40+ components)
│
├── imports/                         # Figma imported assets
│   ├── svg-*.tsx/ts                 # SVG path data
│   └── Desktop-*.tsx                # Design components
│
├── assets/
│   └── janta-logo-new.png          # Main logo file
│
├── styles/
│   └── globals.css                  # Global styles & typography
│
└── utils/
    └── api.ts                       # API utility functions (stub)
```

### Key Files Breakdown

#### `/App.tsx` - Main Application (2000+ lines)
**State Management (lines 144-168)**:
- `isLoggedIn`: User authentication state
- `showLogin`: Login modal visibility
- `isChatMode`: Chat interface active
- `isWalletView`: Wallet view active
- `isInternalView`: Internal dashboard active
- `isOnboardingFlow`: Employee onboarding active
- `isOnboardingFFlow`: Founder onboarding active
- `userType`: 'employee' | 'founder' | null
- `messages`: Chat message array
- `uploadedFiles`: File attachments
- Plus 30+ more state variables

**Important Sections**:
- **Search/Chat Input**: Lines 1389-1448 (main input bar)
- **Message Rendering**: Lines 1225-1385
- **Customer Service Menu**: Lines 614-663
- **Claims Management**: Lines 678-777
- **Onboarding Controls**: Lines 779-894
- **Companies Section**: Lines 896-926

#### `/components/Login.tsx`
- Phone number input field
- Password input with visibility toggle
- "Forgot password?" link
- "Don't have an account?" handling
- Full brown (#482b22) styling

#### `/components/OnboardingE.tsx`
- "Welcome Spencer!" heading
- 3 feature icons (120px each):
  - AI Doctor Chat (imgConsultation)
  - Call Real Doctors (imgDoctor)
  - Order Lab Tests (imgReport)
- Password input field (260px × 50px)
- Submit button with arrow
- All text in brown (#482b22)

#### `/components/OnboardingECode.tsx`
- Clean white background
- 8-digit code input boxes
- JANTA logo centered
- Validation before proceeding

#### `/components/OnboardingF.tsx`
- Single comprehensive page
- File upload for employee info
- Company information form:
  - Company Name
  - Address
  - Tax ID
  - Email
  - Phone
- "Thank you" confirmation message

---

## 🚀 Setup Instructions

### 1. **Download & Install**
```bash
# Clone or download the code
cd janta-app

# Install dependencies
npm install

# Start development server
npm run dev
```

### 2. **Environment Variables**
Create `.env.local` file:
```env
# API Configuration
VITE_API_URL=http://localhost:3000/api
VITE_WS_URL=ws://localhost:3000

# File Upload
VITE_MAX_FILE_SIZE=10485760  # 10MB
VITE_ALLOWED_FILE_TYPES=image/*,application/pdf

# Supabase (if using)
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 3. **Mock Data Currently Used**

All mock data is in `/App.tsx`:

**Incoming Calls** (line 175):
```javascript
const [incomingCall, setIncomingCall] = useState<IncomingCall | null>({
  name: "Emily Johnson",
  phone: "+1 (415) 555-0198",
  company: "Tech Solutions Inc",
  reason: "Claim Review",
  aiSummary: "Employee calling about recent medical claim..."
});
```

**Claims** (line 185):
```javascript
const [claims] = useState([
  {
    id: '1',
    employee: 'John Smith',
    company: 'Acme Corp',
    phone: '+1 (555) 123-4567',
    type: 'Dental Cleaning',
    amount: '$150',
    date: '2024-01-15',
    status: 'pending'
  },
  // ... more claims
]);
```

**Companies** (line 215):
```javascript
const [companies] = useState([
  {
    id: '1',
    name: 'Tech Solutions Inc',
    employeeCount: 145,
    employees: [
      { name: 'Emily Johnson', position: 'Engineer', phone: '+1 (415) 555-0198' },
      // ... more employees
    ]
  },
  // ... more companies
]);
```

**Past Invoices** (line 241):
```javascript
const [pastInvoices] = useState([
  {
    id: '1',
    date: 'Nov 2024',
    amount: '$2,450',
    description: 'Monthly Premium - Nov 2024',
    status: 'paid'
  },
  // ... more invoices
]);
```

### 4. **Replace Mock Data with Real APIs**

**Example**: Replace chat functionality

**Current** (lines 367-386):
```javascript
const handleSendMessage = () => {
  // Currently adds message to local state
  const newMessage = {
    id: Date.now().toString(),
    question: inputValue,
    answer: "This is a simulated AI response...",
    files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
    filePreviews: filePreviews.length > 0 ? filePreviews : undefined,
  };
  setMessages([...messages, newMessage]);
};
```

**Replace with**:
```javascript
const handleSendMessage = async () => {
  try {
    // Create FormData for file uploads
    const formData = new FormData();
    formData.append('message', inputValue);
    uploadedFiles.forEach(file => formData.append('files', file));
    
    // Call your API
    const response = await fetch(`${import.meta.env.VITE_API_URL}/chat/message`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${yourAuthToken}`
      },
      body: formData
    });
    
    const data = await response.json();
    
    const newMessage = {
      id: data.messageId,
      question: inputValue,
      answer: data.answer,
      files: uploadedFiles.length > 0 ? uploadedFiles : undefined,
      filePreviews: filePreviews.length > 0 ? filePreviews : undefined,
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setUploadedFiles([]);
    setFilePreviews([]);
  } catch (error) {
    console.error('Failed to send message:', error);
    // Handle error - show toast notification
  }
};
```

---

## ⚠️ Known Issues & Future Work

### 1. **CRITICAL: Two Separate Dashboards Needed**

**Current Problem**:
- Only ONE dashboard for both employees and founders
- Just hiding/showing elements based on `userType`
- Not architecturally correct

**Solution Needed**:
- Create separate Employee Dashboard component
- Create separate Founder Dashboard component
- Employee Dashboard: Health chat, personal claims, appointments, lab tests
- Founder Dashboard: Company overview, employee roster, billing, analytics, company settings

**Implementation**:
```javascript
// Instead of:
{isChatMode ? <SingleDashboard /> : <StartPage />}

// Should be:
{userType === 'employee' ? (
  <EmployeeDashboard />
) : userType === 'founder' ? (
  <FounderDashboard />
) : (
  <StartPage />
)}
```

### 2. **Voice Recording**
**Current**: Records audio but doesn't send to backend
**Needed**: 
- Audio blob to backend API
- Transcription service integration
- Voice-to-text processing

**Location**: Lines 395-435

### 3. **File Upload**
**Current**: Stores files in local state only
**Needed**:
- Upload to cloud storage
- Generate accessible URLs
- Store URLs in database

**Locations**:
- Chat files: Lines 448-471
- Company files: Lines 896-926
- Employee info file: Lines 1140-1170

### 4. **Real-time Incoming Calls**
**Current**: Hardcoded mock call data
**Needed**:
- WebSocket connection
- Push notifications
- Call routing system

**Location**: Lines 175-181, 570-574

### 5. **Search Functionality**
**Current**: Client-side filtering only
**Needed**:
- Backend AI-powered search
- Full-text search across claims
- Fuzzy matching

**Location**: Lines 684-739

### 6. **Internal Dashboard Access**
**Current**: Button removed from UI but code intact
**Future**: 
- Re-add button for internal users only
- Authentication check for internal role
- Separate internal login flow

### 7. **Password Requirements**
**Current**: No validation
**Needed**:
- Minimum 6 characters
- Password strength indicator
- Validation before submission

**Locations**:
- Login: `/components/Login.tsx`
- Employee onboarding: `/components/OnboardingE.tsx`
- Founder onboarding: `/components/OnboardingF.tsx`

### 8. **Form Validation**
**Current**: Minimal validation
**Needed**:
- Email format validation
- Phone number format validation
- Required field checks
- Error message display

**Locations**: Throughout all forms

### 9. **Loading States**
**Current**: No loading indicators
**Needed**:
- Spinner during API calls
- Skeleton screens for data loading
- Disabled states during submission

### 10. **Error Handling**
**Current**: No error handling
**Needed**:
- Toast notifications for errors
- Retry mechanisms
- User-friendly error messages

---

## 🎨 Design Tokens

All design tokens are in `/styles/globals.css`:

```css
/* Colors */
--color-primary: #482b22;        /* Only brown used */
--color-text-light: #f9f9f9;     /* Main text */
--color-text-lighter: #f9f8f6;   /* Secondary text */
--color-border: #282828;         /* Borders */

/* Typography */
--font-family: 'ABC Diatype', sans-serif;

/* Sizes */
--input-height-large: 80px;      /* Chat input */
--input-height-medium: 50px;     /* Password input */
--button-height: 36px;           /* Standard button */
--border-radius: 12px;           /* Standard radius */
--border-radius-large: 19.5px;   /* Large elements */
```

---

## 🔐 Security Considerations

### Before Production:
1. **Authentication**:
   - Implement JWT or session-based auth
   - Secure password hashing (bcrypt, argon2)
   - HTTPS only
   - CSRF protection

2. **Authorization**:
   - Role-based access control
   - Employee can't access founder features
   - Founder can't access other companies' data
   - Internal dashboard restricted to staff

3. **Data Validation**:
   - Server-side validation for all inputs
   - Sanitize user inputs
   - File upload virus scanning
   - Rate limiting on API endpoints

4. **Privacy**:
   - HIPAA compliance for health data
   - Encrypted data storage
   - Secure file storage with access controls
   - Audit logging

---

## 📞 Support & Next Steps

### Recommended Development Order:
1. ✅ Set up backend API server
2. ✅ Create database schema
3. ✅ Implement authentication endpoints
4. ✅ Replace login with real API
5. ✅ Implement onboarding APIs
6. ✅ Set up file storage
7. ✅ Create chat/AI endpoints
8. ✅ Add real-time WebSocket for calls
9. ✅ **Build separate Employee & Founder dashboards**
10. ✅ Implement claims management backend
11. ✅ Add wallet/billing integration
12. ✅ Testing & QA
13. ✅ Deploy to production

### Testing Checklist:
- [ ] Employee onboarding flow (both pages)
- [ ] Founder onboarding flow (single page)
- [ ] Login functionality
- [ ] Chat with file upload
- [ ] Voice recording
- [ ] Claims search and management
- [ ] Wallet view and invoices
- [ ] Customer service call flow
- [ ] Internal dashboard features
- [ ] Responsive design (mobile/tablet/desktop)

---

## 📝 Additional Notes

- All images are stored as Figma assets - use the import paths as-is
- SVG icons are in `/imports/svg-*.tsx` files
- Don't modify `/components/figma/ImageWithFallback.tsx` (protected)
- Typography is controlled via `/styles/globals.css` - don't override with Tailwind text utilities unless specifically needed
- No hover effects anywhere per design requirements
- Brown color `#482b22` is the ONLY brown - don't use other shades

---

**Last Updated**: December 1, 2025  
**Version**: 1.0  
**Contact**: [Your contact info]
