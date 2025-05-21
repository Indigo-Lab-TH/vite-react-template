
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';
import { toast } from '@/hooks/use-toast';

import { supabase } from "@/supabaseClient";

import { UserAuth } from '@/context/AuthContext';
import liff from '@line/liff';
import { Flag } from 'lucide-react';
import { verify } from 'crypto';

const roles = [
  "Data Scientist",
  "Software Engineer",
  "Product Manager",
  "Business Analyst",
  "Executive",
];

const SignUp = () => {
  const [nickName, setNickname] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('');
  const [agreeTerms, setAgreeTerms] = useState(false);

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const { session, signUpNewUser } = UserAuth();

  const navigate = useNavigate();

  console.log( session );

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault();
      
    // In a real app, validate inputs before submission
    if (!nickName || !firstName || !lastName || !email || !password || !confirmPassword || !role) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
    
    if (!agreeTerms) {
      toast({
        title: "Error",
        description: "You must agree to the terms and privacy statement",
        variant: "destructive",
      });
      return;
    }

    setLoading( true );
    
    const userProfile = await liff.getProfile();
    
    try {
      const result = await signUpNewUser( email, password );

      if ( result.success ){

        // cache user information waiting for email verification
        const { data, error } = await supabase.from('users_cache').insert([ 
          {
          id: result.data.user.id,
          email: email,
          first_name: firstName,
          last_name: lastName,
          nick_name: nickName,
          username: nickName,
          role: role,
          permission: 'member',
          line_user_id: userProfile.userId,
          is_verified: true   // FIXME: force to TRUE waiting for own domain to send email verification link 
        },]).select()

        // navigate to page verify-email
        navigate("/verify-email", { state: { email } });
      }
      else {
        setError( result.error );
      }
    } catch (err) {
        setError( "an error occur" );
    } finally{
        setLoading( false );
    }
  
  };

  return (
    <AuthLayout>
      <div className="max-w-md w-full mx-auto">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-4" />
          <h1 className="text-2xl font-bold mb-6 text-center">Create A New Account</h1>
          
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  value={nickName}
                  onChange={(e) => setNickname(e.target.value)}
                  className="input-underline"
                  placeholder="What should we call you?"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="input-underline"
                  placeholder="First Name"
                  required
                />
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="input-underline"
                  placeholder="Last Name"
                  required
                />
              </div>
              
              <div>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value)}
                  className="input-underline appearance-none"
                  required
                >
                  <option value="" disabled>What's your role?</option>
                  {roles.map((role) => (
                    <option key={role} value={role}>{role}</option>
                  ))}
                </select>
              </div>
              
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
              
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline"
                  placeholder="Password"
                  required
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="input-underline"
                  placeholder="Confirm Password"
                  required
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="terms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="rounded border-gray-300"
                  required
                />
                <label htmlFor="terms" className="text-sm text-zinc-700">
                  By sign up, I agree to the <Link to="/privacy" className="underline hover:text-sapien-orange">Privacy Statement</Link> and <Link to="/terms" className="underline hover:text-sapien-orange">Terms of Service</Link>.
                </label>
              </div>
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-sapien-orange bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sapien-orange transition-all"
            >
              Confirm
            </button>
            
            <div className="flex items-center">
              <hr className="flex-grow border-gray-400" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>
            
            <div className="bg-white/80 rounded-full shadow-sm p-3 text-center text-sm">
              Already have an account? <Link to="/login" className="text-sapien-orange font-medium">Sign in</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
