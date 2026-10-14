---
category: Forms
---
Form field written like a typed form: all-caps label, typewriter input on a thick ink underline; textareas are ruled paper.

- Labels are questions in Jake's voice: "Who are you?", "Where do I reply?", "What’s broken? Give me specifics."

```jsx
<Field label="Where do I reply?" type="email" name="email" required />
<Field label="What’s broken? Give me specifics." type="textarea" rows={4} />
```
