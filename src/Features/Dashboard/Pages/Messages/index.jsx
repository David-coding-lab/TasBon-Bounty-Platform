import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import {
  ArrowLeft,
  CheckCheck,
  MessageSquare,
  Search,
  Send,
  UserRound,
} from 'lucide-react'
import { toast } from 'sonner'
import {
  getConversation,
  getMessages,
  markMessageAsRead,
  sendMessage,
} from '../../../../services/messages'

const timeOptions = { hour: '2-digit', minute: '2-digit' }

const getUserName = (user) =>
  user?.fullName || user?.userName || user?.email || 'Unknown user'

const getInitials = (user) =>
  getUserName(user)
    .split(/\s+/)
    .map((part) => part[0])
    .join('')
    .toUpperCase()
    .slice(0, 2) || '?'

const getUserId = (user) => user?.id || user?._id || user?.userId

const getMessageBody = (message) => message?.body ?? message?.content ?? ''

const getOtherUser = (message) => {
  if (message?.otherUser) return message.otherUser
  if (message?.recipient) return message.recipient
  if (message?.isMine === true || message?.isSender === true)
    return message.receiver || {}
  return message?.receiver && !message?.sender
    ? message.receiver
    : message?.sender || message?.receiver || {}
}

const getList = (payload) => {
  if (Array.isArray(payload)) return payload
  if (Array.isArray(payload?.messages)) return payload.messages
  if (Array.isArray(payload?.data)) return payload.data
  return []
}

const getTimestamp = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleTimeString([], timeOptions)
}

const getDateLabel = (value) => {
  if (!value) return ''
  const date = new Date(value)
  return Number.isNaN(date.getTime())
    ? ''
    : date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

const Avatar = ({ user, size = 'md' }) => {
  const image = user?.avatarUrl || user?.avatar || user?.profileImage
  const sizeClass = size === 'lg' ? 'h-12 w-12 text-sm' : 'h-11 w-11 text-xs'

  return (
    <div
      className={`${sizeClass} shrink-0 overflow-hidden rounded-full bg-[#D1FAE5] font-bold text-[#007A55] flex items-center justify-center`}
    >
      {image ? (
        <img
          src={image}
          alt={getUserName(user)}
          className="h-full w-full object-cover"
        />
      ) : (
        getInitials(user)
      )}
    </div>
  )
}

const MessageSkeleton = () => (
  <div className="space-y-3 p-4">
    {Array.from({ length: 5 }).map((_, index) => (
      <div key={index} className="flex items-center gap-3 rounded-xl p-2">
        <div className="h-11 w-11 animate-pulse rounded-full bg-gray-100" />
        <div className="min-w-0 flex-1 space-y-2">
          <div className="h-3 w-2/5 animate-pulse rounded bg-gray-100" />
          <div className="h-3 w-4/5 animate-pulse rounded bg-gray-100" />
        </div>
      </div>
    ))}
  </div>
)

const Messages = () => {
  const user = useSelector((state) => state.auth.user)
  const [messages, setMessages] = useState([])
  const [conversation, setConversation] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [newMessage, setNewMessage] = useState('')
  const [loading, setLoading] = useState(true)
  const [conversationLoading, setConversationLoading] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const [view, setView] = useState('list')
  const messagesEndRef = useRef(null)

  const fetchMessages = useCallback(async () => {
    setLoading(true)
    setError('')
    try {
      const response = await getMessages(1, 50)
      setMessages(getList(response?.data ?? response))
    } catch (err) {
      setMessages([])
      setError(err.message || 'Unable to load your messages')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchMessages()
  }, [fetchMessages])

  const conversations = useMemo(() => {
    const unique = new Map()
    messages.forEach((message) => {
      const otherUser = getOtherUser(message)
      const id =
        getUserId(otherUser) ||
        message.otherUserId ||
        message.receiverId ||
        message.senderId ||
        message.id
      if (id && !unique.has(String(id)))
        unique.set(String(id), { ...message, otherUser })
    })
    return Array.from(unique.values()).filter((message) => {
      const query = searchQuery.trim().toLowerCase()
      return (
        !query ||
        getUserName(message.otherUser).toLowerCase().includes(query) ||
        getMessageBody(message).toLowerCase().includes(query)
      )
    })
  }, [messages, searchQuery])

  const unreadCount = useMemo(
    () => messages.filter((message) => !message.read).length,
    [messages],
  )

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [conversation, conversationLoading])

  const openConversation = async (message) => {
    const otherUser = getOtherUser(message)
    const otherUserId =
      getUserId(otherUser) ||
      message.otherUserId ||
      message.receiverId ||
      message.senderId
    if (!otherUserId) {
      toast.error('This conversation is missing a recipient')
      return
    }

    setSelectedUser(otherUser)
    setView('conversation')
    setConversationLoading(true)
    setError('')
    try {
      const response = await getConversation(otherUserId)
      const data = getList(response?.data ?? response)
      setConversation(data)
      await Promise.all(
        data
          .filter((item) => !item.read && item.id)
          .map((item) => markMessageAsRead(item.id).catch(() => null)),
      )
      setMessages((current) =>
        current.map((item) => {
          const itemUser = getOtherUser(item)
          return getUserId(itemUser) === otherUserId
            ? { ...item, read: true }
            : item
        }),
      )
    } catch (err) {
      setConversation([])
      setError(err.message || 'Unable to load this conversation')
    } finally {
      setConversationLoading(false)
    }
  }

  const handleSendMessage = async (event) => {
    event.preventDefault()
    const content = newMessage.trim()
    const receiverId = getUserId(selectedUser)
    if (!content || !receiverId || sending) return

    setSending(true)
    try {
      const response = await sendMessage({ receiverId, body: content })
      const sent = response?.data ||
        response?.message || {
          body: content,
          receiverId,
          createdAt: new Date().toISOString(),
          isMine: true,
        }
      setConversation((current) => [
        ...current,
        { ...sent, body: sent.body || sent.content || content, isMine: true },
      ])
      setMessages((current) =>
        current.map((item) =>
          getUserId(getOtherUser(item)) === receiverId
            ? {
                ...item,
                body: content,
                createdAt: sent.createdAt || new Date().toISOString(),
                read: true,
              }
            : item,
        ),
      )
      setNewMessage('')
    } catch (err) {
      toast.error(err.message || 'Failed to send message')
    } finally {
      setSending(false)
    }
  }

  const closeConversation = () => {
    setView('list')
    setSelectedUser(null)
    setConversation([])
    setError('')
  }

  const isOwnMessage = (message) =>
    message.isMine === true ||
    message.isSender === true ||
    message.senderId === getUserId(user) ||
    getUserId(message.sender) === getUserId(user)

  return (
    <div className="min-h-full bg-gray-50 p-3 sm:p-6">
      <div className="mx-auto flex h-full max-w-7xl flex-col gap-5">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h1 className="text-2xl font-black tracking-tight text-[#111827]">
              Messages
            </h1>
            <p className="mt-1 text-sm text-[#6B7280]">
              Stay connected with the people you build with.
            </p>
          </div>
          {unreadCount > 0 && (
            <span className="w-fit rounded-full bg-[#D1FAE5] px-3 py-1 text-xs font-semibold text-[#007A55]">
              {unreadCount} unread {unreadCount === 1 ? 'message' : 'messages'}
            </span>
          )}
        </div>

        <div className="grid min-h-[calc(100vh-180px)] flex-1 overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-sm lg:grid-cols-[minmax(260px,340px)_minmax(0,1fr)]">
          <section
            className={`${view === 'conversation' ? 'hidden lg:flex' : 'flex'} min-h-0 flex-col border-r border-[#E5E7EB]`}
          >
            <div className="border-b border-[#E5E7EB] p-4 sm:p-5">
              <div className="relative">
                <Search
                  size={17}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  placeholder="Search conversations"
                  aria-label="Search conversations"
                  className="w-full rounded-xl border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-3 text-sm text-gray-900 outline-none transition focus:border-[#009966] focus:bg-white"
                />
              </div>
            </div>

            <div className="min-h-0 flex-1 overflow-y-auto">
              {loading ? (
                <MessageSkeleton />
              ) : conversations.length === 0 ? (
                <div className="flex h-full min-h-64 flex-col items-center justify-center px-6 text-center">
                  <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#ECFDF5] text-[#009966]">
                    <MessageSquare size={26} />
                  </div>
                  <h2 className="text-sm font-semibold text-gray-900">
                    {error
                      ? 'Messages unavailable'
                      : searchQuery
                        ? 'No matches found'
                        : 'No conversations yet'}
                  </h2>
                  <p className="mt-1 max-w-xs text-xs leading-5 text-gray-500">
                    {error ||
                      (searchQuery
                        ? 'Try a different name or message.'
                        : 'Your conversations will appear here when you connect with another builder.')}
                  </p>
                </div>
              ) : (
                <div className="divide-y divide-gray-100">
                  {conversations.map((message) => {
                    const otherUser = getOtherUser(message)
                    const id =
                      getUserId(otherUser) ||
                      message.otherUserId ||
                      message.receiverId ||
                      message.senderId ||
                      message.id
                    const active =
                      selectedUser &&
                      getUserId(selectedUser) === getUserId(otherUser)
                    return (
                      <button
                        key={String(id)}
                        type="button"
                        onClick={() => openConversation(message)}
                        className={`flex w-full items-center gap-3 p-4 text-left transition hover:bg-[#F8FAFC] ${active ? 'bg-[#ECFDF5]' : ''}`}
                      >
                        <Avatar user={otherUser} />
                        <span className="min-w-0 flex-1">
                          <span className="flex items-center justify-between gap-2">
                            <span className="truncate text-sm font-semibold text-gray-900">
                              {getUserName(otherUser)}
                            </span>
                            <span className="shrink-0 text-[11px] text-gray-400">
                              {getDateLabel(message.createdAt)}
                            </span>
                          </span>
                          <span className="mt-1 flex items-center justify-between gap-2">
                            <span className="truncate text-xs text-gray-500">
                              {getMessageBody(message) ||
                                'Start a conversation'}
                            </span>
                            {!message.read && (
                              <span
                                className="h-2 w-2 shrink-0 rounded-full bg-[#009966]"
                                aria-label="Unread"
                              />
                            )}
                          </span>
                        </span>
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
          </section>

          <section
            className={`${view === 'conversation' ? 'flex' : 'hidden lg:flex'} min-h-0 flex-col bg-[#F8FAFC]`}
          >
            {selectedUser ? (
              <>
                <header className="flex items-center gap-3 border-b border-[#E5E7EB] bg-white px-4 py-3 sm:px-6">
                  <button
                    type="button"
                    onClick={closeConversation}
                    className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 lg:hidden"
                    aria-label="Back to conversations"
                  >
                    <ArrowLeft size={19} />
                  </button>
                  <Avatar user={selectedUser} size="lg" />
                  <div className="min-w-0 flex-1">
                    <h2 className="truncate text-sm font-bold text-gray-900 sm:text-base">
                      {getUserName(selectedUser)}
                    </h2>
                    <p className="truncate text-xs text-gray-500">
                      {selectedUser.email || 'Conversation'}
                    </p>
                  </div>
                </header>

                <div className="min-h-0 flex-1 overflow-y-auto px-4 py-5 sm:px-8">
                  {conversationLoading ? (
                    <div className="flex h-full items-center justify-center">
                      <div className="h-8 w-8 animate-spin rounded-full border-2 border-[#009966] border-t-transparent" />
                    </div>
                  ) : conversation.length === 0 ? (
                    <div className="flex h-full min-h-64 flex-col items-center justify-center text-center">
                      <div className="mb-3 flex h-14 w-14 items-center justify-center rounded-full bg-white text-[#009966] shadow-sm">
                        <MessageSquare size={25} />
                      </div>
                      <h3 className="text-sm font-semibold text-gray-900">
                        Start the conversation
                      </h3>
                      <p className="mt-1 text-xs text-gray-500">
                        Send a message to {getUserName(selectedUser)}.
                      </p>
                    </div>
                  ) : (
                    <div className="mx-auto flex max-w-3xl flex-col gap-3">
                      {conversation.map((message, index) => {
                        const own = isOwnMessage(message)
                        return (
                          <div
                            key={message.id || `${message.createdAt}-${index}`}
                            className={`flex ${own ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[85%] rounded-2xl px-4 py-3 shadow-sm sm:max-w-[70%] ${own ? 'rounded-br-md bg-[#009966] text-white' : 'rounded-bl-md border border-gray-200 bg-white text-gray-900'}`}
                            >
                              <p className="whitespace-pre-wrap break-words text-sm leading-6">
                                {getMessageBody(message)}
                              </p>
                              <div
                                className={`mt-1 flex items-center justify-end gap-1 text-[10px] ${own ? 'text-emerald-100' : 'text-gray-400'}`}
                              >
                                <span>{getTimestamp(message.createdAt)}</span>
                                {own && <CheckCheck size={12} />}
                              </div>
                            </div>
                          </div>
                        )
                      })}
                      <div ref={messagesEndRef} />
                    </div>
                  )}
                </div>

                <form
                  onSubmit={handleSendMessage}
                  className="border-t border-[#E5E7EB] bg-white p-3 sm:p-4"
                >
                  <div className="mx-auto flex max-w-3xl items-end gap-2 rounded-xl border border-gray-200 bg-gray-50 p-2 focus-within:border-[#009966] focus-within:bg-white">
                    <textarea
                      value={newMessage}
                      onChange={(event) => setNewMessage(event.target.value)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' && !event.shiftKey) {
                          event.preventDefault()
                          event.currentTarget.form?.requestSubmit()
                        }
                      }}
                      placeholder="Write a message..."
                      rows={1}
                      disabled={sending}
                      aria-label="Message"
                      className="max-h-28 min-h-10 flex-1 resize-none bg-transparent px-2 py-2 text-sm text-gray-900 outline-none placeholder:text-gray-400"
                    />
                    <button
                      type="submit"
                      disabled={!newMessage.trim() || sending}
                      className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#009966] text-white transition hover:bg-[#007A55] disabled:cursor-not-allowed disabled:opacity-40"
                      aria-label="Send message"
                    >
                      <Send size={17} />
                    </button>
                  </div>
                  <p className="mx-auto mt-2 max-w-3xl px-2 text-[11px] text-gray-400">
                    Press Enter to send · Shift + Enter for a new line
                  </p>
                </form>
              </>
            ) : (
              <div className="flex h-full min-h-96 flex-col items-center justify-center px-6 text-center">
                <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#ECFDF5] text-[#009966]">
                  <UserRound size={28} />
                </div>
                <h2 className="text-base font-bold text-gray-900">
                  Choose a conversation
                </h2>
                <p className="mt-1 max-w-xs text-sm text-gray-500">
                  Select someone from your inbox to view messages and reply.
                </p>
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  )
}

export default Messages
