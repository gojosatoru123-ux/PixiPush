'use client';
import Uploader from "@/components/uploader";
import { ArrowRight, Upload, Shield, Zap, Globe, ZapIcon } from "lucide-react";
import { useEffect, useState } from "react";

const Index = () => {
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

        {/* Hero Content */}
        <div className="relative z-10 py-30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
                  {/* Left Side - Content */}
                  <div className="space-y-8 text-center lg:text-left">
                    {/* Badge */}
                    <div className={`inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                      <Zap className="w-4 h-4" />
                      <span>Lightning Fast & Secure</span>
                    </div>

                    {/* Main Headline */}
                    <div className="space-y-6">
                      <h1 className={`text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 leading-tight transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        Share files <br/>
                        <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                        like magic
                        </span>
                      </h1>
                      <p className={`text-lg sm:text-xl text-slate-600 leading-relaxed max-w-xl mx-auto lg:mx-0 transition-all duration-700 delay-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                        Drop, click, share - it's that simple. Enterprise security meets consumer simplicity.
                      </p>
                    </div>

                    {/* CTA Buttons */}


                    {/* Features */}
                    <div className={`flex flex-wrap justify-center lg:justify-start gap-8 pt-4 transition-all duration-700 delay-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                      <div className="flex items-center space-x-3 text-slate-600 transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                          <Shield className="w-5 h-5 text-green-600" />
                        </div>
                        <span className="font-medium text-lg">Secure</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-600 transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
                          <Globe className="w-5 h-5 text-blue-600" />
                        </div>
                        <span className="font-medium text-lg">Global</span>
                      </div>
                      <div className="flex items-center space-x-3 text-slate-600 transition-all duration-300 hover:scale-105">
                        <div className="w-10 h-10 bg-yellow-100 rounded-xl flex items-center justify-center">
                          <Zap className="w-5 h-5 text-yellow-600" />
                        </div>
                        <span className="font-medium text-lg">Fast</span>
                      </div>
                    </div>
                  </div>

                  {/* Right Side - Uploader */}
                  <div className={`transition-all duration-700 delay-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                    <Uploader />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Index;