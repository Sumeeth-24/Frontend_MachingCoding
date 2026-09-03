import { useState, useEffect, useCallback } from "react";
import Loading from "./Loading";
import MovieComponent from "./MovieComponent";
import useIntersectionObserver from "../hooks/useIntersectionObserver";

const LIMIT = 9; // items per page — centralised constant, easy to change
const MAX_PAGE = 11; // jsonplaceholder has ~100 posts → ceil(100/9) ≈ 11

const Home = () => {
  const [cards, setCards] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  // hasMore: stops the observer from firing once all data is loaded
  const [hasMore, setHasMore] = useState(true);

  const fetchCards = useCallback(async () => {
    // Guard: don't fetch if already loading or nothing left
    if (loading || !hasMore) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/posts?_limit=${LIMIT}&_page=${page}`,
      );

      // Always check HTTP status — fetch() only rejects on network failure
      if (!res.ok) throw new Error(`HTTP error: ${res.status}`);

      const data = await res.json();

      // If API returns fewer items than requested, we've reached the end
      if (data.length < LIMIT || page >= MAX_PAGE) setHasMore(false);

      // Functional update: safe when multiple state updates happen close together
      setCards((prev) => [...prev, ...data]);
    } catch (err) {
      setError(err.message);
    } finally {
      // Always turn off loading, even on error
      setLoading(false);
    }
  }, [page, loading, hasMore]); // re-create only when these change

  // Initial fetch + fetch on every page increment
  useEffect(() => {
    fetchCards();
  }, [page]); // eslint-disable-line react-hooks/exhaustive-deps
  // ↑ intentionally only [page] — fetchCards identity changes would cause loops

  // Called by IntersectionObserver when sentinel enters viewport
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      // Increment page → triggers the useEffect above → fetches next batch
      setPage((prev) => prev + 1);
    }
  }, [loading, hasMore]);

  // sentinelRef is attached to an invisible div at the bottom of the list.
  // When that div scrolls into view, loadMore() is called automatically.
  const sentinelRef = useIntersectionObserver(loadMore, hasMore && !loading);

  return (
    <>
      <MovieComponent cards={cards} />

      {/*
        A sentinel is a term borrowed from computer science — it means a special value or element placed at a boundary to signal a condition, rather than carrying real data itself.
       SENTINEL — invisible div (height:1px), no content, only marks "list ends here"
           [ Card 1 ]
           [ Card 2 ]
           [ Card 3 ]  ← last real item
           [  div   ]  ← sentinel 👁 IntersectionObserver watches this
           sentinel enters viewport → loadMore() fires → next page fetches
           new cards insert ABOVE it, so sentinel always stays at the bottom */}
      <div ref={sentinelRef} style={{ height: 1 }} aria-hidden="true" />

      {loading && <Loading />}

      {error && (
        <p style={{ textAlign: "center", color: "salmon" }}>
          Failed to load: {error}
        </p>
      )}

      {/* Let the user know they've seen everything */}
      {!hasMore && !loading && (
        <p style={{ textAlign: "center", padding: "2rem" }}>
          You&apos;ve reached the end!
        </p>
      )}
    </>
  );
};

export default Home;
