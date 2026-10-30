import { Link } from "react-router-dom";

function Button({
  children,
  to,
  variant = "primary",
}) {
  return (
    <Link
      to={to}
      className={`button button-${variant}`}
    >
      {children}
    </Link>
  );
}

export default Button;