import Swal from "sweetalert2";
import { Messages } from "./configs";

export const AlertError = async (err: any) => {
  const error = err.response?.data ?? err;
  const message = error?.message ?? Messages.error1;
  await Swal.fire({
    icon: "error",
    text: message,
    showCancelButton: false,
  });
};

export const AlertSuccess = async (msg: string, duration: number = 1500) => {
  await Swal.fire({
    icon: "success",
    title: msg,
    showConfirmButton: false,
    position: "top-end",
    timer: duration,
    showClass: {
      popup: `
      animate__animated
      animate__fadeInUp
      animate__faster
    `,
    },
    hideClass: {
      popup: `
      animate__animated
      animate__fadeOutDown
      animate__faster
    `,
    },
  });
};

// export const AlertLogin = (
//   msg: string,
//   forward_url: string = "/",
//   show_button: boolean = false
// ) => {
//   Swal.fire({
//     icon: "error",
//     title: msg,
//     showConfirmButton: show_button,
//     confirmButtonText: "OK",
//   }).then(() => {
//     if (forward_url !== "") {
//       window.location.replace(forward_url);
//     }
//     setShowUserLogin(true);
//   });
// };
