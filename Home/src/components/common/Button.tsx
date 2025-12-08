import styles from "@/scss/base.module.scss";

type ButtonProps = {
  text: string;
  color?: string;
};

const Button = ({ text, color = "primary" }: ButtonProps) => {
  return (
    <button
      className={`${styles.btn} ${styles.btnFill} ${styles[`btn-${color}`]}`}
    >
      {text}
    </button>
  );
};

export default Button;
