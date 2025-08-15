// src/components/ProtectedCheckout.tsx
import { useAuth } from '../context/AuthContext';
import { Navigate } from 'react-router-dom';

export default function ProtectedCheckout({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: '/checkout' }} replace />;
  }

  return <>{children}</>;
}