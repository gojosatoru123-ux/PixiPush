const ChatMessage = ({ sender, message, isOwnMessage,time }) => {
    const isSystemMessage = sender === 'system';
    return (
        <div className={`flex ${isSystemMessage ? "justify-center" : isOwnMessage ? "justify-end" : "justify-start"} mb-2`}>
            <div className={`
          relative max-w-xs sm:max-w-md px-3 py-1.5 rounded-lg
          ${isSystemMessage
                    ? "bg-gray-100/80 text-gray-600 text-xs inline-flex items-center gap-1 px-2 py-1 rounded-full"
                    : isOwnMessage
                        ? "bg-gradient-to-r from-blue-500 to-indigo-500 text-white inline-flex items-baseline gap-1"
                        : "bg-white border border-gray-200 text-gray-800 inline-flex items-baseline gap-1"
                }
          ${!isSystemMessage && "shadow-sm"}
        `}>
                {/* System message - single line */}
                {isSystemMessage && (
                    <>
                        <svg className="w-3 h-3 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>{message}</span>
                        <span className="text-gray-400 ml-1 text-xs">
                        {new Date(time).toLocaleString('en-US', {
                                                  hour: '2-digit',
                                                  minute: '2-digit'
                                                })}
                        </span>
                    </>
                )}

                {/* Regular messages - single line */}
                {!isSystemMessage && (
                    <>
                        {!isOwnMessage && (
                            <div className="w-4 h-4 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">
                                {sender.charAt(0).toUpperCase()}
                            </div>
                        )}
                        <div className="flex flex-col items-baseline gap-1">
                            <span className={`text-xs ${isOwnMessage ? "text-white/90" : "text-blue-600"}`}>
                                {isOwnMessage ? "" : `${sender}:`}
                            </span>
                            <div className="flex items-baseline gap-1">
                                <span className="text-sm break-all">{message}</span>
                                <span className={`text-[10px] ${isOwnMessage ? "text-white/70" : "text-gray-500"} ml-1`}>
                                {new Date(time).toLocaleString('en-US', {
                                                  hour: '2-digit',
                                                  minute: '2-digit'
                                                })}
                                </span>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
export default ChatMessage;