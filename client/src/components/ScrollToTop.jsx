import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  console.log('no')
  useEffect(() => {
    console.log('yes')
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
