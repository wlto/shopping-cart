# React Shopping Cart
A minimal shopping cart concept built with ReactJS

## [DEMO](https://wlto.github.io/shopping-cart/)

#### What is this?

This shopping cart concept is my attempt to learn the ReactJS library. This is also an example of how data flows in React. Please check out the code for more information.

#### Screenshot

![React Shopping Cart Screenshot](https://github.com/wlto/shopping-cart/blob/master/public/img/screenshot.png)

#### Technology

- HTML & CSS.
- JavaScript (ES6).
- React.
- NodeJS & npm.
- The `create-react-app` template.

#### How to run

1. Download this repo.
2. Install NodeJS and npm.
3. On the terminal, `cd` to the repo.
4. Type `npm install` to install the required dependencies.
5. Type `npm start` to run. The app will show up under a local development server.

> *Disclaimer: This application is just a concept. It is by no mean production-ready. In other words, don't use this for your business.*

#### To-dos

- [x] Refactor code for the add-to-cart functionality.
- [x] Add ability to remove an item from cart.
- [x] Implement the search functionality.
- [x] Data validation for user's inputs.
- [x] Calculation and displaying for total price.
- [x] Refactor code.
- [x] Styling with CSS.
- [ ] Implement the check-out functionality (future).

#### Issues

- Inventory item's index passed by `map()` is mutated when searching. Temporary fix is to add the `itemIndex` property to the items in `data.js`.

#### In-progress

- Optimizing the application.
- Code refactoring.
- Maintaining/Updating dependencies.

#### Observations

- Since in JavaScript objects and arrays are assigned by reference, we must be more careful when mutating the values of objects and arrays.

#### License

MIT License

Copyright (c) 2017 William
