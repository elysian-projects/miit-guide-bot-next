import { useNavigate } from "react-router-dom";

type RedirectOptions = {
  refresh?: boolean
}

export const useRedirect = () => {
  const navigate = useNavigate();

  const redirect = (url: string, options?: RedirectOptions) => {
    if(!url) {
      return;
    }

    navigate(url);

    if(options && options.refresh) {
      navigate(0);
    }
  }

  return {
    redirect
  }
}
