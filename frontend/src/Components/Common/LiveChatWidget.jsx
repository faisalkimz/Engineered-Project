import React, { useState, useRef, useEffect } from 'react'

export default function LiveChatWidget() {
    const [isOpen, setIsOpen] = useState(false)
    const [messages, setMessages] = useState([
        { id: 1, text: "Hi there! 👋 Welcome to TechMart.", sender: 'agent', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) },
        { id: 2, text: "How can I help you today?", sender: 'agent', time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) }
    ])
    const [inputText, setInputText] = useState('')
    const [isTyping, setIsTyping] = useState(false)
    const messagesEndRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }

    useEffect(() => {
        scrollToBottom()
    }, [messages, isOpen])

    const handleSendMessage = (e) => {
        e.preventDefault()
        if (!inputText.trim()) return

        // Add user message
        const newMessage = {
            id: messages.length + 1,
            text: inputText,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
        setMessages(prev => [...prev, newMessage])
        setInputText('')
        setIsTyping(true)

        // Simulate agent response
        setTimeout(() => {
            const responses = [
                "Thanks for reaching out! One of our agents will be with you shortly.",
                "I can definitely help with that. Could you provide more details?",
                "That's a great choice! Is there anything specific you'd like to know about it?",
                "Let me check that for you right away."
            ]
            const randomResponse = responses[Math.floor(Math.random() * responses.length)]

            setMessages(prev => [...prev, {
                id: prev.length + 1,
                text: randomResponse,
                sender: 'agent',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }])
            setIsTyping(false)
        }, 1500)
    }

    return (
        <div className={`live-chat-widget ${isOpen ? 'open' : ''}`}>
            {/* Toggle Button */}
            <button
                className="chat-toggle-btn"
                onClick={() => setIsOpen(!isOpen)}
                aria-label="Toggle chat"
            >
                {isOpen ? (
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                ) : (
                    <div className="chat-icon-wrapper">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="online-status"></span>
                    </div>
                )}
            </button>

            {/* Chat Window */}
            {isOpen && (
                <div className="chat-window animate-slideUp">
                    <div className="chat-header">
                        <div className="agent-info">
                            <div className="agent-avatar">
                                <img src="https://ui-avatars.com/api/?name=Support+Agent&background=fff&color=f68b1e" alt="Agent" />
                                <span className="status-dot"></span>
                            </div>
                            <div>
                                <h3>TechMart Support</h3>
                                <span className="status-text">We typically reply in a few minutes</span>
                            </div>
                        </div>
                    </div>

                    <div className="chat-messages">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`message ${msg.sender}`}>
                                <div className="message-content">
                                    <p>{msg.text}</p>
                                    <span className="message-time">{msg.time}</span>
                                </div>
                            </div>
                        ))}
                        {isTyping && (
                            <div className="message agent typing">
                                <div className="typing-indicator">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>

                    <form onSubmit={handleSendMessage} className="chat-input-area">
                        <input
                            type="text"
                            placeholder="Type a message..."
                            value={inputText}
                            onChange={(e) => setInputText(e.target.value)}
                        />
                        <button type="submit" disabled={!inputText.trim()}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </form>
                </div>
            )}

            <style jsx="true">{`
                .live-chat-widget {
                    position: fixed;
                    bottom: 24px;
                    right: 84px; /* Positioned to the left of BackToTop */
                    z-index: 1000;
                }

                .chat-toggle-btn {
                    width: 56px;
                    height: 56px;
                    border-radius: 50%;
                    background: var(--primary);
                    color: white;
                    border: none;
                    box-shadow: var(--shadow-lg);
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all var(--transition-base);
                }

                .chat-toggle-btn:hover {
                    transform: scale(1.05);
                    box-shadow: var(--shadow-xl);
                }

                .chat-icon-wrapper {
                    position: relative;
                }

                .online-status {
                    position: absolute;
                    top: -2px;
                    right: -2px;
                    width: 10px;
                    height: 10px;
                    background: #22c55e;
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                }

                .chat-window {
                    position: absolute;
                    bottom: 70px;
                    right: 0;
                    width: 350px;
                    height: 500px;
                    background: white;
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-2xl);
                    display: flex;
                    flex-direction: column;
                    overflow: hidden;
                    border: 1px solid var(--border-light);
                }

                .chat-header {
                    background: var(--primary);
                    color: white;
                    padding: var(--spacing-md);
                }

                .agent-info {
                    display: flex;
                    align-items: center;
                    gap: var(--spacing-md);
                }

                .agent-avatar {
                    position: relative;
                    width: 40px;
                    height: 40px;
                }

                .agent-avatar img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 2px solid white;
                }

                .status-dot {
                    position: absolute;
                    bottom: 0;
                    right: 0;
                    width: 10px;
                    height: 10px;
                    background: #22c55e;
                    border: 2px solid var(--primary);
                    border-radius: 50%;
                }

                .agent-info h3 {
                    font-size: var(--font-size-base);
                    font-weight: 600;
                    margin: 0;
                }

                .status-text {
                    font-size: var(--font-size-xs);
                    opacity: 0.9;
                }

                .chat-messages {
                    flex: 1;
                    padding: var(--spacing-md);
                    overflow-y: auto;
                    display: flex;
                    flex-direction: column;
                    gap: var(--spacing-md);
                    background: var(--bg-primary);
                }

                .message {
                    display: flex;
                    flex-direction: column;
                    max-width: 80%;
                }

                .message.agent {
                    align-self: flex-start;
                }

                .message.user {
                    align-self: flex-end;
                }

                .message-content {
                    padding: var(--spacing-sm) var(--spacing-md);
                    border-radius: var(--radius-lg);
                    position: relative;
                }

                .message.agent .message-content {
                    background: white;
                    border-bottom-left-radius: 4px;
                    box-shadow: var(--shadow-sm);
                }

                .message.user .message-content {
                    background: var(--primary);
                    color: white;
                    border-bottom-right-radius: 4px;
                    box-shadow: var(--shadow-sm);
                }

                .message p {
                    margin: 0;
                    line-height: 1.4;
                }

                .message-time {
                    font-size: 10px;
                    opacity: 0.7;
                    margin-top: 4px;
                    display: block;
                    text-align: right;
                }

                .chat-input-area {
                    padding: var(--spacing-md);
                    background: white;
                    border-top: 1px solid var(--border-light);
                    display: flex;
                    gap: var(--spacing-sm);
                }

                .chat-input-area input {
                    flex: 1;
                    border: 1px solid var(--border-light);
                    border-radius: var(--radius-full);
                    padding: 8px 16px;
                    outline: none;
                    transition: border-color 0.2s;
                }

                .chat-input-area input:focus {
                    border-color: var(--primary);
                }

                .chat-input-area button {
                    background: var(--primary);
                    color: white;
                    border: none;
                    width: 36px;
                    height: 36px;
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: transform 0.2s;
                }

                .chat-input-area button:hover:not(:disabled) {
                    transform: scale(1.1);
                }

                .chat-input-area button:disabled {
                    background: var(--text-muted);
                    cursor: not-allowed;
                }

                .typing-indicator {
                    display: flex;
                    gap: 4px;
                    padding: 8px 12px;
                    background: white;
                    border-radius: var(--radius-lg);
                    border-bottom-left-radius: 4px;
                    width: fit-content;
                }

                .typing-indicator span {
                    width: 6px;
                    height: 6px;
                    background: var(--text-muted);
                    border-radius: 50%;
                    animation: bounce 1.4s infinite ease-in-out both;
                }

                .typing-indicator span:nth-child(1) { animation-delay: -0.32s; }
                .typing-indicator span:nth-child(2) { animation-delay: -0.16s; }

                @keyframes bounce {
                    0%, 80%, 100% { transform: scale(0); }
                    40% { transform: scale(1); }
                }

                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(20px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                .animate-slideUp {
                    animation: slideUp 0.3s ease-out forwards;
                }

                @media (max-width: 480px) {
                    .chat-window {
                        width: calc(100vw - 32px);
                        right: -70px; /* Adjust for button position */
                        bottom: 80px;
                        height: 60vh;
                    }
                }
            `}</style>
        </div>
    )
}
