import clsx from "clsx";
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { FiChevronUp } from "react-icons/fi";

function ScrolTop() {
  const [isShow, setIsShow] = useState(false);

  function scrollTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
    setIsShow(false);
  }

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 500) {
        setIsShow(true);
      } else {
        setIsShow(false);
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return createPortal(
    <div
      className={clsx([
        `shadow-md fixed bottom-5 right-5 w-10 h-10 hidden bg-pink-300 text-white text-primary
        justify-center items-center rounded-full cursor-pointer hover:bg-pink-400 xl:hover:bg-pink-400
        xl:hover:text-white transition duration-300 
         xl:hover:ease-in z-50`,
        { "xl:flex": isShow },
      ])}
      onClick={scrollTop}
    >
      <FiChevronUp size={48} />
    </div>,
    document.querySelector("body")!
  );
}

export default ScrolTop;
