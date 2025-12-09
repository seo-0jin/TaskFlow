import styles from "@/scss/base.module.scss";

type ButtonProps = {
  text: string;
  color?: string;
  size?: "small" | "medium" | "large";
  onConfirm?: () => void;
};

const Button = ({
  text,
  color = "primary",
  size = "medium",
  onConfirm,
}: ButtonProps) => {
  return (
    <button
      className={`
        ${styles.btn}
        ${styles.btnFill}
        ${styles[`btn-${color}`]} 
        ${styles[`btn-${size}`]}`}
      onClick={onConfirm}
    >
      {text}
    </button>
  );
};

export default Button;
