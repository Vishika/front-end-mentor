# Frontend Mentor - Password generator app solution

This is a solution to the [Password generator app challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/password-generator-app-Mr8CLycqjh). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Useful resources](#useful-resources)
- [Author](#author)

## Overview

### The challenge

Users should be able to:

- Generate a password based on the selected inclusion options
- Copy the generated password to the computer's clipboard
- See a strength rating for their generated password
- View the optimal layout for the interface depending on their device's screen size
- See hover and focus states for all interactive elements on the page

### Screenshot

![](./screenshot.png)

### Links

- Solution URL: https://github.com/Vishika/front-end-mentor/tree/master/password-generator-app
- Live Site URL: https://password-generator-app-vish.netlify.app/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- JavaScript

### What I learned

I hadn't done checkbox styling in a while, I used a resource to scale this polygon when checked.

```css
input[type="checkbox"]::before {
  content: "";
  clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
  transform: scale(0);
}

input[type="checkbox"]:checked::before {
  transform: scale(1);
}
```

At first I tried using the `:has` selector for the password strength visual, but figured out it was just a child selector with `:nth-child` that had a negative

```css
.strength-3 > .bar:nth-child(-n + 3) {
  --bar-border-color: var(--color-strength-3);
  --bar-background-color: var(--color-strength-3);
}
```

I find that SVGs that appear directly in HTML overly clutter the code, and so I like to use `img` tags, however this makes the fill inaccessible. I recently discovered how to colour them anyway using `filter`.

```css
#btn-generate:hover > .svg {
  filter: brightness(0) saturate(100%) invert(76%) sepia(5%) saturate(2472%) hue-rotate(
      76deg
    )
    brightness(116%) contrast(107%);
}
```

### Useful resources

- [Checkbox styling](https://moderncss.dev/pure-css-custom-checkbox-style/) - This helped me understand how to style checkboxes.
- [SVG img tag styling](https://medium.com/@union_io/swapping-fill-color-on-image-tag-svgs-using-css-filters-fa4818bf7ec6) - This helped me understand style svgs
- [Filter colours](https://angel-rs.github.io/css-color-filter-generator/) - This helped me convert hex colours to filters
- [Slider styling](https://blog.logrocket.com/creating-custom-css-range-slider-javascript-upgrades/) - This helped me understand how to style sliders at a basic level.

## Author

- Frontend Mentor - [@vishika](https://www.frontendmentor.io/profile/vishika)
