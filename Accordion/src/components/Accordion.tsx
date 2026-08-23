
const Accordion = ({
  id,
  question,
  answer,
  isOpen,
  isChecked,
  onToggle,
  onCheckboxChange,
}) => {
 // These IDs connect the question button with its answer.
  const buttonId = `accordion-button-${id}`;
  const panelId = `accordion-panel-${id}`;

  return (
    /*
     * <article> means one self-contained piece of content that can stand on its own. Use <article> when the content is independent/self-contained.
     * <article> represents one complete FAQ item.
     * Each FAQ item contains its own:
       . question
       . answer
       . checkbox
       . open/closed state
     So we can represent one FAQ item as <article>FAQ item</article>
    */
    <article className="accordion">
      {/*
       * IMPORTANT:
       *
       * The checkbox is a separate interactive element from the
       * accordion button.
       *
       * We do NOT put the entire accordion inside onClick.
       * Therefore we don't need event.stopPropagation().
       */}
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onCheckboxChange}
        aria-label={`Mark "${question}" as completed`}
        className="checkbox"
      />

      <div className="accordion-content">
        {/*
         * Use a real <button> instead of a clickable <div>.
         *
         * Benefits:
         * - Keyboard accessible automatically
         * - Enter/Space work automatically
         * - Screen readers understand it as an interactive control
         * - No need for tabIndex or custom keyboard handlers
         * aria-controls → "Tells the button which content it controls."
         * aria-expanded → "Tells assistive technology whether it's open or closed."
         */}
        <h2 className="accordion-heading">
          <button
            id={buttonId}
            type="button"
            onClick={onToggle}
            aria-expanded={isOpen}
            aria-controls={panelId}
            className="accordion-trigger"
          >
            <span>{question}</span>

            
              {/* aria-hidden means the + / - icon is decorative.
             
              The actual state is already communicated through
              aria-expanded={isOpen}. */}
             
            <span aria-hidden="true">
              {isOpen ? '−' : '+'}
            </span>
          </button>
        </h2>

         
            {/* role="region" tells screen readers that this is
            the answer/content area of the accordion.
           
            aria-labelledby connects this answer to its question. */}
           
        {isOpen && (
          <div
            id={panelId}
            role="region"
            aria-labelledby={buttonId}
            className="accordion-panel"
          >
            <p>{answer}</p>
          </div>
        )}
      </div>
    </article>
  );
};

export default Accordion;