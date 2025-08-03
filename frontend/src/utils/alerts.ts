import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import useUserStore from "../store/userStore";

export const showLoginError = (message: string): void => {
  const clearError = useUserStore.getState().clearError;
  Swal.fire({
    icon: "error",
    title: "Login failed",
    text: message,
    confirmButtonColor: "rgb(126, 58, 242) ",
    confirmButtonText: "Retry",
  }).then(() => clearError());
};

export const showSignUpError = (message: string): void => {
  const clearError = useUserStore.getState().clearError;
  Swal.fire({
    icon: "error",
    title: "Failed to create account",
    text: message,
    confirmButtonColor: "rgb(126, 58, 242)",
    confirmButtonText: "Retry",
  }).then(() => clearError());
};
