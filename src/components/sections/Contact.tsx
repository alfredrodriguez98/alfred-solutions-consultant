'use client'

import { Mail, ExternalLink } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { GradientText } from '@/components/ui/GradientText'

function LinkedInIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  )
}

function GitHubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
    </svg>
  )
}

const LINKS = [
  {
    label:      'LinkedIn',
    href:       'https://www.linkedin.com/in/aalfredrodriguez/',
    IconComp:   LinkedInIcon,
    desc:       'Connect professionally',
    isEmail:    false,
  },
  {
    label:      'GitHub',
    href:       'https://github.com/',
    IconComp:   GitHubIcon,
    desc:       'Explore my code',
    isEmail:    false,
  },
  {
    label:      'Email',
    href:       'mailto:experia.vanac@gmail.com',
    IconComp:   ({ size }: { size?: number }) => <Mail size={size ?? 17} />,
    desc:       'Send a direct message',
    isEmail:    true,
  },
]

export function Contact() {
  return (
    <section id="contact" className="py-32 px-6 bg-[var(--bg-raised)]">
      <div className="max-w-4xl mx-auto">

        <div className="grid md:grid-cols-2 gap-12 items-start">

          {/* Left — heading & CTA */}
          <div>
            <ScrollReveal>
              <p className="text-[11px] font-bold tracking-[2.5px] uppercase text-accent mb-4">Contact</p>
            </ScrollReveal>

            <ScrollReveal delay={0.08}>
              <h2 className="text-[clamp(36px,5.5vw,62px)] font-black tracking-[-3px] leading-[1.02] mb-6">
                Let's build something{' '}
                <GradientText>great</GradientText>
              </h2>
            </ScrollReveal>

            <ScrollReveal delay={0.15}>
              <p className="text-[16px] text-muted leading-[1.7] mb-8 max-w-sm">
                Evaluating digital asset custody, planning an API integration, or exploring what BitGo can do for your institution?
              </p>
            </ScrollReveal>

            <ScrollReveal delay={0.22}>
              <a
                href="mailto:experia.vanac@gmail.com"
                className="inline-flex items-center gap-2.5 px-6 py-3 rounded-full text-[14.5px] font-semibold bg-gradient-to-br from-accent via-accent-violet to-accent-purple text-white shadow-accent-sm hover:shadow-accent-md hover:opacity-95 transition-all duration-200 active:scale-[0.97] press-feedback"
              >
                <Mail size={15} />
                Send a Message
              </a>
            </ScrollReveal>
          </div>

          {/* Right — social link cards */}
          <div className="flex flex-col gap-3 md:pt-10">
            {LINKS.map((link, i) => (
              <ScrollReveal key={link.label} delay={0.1 + i * 0.08} from="right">
                <a
                  href={link.href}
                  target={link.isEmail ? undefined : '_blank'}
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] hover:border-accent/25 hover:bg-[var(--card-bg-hover)] transition-all duration-200 active:scale-[0.98]"
                >
                  <div className="w-10 h-10 rounded-xl bg-accent/8 border border-accent/12 flex items-center justify-center shrink-0 text-accent group-hover:bg-accent/15 group-hover:border-accent/25 transition-all duration-200">
                    <link.IconComp size={17} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[14px] font-semibold text-foreground">{link.label}</p>
                    <p className="text-[12.5px] text-muted">{link.desc}</p>
                  </div>
                  <ExternalLink size={13} className="text-muted/40 group-hover:text-muted transition-colors duration-150 shrink-0" />
                </a>
              </ScrollReveal>
            ))}
          </div>

        </div>

      </div>
    </section>
  )
}
