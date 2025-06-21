'use client';
import ChatForm from "@/components/chatForm";
import ChatMessage from "@/components/chatMessage";
import EnterRoom from "@/components/enterRoom";
import { socket } from "@/lib/socketClient";
import { ArrowRight, Sparkles } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import ShortUniqueId from "short-unique-id";

const ChatPage = () => {
    const [message, setMessage] = useState([]);
    const [room, setRoom] = useState(null);
    const [userName, setUserName] = useState(null);
    const [joined, setJoined] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState([]);
    const messagesEndRef = useRef(null);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [message]); // Dependency on the message array

    useEffect(() => {
        setIsVisible(true);
        // Generate particles only on client side
        setParticles(
            Array(6).fill().map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.5}s`,
                duration: `${3 + Math.random() * 2}s`
            }))
        );
    }, []);
    const handleSendMessage = (message) => {
        // Logic to handle sending the message
        const data = { room, message, sender: userName, time: new Date().toISOString() };
        setMessage((prevMessages) => [...prevMessages, { sender: userName, message, time: new Date().toISOString() }]);
        socket.emit('message', data);
    };
    useEffect(() => {
        socket.on('message', (data) => {
            setMessage((prevMessages) => [...prevMessages, data])
        });

        socket.on('user_joined', (message) => {
            setMessage((prevMessages) => [...prevMessages, { sender: 'system', message, time: new Date().toISOString() }]);
        });

        socket.on('user_left', (message) => {
            setMessage((prevMessages) => [...prevMessages, { sender: 'system', message, time: new Date().toISOString() }]);
        });

        // this return statement is triggered whenever the component is unmounted or dependencies change
        return () => {
            socket.emit('leave-room');
            socket.off('user_joined');
            socket.off('message');

        }
    }, [])
    const handleJoinRoom = () => {
        if (userName && room) {
            socket.emit('join-room', { room, userName: userName });
            setJoined(true);
        }
    }
    return (
        <>

            {!joined ? <>
                <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden sm:py-10 ">

                    {/* Animated background elements */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    </div>

                    {/* Floating particles - now client-side only */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((particle, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    animationDelay: particle.delay,
                                    animationDuration: particle.duration
                                }}
                            />
                        ))}
                    </div>

                    {/* <EnterRoom/> */}
                    <div className="flex flex-col items-center justify-center">
                        <div className="text-center">
                            <div className={`inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <Sparkles className="w-4 h-4" />
                                <span>Chat and Connect</span>
                            </div>
                            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <span className="text-gray-900">Connect with your</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                                    Team or Friends
                                </span>
                            </h1>
                        </div>
                        <form
                            onSubmit={handleJoinRoom}
                            className={`flex flex-col items-center justify-center bg-white/60 backdrop-blur-sm p-8 sm:p-10 rounded-2xl border border-gray-200/50 shadow-lg transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                            style={{ transitionDelay: '300ms' }}
                        >
                            <div className="space-y-6 w-full max-w-xs">
                                {/* Header with icon */}
                                <div className="text-center space-y-2">
                                    <div className="inline-flex items-center justify-center w-14 h-14 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mb-4">
                                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                                        </svg>
                                    </div>
                                    <h1 className="text-3xl font-bold text-gray-900">Enter Room</h1>
                                </div>

                                {/* Input fields */}
                                <div className="space-y-4">
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Your Name"
                                            className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300"
                                            onChange={(e) => setUserName(e.target.value + " " + (new ShortUniqueId({ length: 4 }).rnd()))}
                                        />
                                    </div>

                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="Room ID"
                                            className="w-full px-4 py-3 bg-gray-50/80 border border-gray-200/50 rounded-lg focus:ring-2 focus:ring-blue-400 focus:border-transparent outline-none transition-all duration-300"
                                            onChange={(e) => setRoom(e.target.value)}
                                        />
                                    </div>
                                </div>

                                {/* Submit button */}
                                <button
                                    type="submit"
                                    className=" cursor-pointer w-full flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                                >
                                    Join Room
                                    <ArrowRight className="ml-2 w-5 h-5" />
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                </>
                :
                <>
                <div className="flex flex-col items-center justify-center">
                     {/* Animated background elements */}
                     <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                    </div>

                    {/* Floating particles - now client-side only */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        {particles.map((particle, i) => (
                            <div
                                key={i}
                                className="absolute w-2 h-2 bg-blue-400/20 rounded-full animate-bounce"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    animationDelay: particle.delay,
                                    animationDuration: particle.duration
                                }}
                            />
                        ))}
                    </div>

                    <span className="p-4 text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                        Room-{room}
                    </span>

                    <div className="sm:h-[400px] overflow-y-auto p-4 w-full max-w-5xl sm:bg-white/80 sm:backdrop-blur-lg sm:border sm:border-gray-200/50 sm:shadow-xl sm:rounded-3xl mb-20 sm:mb-0">
                        <div className="h-full flex flex-col chat-scrollbar">
                            {/* Messages container */}
                            <div className="flex-1 space-y-3 sm:space-y-4 pr-2">
                                {message.map((msg, index) => (
                                    <ChatMessage
                                        key={index}
                                        sender={msg.sender}
                                        message={msg.message}
                                        isOwnMessage={msg.sender === userName}
                                        time={msg.time}
                                        className="max-w-[90%] xs:max-w-xs sm:max-w-md" // Responsive max-width
                                    />
                                ))}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Empty state */}
                            {message.length === 0 && (
                                <div className="h-full flex flex-col items-center justify-center text-center p-4 sm:p-8">
                                    <div className="w-16 h-16 sm:w-20 sm:h-20 bg-blue-100/50 rounded-2xl flex items-center justify-center mb-3 sm:mb-4">
                                        <svg className="w-8 h-8 sm:w-10 sm:h-10 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg sm:text-xl font-semibold text-gray-700 mb-1 sm:mb-2">No messages yet</h3>
                                    <p className="text-sm sm:text-base text-gray-500 max-w-xs sm:max-w-md">Start the conversation!</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <ChatForm onSendMessage={handleSendMessage} isVisible={isVisible} />
                </div>
                </>}

        </>
    )
}
export default ChatPage;