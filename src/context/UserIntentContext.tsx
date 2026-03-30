import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserIntent = 'wedding' | 'graduation' | 'corporate' | 'event' | 'generalist' | null;

interface UserIntentContextType {
  activeIntent: UserIntent;
  setIntent: (intent: UserIntent) => void;
  isGateOpen: boolean;
}

const UserIntentContext = createContext<UserIntentContextType | undefined>(undefined);

export const UserIntentProvider = ({ children }: { children: ReactNode }) => {
  const [activeIntent, setActiveIntent] = useState<UserIntent>(null);
  const [isGateOpen, setIsGateOpen] = useState(true);

  const setIntent = (intent: UserIntent) => {
    setActiveIntent(intent);
    setIsGateOpen(false);
  };

  return (
    <UserIntentContext.Provider value={{ activeIntent, setIntent, isGateOpen }}>
      {children}
    </UserIntentContext.Provider>
  );
};

export const useUserIntent = () => {
  const context = useContext(UserIntentContext);
  if (context === undefined) {
    throw new Error('useUserIntent must be used within a UserIntentProvider');
  }
  return context;
};
