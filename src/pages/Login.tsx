
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';
import { toast } from '@/hooks/use-toast';
import { UserAuth } from '@/context/AuthContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState('');
  const {session, signInUser} = UserAuth();
  const navigate = useNavigate();

  console.log(session);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading( true );
    try {
      const result = await signInUser( email, password );

      if ( result.success ){
        navigate("/login-success", { state: { email } });
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
      <div className="max-w-md w-full px-3">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-4" />
          <h1 className="text-2xl font-bold mb-4 text-center">Log in to power up your workforce.</h1>
          
          <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
            <div className="space-y-4">
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
              
              <div className="relative">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="input-underline"
                  placeholder="Password"
                  required
                />
                <div className="absolute top-0 right-0 text-xs">
                  <Link to="/forgot-password" className="text-zinc-600 hover:text-sapien-orange">
                    Forgot password ?
                  </Link>
                </div>
              </div>
            </div>
            
            <div className="text-sm text-zinc-700">
              By logging in, I agree to the <Link to="/privacy" className="underline hover:text-sapien-orange">Privacy Statement</Link> and <Link to="/terms" className="underline hover:text-sapien-orange">Terms of Service</Link>.
            </div>
            
            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-full shadow-sm text-sm font-medium text-zinc-800 bg-white/80 hover:bg-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sapien-orange transition-all"
            >
              Log In
            </button>
            
            <div className="flex items-center">
              <hr className="flex-grow border-gray-400" />
              <span className="px-3 text-gray-500">or</span>
              <hr className="flex-grow border-gray-400" />
            </div>
            
            <div className="bg-white/80 rounded-full shadow-sm p-3 text-center text-sm">
              Don't have any account ? <Link to="/signup" className="text-sapien-orange font-medium">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
