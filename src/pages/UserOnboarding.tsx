
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import OnboardingSteps from '@/components/OnboardingSteps';

const UserOnboarding = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleOnboardingComplete = (data: any) => {
    // In a real implementation, this would send the data to a server
    console.log('Onboarding data:', data);
    
    toast({
      title: 'Onboarding Complete!',
      description: 'Your profile has been set up successfully.',
    });
    
    // Redirect to coach discovery page
    setTimeout(() => {
      navigate('/coaches');
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="container-custom">
        <Link to="/" className="inline-flex items-center text-gympal-blue hover:text-gympal-blue/80 mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-900">Tell Us About Yourself</h1>
          <p className="mt-2 text-gray-600">
            We'll use this information to find the perfect coach for you
          </p>
        </div>
        
        <OnboardingSteps onComplete={handleOnboardingComplete} />
      </div>
    </div>
  );
};

export default UserOnboarding;
