import styles from "@/scss/badge.module.scss";

type BadgeProps = {
  label: string;
  color?: string;
  variant?: "outline" | "solid";
};

const Badge = ({
  label,
  color = "#64748b",
  variant = "outline",
}: BadgeProps) => {
  return (
    <span
      className={`${styles.badge} ${variant === "solid" ? styles.solid : ""}`}
      style={{ "--badge-color": color } as React.CSSProperties}
    >
      {label}
    </span>
  );
};

export default Badge;
