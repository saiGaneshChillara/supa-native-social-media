import { Stack, useRouter } from 'expo-router';
import { AuthProvider, useAuth } from '../contexts/AuthContext';
import { useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { getUserData } from '../services/userService';

const _layout = () => {
  return (
    <AuthProvider>
      <MainLayout />
    </AuthProvider>
  );
};

const MainLayout = () => {
  const { setAuth, setUserData } = useAuth();
  const router = useRouter();

  const updateUserData = async (user) => {
    let res = await getUserData(user.id);

    if (res.success) {
      setUserData(res.data);
    }
  };

  useEffect(() => {
    supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Session user:", session?.user?.id);

      if (session) {
        setAuth(session.user);
        updateUserData(session.user);
        router.replace("/home");
      } else {
        setAuth(null);
        router.replace("/welcome");
      }
    });
  }, []);
  
  return (
    <Stack 
      screenOptions={{
        headerShown: false
      }}
    />
  );
};

export default _layout;