import { Button, ButtonRow } from 'jtw-schoolhouse';

export const MainAndGhost = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}>
    <ButtonRow>
      <Button href="#">Work with Jake</Button>
      <Button variant="ghost" href="#">See the framework</Button>
    </ButtonRow>
  </div>
);
export const RedWithIcon = () => <div style={{ padding: 12 }}><Button variant="red" icon="fa-arrow-right">Buy it on Amazon</Button></div>;
export const InkOnYellow = () => (
  <div style={{ background: 'var(--yellow)', padding: 28 }}><Button variant="ink">Join free</Button></div>
);
export const Small = () => <div style={{ padding: 12 }}><Button size="sm">Work with Jake</Button></div>;
export const Disabled = () => <div style={{ padding: 12 }}><Button disabled>Sending...</Button></div>;
