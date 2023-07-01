Config HTTPS for the local development environment with [mkcert](https://github.com/FiloSottile/mkcert)

# 1. Install mkcert

Install `mkcert` on macOS with Homebrew:

```bash
$ brew install mkcert
```

Install `mkcert` using the instructions for your operating system from the GitHub repository: https://github.com/FiloSottile/mkcert

# 2. Create a local SSL certificate

```bash
$ mkcert -install
Created a new local CA 💥
Sudo password:
The local CA is now installed in the system trust store! ⚡️
Warning: "certutil" is not available, so the CA can't be automatically installed in Firefox! ⚠️
Install "certutil" with "brew install nss" and re-run "mkcert -install" 👈
```

```bash
$ mkcert localhost 127.0.0.1 192.168.0.101
Note: the local CA is not installed in the Firefox trust store.
Run "mkcert -install" for certificates to be trusted automatically ⚠️

Created a new certificate valid for the following names 📜
 - "localhost"
 - "127.0.0.1"
 - "192.168.0.101"

The certificate is at "./localhost+2.pem" and the key at "./localhost+2-key.pem" ✅

It will expire on 20 July 2025 🗓

```

`localhost+2.pem` and `localhost-key+2.pem` are the certificate and private key files, respectively.

**Warning**: the `rootCA-key.pem` file that mkcert automatically generates gives complete power to intercept secure requests from your machine. Do not share it.

# 3. Move the  certificate files to your project folder

Move the generated `localhost+2.pem` and `localhost+2-key.pem` files to a folder in your React.js project (e.g., `./ssl-certificates`).

# 4. Configure the React development server to use HTTPS and the generated certificates

Open your `package.json` file and add `HTTPS=true SSL_CRT_FILE=path SSL_KEY_FILE=path` to the `"scripts"` section:

```json
"scripts": {
  "start": "HTTPS=true SSL_CRT_FILE=./ssl-certificates/localhost+2.pem SSL_KEY_FILE=./ssl-certificates/localhost+2-key.pem react-scripts start",
},
```

# 5. Restart the development server

```bash
$ npm start

Compiled successfully!

You can now view your-app in the browser.

  Local:            https://localhost:3000
  On Your Network:  https://192.168.0.101:3000
```

Note that your browser may warn you about the self-signed certificate, but you can proceed by adding a security exception or **trusting the certificate**, depending on your browser.