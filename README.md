# Live-Drawing

A live collaborative drawing app using node.js, express.js, JQuery, and socket.io. It is deployed at https://obscure-waters-3274.herokuapp.com/. Mobile browser compatible. Please try it (with friends, for maximum effect) for yourself!

If you are so inclined, please submit comments/suggestions as issues or e-mail me at batwood011@gmail.com. Feel free to fork this project and add features, too! If you do, here are a few notes to help you get started:

You must have node.js (http://nodejs.org/) installed in your dev environment.

The most up-to-date server file is express_server.js which, unsurprisingly, uses express.js. To run the server on localhost, simply type 'node express_server.js' while in the project root directory. 

If you are unfamiliar with websockets, you will find their implementation in this project extremely simple. Note, however, that in public/js/drawing.js (the main client logic file) the socket is set to connect to 'https://obscure-waters-3274.herokuapp.com', which is my hosted Heroku version. For development, simply comment that out and uncomment the line below, and your client will open a socket to localhost:80. 
