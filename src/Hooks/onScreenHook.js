import { useState, useEffect } from "react";

export const useOnScreen = (ref, rootMargin = "0px") => {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);
  useEffect(() => {
    console.log("TESTING");
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      {
        rootMargin,
      }

      //   ([entry]) => {
      //     console.log("REF IN ON SCREEN", ref);
      //     if (entry.isIntersecting) {
      //       console.log("IS INTERSECT?", entry.isIntersecting);
      //       setIntersecting(entry.isIntersecting);
      //       observer.unobserve(ref.current);
      //     }
      //   },
      //   {
      //     rootMargin,
      //   }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, [ref, rootMargin]); // Empty array ensures that effect is only run on mount and unmount
  return isIntersecting;
};
