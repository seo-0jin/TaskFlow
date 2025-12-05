import { useEffect, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useLoginViewModel } from "../viewmodels/useLoginViewModel";
import styles from "../scss/login.module.scss";
import AuthLayout from "../layout/AuthLayout";
import { useSignUpViewModel } from "../viewmodels/useSignUpViewModel";
import { route } from "../utils/RouteUtil";
import { RoutePath } from "../const/RoutePath";
import { AlertPopup } from "../components/popup/AlertPopup";

const AuthPage = () => {
  const navigate = useNavigate();
  const {
    state: loginState,
    setLoginId: setLoginFormLoginId,
    setPassword: setLoginFormPassword,
    submit: submitLogin,
  } = useLoginViewModel();

  const {
    state: signUpState,
    setLoginId: setSignUpLoginId,
    setPassword: setSignUpPassword,
    setName: setSignUpName,
    setEmail: setSignUpEmail,
    setPhone: setSignUpPhone,
    setPosition: setSignUpPosition,
    submit: submitSignUp,
  } = useSignUpViewModel();

  const [isSignUpMode, setIsSignUpMode] = useState(false);

  const [alertOpen, setAlertOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const handleSubmitLogin = async (e: FormEvent) => {
    e.preventDefault();
    const user = await submitLogin();

    if (user) {
      navigate("/dashboard");
    }
  };

  const handleSubmitSignUp = async (e: FormEvent) => {
    e.preventDefault();
    const ok = await submitSignUp();

    if (ok) {
      setAlertMessage("회원가입이 완료되었습니다.");
      setAlertOpen(true);
    }
  };

  const handleConfirmAlert = () => {
    setAlertOpen(false);
    route(RoutePath.LOGIN);
  };

  // 로그인 페이지에서만 사용되는 아이콘
  useEffect(() => {
    const link = document.createElement("link");
    link.href = "https://unpkg.com/boxicons@2.0.7/css/boxicons.min.css";
    link.rel = "stylesheet";
    document.head.appendChild(link);

    return () => {
      document.head.removeChild(link);
    };
  }, []);

  return (
    <AuthLayout>
      <div className="login">
        <div className={styles["login__content"]}>
          <div className={styles["login__img"]}>
            <img
              src="https://image.freepik.com/free-vector/code-typing-concept-illustration_114360-3581.jpg"
              alt="user login"
            />
          </div>
          <div className={styles["login__forms"]}>
            {/* 로그인 폼 */}
            <form
              className={`${styles["login__register"]} ${
                isSignUpMode ? styles.none : styles.block
              }`}
              id="login-in"
              onSubmit={handleSubmitLogin}
            >
              <h1 className={styles["login__title"]}>로그인</h1>
              <div className={styles["login__box"]}>
                <i className={`bx bx-user ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="User ID"
                  className={styles["login__input"]}
                  value={loginState.loginId}
                  onChange={(e) => setLoginFormLoginId(e.target.value)}
                />
              </div>
              <div className={styles["login__box"]}>
                <i className={`bx bx-lock ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="Password"
                  className={styles["login__input"]}
                  value={loginState.password}
                  onChange={(e) => setLoginFormPassword(e.target.value)}
                />
              </div>

              {loginState.error && <p className="error">{loginState.error}</p>}
              <button
                type="submit"
                className={styles["login__button"]}
                disabled={loginState.loading}
              >
                로그인
              </button>

              <div className={styles["login__gap"]}>
                <span
                  className={`${styles["login__account"]} ${styles["login__account--account"]}`}
                >
                  계정이 없으신가요?
                </span>
                <span
                  className={`${styles["login__signin"]} ${styles["login__signin--signup"]}`}
                  id="sign-up"
                  onClick={() => setIsSignUpMode(true)}
                >
                  계정 생성
                </span>
              </div>
            </form>

            {/* 회원가입 폼 */}
            <form
              className={`${styles["login__create"]} ${
                isSignUpMode ? styles.block : styles.none
              }`}
              id="login-up"
              onSubmit={handleSubmitSignUp}
            >
              <h1 className={styles["login__title"]}>계정 생성</h1>
              <div className={styles["login__box"]}>
                <i className={`bx bx-user ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="User ID"
                  className={styles["login__input"]}
                  value={signUpState.loginId}
                  onChange={(e) => setSignUpLoginId(e.target.value)}
                />
              </div>

              <div className={styles["login__box"]}>
                <i className={`bx bx-lock ${styles["login__icon"]}`}></i>
                <input
                  type="password"
                  placeholder="Password"
                  className={styles["login__input"]}
                  value={signUpState.password}
                  onChange={(e) => setSignUpPassword(e.target.value)}
                />
              </div>

              <div className={styles["login__box"]}>
                <i className={`bx bx-at ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="Name"
                  className={styles["login__input"]}
                  value={signUpState.name}
                  onChange={(e) => setSignUpName(e.target.value)}
                />
              </div>

              <div className={styles["login__box"]}>
                <i className={`bx bx-at ${styles["login__icon"]}`}></i>
                <input
                  type="email"
                  placeholder="Email"
                  className={styles["login__input"]}
                  value={signUpState.email}
                  onChange={(e) => setSignUpEmail(e.target.value)}
                />
              </div>

              <div className={styles["login__box"]}>
                <i className={`bx bx-at ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="Phone"
                  className={styles["login__input"]}
                  value={signUpState.phone}
                  onChange={(e) => setSignUpPhone(e.target.value)}
                />
              </div>

              <div className={styles["login__box"]}>
                <i className={`bx bx-at ${styles["login__icon"]}`}></i>
                <input
                  type="text"
                  placeholder="Position"
                  className={styles["login__input"]}
                  value={signUpState.position}
                  onChange={(e) => setSignUpPosition(e.target.value)}
                />
              </div>

              <button type="submit" className={styles["login__button"]}>
                계정 생성
              </button>

              <div>
                <span
                  className={`${styles["login__account"]} ${styles["login__account--account"]}`}
                >
                  이미 계정이 있으신가요?
                </span>
                <span
                  className={`${styles["login__signup"]} ${styles["login__signup--signup"]}`}
                  id="sign-in"
                  onClick={() => setIsSignUpMode(false)}
                >
                  로그인
                </span>
              </div>
            </form>

            {/* 회원가입 성공 알림 팝업 */}
            <AlertPopup
              open={alertOpen}
              message={alertMessage}
              onConfirm={handleConfirmAlert}
            />
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default AuthPage;
