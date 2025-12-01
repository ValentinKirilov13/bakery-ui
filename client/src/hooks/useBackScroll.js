import {useEffect, useRef} from "react";
import {useLocation} from "react-router-dom";

export default function useBackScroll() {
    const scrollYRef = useRef(0);
    const location = useLocation();

    // Restore scroll position on navigation
    useEffect(() => {
        const savedScroll = location.state?.returnScroll;
        if (typeof savedScroll === "number") {
            window.scrollTo(0, savedScroll);
        }
    }, [location]);

    // Track scroll without causing rerenders
    useEffect(() => {
        const handleScroll = () => {
            scrollYRef.current = window.scrollY;
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    // Helper: pass into navigate(...)
    const getReturnScrollState = () => ({
        returnScroll: scrollYRef.current,
    });

    return {
        scrollY: scrollYRef.current,
        getReturnScrollState,
    };
}
