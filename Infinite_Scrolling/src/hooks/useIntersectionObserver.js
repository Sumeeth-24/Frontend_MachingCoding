import { useEffect, useRef } from "react";

/**
 * useIntersectionObserver
 * Attaches an IntersectionObserver to a sentinel element.
 * Fires `onIntersect` whenever the sentinel enters the viewport.
 *
 * Why IntersectionObserver over scroll events?
 *  - No scroll event firing hundreds of times per second (no throttle needed)
 *  - Browser-native, runs off the main thread → better performance
 *  - Works correctly inside scrollable containers, iframes, etc.
 *
 * @param {Function} onIntersect - callback fired when sentinel is visible
 * @param {boolean}  enabled     - pause observation when no more data
 */
const useIntersectionObserver = (onIntersect, enabled = true) => {
  // sentinelRef: attach this to the invisible div at the bottom of the list
  const sentinelRef = useRef(null);

  useEffect(() => {
    // Don't observe if disabled (e.g. no more pages) or ref not yet attached
    if (!enabled || !sentinelRef.current) return;

    // IntersectionObserver fires the callback when the observed element
    // enters or exits the viewport (or a specified root element).
    const observer = new IntersectionObserver(
      (entries) => {
        // entries[0] is our sentinel div
        // isIntersecting = true means it has scrolled into view
        if (entries[0].isIntersecting) {
          onIntersect();
        }
      },
      {
        // threshold: 1.0 means 100% of the sentinel must be visible to trigger
        // Use 0.1 so it fires slightly before the user hits the very bottom
        threshold: 0.1,
      }
    );

    // Start watching the sentinel element
    observer.observe(sentinelRef.current);

    // Cleanup: disconnect observer when component unmounts or deps change
    return () => observer.disconnect();
  }, [onIntersect, enabled]);

  return sentinelRef;
};

export default useIntersectionObserver;
