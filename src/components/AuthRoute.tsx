
import { createClient } from '@/integrations/supabase/client';
import { useEffect, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface AuthRouteProps {
  requiredRole?: 'user' | 'coach' | 'moderator';
}

const supabase = createClient();

const AuthRoute = ({ requiredRole }: AuthRouteProps) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);

  useEffect(() => {
    const checkAuthStatus = async () => {
      const { data } = await supabase.auth.getSession();
      
      if (data.session) {
        setIsAuthenticated(true);
        
        // Get user role from profiles table
        if (data.session.user) {
          const { data: profileData } = await supabase
            .from('profiles')
            .select('role')
            .eq('id', data.session.user.id)
            .single();
            
          setUserRole(profileData?.role || 'user');
        }
      }
      
      setIsLoading(false);
    };

    checkAuthStatus();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAuthenticated(!!session);
      checkAuthStatus();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  // Show loading state
  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading...</div>;
  }

  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/auth" replace />;
  }

  // If role is required and user doesn't have the role, redirect to appropriate dashboard
  if (requiredRole && userRole !== requiredRole) {
    // Redirect based on actual role
    if (userRole === 'coach') {
      return <Navigate to="/coach/dashboard" replace />;
    } else if (userRole === 'moderator') {
      return <Navigate to="/moderator/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }
  
  // If authenticated and has required role (or no role is required), render the children
  return <Outlet />;
};

export default AuthRoute;
