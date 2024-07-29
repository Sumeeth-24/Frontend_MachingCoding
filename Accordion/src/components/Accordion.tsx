

const Accordion = ({ qna, isOpen, onClick, isChecked, onCheckboxChange }) => {
    return (
        <div className='accordion' onClick={onClick}>  
            <input 
                type="checkbox" 
                checked={isChecked} 
                onChange={onCheckboxChange}
                onClick={(event) => event.stopPropagation()}
                className="checkbox"
            />
            <div className="accordion-content">
                <h3>
                    {qna?.question} 
                    <span>{isOpen ? '-' : '+'}</span>
                </h3>
                {isOpen ? <p>{qna.answer}</p> : ""}
            </div>
        </div>
       
    );
};

export default Accordion