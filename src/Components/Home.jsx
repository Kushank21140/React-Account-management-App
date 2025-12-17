import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Auth } from "../Context/Auth";

const Home = () => {
  const { user, updateUser, logout } = useContext(Auth);
  const navigate = useNavigate();

  const [editData, setEditData] = useState(null);
  const [touched, setTouched] = useState({});

  useEffect(() => {
    if (!user) {
      navigate("/Login");
    } else {
      setEditData(user);
    }
  }, [user, navigate]);

  if (!editData) return null;

  const { name, email, password, mobile, age, gender, location } = editData;

  // Validation 
  const fieldErrors = {
    name: name.trim() === "",
    password: password.length < 6,
    mobile: mobile.length !== 10,
    age: Number(age) < 18,
    gender: gender.trim() === "",
    location: location.trim() === ""
  };

  const isFormValid = Object.values(fieldErrors).every(err => !err);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setEditData(prev => ({
      ...prev,
      [name]: value
    }));

    setTouched(prev => ({
      ...prev,
      [name]: true
    }));
  };

  const handleUpdate = () => {
    if (!isFormValid) return;

    updateUser(editData);
    alert("Profile updated successfully!");
  };

  const handleLogout = () => {
    logout();
    navigate("/Login");
  };

  return (
    <div className="container mt-5">
      <h3 className="text-center mb-4">My Account</h3>

      <input
        name="name"
        value={name}
        onChange={handleChange}
        className={`form-control mb-1 ${
          touched.name && fieldErrors.name ? "is-invalid" : ""
        }`}
        placeholder="Name"
      />
      {touched.name && fieldErrors.name && (
        <small className="text-danger">Name is required</small>
      )}

      <input
        name="email"
        value={email}
        disabled
        className="form-control mb-3 mt-2"
      />

      <input
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={`form-control mb-1 ${
          touched.password && fieldErrors.password ? "is-invalid" : ""
        }`}
        placeholder="Password"
      />
      {touched.password && fieldErrors.password && (
        <small className="text-danger">
          Password must be at least 6 characters
        </small>
      )}

      <input
        type="number"
        name="mobile"
        value={mobile}
        onChange={handleChange}
        className={`form-control mb-1 mt-2 ${
          touched.mobile && fieldErrors.mobile ? "is-invalid" : ""
        }`}
        placeholder="Mobile Number"
      />
      {touched.mobile && fieldErrors.mobile && (
        <small className="text-danger">Enter 10-digit mobile number</small>
      )}

      <input
        type="number"
        name="age"
        value={age}
        onChange={handleChange}
        className={`form-control mb-1 mt-2 ${
          touched.age && fieldErrors.age ? "is-invalid" : ""
        }`}
        placeholder="Age"
      />
      {touched.age && fieldErrors.age && (
        <small className="text-danger">Age must be 18 or above</small>
      )}

      <div className="mt-3">
        <label className="form-label">Gender</label>
        <div className="d-flex gap-4 justify-content-start">
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Male"
              checked={gender === "Male"}
              onChange={handleChange}
              onBlur={() =>
                setTouched(prev => ({ ...prev, gender: true }))
              }
            />
            <label className="form-check-label">Male</label>
          </div>

          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="Female"
              checked={gender === "Female"}
              onChange={handleChange}
              onBlur={() =>
                setTouched(prev => ({ ...prev, gender: true }))
              }
            />
            <label className="form-check-label">Female</label>
          </div>
        </div>

        {touched.gender && fieldErrors.gender && (
          <small className="text-danger">Please select gender</small>
        )}
      </div>

      <input
        type="text"
        name="location"
        value={location}
        onChange={handleChange}
        className={`form-control mb-1 mt-3 ${
          touched.location && fieldErrors.location ? "is-invalid" : ""
        }`}
        placeholder="Location"
      />
      {touched.location && fieldErrors.location && (
        <small className="text-danger">Location is required</small>
      )}

      <div className="mt-4">
        <button
          className="btn btn-primary me-2"
          onClick={handleUpdate}
          disabled={!isFormValid}
        >
          Update
        </button>

        <button className="btn btn-danger" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
