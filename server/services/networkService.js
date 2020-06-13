const https = require('https')

const restCall = (host, path, method, headers, body) => {
    return new Promise((resolve, reject) => {
        const options = {
            host: host,
            path: path,
            method: method,
            headers: headers,
        }

        const req = https.request(options, function(res){
            console.log(res.statusCode);
            res.setEncoding('utf8');
            let resBody = ''
            
            res.on('data', (data) => {
                resBody += data
            })

            res.on('end', () => {
                resBody = JSON.parse(resBody)
                resolve(resBody)
            })
        })

        req.on('error', (err) => {
            reject(err)
        });
        
        if(body != undefined) {
            req.write(body)
        }

        req.end()
    })
}

module.exports = {
    restCall
}