# Frontend Mentor - Time tracking dashboard solution

This is a solution to the [Time tracking dashboard challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/time-tracking-dashboard-UIQ7167Jw). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](#overview)
  - [The challenge](#the-challenge)
  - [Screenshot](#screenshot)
  - [Links](#links)
- [My process](#my-process)
  - [Built with](#built-with)
  - [What I learned](#what-i-learned)
  - [Continued development](#continued-development)
  - [Useful resources](#useful-resources)
- [Author](#author)
- [Acknowledgments](#acknowledgments)

**Note: Delete this note and update the table of contents based on what sections you keep.**

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the site depending on their device's screen size
- See hover states for all interactive elements on the page
- Switch between viewing Daily, Weekly, and Monthly stats

### Screenshot

![](./screenshot.jpg)

Add a screenshot of your solution. The easiest way to do this is to use Firefox to view your project, right-click the page and select "Take a Screenshot". You can choose either a full-height screenshot or a cropped one based on how long the page is. If it's very long, it might be best to crop it.

Alternatively, you can use a tool like [FireShot](https://getfireshot.com/) to take the screenshot. FireShot has a free option, so you don't need to purchase it.

Then crop/optimize/edit your image however you like, add it to your project, and update the file path in the image above.

**Note: Delete this note and the paragraphs above when you add your screenshot. If you prefer not to add a screenshot, feel free to remove this entire section.**

### Links

- Solution URL: https://github.com/Vishika/front-end-mentor/tree/master/time-tracking-dashboard
- Live Site URL: https://time-tracking-dashboard-vish.netlify.app/

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Javacript

### What I learned

When putting a simple border around the image for Jeremy, I noticed that there was a sliver of the background color leaking through so I had to create a white circle and place the image inside it.

```css
.img__border {
  display: block;
  width: 6.4rem;
  height: 6.4rem;
  background-color: var(--color-white);
  border-radius: 100%;
  display: grid;
  place-content: center;
}

.subject__img {
  width: 6rem;
  height: 6rem;
}

/* .subject__img {
  width: 6.4rem;
  height: 6.4rem;
  border-radius: 100%;
  border: 2px solid var(--color-white);
} */
```

For each of the `section.activity`, I couldn't do what I did with the `article.report`, having a sibling element alongside the inner content bubble extend the background of the container bubble.
Instead each sibling element had its own background color, and the container bubble was positioned relative, so the second sibling could stack a little on top of the first one, making the first sibling into a kind of border. This also allowed the "border sibling" to have an overflow of `hidden` so the illustration was only appeared within it.

```css
.activity__border {
  height: var(--space-xxxxl);
  border-radius: var(--space-sm);
  position: relative;
  overflow: hidden;
}

.activity__img {
  position: absolute;
  top: calc(var(--space-xs) * -1);
  right: var(--space-xs);
}

.activity__info {
  position: absolute;
  width: 100%;
  top: var(--space-xxl);
  background-color: var(--color-blue-dark);
  border-radius: var(--space-sm);
}
```

If you want more help with writing markdown, we'd recommend checking out [The Markdown Guide](https://www.markdownguide.org/) to learn more.

**Note: Delete this note and the content within this section and replace with your own learnings.**

### Continued development

Use this section to outline areas that you want to continue focusing on in future projects. These could be concepts you're still not completely comfortable with or techniques you found useful that you want to refine and perfect.

**Note: Delete this note and the content within this section and replace with your own plans for continued development.**

### Useful resources

- [Subheadings](https://css-tricks.com/html-for-subheadings-and-headings/) - This helped me figure out what html and css classes to use for headings and subheadings, something I've always been indicisive about.
- [Example resource 2](https://www.example.com) - This is an amazing article which helped me finally understand XYZ. I'd recommend it to anyone still learning this concept.

**Note: Delete this note and replace the list above with resources that helped you during the challenge. These could come in handy for anyone viewing your solution or for yourself when you look back on this project in the future.**

## Author

- Frontend Mentor - [@vishika](https://www.frontendmentor.io/profile/vishika)

## Acknowledgments

This is where you can give a hat tip to anyone who helped you out on this project. Perhaps you worked in a team or got some inspiration from someone else's solution. This is the perfect place to give them some credit.

**Note: Delete this note and edit this section's content as necessary. If you completed this challenge by yourself, feel free to delete this section entirely.**
