# Door Go App
Door Go — A Crowdsourced App to Enhance Storefront Accessibility for Visually Impaired Individuals.

* Designing a crowdsourced app to enhance storefront accessibility for visually impaired individuals, aiming to build an open-source, accessible map of storefronts, enabling people who are blind or have low vision to navigate the city with greater independence and confidence.
* Through Door Go, volunteers can capture photos of storefronts, identify and label their accessibility features such as door types, doorknobs, ramps and stairs, as well as record the precise location of the entrances. This information is then available to visually impaired individuals - those who are blind or have low vision - allowing them to review the accessibility details of a store's door or a building's entrance, and navigate their way to an exact location.

![Door Go App](https://github.com/Qingquan-Li/doorgo-app/assets/19491358/19904a86-be68-4449-aff9-0855f604a0c3)

## Run the App

1. Config HTTPS for the local development environment:

     In this project, we use the `MediaDevices.getUserMedia()` method to prompt the user for permission to use a media input (take a photo) and `Geolocation.getCurrentPosition()` method to get the current position of the device.
     These features (Web APIs) are only available in secure contexts (HTTPS).
     Check the `ssl-certificates/README.md` file to configure HTTPS locally.

2. Run the code

     ```bash
     $ npm install
     $ npm start
     ```

## Tech Stack

- Frontend:
  - TypeScript/JavaScript
  - React.js
  - Tailwind CSS
- Backend:
  - TypeScript/JavaScript
  - Node.js (Express.js)
- Database:
  - MongoDB (Atlas)
  - Firebase (for image storage and authentication)
- Deployment:
  - Google Cloud Platform
  - Cloudflare Pages (for frontend preview and test)

## Making a Progressive Web App

- https://create-react-app.dev/docs/making-a-progressive-web-app/
- https://web.dev/progressive-web-apps/
