
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload, Plus, Minus, X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/components/ui/use-toast';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Form schema for coach profile
const coachProfileSchema = z.object({
  firstName: z.string().min(2, { message: "First name must be at least 2 characters." }),
  lastName: z.string().min(2, { message: "Last name must be at least 2 characters." }),
  bio: z.string().min(50, { message: "Bio should be at least 50 characters." }).max(500, { message: "Bio should not exceed 500 characters." }),
  specialties: z.array(z.string()).min(1, { message: "Select at least one specialty." }),
  experience: z.string().min(1, { message: "Experience is required." }),
  certifications: z.array(z.object({
    name: z.string().min(2, { message: "Certification name is required." }),
    issuer: z.string().min(2, { message: "Issuer name is required." }),
    year: z.string().min(4, { message: "Year is required." }),
  })).min(1, { message: "Add at least one certification." }),
  hourlyRate: z.string().min(1, { message: "Hourly rate is required." }),
  availability: z.object({
    monday: z.boolean(),
    tuesday: z.boolean(),
    wednesday: z.boolean(),
    thursday: z.boolean(),
    friday: z.boolean(),
    saturday: z.boolean(),
    sunday: z.boolean(),
  }),
});

type CoachProfileFormValues = z.infer<typeof coachProfileSchema>;

const CoachSetup = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("basic");

  const specialtyOptions = [
    { id: "weight-loss", label: "Weight Loss" },
    { id: "strength-training", label: "Strength Training" },
    { id: "bodybuilding", label: "Bodybuilding" },
    { id: "functional-fitness", label: "Functional Fitness" },
    { id: "crossfit", label: "CrossFit" },
    { id: "yoga", label: "Yoga" },
    { id: "pilates", label: "Pilates" },
    { id: "sports-specific", label: "Sports Specific" },
    { id: "senior-fitness", label: "Senior Fitness" },
    { id: "rehabilitation", label: "Rehabilitation" },
  ];

  const form = useForm<CoachProfileFormValues>({
    resolver: zodResolver(coachProfileSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      bio: "",
      specialties: [],
      experience: "",
      certifications: [{ name: "", issuer: "", year: "" }],
      hourlyRate: "",
      availability: {
        monday: true,
        tuesday: true,
        wednesday: true,
        thursday: true,
        friday: true,
        saturday: false,
        sunday: false,
      },
    },
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCertification = () => {
    const currentCerts = form.getValues().certifications;
    form.setValue('certifications', [...currentCerts, { name: "", issuer: "", year: "" }]);
  };

  const removeCertification = (index: number) => {
    const currentCerts = form.getValues().certifications;
    if (currentCerts.length > 1) {
      form.setValue('certifications', currentCerts.filter((_, i) => i !== index));
    }
  };

  const handleCompleteSetup = (data: CoachProfileFormValues) => {
    console.log("Coach profile data:", data);
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
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleCompleteSetup)} className="space-y-8">
              <Card>
                <CardHeader>
                  <CardTitle>Coach Profile Setup</CardTitle>
                  <CardDescription>Fill out your profile details to get started as a coach</CardDescription>
                </CardHeader>
                <CardContent>
                  <Tabs defaultValue={activeTab} value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <TabsList className="grid grid-cols-3 mb-8">
                      <TabsTrigger value="basic">Basic Info</TabsTrigger>
                      <TabsTrigger value="professional">Professional</TabsTrigger>
                      <TabsTrigger value="business">Business</TabsTrigger>
                    </TabsList>
                    
                    <TabsContent value="basic">
                      <div className="space-y-6">
                        <div className="flex flex-col items-center justify-center space-y-4">
                          <Avatar className="h-32 w-32">
                            <AvatarImage src={profileImage || undefined} />
                            <AvatarFallback className="text-2xl">
                              {form.watch("firstName")?.[0]}{form.watch("lastName")?.[0] || ""}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex items-center gap-4">
                            <label htmlFor="picture" className="cursor-pointer">
                              <div className="flex items-center gap-2 py-2 px-4 bg-white border rounded-md hover:bg-gray-50">
                                <Upload className="h-4 w-4" />
                                <span>Upload Photo</span>
                              </div>
                              <input
                                id="picture"
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={handleImageUpload}
                              />
                            </label>
                            {profileImage && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                onClick={() => setProfileImage(null)}
                              >
                                <X className="h-4 w-4 mr-1" />
                                Remove
                              </Button>
                            )}
                          </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="First Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Last Name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>

                        <FormField
                          control={form.control}
                          name="bio"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Bio</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Tell clients about yourself, your philosophy, and coaching style" 
                                  className="min-h-32"
                                  {...field} 
                                />
                              </FormControl>
                              <FormDescription>
                                {field.value.length}/500 characters
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="professional">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="specialties"
                          render={() => (
                            <FormItem>
                              <div className="mb-4">
                                <FormLabel>Specialties</FormLabel>
                                <FormDescription>
                                  Select the areas you specialize in
                                </FormDescription>
                              </div>
                              <div className="grid grid-cols-2 gap-2">
                                {specialtyOptions.map((specialty) => (
                                  <FormField
                                    key={specialty.id}
                                    control={form.control}
                                    name="specialties"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={specialty.id}
                                          className="flex items-center space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <Checkbox
                                              checked={field.value?.includes(specialty.id)}
                                              onCheckedChange={(checked) => {
                                                return checked
                                                  ? field.onChange([...field.value, specialty.id])
                                                  : field.onChange(
                                                      field.value?.filter(
                                                        (value) => value !== specialty.id
                                                      )
                                                    )
                                              }}
                                            />
                                          </FormControl>
                                          <FormLabel className="font-normal cursor-pointer">
                                            {specialty.label}
                                          </FormLabel>
                                        </FormItem>
                                      )
                                    }}
                                  />
                                ))}
                              </div>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="experience"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Years of Experience</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Select years of experience" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="1-2">1-2 years</SelectItem>
                                  <SelectItem value="3-5">3-5 years</SelectItem>
                                  <SelectItem value="6-10">6-10 years</SelectItem>
                                  <SelectItem value="10+">10+ years</SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <FormLabel>Certifications</FormLabel>
                            <Button type="button" variant="outline" size="sm" onClick={addCertification}>
                              <Plus className="h-4 w-4 mr-1" />
                              Add
                            </Button>
                          </div>

                          {form.watch("certifications").map((_, index) => (
                            <div key={index} className="grid grid-cols-3 gap-4 items-end mb-4">
                              <FormField
                                control={form.control}
                                name={`certifications.${index}.name`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Certification</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="e.g. CPT" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <FormField
                                control={form.control}
                                name={`certifications.${index}.issuer`}
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Issuing Organization</FormLabel>
                                    <FormControl>
                                      <Input {...field} placeholder="e.g. NASM" />
                                    </FormControl>
                                    <FormMessage />
                                  </FormItem>
                                )}
                              />
                              <div className="flex gap-2">
                                <FormField
                                  control={form.control}
                                  name={`certifications.${index}.year`}
                                  render={({ field }) => (
                                    <FormItem className="flex-1">
                                      <FormLabel>Year</FormLabel>
                                      <FormControl>
                                        <Input {...field} placeholder="e.g. 2021" />
                                      </FormControl>
                                      <FormMessage />
                                    </FormItem>
                                  )}
                                />
                                {index > 0 && (
                                  <Button 
                                    type="button" 
                                    variant="ghost" 
                                    size="icon" 
                                    className="self-end mb-1"
                                    onClick={() => removeCertification(index)}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="business">
                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="hourlyRate"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Hourly Rate ($)</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g. 75" {...field} />
                              </FormControl>
                              <FormDescription>
                                Set your hourly rate for 1-on-1 coaching
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <div>
                          <FormLabel className="mb-4 block">Availability</FormLabel>
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {[
                              { day: "monday", label: "Monday" },
                              { day: "tuesday", label: "Tuesday" },
                              { day: "wednesday", label: "Wednesday" },
                              { day: "thursday", label: "Thursday" },
                              { day: "friday", label: "Friday" },
                              { day: "saturday", label: "Saturday" },
                              { day: "sunday", label: "Sunday" },
                            ].map(({ day, label }) => (
                              <FormField
                                key={day}
                                control={form.control}
                                name={`availability.${day as keyof CoachProfileFormValues["availability"]}`}
                                render={({ field }) => (
                                  <FormItem className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal cursor-pointer">
                                      {label}
                                    </FormLabel>
                                  </FormItem>
                                )}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => {
                      const currentIdx = ["basic", "professional", "business"].indexOf(activeTab);
                      if (currentIdx > 0) {
                        setActiveTab(["basic", "professional", "business"][currentIdx - 1]);
                      }
                    }}
                    disabled={activeTab === "basic"}
                  >
                    Previous
                  </Button>
                  {activeTab !== "business" ? (
                    <Button 
                      type="button"
                      onClick={() => {
                        const currentIdx = ["basic", "professional", "business"].indexOf(activeTab);
                        if (currentIdx < 2) {
                          setActiveTab(["basic", "professional", "business"][currentIdx + 1]);
                        }
                      }}
                    >
                      Next
                    </Button>
                  ) : (
                    <Button type="submit">
                      Complete Setup
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default CoachSetup;
