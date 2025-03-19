import Slider from "./Slider";
import JoinPlatformDoctors from "./home/JoinPlatformDoctors";
import FAQPage from "./home/Faq";
import ClinicPartners from "./home/ClinicPartners";
import Testimonials from "./Testimoials";
const HomeBanner = () => {
  return (
    <div className="mb-8">
      <div className="w-full h-full">
        <Slider />
        <JoinPlatformDoctors />
        <ClinicPartners />
        <FAQPage />
        <Testimonials />
      </div>
    </div>
  )
}

export default HomeBanner