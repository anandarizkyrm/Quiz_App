import { userDataFromLocalStorage } from './atoms';
import ErrorPage from './components/ErrorPage/ErrorPage';
import NavBar from './components/Navigation/NavBar';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import { LayoutMain } from './layout/LayoutMain';
import Home from './pages/Home';
import Login from './pages/Login';
import { useAtom } from 'jotai';
import { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';
import colors from 'tailwindcss/colors';

function App(): JSX.Element {
  const location = useLocation();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userData, _] = useAtom<any>(userDataFromLocalStorage);
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
              <ProtectedRoute user={userData}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<ErrorPage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
