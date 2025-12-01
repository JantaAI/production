/**
 * API Integration Helper
 * ======================
 * 
 * This file contains helper functions for backend integration.
 * Replace the mock implementations with actual API calls.
 */

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

// Types
export interface Claim {
  id: number;
  company: string;
  employee: string;
  type: string;
  amount: string;
  status: 'accepted' | 'denied';
  date: string;
  phone: string;
}

export interface IncomingCall {
  name: string;
  phone: string;
  company: string;
  reason: string;
  aiSummary: string;
}

export interface Company {
  id: string;
  name: string;
  employees: Employee[];
}

export interface Employee {
  id: number;
  name: string;
  phone: string;
  company: string;
}

/**
 * Claims API
 */
export const claimsAPI = {
  // Get all claims
  async getAll(): Promise<Claim[]> {
    const response = await fetch(`${API_BASE_URL}/claims`);
    if (!response.ok) throw new Error('Failed to fetch claims');
    return response.json();
  },

  // Search claims with AI
  async search(query: string): Promise<Claim[]> {
    const response = await fetch(`${API_BASE_URL}/claims/search?query=${encodeURIComponent(query)}`);
    if (!response.ok) throw new Error('Failed to search claims');
    return response.json();
  },

  // Accept a claim
  async accept(claimId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/claims/${claimId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to accept claim');
  },

  // Deny a claim
  async deny(claimId: number): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/claims/${claimId}/deny`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to deny claim');
  },
};

/**
 * Calls API
 */
export const callsAPI = {
  // Connect to incoming calls WebSocket
  connectToIncomingCalls(onIncomingCall: (call: IncomingCall) => void): WebSocket {
    const ws = new WebSocket(API_BASE_URL.replace('http', 'ws') + '/calls/incoming');
    
    ws.onmessage = (event) => {
      const call: IncomingCall = JSON.parse(event.data);
      onIncomingCall(call);
    };

    ws.onerror = (error) => {
      console.error('WebSocket error:', error);
    };

    return ws;
  },

  // Accept a call
  async accept(callId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/calls/${callId}/accept`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to accept call');
  },

  // Decline a call
  async decline(callId: string): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/calls/${callId}/decline`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to decline call');
  },
};

/**
 * Onboarding API
 */
export const onboardingAPI = {
  // Start onboarding
  async start(type: 'employee' | 'founder'): Promise<{ sessionId: string }> {
    const response = await fetch(`${API_BASE_URL}/onboarding/start`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ type }),
    });
    if (!response.ok) throw new Error('Failed to start onboarding');
    return response.json();
  },

  // Complete onboarding
  async complete(data: any): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/onboarding/complete`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    if (!response.ok) throw new Error('Failed to complete onboarding');
  },
};

/**
 * Companies API
 */
export const companiesAPI = {
  // Get all companies
  async getAll(): Promise<Company[]> {
    const response = await fetch(`${API_BASE_URL}/companies`);
    if (!response.ok) throw new Error('Failed to fetch companies');
    return response.json();
  },

  // Get employees by company
  async getEmployees(companyId: string): Promise<Employee[]> {
    const response = await fetch(`${API_BASE_URL}/companies/${companyId}/employees`);
    if (!response.ok) throw new Error('Failed to fetch employees');
    return response.json();
  },
};

/**
 * Auth API
 */
export const authAPI = {
  // Login
  async login(username: string, password: string): Promise<{ token: string; user: any }> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!response.ok) throw new Error('Failed to login');
    return response.json();
  },

  // Logout
  async logout(): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Failed to logout');
  },

  // Get current user
  async getMe(): Promise<any> {
    const response = await fetch(`${API_BASE_URL}/auth/me`);
    if (!response.ok) throw new Error('Failed to fetch user info');
    return response.json();
  },
};

/**
 * Example Usage in Component:
 * 
 * import { claimsAPI, callsAPI } from './utils/api';
 * 
 * // In useEffect for WebSocket connection
 * useEffect(() => {
 *   const ws = callsAPI.connectToIncomingCalls((call) => {
 *     setIncomingCall(call);
 *   });
 *   
 *   return () => ws.close();
 * }, []);
 * 
 * // When accepting/denying claims
 * const handleAcceptClaim = async (claimId: number) => {
 *   try {
 *     await claimsAPI.accept(claimId);
 *     // Update local state
 *     setClaims(claims.map(c => 
 *       c.id === claimId ? { ...c, status: 'accepted' } : c
 *     ));
 *   } catch (error) {
 *     console.error('Failed to accept claim:', error);
 *   }
 * };
 */
