import { useState } from "react";
import StarRating from "./components/StarRating";
import "./App.css"

const App = () => {
  const [rating, setRating] =
    useState(3);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <StarRating
        max={5}
        value={rating}
        onChange={setRating}
        precision={0.5}
        allowClear
        label="Rate this product"
      />
    </div>
  );
};

export default App;