import { useState, useEffect, useCallback } from 'react'
import { MessageSquare, Search, Send, ChevronRight } from 'lucide-react'
import {
  getMessages,
  getConversation,
  sendMessage,
  markMessageAsRead,
} from '../../../../services/messages'
import { toast } from 'sonner'

const Messages = () => {
  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState(null)
  const [loading, setLoading] = useState(true)
  const [conversationLoading, setConversationLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [newMessage, setNewMessage] = useState('')
  const [selectedConversation, setSelectedConversation] = useState(null)
  const [unreadCount, setUnreadCount] = useState(0)
  const [view, setView] = useState('list') // 'list' | 'conversation'
  const timeOptions = { hour: '2-digit', minute: '2-digit' }

  const fetchMessages = useCallback(async () => {
    try {
      setLoading(true)
      const res = await getMessages(1, 50)
      const data = res.data || []
      setMessages(data)
      setUnreadCount(data.filter((m) => !m.read).length)
    } catch {
      setMessages([])
      setUnreadCount(0)
    } finally {
      setLoading(false)
    }
  }, [])

  const openConversation = async (conversationId, otherUser) => {
    setSelectedConversation(otherUser)
    setConversationLoading(true)
    setView('conversation')
    try {
      const res = await getConversation(conversationId)
      setConversation(res.data || [])
      // Mark messages as read
      res.data.forEach(async (msg) => {
        if (!msg.read) {
          await markMessageAsRead(msg.id)
        }
      })
      setUnreadCount(0)
    } catch {
      setConversation([])
    } finally {
      setConversationLoading(false)
    }
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!newMessage.trim() || !selectedConversation) return

    setSending(true)
    try {
      const res = await sendMessage({
        receiverId: selectedConversation.id,
        content: newMessage.trim(),
      })
      setConversation((prev) => [...(prev || []), res.data])
      setNewMessage('')
      setSending(false)
      toast.success('Message sent')
    } catch (err) {
      setSending(false)
      toast.error(err.message || 'Failed to send message')
    }
  }

  const handleMessageChange = (e) => {
    setNewMessage(e.target.value)
  }

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  if (loading) {
    return (
      <div className="flex flex-col min-h-full bg-gray-50 p-3 sm:p-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-2xl font-black text-[#111827] tracking-tight">
              Messages
            </h1>
            <p className="text-sm text-[#6B7280] mt-1">
              Send and receive messages with other users
            </p>
          </div>
        </div>
        <div className="mt-6 flex justify-center">
          <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col min-h-full bg-gray-50 p-3 sm:p-6">
      {/* Top Header Section */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-black text-[#111827] tracking-tight">
            Messages
          </h1>
          <p className="text-sm text-[#6B7280] mt-1">
            Send and receive messages with other users
          </p>
        </div>

        <div className="flex items-center space-x-2 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search messages..."
            className="pl-10 pr-4 py-2 rounded-xl border border-[#E5E7EB] text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors w-full md:w-80"
          />
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        </div>
      </div>

      {/* Conversation List */}
      <div className="bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <h4 className="text-base font-semibold text-[#111827]">
            Conversations
          </h4>
          {unreadCount > 0 && (
            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-[#00B87C] text-white">
              {unreadCount} unread
            </span>
          )}
        </div>

        {loading ? (
          <div className="space-y-3">
            {Array(5)
              .fill(null)
              .map((_, idx) => (
                <div key={idx} className="flex items-center space-x-4 h-16">
                  <div className="w-10 h-10 bg-gray-100 rounded-full animate-pulse" />
                  <div className="flex-1 space-y-2">
                    <div className="h-4 w-32 bg-gray-100 rounded animate-pulse" />
                    <div className="h-3 w-24 bg-gray-100 rounded animate-pulse" />
                  </div>
                  <div className="h-4 w-16 bg-gray-100 rounded animate-pulse" />
                </div>
              ))}
          </div>
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center bg-gray-50 rounded-xl border border-dashed border-gray-200">
            <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
            <h4 className="text-sm font-semibold text-[#111827] mb-1">
              No messages yet
            </h4>
            <p className="text-xs text-[#6B7280] mb-4 max-w-xs">
              Start a conversation with other users. Your messages will appear
              here.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {messages.map((msg) => (
              <div
                key={msg.id}
                onClick={() => openConversation(msg.id, msg.otherUser)}
                className={`flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-[#E5E7EB] hover:bg-gray-50 transition-colors cursor-pointer group`}
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#00B87C]">
                    <MessageSquare className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start">
                      <span className="text-sm font-semibold text-[#111827] truncate">
                        {msg.otherUser?.fullName ||
                          msg.otherUser?.userName ||
                          'Unknown User'}
                      </span>
                      <span className="text-xs text-[#9CA3AF]">
                        {new Date(msg.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                    </div>
                    <p className="text-sm text-[#6B7280] truncate mt-0.5 line-clamp-1">
                      {msg.content || '(No content)'}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-[#00B87C]" />
                    )}
                    <span className="text-xs text-[#4B5563]">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleTimeString(
                            [],
                            timeOptions,
                          )
                        : ''}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Conversation View */}
      {view === 'conversation' && selectedConversation && (
        <div className="mt-6 flex flex-col lg:flex-row gap-6 h-[calc(100vh-200px)]">
          {/* Conversation Header */}
          <div className="flex flex-col lg:flex-row lg:items-start justify-between items-start bg-white border border-[#E5E7EB] rounded-2xl p-6 shadow-sm mb-6 lg:mb-0 lg:w-full">
            <div className="flex items-center space-x-3 mb-4 lg:mb-0">
              <div className="w-12 h-12 rounded-full bg-[#EFF6FF] flex items-center justify-center text-[#00B87C]">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-[#111827]">
                  {selectedConversation.fullName ||
                    selectedConversation.userName ||
                    'Unknown User'}
                </h3>
                <p className="text-xs text-[#6B7280]">
                  {selectedConversation.email || ''}
                </p>
              </div>
              <div className="ml-auto flex items-center space-x-2">
                <button
                  onClick={() => {
                    setView('list')
                    setSelectedConversation(null)
                    setConversation(null)
                  }}
                  className="p-2 rounded-xl hover:bg-gray-100 transition-colors text-gray-600 hover:text-[#00B87C]"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 lg:h-[500px] space-y-4">
              {conversationLoading ? (
                <div className="flex justify-center py-8">
                  <div className="h-8 w-24 bg-gray-100 rounded animate-pulse" />
                </div>
              ) : conversation.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                  <MessageSquare className="w-12 h-12 text-gray-300 mb-4" />
                  <p className="text-sm text-[#6B7280]">
                    No messages yet. Start the conversation!
                  </p>
                </div>
              ) : (
                conversation.map((msg, idx) => (
                  <div
                    key={msg.id}
                    className={`flex ${msg.isSender ? 'flex-row-reverse' : 'flex-row'} mb-4`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-2xl shadow-sm ${
                        msg.isSender
                          ? 'bg-[#00B87C] text-white text-right mr-auto'
                          : 'bg-white border border-[#E5E7EB] text-[#111827] ml-auto'
                      }`}
                    >
                      <p className="text-sm">{msg.content}</p>
                      <span className="text-[10px] text-[#6B7280] mt-1 block text-right">
                        {new Date(msg.createdAt).toLocaleTimeString(
                          [],
                          timeOptions,
                        )}
                      </span>
                      {!msg.isSender && !msg.read && (
                        <span className="w-1 h-1 rounded-full bg-[#00B87C] mt-1" />
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Message Composer */}
            <div className="mt-6 flex items-center space-x-2 bg-white p-3 rounded-xl border border-[#E5E7EB] shadow-sm">
              <input
                type="text"
                value={newMessage}
                onChange={handleMessageChange}
                placeholder="Type a message..."
                disabled={!selectedConversation || sending}
                className="flex-1 px-4 py-2.5 rounded-xl border border-[#E5E7EB] text-[#111827] focus:border-[#00B87C] focus:outline-none transition-colors"
              />
              <button
                onClick={handleSendMessage}
                disabled={
                  !newMessage.trim() || !selectedConversation || sending
                }
                className="px-4 py-2.5 bg-[#00B87C] hover:bg-[#009966] disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-xl text-sm font-semibold transition-colors flex items-center gap-2"
              >
                <Send size={18} />
                {sending ? 'Sending...' : 'Send'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Messages
