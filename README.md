# [Memory Game Project](https://roxyi.github.io/fend-project-memory-game/)

## About

This is my submission to Udacity Front-End Web Developer Nanodegree's project:
Memory Game.

It is based on the starter project which has some HTML and CSS styling to display
a static version of the Memory Game project.

I added a modal in HTML code and corresponding styles in CSS code.

In 'js/app.js', I added DOM functions and event listeners to get the info of
elements from DOM and change their attributes based on users' behaviors.

## Notes
1. The shuffleCards function only works when you click the restart button. On an
initial load, the layout is always the same.
2. The time you spend does not affect the rating you get. I may consider to add
a list in the modal to show your best score in terms of the time you spend.
3. When your moves reach 30, you will get 2 stars. When your moves reach 40, you
will get one star. These two numbers are decided arbitrarily. Technically, when
there are 16 cards, in the worst scenario, the best performance is 24 moves. I
added a little bit tolerance to this number, so it is 30.
4. I don't have much experience with performance analysis. The code is not optimized.
As I learn more, I will come back optimize the code.
5. Any bug report is welcome.

## Dependencies
The symbols for cards are created by using [Font Awesome](https://maxcdn.bootstrapcdn.com/font-awesome/4.6.1/css/font-awesome.min.css)

The font used for paragraphs and headers is [Coda from Google Fonts](https://fonts.googleapis.com/css?family=Coda)

