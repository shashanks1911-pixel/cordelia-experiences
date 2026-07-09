import Hero from '../components/home/Hero';
import CategoryRow from '../components/home/CategoryRow';
import FeaturedBento from '../components/home/FeaturedBento';
import HowItWorks from '../components/home/HowItWorks';
import HostCta from '../components/home/HostCta';
import Testimonials from '../components/home/Testimonials';

export default function Home() {
  return (
    <>
      <Hero />
      <CategoryRow />
      <FeaturedBento />
      <HowItWorks />
      <HostCta />
      <Testimonials />
    </>
  );
}
