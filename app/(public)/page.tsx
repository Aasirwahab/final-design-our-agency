import Hero from '@/components/sections/Hero'
import LogoBar from '@/components/sections/LogoBar'
import About from '@/components/sections/About'
import WhyUs from '@/components/sections/WhyUs'
import Services from '@/components/sections/Services'
import FeaturedWork from '@/components/sections/FeaturedWork'
import Stats from '@/components/sections/Stats'
import Testimonials from '@/components/sections/Testimonials'
import OurProcess from '@/components/sections/OurProcess'
import FAQ from '@/components/sections/FAQ'
import CTA from '@/components/sections/CTA'

export default function Home() {
  return (
    <>
      <Hero />
      <LogoBar />
      <About />
      <WhyUs />
      <Services />
      <FeaturedWork />
      <Stats />
      <Testimonials />
      <OurProcess />
      <FAQ />
      <CTA />
    </>
  )
}
