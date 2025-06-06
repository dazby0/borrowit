import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./theme/theme";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ProtectedRoute from "./components/Routes/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";
import { useAuth } from "./context/AuthContext";

import UserAccount from "./pages/user/Account";
import AdminAccount from "./pages/admin/Account";
import BookDetailsPage from "./pages/user/BookDetailsPage";
import UserBorrowingsPage from "./pages/user/BorrowingsPage";

const AccountRoute = () => {
  const { user } = useAuth();
  if (!user) return null;
  return user.role === "Admin" ? <AdminAccount /> : <UserAccount />;
};

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route
            path="/"
            element={
              <ProtectedRoute>
                <MainLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<Home />} />
            <Route path="account" element={<AccountRoute />} />
            <Route path="books/:id" element={<BookDetailsPage />} />
            <Route path="borrowings/me" element={<UserBorrowingsPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
