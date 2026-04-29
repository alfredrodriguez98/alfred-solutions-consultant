import { Hero }        from '@/components/sections/Hero'
import { Stats }       from '@/components/sections/Stats'
import { About }       from '@/components/sections/About'
import { Expertise }   from '@/components/sections/Expertise'
import { CaseStudies } from '@/components/sections/CaseStudies'
import { Playbook }    from '@/components/sections/Playbook'
import { Experience }  from '@/components/sections/Experience'
import { Skills }      from '@/components/sections/Skills'
import { Contact }     from '@/components/sections/Contact'

/**
 * Home page — composing sections in the order that maximises SE portfolio impact:
 *   Hero → Stats → About → Expertise → Case Studies → Playbook → Experience → Skills → Contact
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <About />
      <Expertise />
      <CaseStudies />
      <Playbook />
      <Experience />
      <Skills />
      <Contact />
    </>
  )
}
