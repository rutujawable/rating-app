import React, { useEffect, useState } from 'react';
import API from '../../../utils/api.js';
import Header from '../../Header/Header.js';
import Footer from '../../Footer/Footer.js';
import './DashboardAdmin.css';

function DashboardAdmin() {
  const [users, setUsers] = useState([]);
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');
  const [stats, setStats] = useState({});
  const [newUser, setNewUser] = useState({ name: '', email: '', address: '', password: '', role: 'user' });
  const [newStore, setNewStore] = useState({ name: '', email: '', address: '', password: '' });

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    const [userRes, storeRes] = await Promise.all([
      API.get('/users'),
      API.get('/stores')
    ]);

    const sortedUsers = userRes.data.sort((a, b) => a.name.localeCompare(b.name));
    const sortedStores = storeRes.data.sort((a, b) => a.name.localeCompare(b.name));

    setUsers(sortedUsers);
    setStores(sortedStores);
    setStats({
      totalUsers: sortedUsers.length,
      totalStores: sortedStores.length,
      totalRatings: sortedStores.reduce((acc, s) => acc + s.ratings.length, 0)
    });
  };

  const filteredUsers = users.filter(u =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.role.toLowerCase().includes(search.toLowerCase())
  );

  const handleAddUser = async (e) => {
    e.preventDefault();
    try {
      await API.post('/signup', newUser);
      alert('User added successfully');
      setNewUser({ name: '', email: '', address: '', password: '', role: 'user' });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add user');
    }
  };

  const handleAddStore = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/signup-owner-store', {
        name: newStore.name,
        email: newStore.email,
        address: newStore.address,
        password: newStore.password,
        storeName: newStore.name,
        storeAddress: newStore.address
      });

      alert('Store owner and store created successfully');
      setNewStore({ name: '', email: '', address: '', password: '' });
      fetchAll();
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to add store and owner');
    }
  };

  return (
    <>
      <Header />
      <div className="container py-4">
        <h2 className="mb-4">Admin Dashboard</h2>

        <div className="row mb-4">
          <div className="col-md-4">
            <div className="card stat-card">
              <div className="card-body text-center">
                <h6>Total Users</h6>
                <h3>{stats.totalUsers}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <div className="card-body text-center">
                <h6>Total Stores</h6>
                <h3>{stats.totalStores}</h3>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card stat-card">
              <div className="card-body text-center">
                <h6>Total Ratings</h6>
                <h3>{stats.totalRatings}</h3>
              </div>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-md-6">
            <h5>Add New User</h5>
            <form onSubmit={handleAddUser} className="border p-3 rounded bg-light">
              <input placeholder="Name" className="form-control mb-2" value={newUser.name} onChange={e => setNewUser({ ...newUser, name: e.target.value })} />
              <input placeholder="Email" className="form-control mb-2" value={newUser.email} onChange={e => setNewUser({ ...newUser, email: e.target.value })} />
              <input placeholder="Address" className="form-control mb-2" value={newUser.address} onChange={e => setNewUser({ ...newUser, address: e.target.value })} />
              <input placeholder="Password" type="password" className="form-control mb-2" value={newUser.password} onChange={e => setNewUser({ ...newUser, password: e.target.value })} />
              <select className="form-control mb-2" value={newUser.role} onChange={e => setNewUser({ ...newUser, role: e.target.value })}>
                <option value="user">User</option>
                <option value="owner">Owner</option>
                <option value="admin">Admin</option>
              </select>
              <button className="btn btn-success w-100">Add User</button>
            </form>
          </div>

          <div className="col-md-6">
            <h5>Add Store Owner (Signup + Store)</h5>
            <form onSubmit={handleAddStore} className="border p-3 rounded bg-light">
              <input placeholder="Store Owner Name" className="form-control mb-2" value={newStore.name} onChange={e => setNewStore({ ...newStore, name: e.target.value })} />
              <input placeholder="Email (Owner Login)" className="form-control mb-2" value={newStore.email} onChange={e => setNewStore({ ...newStore, email: e.target.value })} />
              <input placeholder="Store Address" className="form-control mb-2" value={newStore.address} onChange={e => setNewStore({ ...newStore, address: e.target.value })} />
              <input placeholder="Password for Owner" type="password" className="form-control mb-2" value={newStore.password} onChange={e => setNewStore({ ...newStore, password: e.target.value })} />
              <input value="owner" disabled className="form-control mb-2 bg-light text-muted" />
              <button className="btn btn-primary w-100">Create Store & Owner</button>
            </form>
          </div>
        </div>

        <h5 className="mt-5">Search Users</h5>
        <input className="form-control my-2" placeholder="Search by name, email or role" value={search} onChange={(e) => setSearch(e.target.value)} />

        <div className='table-responsive'>
          <table className="table table-bordered mt-3">
            <thead>
              <tr>
                <th>Sr No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th>Address</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((u, i) => (
                <tr key={u._id}>
                  <td>{i + 1}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.role}</td>
                  <td>{u.address}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <h5 className="mt-5">Stores & Ratings</h5>
          <table className="table table-striped mt-3">
            <thead className="table-primary">
              <tr>
                <th>Sr No</th>
                <th>Store</th>
                <th>Address</th>
                <th>Rating Count</th>
                <th>Avg Rating</th>
              </tr>
            </thead>
            <tbody>
              {stores.map((s, i) => (
                <tr key={s._id}>
                  <td>{i + 1}</td>
                  <td>{s.name}</td>
                  <td>{s.address}</td>
                  <td>{s.ratings.length}</td>
                  <td>{s.ratings.length ? (s.ratings.reduce((sum, r) => sum + r.rating, 0) / s.ratings.length).toFixed(1) : '0'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default DashboardAdmin;
