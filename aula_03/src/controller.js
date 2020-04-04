const { nanoid } = require("nanoid");
const { defaultHeaders: headers } = require ("./configs");

const shortUrls = {}

const error = (req, res) => {
    res.writeHead(404, {
        ...headers,
        'Content-Type' : 'application/json'
    });
    res.write(JSON.stringify({
        error: '404',
        data: {
            message: "Not Found",
        },
    }));
    res.end();
}

const options = (req, res) => {
    res.writeHead(204, { ...headers });
    res.end();
}

const post = (req, res) => {
    let body = "";
    req.on('data', (info) => {
        body += info;
    });
    
    req.on('end', () =>{
        const response = {
            error: null,
            data: {
                "base-url": null,
                "short-url": null,
            },
        };

        const reqUrl = (JSON.parse(body)).url;
        const shortUrl = urls[reqUrl];

        if (shortUrl) {
            response.data["base-url"] = reqUrl;
            response.data["short-url"] = shortUrl;
        } else {
            const shortId = nanoid(11);
            response.data["base-url"] = reqUrl;
            response.data["short-url"] = shortId;
            
            urls[reqUrl] = shortId;
            shortUrls[shortId] = reqUrl;
        }
        res.writeHead(200, { 
            ...headers,
            'Content-Type': 'application/json'
        });
        res.write(JSON.stringify(response));
        res.end();
    });
}

const get = (req, res) => {
    //Caso esteja na raiz
    if (req.url === "/") {
        //Passa um Ok
        res.writeHead(200, { 
            ...headers,
            'Content-Type': 'text/plain'
        });
        //Manda um Hello, World!
        res.write("Hello, World!");
        res.end();
        return;
    }

    //Armazenando a url
    const url = req.url.replace("/", "");
    const hasShortUrl = shortUrls[url];
    //Caso não haja uma shortUrl
    if (!hasShortUrl) {
       return error (req, res);
    } else {
        res.writeHead(301, {
            ...headers,
            'Content-Type' : 'application/json',
            'Location': hasShortUrl,
        });
        res.end();

    }
}


module.exports = { options, post, get, error };