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
model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: tf.metrics.meanSquaredError,});

const xDate = [1,2,3,4,5,6,7];
const yDate = [2,4,6,8,10,12,14];

const xs = tf.tensor2d(xDate, [xDate.length,1]);
const ys = tf.tensor2d(yDate, [yDate.length,1]);
 
train();

async function train() {
    await model.fit(xs, ys,{epochs:25000}).then(() => {
        // Use the model to do inference on a data point the model hasn't seen before:
        // Open the browser devtools to see the output
        const result = model.predict(tf.tensor2d([800], [1, 1]));
        const s = result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ','');
        const count = parseFloat(s);
        console.log(count);
    });

    //const save = await model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/modelGeneric');
}

//imported()

// async function imported() {
//     const model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/modelGeneric/model.json');
    
//     const result = model.predict(tf.tensor2d([50], [1, 1]));
//     const s = result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ','');
//     const count = parseFloat(s);
//     console.log(Math.round(count));
// }






