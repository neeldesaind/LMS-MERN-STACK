import { useState } from "react";
import "./auth.css";
import { Link, useNavigate } from "react-router-dom";
import { UserData } from "../../context/UserContext";

const Register = () => {
  const navigate = useNavigate();
  const { btnLoading, registerUser } = UserData();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  // Function to apply the regex you provided to the name field
  const handleNameChange = (e) => {
    const value = e.target.value;
    // Remove HTML tags and only allow letters, numbers, @, and spaces
    const sanitizedValue = value.replace(/<[^>]*>/g, "").replace(/[^a-zA-Z0-9 ]/g, "");

    setName(sanitizedValue);

    if (sanitizedValue !== value) {
      setError("Name can only contain letters, numbers, @, and spaces.");
    } else {
      setError("");
    }
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setError(""); // Clear the error while the user is typing
  };

  // Show error message only when the user finishes typing (onBlur)
  const handleEmailBlur = () => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      setError("Invalid email format.");
    } else {
      setError(""); // Clear error if email is valid
    }
  };

  const submitHandler = async (e) => {
    e.preventDefault();

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      setError("Please enter a valid email.");
      return;
    }

    if (!error) {
      await registerUser(name, email, password, navigate);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-form">
        <h2>Register</h2>
        <form onSubmit={submitHandler}>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            value={name}
            onChange={handleNameChange}
            required
          />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            value={email}
            onChange={handleEmailChange}
            onBlur={handleEmailBlur} // Trigger validation on blur
            required
          />

          <label htmlFor="password">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {/* Display any validation error messages */}
          {error && <p className="error">{error}</p>}

          <button type="submit" disabled={btnLoading} className="common-btn">
            {btnLoading ? "Please Wait..." : "Register"}
          </button>
        </form>
        <p>
          Have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
