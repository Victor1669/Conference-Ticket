export default function Logo({ className = "" }) {
  return (
    <img
      className={`logo ${className}`}
      src="/images/logo-full.svg"
      alt="Coding"
    />
  );
}
