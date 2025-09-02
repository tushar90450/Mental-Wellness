import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Sparkles, Heart, Palette, Lock, Users, ArrowRight, Play, Star, Quote, Menu, X, Zap, Eye, Brain, Compass } from 'lucide-react';

const AainaLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const heroRef = useRef(null);

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % 3);
    }, 4000);

    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearInterval(interval);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const testimonials = [
    {
      text: "Aaina ne meri anxiety ko ek beautiful painting ki tarah dikhaya. Pehli baar laga ki main samjha gaya hun.",
      name: "Priya, 19",
      role: "Student"
    },
    {
      text: "Ancient wisdom modern art ke saath - it's pure magic! Meri struggles ko naya meaning mila.",
      name: "Arjun, 22", 
      role: "Designer"
    },
    {
      text: "Finally ek app jo mujhe 'fix' nahi karna chahta. It celebrates my emotional complexity beautifully.",
      name: "Sneha, 20",
      role: "Artist"
    }
  ];

  const features = [
    {
      icon: <Palette className="w-10 h-10" />,
      title: "Emotional Canvas",
      description: "Transform your raw emotions into stunning symbolic art through our AI Alchemist",
      color: "from-pink-500 to-rose-500",
      bgColor: "from-pink-500/20 to-rose-500/20"
    },
    {
      icon: <Brain className="w-10 h-10" />,
      title: "Wisdom Engine", 
      description: "Ancient philosophical texts meet cutting-edge AI for profound emotional insights",
      color: "from-blue-500 to-cyan-500",
      bgColor: "from-blue-500/20 to-cyan-500/20"
    },
    {
      icon: <Eye className="w-10 h-10" />,
      title: "Reflective Mosaic",
      description: "Your private encrypted gallery - a visual timeline of emotional growth and discovery",
      color: "from-purple-500 to-indigo-500", 
      bgColor: "from-purple-500/20 to-indigo-500/20"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white overflow-x-hidden relative">
      {/* CSS Animations */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) translateX(0px) scale(1);
            opacity: 0.4;
          }
          25% {
            transform: translateY(-20px) translateX(10px) scale(1.1);
            opacity: 0.8;
          }
          50% {
            transform: translateY(-10px) translateX(-15px) scale(0.9);
            opacity: 1;
          }
          75% {
            transform: translateY(-30px) translateX(5px) scale(1.05);
            opacity: 0.6;
          }
        }
        .animate-float {
          animation: float 4s ease-in-out infinite;
        }
      `}</style>

      {/* Animated Background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/50 via-pink-900/30 to-indigo-900/50"></div>
        
        {/* Dynamic Gradient Orbs */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
            left: '10%',
            top: '20%'
          }}
        ></div>
        <div 
          className="absolute w-80 h-80 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * -0.03}px, ${mousePosition.y * -0.03}px)`,
            right: '10%',
            top: '40%',
            animationDelay: '1s'
          }}
        ></div>
        <div 
          className="absolute w-72 h-72 bg-gradient-to-r from-yellow-500/25 to-orange-500/25 rounded-full blur-3xl animate-pulse"
          style={{
            transform: `translate(${mousePosition.x * 0.025}px, ${mousePosition.y * 0.025}px)`,
            left: '50%',
            bottom: '20%',
            animationDelay: '2s'
          }}
        ></div>

        {/* Floating Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`
            }}
          />
        ))}
      </div>

      {/* Glassmorphism Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-2xl border-b border-white/10">
        <div className="flex justify-between items-center p-6 lg:px-12">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center transform rotate-12 hover:rotate-0 transition-all duration-500">
                <Sparkles className="w-7 h-7 text-white animate-pulse" />
              </div>
              <div className="absolute -inset-1 bg-gradient-to-br from-pink-500 to-purple-500 rounded-2xl blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
            </div>
            <span className="text-3xl font-black bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
              Aaina
            </span>
          </div>
          
          <div className="hidden md:flex space-x-8">
            {['Features', 'Vision', 'Stories'].map((item) => (
              <a 
                key={item}
                href={`#${item.toLowerCase()}`} 
                className="relative text-white/80 hover:text-white transition-all duration-300 group font-medium"
              >
                {item}
                <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-pink-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </a>
            ))}
          </div>

          <button className="group relative">
            <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full blur opacity-30 group-hover:opacity-60 transition-opacity"></div>
            <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-8 py-3 rounded-full font-bold text-white hover:shadow-2xl hover:scale-105 transition-all duration-300 animate-pulse hover:animate-none">
              Join Waitlist ✨
            </div>
          </button>

          {/* Mobile Menu */}
          <button 
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-2xl border-t border-white/10">
            <div className="px-6 py-4 space-y-4">
              {['Features', 'Vision', 'Stories'].map((item) => (
                <a 
                  key={item}
                  href={`#${item.toLowerCase()}`} 
                  className="block text-white/80 hover:text-white transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative z-40 min-h-screen flex items-center justify-center px-6 lg:px-12 pt-24">
        <div className={`max-w-7xl mx-auto text-center transition-all duration-1500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-20'}`}>
          
          {/* Floating Badge */}
          <div className="mb-8">
            <div className="inline-flex items-center space-x-2 bg-white/5 backdrop-blur-2xl border border-white/20 rounded-full px-6 py-3 text-sm font-medium hover:bg-white/10 transition-all duration-300 group">
              <div className="w-3 h-3 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full animate-pulse"></div>
              <span className="bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                ✨ The Mirror - Your Emotional Reflection
              </span>
              <Zap className="w-4 h-4 text-yellow-400 group-hover:animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-6xl lg:text-8xl font-black mb-8 leading-tight">
            <span className="block text-white mb-4">Your emotions are</span>
            <span className="block text-white mb-4">not a</span>
            <span className="block bg-gradient-to-r from-pink-400 via-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-pulse">
              problem to be solved
            </span>
          </h1>
          
          <div className="relative mb-8">
            <p className="text-2xl lg:text-3xl font-bold text-gray-100 max-w-5xl mx-auto leading-relaxed">
              They are a <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent font-black">masterpiece waiting to be created.</span>
            </p>
            <p className="text-lg lg:text-xl text-gray-300 max-w-4xl mx-auto mt-6 leading-relaxed">
              Transform your deepest feelings into stunning symbolic art and discover ancient wisdom for modern struggles through our revolutionary AI companion.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center mb-16">
            <button className="group relative overflow-hidden">
              <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-40 group-hover:opacity-80 transition-opacity animate-pulse"></div>
              <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-12 py-5 rounded-2xl font-black text-white text-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
                Start Your Journey
                <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
              </div>
            </button>
            
            <button className="group relative overflow-hidden">
              <div className="relative bg-white/10 backdrop-blur-2xl border-2 border-white/20 px-12 py-5 rounded-2xl font-bold text-white text-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-3 w-6 h-6 group-hover:scale-125 transition-transform" />
                Watch Magic ✨
              </div>
            </button>
          </div>

          {/* Hero Demo */}
          <div className="relative max-w-6xl mx-auto">
            <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-8 lg:p-12 border border-white/20 hover:border-white/40 transition-all duration-500 group">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                
                {/* Input Side */}
                <div className="space-y-6">
                  <div className="bg-black/40 backdrop-blur-xl rounded-2xl p-6 border border-gray-600/50 transform group-hover:scale-105 transition-all duration-300">
                    <div className="flex items-center space-x-3 mb-4">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-400 text-sm font-mono ml-4">Your emotions</span>
                    </div>
                    <p className="text-gray-300 text-sm mb-3 font-mono">You shared:</p>
                    <p className="text-white text-lg leading-relaxed">
                      "Main apne future ko lekar bahut anxious hun... sab kuch uncertain lagta hai, kya hoga pata nahi..."
                    </p>
                    <div className="mt-4 flex items-center space-x-2">
                      <div className="w-2 h-2 bg-purple-400 rounded-full animate-ping"></div>
                      <span className="text-purple-400 text-xs font-medium">Processing with AI Alchemist...</span>
                    </div>
                  </div>
                </div>
                
                {/* Output Side */}
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-emerald-500/20 via-blue-500/20 to-purple-500/20 backdrop-blur-xl rounded-2xl p-6 border border-emerald-400/30 transform group-hover:scale-105 group-hover:rotate-1 transition-all duration-300">
                    
                    {/* Generated Art */}
                    <div className="relative w-full h-48 bg-gradient-to-br from-emerald-300 via-teal-400 to-blue-500 rounded-xl mb-6 flex items-center justify-center overflow-hidden group-hover:shadow-2xl transition-all duration-300">
                      <div className="absolute inset-0 bg-black/10"></div>
                      <div className="text-6xl animate-bounce hover:animate-pulse transition-all duration-300">🍓</div>
                      <div className="absolute top-2 right-2">
                        <div className="w-3 h-3 bg-white/60 rounded-full animate-pulse"></div>
                      </div>
                      <div className="absolute bottom-2 left-2 text-white/60 text-xs font-mono">
                        Generated by Wisdom Engine
                      </div>
                    </div>
                    
                    {/* Wisdom Quote */}
                    <div className="text-center">
                      <Quote className="w-6 h-6 text-emerald-400 mx-auto mb-3" />
                      <p className="text-white font-medium text-lg italic leading-relaxed mb-2">
                        "शेर हमेशा पास है, यह सच है।<br/>
                        लेकिन इस स्ट्रॉबेरी की मिठास भी है।"
                      </p>
                      <p className="text-emerald-400 text-sm font-mono">
                        — Zen Wisdom, reimagined for you
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-center space-x-2">
                      <Compass className="w-4 h-4 text-emerald-400 animate-spin" />
                      <span className="text-emerald-400 text-xs font-medium">Ancient wisdom unlocked</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="relative z-40 px-6 lg:px-12 py-32 bg-black/30 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          
          <div className="text-center mb-20">
            <h2 className="text-5xl lg:text-7xl font-black mb-8">
              <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 bg-clip-text text-transparent">
                Alchemy & Wisdom
              </span>
            </h2>
            <p className="text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-medium">
              Expression is the antidote to despair. हमारा AI Alchemist आपकी emotions को art में बदलता है, 
              जबकि Wisdom Engine आपको timeless human insights से जोड़ता है।
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-10">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className={`group relative overflow-hidden bg-gradient-to-br ${feature.bgColor} backdrop-blur-2xl rounded-3xl p-8 border border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 hover:-translate-y-2`}
              >
                
                {/* Background Glow */}
                <div className={`absolute -inset-1 bg-gradient-to-r ${feature.color} rounded-3xl blur opacity-0 group-hover:opacity-20 transition-opacity duration-500`}></div>
                
                <div className="relative z-10">
                  <div className={`inline-flex p-4 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                    <div className="text-white">
                      {feature.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-3xl font-black text-white mb-4 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text transition-all duration-300">
                    {feature.title}
                  </h3>
                  
                  <p className="text-gray-300 text-lg leading-relaxed group-hover:text-gray-200 transition-colors duration-300">
                    {feature.description}
                  </p>

                  <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    <button className="text-white font-semibold flex items-center space-x-2 group/btn">
                      <span>Explore Feature</span>
                      <ArrowRight className="w-4 h-4 group-hover/btn:translate-x-2 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="relative z-40 px-6 lg:px-12 py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <div className="space-y-8">
              <h2 className="text-5xl lg:text-6xl font-black leading-tight">
                A New Language for{' '}
                <span className="bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                  Emotion
                </span>
              </h2>
              
              <div className="space-y-6 text-xl text-gray-300 leading-relaxed">
                <p>
                  Current mental wellness apps fail young people by being <strong className="text-red-400">clinical and generic</strong>, 
                  increasing feelings of isolation.
                </p>
                <p>
                  <strong className="text-white text-2xl">Aaina offers a revolutionary alternative.</strong> 
                  यह therapy bot नहीं है; यह एक AI-powered creative partner है जो आपकी raw, confusing 
                  feelings को symbolic art और profound wisdom में transform करता है।
                </p>
                <p>
                  Using cutting-edge <strong className="text-cyan-400">Retrieval-Augmented Generation (RAG)</strong>, 
                  हम timeless spiritual और philosophical texts से wisdom लाते हैं, connecting your 
                  personal struggle to shared heritage of human resilience.
                </p>
              </div>
              
              <div className="p-8 bg-gradient-to-br from-purple-600/20 via-pink-600/20 to-indigo-600/20 backdrop-blur-xl rounded-3xl border border-purple-400/30 hover:border-purple-400/50 transition-all duration-300 group">
                <Quote className="w-10 h-10 text-purple-400 mb-4 group-hover:scale-110 transition-transform" />
                <p className="text-2xl font-medium text-white italic leading-relaxed">
                  "हम stigma को reduce करने और self-compassion को foster करने के लिए 
                  ancient wisdom को digital age के लिए re-contextualize कर रहे हैं।"
                </p>
              </div>
            </div>

            <div className="space-y-8">
              <div className="bg-gradient-to-br from-blue-600/20 via-cyan-600/20 to-teal-600/20 backdrop-blur-xl rounded-3xl p-8 border border-blue-400/30 hover:border-blue-400/50 hover:scale-105 transition-all duration-300 group">
                <Users className="w-12 h-12 text-blue-400 mb-6 group-hover:animate-bounce" />
                <h3 className="text-2xl font-bold text-white mb-4">Beyond an App</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  एक movement है जो self-compassion और emotional intelligence को foster करती है 
                  हमारी digital world में।
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-green-600/20 via-emerald-600/20 to-teal-600/20 backdrop-blur-xl rounded-3xl p-8 border border-green-400/30 hover:border-green-400/50 hover:scale-105 transition-all duration-300 group">
                <Zap className="w-12 h-12 text-green-400 mb-6 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-4">Cutting-Edge Technology</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  React, Python (FastAPI), Supabase, और advanced AI APIs के साथ built - 
                  seamless experiences के लिए।
                </p>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-600/20 via-orange-600/20 to-red-600/20 backdrop-blur-xl rounded-3xl p-8 border border-yellow-400/30 hover:border-yellow-400/50 hover:scale-105 transition-all duration-300 group">
                <Heart className="w-12 h-12 text-yellow-400 mb-6 group-hover:animate-pulse" />
                <h3 className="text-2xl font-bold text-white mb-4">Zero Judgment Zone</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  आपकी emotional complexity की beauty को explore करने के लिए safe space - 
                  बिना patronizing advice के।
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="stories" className="relative z-40 px-6 lg:px-12 py-32 bg-black/30 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-5xl lg:text-6xl font-black mb-20">
            Stories of{' '}
            <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
              Transformation
            </span>
          </h2>

          <div className="relative h-80">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === currentTestimonial 
                    ? 'opacity-100 translate-y-0 scale-100' 
                    : 'opacity-0 translate-y-8 scale-95'
                }`}
              >
                <div className="bg-white/5 backdrop-blur-2xl rounded-3xl p-12 border border-white/20 hover:border-white/40 transition-all duration-300 group">
                  
                  {/* Stars */}
                  <div className="flex justify-center mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="w-6 h-6 text-yellow-400 fill-current mx-1 group-hover:animate-pulse" 
                        style={{animationDelay: `${i * 0.1}s`}}
                      />
                    ))}
                  </div>
                  
                  <Quote className="w-12 h-12 text-purple-400 mx-auto mb-6 group-hover:scale-110 transition-transform" />
                  
                  <p className="text-2xl font-medium text-white italic leading-relaxed mb-6">
                    "{testimonial.text}"
                  </p>
                  
                  <div className="space-y-2">
                    <p className="text-xl font-bold text-gray-200">— {testimonial.name}</p>
                    <p className="text-purple-400 font-medium">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-12 space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 scale-125' 
                    : 'bg-white/30 hover:bg-white/50'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative z-40 px-6 lg:px-12 py-32">
        <div className="max-w-5xl mx-auto text-center">
          <div className="relative overflow-hidden bg-gradient-to-br from-purple-600/30 via-pink-600/30 to-indigo-600/30 backdrop-blur-2xl rounded-3xl p-16 border border-white/20">
            
            {/* Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-pink-500/10 animate-pulse"></div>
            
            <div className="relative z-10">
              <h2 className="text-5xl lg:text-6xl font-black mb-8">
                Ready to Transform Your{' '}
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Emotions into Art?
                </span>
              </h2>
              
              <p className="text-2xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                हजारों लोगों के साथ join करें जो अपनी emotional complexity की beauty discover कर रहे हैं। 
                Self-compassion और emotional intelligence के movement का हिस्सा बनें।
              </p>
              
              <div className="flex flex-col sm:flex-row gap-8 justify-center mb-8">
                <button className="group relative overflow-hidden">
                  <div className="absolute -inset-2 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-2xl blur opacity-50 group-hover:opacity-80 transition-opacity animate-pulse"></div>
                  <div className="relative bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 px-12 py-5 rounded-2xl font-black text-white text-xl hover:shadow-2xl hover:scale-110 transition-all duration-300 flex items-center justify-center">
                    Join the Waitlist ✨
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-2 transition-transform" />
                  </div>
                </button>
                
                <button className="group relative overflow-hidden">
                  <div className="relative bg-white/10 backdrop-blur-2xl border-2 border-white/30 px-12 py-5 rounded-2xl font-bold text-white text-xl hover:bg-white/20 hover:border-white/50 transition-all duration-300 flex items-center justify-center">
                    Learn More
                    <Sparkles className="ml-3 w-6 h-6 group-hover:animate-spin transition-transform" />
                  </div>
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-8 text-gray-400 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span>Coming Soon</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Lock className="w-4 h-4" />
                  <span>Privacy-First</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Heart className="w-4 h-4" />
                  <span>End-to-End Encrypted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-40 px-6 lg:px-12 py-16 border-t border-white/10 bg-black/30 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            
            {/* Brand */}
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 via-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <span className="text-2xl font-black text-white">Aaina</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your emotions, your masterpiece. एक नई language for emotional expression और ancient wisdom।
              </p>
              
              {/* Social Icons */}
              <div className="flex space-x-4 pt-4">
                <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="w-5 h-5 bg-gradient-to-r from-pink-400 to-purple-400 rounded group-hover:scale-110 transition-transform"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="w-5 h-5 bg-gradient-to-r from-blue-400 to-cyan-400 rounded group-hover:scale-110 transition-transform"></div>
                </div>
                <div className="w-10 h-10 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center hover:bg-white/20 transition-all duration-300 cursor-pointer group">
                  <div className="w-5 h-5 bg-gradient-to-r from-yellow-400 to-orange-400 rounded group-hover:scale-110 transition-transform"></div>
                </div>
              </div>
            </div>
            
            {/* Quick Links */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-4">Quick Links</h4>
              <div className="space-y-3">
                {[
                  { name: 'Features', href: '#features' },
                  { name: 'Vision', href: '#vision' },
                  { name: 'Stories', href: '#stories' },
                  { name: 'Privacy Policy', href: '#' },
                  { name: 'Terms of Service', href: '#' }
                ].map((item) => (
                  <a 
                    key={item.name}
                    href={item.href} 
                    className="block text-gray-400 hover:text-white hover:translate-x-2 transition-all duration-300 group"
                  >
                    <span className="group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-pink-400 group-hover:to-purple-400 group-hover:bg-clip-text transition-all duration-300">
                      {item.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
            
            {/* Contact & Community */}
            <div className="space-y-4">
              <h4 className="text-white font-bold text-lg mb-4">Connect With Us</h4>
              <div className="space-y-3">
                <a href="mailto:hello@aaina.app" className="block text-gray-400 hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Heart className="w-4 h-4 text-white" />
                    </div>
                    <span>hello@aaina.app</span>
                  </div>
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Users className="w-4 h-4 text-white" />
                    </div>
                    <span>Support Center</span>
                  </div>
                </a>
                <a href="#" className="block text-gray-400 hover:text-white transition-colors group">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <span>Community</span>
                  </div>
                </a>
              </div>
              
              {/* Newsletter Signup */}
              <div className="mt-6 p-4 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10">
                <p className="text-white font-medium mb-3">Stay Updated</p>
                <div className="flex space-x-2">
                  <input 
                    type="email" 
                    placeholder="your@email.com" 
                    className="flex-1 bg-white/10 backdrop-blur-xl border border-white/20 rounded-lg px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-purple-400 transition-colors"
                  />
                  <button className="bg-gradient-to-r from-pink-500 to-purple-500 px-4 py-2 rounded-lg hover:shadow-lg hover:scale-105 transition-all duration-300">
                    <ArrowRight className="w-4 h-4 text-white" />
                  </button>
                </div>
              </div>
            </div>
          </div>
          
          {/* Bottom Footer */}
          <div className="pt-8 border-t border-white/10">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-gray-400 text-sm">
                  © 2024 Aaina. Made with ❤️ in India for emotional wellness worldwide.
                </p>
                <p className="text-gray-500 text-xs mt-1">
                  Your feelings matter. आपकी भावनाएं महत्वपूर्ण हैं।
                </p>
              </div>
              
              <div className="flex items-center space-x-4 text-xs text-gray-500">
                <span>🚀 Launching Soon</span>
                <span>•</span>
                <span>🔒 Privacy First</span>
                <span>•</span>
                <span>🎨 AI Powered</span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
      {/* Back to Top Button */}
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className={`fixed bottom-8 right-8 z-50 w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 hover:scale-110 transition-all duration-300 ${
          scrollY > 300 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        <ChevronDown className="w-6 h-6 text-white rotate-180" />
      </button>
    </div>
  );
};

export default AainaLanding;