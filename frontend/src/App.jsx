import AuthProvider from './app/providers/AuthProvider.jsx';
import AppRoutes from './routes/AppRoutes.jsx';

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  );
}

export default App;