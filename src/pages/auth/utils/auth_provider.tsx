import LoadingPage from "@/common/pages/loading_page";
import { auth } from "@/firebase/firebase_config";
import { User, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";

// Define type for props of AuthProvider component
interface AuthProviderProps {
  children: React.ReactNode;
}

// Define type for context value
interface AuthContextType {
  currentUser: User | null;
  isUserLoggedIn: boolean;
  authStateLoading: boolean;
}

// Create context
export const AuthContext = React.createContext<AuthContextType>({
  currentUser: null,
  isUserLoggedIn: false,
  authStateLoading: true,
});

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [authStateLoading, setAuthStateLoading] = useState<boolean>(true);
  const [isAnimationCompleted, setisAnimationCompleted] =
    useState<boolean>(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, initializeUser);
    return () => unsubscribe();
  }, []);

  const initializeUser = (user: User | null): void => {

    if (user) {
      setCurrentUser(user);
      setIsUserLoggedIn(true);
    } else {
      setCurrentUser(null);
      setIsUserLoggedIn(false);
    }
    // Set loading state to false after initializing auth state
    setAuthStateLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ currentUser, isUserLoggedIn, authStateLoading }}
    >
      {authStateLoading || !isAnimationCompleted ? (
        <LoadingPage setisAnimationCompleted={setisAnimationCompleted} />
      ) : (
        children
      )}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
