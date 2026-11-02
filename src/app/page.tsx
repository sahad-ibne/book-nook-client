import BannerSlider from "@/components/BannerSlider";
import BookStories from "@/components/BookStories";
import HowItWorks from "@/components/HowItWorks";
import NewArrivals from "@/components/NewArrivals";
import NewsArticles from "@/components/NewsArticles";
import BookGenres from "@/components/BookGenres";
export default function Home() {
  return (
    <div>
      <BannerSlider />
      <NewArrivals />
      <HowItWorks />
      <BookGenres />
      <BookStories />
      <NewsArticles />
      <p>Hello, Next.js!</p>
    </div>
  );
}
