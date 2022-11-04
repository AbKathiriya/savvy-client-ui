import { toast } from "react-toastify";

export const handleErrors = (error: any, wallet: string = "") => {
  console.error(error);
  if (error.code === "INVALID_ARGUMENT" && !wallet) {
    toast.error("Please connect your wallet");
  } else if (error?.error) {
    if (error.error?.code === -32000) {
      toast.error("Insufficient funds for gas");
    } else {
      toast.error(error.error?.message);
    }
  } else {
    toast.error("Something went wrong");
  }
};
