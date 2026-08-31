# Goal Description

Implement an infinite scrolling carousel loop where items seamlessly wrap around the screen when scrolling past the last item.

## Proposed Changes

### App.tsx
- Remove the CSS flex layout for the carousel items in \<Home>\.
- Calculate the wrapped position for each DOM item using \gsap.utils.wrap\.
- Apply the wrapped position as an inline absolute \	ransform: translateX()\ for each item based on \scrollY\.
- This ensures the invisible clickable DOM elements physically loop around the screen indefinitely.

### CurvedCard.tsx
- Since the DOM elements will now correctly loop and report their absolute screen positions, remove the redundant \currentLeft -= scrollY;\ subtraction in \CurvedCard\ that was causing desynchronization.
- The 3D cards will automatically follow the looping DOM elements for a perfect seamless infinite 3D carousel!