
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';
import { toast } from '@/hooks/use-toast';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, you'd validate the email and send a reset link
    if (!email) {
      toast({
        title: "Error",
        description: "Please enter your email address",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, simulate sending an email
    toast({
      title: "Success",
      description: "If your email exists in our system, you'll receive a password reset link shortly",
    });
    
    // Navigate to confirmation page
    navigate("/reset-link-sent", { state: { email } });
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-center">Request a password reset</h1>
          <p className="text-center mb-6">Enter your email and we'll send you a link to reset your password.</p>
          
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-underline"
                placeholder="Email"
                required
              />
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-sapien-orange bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sapien-orange transition-all"
            >
              Send
            </button>
            
            <div className="mt-4 text-center">
              <Link 
                to="/login" 
                className="inline-block bg-transparent hover:bg-white/30 text-black px-6 py-2 rounded-full transition-all"
              >
                Back to Login
              </Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword;
