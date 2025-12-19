import styles from "@/scss/base.module.scss";

type ButtonProps = {
  text: string;
  color?: string;
  size?: "small" | "medium" | "large";

  variant?: "fill" | "text";
  showArrow?: boolean;

  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  hidden?: boolean;
};

const Button = ({
  text,
  color = "primary",
  size = "medium",
  variant = "fill",
  showArrow = false,
  onClick,
  type = "button",
  hidden = false, // 조건에 따라 버튼 hidden
}: ButtonProps) => {
  const isText = variant === "text";
  const hiddenClass = hidden ? styles.hidden : "";

  return isText ? (
    <button
      className={`${styles.btnText} ${hiddenClass}`}
      type={type}
      onClick={onClick}
    >
      <p className={styles.btnTextLabel} data-text={text}>
        {text}
      </p>

      {showArrow && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className={styles.btnTextIcon}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={4}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M14 5l7 7m0 0l-7 7m7-7H3"
          />
        </svg>
      )}
    </button>
  ) : (
    <button
      className={`
      ${styles.btn}
      ${styles.btnFill}
      ${styles[`btn-${color}`]}
      ${styles[`btn-${size}`]}
      ${hiddenClass}
    `}
      type={type}
      onClick={onClick}
    >
      {text}
    </button>
  );
};

export default Button;
