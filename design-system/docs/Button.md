---
category: Actions
---
Pill button in the display face with a thick ink outline and a hard offset shadow that lifts on hover and squashes on press.

- Labels are orders, two to four words: "Book the call", "Join free", "Get the book", "Request the audit", "Work with Jake". Never "Learn more", "Submit", "Get started" or "Click here". No exclamation marks.
- One yellow (main) button per view, a `ghost` beside it for the secondary path. `red` is for buying and sending. `ink` sits on yellow grounds.
- Put pairs in a `ButtonRow`.

```jsx
<ButtonRow>
  <Button href="/consulting">Work with Jake</Button>
  <Button variant="ghost" href="/eight-dominoes">See the framework</Button>
</ButtonRow>
<Button variant="red" icon="fa-arrow-right">Buy it on Amazon</Button>
<Button size="sm">Work with Jake</Button>
```
