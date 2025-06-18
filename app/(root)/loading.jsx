'use client';
import { useEffect, useState } from 'react';
const Loading = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState([]);

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
    return (
        <>
            <div className="bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20  overflow-hidden">

                {/* Animated background elements */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className={`absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl transition-all duration-1000 delay-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                    <div className={`absolute bottom-20 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100' : 'opacity-0'}`}></div>
                </div>

                {/* Floating particles - now client-side only */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {particles.map((particle, i) => (
                        <div
                            key={i}
                            className={`absolute w-2 h-2 bg-blue-400/20 rounded-full transition-all duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
                            style={{
                                left: particle.left,
                                top: particle.top,
                                animationDelay: particle.delay,
                                animationDuration: particle.duration
                            }}
                        />
                    ))}
                </div>
                <div className="relative z-10 py-30">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">

                            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-blue-500" role="status">
                                <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span                    >
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Loading;