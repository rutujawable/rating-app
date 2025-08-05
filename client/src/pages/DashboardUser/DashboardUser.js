import React, { useEffect, useState } from 'react';
import API from '../../utils/api.js';
import Header from '../../components/Header/Header.js';
import Footer from '../../components/Footer/Footer.js';
import './DashboardUser.css';
import { FaStore } from 'react-icons/fa';

function DashboardUser() {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [ratings, setRatings] = useState({});
  const [editing, setEditing] = useState('');
  const [userId, setUserId] = useState('');

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) return;
    setUserId(user._id);

    API.get('/stores')
      .then((res) => {
        setStores(res.data);
        const userRatings = {};
        res.data.forEach((store) => {
          const r = store.ratings.find((r) => r.userId?.toString() === user._id);
          userRatings[store._id] = r ? r.rating : 0;
        });
        setRatings(userRatings);
      })
      .catch(() => alert('Failed to load stores'));
  }, []);

  const handleRating = async (storeId) => {
    const newRating = ratings[storeId];
    if (!newRating || newRating < 1 || newRating > 5) {
      return alert('Enter rating between 1 and 5');
    }

    try {
      await API.put('/rate', { storeId, userId, rating: newRating });
      alert('Your rating has been successfully saved!');
      setStores((prevStores) =>
        prevStores.map((store) => {
          if (store._id !== storeId) return store;
          const updatedRatings = [...store.ratings];
          const idx = updatedRatings.findIndex((r) => r.userId?.toString() === userId);
          if (idx !== -1) updatedRatings[idx].rating = newRating;
          else updatedRatings.push({ userId, rating: newRating });
          return { ...store, ratings: updatedRatings };
        })
      );
      setEditing('');
    } catch (err) {
      alert('Rating failed');
    }
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2 className="mb-4">Explore Stores 🛍️</h2>
        <input
          type="text"
          className="form-control mb-4"
          placeholder="Search stores by name or address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <div className="row">
          {filteredStores.map((store) => {
            const avgRating = store.ratings.length
              ? (
                  store.ratings.reduce((sum, r) => sum + r.rating, 0) / store.ratings.length
                ).toFixed(1)
              : 'No Ratings';

            const userRating =
              store.ratings.find((r) => r.userId?.toString() === userId)?.rating || 0;

            return (
              <div className="col-md-4 mb-4" key={store._id}>
                <div className="card store-card shadow-sm">
                  <div className="card-body">
                    <h5 className="card-title">
                      <FaStore className="me-2 text-primary" />
                      {store.name}
                    </h5>
                    <p className="card-text">{store.address}</p>
                    <p className="mb-1">
                      ⭐ <strong>Average:</strong> {avgRating}
                    </p>
                    <p className="mb-2">
                      <strong>Your Rating:</strong><br />
                      {editing === store._id ? (
                        <>
                          <input
                            type="number"
                            className="form-control rating-input"
                            min="1"
                            max="5"
                            value={ratings[store._id]}
                            onChange={(e) =>
                              setRatings({ ...ratings, [store._id]: Number(e.target.value) })
                            }
                          />
                          <button
                            className="btn btn-sm btn-success mt-2"
                            onClick={() => handleRating(store._id)}
                          >
                            Save
                          </button>
                        </>
                      ) : (
                        <>
                          <span className="d-inline-block mt-1 text-warning fs-5">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <span
                                key={star}
                                className={`star ${star <= userRating ? 'filled' : ''}`}
                              >
                                ★
                              </span>
                            ))}
                          </span>
                          <br />
                          <button
                            className="btn btn-sm btn-outline-primary mt-2"
                            onClick={() => setEditing(store._id)}
                          >
                            Update
                          </button>
                        </>
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardUser;
