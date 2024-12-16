import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import styles from "../styles/ResetPasswordPage.module.css";
import ErrorMessage from "./ErrorMessage";

const ResetPasswordPage = () => {
  const { userId, token } = useParams();
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setErrorMessage("Passwords do not match");
      return;
    }
    try {
      setLoading(true);
      const response = await axios.post(
        `http://13.200.155.3/users/reset-password/${userId}/${token}/`,
        {
          password,
          password2,
        }
      );
      if (response.status === 200) {
        navigate("/login-register");
      } else {
        setErrorMessage(response.data.mssg);
      }
    } catch (error) {
      setErrorMessage(error.response.data.errors.non_field_errors);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className={styles["sign-in-form"]} onSubmit={handleResetPassword}>
      <h2 className={styles.title}>Reset Password</h2>

      <ErrorMessage errorMessage={errorMessage} />

      <div className={styles["input-field"]}>
        <i className="fa fa-lock"></i>
        <input
          required
          type="password"
          placeholder="Enter New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className={styles["input-field"]}>
        <i className="fa fa-lock"></i>
        <input
          required
          type="password"
          placeholder="Confirm New Password"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />
      </div>

      <input
        type="submit"
        className={styles.btn}
        value={loading ? "Resetting..." : "Reset Password"}
        disabled={loading}
      />
    </form>
  );
};

export default ResetPasswordPage;
