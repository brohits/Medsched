import React, { useState } from 'react';
import './Testimonials.css';

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Sarah Johnson',
      rating: 5,
      comment: 'Amazing experience! The platform made it so easy to find the right doctor and schedule an appointment.',
      image: '/testimonials/sarah.jpg'
    },
    {
      name: 'Michael Chen',
      rating: 5,
      comment: 'The virtual consultation feature saved me so much time. Very professional doctors and great service.',
      image: '/testimonials/michael.jpg'
    },
    {
      name: 'Emily Davis',
      rating: 4,
      comment: 'Efficient booking process and helpful reminders. Would definitely recommend to others.',
      image: '/testimonials/emily.jpg'
    }
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const renderStars = (rating) => {
    return '⭐'.repeat(rating);
  };

  return (
    <div className="testimonials-container">
      <div className="testimonials-carousel">
        {testimonials.map((testimonial, index) => (
          <div
            key={index}
            className={'testimonial-card ' + (index === activeIndex ? 'active' : '')}
          >
            <div className="testimonial-content">
              <img
                src={testimonial.image}
                alt={testimonial.name}
                className="testimonial-image"
                onError={(e) => {
                  e.target.src = '/default-avatar.png';
                }}
              />
              <div className="testimonial-text">
                <div className="testimonial-rating">
                  {renderStars(testimonial.rating)}
                </div>
                <p className="testimonial-comment">{testimonial.comment}</p>
                <p className="testimonial-name">- {testimonial.name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="testimonial-controls">
        <button className="control-btn" onClick={prevTestimonial}>
          ←
        </button>
        <div className="testimonial-dots">
          {testimonials.map((_, index) => (
            <span
              key={index}
              className={'dot ' + (index === activeIndex ? 'active' : '')}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </div>
        <button className="control-btn" onClick={nextTestimonial}>
          →
        </button>
      </div>
    </div>
  );
};

export default Testimonials;
