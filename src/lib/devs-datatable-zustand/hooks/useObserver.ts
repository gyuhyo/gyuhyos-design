import React from "react";
import { useLayoutEffect, useState } from "react";

interface IntersectionObserverOptions {
  root?: Element | null;
  rootMargin?: string;
  threshold?: number;
}

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

const useIntersectionObserver = (
  onIntersect: IntersectionObserverCallback,
  options?: IntersectionObserverOptions
) => {
  const [target, setTarget] = useState<Element | null>(null);
  const { root, rootMargin = "0px", threshold = 0.1 } = options || {};

  useLayoutEffect(() => {
    if (!target) return;

    const observer = new IntersectionObserver(onIntersect, {
      root,
      rootMargin,
      threshold,
    });
    observer.observe(target);

    return () => {
      observer.unobserve(target);
      observer.disconnect();
    };
  }, [onIntersect, root, rootMargin, target, threshold]);

  return { setTarget, target };
};

function useObserver(root: Element | null | undefined) {
  const [isIntersecting, setIsIntersecting] = React.useState(false);

  const onIntersect = (entries: IntersectionObserverEntry[]) => {
    const localIsIntersecting = entries?.[0]?.isIntersecting || false;
    if (isIntersecting !== localIsIntersecting) {
      setIsIntersecting(localIsIntersecting);
    }
  };

  const { setTarget, target } = useIntersectionObserver(onIntersect, {
    root: root,
  });

  return { isIntersecting, setTarget };
}

export default useObserver;
