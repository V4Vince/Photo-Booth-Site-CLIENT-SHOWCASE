import React, { useEffect, Fragment } from "react";
import { useHistory } from "react-router-dom";

export const ScrollToTop = ({ children }) => {
  const history = useHistory();
  useEffect(() => {
    return window.scrollTo(0, 0);
  }, []);

  return <Fragment>{children}</Fragment>;
};

export const manualScrollToTop = () =>
  window.scrollTo({ top: 0, behavior: "smooth" });

//Deprecated******
export const scrollTransition = (ref) => {
  //   let elementHeight = ref.getBoundingClientRect().top;
  //   let headerHeight = 500;
  //   let offsetBy = elementHeight - headerHeight;

  ref.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};
