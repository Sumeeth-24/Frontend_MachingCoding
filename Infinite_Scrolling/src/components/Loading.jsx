// @keyframes can't be expressed in JS style objects — style tag is the only option here
const keyframes = `
  @keyframes lds-ripple {
    0%   { top: 36px; left: 36px; width: 0; height: 0; opacity: 0; }
    5%   { top: 36px; left: 36px; width: 0; height: 0; opacity: 1; }
    100% { top: 0; left: 0; width: 72px; height: 72px; opacity: 0; }
  }
`;

const styles = {
  container: {
    width: "100%",
    textAlign: "center",
    margin: "2rem auto",
  },
  ripple: {
    display: "inline-block",
    position: "relative",
    width: "80px",
    height: "80px",
  },
  // ring: shared base for both ripple divs
  ring: {
    position: "absolute",
    border: "4px solid rgb(63, 219, 144)",
    opacity: 1,
    borderRadius: "50%",
    animation: "lds-ripple 1s cubic-bezier(0, 0.2, 0.8, 1) infinite",
  },
  // Second ring starts mid-animation to create the ripple overlap effect
  ringDelay: {
    animationDelay: "-0.5s",
  },
};

const Loading = () => (
  <>
    <style>{keyframes}</style>
    <div style={styles.container}>
      <div style={styles.ripple}>
        <div style={styles.ring} />
        {/* Spread ring base + override animationDelay for the second ring */}
        <div style={{ ...styles.ring, ...styles.ringDelay }} />
      </div>
    </div>
  </>
);

export default Loading;
