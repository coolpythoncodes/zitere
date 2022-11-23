import Layout from "components/layout"
import { Faq, GetStarted, Hero, Why } from "components/sections/home"


const App = () => {
  return (
    <Layout>
      <Hero />
      <section className="py-10">
        
      </section>
      <Why />
      <Faq />
      <GetStarted />
    </Layout>
  )
}

export default App