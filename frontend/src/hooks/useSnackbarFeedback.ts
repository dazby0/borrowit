import { useEffect, useState } from "react";

export const useSnackbarFeedback = (isSuccess: boolean, error: unknown) => {
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    if (isSuccess) setShowSuccess(true);
  }, [isSuccess]);

  useEffect(() => {
    if (error) setShowError(true);
  }, [error]);

  return {
    showSuccess,
    setShowSuccess,
    showError,
    setShowError,
  };
};
