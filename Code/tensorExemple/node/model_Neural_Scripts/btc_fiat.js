const tf = require('@tensorflow/tfjs');

var BTC_USD = require('../../files/data_btc_fiat/lastDay/json/usd.json');
var BTC_EUR = require('../../files/data_btc_fiat/lastDay/json/eur.json');
var BTC_BRL = require('../../files/data_btc_fiat/lastDay/json/brl.json');
var BTC_JPY = require('../../files/data_btc_fiat/lastDay/json/jpy.json');

// Optional Load the binding:
require('@tensorflow/tfjs-node-gpu'); 
//require('@tensorflow/tfjs-node');

const xBtc_usd = BTC_USD.map(function (obj) {
    return obj.x
});

const xBtc_eur = BTC_EUR.map(function (obj) {
    return obj.x
});

const xBtc_brl = BTC_BRL.map(function (obj) {
    return obj.x
});

const xBtc_jpy = BTC_JPY.map(function (obj) {
    return obj.x
});

const btc_general = [];
for (let i = 0; i < xBtc_eur.length; i++) {
    let a = [xBtc_eur[i],xBtc_brl[i],xBtc_jpy[i]]
    btc_general.push(a);
}

console.log({btc_general});

const xs = tf.tensor2d(xBtc_eur, [xBtc_eur.length,1]);
const ys = tf.tensor2d(xBtc_usd, [xBtc_usd.length,1]);

//simple model:
async function startModel() {
    const model = tf.sequential();
    model.add(tf.layers.dense({units: 100, inputShape: [1], useBias: true}));
    model.add(tf.layers.dense({units: 1, useBias: true}));
    model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse',],});
    return model;
}

train();
async function train() {
    const model = await startModel();
    await model.fit(xs, ys,{epochs:3000}).then(() => {
        model.predict(tf.tensor2d([30], [1, 1])).print();
    });

    console.log('trained');

    const save = await model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/btc_fiat');

    console.log('saved your model');
}

//imported()
async function imported() {
    const model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/btc_fiat/model.json');
    //eur/brl/jpy
    //40/540
    const result = model.predict(tf.tensor2d([ 30, 18, 20 ], [1, 3]));
    const value = parseFloat(result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ',''));
    console.log(value);
}

//trainContinue()
async function trainContinue() {
    var model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/btc_fiat/model.json');
    model.compile({optimizer: tf.train.adam(), loss: tf.losses.meanSquaredError, metrics: ['mse',],});
    
    console.log('Load Model');
    const xss = tf.tensor2d([ 45, 18, 45 ], [1,3]);
    const yss = tf.tensor2d([71], [1,1]);
    await model.fit(xss, yss,{epochs:1000}).then(() => {
        model.predict(tf.tensor2d([ 36, 61, 17 ], [1, 3])).print();
    });

    console.log('trained');

    const save = await model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/btc_fiat');

    console.log('saved your model');
}












