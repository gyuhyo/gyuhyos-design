import { useLayoutEffect, useState } from "react";

export const useIntersectionObserver = (
  onIntersect: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const [target, setTarget] = useState<HTMLTableCellElement | null>(null);
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

  return { setTarget };
};
