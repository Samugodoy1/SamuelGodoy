import Header from './components/Header'
import Hero from './components/Hero'
import Trajetoria from './components/Trajetoria'
import Filosofia from './components/Filosofia'
import Pilares from './components/Pilares'
import CTA from './components/CTA'
import Footer from './components/Footer'
import WhatsAppFloat from './components/WhatsAppFloat'

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Trajetoria />
        <Filosofia />
        <Pilares />
        <CTA />
      </main>
      <Footer />
      <WhatsAppFloat />
    </>
  )
}
