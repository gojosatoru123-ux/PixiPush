'use client'

import { useState } from "react";

const ChatForm = ({ onSendMessage, isVisible }) => {
    const [message, setMessage] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() !== '') {
            onSendMessage(message);
            setMessage(''); // Clear the input if the message is empty
        }
    }
    return (
        <>
            <form
                onSubmit={handleSubmit}
                className={`w-full max-w-5xl flex flex-col items-center justify-center bg-white/80 backdrop-blur-lg fixed sm:relative bottom-12 sm:bottom-0 left-0 sm:p-4 sm:rounded-3xl sm:border sm:border-gray-200/50 shadow-xl transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                style={{ transitionDelay: '300ms' }}
            >
                {/* Input group */}
                <div className="relative w-full flex flex-row items-center gap-2 sm:gap-3">
                    {/* Input field */}
                    <div className="relative flex-1 group w-full">
                        <input
                            type="text"
                            onChange={(e) => setMessage(e.target.value)}
                            value={message}
                            placeholder="Type your message..."
                            className="w-full px-4 py-3 sm:px-5 sm:py-4 text-base sm:text-lg bg-gray-50/70 border border-gray-200/60 rounded-xl sm:rounded-2xl focus:outline-none focus:ring-2 sm:focus:ring-4 focus:ring-blue-400/30 transition-all duration-200"
                        />
                        {/* Decorative element - hidden on mobile */}
                        <div className="hidden sm:block absolute -bottom-2 -right-2 w-16 h-16 bg-blue-400/10 rounded-full blur-xl -z-10"></div>
                    </div>

                    {/* Send button - changes size for mobile */}
                    <button
                        type="submit"
                        disabled={!message.trim()}
                        className="w-full hidden sm:block sm:w-auto relative overflow-hidden p-3 sm:p-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-[1.02] sm:hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed group"
                    >
                        <span className="relative z-10 flex items-center justify-center sm:justify-start">
                            <span className="sm:hidden">Send</span>
                            <svg
                                className={`w-5 h-5 sm:w-6 sm:h-6 transition-transform duration-300 ${message.trim() ? 'sm:group-hover:translate-x-1' : ''}`}
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                                />
                            </svg>
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-700 to-indigo-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                    </button>
                </div>

                {/* Background elements - hidden on mobile */}
                <div className="hidden sm:block absolute -bottom-20 -right-20 w-60 h-60 bg-blue-400/10 rounded-full blur-3xl -z-10"></div>
                <div className="hidden sm:block absolute -top-20 -left-20 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl -z-10"></div>
            </form>
        </>
    )
}
export default ChatForm;