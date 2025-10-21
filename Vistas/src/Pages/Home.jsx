import Navbar from "../components/layout/Navbar";
import Hero from "../components/home/Hero";
import MiniProyectos from "../components/home/MiniProyectos";
import Beneficios from "../components/home/Beneficios";
import Footer from "../components/layout/Footer";
import ProductosDestacados from "../components/home/ProductosDestacados";
const Home = () => {
 return (
    <>
    <Navbar/>
    <Hero/>
    <MiniProyectos/>
    <Beneficios/>
    <ProductosDestacados/>
    <Footer/>

    </>
 )
};

export default Home;
