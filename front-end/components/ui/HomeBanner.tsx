import Slider from "./Slider";
import JoinPlatformDoctors from "./JoinPlatformDoctors";
import FAQPage from "./Faq";
import ClinicPartners from "./ClinicPartners";
import Testimonials from "./Testimoials";
import Stats from "./Stats";
const HomeBanner = () => {
  return (
    <div className="mb-8">
      <div className="w-full h-full">
        <Slider />
        <JoinPlatformDoctors />
        <ClinicPartners />
        <FAQPage />
        <Stats />
        <Testimonials />
      </div>
    </div>
  )
}

export default HomeBanner