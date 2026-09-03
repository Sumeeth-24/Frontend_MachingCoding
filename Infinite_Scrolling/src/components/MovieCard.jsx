// Pure presentational component — no state, no side effects
const styles = {
  card: {
    padding: "0 3.2rem",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
  },
  cardInfo: {
    padding: "1rem 2rem",
    borderRadius: "1rem",
    backgroundColor: "#213547",
    textAlign: "center",
  },
  cardId: {
    width: "3rem",
    height: "3rem",
    borderRadius: "50%",
    color: "#000",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    fontSize: "1.6rem",
  },
  body: {
    textAlign: "justify",
    fontFamily: '"Cormorant Garamond", serif',
    fontSize: "1.4rem",
    lineHeight: "1.6rem",
  },
  title: {
    padding: "1rem",
    backgroundColor: "#0e0f0f",
    textAlign: "left",
    fontFamily: '"Cormorant Garamond", serif',
    textTransform: "capitalize",
  },
};

const MovieCard = ({ myData }) => {
  const { title, body, id } = myData;

  return (
    <div style={styles.card}>
      <div style={styles.cardInfo}>
        <p style={styles.cardId}>{id}</p>
        {/* slice() — modern replacement for deprecated substr() */}
        <p style={styles.body}>{body.slice(0, 150)}</p>
        <h2 style={styles.title}>{title.slice(0, 15)}</h2>
      </div>
    </div>
  );
};

export default MovieCard;
