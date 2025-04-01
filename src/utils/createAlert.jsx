//JS function
import Swal from "sweetalert2";

export const createAlert = (icon, text) => {
    return Swal.fire({
        icon: icon || "info",
        text: text || "sth wrong",
        timer: 2000
    })
}

export const createConfirmAlert = async (onConfirm) => {
    return Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
            if (onConfirm) onConfirm()
          Swal.fire({
            title: "Deleted!",
            text: "Your file has been deleted.",
            icon: "success"
          });
        }
      });
}