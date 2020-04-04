const controller = require ("./controller");

const app = (req, res) => {
    switch (req.method) {
        case "OPTIONS":
            controller.options (req, res);
            break;

        case "POST":
            controller.post (req, res);
            break;

        case "GET":
            controller.get (req, res);
            break;

        default:
            controller.error (req, res);
            break;
    }
};

module.exports = app;