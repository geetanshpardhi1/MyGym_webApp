import React, { useEffect, useState } from "react";
import styles from "../styles/SignInSignUp.module.css";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials, setUserData } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosInstance";
import { setGoals } from "../store/features/goalsSlice";
import { setMembershipDetails } from "../store/features/membershipSlice";
import { setWorkoutData } from "../store/features/workoutdataSlice";
import { fetchProfileData } from "../store/features/profileSlice";
import ErrorMessage from "./ErrorMessage";
import Loading from "./Loading";

const SignInSignUp = () => {
  const [isSignUpMode, setIsSignUpMode] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [linkSent, setlinkSent] = useState("");
  const [loading, setLoading] = useState(false);
  // const [registerError, setRegisterError] = useState("");

  const [OTPsent, setOTPsent] = useState("");

  // logic to autoreset error messages
  useEffect(() => {
    if (errorMessage) {
      const timer = setTimeout(() => setErrorMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [errorMessage]);
  useEffect(() => {
    if (linkSent) {
      const timer = setTimeout(() => setlinkSent(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [linkSent]);
  // useEffect(() => {
  //   if (registerError) {
  //     const timer = setTimeout(() => setRegisterError(""), 3000);
  //     return () => clearTimeout(timer);
  //   }
  // }, [registerError]);
  useEffect(() => {
    if (OTPsent) {
      const timer = setTimeout(() => setOTPsent(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [OTPsent]);

  const handleSignUpClick = () => {
    setIsSignUpMode(true);
  };

  const handleSignInClick = () => {
    setIsSignUpMode(false);
  };

  // login/register functions
  const [email_or_username, setEmail] = useState("");
  const [otp_email, setOTPEmail] = useState("");
  const [email, setEmailOnly] = useState("");
  const [password, setPassword] = useState("");
  const [password2, setPassword2] = useState("");
  const [is_trainer, setTrainer] = useState(false);
  const [is_member, setMember] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [forgetPass, setforgetPass] = useState(false);
  const [completeVerification, setCompleteverification] = useState(false);
  const [completeVerificationEmailForm, setcompleteVerificationEmailForm] =
    useState(false);

  //for otp form
  const [OTPFORM, setOTPFORM] = useState(false);
  const [otp, setOTP] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [resendDisabled, setResendDisabled] = useState(true);
  const [timer, setTimer] = useState(30);

  useEffect(() => {
    if (resendDisabled) {
      const countdown = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            clearInterval(countdown);
            setResendDisabled(false);
          }
          return prev - 1;
        });
      }, 1000);
    }
  }, [resendDisabled]);

  const handleResend = () => {
    setResendDisabled(true);
    setTimer(30);
    resendOTPVerification();
    setOTPsent("OTP sent successfully.");
  };

  // LOGIN
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
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
      if (response.data.user.is_verified == true) {
        navigate("/member-dashboard");
      } else if (response.data.user.is_verified == false) {
        console.log("verify first");
        setErrorMessage("You are not verified,complete your verification.");
        setCompleteverification(true);
      } else {
        console.log("is a trainer");
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
    } finally {
      setLoading(false);
    }
  };

  // Forget Password
  const handleForgotPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    try {
      const response = await api.post("/users/send-reset-password-email/", {
        email: resetEmail,
      });
      setlinkSent("Link Sent Successfully.");
    } catch (err) {
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
        setErrorMessage(errorMssg.trim());
      } else {
        console.error("Registration failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // REGISTER
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
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
      setOTPsent("OTP sent successfully.");
      setOTPFORM(true);
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
        setErrorMessage(errorMssg.trim());
      } else {
        console.error("Registration failed:", err);
      }
    } finally {
      setLoading(false);
    }
  };

  // OTP verify
  const handleVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setOTPFORM(true);

    try {
      const response = await api.post(
        "/users/verify/",
        {
          email,
          otp,
        },
        { withCredentials: true }
      );
      dispatch(
        setUserData({
          user: response.data.user,
        })
      );

      if (response.data.user.is_verified == true) {
        navigate("/member-dashboard");
      } else if (response.data.user.is_verified != true) {
        console.log("INVALID OTP");
      } else {
        console.log("is a trainer");
      }
    } catch (err) {
      setErrorMessage(err.response.data.mssg);
      console.error(err.response.data.mssg);
    } finally {
      setLoading(false);
    }
  };

  //for handling reverification
  const handleReVerification = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage("");
    setOTPFORM(true);
    try {
      const response = await api.post(
        "/users/verify/",
        {
          email: otp_email,
          otp,
        },
        { withCredentials: true }
      );
      dispatch(
        setCredentials({
          user: response.data.user,
        })
      );

      if (response.data.user.is_verified == true) {
        navigate("/member-dashboard");
      } else if (response.data.user.is_verified == true) {
        setErrorMessage("INVALID OTP");
        console.log("INVALID OTP");
      } else {
        setErrorMessage("INVALID OTP");
      }
    } catch (err) {
      setErrorMessage("INVALID OTP");
      console.error("is a trainer");
    } finally {
      setLoading(false);
    }
  };

  //VerificationOTPresend
  const resendOTPVerification = async (e) => {
    setLoading(true);
    try {
      const response = await api.post(
        "/users/verify/resendOTP/",
        {
          email: otp_email,
        },
        { withCredentials: true }
      );
      setOTPsent("OTP sent successfully.");
      setOTPFORM(true);
    } catch (err) {
      setErrorMessage(err.response.data.mssg);
      console.error("some error in resending otp");
    } finally {
      setLoading(false);
    }
  };

  //function to fetch workout plans,membership-details,user-goals after authentication.
  useEffect(() => {
    if (accessToken) {
      const fetchData = async () => {
        try {
          const [workoutResponse, membershipResponse, goalsResponse] =
            await Promise.all([
              api.get("http://13.200.155.3/users/workout-plans/"),
              api.get("http://13.200.155.3/users/membership/"),
              api.get("http://13.200.155.3/users/goals/"),
            ]);

          dispatch(setMembershipDetails(membershipResponse.data));
          dispatch(setWorkoutData(workoutResponse.data));
          dispatch(setGoals(goalsResponse.data));
          dispatch(fetchProfileData());
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
          {!forgetPass ? (
            <>
              {!completeVerificationEmailForm ? (
                <form
                  className={`${styles["sign-in-form"]} ${
                    !isSignUpMode ? styles["active"] : ""
                  }`}
                  onSubmit={handleLogin}
                >
                  <h2 className={styles.title}>Sign in</h2>
                  <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
                  {completeVerification && (
                    <button
                      type="button"
                      className="text-black-500 cursor-pointer transition duration-300 ease-in-out hover:text-blue-700 hover:glow hover:shadow-blue-500/50"
                      onClick={() => setcompleteVerificationEmailForm(true)}
                    >
                      Complete Verification.
                    </button>
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
                  {loading ? (
                    <Loading />
                  ) : (
                    <input
                      type="submit"
                      value="Login"
                      className={`${styles.btn} ${styles.solid}`}
                    />
                  )}

                  <button
                    type="button"
                    className="text-black-500 cursor-pointer transition duration-300 ease-in-out hover:text-blue-700 hover:glow hover:shadow-blue-500/50"
                    onClick={() => setforgetPass(true)}
                  >
                    Forgot Password ?
                  </button>

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
              ) : (
                <>
                  {!OTPFORM ? (
                    <form
                      className={`${styles["sign-in-form"]} ${
                        !isSignUpMode ? styles["active"] : ""
                      }`}
                      onSubmit={resendOTPVerification}
                    >
                      <h2 className={styles.title}>OTP VERIFICATION</h2>
                      <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
                      <div className={styles["input-field"]}>
                        <i className="fa fa-user"></i>

                        <input
                          required
                          type="email"
                          placeholder="Enter your email"
                          value={otp_email}
                          onChange={(e) => setOTPEmail(e.target.value)}
                        />
                      </div>
                      {loading ? (
                        <Loading />
                      ) : (
                        <input
                          type="submit"
                          value="Send OTP"
                          className={`${styles.btn} ${styles.solid}`}
                        />
                      )}
                    </form>
                  ) : (
                    <form
                      className={`${styles["sign-in-form"]} ${
                        isSignUpMode ? styles["active"] : ""
                      }`}
                      onSubmit={handleReVerification}
                    >
                      <h2 className={styles.title}>OTP VERIFICATION</h2>
                      {OTPsent && (
                        <div
                          className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded relative"
                          role="alert"
                        >
                          <strong className="font-bold">{OTPsent}</strong>
                        </div>
                      )}
                      <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
                      <div className={styles["input-field"]}>
                        <i className="fa fa-key"></i>

                        <input
                          required
                          type="text"
                          placeholder="Enter The OTP"
                          value={otp}
                          onChange={(e) => setOTP(e.target.value)}
                        />
                      </div>
                      {loading ? (
                        <Loading />
                      ) : (
                        <input
                          type="submit"
                          className={styles.btn}
                          value="Verify"
                        />
                      )}
                      //resend otp button
                      <div className={styles["resend-container"]}>
                        {resendDisabled ? (
                          <span className="text-gray-400 cursor-not-allowed">
                            Resend OTP in {timer}s
                          </span>
                        ) : (
                          <span
                            className="text-blue-600 cursor-pointer"
                            onClick={handleResend}
                          >
                            Resend OTP
                          </span>
                        )}
                      </div>
                    </form>
                  )}
                </>
              )}
            </>
          ) : (
            <form
              className={`${styles["sign-in-form"]} ${
                !isSignUpMode ? styles["active"] : ""
              }`}
              onSubmit={handleForgotPassword}
            >
              <h2 className={styles.title}>Foget Password</h2>
              <ErrorMessage errorMessage={errorMessage}></ErrorMessage>
              {linkSent && (
                <div
                  className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded relative"
                  role="success"
                >
                  <strong className="font-bold">{linkSent}</strong>
                </div>
              )}
              <div className={styles["input-field"]}>
                <i className="fas fa-user"></i>

                <input
                  required
                  type="text"
                  placeholder="Enter Your Email"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              {loading ? (
                <Loading />
              ) : (
                <input
                  type="submit"
                  value="Confirm"
                  className={`${styles.btn} ${styles.solid}`}
                />
              )}

              <button
                type="button"
                className="text-black-500 cursor-pointer transition duration-300 ease-in-out hover:text-blue-700 hover:glow hover:shadow-blue-500/50"
                onClick={() => setforgetPass(false)}
              >
                Sign In ?
              </button>

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
          )}

          {/* SIGN UP FORM  */}
          {!OTPFORM ? (
            <form
              className={`${styles["sign-up-form"]} ${
                isSignUpMode ? styles["active"] : ""
              }`}
              onSubmit={handleRegister}
            >
              <h2 className={styles.title}>Sign up</h2>

              <ErrorMessage errorMessage={errorMessage}></ErrorMessage>

              <div className={styles["input-field"]}>
                <i className="fas fa-user"></i>
                <input
                  required
                  type="text"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => {
                    setEmailOnly(e.target.value), setOTPEmail(e.target.value);
                  }}
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
              {loading ? (
                <Loading /> // Render your loading spinner component
              ) : (
                <input type="submit" className={styles.btn} value="Sign up" />
              )}
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
          ) : (
            <form
              className={`${styles["sign-up-form"]} ${
                isSignUpMode ? styles["active"] : ""
              }`}
              onSubmit={handleVerification}
            >
              <h2 className={styles.title}>OTP VERIFICATION</h2>

              {OTPsent && (
                <div
                  className="bg-green-100 border border-green-400 text-green-600 px-4 py-3 rounded relative"
                  role="alert"
                >
                  <strong className="font-bold">{OTPsent}</strong>
                </div>
              )}
              <ErrorMessage errorMessage={errorMessage}></ErrorMessage>

              <div className={styles["input-field"]}>
                <i className="fa fa-key"></i>
                <input
                  required
                  type="text"
                  placeholder="Enter The OTP"
                  value={otp}
                  onChange={(e) => setOTP(e.target.value)}
                />
              </div>
              {loading ? (
                <Loading /> // Render your loading spinner component
              ) : (
                <input type="submit" className={styles.btn} value="Verify" />
              )}

              <div className={styles["resend-container"]}>
                {resendDisabled ? (
                  <span className="text-gray-400 cursor-not-allowed">
                    Resend OTP in {timer}s
                  </span>
                ) : (
                  <span
                    className="text-blue-600 cursor-pointer"
                    onClick={handleResend}
                  >
                    Resend OTP
                  </span>
                )}
              </div>
            </form>
          )}
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
