require('ts-node')
    .register({
        project: 'tsconfig.test.json'
    })
// .register({
//     project: "tsconfig.test.json",
// })

;
require('../node_modules/.bin/mocha');
