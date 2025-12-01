/**
 * BACKEND INTEGRATION GUIDE
 * ========================
 * 
 * API ENDPOINTS NEEDED:
 * 
 * 1. INCOMING CALLS
 *    - WebSocket or Server-Sent Events to push incoming call data
 *    - Endpoint: ws://api/calls/incoming
 *    - Data format: { name, phone, company, reason, aiSummary }
 *    - Triggers: setIncomingCall(data) when call comes in
 * 
 * 2. CLAIMS MANAGEMENT
 *    - GET /api/claims/search?query={query} - AI-powered search
 *    - POST /api/claims/:id/accept - Accept claim
 *    - POST /api/claims/:id/deny - Deny claim
 *    - GET /api/claims - Get all claims
 * 
 * 3. ONBOARDING
 *    - POST /api/onboarding/start - Body: { type: 'employee' | 'founder' }
 *    - POST /api/onboarding/complete - Save onboarding data
 * 
 * 4. COMPANIES
 *    - GET /api/companies - Get all companies with employees
 *    - GET /api/companies/:id/employees - Get employees by company
 * 
 * 5. USER AUTHENTICATION
 *    - POST /api/auth/login - Login with credentials
 *    - POST /api/auth/logout - Logout user
 *    - GET /api/auth/me - Get current user info
 */

import { useState, useRef, useEffect } from "react";
import svgPaths from "./imports/svg-etdaora78s";
import imgJantaWhiteT1 from "figma:asset/1764ad722a3a27350e171a5285220c9a91f02b7d.png";
import imgRectangle183 from "figma:asset/7ade6729c509000e9c9ec39030c32dacae42e0bb.png";
import imgRectangle188 from "figma:asset/506a495f6917dfa8c4d63cf837f9af6d74ab0621.png";
import imgRectangle190 from "figma:asset/31a0f845575e402d8be6aa2c923016e0a606f09f.png";
import imgRectangle131 from "figma:asset/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png";
import imgRectangle132 from "figma:asset/46768b18ab068fb9bc1afac1f2178cd51000d120.png";
import imgWallet from "figma:asset/5917bfa10402943b0f061dd2b5e720d71c67964c.png";
import imgFileUpload from "figma:asset/9a5091bd34b099cbaf8b3472262c94f94f367473.png";
import imgConsultation from "figma:asset/ad4fbe475a1ce1de718fcc569d2c1deb2e7b00f5.png";
import imgDoctor from "figma:asset/6591f4e71bbd125eb4baebc90fb44e74dfe40ef4.png";
import imgReport from "figma:asset/dd6c9eef641836f92b06dc359d61bb997279ca99.png";
import { imgGroup, imgGroup1 } from "./imports/svg-pk5ch";
import Login from "./components/Login";
import { GradientBackground } from "./components/GradientBackground";
import { OnboardingECode } from "./components/OnboardingECode";
import { OnboardingE } from "./components/OnboardingE";
import { OnboardingF } from "./components/OnboardingF";

function Group() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[100%_100%]" data-name="Group" style={{ maskImage: `url('${imgGroup}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 557">
        <g id="Group">
          <path d={svgPaths.p157ae7f0} fill="var(--fill-0, #5F1F07)" fillOpacity="0.58" id="Vector" />
          <path d={svgPaths.p24e0b100} fill="var(--fill-0, #5F1F07)" fillOpacity="0.58" id="Vector_2" />
          <path d={svgPaths.p2b806c40} fill="var(--fill-0, #5F1F07)" fillOpacity="0.58" id="Vector_3" />
          <path d={svgPaths.p1e0b5000} fill="var(--fill-0, #5F1F07)" fillOpacity="0.58" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group />
    </div>
  );
}

function Group1() {
  return (
    <div className="absolute inset-0 mask-alpha mask-intersect mask-no-clip mask-no-repeat mask-position-[0px] mask-size-[100%_100%]" data-name="Group" style={{ maskImage: `url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 557">
        <g id="Group">
          <path d={svgPaths.p157ae7f0} fill="var(--fill-0, #4C4E4C)" id="Vector" />
          <path d={svgPaths.p24e0b100} fill="var(--fill-0, #4C4E4C)" id="Vector_2" />
          <path d={svgPaths.p2b806c40} fill="var(--fill-0, #4C4E4C)" id="Vector_3" />
          <path d={svgPaths.p1e0b5000} fill="var(--fill-0, #4C4E4C)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function Group2() {
  return (
    <div className="[mask-clip:no-clip,_no-clip] [mask-composite:intersect,_intersect] [mask-mode:alpha,_alpha] [mask-repeat:no-repeat,_no-repeat] absolute inset-0 mask-position-[0px,_0px] mask-size-[100%_100%,_100%_100%]" data-name="Group" style={{ maskImage: `url('${imgGroup1}'), url('${imgGroup1}')` }}>
      <svg className="block size-full" fill="none" preserveAspectRatio="none" viewBox="0 0 784 557">
        <g id="Group">
          <path d={svgPaths.p157ae7f0} fill="var(--fill-0, #4C4E4C)" id="Vector" />
          <path d={svgPaths.p2ae79400} fill="var(--fill-0, #4C4E4C)" id="Vector_2" />
          <path d={svgPaths.pcf7a200} fill="var(--fill-0, #4C4E4C)" id="Vector_3" />
          <path d={svgPaths.p3db35900} fill="var(--fill-0, #4C4E4C)" id="Vector_4" />
        </g>
      </svg>
    </div>
  );
}

function ClipPathGroup1() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group2 />
    </div>
  );
}

function ClipPathGroup2() {
  return (
    <div className="absolute contents inset-0" data-name="Clip path group">
      <Group1 />
      <ClipPathGroup1 />
    </div>
  );
}

interface Message {
  id: number;
  question: string;
  answer: string;
  selectedOption?: { name: string; icon: string } | null;
  files?: File[];
  filePreviews?: string[];
}

export default function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ name: string; icon: string }>({ 
    name: "AI Doctor", 
    icon: imgRectangle132 
  });
  const [isChatMode, setIsChatMode] = useState(false);
  const [isWalletView, setIsWalletView] = useState(false);
  const [isPastInvoicesView, setIsPastInvoicesView] = useState(false);
  const [isInternalView, setIsInternalView] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [walletSearch, setWalletSearch] = useState("");
  const [userPhoneNumber] = useState("+1 (415) 555-0123");
  const [editablePhoneNumber, setEditablePhoneNumber] = useState("+1 (415) 555-0123");
  const [awaitingCallConfirmation, setAwaitingCallConfirmation] = useState(false);
  const [isOnboardingStartPage, setIsOnboardingStartPage] = useState(false);
  const [isOnboardingPasswordPage, setIsOnboardingPasswordPage] = useState(false);
  const [isOnboardingFlow, setIsOnboardingFlow] = useState(false);
  const [uniqueCode, setUniqueCode] = useState(["", "", "", "", "", "", "", ""]);
  const [signupPhone, setSignupPhone] = useState("");
  const [signupPassword, setSignupPassword] = useState(["", "", "", "", "", ""]);
  const [onboardingSaved, setOnboardingSaved] = useState(false);
  // Onboarding F states (for founders)
  const [isOnboardingFStartPage, setIsOnboardingFStartPage] = useState(false);
  const [isOnboardingFFlow, setIsOnboardingFFlow] = useState(false);
  const [uniqueCodeF, setUniqueCodeF] = useState(["", "", "", "", "", "", "", ""]);
  const [signupPhoneF, setSignupPhoneF] = useState("");
  const [signupPasswordF, setSignupPasswordF] = useState(["", "", "", "", "", ""]);
  const [onboardingFSaved, setOnboardingFSaved] = useState(false);
  const [userType, setUserType] = useState<'employee' | 'founder' | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [fullViewIndex, setFullViewIndex] = useState<number>(0);
  const [expandedCompany, setExpandedCompany] = useState<string | null>(null);
  const [claimsExpanded, setClaimsExpanded] = useState(false);
  const [claimsSearch, setClaimsSearch] = useState("");
  // Founder wallet form states
  const [employeeInfoFile, setEmployeeInfoFile] = useState<File | null>(null);
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyTaxId, setCompanyTaxId] = useState("");
  const [companyEmail, setCompanyEmail] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  // Founder account details
  const [founderPassword, setFounderPassword] = useState("");
  const [founderPhone, setFounderPhone] = useState("");
  const [accountDetailsSaved, setAccountDetailsSaved] = useState(false);
  const [incomingCall, setIncomingCall] = useState<{
    name: string;
    phone: string;
    company: string;
    reason: string;
    aiSummary: string;
  } | null>(null);
  const [claims, setClaims] = useState([
    { id: 1, company: "TechStart Inc.", employee: "John Smith", type: "Dental Cleaning", amount: "$250", status: "accepted" as const, date: "Nov 28, 2025", phone: "+1 (555) 123-4567" },
    { id: 2, company: "TechStart Inc.", employee: "Sarah Lee", type: "Physical Therapy", amount: "$180", status: "denied" as const, date: "Nov 27, 2025", phone: "+1 (555) 234-5678" },
    { id: 3, company: "InnovateCo", employee: "Mike Johnson", type: "Prescription", amount: "$45", status: "accepted" as const, date: "Nov 26, 2025", phone: "+1 (555) 345-6789" },
    { id: 4, company: "TechStart Inc.", employee: "Emma Davis", type: "Vision Exam", amount: "$125", status: "denied" as const, date: "Nov 25, 2025", phone: "+1 (555) 456-7890" },
    { id: 5, company: "InnovateCo", employee: "Alex Brown", type: "Lab Tests", amount: "$320", status: "accepted" as const, date: "Nov 24, 2025", phone: "+1 (555) 567-8901" },
  ]);
  const inputRef = useRef<HTMLInputElement>(null);
  const walletSearchRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Don't auto-scroll during onboarding flows
    if (!isOnboardingFlow && !isOnboardingFFlow) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOnboardingFlow, isOnboardingFFlow]);

  // Click outside handler for dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close dropdown if clicking outside
      if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        // Check if click is not on the plus button
        const target = event.target as HTMLElement;
        const isPlusButton = target.closest('button')?.querySelector('img[src*="Rectangle188"]');
        if (!isPlusButton) {
          setIsMenuOpen(false);
        }
      }
      
      // Close profile dropdown if clicking outside
      if (isProfileMenuOpen && profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        const target = event.target as HTMLElement;
        const isProfileButton = target.closest('button')?.textContent?.includes('S') || target.closest('div')?.textContent?.includes('S');
        if (!isProfileButton) {
          setIsProfileMenuOpen(false);
          setIsCalling(false);
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, isProfileMenuOpen]);

  // Add global keyboard listener for stopping recording with Enter
  useEffect(() => {
    const handleGlobalKeyPress = (e: KeyboardEvent) => {
      if (e.key === "Enter" && isRecording) {
        e.preventDefault();
        setIsRecording(false);
      }
    };

    if (isRecording) {
      window.addEventListener('keydown', handleGlobalKeyPress);
    }

    return () => {
      window.removeEventListener('keydown', handleGlobalKeyPress);
    };
  }, [isRecording]);

  const handleSelectOption = (name: string, icon: string) => {
    setSelectedOption({ name, icon });
    setIsMenuOpen(false);
  };

  const handleCustomerServiceClick = () => {
    setIsProfileMenuOpen(false);
    setIsCalling(false);
    setIsWalletView(false);
    setIsChatMode(true);
    
    const newMessage: Message = {
      id: Date.now(),
      question: "Customer Service",
      answer: `Hi Spencer! I'd be happy to help you. I have your phone number on file as ${userPhoneNumber}. Is this number correct?`,
      selectedOption: { name: "Customer Service", icon: imgRectangle131 },
    };
    
    setMessages([...messages, newMessage]);
    setAwaitingCallConfirmation(true);
  };

  const handleOnboardingClick = () => {
    setIsProfileMenuOpen(false);
    setIsCalling(false);
    setIsWalletView(false);
    setIsInternalView(false);
    setIsChatMode(false);
    setIsOnboardingStartPage(true);
    setIsOnboardingPasswordPage(false);
    setIsOnboardingFlow(false);
    setOnboardingSaved(false);
    setUniqueCode(["", "", "", "", "", "", "", ""]);
    setSignupPhone("");
    setSignupPassword(["", "", "", "", "", ""]);
    setMessages([]);
    setAwaitingCallConfirmation(false);
  };

  const handleOnboardingCodeComplete = () => {
    // After code entry, show password page
    setIsOnboardingStartPage(false);
    setIsOnboardingPasswordPage(true);
  };

  const handleOnboardingPasswordComplete = () => {
    // After password entry, log in the employee and go to front page
    setIsOnboardingPasswordPage(false);
    setIsChatMode(false);
    setIsOnboardingFlow(false);
    setIsLoggedIn(true);
    setUserType('employee');
    setMessages([]);
  };

  const handleOnboardingFClick = () => {
    setIsProfileMenuOpen(false);
    setIsCalling(false);
    setIsWalletView(false);
    setIsInternalView(false);
    setIsChatMode(false);
    setIsOnboardingFStartPage(true);
    setIsOnboardingFFlow(false);
    setOnboardingFSaved(false);
    setUniqueCodeF(["", "", "", "", "", "", "", ""]);
    setSignupPhoneF("");
    setSignupPasswordF(["", "", "", "", "", ""]);
    setMessages([]);
    setAwaitingCallConfirmation(false);
  };

  const handleOnboardingFStart = () => {
    // Directly log in the founder and go to front page after code entry
    setIsOnboardingFStartPage(false);
    setIsChatMode(false);
    setIsOnboardingFFlow(false);
    setIsLoggedIn(true);
    setUserType('founder');
    setMessages([]);
  };



  const handleSaveOnboarding = () => {
    setOnboardingSaved(true);
    setUserType('employee');
    // Immediately redirect to front page and log in
    setIsLoggedIn(true);
    setIsChatMode(false);
    setIsOnboardingFlow(false);
    setMessages([]);
  };

  const handleSaveOnboardingF = () => {
    setOnboardingFSaved(true);
    setUserType('founder');
    // After showing thank you, log in the user and redirect to front page
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsChatMode(false);
      setIsOnboardingFFlow(false);
      setMessages([]);
    }, 2500);
  };

  // Password change handlers for employee onboarding
  const handlePasswordChange = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPassword = [...signupPassword];
      newPassword[index] = value;
      setSignupPassword(newPassword);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="password-${index + 1}"]`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handlePasswordKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !signupPassword[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="password-${index - 1}"]`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  // Password change handlers for founder onboarding
  const handlePasswordChangeF = (index: number, value: string) => {
    if (value.length <= 1) {
      const newPassword = [...signupPasswordF];
      newPassword[index] = value;
      setSignupPasswordF(newPassword);
      
      // Auto-focus next input
      if (value && index < 5) {
        const nextInput = document.querySelector(`input[name="password-f-${index + 1}"]`) as HTMLInputElement;
        nextInput?.focus();
      }
    }
  };

  const handlePasswordKeyDownF = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !signupPasswordF[index] && index > 0) {
      const prevInput = document.querySelector(`input[name="password-f-${index - 1}"]`) as HTMLInputElement;
      prevInput?.focus();
    }
  };

  const handleGetEmployeeInfoLink = () => {
    // Open a mock Google Docs link
    window.open('https://docs.google.com/document/d/1example-employee-info-form/edit', '_blank');
  };

  const handleEmployeeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setEmployeeInfoFile(e.target.files[0]);
    }
  };

  const handleConfirmCall = (confirmed: boolean) => {
    if (confirmed) {
      const callMessage: Message = {
        id: Date.now(),
        question: "Yes, that's correct",
        answer: "Great! I'm calling you now at " + userPhoneNumber + ". Please wait a moment...",
        selectedOption: { name: "Customer Service", icon: imgRectangle131 },
      };
      setMessages([...messages, callMessage]);
    } else {
      const updateMessage: Message = {
        id: Date.now(),
        question: "No, that's not correct",
        answer: "I understand. Please provide your correct phone number and I'll update our records.",
        selectedOption: { name: "Customer Service", icon: imgRectangle131 },
      };
      setMessages([...messages, updateMessage]);
    }
    setAwaitingCallConfirmation(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      // Only take up to 3 files total
      const remainingSlots = 3 - uploadedFiles.length;
      const newFiles = Array.from(files).slice(0, remainingSlots);
      
      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);
      
      // Create previews for new files
      newFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreviews(prev => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        } else {
          // For non-image files, add empty string to maintain index alignment
          setFilePreviews(prev => [...prev, '']);
        }
      });
    }
    
    // Reset input value so same file can be uploaded again
    event.target.value = '';
  };

  const generateAnswer = (question: string, option: { name: string; icon: string }) => {
    // If no question text, provide a response about the files
    if (!question.trim()) {
      return `Thank you for sharing these files. I've received them and will review the information. How can I assist you with these documents?`;
    }
    
    // Mock answer generation based on selected option
    if (option.name === "Customer Service") {
      return `Sure, this is a simple overview of Janta's health policy:\n\nZero-deductible. People don't pay anything out of pocket before coverage kicks in.\n\nWe only earn when claims get paid.\n\nNo commissions. No hidden fees. We take 10% only when we successfully process and pay a claim.\n\nFast claims.\n\nEvery employee gets a WHOOP/Oura-style wearable for health baseline + prevention.\n\nAI + human concierge 24/7.\n\nEmployees can message for care, navigation, or help anytime.\n\nStartup-friendly pricing.\n\nFlat, transparent monthly premium per employee.\n\nBuilt for Bay Area tech teams.\n\nModern care, simple setup, and founder-aligned incentives.`;
    } else if (option.name === "AI Doctor") {
      return `I'm an AI Doctor assistant. Based on your question: "${question}", I can provide medical information and guidance. Please note that I'm an AI assistant and any serious medical concerns should be discussed with a licensed healthcare professional.\n\nHow can I help you with your health-related questions today?`;
    } else if (option.name === "General Health") {
      return `I'm here to help with general health questions. You asked: "${question}"\n\nI can provide information about wellness, nutrition, exercise, and general health topics. For specific medical concerns, please consult with a healthcare professional.\n\nWhat would you like to know?`;
    } else {
      return `Thank you for your question: "${question}". I'm here to help you with information about Janta's services.`;
    }
  };

  const handleSendMessage = () => {
    // If on onboarding code page, go to password page
    if (isOnboardingStartPage) {
      handleOnboardingCodeComplete();
      return;
    }

    // If on onboarding password page, complete onboarding
    if (isOnboardingPasswordPage) {
      handleOnboardingPasswordComplete();
      return;
    }

    // If on onboarding F start page, switch to onboarding F chat
    if (isOnboardingFStartPage) {
      handleOnboardingFStart();
      return;
    }

    // Allow sending if there's text OR files
    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    const newMessage: Message = {
      id: Date.now(),
      question: inputValue,
      answer: generateAnswer(inputValue, selectedOption),
      selectedOption: selectedOption,
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      filePreviews: filePreviews.length > 0 ? [...filePreviews] : undefined,
    };

    setMessages([...messages, newMessage]);
    setInputValue("");
    setUploadedFiles([]);
    setFilePreviews([]);
    setIsChatMode(true);
    setIsMenuOpen(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (isRecording) {
        setIsRecording(false);
      } else {
        handleSendMessage();
      }
    }
  };

  // Auto-resize textarea based on content
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = '24px';
      const scrollHeight = inputRef.current.scrollHeight;
      inputRef.current.style.height = Math.min(scrollHeight, 120) + 'px';
    }
  }, [inputValue]);

  const handleLogin = () => {
    setIsLoggedIn(true);
    setShowLogin(false);
  };

  if (showLogin) {
    return <Login onBack={() => setShowLogin(false)} onLogin={handleLogin} />;
  }

  if (isOnboardingStartPage) {
    return <OnboardingECode onComplete={handleOnboardingCodeComplete} />;
  }

  if (isOnboardingPasswordPage) {
    return <OnboardingE onComplete={handleOnboardingPasswordComplete} />;
  }

  if (isOnboardingFStartPage) {
    return <OnboardingF onComplete={handleOnboardingFStart} />;
  }

  return (
    <div className="relative h-screen flex flex-col overflow-hidden bg-[#f9f8f6]" data-name="Desktop">
      {/* Background layers - solid color background */}
      
      {/* JANTA Logo - top left */}
      <button 
        onClick={() => {
          // Prevent navigation during onboarding before save
          if ((isOnboardingFlow && !onboardingSaved) || (isOnboardingFFlow && !onboardingFSaved)) {
            return;
          }
          setIsChatMode(false);
          setIsWalletView(false);
          setIsInternalView(false);
          setIsOnboardingStartPage(false);
          setIsOnboardingPasswordPage(false);
          setIsOnboardingFlow(false);
          setIsOnboardingFStartPage(false);
          setIsOnboardingFFlow(false);
          setMessages([]);
          setInputValue("");
          setIsMenuOpen(false);
        }}
        className={`absolute left-[16px] top-[4px] z-10 ${(isOnboardingFlow && !onboardingSaved) || (isOnboardingFFlow && !onboardingFSaved) ? 'cursor-default' : 'cursor-pointer'}`}
      >
        <img alt="JANTA" className="h-[70px] w-auto object-contain" src={imgJantaWhiteT1} />
      </button>
      
      {/* Login button or User avatar - bottom left */}
      {isLoggedIn && !isOnboardingStartPage && !isOnboardingPasswordPage && !isOnboardingFStartPage && !(isOnboardingFlow && !onboardingSaved) && !(isOnboardingFFlow && !onboardingFSaved) ? (
        <div className="absolute bottom-[21px] left-[21px] z-10 flex flex-col gap-3">
          {/* Wallet - only show for founders */}
          {userType === 'founder' && (
          <button 
            onClick={() => setIsWalletView(!isWalletView)}
            className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[36px] px-[18px] flex items-center gap-3 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer"
          >
            <div className="relative size-[13.5px]">
              <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgWallet} />
            </div>
            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f8f6] text-[12px] text-nowrap whitespace-pre">Wallet</p>
          </button>
          )}
          
          {/* Customer Service Menu Toggle */}
          {!isInternalView && (
            <button 
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[36px] px-[18px] flex items-center gap-3 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              <div className="relative size-[13.5px]">
                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle131} />
              </div>
              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">Customer Service</p>
            </button>
          )}
          
          {/* Customer Service Dropdown Menu */}
          {isProfileMenuOpen && !isInternalView && (
            <div ref={profileDropdownRef} className="absolute bottom-[45px] left-0 bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] w-[240px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] z-50 p-4">
              <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-3">
                Is this your number?
              </p>
              <input
                type="tel"
                value={editablePhoneNumber}
                onChange={(e) => {
                  setEditablePhoneNumber(e.target.value);
                  setIsCalling(false);
                }}
                className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[8px] h-[42px] px-[12px] font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[14px] outline-none mb-3"
              />
              <button
                onClick={() => {
                  setIsCalling(true);
                }}
                className="w-full bg-[#f9f8f6] border-[#282828] border-[0.45px] border-solid rounded-[8px] h-[36px] flex items-center justify-center transition-colors"
              >
                <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[12px]">{isCalling ? 'Calling...' : 'Call'}</p>
              </button>
            </div>
          )}
        </div>
      ) : !isOnboardingStartPage && !isOnboardingPasswordPage && !isOnboardingFStartPage && !(isOnboardingFlow && !onboardingSaved) && !(isOnboardingFFlow && !onboardingFSaved) ? (
        <button 
          onClick={() => setShowLogin(true)}
          className="absolute bottom-[21px] left-[21px] cursor-pointer z-10"
        >
          <div className="bg-[#482b22] border-[#282828] border-solid h-[22.8px] rounded-[15.6px] w-[64.8px] flex items-center justify-center" style={{ borderWidth: '0.36px' }}>
            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[9.6px] text-nowrap whitespace-pre">Log in</p>
          </div>
        </button>
      ) : null}

      {/* Internal button - removed from UI but keeping all Internal view functionality in code */}

      {/* Internal view, Wallet view, Chat mode, or initial screen */}
      {isInternalView ? (
        <>
          {/* Internal Dashboard */}
          <div className="relative flex-1 overflow-y-auto px-8 pt-24 pb-32">
            <div className="max-w-[900px] mx-auto">
              {/* Header */}
              <div className="mb-8">
                <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[32px] mb-2">
                  Internal Dashboard
                </p>
              </div>

              {/* Claims Management */}
              <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[19.5px] p-6 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[18px] mb-4">
                  Claims Management
                </p>
                
                {/* Search Bar */}
                {/* BACKEND: GET /api/claims/search?query={claimsSearch} */}
                {/* AI-powered search endpoint that returns filtered claims */}
                <div className="relative mb-6 max-w-md">
                  <input
                    type="text"
                    value={claimsSearch}
                    onChange={(e) => setClaimsSearch(e.target.value)}
                    placeholder="Search claims, persons, companies..."
                    className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 pr-10 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] placeholder:text-[#f9f9f9] focus:outline-none focus:border-[#f9f9f9] transition-colors"
                  />
                  <svg 
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#f9f9f9]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>

                {/* Claims List - Only show when searching */}
                {claimsSearch.trim() !== "" && (
                  <div className="space-y-3 max-w-md">
                    {claims
                      .filter(claim => 
                        claim.employee.toLowerCase().includes(claimsSearch.toLowerCase()) ||
                        claim.company.toLowerCase().includes(claimsSearch.toLowerCase()) ||
                        claim.type.toLowerCase().includes(claimsSearch.toLowerCase())
                      )
                      .map((claim) => (
                      <div 
                        key={claim.id}
                        className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] p-4"
                      >
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex-1 min-w-0">
                            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[14px] mb-1">
                              {claim.employee}
                            </p>
                            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-0.5">
                              {claim.company} • {claim.phone}
                            </p>
                            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[11px]">
                              {claim.type} • {claim.date}
                            </p>
                          </div>
                          <div className="text-right flex-shrink-0 ml-4">
                            <p className="font-['ABC_Diatype',sans-serif] font-bold leading-[normal] not-italic text-[#f9f9f9] text-[16px] mb-1">
                              {claim.amount}
                            </p>
                          </div>
                        </div>
                        <div className="flex gap-2 justify-end">
                          <button 
                            onClick={() => {
                              // BACKEND: POST /api/claims/:id/accept
                              // Send claim.id to backend to update status
                              setClaims(claims.map(c => 
                                c.id === claim.id ? { ...c, status: 'accepted' as const } : c
                              ));
                            }}
                            className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                          >
                            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">Accept</p>
                          </button>
                          <button 
                            onClick={() => {
                              // BACKEND: POST /api/claims/:id/deny
                              // Send claim.id to backend to update status
                              setClaims(claims.map(c => 
                                c.id === claim.id ? { ...c, status: 'denied' as const } : c
                              ));
                            }}
                            className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                          >
                            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">Deny</p>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Onboarding Controls */}
              <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[19.5px] p-6 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[18px] mb-4">
                  Start Onboarding
                </p>
                <div className="flex gap-4">
                  <button 
                    onClick={() => {
                      // BACKEND: POST /api/onboarding/start
                      // Body: { type: 'employee' }
                      handleOnboardingClick();
                    }}
                    className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                  >
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">Employee Onboarding</p>
                  </button>
                  <button 
                    onClick={() => {
                      // BACKEND: POST /api/onboarding/start
                      // Body: { type: 'founder' }
                      handleOnboardingFClick();
                    }}
                    className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                  >
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">Founder Onboarding</p>
                  </button>
                </div>
              </div>

              {/* Incoming Call */}
              <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[19.5px] p-6 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[18px] mb-4">
                  Incoming Call
                </p>
                
                {incomingCall ? (
                  <div className="space-y-4">
                    <div>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-1">
                        Name
                      </p>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[14px]">
                        {incomingCall.name}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-1">
                        Number
                      </p>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[14px]">
                        {incomingCall.phone}
                      </p>
                    </div>
                    
                    <div>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-2">
                        AI Summary
                      </p>
                      <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[1.6] not-italic text-[#f9f9f9] text-[13px]">
                        {incomingCall.aiSummary}
                      </p>
                    </div>
                    
                    <button
                      onClick={() => setIncomingCall(null)}
                      className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                    >
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">
                        End Call
                      </p>
                    </button>
                  </div>
                ) : (
                  <div className="space-y-3">
                    <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[14px]">
                      No active calls
                    </p>
                    <button
                      onClick={() => {
                        // BACKEND: This will be triggered automatically via WebSocket
                        setIncomingCall({
                          name: "Spencer Johnson",
                          phone: "+1 (555) 987-6543",
                          company: "TechStart Inc.",
                          reason: "Inquiry about dental coverage",
                          aiSummary: "Spencer is a 32-year-old software engineer. Recent activity shows he's been proactive about preventive care and uses his WHOOP device consistently."
                        });
                      }}
                      className="bg-[#f9f8f6] rounded-[12px] px-6 py-3"
                    >
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[14px]">
                        Simulate Call (Test)
                      </p>
                    </button>
                  </div>
                )}
              </div>

              {/* Companies */}
              <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[19.5px] p-6 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[18px] mb-4">
                  Companies
                </p>
                <div className="space-y-2">
                  <div className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[8px] overflow-hidden">
                    <div 
                      className="p-4 flex justify-between items-center cursor-pointer"
                      onClick={() => setExpandedCompany(expandedCompany === 'techstart' ? null : 'techstart')}
                    >
                      <div>
                        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[14px] mb-1">
                          TechStart Inc.
                        </p>
                        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px]">
                          {claims.filter(c => c.company === 'TechStart Inc.').length} employees
                        </p>
                      </div>
                      <svg 
                        className={`w-5 h-5 text-[#f9f9f9] transition-transform ${expandedCompany === 'techstart' ? 'rotate-90' : ''}`} 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                    {expandedCompany === 'techstart' && (
                      <div className="border-t border-[#282828] p-4 bg-[#482b22]">
                        <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px] mb-3">
                          Employees
                        </p>
                        <div className="space-y-2">
                          {claims.filter(c => c.company === 'TechStart Inc.').map((claim) => (
                            <div 
                              key={claim.id}
                              className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[6px] p-3"
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[13px] mb-1">
                                    {claim.employee}
                                  </p>
                                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[11px]">
                                    {claim.phone}
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : isWalletView ? (
        <>
          {isPastInvoicesView ? (
            // Past Invoices View
            <div className="relative flex-1 overflow-y-auto px-8 pt-24 pb-32">
              <div className="max-w-[700px] mx-auto">
                {/* Back button */}
                <button
                  onClick={() => setIsPastInvoicesView(false)}
                  className="mb-8 flex items-center gap-2 text-[#482b22]"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[15px]">
                    Back to Wallet
                  </p>
                </button>

                {/* Header */}
                <div className="mb-12">
                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[48px]">
                    Past Invoices
                  </p>
                </div>

                {/* Past months invoices */}
                <div className="space-y-3">
                  {[
                    { month: "October 2025", amount: "$1,423" },
                    { month: "September 2025", amount: "$1,678" },
                    { month: "August 2025", amount: "$1,234" },
                    { month: "July 2025", amount: "$1,890" },
                    { month: "June 2025", amount: "$1,567" },
                    { month: "May 2025", amount: "$1,345" },
                  ].map((invoice, index) => (
                    <button
                      key={index}
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = '#';
                        link.download = `janta-invoice-${invoice.month.toLowerCase().replace(' ', '-')}.pdf`;
                        link.click();
                      }}
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[20px] px-8 py-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] flex items-center justify-between"
                    >
                      <div className="text-left">
                        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[16px] mb-1">
                          {invoice.month}
                        </p>
                        <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[13px]">
                          Total: {invoice.amount}
                        </p>
                      </div>
                      <svg className="w-6 h-6 text-[#f9f9f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Main Wallet View
            <div className="relative flex-1 overflow-y-auto px-8 pt-24 pb-32">
              <div className="max-w-[700px] mx-auto">
                {/* Header */}
                <div className="mb-8 text-center">
                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[32px]">
                    Wallet
                  </p>
                </div>

                {/* Account Details Section - Only for Founders */}
                {userType === 'founder' && (
                  <div className="bg-[#482b22] rounded-[20px] p-8 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[18px] mb-6">
                      Account Details
                    </p>
                    
                    <div className="space-y-4">
                      <input
                        type="tel"
                        value={founderPhone}
                        onChange={(e) => setFounderPhone(e.target.value)}
                        placeholder="Phone Number +1 415 867 3499"
                        className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                      />
                      
                      <input
                        type="password"
                        value={founderPassword}
                        onChange={(e) => setFounderPassword(e.target.value)}
                        placeholder="Set Password"
                        className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                      />
                      
                      <button
                        onClick={() => {
                          if (founderPhone && founderPassword) {
                            // BACKEND: Save founder account details to database
                            setAccountDetailsSaved(true);
                            setTimeout(() => setAccountDetailsSaved(false), 3000);
                          }
                        }}
                        disabled={!founderPhone || !founderPassword}
                        className={`w-full border-[#282828] border-[0.45px] border-solid rounded-[12px] px-6 py-4 transition-all ${
                          founderPhone && founderPassword
                            ? 'bg-[#f9f8f6] cursor-pointer'
                            : 'bg-[#482b22] cursor-not-allowed opacity-50'
                        }`}
                      >
                        <p className={`font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[14px] ${
                          founderPhone && founderPassword ? 'text-[#482b22]' : 'text-[#f9f9f9]'
                        }`}>
                          {accountDetailsSaved ? '✓ Account Details Saved!' : 'Save Account Details'}
                        </p>
                      </button>
                    </div>
                  </div>
                )}

                {/* Claims Overview */}
                <div className="bg-[#482b22] rounded-[20px] p-8 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                  <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[20px] mb-6">
                    Claims Overview
                  </p>
                  
                  {/* Scrollable claims list - show first 3, rest scrollable */}
                  <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
                    {[
                      { date: "Nov 28, 2025", employee: "Sarah Johnson", type: "Doctor Visit", amount: "$245" },
                      { date: "Nov 25, 2025", employee: "Michael Chen", type: "Prescription", amount: "$89" },
                      { date: "Nov 22, 2025", employee: "Emily Rodriguez", type: "Lab Tests", amount: "$320" },
                      { date: "Nov 18, 2025", employee: "David Kim", type: "Dental Care", amount: "$178" },
                      { date: "Nov 15, 2025", employee: "Jessica Williams", type: "Specialist", amount: "$423" },
                      { date: "Nov 12, 2025", employee: "Robert Taylor", type: "Physical Therapy", amount: "$156" },
                      { date: "Nov 08, 2025", employee: "Amanda Brown", type: "Eye Exam", amount: "$92" },
                      { date: "Nov 05, 2025", employee: "James Wilson", type: "Prescription", amount: "$64" },
                    ].map((claim, index) => (
                      <div 
                        key={index}
                        className="flex justify-between items-center pb-4 border-b border-[#4e4e4e] last:border-0 last:pb-0"
                      >
                        <div className="space-y-1">
                          <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[15px]">
                            {claim.employee}
                          </p>
                          <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[13px]">
                            {claim.type} • {claim.date}
                          </p>
                        </div>
                        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[18px]">
                          {claim.amount}
                        </p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-6 pt-6 border-t border-[#4e4e4e]">
                    <div className="flex justify-between items-center">
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[16px]">
                        Total This Month
                      </p>
                      <div className="text-right">
                        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[24px]">
                          $1,567
                        </p>
                        <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[13px]">
                          November 2025
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Download Invoice */}
                <button 
                  onClick={() => {
                    // Simulate PDF download
                    const link = document.createElement('a');
                    link.href = '#';
                    link.download = 'janta-invoice-november-2025.pdf';
                    link.click();
                  }}
                  className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[20px] px-8 py-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] flex items-center justify-between mb-3"
                >
                  <div className="text-left">
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[16px] mb-1">
                      Download Monthly Invoice
                    </p>
                    <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[13px]">
                      November 2025 • For tax purposes
                    </p>
                  </div>
                  <svg className="w-6 h-6 text-[#f9f9f9]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </button>

                {/* See Past Months Invoices - White button, shorter */}
                <div className="flex justify-center mb-8">
                  <button
                    onClick={() => setIsPastInvoicesView(true)}
                    className="bg-[#f9f8f6] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-6 py-3 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]"
                  >
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#482b22] text-[14px]">
                      See Past Months Invoices
                    </p>
                  </button>
                </div>

                {/* Employee Info Form Section */}
                <div className="bg-[#482b22] rounded-[20px] p-8 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
                  {/* Buttons row */}
                  <div className="flex gap-3 mb-6">
                    <button
                      onClick={handleGetEmployeeInfoLink}
                      className="flex-1 bg-[#f9f8f6] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-6 py-4"
                    >
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#482b22] text-[14px]">
                        Get Employee Info Form
                      </p>
                    </button>
                    
                    <label className="flex-1 bg-[#f9f8f6] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-6 py-4 cursor-pointer">
                      <input
                        type="file"
                        onChange={handleEmployeeFileUpload}
                        accept=".pdf,.doc,.docx,.xls,.xlsx"
                        className="hidden"
                      />
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#482b22] text-[14px] text-center">
                        {employeeInfoFile ? employeeInfoFile.name : 'Upload Completed Form'}
                      </p>
                    </label>
                  </div>

                  {employeeInfoFile && (
                    <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[13px] mb-6">
                      Wearables will be sent to employees
                    </p>
                  )}

                  {/* Company Info Inputs */}
                  <div className="space-y-4">
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      placeholder="Company Name"
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                    />
                    
                    <input
                      type="text"
                      value={companyAddress}
                      onChange={(e) => setCompanyAddress(e.target.value)}
                      placeholder="Address"
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                    />
                    
                    <input
                      type="text"
                      value={companyTaxId}
                      onChange={(e) => setCompanyTaxId(e.target.value)}
                      placeholder="Tax ID"
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                    />
                    
                    <input
                      type="email"
                      value={companyEmail}
                      onChange={(e) => setCompanyEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                    />
                    
                    <input
                      type="tel"
                      value={companyPhone}
                      onChange={(e) => setCompanyPhone(e.target.value)}
                      placeholder="Phone"
                      className="w-full bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-4 py-3.5 font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none placeholder:text-[#f9f9f9]"
                    />
                  </div>
                </div>

              </div>
            </div>
          )}
        </>
      ) : isChatMode ? (
        <>
          {/* Chat messages area */}
          <div className="relative flex-1 overflow-y-auto pt-24 pb-8">
            <div className="max-w-[650px] mx-auto space-y-6 pb-32 px-8">
              {messages.map((message, index) => (
                <div key={message.id} className="space-y-4">
                  {/* Question bubble - hide for onboarding message */}
                  {!(isOnboardingFlow && message.question === "Onboarding") && (
                    <div className="flex justify-end">
                      <div className="bg-[#482b22] rounded-[19.5px] px-[18px] py-[10px] max-w-[400px]">
                        {/* Files attached to question */}
                        {message.files && message.files.length > 0 && (
                        <div className="flex gap-2 mb-2">
                          {message.files.map((file, fileIndex) => (
                            <div key={fileIndex} className="relative w-fit">
                              {message.filePreviews?.[fileIndex] ? (
                                <img 
                                  src={message.filePreviews[fileIndex]} 
                                  alt={file.name}
                                  className="w-16 h-16 object-cover rounded-[12px] cursor-pointer" 
                                  onClick={() => {
                                    setFullViewIndex(fileIndex);
                                    setIsFullViewOpen(true);
                                  }}
                                />
                              ) : (
                                <div 
                                  className="w-16 h-16 bg-[#3d231c] rounded-[12px] flex items-center justify-center cursor-pointer"
                                  onClick={() => {
                                    setFullViewIndex(fileIndex);
                                    setIsFullViewOpen(true);
                                  }}
                                >
                                  <p className="font-['ABC_Diatype',sans-serif] text-[10px] text-[#f9f9f9]">
                                    {file.name.split('.').pop()?.toUpperCase()}
                                  </p>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                      <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[19px] break-words">
                        {message.question}
                      </p>
                    </div>
                  </div>
                  )}
                  
                  {/* Answer text or Onboarding Form */}
                  <div className={isOnboardingFlow && message.question === "Onboarding" ? "" : "pr-[120px]"}>
                    {isOnboardingFlow && message.question === "Onboarding" ? (
                      // Onboarding signup form - centered
                      !onboardingSaved ? (
                        <div className="flex items-center justify-center min-h-[400px]">
                          <div className="flex flex-col items-center space-y-6">
                            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[28px]">
                              Welcome Spencer!
                            </p>
                            <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[16px]">
                              Set up your account to get started
                            </p>

                            {/* Feature Graphics */}
                            <div className="relative w-[600px] h-[200px] mb-4">
                              <div className="absolute bg-[#482b22] h-[140px] left-0 rounded-[10px] top-0 w-[175px]" />
                              <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[10px] not-italic text-[#f9f8f6] text-[16px] text-center top-[152px] w-[175px]">AI Doctor Chat</p>
                              <div className="absolute left-[49px] size-[78px] top-[31px]">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgConsultation} />
                              </div>
                              
                              <div className="absolute bg-[#482b22] h-[140px] left-[212px] rounded-[10px] top-0 w-[175px]" />
                              <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[222px] not-italic text-[#f9f8f6] text-[16px] text-center top-[152px] w-[175px]">Call Real Doctors</p>
                              <div className="absolute left-[263px] size-[72px] top-[34px]">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgDoctor} />
                              </div>
                              
                              <div className="absolute bg-[#482b22] h-[140px] left-[425px] rounded-[10px] top-0 w-[175px]" />
                              <p className="absolute font-['ABC_Diatype',sans-serif] font-medium leading-[normal] left-[435px] not-italic text-[#f9f8f6] text-[16px] text-center top-[152px] w-[175px]">Order Lab Tests</p>
                              <div className="absolute left-[476px] size-[72px] top-[34px]">
                                <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgReport} />
                              </div>
                            </div>
                            
                            {/* Phone number input */}
                            <div>
                              <input
                                type="tel"
                                value={signupPhone}
                                onChange={(e) => setSignupPhone(e.target.value)}
                                placeholder="+1 (415) 555-0123"
                                className="w-[200px] bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] px-[16px] py-[13px] font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[17px] outline-none placeholder:text-[rgba(255,255,255,0.49)] text-center"
                              />
                            </div>
                            
                            {/* Password boxes */}
                            <div className="flex gap-2">
                              {signupPassword.map((char, index) => (
                                <input
                                  key={index}
                                  type="password"
                                  name={`password-${index}`}
                                  value={char}
                                  onChange={(e) => handlePasswordChange(index, e.target.value)}
                                  onKeyDown={(e) => handlePasswordKeyDown(index, e)}
                                  maxLength={1}
                                  className="w-[42px] h-[50px] bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[10px] text-center font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[18px] outline-none"
                                />
                              ))}
                            </div>
                            
                            {/* Save button */}
                            <div className="pt-2">
                              <button
                                onClick={handleSaveOnboarding}
                                className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[10px] px-[32px] py-[14px]"
                              >
                                <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[18px]">
                                  Save
                                </p>
                              </button>
                            </div>
                          </div>
                        </div>
                      ) : (
                        // Thank you message
                        <div className="animate-[fadeOut_3s_ease-out_forwards]">
                          <p className="font-['ABC_Diatype',sans-serif] font-light leading-[1.6] not-italic text-[#f9f9f9] text-[18px]">
                            Thank you for joining Janta!
                          </p>
                        </div>
                      )
                    ) : (
                      <div className="bg-transparent rounded-[19.5px] px-[18px] py-[12px] w-fit max-w-[600px]">
                        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[1.5] not-italic text-[#000000] text-[19px] whitespace-pre-wrap break-words">
                          {message.answer}
                        </p>
                        
                        {/* Confirmation with editable phone number and call button */}
                        {awaitingCallConfirmation && index === messages.length - 1 && (
                          <div className="space-y-3 mt-4">
                            <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[12px]">
                              Is this your number?
                            </p>
                            <input
                              type="tel"
                              defaultValue={userPhoneNumber}
                              className="w-[200px] bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[42px] px-[18px] font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[16px] outline-none"
                            />
                            <button
                              onClick={() => handleConfirmCall(true)}
                              className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[36px] px-[18px] flex items-center gap-2 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer"
                            >
                              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px]">Call</p>
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Search bar at bottom - hide during onboarding before save */}
          {!(isOnboardingFlow && !onboardingSaved) && !(isOnboardingFFlow && !onboardingFSaved) && (
          <div className="relative pb-8">
            <div className="max-w-[650px] mx-auto px-8">
              <div className="relative flex flex-col items-center">
                <div className="relative bg-[#482b22] border-[#282828] border-solid rounded-[19.5px] w-[650px] flex flex-col px-[18px] py-[12px]" style={{ borderWidth: '0.45px', minHeight: '80px' }}>
                  {/* File previews */}
                  {uploadedFiles.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {uploadedFiles.map((file, index) => (
                        <div key={index} className="relative w-fit">
                          {filePreviews[index] ? (
                            <img 
                              src={filePreviews[index]} 
                              alt="Preview" 
                              className="w-16 h-16 object-cover rounded-[16px] cursor-pointer" 
                              onClick={() => {
                                setFullViewIndex(index);
                                setIsFullViewOpen(true);
                              }}
                            />
                          ) : (
                            <div 
                              className="w-16 h-16 bg-[#482b22] rounded-[16px] flex items-center justify-center cursor-pointer"
                              onClick={() => {
                                setFullViewIndex(index);
                                setIsFullViewOpen(true);
                              }}
                            >
                              <p className="font-['ABC_Diatype',sans-serif] text-[10px] text-[#f9f9f9]">
                                {file.name.split('.').pop()?.toUpperCase()}
                              </p>
                            </div>
                          )}
                          <button 
                            onClick={() => {
                              setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                              setFilePreviews(prev => prev.filter((_, i) => i !== index));
                            }}
                            className="absolute -top-1 -right-1 text-white text-[16px] leading-none bg-[#482b22] rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* First line: Ask anything input or recording dots */}
                  <div className="w-full mb-4 flex items-start pt-1" style={{ minHeight: '28px' }}>
                    {isRecording ? (
                      <div className="flex items-center justify-center gap-1.5 w-full h-[28px]">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-[#f9f9f9] rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 0.15}s`,
                              animationDuration: '1s'
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <textarea 
                        ref={inputRef}
                        placeholder={selectedOption.name === "AI Doctor" ? "Ask health related" : "Ask anything"}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[17px] bg-transparent border-none outline-none placeholder:text-[#f9f9f9] resize-none overflow-y-auto pt-1"
                        rows={1}
                        style={{ minHeight: '28px', maxHeight: '140px' }}
                      />
                    )}
                  </div>

                  {/* Second line: mic and send button */}
                  <div className="flex items-center w-full mt-auto">
                    <div className="flex-1" />
                  
                    {/* Right side icons */}
                    <div className="ml-auto flex items-center gap-3">
                      {/* File upload button */}
                      <button 
                        onClick={() => document.getElementById('file-upload-main')?.click()}
                        className="relative size-[18px] cursor-pointer"
                      >
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFileUpload} />
                      </button>
                      <input 
                        id="file-upload-main"
                        type="file"
                        multiple
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx"
                        onChange={handleFileUpload}
                        disabled={uploadedFiles.length >= 3}
                      />
                      {!isRecording && (
                        <button 
                          onClick={() => setIsRecording(!isRecording)}
                          className="relative size-[25.5px] cursor-pointer"
                        >
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle190} />
                        </button>
                      )}
                      <button 
                        onClick={() => {
                          if (isRecording) {
                            setIsRecording(false);
                          } else {
                            handleSendMessage();
                          }
                        }}
                        className="relative bg-[#f9f8f6] rounded-[31.5px] size-[36px] flex items-center justify-center cursor-pointer text-[#f9f8f6]"
                      >
                        <div className="relative size-[16px] rotate-90">
                          <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle183} />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>


              </div>
              
              {/* Logged in as Spencer text */}
              {isLoggedIn && (
                <div className="mt-3 text-center">
                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] opacity-70 text-[11px]">
                    Logged in as Spencer
                  </p>
                </div>
              )}
            </div>
          </div>
          )}
        </>
      ) : (
        <>
          {/* Centered search bar - initial screen */}
          <div className="relative flex-1 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
              <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[42px] text-nowrap whitespace-pre mb-9">
                Hello Spencer!
              </p>
              <div className="relative bg-[#482b22] border-[#282828] border-solid rounded-[19.5px] w-[650px] flex flex-col px-[18px] py-[12px]" style={{ borderWidth: '0.45px', minHeight: '80px' }}>
                {/* File previews */}
                {uploadedFiles.length > 0 && (
                  <div className="flex gap-2 mb-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="relative w-fit">
                        {filePreviews[index] ? (
                          <img 
                            src={filePreviews[index]} 
                            alt="Preview" 
                            className="w-16 h-16 object-cover rounded-[16px] cursor-pointer" 
                            onClick={() => {
                              setFullViewIndex(index);
                              setIsFullViewOpen(true);
                            }}
                          />
                        ) : (
                          <div 
                            className="w-16 h-16 bg-[#482b22] rounded-[16px] flex items-center justify-center cursor-pointer"
                            onClick={() => {
                              setFullViewIndex(index);
                              setIsFullViewOpen(true);
                            }}
                          >
                            <p className="font-['ABC_Diatype',sans-serif] text-[10px] text-[#f9f9f9]">
                              {file.name.split('.').pop()?.toUpperCase()}
                            </p>
                          </div>
                        )}
                        <button 
                          onClick={() => {
                            setUploadedFiles(prev => prev.filter((_, i) => i !== index));
                            setFilePreviews(prev => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute -top-1 -right-1 text-white text-[16px] leading-none bg-[#482b22] rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* First line: Ask anything input or recording dots */}
                <div className="w-full mb-4 flex items-start pt-1" style={{ minHeight: '28px' }}>
                  {isRecording ? (
                    <div className="flex items-center justify-center gap-1.5 w-full h-[28px]">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-[#f9f9f9] rounded-full animate-pulse"
                          style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '1s'
                          }}
                        />
                      ))}
                    </div>
                  ) : (
                    <textarea 
                      ref={inputRef}
                      placeholder="Ask what you want to know"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      onKeyDown={handleKeyPress}
                      className="w-full font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[17px] bg-transparent border-none outline-none placeholder:text-[#f9f9f9] resize-none overflow-y-auto pt-1"
                      rows={1}
                      style={{ minHeight: '28px', maxHeight: '140px' }}
                    />
                  )}
                </div>

                {/* Second line: mic and send button */}
                <div className="flex items-center w-full mt-auto">
                  <div className="flex-1" />
                
                  {/* Right side icons */}
                  <div className="ml-auto flex items-center gap-3">
                    {/* File upload button */}
                    <button 
                      onClick={() => document.getElementById('file-upload-cs')?.click()}
                      className="relative size-[18px] cursor-pointer"
                    >
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgFileUpload} />
                    </button>
                    <input 
                      id="file-upload-cs"
                      type="file"
                      multiple
                      className="hidden"
                      accept="image/*,.pdf,.doc,.docx"
                      onChange={handleFileUpload}
                      disabled={uploadedFiles.length >= 3}
                    />
                    <button 
                      onClick={() => setIsRecording(!isRecording)}
                      className={`relative size-[25.5px] cursor-pointer ${isRecording ? 'hidden' : ''}`}
                    >
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle190} />
                    </button>
                    <button 
                      onClick={() => {
                        if (isRecording) {
                          setIsRecording(false);
                        } else {
                          handleSendMessage();
                        }
                      }}
                      className="relative bg-[#f9f8f6] rounded-[31.5px] size-[25.5px] flex items-center justify-center cursor-pointer"
                    >
                      <div className="relative size-[10.5px] rotate-90">
                        <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle183} />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div ref={dropdownRef} className="absolute top-[70px] left-0 bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[6px] w-[150px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] z-10">
                  {/* AI Doctor */}
                  <button 
                    onClick={() => {
                      handleSelectOption('AI Doctor', imgRectangle132);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-[12px] py-[6px] rounded-t-[6px] ${
                      selectedOption.name === 'AI Doctor' ? 'bg-[#482b22]' : ''
                    }`}
                  >
                    <div className="relative size-[13.5px]">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle132} />
                    </div>
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">AI Doctor</p>
                  </button>
                  
                  {/* General Health */}
                  <button 
                    onClick={() => {
                      handleSelectOption('General Health', imgRectangle183);
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-[12px] py-[6px] rounded-b-[6px] ${
                      selectedOption.name === 'General Health' ? 'bg-[#482b22]' : ''
                    }`}
                  >
                    <div className="relative size-[13.5px]">
                      <img alt="" className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full" src={imgRectangle183} />
                    </div>
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">General Health</p>
                  </button>
                </div>
              )}

              {/* Logged in as Spencer text */}
              {isLoggedIn && (
                <div className="mt-3 text-center">
                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] opacity-70 text-[11px]">
                    Logged in as Spencer
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Full view modal */}
      {isFullViewOpen && filePreviews[fullViewIndex] && (
        <div 
          className="fixed inset-0 z-50 bg-[#482b22] bg-opacity-90 flex items-center justify-center"
          onClick={() => setIsFullViewOpen(false)}
        >
          <div className="relative max-w-[90vw] max-h-[90vh]">
            <img 
              src={filePreviews[fullViewIndex]} 
              alt="Full view" 
              className="max-w-full max-h-[90vh] object-contain"
              onClick={(e) => e.stopPropagation()}
            />
            <button 
              onClick={() => setIsFullViewOpen(false)}
              className="absolute top-4 right-4 text-white text-[32px] leading-none bg-[#482b22] bg-opacity-50 w-10 h-10 rounded-full flex items-center justify-center"
            >
              ×
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
