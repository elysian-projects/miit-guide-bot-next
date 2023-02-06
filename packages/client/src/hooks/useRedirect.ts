import { useNavigate } from "react-router-dom";

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirect = (url: string) => {
    if(!url) {
      return;
    }

    navigate(url);
  }

  return {
    redirect
  }
}
