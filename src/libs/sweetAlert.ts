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

export const AlertErrorProvider = async (
  msg: string,
  show_button: boolean = false,
  forwardUrl: string = ""
) => {
  await Swal.fire({
    icon: "error",
    title: msg,
    showConfirmButton: show_button,
    confirmButtonText: "OK",
  }).then(() => {
    if (forwardUrl) {
      window.location.replace(forwardUrl);
    }
  });
};
