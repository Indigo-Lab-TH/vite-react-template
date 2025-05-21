import { createBrowserRouter } from "react-router-dom";
// import App from "./App";

// Auth Pages
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import ResetLinkSent from "./pages/ResetLinkSent";
import PasswordResetSuccess from "./pages/PasswordResetSuccess";
import VerifyEmail from "./pages/VerifyEmail";
import VerificationComplete from "./pages/VerificationComplete";
import LoginSuccess from "./pages/LoginSuccess";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
    {path: "/", element: <Index/>},
    {path: "/login", element: <Login/>},
    {path: "/signup", element: <SignUp/>},
    {path: "/forgot-password", element: <ForgotPassword/>},
    {path: "/reset-password", element: <ResetPassword/>},
    {path: "/reset-link-sent", element: <ResetLinkSent/>},
    {path: "/password-reset-success", element: <PasswordResetSuccess/>},
    {path: "/verify-email", element: <VerifyEmail/>},
    {path: "/verification-complete", element: <VerificationComplete/>},
    {path: "/login-success", element: <LoginSuccess/>},
    {path: "*", element: <NotFound/>},
])