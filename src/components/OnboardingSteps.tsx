
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ChevronRight, ChevronLeft } from 'lucide-react';

interface OnboardingStepsProps {
  onComplete: (data: any) => void;
}

const OnboardingSteps = ({ onComplete }: OnboardingStepsProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Basic Info
    gender: '',
    age: '',
    weight: '',
    height: '',
    
    // Health Info
    chronicConditions: [] as string[],
    injuries: [] as string[],
    
    // Training Preferences
    location: '',
    daysPerWeek: 3,
    goals: [] as string[],
    
    // Budget & Food
    budget: 'medium',
    favoriteFoods: [] as string,
  });

  const updateFormData = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    setCurrentStep((prev) => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onComplete(formData);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select 
                    onValueChange={value => updateFormData('gender', value)}
                    value={formData.gender}
                  >
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                      <SelectItem value="prefer-not-to-say">Prefer not to say</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input 
                    id="age"
                    type="number" 
                    placeholder="Enter your age" 
                    value={formData.age} 
                    onChange={e => updateFormData('age', e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="weight">Weight (kg)</Label>
                  <Input 
                    id="weight"
                    type="number" 
                    placeholder="Enter your weight" 
                    value={formData.weight} 
                    onChange={e => updateFormData('weight', e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="height">Height (cm)</Label>
                  <Input 
                    id="height"
                    type="number" 
                    placeholder="Enter your height" 
                    value={formData.height} 
                    onChange={e => updateFormData('height', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        );

      case 2:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Health Information</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Do you have any chronic health conditions?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Diabetes', 'Hypertension', 'Heart Disease', 'Asthma', 'Arthritis', 'None'].map((condition) => (
                    <div key={condition} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`condition-${condition}`} 
                        checked={formData.chronicConditions.includes(condition)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('chronicConditions', [...formData.chronicConditions, condition]);
                          } else {
                            updateFormData('chronicConditions', 
                              formData.chronicConditions.filter(c => c !== condition)
                            );
                          }
                        }}
                      />
                      <label 
                        htmlFor={`condition-${condition}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {condition}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-2">
                <Label>Do you have any injuries or disabilities?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {['Back Pain', 'Knee Injury', 'Shoulder Injury', 'Limited Mobility', 'None'].map((injury) => (
                    <div key={injury} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`injury-${injury}`}
                        checked={formData.injuries.includes(injury)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('injuries', [...formData.injuries, injury]);
                          } else {
                            updateFormData('injuries', 
                              formData.injuries.filter(i => i !== injury)
                            );
                          }
                        }}
                      />
                      <label 
                        htmlFor={`injury-${injury}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {injury}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 3:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Training Preferences</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="location">Where do you prefer to train?</Label>
                <RadioGroup 
                  defaultValue={formData.location} 
                  onValueChange={value => updateFormData('location', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="home" id="home" />
                    <Label htmlFor="home">At Home</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="gym" id="gym" />
                    <Label htmlFor="gym">At the Gym</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="both" id="both" />
                    <Label htmlFor="both">Both Home and Gym</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label>How many days per week do you want to train?</Label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm font-medium">1</span>
                  <Slider
                    defaultValue={[formData.daysPerWeek]}
                    min={1}
                    max={7}
                    step={1}
                    onValueChange={([value]) => updateFormData('daysPerWeek', value)}
                  />
                  <span className="text-sm font-medium">7</span>
                </div>
                <div className="text-center text-sm font-medium mt-2">
                  {formData.daysPerWeek} days
                </div>
              </div>

              <div className="space-y-2">
                <Label>What are your fitness goals?</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {[
                    'Weight Loss', 
                    'Muscle Gain', 
                    'Improve Strength',
                    'Increase Flexibility',
                    'Sports Performance',
                    'General Fitness'
                  ].map((goal) => (
                    <div key={goal} className="flex items-center space-x-2">
                      <Checkbox 
                        id={`goal-${goal}`}
                        checked={formData.goals.includes(goal)}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            updateFormData('goals', [...formData.goals, goal]);
                          } else {
                            updateFormData('goals', 
                              formData.goals.filter(g => g !== goal)
                            );
                          }
                        }}
                      />
                      <label 
                        htmlFor={`goal-${goal}`}
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {goal}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </>
        );

      case 4:
        return (
          <>
            <h2 className="text-2xl font-bold mb-6">Budget & Food Preferences</h2>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="budget">What's your coaching budget?</Label>
                <RadioGroup 
                  defaultValue={formData.budget} 
                  onValueChange={value => updateFormData('budget', value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="low" id="budget-low" />
                    <Label htmlFor="budget-low">Low ($50-100/month)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="budget-medium" />
                    <Label htmlFor="budget-medium">Medium ($100-200/month)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="budget-high" />
                    <Label htmlFor="budget-high">High ($200+/month)</Label>
                  </div>
                </RadioGroup>
              </div>

              <div className="space-y-2">
                <Label htmlFor="favorite-foods">List some of your favorite foods</Label>
                <Input 
                  id="favorite-foods"
                  placeholder="e.g., Chicken, Rice, Broccoli, etc." 
                  value={formData.favoriteFoods.toString()}
                  onChange={e => updateFormData('favoriteFoods', e.target.value.split(','))}
                />
                <p className="text-sm text-gray-500">
                  Separate foods with commas
                </p>
              </div>
            </div>
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Step indicators */}
      <div className="flex items-center justify-center mb-8">
        {[1, 2, 3, 4].map((step) => (
          <React.Fragment key={step}>
            <div 
              className={`h-10 w-10 rounded-full flex items-center justify-center ${
                step === currentStep 
                  ? 'bg-gympal-blue text-white' 
                  : step < currentStep 
                    ? 'bg-gympal-green text-white' 
                    : 'bg-gray-200 text-gray-500'
              }`}
            >
              {step}
            </div>
            {step < 4 && (
              <div 
                className={`h-1 w-16 ${
                  step < currentStep ? 'bg-gympal-green' : 'bg-gray-200'
                }`}
              ></div>
            )}
          </React.Fragment>
        ))}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="bg-white p-6 rounded-lg shadow-md">
          {renderStep()}
          
          <div className="flex justify-between mt-8">
            <Button
              type="button"
              variant="outline"
              onClick={handlePrevious}
              disabled={currentStep === 1}
              className={currentStep === 1 ? 'invisible' : ''}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>
            
            {currentStep < 4 ? (
              <Button type="button" onClick={handleNext}>
                Next
                <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button type="submit">
                Complete
              </Button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
};

export default OnboardingSteps;
