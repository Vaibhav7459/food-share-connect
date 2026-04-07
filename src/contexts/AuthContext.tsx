import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";

interface AuthContextType {
  session: Session | null;
  user: User | null;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error?: Error | null }>;
  signUp: (email: string, password: string, options?: { displayName?: string; userType?: string }) => Promise<{ error?: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  session: null,
  user: null,
  loading: true,
  signIn: async () => ({}),
  signUp: async () => ({}),
  signOut: async () => {},
  refreshProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signUp = async (email: string, password: string, options?: { displayName?: string; userType?: string }) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: window.location.origin,
        data: { display_name: options?.displayName },
      },
    });

    if (error) return { error };

    // Update profile with user type if provided
    if (data.user && options?.userType) {
      await supabase.from("profiles").update({
        user_type: options.userType,
        display_name: options.displayName,
      }).eq("user_id", data.user.id);
    }

    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const refreshProfile = async () => {
    // This can be used to refresh user profile data if needed
    // For now, it just ensures the session is up to date
    const { data: { session } } = await supabase.auth.getSession();
    setSession(session);
    setUser(session?.user ?? null);
  };

  return (
    <AuthContext.Provider value={{ session, user, loading, signIn, signUp, signOut, refreshProfile }}>
      {children}
    </AuthContext.Provider>
  );
};
