import React, { useState, useEffect } from "react";
import Loading from "./Loading";
import MovieComponent from "./MovieComponent";
import useThrottle from "../hooks/useThrottle";

const Home = () => {
  const [card, setCard] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const getCardData = async () => {
    const res = await fetch(
      `https://jsonplaceholder.typicode.com/posts?_limit=9&_page=${page}`
    );
    const data = await res.json();
    // console.log(data);
    setCard((prev) => [...prev, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    getCardData();
  }, [page]);

  const handelInfiniteScroll = async () => {
    // window.innerHeight returns the inner height of the window (the height of the browser window's viewport), in pixels.
    // document.documentElement.scrollTop is the number of pixels the document has been scrolled,
    // document.documentElement.scrollHeight returns the height of the entire document, in pixels.
    try {
      if (
        window.innerHeight + document.documentElement.scrollTop + 1 >=
        document.documentElement.scrollHeight
      ) {
        setLoading(true);
        setPage((prev) => prev + 1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const throttleHandleScroll = useThrottle(handelInfiniteScroll, 5000);

  useEffect(() => {
    window.addEventListener("scroll", throttleHandleScroll);
    return () => window.removeEventListener("scroll", throttleHandleScroll);
  }, []);

  return (
    <>
      <MovieComponent movieInfo={card} />
      {loading && <Loading />}
    </>
  );
};

export default Home;
