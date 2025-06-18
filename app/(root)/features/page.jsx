'use client';
import { useEffect, useState } from 'react';
import { Shield, Zap, Globe, Users, Cloud, Lock, Download, Upload, Share2, Smartphone, FileText, Image } from 'lucide-react';
import Link from 'next/link';

const Features = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    setIsVisible(true);
    // Generate particles only on client side
    setParticles(
      Array(8).fill().map(() => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        delay: `${Math.random() * 0.5}s`,
        duration: `${3 + Math.random() * 2}s`
      }))
    );
  }, []);

  const mainFeatures = [
    {
      icon: Upload,
      title: "Drag & Drop Upload",
      description: "Simply drag your files into the browser for instant uploading"
    },
    {
      icon: Share2,
      title: "Instant Sharing",
      description: "Generate shareable links in seconds with customizable permissions"
    },
    {
      icon: Download,
      title: "Fast Downloads",
      description: "Lightning-fast download speeds with resume capability"
    },
    {
      icon: Shield,
      title: "Secure Transfers",
      description: "End-to-end encryption ensures your files stay private"
    },
    {
      icon: Cloud,
      title: "Cloud Storage",
      description: "Store files in the cloud with automatic backup and sync"
    },
    {
      icon: Smartphone,
      title: "Mobile Ready",
      description: "Access and share files from any device, anywhere"
    }
  ];

  const fileTypes = [
    { icon: FileText, name: "Documents", formats: "PDF, DOC, TXT" },
    { icon: Image, name: "Images", formats: "JPG, PNG, SVG" },
    { icon: Globe, name: "Web Files", formats: "HTML, CSS, JS" },
    { icon: Lock, name: "Archives", formats: "ZIP, RAR, 7Z" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-purple-50/20 overflow-hidden">
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/2 -left-40 w-96 h-96 bg-purple-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 right-1/3 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl animate-pulse delay-2000"></div>
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

      {/* Main content */}
      <div className="relative z-10 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            {/* Badge */}
            <div className={`inline-flex items-center space-x-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium mb-8 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
              <Zap className="w-4 h-4" />
              <span>Powerful Features</span>
            </div>

            {/* Main heading */}
            <h1 className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <span className="text-gray-900">Everything you need</span>
              <br />
              <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent animate-gradient-x">
                to share files
              </span>
            </h1>

            {/* Description */}
            <p className={`text-xl md:text-2xl text-gray-600 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              Discover the complete suite of features that make PixiPush the most 
              powerful and user-friendly file sharing platform available today.
            </p>

            {/* Main Features Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto mb-20">
              {mainFeatures.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`group bg-white/60 backdrop-blur-sm rounded-2xl p-8 border border-gray-200/50 hover:bg-white/80 hover:shadow-xl hover:scale-105 transition-all duration-500 hover:-translate-y-2 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}
                  style={{ transitionDelay: `${600 + index * 100}ms` }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* File Types Section */}
            <div className={`mb-16 transition-all duration-1000 delay-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Support for All File Types
              </h2>
              <p className="text-lg text-gray-600 mb-12 max-w-2xl mx-auto">
                Share any file format with confidence. Our platform supports all major file types.
              </p>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-4xl mx-auto">
                {fileTypes.map((type, index) => (
                  <div
                    key={type.name}
                    className={`bg-white/60 backdrop-blur-sm rounded-xl p-6 border border-gray-200/50 hover:bg-white/80 hover:shadow-lg transition-all duration-300 hover:scale-105 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
                    style={{ transitionDelay: `${1200 + index * 100}ms` }}
                  >
                    <type.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                    <h4 className="text-lg font-semibold text-gray-900 mb-2">
                      {type.name}
                    </h4>
                    <p className="text-sm text-gray-500">
                      {type.formats}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Section */}
            <div className={`bg-white/60 backdrop-blur-sm rounded-3xl p-12 border border-gray-200/50 max-w-4xl mx-auto transition-all duration-1000 delay-1400 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-gray-600 mb-8">
                Join thousands of users who trust PixiPush for their file sharing needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/" className="inline-flex items-center justify-center gap-2 h-12 px-8 py-4 text-lg font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  Start Sharing Now
                </Link>
                <Link href="/about" className="inline-flex items-center justify-center gap-2 h-12 px-8 py-4 text-lg font-medium text-gray-700 bg-white hover:bg-gray-50 border-2 border-gray-200 rounded-xl transition-all duration-300 hover:scale-105">
                  Learn More
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;