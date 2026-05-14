import Navigation from '@/components/layout/Navigation'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/home/Hero'
import Services from '@/components/home/Services'
import About from '@/components/home/About'
import TrustSignals from '@/components/home/TrustSignals'
import CityBanner from '@/components/home/CityBanner'
import Articles from '@/components/home/Articles'
import ContactSection from '@/components/shared/ContactSection'

export default function HomePage() {
  return (
    <>
      <Navigation />
      <main>
        <Hero />
        <Services />
        <About />
        <TrustSignals />
        <CityBanner />
        <Articles />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
