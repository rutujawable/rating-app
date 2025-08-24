import React, { useEffect, useState } from 'react';
import API from '../../utils/api.js';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import { FaUserAlt } from 'react-icons/fa';
import './DashboardOwner.css';
import {toast,Toaster} from 'react-hot-toast';

function DashboardOwner() {
  const [store, setStore] = useState(null);
  const [userId, setUserId] = useState('');
  const [avgRating, setAvgRating] = useState(0);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    setUserId(user._id);
    fetchOwnerStore(user._id);
  }, []);

  const fetchOwnerStore = async (ownerId) => {
    try {
      const res = await API.get('/stores');
      const loggedInEmail = JSON.parse(localStorage.getItem('user'))?.email;
      const store = res.data.find(s => s.email === loggedInEmail);
      setStore(store);
      const avg = store && store.ratings.length
        ? (store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length).toFixed(2)
        : 0;
      setAvgRating(avg);
    } catch (err) {
      toast.error('Error loading store info');
    }
  };

  // Utility function to render stars
  const renderStars = (rating) => {
    return (
      <span className="text-warning fs-5">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`star ${star <= rating ? 'filled' : ''}`}>★</span>
        ))}
      </span>
    );
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2 className="mb-4">Store Owner Dashboard 🧾</h2>
        {store ? (
          <div className="card shadow-sm p-4 mb-4">
            <h4 className="mb-2">Store: {store.name}</h4>
            <p><strong>Address:</strong> {store.address}</p>
            <p>
              <strong>Average Rating:</strong> ⭐ {renderStars(Math.round(avgRating))}
              <span className="ms-2">({avgRating})</span>
            </p>

            <h5 className="mt-4">User Ratings ({store.ratings.length})</h5>
            <table className="table table-bordered mt-2">
              <thead>
                <tr>
                  <th><FaUserAlt /> User ID</th>
                  <th>Rating</th>
                </tr>
              </thead>
              <tbody>
                {store.ratings.map((r, i) => (
                  <tr key={i}>
                    <td>{r.userId}</td>
                    <td>{renderStars(r.rating)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>Loading your store details...</p>
        )}
      </div>
      <Footer />
      <Toaster/>
    </>
  );
}

export default DashboardOwner;
