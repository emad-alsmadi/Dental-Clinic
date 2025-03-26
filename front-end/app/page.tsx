import Image from "next/image";
import styles from "./page.module.css";
import hero from "@/public/images/hero.svg";
import Container from "@/components/ui/Container";
import HomeBanner from "@/components/home/HomeBanner";
import About from "./about/page";
const Home = () => {
  return (
    <div>
      <HomeBanner />
    </div>
  );
}
export default Home;