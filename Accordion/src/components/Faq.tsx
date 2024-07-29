import React, { useState } from 'react'
import Accordion from './Accordion';
import data from '../data.json';

// It checks if the prevIndex (the index of the currently open accordion) is the same as the index of the accordion that was clicked.
// If they are the same (prevIndex === index), it means the user clicked on the currently open accordion, so the accordion should be closed. Therefore, it sets the state to null (no accordion is open).
// If they are different (prevIndex !== index), it means the user clicked on a different accordion, so the state is updated to the index of the clicked accordion, making this the new open accordion.

const Faq = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [checkedItems, setCheckedItems] = useState({});

    const handleAccordionClick = (index: number) => {
        setOpenIndex(prevIndex => (prevIndex === index ? null : index));
    };

    const handleCheckboxChange = (index) => {
        setCheckedItems(prevState => ({
            ...prevState,
            [index]: !prevState[index]
        }));
    };

    const allChecked = data?.faqs.every((_, index) => checkedItems[index]);

    return (
        <div>
            <h1 className='header'>FAQ's</h1>
            {data?.faqs.map((qna, index) => (
                <Accordion 
                    key={index} 
                    qna={qna} 
                    isOpen={openIndex === index} 
                    onClick={() => handleAccordionClick(index)} 
                    isChecked={checkedItems[index] || false}
                    onCheckboxChange={() => handleCheckboxChange(index)}
                />
            ))}
             <button disabled={!allChecked}>Submit</button>
        </div>
    );
}

export default Faq