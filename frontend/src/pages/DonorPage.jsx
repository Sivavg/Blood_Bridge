import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { fetchDonors, fetchMyProfile, addDonor, updateMyProfile, clearMessages } from '../redux/slices/donorSlice';
import { Heart, Search, MapPin, Phone, Mail, Calendar, Edit, ShieldCheck, XCircle, CheckCircle, Droplets, Users, UserPlus } from 'lucide-react';

const DonorPage = () => {
  const dispatch = useDispatch();
  const { donors, myProfile, loading, error, successMessage } = useSelector((state) => state.donors);
  const { user } = useSelector((state) => state.auth);
  const [showForm, setShowForm] = useState(false);
  const [searchBloodGroup, setSearchBloodGroup] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
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
    if (user) {
      dispatch(fetchMyProfile(user.token));
    }
  }, [dispatch, user]);

  useEffect(() => {
    if (successMessage || error) {
      const timer = setTimeout(() => {
        dispatch(clearMessages());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage, error, dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleAddNewClick = () => {
    if (myProfile) {
      // User already has profile - load it for editing
      setIsEditMode(true);
      setFormData({
        fullName: myProfile.fullName,
        email: myProfile.email,
        phone: myProfile.phone,
        bloodGroup: myProfile.bloodGroup,
        age: myProfile.age,
        address: myProfile.address,
        city: myProfile.city,
        state: myProfile.state,
        lastDonationDate: myProfile.lastDonationDate ? myProfile.lastDonationDate.split('T')[0] : '',
        photo: null,
      });
    } else {
      // New user - allow creating profile
      setIsEditMode(false);
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
    }
    setShowForm(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (formData[key]) {
        data.append(key, formData[key]);
      }
    });

    if (isEditMode) {
      dispatch(updateMyProfile({ formData: data, token: user.token }));
    } else {
      dispatch(addDonor({ formData: data, token: user.token }));
    }

    resetForm();
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
    setIsEditMode(false);
  };

  const filteredDonors = searchBloodGroup
    ? donors.filter((d) => d.bloodGroup === searchBloodGroup)
    : donors;

  return (
    <div className="container" style={{ padding: '40px 20px', minHeight: 'calc(100vh - 70px)' }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card"
        style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto', background: 'var(--white)' }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', background: 'rgba(230, 57, 70, 0.1)', width: '80px', height: '80px', borderRadius: '50%', marginBottom: '15px' }}>
            <Droplets size={40} color="var(--primary-red)" />
          </div>
          <h1 style={{ color: 'var(--dark-color)', marginBottom: '10px', fontSize: '32px', fontWeight: '800' }}>
            Blood Donor Network
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '16px', maxWidth: '600px', margin: '0 auto' }}>
            Save lives by donating blood. Every drop counts. Search for donors or register yourself to help your local community.
          </p>
        </div>

        {/* Success/Error Messages */}
        <AnimatePresence>
          {successMessage && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={successStyle}>
              <CheckCircle size={20} />
              {successMessage}
            </motion.div>
          )}
          {error && (
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} style={errorStyle}>
              <XCircle size={20} />
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* My Profile Status */}
        {myProfile && (
          <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} style={profileStatusStyle}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {myProfile.photo ? (
                <img src={`http://localhost:5000${myProfile.photo}`} alt={myProfile.fullName} style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', border: '3px solid white', boxShadow: 'var(--shadow-sm)' }} />
              ) : (
                <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: 'var(--shadow-sm)' }}>
                  <Users size={30} color="var(--primary-red)" />
                </div>
              )}
              <div>
                <h3 style={{ color: 'var(--dark-color)', margin: '0 0 5px 0', fontSize: '20px', fontWeight: '700' }}>Your Donor Profile</h3>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '15px' }}>
                  <span style={{ fontWeight: '600', color: 'var(--primary-red)' }}>{myProfile.bloodGroup}</span> • {myProfile.fullName}
                </div>
              </div>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddNewClick} className="btn-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '600' }}>
              <Edit size={18} /> Edit Profile
            </motion.button>
          </motion.div>
        )}

        {/* Add/Edit Button */}
        {!myProfile && (
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={handleAddNewClick} className="btn-primary" style={{ padding: '15px 30px', fontSize: '16px' }}>
              <UserPlus size={20} />
              Register as Donor
            </motion.button>
          </div>
        )}

        {/* Form */}
        <AnimatePresence>
          {showForm && (
            <motion.form initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} onSubmit={handleSubmit} style={{ marginBottom: '40px', overflow: 'hidden', padding: '30px', background: 'var(--light-bg)', borderRadius: 'var(--border-radius-lg)', border: '1px solid #eef0f2' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px', borderBottom: '2px solid #eef0f2', paddingBottom: '15px' }}>
                <Edit size={24} color="var(--primary-red)" />
                <h2 style={{ color: 'var(--dark-color)', margin: 0, fontSize: '22px' }}>
                  {isEditMode ? 'Edit Your Profile' : 'Register New Donor Profile'}
                </h2>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
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
                <input type="date" name="lastDonationDate" placeholder="Last Donation Date" value={formData.lastDonationDate} onChange={handleInputChange} />
              </div>
              <textarea name="address" placeholder="Full Residential Address *" value={formData.address} onChange={handleInputChange} rows="3" required style={{ marginTop: '20px' }} />
              <div style={{ marginTop: '15px', padding: '15px', background: 'white', border: '1px dashed #ccc', borderRadius: 'var(--border-radius-sm)' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-main)', fontWeight: '600' }}>
                  Upload Photograph {isEditMode && <span style={{ color: 'var(--text-muted)', fontWeight: 'normal', fontSize: '13px' }}>(Leave empty to keep current photo)</span>}
                </label>
                <input type="file" accept="image/*" onChange={handleFileChange} style={{ border: 'none', padding: '0', background: 'transparent' }} />
              </div>
              <div style={{ display: 'flex', gap: '15px', marginTop: '30px' }}>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="submit" className="btn-primary" style={{ flex: 1, padding: '14px', fontSize: '16px' }}>
                  {isEditMode ? 'Update Profile' : 'Submit Registration'}
                </motion.button>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} type="button" onClick={resetForm} className="btn-secondary" style={{ flex: 1, padding: '14px', fontSize: '16px' }}>
                  Cancel
                </motion.button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>

        {/* Search */}
        <div style={{ marginTop: '50px', borderTop: '1px solid #eef0f2', paddingTop: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <Search size={24} color="var(--primary-red)" />
            <h2 style={{ color: 'var(--dark-color)', margin: 0, fontSize: '24px' }}>Find Donors in Network</h2>
          </div>

          <div style={{ background: 'var(--light-bg)', padding: '20px', borderRadius: 'var(--border-radius-md)', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', flexWrap: 'wrap' }}>
            <span style={{ fontWeight: '600', color: 'var(--text-main)' }}>Filter by Blood Group:</span>
            <select value={searchBloodGroup} onChange={(e) => setSearchBloodGroup(e.target.value)} style={{ maxWidth: '250px', margin: 0 }}>
              <option value="">All Blood Groups</option>
              {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map((bg) => (
                <option key={bg} value={bg}>{bg}</option>
              ))}
            </select>
            <div style={{ marginLeft: 'auto', background: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: '600', fontSize: '14px', color: 'var(--primary-red)', boxShadow: 'var(--shadow-sm)' }}>
              {filteredDonors.length} Donors Found
            </div>
          </div>

          {loading ? (
            <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
              <Droplets size={40} className="spinner" style={{ animation: 'pulse 1.5s infinite', color: 'var(--primary-red)' }} />
              <p style={{ marginTop: '15px', fontWeight: 'bold' }}>Searching network...</p>
            </div>
          ) : (
            <div className="grid">
              {filteredDonors.map((donor, index) => (
                <motion.div key={donor._id} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: index * 0.05 }} className="card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ position: 'relative' }}>
                    {donor.photo ? (
                      <img src={`http://localhost:5000${donor.photo}`} alt={donor.fullName} style={{ width: '100%', height: '180px', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '180px', background: '#eef0f2', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Users size={50} color="#ccc" />
                      </div>
                    )}
                    <div style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--primary-red)', color: 'white', padding: '8px 16px', borderRadius: '20px', fontWeight: '800', boxShadow: 'var(--shadow-sm)', fontSize: '18px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Droplets size={16} /> {donor.bloodGroup}
                    </div>
                  </div>

                  <div style={{ padding: '25px', flex: 1 }}>
                    <h3 style={{ color: 'var(--dark-color)', marginBottom: '20px', fontSize: '20px', fontWeight: '700' }}>{donor.fullName}</h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <Users size={16} color="var(--primary-red)" /> <span><strong style={{ color: 'var(--text-main)' }}>{donor.age}</strong> years old</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <Phone size={16} color="var(--primary-red)" /> <span>{donor.phone}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <Mail size={16} color="var(--primary-red)" /> <span style={{ wordBreak: 'break-all' }}>{donor.email}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-muted)', fontSize: '14px' }}>
                        <MapPin size={16} color="var(--primary-red)" /> <span>{donor.city}, {donor.state}</span>
                      </div>
                      {donor.lastDonationDate && (
                        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--success)', fontSize: '14px', fontWeight: '600', marginTop: '5px', padding: '10px', background: 'rgba(42, 157, 143, 0.1)', borderRadius: 'var(--border-radius-sm)' }}>
                          <Calendar size={16} /> Last Donated: {new Date(donor.lastDonationDate).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};

const successStyle = {
  background: 'rgba(42, 157, 143, 0.1)',
  color: 'var(--success)',
  padding: '16px 20px',
  borderRadius: 'var(--border-radius-sm)',
  marginBottom: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  fontWeight: '600',
  fontSize: '15px',
  border: '1px solid rgba(42, 157, 143, 0.2)',
};

const errorStyle = {
  background: 'rgba(217, 4, 41, 0.1)',
  color: 'var(--danger)',
  padding: '16px 20px',
  borderRadius: 'var(--border-radius-sm)',
  marginBottom: '25px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '12px',
  fontWeight: '600',
  fontSize: '15px',
  border: '1px solid rgba(217, 4, 41, 0.2)',
};

const profileStatusStyle = {
  background: 'linear-gradient(135deg, rgba(230, 57, 70, 0.05) 0%, rgba(230, 57, 70, 0.1) 100%)',
  padding: '25px 30px',
  borderRadius: 'var(--border-radius-lg)',
  marginBottom: '40px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  border: '1px solid rgba(230, 57, 70, 0.1)',
  flexWrap: 'wrap',
  gap: '20px'
};

export default DonorPage;
