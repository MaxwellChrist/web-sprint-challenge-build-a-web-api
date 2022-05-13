// add middlewares here related to projects
function projectsLogger (req, res, next) {
    console.log(`\nThe method used was ${req.method}\nThe request was to ${req.originalUrl}`);
    next();
}

module.exports = {
    projectsLogger
}