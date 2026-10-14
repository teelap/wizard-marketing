import { Button, ButtonRow } from 'jtw-schoolhouse';

export const Centered = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}>
    <ButtonRow center>
      <Button variant="red">Buy it on Amazon</Button>
      <Button variant="ghost">Read more about the book</Button>
    </ButtonRow>
  </div>
);
export const Left = () => (
  <div style={{ background: 'var(--cream)', padding: 28 }}>
    <ButtonRow>
      <Button>Join free</Button>
      <Button variant="ghost">See what's inside</Button>
    </ButtonRow>
  </div>
);
