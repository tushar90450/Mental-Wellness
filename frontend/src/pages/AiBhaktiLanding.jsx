import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Eye, Palette, Shield, Users, Mail, Twitter, Instagram, Github, Play, ArrowRight, Menu, X } from 'lucide-react';

const AainaLanding = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);

  const testimonials = [
    {
      text: "Aaina helped me see my anxiety as a beautiful storm cloud, not a monster. For the first time, I felt understood.",
      author: "Maya, 19",
      role: "College Student"
    },
    {
      text: "The wisdom engine connected my heartbreak to a Rumi poem. I realized I wasn't alone in this pain.",
      author: "Alex, 22",
      role: "Artist"
    },
    {
      text: "My reflective mosaic shows how far I've come. Each piece of art tells the story of my growth.",
      author: "Sam, 20",
      role: "Writer"
    }
  ];

  useEffect(() => {
    setIsVisible(true);
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    const handleScroll = () => setScrollY(window.scrollY);
    
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 overflow-x-hidden">
      {/* Floating Background Orbs */}
      <div className="fixed inset-0 pointer-events-none">
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-purple-200 to-pink-200 rounded-full opacity-20 animate-float"
          style={{
            left: mousePosition.x * 0.02 + 100,
            top: mousePosition.y * 0.02 + 100,
          }}
        />
        <div 
          className="absolute w-48 h-48 bg-gradient-to-r from-blue-200 to-indigo-200 rounded-full opacity-30 animate-float"
          style={{
            right: mousePosition.x * 0.03 + 150,
            top: mousePosition.y * 0.03 + 200,
            animationDelay: '2s'
          }}
        />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Eye className="w-4 h-4 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              Aaina
            </span>
          </div>
          
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
            <a href="#vision" className="text-gray-600 hover:text-purple-600 transition-colors">Vision</a>
            <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Stories</a>
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Join Waitlist
            </button>
          </div>

          <button 
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="absolute top-full left-0 right-0 bg-white/90 backdrop-blur-md border border-gray-200 rounded-lg mx-6 mt-2 p-6 md:hidden">
            <div className="flex flex-col space-y-4">
              <a href="#features" className="text-gray-600 hover:text-purple-600 transition-colors">Features</a>
              <a href="#vision" className="text-gray-600 hover:text-purple-600 transition-colors">Vision</a>
              <a href="#testimonials" className="text-gray-600 hover:text-purple-600 transition-colors">Stories</a>
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full">
                Join Waitlist
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <div 
            className={`transition-all duration-1000 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
          >
            <div className="inline-flex items-center space-x-2 bg-white/50 backdrop-blur-sm border border-purple-200 rounded-full px-4 py-2 mb-8 animate-pulse">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-700">The Mirror - Your Emotional Reflection</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Your emotions are not a{' '}
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent animate-pulse">
                problem to be solved
              </span>
              <br />
              They are a{' '}
              <span className="bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                masterpiece waiting to be created
              </span>
            </h1>

            <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
              Transform your raw feelings into symbolic art and profound wisdom. 
              Aaina is your AI-powered creative partner for emotional expression.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2 group">
                <span>Start Your Journey</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border-2 border-purple-200 text-purple-600 px-8 py-4 rounded-full hover:bg-purple-50 hover:border-purple-300 transition-all duration-300 flex items-center justify-center space-x-2">
                <Play className="w-4 h-4" />
                <span>Watch Magic</span>
              </button>
            </div>

            {/* Hero Demo */}
            <div className="bg-white/60 backdrop-blur-md border border-purple-200 rounded-2xl p-8 max-w-3xl mx-auto">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Express Your Feelings</h3>
                  <div className="bg-gray-50 rounded-lg p-4 text-left">
                    <p className="text-gray-600 italic">
                      "I feel anxious about my future, like I'm standing at the edge of a cliff..."
                    </p>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-purple-600">
                    <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
                    <span>AI Alchemist processing...</span>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-semibold text-gray-800">Receive Art & Wisdom</h3>
                  <div className="bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg p-6 text-center">
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full mx-auto mb-3 flex items-center justify-center">
                      <Palette className="w-8 h-8 text-white" />
                    </div>
                    <p className="text-sm text-gray-700 italic mb-2">
                      "The tiger is always near, this is true."
                    </p>
                    <p className="text-sm text-gray-700 italic">
                      "But so is the sweetness of this strawberry."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="px-6 py-20 bg-white/30">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Core Features & <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Technology</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Powered by cutting-edge AI and ancient wisdom, creating a unique space for emotional expression
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group bg-white/60 backdrop-blur-md border border-purple-200 rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Palette className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">The Emotional Canvas</h3>
              <p className="text-gray-600 leading-relaxed">
                A zero-judgment zone where you express yourself through text or voice, 
                instantly transformed into symbolic art and poetic mantras.
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-md border border-purple-200 rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Wisdom Engine</h3>
              <p className="text-gray-600 leading-relaxed">
                Using RAG technology, we draw from timeless spiritual and philosophical texts, 
                connecting your struggles to shared human resilience.
              </p>
            </div>

            <div className="group bg-white/60 backdrop-blur-md border border-purple-200 rounded-2xl p-8 hover:shadow-xl hover:scale-105 transition-all duration-300">
              <div className="w-12 h-12 bg-gradient-to-r from-pink-500 to-purple-500 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Eye className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-800">Reflective Mosaic</h3>
              <p className="text-gray-600 leading-relaxed">
                Your private, encrypted gallery becomes a visual timeline of growth, 
                allowing for personal reflection and celebrating your emotional journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section id="vision" className="px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                The Vision: A New <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Language for Emotion</span>
              </h2>
              <p className="text-lg text-gray-600 leading-relaxed mb-8">
                Current mental wellness apps fail young people by being clinical and generic. 
                Aaina offers a revolutionary alternative - not a therapy bot, but an AI-powered 
                creative partner that transforms confusion into clarity through art and wisdom.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                <strong>Expression is the antidote to despair.</strong> We're building a movement 
                to reduce stigma and foster self-compassion by re-contextualizing ancient wisdom 
                for the digital age.
              </p>
            </div>
            
            <div className="space-y-6">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Sparkles className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">A Movement</h3>
                    <p className="text-gray-600">Building a more empathetic and emotionally intelligent world</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Shield className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Privacy-First Technology</h3>
                    <p className="text-gray-600">React, Python, Supabase, and encrypted storage for your safety</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gradient-to-r from-pink-100 to-purple-100 rounded-2xl p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start space-x-4">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-purple-500 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Safe Space</h3>
                    <p className="text-gray-600">A judgment-free environment where your complexity is celebrated</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="px-6 py-20 bg-white/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-16">
            Stories from <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Our Community</span>
          </h2>
          
          <div className="relative bg-white/60 backdrop-blur-md border border-purple-200 rounded-2xl p-12 mb-8">
            <div 
              className="transition-all duration-500 transform"
              style={{
                opacity: 1,
                transform: 'translateY(0px) scale(1)'
              }}
            >
              <p className="text-xl text-gray-700 italic mb-6 leading-relaxed">
                "{testimonials[currentTestimonial].text}"
              </p>
              <div>
                <p className="font-semibold text-gray-800">{testimonials[currentTestimonial].author}</p>
                <p className="text-sm text-gray-600">{testimonials[currentTestimonial].role}</p>
              </div>
            </div>
          </div>
          
          <div className="flex justify-center space-x-3">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentTestimonial 
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 scale-125' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="px-6 py-20 bg-gradient-to-r from-purple-100 via-pink-100 to-indigo-100">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Emotional Journey?</span>
          </h2>
          <p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto">
            Join thousands discovering the beauty in their complexity. Your masterpiece awaits.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-lg">
              Join Waitlist
            </button>
            <button className="border-2 border-purple-300 text-purple-600 px-8 py-4 rounded-full hover:bg-white/50 hover:border-purple-400 transition-all duration-300 text-lg">
              Learn More
            </button>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>Coming Soon</span>
            </div>
            <div className="flex items-center space-x-2">
              <Shield className="w-4 h-4 text-purple-500" />
              <span>Privacy-First</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span>End-to-End Encrypted</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-200 px-6 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                  <Eye className="w-4 h-4 text-white" />
                </div>
                <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Aaina
                </span>
              </div>
              <p className="text-gray-600 mb-4">
                Transforming emotions into art and wisdom. 
                Building a more emotionally intelligent world.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform" aria-label="Twitter">
                  <Twitter className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform" aria-label="Instagram">
                  <Instagram className="w-4 h-4" />
                </a>
                <a href="#" className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center text-white hover:scale-110 transition-transform" aria-label="GitHub">
                  <Github className="w-4 h-4" />
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <a href="#features" className="block text-gray-600 hover:text-purple-600 transition-colors">Features</a>
                <a href="#vision" className="block text-gray-600 hover:text-purple-600 transition-colors">Our Vision</a>
                <a href="#testimonials" className="block text-gray-600 hover:text-purple-600 transition-colors">Community Stories</a>
                <a href="#" className="block text-gray-600 hover:text-purple-600 transition-colors">Privacy Policy</a>
              </div>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Stay Updated</h3>
              <div className="flex space-x-2 mb-4">
                <input 
                  type="email" 
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                />
                <button className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-lg hover:shadow-lg transition-shadow">
                  <Mail className="w-4 h-4" />
                </button>
              </div>
              <p className="text-sm text-gray-500">
                Get notified when we launch and receive emotional wellness tips.
              </p>
            </div>
          </div>
          
          <div className="border-t border-gray-200 mt-8 pt-8 text-center text-sm text-gray-500">
            <p>&copy; 2024 Aaina. Made with ❤️ for emotional wellness.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-10px) rotate(1deg);
          }
          66% {
            transform: translateY(-5px) rotate(-1deg);
          }
        }
        
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default AainaLanding;