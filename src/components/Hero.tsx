
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-gray-900 text-white">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ 
            backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')", 
            filter: "brightness(0.4)"
          }}
        />
        <div className="absolute inset-0 hero-gradient opacity-80"></div>
      </div>

      <div className="container-custom relative z-10 py-20 md:py-32 lg:py-40">
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            Find Your Perfect Fitness Coach
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8">
            GYM PAL connects you with certified fitness coaches tailored to your unique goals, health conditions, and preferences. Get personalized workout plans and nutritional guidance to achieve lasting results.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link to="/coaches">
              <Button 
                className="bg-gympal-green hover:bg-gympal-green/90 text-white font-medium py-6 px-8 text-lg"
              >
                Find a Coach
                <ArrowRight className="ml-2" size={20} />
              </Button>
            </Link>
            <Link to="/auth?role=coach">
              <Button 
                variant="outline" 
                className="bg-transparent border-white text-white hover:bg-white/10 font-medium py-6 px-8 text-lg"
              >
                Become a Coach
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
