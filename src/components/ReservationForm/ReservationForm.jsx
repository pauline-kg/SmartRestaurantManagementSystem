import React, { useState } from 'react';
import './ReservationForm.css';

export default function ReservationForm({ onAddReservation }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    time: '',
    guests: '2',
    eventType: 'Standard Table'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddReservation({ ...formData, id: Date.now(), status: 'Pending' });
    alert(`Reservation booked successfully for ${formData.name}!`);
    setFormData({ name: '', email: '', date: '', time: '', guests: '2', eventType: 'Standard Table' });
  };

  return (
    <div className="reservation-container">
      <h2>Book a Table or Event</h2>
      <form onSubmit={handleSubmit} className="reservation-form">
        <div className="form-group">
          <label>Full Name</label>
          <input 
            type="text" 
            required 
            value={formData.name} 
            onChange={(e) => setFormData({ ...formData, name: e.target.value })} 
          />
        </div>

        <div className="form-group">
          <label>Email Address</label>
          <input 
            type="email" 
            required 
            value={formData.email} 
            onChange={(e) => setFormData({ ...formData, email: e.target.value })} 
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Date</label>
            <input 
              type="date" 
              required 
              value={formData.date} 
              onChange={(e) => setFormData({ ...formData, date: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>Time</label>
            <input 
              type="time" 
              required 
              value={formData.time} 
              onChange={(e) => setFormData({ ...formData, time: e.target.value })} 
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Number of Guests</label>
            <input 
              type="number" 
              min="1" 
              max="20" 
              value={formData.guests} 
              onChange={(e) => setFormData({ ...formData, guests: e.target.value })} 
            />
          </div>

          <div className="form-group">
            <label>Event Type</label>
            <select 
              value={formData.eventType} 
              onChange={(e) => setFormData({ ...formData, eventType: e.target.value })}
            >
              <option value="Standard Table">Standard Table</option>
              <option value="Birthday Party">Birthday Party</option>
              <option value="Corporate Gathering">Corporate Gathering</option>
              <option value="Anniversary">Anniversary</option>
            </select>
          </div>
        </div>

        <button type="submit" className="reserve-btn">Confirm Reservation</button>
      </form>
    </div>
  );
}