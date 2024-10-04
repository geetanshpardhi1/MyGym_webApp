import React, { useEffect, useState } from "react";
import styles from "../styles/SignInSignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { setGoals } from "../store/features/goalsSlice";
import { setMembershipDetails } from "../store/features/membershipSlice";
import { setWorkoutData } from "../store/features/workoutdataSlice";

const SignInSignUp = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [registerError, setRegisterError] = useState("");

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
  const [is_trainer, setTrainer] = useState(false);
  const [is_member, setMember] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const accessToken = useSelector((state) => state.auth.accessToken);

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const response = await api.post(
        "/users/login/",
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
      if (response.data.user.is_member == true){
        navigate("/member-dashboard");
      }
      else{
        console.log("is a trainer")
      }
    } catch (err) {
      console.error("Login failed:", err);
      console.log(err.response.data.errors.detail);
      if (
        err.response &&
        err.response.data.errors &&
        err.response.data.errors.detail
      ) {
        setErrorMessage("Invalid credentials. Please try again.");
      } else {
        setErrorMessage("An unexpected error occurred. Please try again.");
      }
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setRegisterError("");
    try {
      const response = await api.post(
        "/users/register/",
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
      if (response.data.user.is_member == true){
        navigate("/member-dashboard");
      }
      else{
        console.log("is a trainer")
      }
          
    } catch (err) {
      console.error("Registration failed:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        const errors = err.response.data.errors;
        let errorMssg = "";
        for (const [field, message] of Object.entries(errors)) {
          if (Array.isArray(message)) {
            errorMssg += `${message[0]} `;
          } else {
            errorMssg += `${message} `;
          }
          break;
        }
        setRegisterError(errorMssg.trim());
      } else {
        console.error("Registration failed:", err);
      }
    }
  };

  //fucntion to fetch workout plans,membership-details,user-goals after authentication.
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const [workoutResponse, membershipResponse, goalsResponse] =
            await Promise.all([
              api.get("http://localhost:8000/users/workout-plans/"),
              api.get("http://localhost:8000/users/membership/"),
              api.get("http://localhost:8000/users/goals/"),
            ]);

          dispatch(setMembershipDetails(membershipResponse.data));
          dispatch(setWorkoutData(workoutResponse.data));
          dispatch(setGoals(goalsResponse.data));
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      };

      fetchData();
    }
  }, [dispatch, accessToken]);

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
            {errorMessage && (
              <div
                className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{errorMessage}</strong>
              </div>
            )}

            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>

              <input
                required
                type="text"
                placeholder="Username"
                value={email_or_username}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                required
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

            {registerError && (
              <div
                className="bg-red-100 border border-red-400 text-red-600 px-4 py-3 rounded relative"
                role="alert"
              >
                <strong className="font-bold">{registerError}</strong>
              </div>
            )}

            <div className={styles["input-field"]}>
              <i className="fas fa-user"></i>
              <input
                required
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmailOnly(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                required
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className={styles["input-field"]}>
              <i className="fas fa-lock"></i>
              <input
                required
                type="password"
                placeholder="Confirm Password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />
            </div>

            <div className="flex flex-col space-y-2">
              <label className="inline-flex items-center">
                <input
                  required
                  type="radio"
                  value="member"
                  checked={is_member}
                  onChange={() => {
                    setMember(true);
                    setTrainer(false);
                  }}
                  className="form-radio text-blue-600 h-4 w-4 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">Member</span>
              </label>

              <label className="inline-flex items-center">
                <input
                  type="radio"
                  value="trainer"
                  checked={is_trainer}
                  onChange={() => {
                    setMember(false);
                    setTrainer(true);
                  }}
                  className="form-radio text-blue-600 h-4 w-4 transition duration-150 ease-in-out"
                />
                <span className="ml-2 text-gray-700">Trainer</span>
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
