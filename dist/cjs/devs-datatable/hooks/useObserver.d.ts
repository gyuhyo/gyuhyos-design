import React from "react";
declare function useObserver(root: Element | null | undefined): {
    isIntersecting: boolean;
    setTarget: React.Dispatch<React.SetStateAction<Element | null>>;
};
export default useObserver;
