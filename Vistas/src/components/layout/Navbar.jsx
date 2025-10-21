import Logo from "./logo";
import NavLinks from "./NavLinks";
import NavIcons from "./NavIconos";
import BurgerMenu from "./BurgerMenu";

import logo from '../../assets/imagenes/ui/logo.png';

const Navbar = () => {
  return (
    <nav className=" ">
      <div className="flex z-50  py-10 items-center  h-12 md:h-14 lg:h-[84px] sticky ">
        <Logo src={logo} height={100} />
        <NavLinks />
        <NavIcons/>
        
        <BurgerMenu/>
     
      </div>
    </nav>
  );
};

export default Navbar;
