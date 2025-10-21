// src/components/Navbar/NavIconos.jsx
import IconsButton from "./IconsButton";
import { Link } from "react-router-dom";

// Icono de carrito
const BagIcon = () => (
    <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">0<path d="M12 4.75C12 2.54086 10.2091 0.75 8 0.75C5.79086 0.75 4 2.54086 4 4.75" stroke="black" strokeWidth="1.5" strokeLinecap="round"></path><mask id="mask0_44_9583" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="6" width="17" height="11"><path d="M1.60098 6.72534L3.20098 15.1319H12.801L14.401 6.72534H16.001V16.8132H0.000976562V6.72534H1.60098Z" fill="black"></path></mask><g mask="url(#mask0_44_9583)"><path d="M0.945068 7.56598L2.27867 15.9725H13.7235L15.0571 7.56598H0.945068Z" stroke="black" stroke-width="1.6" stroke-linejoin="round"></path></g></svg>
);

// Icono de usuario
const UserIcon = () => (
  <svg
    className="stroke-current text-black"
    width="17"
    height="19"
    viewBox="0 0 17 19"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="8.59488" cy="4.34" r="3.59" strokeWidth="1.5" />
    <path
      d="M16.19 17.3599C16.19 13.1653 12.7896 9.76489 8.595 9.76489C4.4004 9.76489 1 13.1653 1 17.3599"
      strokeWidth="1.5"
      strokeLinecap="round"
    />
  </svg>
);

// Icono de búsqueda
const SearchIcon = () => (
  <svg
    width="17"
    height="17"
    viewBox="0 0 17 17"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g clipPath="url(#clip0)">
      <path
        d="M16.7383 15.4724C17.0872 15.8213 17.0872 16.3894 16.7383 16.7383C16.3893 17.0872 15.821 17.0872 15.472 16.7383L11.0962 12.3636C10.9217 12.1892 10.613 12.1668 10.4161 12.301C10.4161 12.301 10.2953 12.3949 10.0358 12.5426C9.05593 13.0972 7.91946 13.4193 6.71141 13.4193C3.00671 13.4193 0 10.4134 0 6.70964C0 3.00592 3.00671 0 6.71141 0C10.4161 0 13.4228 3.00592 13.4228 6.70964C13.4228 7.92633 13.0962 9.07144 12.5324 10.0555C12.3848 10.306 12.3043 10.4089 12.3043 10.4089C12.1611 10.6147 12.1879 10.9188 12.3624 11.0933L16.7383 15.4724ZM6.71141 11.63C9.43177 11.63 11.6331 9.42929 11.6331 6.70964C11.6331 3.99 9.43177 1.78924 6.71141 1.78924C3.99105 1.78924 1.78971 3.99 1.78971 6.70964C1.78971 9.42929 3.99105 11.63 6.71141 11.63Z"
        fill="black"
        stroke="black"
        strokeWidth="0.01"
      />
    </g>
    <defs>
      <clipPath id="clip0">
        <rect width="1600" height="900" fill="white" transform="translate(-1431 -61)" />
      </clipPath>
    </defs>
  </svg>
);

const NavIconos = () => {
  return (
    <div className="flex items-center h-full flex-1 gap-5 xl:gap-10 pr-1.5 justify-end xl:pr-[26px] py-2 lg:py-3">
      <IconsButton Icon={SearchIcon} />
      <Link to="/login">
        <IconsButton Icon={UserIcon} />
      </Link>
      <IconsButton Icon={BagIcon} />
    </div>
  );
};

export default NavIconos;
