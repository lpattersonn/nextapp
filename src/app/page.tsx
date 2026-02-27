import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import AboutCohost from "@/components/AboutCohost";
import FeaturedStays from "@/components/FeaturedStays";
import Location from "@/components/Location";
import LocalFavorites from "@/components/LocalFavorites";
import Testimonials from "@/components/Testimonials";
import Benefits from "@/components/Benefits";
import Instagram from "@/components/Instagram";
import SignUp from "@/components/SignUp";
import ThankYou from "@/components/ThankYou";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <Hero />
      <AboutCohost />
      <FeaturedStays />
      <Location />
      <LocalFavorites />
      <Testimonials />
      <Benefits />
      <Instagram />
      <SignUp />
      <ThankYou />
      <Footer />
    </>
  );
}
