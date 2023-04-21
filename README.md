# Run the app

1. Config HTTPS for the local development environment:

     In this project, we use the `MediaDevices.getUserMedia()` method to prompt the user for permission to use a media input (take a photo) and `Geolocation.getCurrentPosition()` method to get the current position of the device.
     These features (Web APIs) are only available in secure contexts (HTTPS).
     Check the `ssl-certificates/README.md` file to configure HTTPS locally.

2. Run the code

     ```bash
     $ npm start
     ```

# Making a Progressive Web App

- https://create-react-app.dev/docs/making-a-progressive-web-app/
- https://web.dev/progressive-web-apps/
