'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { supabase } from '@/lib/supabase';
import { useChat } from '@/lib/hooks/useChat';
import { useSupport } from '@/lib/hooks/useSupport';
import { useSupportStatus } from '@/lib/hooks/useSupportStatus';
import Login from '@/components/Login';
import { OnboardingECode } from '@/components/OnboardingECode';
import { OnboardingE } from '@/components/OnboardingE';
import { OnboardingF } from '@/components/OnboardingF';
import { ArrowRight } from 'lucide-react';

interface Message {
  id: number;
  question: string;
  answer: string;
  selectedOption?: { name: string; icon: string } | null;
  files?: File[];
  filePreviews?: string[];
}

export default function Home() {
  const router = useRouter();
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<{ name: string; icon: string }>({
    name: 'AI Doctor',
    icon: '/assets/46768b18ab068fb9bc1afac1f2178cd51000d120.png',
  });
  const [isChatMode, setIsChatMode] = useState(false);
  const [isWalletView, setIsWalletView] = useState(false);
  const [isInternalView, setIsInternalView] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [editablePhoneNumber, setEditablePhoneNumber] = useState('');
  const [awaitingCallConfirmation, setAwaitingCallConfirmation] = useState(false);
  const [isOnboardingStartPage, setIsOnboardingStartPage] = useState(false);
  const [isOnboardingPasswordPage, setIsOnboardingPasswordPage] = useState(false);
  const [isOnboardingFlow, setIsOnboardingFlow] = useState(false);
  const [activationCode, setActivationCode] = useState('');
  const [isOnboardingFStartPage, setIsOnboardingFStartPage] = useState(false);
  const [userType, setUserType] = useState<'employee' | 'founder' | null>(null);
  const [isCalling, setIsCalling] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isFullViewOpen, setIsFullViewOpen] = useState(false);
  const [fullViewIndex, setFullViewIndex] = useState<number>(0);
  const [userId, setUserId] = useState<string | undefined>();

  const { messages: chatMessages, loading: chatLoading, error: chatError, sendMessage } = useChat();
  const { loading: supportLoading, error: supportError, request: requestSupport } = useSupport();
  const { status: supportStatus } = useSupportStatus(userId);

  const inputRef = useRef<HTMLTextAreaElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const profileDropdownRef = useRef<HTMLDivElement>(null);

  // Check auth status
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        setIsLoggedIn(true);
        // Get user profile
        supabase
          .from('users')
          .select('id, phone, full_name')
          .eq('auth_user_id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserId(data.id);
              setUserPhoneNumber(data.phone || '');
              setEditablePhoneNumber(data.phone || '');
            }
          });
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoggedIn(!!session);
      if (session) {
        supabase
          .from('users')
          .select('id, phone, full_name')
          .eq('auth_user_id', session.user.id)
          .single()
          .then(({ data }) => {
            if (data) {
              setUserId(data.id);
              setUserPhoneNumber(data.phone || '');
              setEditablePhoneNumber(data.phone || '');
            }
          });
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  // Sync chat messages
  useEffect(() => {
    if (chatMessages.length > 0) {
      const formattedMessages: Message[] = chatMessages.map((msg, idx) => ({
        id: Date.now() + idx,
        question: msg.role === 'user' ? msg.content : '',
        answer: msg.role === 'ai' ? msg.content : '',
        selectedOption: selectedOption,
      }));
      setMessages(formattedMessages);
    }
  }, [chatMessages, selectedOption]);

  // Auto-scroll messages
  useEffect(() => {
    if (!isOnboardingFlow) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOnboardingFlow]);

  // Click outside handlers
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMenuOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (isProfileMenuOpen && profileDropdownRef.current && !profileDropdownRef.current.contains(event.target as Node)) {
        setIsProfileMenuOpen(false);
        setIsCalling(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, isProfileMenuOpen]);

  const handleSelectOption = (name: string, icon: string) => {
    setSelectedOption({ name, icon });
    setIsMenuOpen(false);
  };

  const handleCustomerServiceClick = async () => {
    setIsProfileMenuOpen(false);
    setIsCalling(false);
    setIsWalletView(false);
    setIsChatMode(true);

    try {
      const response = await requestSupport();
      const newMessage: Message = {
        id: Date.now(),
        question: 'Customer Service',
        answer: `Hi! I'd be happy to help you. I have your phone number on file as ${response.phone}. Is this number correct?`,
        selectedOption: { name: 'Customer Service', icon: '/assets/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png' },
      };

      setMessages([...messages, newMessage]);
      setAwaitingCallConfirmation(true);
    } catch (error) {
      const errorMessage: Message = {
        id: Date.now(),
        question: 'Customer Service',
        answer: `Sorry, there was an error requesting support: ${error instanceof Error ? error.message : 'Unknown error'}`,
        selectedOption: { name: 'Customer Service', icon: '/assets/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png' },
      };
      setMessages([...messages, errorMessage]);
    }
  };

  const handleOnboardingCodeComplete = (code: string) => {
    setActivationCode(code);
    setIsOnboardingStartPage(false);
    setIsOnboardingPasswordPage(true);
  };

  const handleOnboardingPasswordComplete = () => {
    setIsOnboardingPasswordPage(false);
    setIsChatMode(false);
    setIsOnboardingFlow(false);
    setIsLoggedIn(true);
    setUserType('employee');
    setMessages([]);
    // Refresh to get user data
    window.location.reload();
  };

  const handleOnboardingFStart = (code: string) => {
    setActivationCode(code);
    setIsOnboardingFStartPage(false);
    setIsChatMode(false);
    setIsOnboardingFlow(false);
    setIsLoggedIn(true);
    setUserType('founder');
    setMessages([]);
    // Note: Founder activation would need similar flow
  };

  const handleConfirmCall = (confirmed: boolean) => {
    if (confirmed) {
      const callMessage: Message = {
        id: Date.now(),
        question: "Yes, that's correct",
        answer: `Great! I'm calling you now at ${userPhoneNumber}. Please wait a moment...`,
        selectedOption: { name: 'Customer Service', icon: '/assets/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png' },
      };
      setMessages([...messages, callMessage]);
    } else {
      const updateMessage: Message = {
        id: Date.now(),
        question: "No, that's not correct",
        answer: "I understand. Please provide your correct phone number and I'll update our records.",
        selectedOption: { name: 'Customer Service', icon: '/assets/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png' },
      };
      setMessages([...messages, updateMessage]);
    }
    setAwaitingCallConfirmation(false);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const remainingSlots = 3 - uploadedFiles.length;
      const newFiles = Array.from(files).slice(0, remainingSlots);

      const updatedFiles = [...uploadedFiles, ...newFiles];
      setUploadedFiles(updatedFiles);

      newFiles.forEach((file) => {
        if (file.type.startsWith('image/')) {
          const reader = new FileReader();
          reader.onload = (e) => {
            setFilePreviews((prev) => [...prev, e.target?.result as string]);
          };
          reader.readAsDataURL(file);
        } else {
          setFilePreviews((prev) => [...prev, '']);
        }
      });
    }
    event.target.value = '';
  };

  const handleSendMessage = async () => {
    if (isOnboardingStartPage || isOnboardingPasswordPage || isOnboardingFStartPage) {
      return;
    }

    if (!inputValue.trim() && uploadedFiles.length === 0) return;

    // Add user message immediately
    const userMessage: Message = {
      id: Date.now(),
      question: inputValue,
      answer: '',
      selectedOption: selectedOption,
      files: uploadedFiles.length > 0 ? [...uploadedFiles] : undefined,
      filePreviews: filePreviews.length > 0 ? [...filePreviews] : undefined,
    };

    setMessages([...messages, userMessage]);
    setInputValue('');
    setUploadedFiles([]);
    setFilePreviews([]);
    setIsChatMode(true);
    setIsMenuOpen(false);

    // Send to backend
    if (inputValue.trim()) {
      try {
        await sendMessage(inputValue);
      } catch (error) {
        console.error('Failed to send message:', error);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      if (isRecording) {
        setIsRecording(false);
      } else {
        handleSendMessage();
      }
    }
  };

  // Auto-resize textarea
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
    return <OnboardingE activationCode={activationCode} onComplete={handleOnboardingPasswordComplete} />;
  }

  if (isOnboardingFStartPage) {
    return <OnboardingF onComplete={handleOnboardingFStart} />;
  }

  if (isInternalView) {
    router.push('/support-dashboard');
    return null;
  }

  return (
    <div className="relative h-screen flex flex-col overflow-hidden bg-[#f9f8f6]">
      {/* JANTA Logo - top left */}
      <button
        onClick={() => {
          setIsChatMode(false);
          setIsWalletView(false);
          setIsInternalView(false);
          setIsOnboardingStartPage(false);
          setIsOnboardingPasswordPage(false);
          setIsOnboardingFlow(false);
          setIsOnboardingFStartPage(false);
          setMessages([]);
          setInputValue('');
          setIsMenuOpen(false);
        }}
        className="absolute left-[16px] top-[4px] z-10 cursor-pointer"
      >
        <Image
          alt="JANTA"
          src="/assets/1764ad722a3a27350e171a5285220c9a91f02b7d.png"
          width={200}
          height={70}
          className="h-[70px] w-auto object-contain"
        />
      </button>

      {/* Login button or User avatar - bottom left */}
      {isLoggedIn && !isOnboardingStartPage && !isOnboardingPasswordPage && !isOnboardingFStartPage ? (
        <div className="absolute bottom-[21px] left-[21px] z-10 flex flex-col gap-3">
          {/* Wallet - only show for founders */}
          {userType === 'founder' && (
            <button
              onClick={() => setIsWalletView(!isWalletView)}
              className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[36px] px-[18px] flex items-center gap-3 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              <div className="relative size-[13.5px]">
                <Image
                  alt=""
                  src="/assets/5917bfa10402943b0f061dd2b5e720d71c67964c.png"
                  width={13.5}
                  height={13.5}
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                />
              </div>
              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f8f6] text-[12px] text-nowrap whitespace-pre">
                Wallet
              </p>
            </button>
          )}

          {/* Customer Service Menu Toggle */}
          {!isInternalView && (
            <button
              onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
              className="bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] h-[36px] px-[18px] flex items-center gap-3 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] cursor-pointer"
            >
              <div className="relative size-[13.5px]">
                <Image
                  alt=""
                  src="/assets/8b1caddc21d7d46f00aa0b4011a3a282207caaf5.png"
                  width={13.5}
                  height={13.5}
                  className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                />
              </div>
              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">
                Customer Service
              </p>
            </button>
          )}

          {/* Customer Service Dropdown Menu */}
          {isProfileMenuOpen && !isInternalView && (
            <div
              ref={profileDropdownRef}
              className="absolute bottom-[45px] left-0 bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[12px] w-[240px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] z-50 p-4"
            >
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
                onClick={handleCustomerServiceClick}
                disabled={supportLoading}
                className="w-full bg-[#f9f8f6] border-[#282828] border-[0.45px] border-solid rounded-[8px] h-[36px] flex items-center justify-center transition-colors disabled:opacity-50"
              >
                <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#000000] text-[12px]">
                  {supportLoading ? 'Requesting...' : 'Call'}
                </p>
              </button>
            </div>
          )}
        </div>
      ) : !isOnboardingStartPage && !isOnboardingPasswordPage && !isOnboardingFStartPage ? (
        <button
          onClick={() => setShowLogin(true)}
          className="absolute bottom-[21px] left-[21px] cursor-pointer z-10"
        >
          <div className="bg-[#482b22] border-[#282828] border-solid h-[22.8px] rounded-[15.6px] w-[64.8px] flex items-center justify-center" style={{ borderWidth: '0.36px' }}>
            <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[9.6px] text-nowrap whitespace-pre">
              Log in
            </p>
          </div>
        </button>
      ) : null}

      {/* Wallet view */}
      {isWalletView ? (
        <div className="relative flex-1 overflow-y-auto px-8 pt-24 pb-32">
          <div className="max-w-[700px] mx-auto">
            <div className="mb-8 text-center">
              <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[32px]">
                Wallet
              </p>
            </div>
            <div className="bg-[#482b22] rounded-[20px] p-8 mb-6 shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)]">
              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[20px] mb-6">
                Claims Overview
              </p>
              <p className="font-['ABC_Diatype',sans-serif] font-light leading-[normal] not-italic text-[#f9f9f9] text-[14px]">
                Wallet functionality coming soon...
              </p>
            </div>
          </div>
        </div>
      ) : isChatMode ? (
        <>
          {/* Chat messages area */}
          <div className="relative flex-1 overflow-y-auto pt-24 pb-8">
            <div className="max-w-[650px] mx-auto space-y-6 pb-32 px-8">
              {messages.map((message) => (
                <div key={message.id} className="space-y-4">
                  {/* Question bubble */}
                  {message.question && (
                    <div className="flex justify-end">
                      <div className="bg-[#482b22] rounded-[19.5px] px-[18px] py-[10px] max-w-[400px]">
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
                                  <div className="w-16 h-16 bg-[#3d231c] rounded-[12px] flex items-center justify-center cursor-pointer">
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

                  {/* Answer */}
                  {message.answer && (
                    <div className="pr-[120px]">
                      <div className="bg-transparent rounded-[19.5px] px-[18px] py-[12px] w-fit max-w-[600px]">
                        <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[1.5] not-italic text-[#000000] text-[19px] whitespace-pre-wrap break-words">
                          {message.answer}
                        </p>

                        {/* Confirmation with editable phone number and call button */}
                        {awaitingCallConfirmation && message.id === messages[messages.length - 1]?.id && (
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
                              <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px]">
                                Call
                              </p>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Search bar at bottom */}
          <div className="relative pb-8">
            <div className="max-w-[650px] mx-auto px-8">
              <div className="relative flex flex-col items-center">
                <div
                  className="relative bg-[#482b22] border-[#282828] border-solid rounded-[19.5px] w-[650px] flex flex-col px-[18px] py-[12px]"
                  style={{ borderWidth: '0.45px', minHeight: '80px' }}
                >
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
                              setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
                              setFilePreviews((prev) => prev.filter((_, i) => i !== index));
                            }}
                            className="absolute -top-1 -right-1 text-white text-[16px] leading-none bg-[#482b22] rounded-full w-5 h-5 flex items-center justify-center"
                          >
                            ×
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Input */}
                  <div className="w-full mb-4 flex items-start pt-1" style={{ minHeight: '28px' }}>
                    {isRecording ? (
                      <div className="flex items-center justify-center gap-1.5 w-full h-[28px]">
                        {[0, 1, 2, 3, 4].map((i) => (
                          <div
                            key={i}
                            className="w-1.5 h-1.5 bg-[#f9f9f9] rounded-full animate-pulse"
                            style={{
                              animationDelay: `${i * 0.15}s`,
                              animationDuration: '1s',
                            }}
                          />
                        ))}
                      </div>
                    ) : (
                      <textarea
                        ref={inputRef}
                        placeholder={selectedOption.name === 'AI Doctor' ? 'Ask health related' : 'Ask anything'}
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={handleKeyPress}
                        className="w-full font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#f9f9f9] text-[17px] bg-transparent border-none outline-none placeholder:text-[#f9f9f9] resize-none overflow-y-auto pt-1"
                        rows={1}
                        style={{ minHeight: '28px', maxHeight: '140px' }}
                      />
                    )}
                  </div>

                  {/* Icons */}
                  <div className="flex items-center w-full mt-auto">
                    <div className="flex-1" />

                    <div className="ml-auto flex items-center gap-3">
                      {/* File upload */}
                      <button
                        onClick={() => document.getElementById('file-upload-main')?.click()}
                        className="relative size-[18px] cursor-pointer"
                      >
                        <Image
                          alt=""
                          src="/assets/9a5091bd34b099cbaf8b3472262c94f94f367473.png"
                          width={18}
                          height={18}
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                        />
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
                          <Image
                            alt=""
                            src="/assets/31a0f845575e402d8be6aa2c923016e0a606f09f.png"
                            width={25.5}
                            height={25.5}
                            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                          />
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
                        disabled={chatLoading}
                        className="relative bg-[#f9f8f6] rounded-[31.5px] size-[36px] flex items-center justify-center cursor-pointer text-[#f9f8f6] disabled:opacity-50"
                      >
                        <div className="relative size-[16px] rotate-90">
                          <Image
                            alt=""
                            src="/assets/7ade6729c509000e9c9ec39030c32dacae42e0bb.png"
                            width={16}
                            height={16}
                            className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                          />
                        </div>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Logged in text */}
                {isLoggedIn && (
                  <div className="mt-3 text-center">
                    <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] opacity-70 text-[11px]">
                      Logged in
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Centered search bar - initial screen */}
          <div className="relative flex-1 flex items-center justify-center">
            <div className="relative flex flex-col items-center justify-center">
              <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] text-[42px] text-nowrap whitespace-pre mb-9">
                {isLoggedIn ? 'Hello!' : 'Hello!'}
              </p>
              <div
                className="relative bg-[#482b22] border-[#282828] border-solid rounded-[19.5px] w-[650px] flex flex-col px-[18px] py-[12px]"
                style={{ borderWidth: '0.45px', minHeight: '80px' }}
              >
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
                            setUploadedFiles((prev) => prev.filter((_, i) => i !== index));
                            setFilePreviews((prev) => prev.filter((_, i) => i !== index));
                          }}
                          className="absolute -top-1 -right-1 text-white text-[16px] leading-none bg-[#482b22] rounded-full w-5 h-5 flex items-center justify-center"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Input */}
                <div className="w-full mb-4 flex items-start pt-1" style={{ minHeight: '28px' }}>
                  {isRecording ? (
                    <div className="flex items-center justify-center gap-1.5 w-full h-[28px]">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <div
                          key={i}
                          className="w-1.5 h-1.5 bg-[#f9f9f9] rounded-full animate-pulse"
                          style={{
                            animationDelay: `${i * 0.15}s`,
                            animationDuration: '1s',
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

                {/* Icons */}
                <div className="flex items-center w-full mt-auto">
                  <div className="flex-1" />

                  <div className="ml-auto flex items-center gap-3">
                    {/* File upload */}
                    <button
                      onClick={() => document.getElementById('file-upload-cs')?.click()}
                      className="relative size-[18px] cursor-pointer"
                    >
                      <Image
                        alt=""
                        src="/assets/9a5091bd34b099cbaf8b3472262c94f94f367473.png"
                        width={18}
                        height={18}
                        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      />
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
                      <Image
                        alt=""
                        src="/assets/31a0f845575e402d8be6aa2c923016e0a606f09f.png"
                        width={25.5}
                        height={25.5}
                        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      />
                    </button>
                    <button
                      onClick={() => {
                        if (isRecording) {
                          setIsRecording(false);
                        } else {
                          handleSendMessage();
                        }
                      }}
                      disabled={chatLoading}
                      className="relative bg-[#f9f8f6] rounded-[31.5px] size-[25.5px] flex items-center justify-center cursor-pointer disabled:opacity-50"
                    >
                      <div className="relative size-[10.5px] rotate-90">
                        <Image
                          alt=""
                          src="/assets/7ade6729c509000e9c9ec39030c32dacae42e0bb.png"
                          width={10.5}
                          height={10.5}
                          className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                        />
                      </div>
                    </button>
                  </div>
                </div>
              </div>

              {/* Dropdown Menu */}
              {isMenuOpen && (
                <div
                  ref={dropdownRef}
                  className="absolute top-[70px] left-0 bg-[#482b22] border-[#282828] border-[0.45px] border-solid rounded-[6px] w-[150px] shadow-[0px_0px_6px_0px_rgba(0,0,0,0.3)] z-10"
                >
                  {/* AI Doctor */}
                  <button
                    onClick={() => {
                      handleSelectOption('AI Doctor', '/assets/46768b18ab068fb9bc1afac1f2178cd51000d120.png');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-[12px] py-[6px] rounded-t-[6px] ${
                      selectedOption.name === 'AI Doctor' ? 'bg-[#482b22]' : ''
                    }`}
                  >
                    <div className="relative size-[13.5px]">
                      <Image
                        alt=""
                        src="/assets/46768b18ab068fb9bc1afac1f2178cd51000d120.png"
                        width={13.5}
                        height={13.5}
                        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      />
                    </div>
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">
                      AI Doctor
                    </p>
                  </button>

                  {/* General Health */}
                  <button
                    onClick={() => {
                      handleSelectOption('General Health', '/assets/7ade6729c509000e9c9ec39030c32dacae42e0bb.png');
                      setIsMenuOpen(false);
                    }}
                    className={`w-full flex items-center gap-2 px-[12px] py-[6px] rounded-b-[6px] ${
                      selectedOption.name === 'General Health' ? 'bg-[#482b22]' : ''
                    }`}
                  >
                    <div className="relative size-[13.5px]">
                      <Image
                        alt=""
                        src="/assets/7ade6729c509000e9c9ec39030c32dacae42e0bb.png"
                        width={13.5}
                        height={13.5}
                        className="absolute inset-0 max-w-none object-50%-50% object-cover pointer-events-none size-full"
                      />
                    </div>
                    <p className="font-['ABC_Diatype',sans-serif] font-medium leading-[normal] not-italic text-[#f9f9f9] text-[12px] text-nowrap whitespace-pre">
                      General Health
                    </p>
                  </button>
                </div>
              )}

              {/* Logged in text */}
              {isLoggedIn && (
                <div className="mt-3 text-center">
                  <p className="font-['ABC_Diatype',sans-serif] font-normal leading-[normal] not-italic text-[#482b22] opacity-70 text-[11px]">
                    Logged in
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}

      {/* Support Status Widget */}
      {supportStatus && (
        <div className="fixed bottom-4 right-4 bg-[#482b22] rounded-[12px] p-4 shadow-lg z-50">
          <p className="font-['ABC_Diatype',sans-serif] font-medium text-[#f9f9f9] text-[12px] mb-1">
            {supportStatus.status_message || supportStatus.current_status}
          </p>
          <p className="font-['ABC_Diatype',sans-serif] font-light text-[#f9f9f9] text-[10px] opacity-70">
            Last updated: {new Date(supportStatus.last_activity_at).toLocaleTimeString()}
          </p>
        </div>
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
