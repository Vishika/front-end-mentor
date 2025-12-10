# Frontend Mentor - Loopstudios landing page solution

This is a solution to the [Loopstudios landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/loopstudios-landing-page-N88J5Onjw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page

### Screenshot

![screenshot](./screenshot.png)

### Links

- Solution URL: https://github.com/Vishika/front-end-mentor/tree/master/loopstudios-landing-page
- Live Site URL: https://loopstudios-landing-page-vish.netlify.app/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- SASS
- Flexbox
- CSS Grid
- Mobile-first workflow

### What I learned

A new way to do containers / wrappers

```css
.content-grid {
  $outer-padding: clamp(1.5rem, 0.5458125rem + 4.071vw, 5rem);
  $max-content-width: 8rem;
  display: grid;
  grid-template-columns:
    [full-width-start]
    minmax($outer-padding, 1fr)
    [content-start]
    min((100% - ($outer-padding * 2)), a.rem($max-content-width))
    [content-end]
    minmax($outer-padding, 1fr)
    [full-width-end];
}

.full-width {
  grid-column: full-width;
}

.content-grid > *:not(.full-width) {
  grid-column: content;
}
```

In scss you can nest BEM a little bit better

modern css nesting

```css
.block {
  /* parent styles */
  .block__element {
    /* child of parent styles */
  }
}
```

scss nesting

```css
.block {
  /* parent styles */
  &__element {
    /* child of parent styles */
  }
}
```

I learned that I couldn't use css custom properties in media queries, but I could use sass properties
[css spec](https://www.w3.org/TR/css-variables-1/#using-variables)

I learned more about linear gradients in background images, and how to change them on hover after playing around with values in the mdn docs

```css
.block {
  --overlay: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.6) 25%,
    50%,
    rgba(0, 0, 0, 0) 75%
  );

  background-image: var(--overlay), url("../images/img.jpg");

  &:hover {
    --overlay: linear-gradient(
      rgba(255, 255, 255, 0.5),
      rgba(255, 255, 255, 0.5)
    );
  }
}
```

### Continued development

I'd like an opportunity to use mixins next

## Author

- Frontend Mentor - [@vishika](https://www.frontendmentor.io/profile/vishika)
