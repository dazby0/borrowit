import { Navigate } from "react-router-dom";
import BookForm from "../../components/Books/BookForm";
import { useAuth } from "../../context/AuthContext";

const AddBookPage = () => {
  const { hasRole } = useAuth();
  if (!hasRole("Admin")) return <Navigate to="/" replace />;

  return <BookForm />;
};

export default AddBookPage;
