import MovieCard from "./MovieCard";

// React-Native-style stylesheet — camelCase keys, values as strings
const styles = {
  wrapper: {
    width: "100%",
  },
  container: {
    maxWidth: "80%",
    margin: "0 auto",
  },
  grid: {
    display: "grid",           // enables CSS Grid layout
    gap: "3.2rem",             // space between grid items (row + column)
    gridTemplateColumns: "repeat(3, 1fr)", // 3 equal columns — 1fr = 1 fraction of available space
  },
};

const MovieComponent = ({ cards }) => (
  <div style={styles.wrapper}>
    <div style={styles.container}>
      <h1>List of cards</h1>
      <div style={styles.grid}>
        {cards.map((card) => (
          // Stable data id as key — never use array index
          <MovieCard key={card.id} myData={card} />
        ))}
      </div>
    </div>
  </div>
);

export default MovieComponent;
