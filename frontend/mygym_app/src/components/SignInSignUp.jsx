import React, { useState } from "react";
import styles from "../styles/SignInSignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { setCredentials } from "../store/features/authSlice";

const SignInSignUp = () => {
  // sliding functions
  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  // login/register functions
  const [email_or_username, setEmail] = useState("");
  const [email, setEmailOnly] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [is_trainer, setTrainer] = useState("");
  const [is_member, setMember] = useState("");
  const dispatch = useDispatch();

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/login/",
        {
          email_or_username,
          password,
        },
        { withCredentials: true }
      );

      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.access,
        })
      );
    } catch (err) {
      console.error("Login failed:", err);
      console.log(err.response.data.errors.detail);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/users/register/",
        {
          email,
          password,
          password2,
          is_trainer,
          is_member,
        },
        { withCredentials: true }
      );

      dispatch(
        setCredentials({
          user: response.data.user,
          accessToken: response.data.access,
        })
      );
    } catch (err) {
      console.error("Login failed:", err);
      console.log(err.response.data.errors);
    }
  };

  return (
    <div
      className={`${styles.container} ${
        isSignUpMode ? styles["sign-up-mode"] : ""
      }`}
    >
      <div className={styles["forms-container"]}>
        <div className={styles["signin-signup"]}>
          {/* SIGN IN FORM  */}
          <form
            className={`${styles["sign-in-form"]} ${
              !isSignUpMode ? styles["active"] : ""
            }`}
            onSubmit={handleLogin}
          >
            <h2 className={styles.title}>Sign in</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username"
                value={email_or_username}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <input
              type="submit"
              value="Login"
              className={`${styles.btn} ${styles.solid}`}
            />

            <p className={styles["social-text"]}>
              Or Sign in with social platforms
            </p>
            <div className={styles["social-media"]}>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>

          {/* SIGN UP FORM  */}
          <form
            className={`${styles["sign-up-form"]} ${
              isSignUpMode ? styles["active"] : ""
            }`}
            onSubmit={handleRegister}
          >
            <h2 className={styles.title}>Sign up</h2>
            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                type="text"
                placeholder="Username or Email"
                value={email}
                onChange={(e) => setEmailOnly(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-envelope"></i>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <div className={styles["input-field"]}>
              <label>
                <input
                  type="radio"
                  value="member"
                  checked={is_member}
                  onChange={() => {
                    setMember(true);
                    setTrainer(false);
                  }}
                />
                Member
              </label>
              <label>
                <input
                  type="radio"
                  value="trainer"
                  checked={is_trainer}
                  onChange={() => {
                    setMember(false);
                    setTrainer(true);
                  }}
                />
                Trainer
              </label>
            </div>
            <input type="submit" className={styles.btn} value="Sign up" />
            <p className={styles["social-text"]}>
              Or Sign up with social platforms
            </p>
            <div className={styles["social-media"]}>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-google"></i>
              </a>
              <a href="#" className={styles["social-icon"]}>
                <i className="fab fa-linkedin-in"></i>
              </a>
            </div>
          </form>
        </div>
      </div>

      <div className={styles["panels-container"]}>
        <div className={`${styles["panel"]} ${styles["left-panel"]}`}>
          <div className={styles.content}>
            <h3>New here?</h3>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
              ex ratione. Aliquid!
            </p>
            <button
              className={`${styles.btn} ${styles.transparent}`}
              onClick={handleSignUpClick}
            >
              Sign up
            </button>
          </div>
          <img src="img/log.svg" className={styles.image} alt="" />
        </div>
        <div className={`${styles["panel"]} ${styles["right-panel"]}`}>
          <div className={styles.content}>
            <h3>One of us?</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
              laboriosam ad deleniti.
            </p>
            <button
              className={`${styles.btn} ${styles.transparent}`}
              onClick={handleSignInClick}
            >
              Sign in
            </button>
          </div>
          <img src="img/register.svg" className={styles.image} alt="" />
        </div>
      </div>
    </div>
  );
};

export default SignInSignUp;
