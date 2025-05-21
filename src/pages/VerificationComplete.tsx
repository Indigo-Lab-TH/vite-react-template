
import { useLocation, Link } from 'react-router-dom';
import AuthLayout from '@/components/AuthLayout';
import SapienLogo from '@/components/SapienLogo';

const VerificationComplete = () => {
  const location = useLocation();
  const email = location.state?.email || "user.name@mail.com";

  return (
    <AuthLayout variant="purple">
      <div className="max-w-md w-full mx-auto">
        <div className="auth-card p-8 w-full flex flex-col items-center">
          <SapienLogo className="mb-8" />
          <h1 className="text-2xl font-bold mb-4 text-center">Verification complete. You can now log in.</h1>
          
          <p className="text-lg font-medium underline mb-8 text-center">{email}</p>
          
          <div className="mt-12">
            <Link 
              to="/login" 
              className="inline-block bg-white/80 hover:bg-white text-black px-8 py-3 rounded-full transition-all"
            >
              Start Login
            </Link>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default VerificationComplete;
