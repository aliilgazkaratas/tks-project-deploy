import { useState } from 'react';
import './FAQ.css';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    {
      question: "How do I register for an event?",
      answer: "Click on any event, then click 'I Will Attend' button. You must be logged in."
    },
    {
      question: "Can I cancel my registration?",
      answer: "Yes, go to your profile and click 'Cancel' on the event."
    },
    {
      question: "How do I become a member?",
      answer: "Create an account and start attending events!"
    },
    {
      question: "Are events free?",
      answer: "Most events are free for members. Check individual event details."
    },
    {
      question: "How do I contact organizers?",
      answer: "Email us at info@tks.com or use the contact form."
    }
  ];

  return (
    <div className="faq-page">
      <div className="container">
        <h1>Frequently Asked Questions</h1>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <div key={index} className="faq-item">
              <button
                className={`faq-question ${openIndex === index ? 'active' : ''}`}
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                {faq.question}
                <span>{openIndex === index ? '−' : '+'}</span>
              </button>
              {openIndex === index && (
                <div className="faq-answer">{faq.answer}</div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FAQ;