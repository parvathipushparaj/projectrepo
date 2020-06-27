'use strict';

const Hapi = require('@hapi/hapi');

const init = async () => {

    const server = Hapi.server({
        port: 3000,
        host: 'localhost'
    });

    server.route({
        method: 'POST',
        path: '/',
        handler: (request, h) => {
            var payload = request.payload
            var allArray = []
            var resultParent = []

            for (var position in payload) {
                if (payload.hasOwnProperty(position)) {
                    //  console.log( p +"\n");
                    var resultArray = payload[position]
                    resultArray.forEach(element => {
                        allArray.push(element)
                    });
                }
            }

            allArray.forEach(element => {
                if (element.parent_id == null) {
                    resultParent.push(element)
                }
            });

            allArray.forEach(element => {
        
                resultParent.forEach(resultElement => {
                    if (resultElement.id === element.parent_id) {
                        resultElement.children.push(element)
                    }
                })
            });

            allArray.forEach(element => {
                resultParent.forEach(subElement => {
                    subElement.children.forEach(resultElement => {
                        if (resultElement.id === element.parent_id) {
                            resultElement.children.push(element)
                        }
                    })

                })
            });


            console.log(allArray)

            return resultParent;
        }
    });



    await server.start();
    console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {

    console.log(err);
    process.exit(1);
});

init();