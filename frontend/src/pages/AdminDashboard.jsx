import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonors, addDonor, updateDonor, deleteDonor } from '../redux/slices/donorSlice';
import { Plus, X, Edit, Trash2, MapPin, Phone, Mail, Calendar, Droplet, Users } from 'lucide-react';

const AdminDashboard = () => {
  const dispatch = useDispatch();
  const { donors, loading } = useSelector((state) => state.donors);
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentDonor, setCurrentDonor] = useState(null);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bloodGroup: '',
    age: '',
    address: '',
    city: '',
    state: '',
    lastDonationDate: '',
    photo: null,
  });

  useEffect(() => {
    dispatch(fetchDonors());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (editMode) {
      dispatch(updateDonor({ id: currentDonor._id, formData: data, token: user.token }));
    } else {
      dispatch(addDonor(data));
    }

    resetForm();
  };

  const handleEdit = (donor) => {
    setEditMode(true);
    setCurrentDonor(donor);
    setFormData({
      fullName: donor.fullName,
      email: donor.email,
      phone: donor.phone,
      bloodGroup: donor.bloodGroup,
      age: donor.age,
      address: donor.address,
      city: donor.city,
      state: donor.state,
      lastDonationDate: donor.lastDonationDate ? donor.lastDonationDate.split('T')[0] : '',
      photo: null,
    });
    setShowForm(true);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this donor?')) {
      dispatch(deleteDonor({ id, token: user.token }));
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phone: '',
      bloodGroup: '',
      age: '',
      address: '',
      city: '',
      state: '',
      lastDonationDate: '',
      photo: null,
    });
    setShowForm(false);
    setEditMode(false);
    setCurrentDonor(null);
  };

  return (
    <div className="container" style={{ padding: '40px 20px', background: 'var(--light-bg)', minHeight: 'calc(100vh - 70px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
            <div style={{ background: 'var(--primary-red)', padding: '12px', borderRadius: 'var(--border-radius-sm)', color: 'white' }}>
              <Users size={24} />
            </div>
            <div>
              <h1 style={{ color: 'var(--dark-color)', margin: 0, fontSize: '28px' }}>Admin Dashboard</h1>
              <p style={{ color: 'var(--text-muted)', margin: '5px 0 0 0', fontSize: '15px' }}>Total Donors: <strong style={{ color: 'var(--primary-red)' }}>{donors.length}</strong></p>
            </div>
          </div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(!showForm)}
            className={showForm ? 'btn-secondary' : 'btn-primary'}
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            {showForm ? <><X size={18} /> Cancel</> : <><Plus size={18} /> Add Donor</>}
          </motion.button>
        </div>

        {showForm && (
          <motion.form
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            onSubmit={handleSubmit}
            className="card"
            style={{ marginBottom: '30px', overflow: 'hidden' }}
          >
            <h3 style={{ marginBottom: '20px', color: 'var(--dark-color)', borderBottom: '1px solid #eee', paddingBottom: '10px' }}>
              {editMode ? 'Edit Donor Details' : 'Register New Donor'}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '15px' }}>
              <input type="text" name="fullName" placeholder="Full Name *" value={formData.fullName} onChange={handleInputChange} required />
              <input type="email" name="email" placeholder="Email Address *" value={formData.email} onChange={handleInputChange} required />
              <input type="tel" name="phone" placeholder="Phone Number *" value={formData.phone} onChange={handleInputChange} required />
              <select name="bloodGroup" value={formData.bloodGroup} onChange={handleInputChange} required>
                <option value="">Select Blood Group *</option>
                {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                  <option key={bg} value={bg}>{bg}</option>
                ))}
              </select>
              <input type="number" name="age" placeholder="Age *" value={formData.age} onChange={handleInputChange} required />
              <input type="text" name="city" placeholder="City *" value={formData.city} onChange={handleInputChange} required />
              <input type="text" name="state" placeholder="State *" value={formData.state} onChange={handleInputChange} required />
              <input type="date" name="lastDonationDate" value={formData.lastDonationDate} onChange={handleInputChange} />
            </div>
            <textarea name="address" placeholder="Full Address *" value={formData.address} onChange={handleInputChange} rows="3" required style={{ marginTop: '15px' }} />
            <div style={{ marginTop: '15px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '14px', fontWeight: '600' }}>
                Profile Photo
              </label>
              <input type="file" accept="image/*" onChange={handleFileChange} style={{ border: '1px dashed #ccc', padding: '10px', background: '#fafafa' }} />
            </div>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              className="btn-success"
              style={{ width: '100%', marginTop: '20px', padding: '14px', fontSize: '16px' }}
            >
              {editMode ? 'Update Donor Profile' : 'Register Donor'}
            </motion.button>
          </motion.form>
        )}

        {loading ? (
          <div style={{ textAlign: 'center', padding: '50px 0', color: 'var(--text-muted)' }}>
            <Droplet size={40} className="spinner" style={{ animation: 'pulse 1.5s infinite', color: 'var(--primary-red)' }} />
            <p style={{ marginTop: '15px', fontWeight: 'bold' }}>Loading Donors...</p>
          </div>
        ) : (
          <div className="grid">
            {donors.map((donor, index) => (
              <motion.div
                key={donor._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                className="card"
                style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}
              >
                <div style={{ position: 'relative' }}>
                  {donor.photo ? (
                    <img
                      src={`http://localhost:5000${donor.photo}`}
                      alt={donor.fullName}
                      style={{ width: '100%', height: '180px', objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '180px', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <Users size={50} color="#bbb" />
                    </div>
                  )}
                  <div style={{
                    position: 'absolute', top: '15px', right: '15px',
                    background: 'var(--primary-red)', color: 'white',
                    padding: '8px 12px', borderRadius: '20px', fontWeight: 'bold',
                    boxShadow: 'var(--shadow-sm)'
                  }}>
                    {donor.bloodGroup}
                  </div>
                </div>

                <div style={{ padding: '20px', flex: 1 }}>
                  <h3 style={{ color: 'var(--dark-color)', marginBottom: '15px', fontSize: '20px' }}>{donor.fullName}</h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                      <Users size={16} color="var(--primary-red)" />
                      <span>{donor.age} years old</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                      <Phone size={16} color="var(--primary-red)" />
                      <span>{donor.phone}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                      <Mail size={16} color="var(--primary-red)" />
                      <span style={{ wordBreak: 'break-all' }}>{donor.email}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: 'var(--text-muted)', fontSize: '14px' }}>
                      <MapPin size={16} color="var(--primary-red)" style={{ marginTop: '2px', flexShrink: 0 }} />
                      <span>{donor.city}, {donor.state}<br /><span style={{ fontSize: '13px', color: '#999' }}>{donor.address}</span></span>
                    </div>
                    {donor.lastDonationDate && (
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--success)', fontSize: '14px', fontWeight: '600', marginTop: '5px' }}>
                        <Calendar size={16} />
                        <span>Last Donation: {new Date(donor.lastDonationDate).toLocaleDateString()}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', borderTop: '1px solid #eee' }}>
                  <motion.button
                    whileHover={{ backgroundColor: '#f0f0f0' }}
                    onClick={() => handleEdit(donor)}
                    style={{ flex: 1, padding: '15px', background: 'transparent', border: 'none', borderRight: '1px solid #eee', borderRadius: '0', color: 'var(--secondary-color)', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Edit size={16} /> Edit
                  </motion.button>
                  <motion.button
                    whileHover={{ backgroundColor: '#ffeeee' }}
                    onClick={() => handleDelete(donor._id)}
                    style={{ flex: 1, padding: '15px', background: 'transparent', border: 'none', borderRadius: '0', color: 'var(--danger)', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                  >
                    <Trash2 size={16} /> Delete
                  </motion.button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default AdminDashboard;
