import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCreditCard,
  faPlus,
  faTrash,
  faHistory,
  faClock,
  faCheckCircle,
  faExclamationCircle
} from '@fortawesome/free-solid-svg-icons';
import './PaymentInfo.css';

const PaymentInfo = () => {
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      type: 'Visa',
      lastFour: '4242',
      expiryMonth: '12',
      expiryYear: '24',
      isDefault: true
    },
    {
      id: 2,
      type: 'Mastercard',
      lastFour: '8888',
      expiryMonth: '09',
      expiryYear: '25',
      isDefault: false
    }
  ]);

  const [transactions] = useState([
    {
      id: 1,
      date: '2024-01-15',
      amount: 75.00,
      description: 'Consultation with Dr. Smith',
      status: 'completed'
    },
    {
      id: 2,
      date: '2024-01-10',
      amount: 120.00,
      description: 'Specialist Appointment',
      status: 'completed'
    },
    {
      id: 3,
      date: '2024-01-05',
      amount: 50.00,
      description: 'Virtual Consultation',
      status: 'pending'
    }
  ]);

  const handleAddCard = (e) => {
    e.preventDefault();
    // Add card logic here
    setShowAddCard(false);
  };

  const handleRemoveCard = (cardId) => {
    setCards(cards.filter(card => card.id !== cardId));
  };

  const handleSetDefault = (cardId) => {
    setCards(cards.map(card => ({
      ...card,
      isDefault: card.id === cardId
    })));
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return <FontAwesomeIcon icon={faCheckCircle} className="status-icon completed" />;
      case 'pending':
        return <FontAwesomeIcon icon={faClock} className="status-icon pending" />;
      case 'failed':
        return <FontAwesomeIcon icon={faExclamationCircle} className="status-icon failed" />;
      default:
        return null;
    }
  };

  return (
    <div className="payment-info">
      <section className="payment-methods">
        <div className="section-header">
          <h2>Payment Methods</h2>
          <button 
            className="add-card-button"
            onClick={() => setShowAddCard(true)}
          >
            <FontAwesomeIcon icon={faPlus} /> Add New Card
          </button>
        </div>

        <div className="cards-grid">
          {cards.map(card => (
            <div key={card.id} className={'card-item ' + (card.isDefault ? 'default' : '')}>
              <div className="card-header">
                <FontAwesomeIcon icon={faCreditCard} className="card-icon" />
                <span className="card-type">{card.type}</span>
              </div>
              <div className="card-details">
                <p>**** **** **** {card.lastFour}</p>
                <p>Expires: {card.expiryMonth}/{card.expiryYear}</p>
              </div>
              <div className="card-actions">
                {!card.isDefault && (
                  <button 
                    className="set-default-button"
                    onClick={() => handleSetDefault(card.id)}
                  >
                    Set as Default
                  </button>
                )}
                <button 
                  className="remove-card-button"
                  onClick={() => handleRemoveCard(card.id)}
                >
                  <FontAwesomeIcon icon={faTrash} />
                </button>
              </div>
              {card.isDefault && <span className="default-badge">Default</span>}
            </div>
          ))}
        </div>

        {showAddCard && (
          <div className="add-card-modal">
            <div className="modal-content">
              <h3>Add New Card</h3>
              <form onSubmit={handleAddCard}>
                <div className="form-group">
                  <label>Card Number</label>
                  <input type="text" placeholder="**** **** **** ****" />
                </div>
                <div className="form-row">
                  <div className="form-group">
                    <label>Expiry Date</label>
                    <input type="text" placeholder="MM/YY" />
                  </div>
                  <div className="form-group">
                    <label>CVV</label>
                    <input type="text" placeholder="***" />
                  </div>
                </div>
                <div className="form-group">
                  <label>Cardholder Name</label>
                  <input type="text" placeholder="Name on card" />
                </div>
                <div className="modal-actions">
                  <button type="button" onClick={() => setShowAddCard(false)}>Cancel</button>
                  <button type="submit">Add Card</button>
                </div>
              </form>
            </div>
          </div>
        )}
      </section>

      <section className="payment-history">
        <div className="section-header">
          <h2>Payment History</h2>
          <FontAwesomeIcon icon={faHistory} />
        </div>

        <div className="transactions-list">
          {transactions.map(transaction => (
            <div key={transaction.id} className="transaction-item">
              <div className="transaction-info">
                <h4>{transaction.description}</h4>
                <p className="transaction-date">
                  {new Date(transaction.date).toLocaleDateString()}
                </p>
              </div>
              <div className="transaction-details">
                <span className="transaction-amount">
                  ${transaction.amount.toFixed(2)}
                </span>
                {getStatusIcon(transaction.status)}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default PaymentInfo;
