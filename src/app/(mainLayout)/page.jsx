import Banner from "@/components/Banner";
import FeaturedBooks from "@/components/FeaturedBooks";
import PopularCategories from "@/components/PopularCategories";
import TopLibrarians from "@/components/TopLibrarians";
import WhyChooseUs from "@/components/WhyChooseUs";

export default function Home() {
  return (
    <div>
      <Banner></Banner>
      <FeaturedBooks></FeaturedBooks>
      <TopLibrarians></TopLibrarians>
      <PopularCategories></PopularCategories>
      <WhyChooseUs></WhyChooseUs>
    </div>
  );
}
