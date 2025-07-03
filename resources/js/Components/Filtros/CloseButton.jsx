export default function CloseButton({ onClick, className = '', ariaLabel }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="14" height="14"
      viewBox="0 0 16 16"
      role="button"
      className={`bi bi-x-lg close-badge ${className}`}
      onClick={onClick}
      aria-label={ariaLabel}
      style={{ cursor: 'pointer' }}
    >
      <path d="M2.146 2.146a.5.5 0 0 1 .708 0L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854a.5.5 0 0 1 0-.708z" />
    </svg>
  );
}
