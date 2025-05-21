
import { useLocation, Link } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';
import { UserAuth } from '@/context/AuthContext';


const VerifyEmail = () => {
  
  const location = useLocation();
  const email = location.state?.email || "user.name@mail.com";

  return (
    <AuthLayout variant="purple">
      <div className="max-w-md w-full mx-auto">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-8" />
          <h1 className="text-2xl font-bold mb-4 text-center">We've sent a verification link to your email.</h1>
          
          <p className="text-lg font-medium underline mb-8 text-center">{email}</p>
          
          <p className="text-center mb-12">Click the link to complete your registration.</p>
        
          <Link to="/" className="px-6 py-3 bg-black/10 hover:bg-black/20 rounded-full text-lg font-medium transition-all">
              Main Page </Link>
          </div>
      </div>
    </AuthLayout>
  );
};

export default VerifyEmail;
