import BannerSlider from "@/components/BannerSlider";
import BookStories from "@/components/BookStories";
import HowItWorks from "@/components/HowItWorks";
import NewsArticles from "@/components/NewsArticles";
export default function Home() {
  return (
    <div>
      <BannerSlider />
      <HowItWorks />
      <BookStories />
      <NewsArticles />
      <p>Hello, Next.js!</p>
    </div>
  );
}
