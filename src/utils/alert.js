import { toast } from "react-toastify";

const TIMER = 3000;
const POSITION = "bottom-right";
const OPTIONS = {
  position: POSITION,
  autoClose: TIMER,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined
}

export default function toastAlert(stat = "success", message = "") {
  if (stat === "success"){
    toast.success(message, OPTIONS);
  } else if (stat === "error") {
    toast.error(message, OPTIONS);
  } else if (stat === "warning") {
    toast.warning(message, OPTIONS);
  } else if (stat === "info") {
    toast.info(message, OPTIONS);
  } else {
    toast.dark(message, OPTIONS);
  }
}
