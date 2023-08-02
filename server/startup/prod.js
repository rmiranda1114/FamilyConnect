const helmet = require('helmet');

module.exports = function(app) {
    app.use(helmet());
    app.use(helmet.crossOriginResourcePolicy({ policy:"cross-origin" }));
    //app.use(compression());
}