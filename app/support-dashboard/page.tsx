'use client';

import { useState, useEffect } from 'react';
import type { SupportRequest, ChatHistory } from '@/lib/api/support-dashboard';

export default function SupportDashboard() {
  const [requests, setRequests] = useState<SupportRequest[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<SupportRequest | null>(null);
  const [chatHistory, setChatHistory] = useState<ChatHistory | null>(null);
  const [loading, setLoading] = useState(true);
  const [internalNotes, setInternalNotes] = useState('');
  const [customerNotes, setCustomerNotes] = useState('');
  const [assignedTo, setAssignedTo] = useState('');

  useEffect(() => {
    loadRequests();
  }, []);

  useEffect(() => {
    if (selectedRequest) {
      loadChatHistory(selectedRequest.user_id);
      setInternalNotes(selectedRequest.internal_notes || '');
      setCustomerNotes(selectedRequest.customer_notes || '');
      setAssignedTo(selectedRequest.assigned_to || '');
    }
  }, [selectedRequest]);

  const loadRequests = async () => {
    try {
      const response = await fetch('/api/support/requests');
      if (!response.ok) throw new Error('Failed to fetch requests');
      const data = await response.json();
      setRequests(data);
    } catch (error) {
      console.error('Failed to load requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const loadChatHistory = async (userId: string) => {
    try {
      const response = await fetch(`/api/support/chat-history?user_id=${userId}`);
      if (!response.ok) throw new Error('Failed to fetch chat history');
      const history = await response.json();
      setChatHistory(history);
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  };

  const handleStatusUpdate = async (newStatus: string, statusMessage?: string) => {
    if (!selectedRequest) return;

    try {
      const response = await fetch('/api/support/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: selectedRequest.id,
          current_status: newStatus,
          status_message: statusMessage,
          agent_name: 'Support Agent',
        }),
      });
      if (!response.ok) throw new Error('Failed to update status');
      
      await loadRequests();
      const updatedResponse = await fetch(`/api/support/request?id=${selectedRequest.id}`);
      if (updatedResponse.ok) {
        const updated = await updatedResponse.json();
        setSelectedRequest(updated);
      }
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedRequest) return;

    try {
      const response = await fetch('/api/support/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: selectedRequest.id,
          internal_notes: internalNotes,
          customer_notes: customerNotes,
        }),
      });
      if (!response.ok) throw new Error('Failed to save notes');
      
      await loadRequests();
      const updatedResponse = await fetch(`/api/support/request?id=${selectedRequest.id}`);
      if (updatedResponse.ok) {
        const updated = await updatedResponse.json();
        setSelectedRequest(updated);
      }
    } catch (error) {
      console.error('Failed to save notes:', error);
    }
  };

  const handleAssign = async () => {
    if (!selectedRequest) return;

    try {
      const response = await fetch('/api/support/update-status', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          request_id: selectedRequest.id,
          assigned_to: assignedTo,
        }),
      });
      if (!response.ok) throw new Error('Failed to assign');
      
      await loadRequests();
      const updatedResponse = await fetch(`/api/support/request?id=${selectedRequest.id}`);
      if (updatedResponse.ok) {
        const updated = await updatedResponse.json();
        setSelectedRequest(updated);
      }
    } catch (error) {
      console.error('Failed to assign:', error);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Request List */}
      <div style={{ width: '300px', borderRight: '1px solid #ccc', overflowY: 'auto' }}>
        <h2>Support Requests</h2>
        {requests.map((req) => (
          <div
            key={req.id}
            onClick={() => setSelectedRequest(req)}
            style={{
              padding: '10px',
              cursor: 'pointer',
              backgroundColor: selectedRequest?.id === req.id ? '#f0f0f0' : 'white',
            }}
          >
            <div><strong>{req.user_name}</strong></div>
            <div>{req.current_status}</div>
            <div style={{ fontSize: '12px', color: '#666' }}>{req.requested_at}</div>
          </div>
        ))}
      </div>

      {/* Request Details */}
      {selectedRequest && (
        <div style={{ flex: 1, padding: '20px', overflowY: 'auto' }}>
          <h2>Customer Details</h2>
          <div>
            <p><strong>Name:</strong> {selectedRequest.user_name}</p>
            <p><strong>Phone:</strong> {selectedRequest.user_phone}</p>
            <p><strong>Gender:</strong> {selectedRequest.gender || 'N/A'}</p>
            <p><strong>Age:</strong> {selectedRequest.age || 'N/A'}</p>
            <p><strong>City:</strong> {selectedRequest.city || 'N/A'}</p>
            <p><strong>Company:</strong> {selectedRequest.company_name} ({selectedRequest.company_country})</p>
            <p><strong>User ID:</strong> {selectedRequest.user_id}</p>
          </div>

          <h3>Status</h3>
          <div>
            <select
              value={selectedRequest.current_status}
              onChange={(e) => handleStatusUpdate(e.target.value)}
            >
              <option value="pending">Pending</option>
              <option value="reviewing_case">Reviewing Case</option>
              <option value="contacting_customer">Contacting Customer</option>
              <option value="working_on_solution">Working on Solution</option>
              <option value="discussion_with_team">Discussion with Team</option>
              <option value="waiting_for_approval">Waiting for Approval</option>
              <option value="preparing_response">Preparing Response</option>
              <option value="resolved">Resolved</option>
            </select>
          </div>

          <h3>Chat History</h3>
          <div style={{ maxHeight: '300px', overflowY: 'auto', border: '1px solid #ccc', padding: '10px' }}>
            {chatHistory?.messages.map((msg) => (
              <div key={msg.id} style={{ marginBottom: '10px' }}>
                <strong>{msg.role === 'user' ? 'User' : 'AI'}:</strong> {msg.content}
                <div style={{ fontSize: '12px', color: '#666' }}>{new Date(msg.created_at).toLocaleString()}</div>
              </div>
            ))}
          </div>

          <h3>Notes</h3>
          <div>
            <label>Internal Notes:</label>
            <textarea
              value={internalNotes}
              onChange={(e) => setInternalNotes(e.target.value)}
              rows={5}
              style={{ width: '100%' }}
            />
          </div>
          <div>
            <label>Customer Notes:</label>
            <textarea
              value={customerNotes}
              onChange={(e) => setCustomerNotes(e.target.value)}
              rows={5}
              style={{ width: '100%' }}
            />
          </div>
          <button onClick={handleSaveNotes}>Save Notes</button>

          <h3>Assignment</h3>
          <div>
            <input
              type="text"
              value={assignedTo}
              onChange={(e) => setAssignedTo(e.target.value)}
              placeholder="Agent name"
            />
            <button onClick={handleAssign}>Assign</button>
          </div>
        </div>
      )}
    </div>
  );
}
