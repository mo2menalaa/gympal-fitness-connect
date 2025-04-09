
import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import RoleSelector from '@/components/RoleSelector';
import { ArrowLeft } from 'lucide-react';

const Auth = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('signup') === 'true' ? 'signup' : 'signin';
  const initialRole = queryParams.get('role') || 'user';

  const [authType, setAuthType] = useState<'signin' | 'signup'>(initialTab as 'signin' | 'signup');
  const [selectedRole, setSelectedRole] = useState(initialRole);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);
    
    try {
      // Simulate API request
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // For demo, simulate successful auth and redirect based on role
      if (authType === 'signup') {
        if (selectedRole === 'user') {
          navigate('/onboarding');
        } else if (selectedRole === 'coach') {
          navigate('/coach/setup');
        } else if (selectedRole === 'moderator') {
          navigate('/moderator/dashboard');
        }
      } else {
        // Sign in - for demo purposes, redirect based on role
        if (selectedRole === 'user') {
          navigate('/dashboard');
        } else if (selectedRole === 'coach') {
          navigate('/coach/dashboard');
        } else if (selectedRole === 'moderator') {
          navigate('/moderator/dashboard');
        }
      }
    } catch (err) {
      setError('Authentication failed. Please check your credentials and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <div className="container-custom py-8">
        <Link to="/" className="inline-flex items-center text-gympal-blue hover:text-gympal-blue/80 mb-8">
          <ArrowLeft size={16} className="mr-2" />
          Back to Home
        </Link>
        
        <div className="max-w-md mx-auto">
          <div className="text-center mb-6">
            <Link to="/" className="inline-block text-2xl font-bold">
              <span className="text-gympal-green">GYM</span>
              <span className="text-gympal-blue">PAL</span>
            </Link>
          </div>
          
          <Card className="border-none shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl text-center">
                {authType === 'signin' ? 'Welcome Back' : 'Create Your Account'}
              </CardTitle>
              <CardDescription className="text-center">
                {authType === 'signin' 
                  ? 'Sign in to access your account' 
                  : 'Sign up to start your fitness journey'
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs 
                defaultValue={authType} 
                onValueChange={(value) => setAuthType(value as 'signin' | 'signup')}
                className="mb-6"
              >
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="signin">Sign In</TabsTrigger>
                  <TabsTrigger value="signup">Sign Up</TabsTrigger>
                </TabsList>
              </Tabs>

              {error && (
                <Alert variant="destructive" className="mb-6">
                  <AlertDescription>
                    {error}
                  </AlertDescription>
                </Alert>
              )}
              
              <form onSubmit={handleSubmit} className="space-y-4">
                {authType === 'signup' && (
                  <>
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label>I am a:</Label>
                      <RoleSelector 
                        selectedRole={selectedRole} 
                        onRoleSelect={(role) => setSelectedRole(role)} 
                      />
                    </div>
                  </>
                )}
                
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <Label htmlFor="password">Password</Label>
                    {authType === 'signin' && (
                      <Link to="/forgot-password" className="text-sm text-gympal-blue hover:underline">
                        Forgot password?
                      </Link>
                    )}
                  </div>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                
                <Button 
                  type="submit" 
                  className="w-full bg-gympal-blue hover:bg-gympal-blue/90"
                  disabled={isLoading}
                >
                  {isLoading ? 'Processing...' : authType === 'signin' ? 'Sign In' : 'Create Account'}
                </Button>
                
                <div className="relative my-6">
                  <Separator />
                  <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
                    OR
                  </span>
                </div>
                
                <div className="space-y-3">
                  <Button variant="outline" type="button" className="w-full">
                    Continue with Google
                  </Button>
                  <Button variant="outline" type="button" className="w-full">
                    Continue with Apple
                  </Button>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-center">
              <p className="text-sm text-gray-500">
                {authType === 'signin' ? (
                  <>
                    Don't have an account?{' '}
                    <button 
                      type="button" 
                      className="text-gympal-blue hover:underline"
                      onClick={() => setAuthType('signup')}
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button 
                      type="button" 
                      className="text-gympal-blue hover:underline"
                      onClick={() => setAuthType('signin')}
                    >
                      Sign in
                    </button>
                  </>
                )}
              </p>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Auth;
