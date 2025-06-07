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

import BookDetailsPage from "./pages/user/BookDetailsPage";
import BorrowingsPage from "./pages/user/BorrowingsPage";
import Account from "./pages/user/Account";
import BorrowingsAllPage from "./pages/admin/BorrowingsAllPage";
import UsersPage from "./pages/admin/UsersPage";
import AddBookPage from "./pages/admin/AddBookPage";
import EditBookPage from "./pages/admin/EditBook";

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
            <Route path="account" element={<Account />} />
            <Route path="books/:id" element={<BookDetailsPage />} />
            <Route path="borrowings/me" element={<BorrowingsPage />} />
            <Route path="borrowings/all" element={<BorrowingsAllPage />} />
            <Route path="users" element={<UsersPage />} />
            <Route path="add-book" element={<AddBookPage />} />
            <Route path="edit-book/:id" element={<EditBookPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
};

export default App;
