const tf = require('@tensorflow/tfjs');

var VALUES = require('../files/values.json');
var TRANSACTION = require('../files/transaction.json');

// Optional Load the binding:
require('@tensorflow/tfjs-node-gpu'); 
//require('@tensorflow/tfjs-node');

const yDate = VALUES.map(function (obj) {
    if(obj.x >= 1286668800){return obj.y}
});

const xDate = TRANSACTION.map(function (obj) {
    if(obj.x >= 1286668800){return obj.y}
});

const xs = tf.tensor2d(xDate, [xDate.length,1]);
const ys = tf.tensor2d(yDate, [yDate.length,1]);

//simple model:
async function startModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 1, inputShape: [1], useBias: true}));
    model.add(tf.layers.dense({units: 1, useBias: true}));
    model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse',],});
    return model;
}

//train();
async function train() {
    const model = await startModel();
    
}

//imported()
async function imported() {
    const model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/value_transaction/model.json');
    
    const result = model.predict(tf.tensor2d([320352], [1, 1]));
    const s = result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ','');
    const count = parseFloat(s);
    console.log(count);
}

//trainContinue()
async function trainContinue() {
    var model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/value_transaction/model.json');
    model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse',],});
    
    console.log('Load Model');

    await model.fit(xs, ys,{epochs:100}).then(() => {
        model.predict(tf.tensor2d([372417], [1, 1])).print();
    });

    console.log('trained');

    const save = await model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/value_transaction');

    console.log('saved your model');
}












