import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../features/auth/hooks/useAuth.js';
import FullPageSpinner from '../shared/components/FullPageSpinner.jsx';

function PublicOnlyRoute() {
    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return <FullPageSpinner />;
    }

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return <Outlet />;
}

export default PublicOnlyRoute;