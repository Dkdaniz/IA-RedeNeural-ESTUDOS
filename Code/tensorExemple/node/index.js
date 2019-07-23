const tf = require('@tensorflow/tfjs');

var VALUES = require('../files/values.json');
var TRANSACTION = require('../files/transaction.json');

// Optional Load the binding:
require('@tensorflow/tfjs-node-gpu'); 
//require('@tensorflow/tfjs-node');

// Train a simple model:
const model = tf.sequential();
model.add(tf.layers.dense({units: 1, inputShape: [1], useBias: true}));
model.add(tf.layers.dense({units: 1, useBias: true}));
model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse'],});

const xDate = VALUES.map(function (obj) {
    if(obj.x >= 1286668800){return obj.y}
});

const yDate = TRANSACTION.map(function (obj) {
    if(obj.x >= 1286668800){return obj.y}
});

//const xDate = [1.1,2.2,3.3,4.4,5.5,6.6,7.709,8.8,9.9,10.10];
//const yDate = [2.2,4.4,6.6,8.8,10.10,12.12,14.14,16.16,18.18,20.20];


const xs = tf.tensor2d(xDate, [xDate.length,1]);
const ys = tf.tensor2d(yDate, [yDate.length,1]);

// num = 6297.87
// num = parseFloat(num.toFixed(2));
 
train();

async function train() {
    model.fit(xs, ys,{epochs:100000}).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        // Open the browser devtools to see the output
        model.predict(tf.tensor2d([10569.00], [1, 1])).print();
    });

    console.log('trained');

    const save = await model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/value_transaction');

    console.log(save);
}





