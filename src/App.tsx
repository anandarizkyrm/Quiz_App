import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LayoutMain } from './layout/LayoutMain';
import Home from './pages/Home';
import Login from './pages/Login';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import colors from 'tailwindcss/colors';

function App(): JSX.Element {
  const location = useLocation();
  return (
    <div className="App">
      <Toaster
        toastOptions={{
          style: {
            backgroundColor: colors.neutral[800],
            color: colors.white,
          },
        }}
      />
      <NavBar />
      <Routes key={location.pathname} location={location}>
        <Route path="/" element={<LayoutMain />}>
          <Route
            index
            element={
              <ProtectedRoute user={true}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
