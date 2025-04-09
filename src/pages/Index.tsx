
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Hero from '@/components/Hero';
import FeatureCard from '@/components/FeatureCard';
import CoachCard from '@/components/CoachCard';
import { 
  Target, 
  Users, 
  MessageSquare, 
  LineChart, 
  Utensils, 
  Award, 
  ChevronRight
} from 'lucide-react';

// Mock data for featured coaches
const featuredCoaches = [
  {
    id: '1',
    name: 'Sarah Johnson',
    specialty: ['Competition Prep', 'Strength Training', 'Nutrition'],
    rating: 4.9,
    reviews: 87,
    price: '$120',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    experience: '8 Years'
  },
  {
    id: '2',
    name: 'Mike Reynolds',
    specialty: ['Elderly Training', 'Rehabilitation', 'Low Impact'],
    rating: 4.7,
    reviews: 62,
    price: '$90',
    image: 'https://images.unsplash.com/photo-1567013127542-490d757e51fc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
    experience: '15 Years'
  },
  {
    id: '3',
    name: 'Elena Martinez',
    specialty: ['Women-Focused', 'Weight Loss', 'HIIT'],
    rating: 4.8,
    reviews: 103,
    price: '$110',
    image: 'https://images.unsplash.com/photo-1571019613576-2b22c76fd955?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    experience: '6 Years'
  }
];

// Features data
const features = [
  {
    icon: Target,
    title: 'Personalized Matching',
    description: 'Get matched with coaches based on your goals, health conditions, and preferences.'
  },
  {
    icon: Users,
    title: 'Expert Coaches',
    description: 'All coaches are certified professionals with verified credentials and experience.'
  },
  {
    icon: MessageSquare,
    title: '24/7 AI Support',
    description: 'Get instant help and guidance with our AI assistant when your coach is unavailable.'
  },
  {
    icon: LineChart,
    title: 'Progress Tracking',
    description: 'Monitor your fitness journey with detailed tracking and visual progress reports.'
  },
  {
    icon: Utensils,
    title: 'Smart Meal Plans',
    description: 'Receive customized meal plans with smart food substitution options.'
  },
  {
    icon: Award,
    title: 'Guaranteed Results',
    description: 'Our coaches are committed to helping you achieve your fitness goals.'
  }
];

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <Hero />
        
        {/* Features Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">How GYM PAL Works</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Our platform connects you with professional fitness coaches to create personalized workout and nutrition plans tailored to your specific needs.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <FeatureCard 
                  key={index} 
                  icon={feature.icon} 
                  title={feature.title} 
                  description={feature.description} 
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* Coach Categories Section */}
        <section className="py-20 bg-gray-50">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">Coach Categories</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Find specialized coaches for your specific fitness needs and goals.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              {[
                {
                  name: 'Competition Prep',
                  image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  link: '/coaches/competition-prep'
                },
                {
                  name: 'Disabled Support',
                  image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  link: '/coaches/disabled-support'
                },
                {
                  name: 'Women-Focused',
                  image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  link: '/coaches/women-focused'
                },
                {
                  name: 'Elderly Training',
                  image: 'https://images.unsplash.com/photo-1556889882-73ea40694a98?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
                  link: '/coaches/elderly-training'
                },
                {
                  name: 'General Fitness',
                  image: 'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                  link: '/coaches/general-fitness'
                }
              ].map((category, index) => (
                <Link 
                  key={index} 
                  to={category.link}
                  className="group relative overflow-hidden rounded-lg shadow-md h-48 md:h-64"
                >
                  <div 
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                    style={{ backgroundImage: `url(${category.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 w-full">
                    <h3 className="text-white font-bold text-lg">{category.name}</h3>
                    <div className="flex items-center text-white/80 text-sm mt-1 group-hover:text-gympal-green transition-colors">
                      <span>View Coaches</span>
                      <ChevronRight size={16} className="ml-1" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
        
        {/* Featured Coaches Section */}
        <section className="py-20 bg-white">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-2">Featured Coaches</h2>
                <p className="text-gray-600">
                  Meet our top-rated fitness professionals
                </p>
              </div>
              <Link to="/coaches" className="mt-4 md:mt-0">
                <Button variant="outline" className="flex items-center">
                  View All Coaches
                  <ChevronRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCoaches.map((coach) => (
                <CoachCard
                  key={coach.id}
                  id={coach.id}
                  name={coach.name}
                  specialty={coach.specialty}
                  rating={coach.rating}
                  reviews={coach.reviews}
                  price={coach.price}
                  image={coach.image}
                  experience={coach.experience}
                />
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-20 bg-gympal-blue text-white">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                Ready to Transform Your Fitness Journey?
              </h2>
              <p className="text-xl opacity-90 mb-8">
                Join thousands of users who have found their perfect fitness coach on GYM PAL and started achieving their fitness goals.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link to="/auth">
                  <Button className="bg-white text-gympal-blue hover:bg-gray-100 font-medium py-6 px-8 text-lg">
                    Get Started Now
                  </Button>
                </Link>
                <Link to="/coaches">
                  <Button variant="outline" className="border-white text-white hover:bg-white/10 font-medium py-6 px-8 text-lg">
                    Browse Coaches
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
