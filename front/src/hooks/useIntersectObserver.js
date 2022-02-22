import { useEffect } from "react"

export const useIntersectObserver = (
    target,
    onIntersect,
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