## About

Project build as an entry for Vinted academy.

- Pexels API used for data retrieval.
- Responsive design for 3 screen sizes.
- Infinite scroll.
- A possibility to favourite an item.
- Main functions covered with tests.
- Styling done with scss.
- Lazy-loading images.
- A responsive image solution.
- Error handling.

## Bonus tasks

- Favourites page added.
- Favourites information saved to localstorage and loaded independently from main flow.
- "Load more"" button added for old browsers where Observer API does not work

## To-Do list

- API response caching for bandwith saving.
- Scroll up button when top images are not seen.
- Add more tests.
- Add logging solution like sentry for error catching and reporting.

## How to preview the website

- Set up the environment (.env) file:

  **Linux/mac:**
  cp .env.example .env

  **Windows:**
  copy .env.example .env

- Install dependencies:
  **npm install --production**

- Build:
  **npm run build**

- Run application from build:
  **npm run preview**

- The website should open with this link: 
  **http://localhost:4173**

## Development mode

- Run application in develop mode:

- Install dependencies:
  **npm install**

- Run development mode
  **npm run dev**

- Run tests:
  **npm run test**

- Run tests with UI debug:
  **npm run test:ui**

## Tools used

- [React 19](https://react.dev/)
- [Vite 6](https://github.com/vitejs/vite)
- [Vitest](https://vitest.dev/)
- [Sass](https://github.com/sass/dart-sass)
