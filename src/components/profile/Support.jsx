import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHeadset,
  faQuestionCircle,
  faComments,
  faEnvelope,
  faPaperPlane,
  faBook,
  faSearch
} from '@fortawesome/free-solid-svg-icons';
import './Support.css';

const Support = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    description: '',
    priority: 'medium'
  });

  const faqs = [
    {
      category: 'Appointments',
      questions: [
        {
          q: 'How do I schedule an appointment?',
          a: 'You can schedule an appointment by clicking the "Book Appointment" button on the homepage or through your dashboard. Select your preferred doctor, date, and time slot.'
        },
        {
          q: 'How can I cancel or reschedule an appointment?',
          a: 'Go to "My Appointments" in your profile, find the appointment you want to modify, and click either "Cancel" or "Reschedule". Please note our 24-hour cancellation policy.'
        }
      ]
    },
    {
      category: 'Account',
      questions: [
        {
          q: 'How do I update my profile information?',
          a: 'Navigate to your profile settings, click "Edit Profile", make your changes, and click "Save Changes" to update your information.'
        },
        {
          q: 'How can I change my password?',
          a: 'Go to Account Settings, click on "Change Password", enter your current password and your new password, then confirm the changes.'
        }
      ]
    }
  ];

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    // Handle ticket submission
    console.log('Ticket submitted:', ticketForm);
  };

  const filteredFAQs = searchQuery
    ? faqs.map(category => ({
        ...category,
        questions: category.questions.filter(
          q => q.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
               q.a.toLowerCase().includes(searchQuery.toLowerCase())
        )
      })).filter(category => category.questions.length > 0)
    : faqs;

  return (
    <div className="support">
      <section className="help-search">
        <h2>How can we help you?</h2>
        <div className="search-box">
          <FontAwesomeIcon icon={faSearch} />
          <input
            type="text"
            placeholder="Search for help..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </section>

      <section className="support-options">
        <div className="support-card">
          <FontAwesomeIcon icon={faHeadset} />
          <h3>Contact Support</h3>
          <p>Get help from our support team</p>
          <button onClick={() => setSelectedCategory('contact')}>Contact Us</button>
        </div>

        <div className="support-card">
          <FontAwesomeIcon icon={faQuestionCircle} />
          <h3>FAQs</h3>
          <p>Find answers to common questions</p>
          <button onClick={() => setSelectedCategory('faqs')}>View FAQs</button>
        </div>

        <div className="support-card">
          <FontAwesomeIcon icon={faBook} />
          <h3>User Guide</h3>
          <p>Learn how to use our platform</p>
          <button>Read Guide</button>
        </div>
      </section>

      {selectedCategory === 'contact' && (
        <section className="contact-support">
          <h3>Submit a Support Ticket</h3>
          <form onSubmit={handleTicketSubmit} className="ticket-form">
            <div className="form-group">
              <label>Subject</label>
              <input
                type="text"
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({...ticketForm, subject: e.target.value})}
                placeholder="Brief description of your issue"
              />
            </div>

            <div className="form-group">
              <label>Category</label>
              <select
                value={ticketForm.category}
                onChange={(e) => setTicketForm({...ticketForm, category: e.target.value})}
              >
                <option value="">Select a category</option>
                <option value="appointments">Appointments</option>
                <option value="account">Account</option>
                <option value="technical">Technical Issue</option>
                <option value="billing">Billing</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div className="form-group">
              <label>Description</label>
              <textarea
                value={ticketForm.description}
                onChange={(e) => setTicketForm({...ticketForm, description: e.target.value})}
                placeholder="Please provide details about your issue"
                rows="5"
              />
            </div>

            <div className="form-group">
              <label>Priority</label>
              <select
                value={ticketForm.priority}
                onChange={(e) => setTicketForm({...ticketForm, priority: e.target.value})}
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>

            <button type="submit" className="submit-ticket">
              <FontAwesomeIcon icon={faPaperPlane} />
              Submit Ticket
            </button>
          </form>
        </section>
      )}

      {selectedCategory === 'faqs' && (
        <section className="faqs">
          <h3>Frequently Asked Questions</h3>
          {filteredFAQs.map((category, index) => (
            <div key={index} className="faq-category">
              <h4>{category.category}</h4>
              <div className="faq-list">
                {category.questions.map((faq, faqIndex) => (
                  <details key={faqIndex} className="faq-item">
                    <summary>{faq.q}</summary>
                    <p>{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </section>
      )}

      <section className="contact-info">
        <h3>Other Ways to Reach Us</h3>
        <div className="contact-methods">
          <div className="contact-method">
            <FontAwesomeIcon icon={faEnvelope} />
            <h4>Email Support</h4>
            <p>support@medapp.com</p>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon icon={faHeadset} />
            <h4>Phone Support</h4>
            <p>1-800-MED-HELP</p>
            <span>Available Mon-Fri, 9AM-6PM</span>
          </div>
          <div className="contact-method">
            <FontAwesomeIcon icon={faComments} />
            <h4>Live Chat</h4>
            <p>Chat with our support team</p>
            <button className="start-chat">Start Chat</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Support;
