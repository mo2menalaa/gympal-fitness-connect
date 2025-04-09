
import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

const CoachSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleCompleteSetup = () => {
    toast({
      title: 'Coach Profile Setup Complete!',
      description: 'Your coach profile has been created successfully.',
    });
    
    setTimeout(() => {
      navigate('/coach/dashboard');
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
          <h1 className="text-3xl font-bold text-gray-900">Set Up Your Coach Profile</h1>
          <p className="mt-2 text-gray-600">
            Complete your profile to start accepting clients
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle>Coach Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="mb-4">This demo page would include forms for:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Professional certifications</li>
                <li>Experience and specialties</li>
                <li>Training philosophy</li>
                <li>Pricing and availability</li>
                <li>Profile photo upload</li>
              </ul>
            </CardContent>
          </Card>
          
          <div className="text-center mt-8">
            <Button 
              onClick={handleCompleteSetup}
              className="bg-gympal-blue hover:bg-gympal-blue/90 px-8"
            >
              Complete Setup
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachSetup;
