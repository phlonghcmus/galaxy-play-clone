import { auth } from '~/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
function AuthRoute({ children }) {
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();
  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate('/');
    }
  }, [user, loading]);
  return <>{user && children}</>;
}

export default AuthRoute;
