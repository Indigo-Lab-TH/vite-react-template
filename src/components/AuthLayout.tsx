
import React from 'react';
import { Link } from 'react-router-dom';
import SapienLogo from './SapienLogo';

interface AuthLayoutProps {
  children: React.ReactNode;
  variant?: 'orange' | 'purple';
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children,
  variant = 'orange'
}) => {
  const gradientClass = variant === 'orange' ? 'auth-gradient-orange' : 'auth-gradient-purple';
  
  return (
    <div className={`min-h-screen w-full flex flex-col ${gradientClass}`}>
      <header className="p-6">
        <Link to="/" className="flex items-center">
          <h1 className="text-2xl font-bold text-zinc-800">SapienAI Platform</h1>
        </Link>
      </header>
      <main className="flex-grow flex items-center justify-start p-4">
        {children}
      </main>
    </div>
  );
};

export default AuthLayout;
