'use client';
import { useEffect, useState } from 'react';
import { Zap, Copy, Check, Clock } from 'lucide-react';
import QrCodeGenerator from '@/components/qrcodeGenerator';

const Previous = () => {
    const [isVisible, setIsVisible] = useState(false);
    const [particles, setParticles] = useState([]);
    const [previousShares, setPreviousShares] = useState([]);
    const [copiedIndex, setCopiedIndex] = useState(null);

    useEffect(() => {
        setIsVisible(true);
        // Access localStorage only on client side
        const data=JSON.parse(localStorage.getItem('blobUrls') || null)
        const storedShares = data && data.filter(blob => {
            const validTillDate = new Date(blob.validTill);
            const currentDate = new Date();
            return validTillDate > currentDate;
          });
        localStorage.setItem('blobUrls',JSON.stringify(storedShares));
        setPreviousShares(storedShares);

        setParticles(
            Array(8).fill().map(() => ({
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                delay: `${Math.random() * 0.5}s`,
                duration: `${3 + Math.random() * 2}s`
            }))
        );
    }, []);

    const handleCopy = (url, index) => {
        navigator.clipboard.writeText(url);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <>
            <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
                    <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                    <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
                </div>

                {/* Floating particles */}
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

                {/* Previous Shares Grid */}
                <div className="relative z-10 pb-16">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            {/* Badge */}
                            <div className={`inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                                <Zap className="w-4 h-4" />
                                <span>Previous Shares</span>
                            </div>

                            {/* Main heading */}
                            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                <span className="text-gray-900">Your Previous</span>
                                <br />
                                <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                                    File Shares
                                </span>
                            </h1>

                            {/* Description */}
                            <p className={`text-lg sm:text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                Access and manage all your previously shared files in one convenient location.
                                Copy links or scan QR codes to quickly reshare your content.
                            </p>

                            {/* Previous Shares Grid */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-20">
                                {previousShares && previousShares.length > 0 ? (
                                    previousShares.map((blob, index) => (
                                        <div
                                        key={index}
                                        className={`
                                          group relative bg-white/60 backdrop-blur-sm rounded-2xl p-6 sm:p-8 border border-gray-200/50
                                          hover:bg-white/80 hover:shadow-lg transition-all duration-500 ease-[cubic-bezier(0.25,0.1,0.25,1)]
                                          ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}
                                          overflow-hidden
                                        `}
                                        style={{
                                          transitionDelay: `${index * 100}ms`,
                                          willChange: 'transform, opacity',
                                          transformStyle: 'preserve-3d'
                                        }}
                                      >
                                        {/* Glow effect on hover */}
                                        <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                          <div className="absolute -inset-2 bg-gradient-to-r from-blue-100/50 to-purple-100/50 blur-sm"></div>
                                        </div>
                                      
                                        <div className="relative z-10">
                                          {/* QR Code Section */}
                                          <div className="text-center mb-6 transition-transform duration-500 group-hover:scale-[1.03]">
                                            <QrCodeGenerator 
                                              url={blob.url} 
                                              size={128} 
                                              level="H" 
                                              className="transition-all duration-300 group-hover:drop-shadow-md"
                                            />
                                          </div>
                                      
                                          {/* URL Copy Section */}
                                          <div className="relative flex flex-col sm:flex-row items-stretch bg-gray-50/80 backdrop-blur-sm border border-gray-200/50 rounded-lg shadow-inner overflow-hidden transition-all duration-300 group-hover:shadow-md">
                                            <input
                                              type="text"
                                              value={blob.url || ''}
                                              readOnly
                                              className="flex-grow px-4 py-3 text-sm text-gray-800 bg-transparent outline-none focus:ring-0 truncate min-w-0 transition-all duration-300 group-hover:bg-gray-50"
                                            />
                                            <button
                                              onClick={() => handleCopy(blob.url, index)}
                                              className="flex-shrink-0 px-4 py-3 bg-gradient-to-br from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-400/50 focus:ring-offset-2 transition-all duration-300 hover:shadow-inner flex items-center justify-center gap-2 min-w-0 active:scale-95"
                                            >
                                              {copiedIndex === index ? (
                                                <>
                                                  <Check className="h-4 w-4 text-green-300 transition-all duration-300" />
                                                  <span className="hidden sm:inline">Copied!</span>
                                                </>
                                              ) : (
                                                <>
                                                  <Copy className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                                                  <span className="hidden sm:inline transition-all duration-300 group-hover:translate-x-0.5">Copy</span>
                                                </>
                                              )}
                                            </button>
                                          </div>
                                      
                                          {/* Metadata Section */}
                                          <div className="mt-4 space-y-2 transition-all duration-500 group-hover:translate-y-1">
                                            <p className="text-gray-800 font-medium truncate">{blob.name}</p>
                                            <p className="text-sm text-gray-500 flex items-center gap-1.5">
                                              <Clock className="h-4 w-4 text-gray-400" />
                                              <span>
                                                Valid till: {new Date(blob.validTill).toLocaleString('en-US', {
                                                  year: 'numeric',
                                                  month: 'short',
                                                  day: 'numeric',
                                                  hour: '2-digit',
                                                  minute: '2-digit'
                                                })}
                                              </span>
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))
                                ) : (
                                    <div className={`col-span-full bg-white/60 backdrop-blur-sm rounded-2xl p-12 sm:p-16 border border-gray-200/50 transition-all duration-1000 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                                        <div className="text-center">
                                            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto">
                                                <Zap className="w-8 h-8 text-white" />
                                            </div>
                                            <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                                                No Previous Shares
                                            </h3>
                                            <p className="text-gray-600 text-base sm:text-lg mb-8">
                                                You haven't shared any files yet. Start sharing to see your history here.
                                            </p>
                                            <a
                                                href="/"
                                                className="inline-flex items-center justify-center gap-2 h-12 px-6 sm:px-8 py-4 text-base sm:text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                                            >
                                                Start Sharing
                                            </a>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Previous;