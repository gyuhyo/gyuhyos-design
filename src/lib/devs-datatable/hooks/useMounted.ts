import React from "react";
import { useEffect } from "react";
import { useState } from "react";
function useMounted() {
  const [mounted, setMounted] = useState(false);

  let timer: any;
  useEffect(() => {
    timer = setTimeout(() => {
      setMounted(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return mounted;
}

export default useMounted;
