import { useState } from "react";

/**
 * ============================================================
 * 1. clamp()
 * ============================================================
 *
 * Keeps a number between min and max.
 *
 * Example:
 *
 * clamp(7, 0, 5)
 *       ↓
 *      5
 *
 * clamp(-2, 0, 5)
 *       ↓
 *      0
 *
 * clamp(3, 0, 5)
 *       ↓
 *      3
 *
 * We use this to make sure rating never goes below 0
 * or above max.
 */
const clamp = (value, min, max) => {
  return Math.min(
    Math.max(value, min),
    max
  );
};


/**
 * ============================================================
 * 2. roundToPrecision()
 * ============================================================
 *
 * Rounds a value according to precision.
 *
 * precision = 1
 *
 * 3.7 → 4
 * 3.2 → 3
 *
 * precision = 0.5
 *
 * 3.2 → 3
 * 3.3 → 3.5
 * 3.7 → 3.5
 * 3.8 → 4
 *
 * Formula:
 *
 * Math.round(value / precision) * precision
 *
 * Example:
 *
 * value = 3.7
 * precision = 0.5
 *
 * 3.7 / 0.5 = 7.4
 * Math.round(7.4) = 7
 * 7 * 0.5 = 3.5
 */
const roundToPrecision = (
  value,
  precision
) => {
  return (
    Math.round(value / precision) *
    precision
  );
};


/**
 * ============================================================
 * 3. normalizeValue()
 * ============================================================
 *
 * Makes sure rating is:
 *
 * 1. A number
 * 2. Rounded according to precision
 * 3. Between 0 and max
 *
 * Example:
 *
 * value = 3.7
 * max = 5
 * precision = 0.5
 *
 * Step 1:
 * 3.7 → 3.5
 *
 * Step 2:
 * clamp(3.5, 0, 5)
 *
 * Result:
 * 3.5
 *
 *
 * Another example:
 *
 * value = 8
 * max = 5
 *
 * Result:
 * 5
 */
const normalizeValue = (
  value,
  max,
  precision
) => {
  // Convert invalid values such as undefined,
  // null, NaN into 0.
  const numericValue =
    Number(value) || 0;

  // Apply precision.
  const roundedValue =
    roundToPrecision(
      numericValue,
      precision
    );

  // Keep rating between 0 and max.
  return clamp(
    roundedValue,
    0,
    max
  );
};



const StarRating = ({
  /**
   * ==========================================================
   * COMPONENT PROPS
   * ==========================================================
   *
   * Example:
   *
   * <StarRating
   *   max={5}
   *   value={3.5}
   *   precision={0.5}
   *   onChange={setRating}
   * />
   */

  // Number of stars.
  // 5 means:
  // ★ ★ ★ ★ ★
  max = 5,

  // Controlled value.
  //
  // Parent owns this value.
  //
  // Example:
  //
  // const [rating, setRating] = useState(3.5);
  //
  // <StarRating value={rating} />
  //
  value = 0,

  // Called when user selects a rating.
  //
  // Example:
  //
  // onChange(3.5)
  //
  // Parent then does:
  //
  // setRating(3.5)
  onChange,

  // Rating precision.
  //
  // 1   → 1, 2, 3, 4, 5
  //
  // 0.5 → 0.5, 1, 1.5, 2, 2.5...
  precision = 1,

  // User cannot interact.
  disabled = false,

  // User can see rating but cannot change it.
  readOnly = false,

  // Clicking the current rating again
  // will reset it to 0.
  allowClear = false,

  // Accessibility label.
  label = "Rating",
}) => {

   /**
   * ==========================================================
   * 4. LOCAL STATE
   * ==========================================================
   *
   * Important:
   *
   * The ACTUAL rating belongs to the parent.
   *
   * This component only owns temporary hover state.
   *
   * Example:
   *
   * Current rating = 3
   *
   * User moves mouse over 4th star.
   *
   * hoverValue = 4
   *
   * User moves mouse away.
   *
   * hoverValue = null
   *
   * Actual rating is still 3.
   */
  const [hoverValue, setHoverValue] =
    useState(null);


   /**
   * ==========================================================
   * 5. NORMALIZE max
   * ==========================================================
   *
   * max should be at least 1.
   *
   * max = 5 → 5
   * max = 0 → 1
   * max = -2 → 1
   *
   * Math.floor(5.8) → 5
   */
  const normalizedMax = Math.max(
    1,
    Math.floor(max)
  );


 /**
   * ==========================================================
   * 6. CURRENT VALUE
   * ==========================================================
   *
   * Normalize the value coming from parent.
   *
   * Example:
   *
   * value = 3.7
   * max = 5
   * precision = 0.5
   *
   * currentValue = 3.5
   *
   * Example:
   *
   * value = 8
   * max = 5
   *
   * currentValue = 5
   */
  const currentValue =
    normalizeValue(
      value,
      normalizedMax,
      precision
    );


    /**
   * ==========================================================
   * 7. DISPLAY VALUE
   * ==========================================================
   *
   * During hover:
   *
   * displayValue = hoverValue
   *
   * Otherwise:
   *
   * displayValue = currentValue
   *
   * Example:
   *
   * currentValue = 3
   * hoverValue = 4.5
   *
   * displayValue = 4.5
   *
   * When mouse leaves:
   *
   * hoverValue = null
   *
   * displayValue = 3
   */
  const displayValue =
    hoverValue ?? currentValue;


  /*
  |--------------------------------------------------------------------------
  | getRatingFromMouse
  |--------------------------------------------------------------------------
  |
  | Calculates rating based on mouse position.
  |
  | Example:
  |
  | User is on star #4.
  |
  | Left half:
  |
  | 3.5
  |
  | Right half:
  |
  | 4
  |
  */
   const getRatingFromMouse = (
    event,
    starNumber
  ) => {

    /**
     * getBoundingClientRect()
     *
     * Gives us the star's position and width.
     *
     * Example:
     *
     * left = 100px
     * width = 40px
     */
    const rect =
      event.currentTarget
        .getBoundingClientRect();


    /**
     * Find mouse position inside the star.
     *
     * Example:
     *
     * star starts at 100px
     * mouse is at 120px
     * star width = 40px
     *
     * 120 - 100 = 20
     *
     * 20 / 40 = 0.5
     *
     * Mouse is at 50% of star.
     */
    const position =
      (event.clientX - rect.left) /
      rect.width;


    /**
     * Convert position to rating.
     *
     * starNumber = 4
     *
     * Base value before star 4 = 3
     *
     * position = 0.5
     *
     * rawValue = 3 + 0.5
     *          = 3.5
     */
    const rawValue =
      starNumber - 1 + position;


    /**
     * Finally normalize according to precision.
     *
     * precision = 0.5
     *
     * 3.7 → 3.5
     *
     * precision = 1
     *
     * 3.7 → 4
     */
    return normalizeValue(
      rawValue,
      normalizedMax,
      precision
    );
  };


   /**
   * ==========================================================
   * 9. handleMouseMove()
   * ==========================================================
   *
   * Called whenever mouse moves over a star.
   *
   * Example:
   *
   * User moves mouse over 4th star at 50%.
   *
   * getRatingFromMouse()
   *       ↓
   * 3.5
   *
   * setHoverValue(3.5)
   *
   * UI temporarily shows:
   *
   * ★ ★ ★ ★½ ☆
   */
  const handleMouseMove = (
    event,
    starNumber
  ) => {

    // Don't allow hover interaction when
    // disabled or readOnly.
    if (disabled || readOnly) {
      return;
    }

    const nextValue =
      getRatingFromMouse(
        event,
        starNumber
      );

    setHoverValue(nextValue);
  };


   /**
   * ==========================================================
   * 10. handleClick()
   * ==========================================================
   *
   * Called when user clicks a star.
   *
   * Example:
   *
   * Current value = 3
   *
   * User clicks 4th star at 50%.
   *
   * getRatingFromMouse()
   *       ↓
   * 3.5
   *
   * onChange(3.5)
   *
   * Parent:
   *
   * setRating(3.5)
   */
  const handleClick = (
    event,
    starNumber
  ) => {

    if (disabled || readOnly) {
      return;
    }

    const nextValue =
      getRatingFromMouse(
        event,
        starNumber
      );


    /**
     * allowClear example:
     *
     * currentValue = 3.5
     *
     * User clicks 3.5 again.
     *
     * allowClear = true
     *
     * Result = 0
     *
     * Otherwise:
     *
     * Result = 3.5
     */
    const finalValue =
      allowClear &&
      nextValue === currentValue
        ? 0
        : nextValue;


    /**
     * Parent owns the actual state.
     *
     * Example:
     *
     * onChange(3.5)
     *
     * Parent:
     *
     * setRating(3.5)
     */
    onChange?.(finalValue);
  };


  /*
  |--------------------------------------------------------------------------
  | handleMouseLeave
  |--------------------------------------------------------------------------
  |
  | Mouse leaves rating.
  |
  | Remove temporary preview.
  |
  | Example:
  |
  | Before:
  |
  | current = 3
  | hover = 3.5
  |
  | UI = ★★★½☆
  |
  | After mouse leaves:
  |
  | hover = null
  | display = current = 3
  |
  | UI = ★★★☆☆
  */
  const handleMouseLeave = () => {
    setHoverValue(null);
  };


  /**
   * ==========================================================
   * 11. handleKeyDown()
   * ==========================================================
   *
   * Keyboard accessibility.
   *
   * precision = 0.5
   *
   * Current = 3
   *
   * ArrowRight → 3.5
   * ArrowRight → 4
   *
   * ArrowLeft → 3.5
   *
   * Home → 0
   *
   * End → 5
   */
  const handleKeyDown = (
    event
  ) => {

    if (disabled || readOnly) {
      return;
    }

    let nextValue =
      currentValue;


    switch (event.key) {

      /**
       * Increase rating.
       *
       * Example:
       *
       * 3 + 0.5 = 3.5
       */
      case "ArrowRight":
      case "ArrowUp":
        nextValue =
          currentValue + precision;
        break;


      /**
       * Decrease rating.
       *
       * Example:
       *
       * 3.5 - 0.5 = 3
       */
      case "ArrowLeft":
      case "ArrowDown":
        nextValue =
          currentValue - precision;
        break;


      /**
       * Go to minimum.
       */
      case "Home":
        nextValue = 0;
        break;


      /**
       * Go to maximum.
       *
       * Example:
       *
       * max = 5
       *
       * End → 5
       */
      case "End":
        nextValue =
          normalizedMax;
        break;


      /**
       * Ignore all other keys.
       */
      default:
        return;
    }


    /**
     * Prevent browser from scrolling
     * when using arrow keys.
     */
    event.preventDefault();


    /**
     * Make sure the result is valid.
     *
     * Example:
     *
     * currentValue = 5
     * ArrowRight
     *
     * 5.5 → clamp → 5
     */
    onChange?.(
      normalizeValue(
        nextValue,
        normalizedMax,
        precision
      )
    );
  };


  const getStarFill = (starNumber) => {

  // Example:
  // displayValue = 3.5
  // starNumber = 4
  //
  // 3.5 - (4 - 1)
  // 3.5 - 3
  // = 0.5
  //
  // 0.5 means this star is 50% filled.

  // 3.5 - 0 = 3.5 → full
  // 3.5 - 1 = 2.5 → full
  // 3.5 - 2 = 1.5 → full
  // 3.5 - 3 = 0.5 → HALF ⭐
  // 3.5 - 4 = -0.5 → empty

  const fill =
    displayValue - (starNumber - 1);

  // Make sure fill is always between
  // 0 (empty) and 1 (full).
  return clamp(fill, 0, 1);
};


  return (
  <div
    className="star-rating"
    role="radiogroup"
    aria-label={label}
    aria-disabled={disabled}
    aria-readonly={readOnly}
    onKeyDown={handleKeyDown}
    onMouseLeave={handleMouseLeave}
  >

    {/*
      max = 5 creates 5 stars.

      index:
      0 → star 1
      1 → star 2
      2 → star 3
      3 → star 4
      4 → star 5
    */}
    {Array.from(
      { length: normalizedMax },
      (_, index) => {

        // Convert zero-based index to star number.
        // index 0 → star 1
        // index 1 → star 2
        const starNumber = index + 1;

        /*
          Calculate how much this star is filled.

          Example:
          displayValue = 3.5
          starNumber = 4

          fill = 0.5
          → 50% filled
        */
        const fill =
          getStarFill(starNumber);

        return (
          <button
            key={starNumber}
            type="button"
            className="star-button"
            disabled={disabled}
            aria-label={`${starNumber} out of ${normalizedMax}`}
            onMouseMove={(event) =>
              handleMouseMove(
                event,
                starNumber
              )
            }
            onClick={(event) =>
              handleClick(
                event,
                starNumber
              )
            }
          >
            {/*
              One ★ character.

              CSS controls the fill:
              0%   → empty
              50%  → half
              100% → full
            */}
            <span
              className="star"
              style={{
                "--fill": `${fill * 100}%`,
                "--active-color":
                  hoverValue !== null
                    ? "orange"
                    : "gold",
              }}
            >
              ★
            </span>
          </button>
        );
      }
    )}
  </div>
);
};

export default StarRating;