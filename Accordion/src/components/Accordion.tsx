

const Accordion = ({ qna, isOpen, onClick }) => {
    return (
        <div className='accordion'>
            <h3>
                {qna?.question} 
                <span onClick={onClick}>{isOpen ? '-' : '+'}</span>
            </h3>
            {isOpen ? <p>{qna.answer}</p> : ""}
        </div>
    );
};

export default Accordion