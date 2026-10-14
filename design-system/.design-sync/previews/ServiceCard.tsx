import { ServiceCard } from 'jtw-schoolhouse';

export const Consulting = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><div style={{ maxWidth: 380 }}>
    <ServiceCard title="Private consulting" color="red" icon="consulting" tag="From $400" cta="Book a session" href="#">
      One-on-one strategy. Find the bottleneck, fix the message, compound the results.
    </ServiceCard>
  </div></div>
);
export const Mastermind = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><div style={{ maxWidth: 380 }}>
    <ServiceCard title="The Mastermind" color="teal" icon="mastermind" tag="Free to join" cta="See what's inside" href="#">
      The Eight Dominoes community. Membership adds group consulting with Jake twice a week.
    </ServiceCard>
  </div></div>
);
export const Book = () => (
  <div style={{ background: 'var(--cream)', padding: 24 }}><div style={{ maxWidth: 380 }}>
    <ServiceCard title="Eight Dominoes" color="yellow" icon="dominoes" tag="Out now" cta="Get the book" href="#">
      The messaging framework that compounds into awesome clients. Out now in paperback and Kindle.
    </ServiceCard>
  </div></div>
);
