
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { createClient } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

const supabase = createClient();

const Navbar = () => {
  const [session, setSession] = useState<any>(null);
  const [userRole, setUserRole] = useState<string>('user');
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check current session
    const getSession = async () => {
      const { data } = await supabase.auth.getSession();
      setSession(data.session);
      
      if (data.session?.user) {
        // Get user role
        const { data: profileData } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.session.user.id)
          .single();
          
        if (profileData) {
          setUserRole(profileData.role);
        }
      }
    };

    getSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      
      if (session?.user) {
        // Get updated user role when auth state changes
        setTimeout(async () => {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', session.user.id)
            .single();
            
          if (profileData) {
            setUserRole(profileData.role);
          }
        }, 0);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    toast({
      title: "Signed out",
      description: "You have been successfully signed out.",
    });
    navigate('/');
  };

  // Determine home link based on user role
  const getHomeLink = () => {
    if (!session) return '/';
    
    switch(userRole) {
      case 'coach': 
        return '/coach/dashboard';
      case 'moderator': 
        return '/moderator/dashboard';
      default: 
        return '/dashboard';
    }
  };

  return (
    <header className="border-b bg-white">
      <div className="container-custom mx-auto flex justify-between items-center h-16 px-4">
        <Link to={getHomeLink()} className="font-bold text-xl text-black">
          GymPal
        </Link>
        
        <nav className="hidden md:flex items-center space-x-6">
          {!session ? (
            // Public navigation
            <>
              <Link to="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
              <Link to="/auth" className="text-gray-600 hover:text-gray-900">
                Log in
              </Link>
              <Button asChild>
                <Link to="/auth">Get Started</Link>
              </Button>
            </>
          ) : userRole === 'user' ? (
            // User navigation
            <>
              <Link to="/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
              <Link to="/coaches" className="text-gray-600 hover:text-gray-900">
                Find Coaches
              </Link>
            </>
          ) : userRole === 'coach' ? (
            // Coach navigation
            <>
              <Link to="/coach/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </>
          ) : userRole === 'moderator' ? (
            // Moderator navigation
            <>
              <Link to="/moderator/dashboard" className="text-gray-600 hover:text-gray-900">
                Dashboard
              </Link>
            </>
          ) : null}
        </nav>
        
        {session ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/placeholder.svg" alt="Profile" />
                  <AvatarFallback>
                    {session?.user?.email?.charAt(0).toUpperCase() || 'U'}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {session?.user?.email && (
                    <p className="font-medium">{session.user.email}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                  </p>
                </div>
              </div>
              <DropdownMenuItem
                className="cursor-pointer"
                onClick={handleSignOut}
              >
                Sign out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="block md:hidden">
            <Button asChild size="sm">
              <Link to="/auth">Sign In</Link>
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
