// pages/about.js
import Image from 'next/image'
import bgImage from "@/public/images/bg-dental-clinic.png"
import dentalImplants1 from "@/public/images/dental-implants.png"
import dentalImplants2 from "@/public/images/dental-implants2.png"
import aboutImage from '@/public/images/about_image_dental.png' // تأكد من وضع الصورة في مجلد public
import { Stethoscope, Microscope, Heart, Hospital, Syringe, Droplet, BriefcaseMedical, Cross, User, Calendar } from 'lucide-react';

const About = () => {
    return (
        <div className="min-h-screen bg-cover bg-center" style={{ backgroundImage: `url(${bgImage.src})` }}>
            {/*  */}
            <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-blue-200 p-6 rounded-lg shadow-md text-center h-80 w-52">
                        <Cross className="mx-auto mb-4" size={50} />
                        <h2 className="text-xl font-bold mb-2">غرف العلاج</h2>
                        <p className="text-sm">
                            عيادتنا مجهزة بالعديد من غرف فحص الأسنان الشامل و زرع الأسنان و تركيبات الأسنان و تجميل الأسنان وتقويم الأسنان
                        </p>
                    </div>
                    <div className="bg-blue-500 p-6 rounded-lg shadow-md text-center">
                        <BriefcaseMedical className="mx-auto mb-4" size={50} />
                        <h2 className="text-xl font-bold mb-2">أطباء الأسنان</h2>
                        <p className="text-sm">
                            توفر لك عيادتنا فريقاً طبياً كفواً ومؤهلاً
                        </p>
                    </div>
                    <div className="bg-darkColor/50 p-6 rounded-lg shadow-md text-center">
                        <Calendar className="mx-auto mb-4" size={50} />
                        <h2 className="text-xl font-bold mb-2">جداولنا</h2>
                        <p className="text-sm">
                            الأحد - الخميس: 08:30 - 21:00<br />
                            الجمعة: 20:30 - 14:30<br />
                            السبت: 21:00 - 08:30
                        </p>
                    </div>
                </div>
            </div>
            {/*  */}
            <div className="bg-white min-h-screen">
                {/* الشعار */}
                <div className="bg-gray-200 p-6 text-center">
                    <h1>عيادة لاموندا لطب الأسنان</h1>
                    <h1 className="text-4xl font-bold">Clinique Dentaire ODental</h1>
                </div>
                {/* الخدمات */}
                <div className="container mx-auto py-12">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* خدمة 1 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Microscope className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">تقويم الأسنان</h2>
                            <p>جماليات الابتسامة</p>
                        </div>

                        {/* خدمة 2 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Hospital className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">الإجراءات بمساعدة الليزر</h2>
                        </div>

                        {/* خدمة 3 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Syringe className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">جراحة الفم</h2>
                        </div>

                        {/* خدمة 4 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Droplet className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">تبييض الأسنان</h2>
                        </div>

                        {/* خدمة 5 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Stethoscope className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">تبييض دواعم السن</h2>
                        </div>

                        {/* خدمة 6 */}
                        <div className="p-6 bg-slate-400 rounded-lg text-center">
                            <Heart  className="mx-auto mb-4" size={50} />
                            <h2 className="text-2xl mt-4">زراعة الأسنان</h2>
                        </div>
                    </div>
                </div>
            </div>
            <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
                <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 space-y-6">
                    <h1 className="text-3xl font-bold text-center">عيادة  اودينتال لطب الأسنان</h1>
                    {/* <Image
                        src={aboutImage}
                        alt="ODental Dental Clinic Promotion"
                        width={350}
                        height={350}
                        className="mx-auto rounded"
                    /> */}
                    <div className="text-lg leading-relaxed">
                        <p>عيادة الأسنان ODental تم تجهيز ODental بالعديد من غرف العلاج، وغرفة عمليات مصممة العمليات الجراحية مع ظروف تعقيم صارمة، وغرفة تعقيم تأتي بأخر معايير النظافة تعقيما، وغرفة خاصة لتعقيم الأسنان.</p>
                        <p>نحن نقدم ساعات طويلة أيام الأسبوع وعطلات نهاية الأسبوع</p>
                        <p>توفق لك عيادتنا فريقاً طبياً كفؤاً وموهوباً، أي، يجمع بين جميع تخصصات طب الأسنان مثل العناية بالأسنان للناشئين والأطفال، وجراحة الفم، وتقويم الأسنان، وجماليات الابتسامة، وطب اللثة، والتجميل، والتدخلات بمساعدة الليزر.</p>
                    </div>
                </div>
            </div>
            {/* final */}
            <div className="bg-gray-100 py-8 min-h-screen flex flex-col items-center justify-center">
                {/* الجزء العلوي من الصفحة */}
                <div className=" p-4">
                    <h1 className="text-3xl text-blue-700 font-bold">ODental <span className="text-xl text-darkColor">رعاية طبية</span></h1>
                </div>
                {/* الجزء الأوسط من الصفحة */}
                <div className="mx-auto pb-8 flex text-center justify-center items-center gap-10">
                    <div className="text-center">
                        <Image src={dentalImplants1} alt="زرع أسنان صناعية" width={350} height={233} className="object-contain" />
                    </div>
                    <div className="text-right">
                        <p className="text-base w-96">
                            زرع الأسنان غرسات الأسنان هي جذور أسنان صناعية، وعادة ما تكون مصنوعة من التيتانيوم القوي للغاية، ويتم إدخالها بعمق في عظم الفك.
                            يعمل مثل جذر السن الطبيعي، مما يساعد على دعم طقم الأسنان أو الأسنان المطابقة له.
                        </p>
                    </div>
                </div>

                {/* الجزء السفلي من الصفحة */}
                <div className="mx-auto flex text-center justify-center items-center gap-10">
                    <div className="text-right">
                        <p className="text-base w-96">
                            إزالة التصبغ بالليزر استعادة ثقتك بنفسك بفضل إزالة التصبغ يوفر لك ODental الليزر.
                        </p>
                    </div>
                    <div className="text-center">
                        <Image src={dentalImplants2} alt="إزالة التصبغ بالليزر" width={350} height={350} className="object-contain" />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About
