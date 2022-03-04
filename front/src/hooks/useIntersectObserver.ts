import React, { useEffect } from "react"
import { Image } from './useImages';

export const useIntersectObserver = (
    target: { current: Element | null; },
    onIntersect: (
        entries: IntersectionObserverEntry[], 
        observer: IntersectionObserver
    ) => void
) => {
    useEffect(() => {
        if(!target.current) return

        const observer = new IntersectionObserver(onIntersect, {
            threshold: 0.2,
            rootMargin: "0px",
        });

        const { current } = target;

        observer.observe(current);

        return () => observer.unobserve(current);
    });
}