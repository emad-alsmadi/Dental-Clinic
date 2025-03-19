import Image from "next/image";
import icon1 from "@/public/vifor.svg";
import icon2 from "@/public/tena.svg";
import icon3 from "@/public/lrp.svg";
import icon4 from "@/public/ascensia.svg";

const ClinicPartners = () => {
    return (
        <div className="max-h-screen mx-auto my-20">
            <h1 className="text-2xl font-bold text-center text-darkColor/90">شركاء اودينتال</h1>
            <p className="text-gray-700/80 mt-5 text-center text-sm">ا فخورون بشراكتنا مع مؤسسات رائدة في مجال الصحة الرقمية، مما يمكننا من تقديم خدمات مبتكرة وعالية الجودة المستخدمي برامج الرعاية الصحية عن بعد تعاوننا مع شركائنا يعزز الوصول إلى الرعاية الصحية عن بعد ويساهم في تحسين جودة خدمات الرعاية الصحية</p>
            <div className="flex justify-center gap-8 my-20">
                <Image src={icon1} alt="vifor" />
                <Image src={icon2} alt="tena" />
                <Image src={icon3} alt="lrp" />
                <Image src={icon4} alt="ascensia" />
            </div>
        </div>
    )
}

export default ClinicPartners