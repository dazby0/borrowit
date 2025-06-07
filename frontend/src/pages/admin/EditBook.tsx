import { Navigate, useParams } from "react-router-dom";
import BookForm from "../../components/Books/BookForm";
import { useBookDetails } from "../../api/mutations/useBooks";
import { useAuth } from "../../context/AuthContext";

const EditBookPage = () => {
  const { hasRole } = useAuth();
  if (!hasRole("Admin")) return <Navigate to="/" replace />;
  const { id } = useParams<{ id: string }>();
  const bookId = Number(id);
  const { data, isLoading, isError } = useBookDetails(bookId);

  if (isLoading) return <div>Loading...</div>;
  if (isError || !data) return <div>Book not found</div>;

  return <BookForm initialData={data} />;
};

export default EditBookPage;
