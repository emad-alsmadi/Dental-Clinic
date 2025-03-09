import Image from "next/image";
import styles from "./page.module.css";
import hero from "@/public/images/hero.svg";
import Container from "@/components/ui/Container";
import HomeBanner from "@/components/ui/HomeBanner";
import About from "./about/page";
const Home = () => {
  return (
    <div>
      <HomeBanner />
      <Container className="py-10">
        <About />
      </Container>
    </div>
  );
}
export default Home;