
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';
import { toast } from '@/hooks/use-toast';

const ResetPassword = () => {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, validate the reset token and new password
    if (!password || !confirmPassword) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }
    
    if (password !== confirmPassword) {
      toast({
        title: "Error",
        description: "Passwords do not match",
        variant: "destructive",
      });
      return;
    }
    
    // For demo purposes, simulate successful password reset
    toast({
      title: "Success",
      description: "Your password has been reset successfully",
    });
    
    // Navigate to success page
    navigate("/password-reset-success");
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-4" />
          <h1 className="text-2xl font-bold mb-6 text-center">Reset Password</h1>
          
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline"
                  placeholder="New password"
                  required
                />
              </div>
              
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-underline"
                  placeholder="Confirm password"
                  required
                />
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-sapien-orange bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sapien-orange transition-all"
            >
              Reset
            </button>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ResetPassword;
