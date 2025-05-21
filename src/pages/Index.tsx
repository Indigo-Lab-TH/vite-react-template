
import React from 'react';
import { Link } from 'react-router-dom';
import SapienLogo from '@/components/SapienLogo';
import { useState } from 'react';
import { UserAuth } from '@/context/AuthContext';

const Index = () => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const {session, signOut} = UserAuth();

  console.log( session );

  const handleSignOut = async (e) => {
    e.preventDefault();
    try {
      await signOut();
    } catch(err) {
      console.error(err);
    }
  };
  
  if (session){
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">
        <header className="p-6">
          <div className="flex items-center">
            <SapienLogo size={40} />
            <h1 className="text-2xl font-bold ml-2 text-zinc-800">SapienAI Platform</h1>
          </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full auth-card p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6">Welcome to SapienAI</h1>
              <h2 className="text-1xl font-bold mb-6">Account: {session?.user?.email}</h2>
           
              <div className="flex flex-col space-y-4">
                <form onSubmit={handleSignOut} className="w-full max-w-sm space-y-6">
                  <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-zinc-800 bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sapien-orange transition-all"
                  >
                    Log Out
                  </button>
                </form>
              </div>
              
            </div>
          </div>
        </main>
        
        <footer className="p-6 text-center text-sm text-zinc-800">
          <p>SapienAI Platform &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }

  else{
    return (
      <div className="min-h-screen flex flex-col bg-gradient-to-r from-yellow-300 via-orange-400 to-red-400">
        <header className="p-6">
          <div className="flex items-center">
            <SapienLogo size={40} />
            <h1 className="text-2xl font-bold ml-2 text-zinc-800">SapienAI Platform</h1>
          </div>
        </header>
        
        <main className="flex-grow flex items-center justify-center p-4">
          <div className="max-w-md w-full auth-card p-8">
            <div className="text-center">
              <h1 className="text-3xl font-bold mb-6">Welcome to SapienAI</h1>
              <p className="text-lg mb-8">The intelligent platform for your workforce</p>
              
              <div className="flex flex-col space-y-4">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-white/80 hover:bg-white rounded-full text-lg font-medium transition-all"
                >
                  Log In
                </Link>
                
                <Link 
                  to="/signup" 
                  className="px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-lg font-medium transition-all"
                >
                  Sign Up
                </Link>
              </div>
              
              <div className="mt-8">
                <p className="text-sm">
                  Experience our authentication flow: login, signup, password reset and more
                </p>
              </div>
            </div>
          </div>
        </main>
        
        <footer className="p-6 text-center text-sm text-zinc-800">
          <p>SapienAI Platform &copy; {new Date().getFullYear()}</p>
        </footer>
      </div>
    );
  }
}

export default Index;
