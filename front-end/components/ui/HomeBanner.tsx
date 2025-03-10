import Title from "./Title"
import sanityClient from '@sanity/client';
import sanityConfig from '@/sanity.config';
import Slider from "./Slider"
const client = sanityClient({
  projectId: sanityConfig.projectId,
  dataset: sanityConfig.dataset,
  token: sanityConfig.token,
  useCdn: false // تعيين إلى true إذا كنت تريد استخدام شبكة توصيل المحتوى (CDN)
});
client.fetch(`${'*[_type == "product"]'}`).then(posts => {
  console.log('Posts:', posts);
}).catch(err => {
  console.error('Error fetching posts:', err);
});
console.log("client", client)
const HomeBanner = () => {
  return (
    <div className="mb-8">
      <div className="w-full h-full">
        <Slider />
      </div>
    </div>
  )
}

export default HomeBanner