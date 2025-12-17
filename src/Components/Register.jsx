import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Auth } from "../Context/Auth";

const Register = () => {
    const { register, users } = useContext(Auth);
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        mobile: "",
        age: "",
        gender: "Male",
        location: ""
    });

    const [touched, setTouched] = useState({});
    const [error, setError] = useState("");

    const { name, email, password, mobile, age, gender, location } = formData;

    //form validationn
    const Validation = {
        name: name.trim() === "",
        email: !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
        password: password.length < 6,
        mobile: mobile.length !== 10,
        age: Number(age) < 18,
        gender: gender.trim() === "",
        location: location.trim() === ""
    };

    const valid = Object.values(Validation).every(err => !err);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        setTouched(prev => ({
            ...prev,
            [name]: true
        }));

        setError("");
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const emailExists = users.some(u => u.email === email);
        if (emailExists) {
            setError("Email already registered");
            return;
        }

        register(formData);
        navigate("/Login");
    };

    return (
        <form onSubmit={handleSubmit} className="form">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4 col-md-4 mx-auto">
                        <div className="card">
                            <div className="card-header text-center">
                                Create an Account
                            </div>

                            <div className="card-body">

                                <input
                                    type="text"
                                    name="name"
                                    placeholder="Name"
                                    value={name}
                                    onChange={handleChange}
                                    className={`form-control mb-1 ${touched.name && Validation.name ? "is-invalid" : ""}`}
                                />
                                {touched.name && Validation.name && (
                                    <small className="text-danger">Name is required</small>
                                )}

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    value={email}
                                    onChange={handleChange}
                                    className={`form-control mb-1 mt-2 ${touched.email && Validation.email ? "is-invalid" : ""}`}
                                />
                                {touched.email && Validation.email && (
                                    <small className="text-danger">Invalid email address</small>
                                )}

                                <input
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    value={password}
                                    onChange={handleChange}
                                    className={`form-control mb-1 mt-2 ${touched.password && Validation.password ? "is-invalid" : ""}`}
                                />
                                {touched.password && Validation.password && (
                                    <small className="text-danger">
                                        Minimum 6 characters required
                                    </small>
                                )}

                                <input
                                    type="number"
                                    name="mobile"
                                    placeholder="Mobile Number"
                                    value={mobile}
                                    onChange={handleChange}
                                    className={`form-control mb-1 mt-2 ${touched.mobile && Validation.mobile ? "is-invalid" : ""}`}
                                />
                                {touched.mobile && Validation.mobile && (
                                    <small className="text-danger">
                                        Enter 10-digit mobile number
                                    </small>
                                )}

                                <input
                                    type="number"
                                    name="age"
                                    placeholder="Age"
                                    value={age}
                                    onChange={handleChange}
                                    className={`form-control mb-1 mt-2 ${touched.age && Validation.age ? "is-invalid" : ""}`}
                                />
                                {touched.age && Validation.age && (
                                    <small className="text-danger">
                                        Age must be 18 or above
                                    </small>
                                )}

                                <div className="mt-2">
                                    <label className="form-label">Gender</label>
                                    <div className="d-flex gap-4 justify-content-center">
                                        <div className="form-check">
                                            <input
                                                className="form-check-input"
                                                type="radio"
                                                name="gender"
                                                value="Male"
                                                checked={gender === "Male"}
                                                onChange={handleChange}
                                                onBlur={() => setTouched(prev => ({ ...prev, gender: true }))}
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
                                                onBlur={() => setTouched(prev => ({ ...prev, gender: true }))}
                                            />
                                            <label className="form-check-label">Female</label>
                                        </div>
                                    </div>
                                    {touched.gender && Validation.gender && (
                                        <small className="text-danger">Please select gender</small>
                                    )}
                                </div>

                                <input
                                    type="text"
                                    name="location"
                                    placeholder="Location"
                                    value={location}
                                    onChange={handleChange}
                                    className={`form-control mb-1 mt-2 ${touched.location && Validation.location ? "is-invalid" : ""
                                        }`}
                                />
                                {touched.location && Validation.location && (
                                    <small className="text-danger">Location is required</small>
                                )}

                                {error && (
                                    <p className="text-danger text-center mt-2">{error}</p>
                                )}

                                <div className="d-flex justify-content-center mt-3">
                                    <button
                                        type="submit"
                                        className="btn btn-outline-primary"
                                        disabled={!valid}
                                    >
                                        Register
                                    </button>
                                </div>

                                <div className="card-footer text-center mt-3">
                                    <Link to="/Login">
                                        Already have an account? Login
                                    </Link>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default Register;
