import { useState } from 'react';
import Accordion from './Accordion';
import data from '../data.json';

const Faq = () => {
  /*
   * openId stores which accordion is currently open.
   *
   * null  -> no accordion is open
   * id    -> that particular accordion is open
   *
   * We use an ID instead of an array index because IDs are stable.
   * If the FAQ list is reordered, filtered, or modified, the state
   * still points to the correct FAQ.
   */
//   const [openId, setOpenId] = useState(null); // Single Accordion to be open at any given time
    const [openItems, setOpenItems] = useState({}); // Multiple Accordion opens logic

  /*
   * checkedItems stores the checkbox state for each FAQ.
   *
   * Example:
   *
   * {
   *   "frontend-development": true,
   *   "frontend-languages": false
   * }
   *
   * This is a controlled-input approach because React owns the
   * checkbox state.
   */
  const [checkedItems, setCheckedItems] = useState({});

  /*
   * Accordion toggle logic:
   *
   * If the user clicks the currently open accordion,
   * close it by setting the state to null.
   *
   * Otherwise, open the newly clicked accordion.
   *
   * This implementation allows only ONE accordion to be open
   * at a time.
   */

  /* SINGLE ACCORDION OPEN LOGIC */
//   const handleAccordionToggle = (id) => {
//     setOpenId((previousId) =>
//       previousId === id ? null : id
//     );
//   };

/* MULTIPLE ACCORDION OPEN LOGIC */
  const handleAccordionToggle = (id) => {
  setOpenItems((previousItems) => ({
    ...previousItems,
    [id]: !previousItems[id],
  }));
};

  /*
   * Checkbox logic:
   *
   * We preserve the existing checkbox values using spread syntax
   * and only update the checkbox that was clicked.
   *
   * Example:
   *
   * previous state:
   * {
   *   faq1: true,
   *   faq2: false
   * }
   *
   * clicking faq2 produces:
   * {
   *   faq1: true,
   *   faq2: true
   * }
   */
  const handleCheckboxChange = (id) => {
    setCheckedItems((previousItems) => ({
      ...previousItems,
      [id]: !previousItems[id],
    }));
  };

  /*
   * every() returns true only when EVERY FAQ has been checked.
   *
   * We also check data.faqs.length > 0 because Array.every()
   * returns true for an empty array.
   *
   * Therefore, Submit remains disabled when there are no FAQs.
   */
  const allChecked =
    data.faqs.length > 0 &&
    data.faqs.every((faq) => checkedItems[faq.id]);

  return (
    /**
     Use <section> when you have a group of related content that forms a meaningful part of the page.
     If the content represents a distinct topic or area of the page, <section> can be appropriate.
     Eg, FAQs, About Us, Contact Us, Services Content, Review Content
    */ 

    <section className="faq">
      <h1 className="header">FAQs</h1>

      {data.faqs.map((qna) => (
        <Accordion
          key={qna.id}
          id={qna.id}
          question={qna.question}
          answer={qna.answer}
         // isOpen={openId === qna.id}  // SINGLE ACCORDION OPEN LOGIC
          isOpen={Boolean(openItems[qna.id])} // MULTIPLE ACCORDION OPEN LOGIC
          isChecked={Boolean(checkedItems[qna.id])}
          onToggle={() => handleAccordionToggle(qna.id)}
          onCheckboxChange={() =>
            handleCheckboxChange(qna.id)
          }
        />
      ))}

      
        {/* Submit is disabled until every FAQ checkbox is checked.
       
        type="button" prevents accidental form submission if this
        component is later placed inside a <form/>. */}
       
      <button
        type="button"
        disabled={!allChecked}
        className="submit-button"
      >
        Submit
      </button>
    </section>
  );
};

export default Faq;
