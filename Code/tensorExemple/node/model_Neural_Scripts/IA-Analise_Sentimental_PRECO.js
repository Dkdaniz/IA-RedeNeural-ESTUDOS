

const tf = require('@tensorflow/tfjs');

var BTC_USD = require('../../files/data_btc_fiat/btc_usd.json');
var BTC_EUR = require('../../files/data_btc_fiat/btc_eur.json');
var BTC_BRL = require('../../files/data_btc_fiat/btc_brl.json');
var BTC_JPY = require('../../files/data_btc_fiat/btc_jpy.json');
var BTC_DATA = require('../../files/data_btc_fiat/btc_data.json');

require('@tensorflow/tfjs-node-gpu'); 
//require('@tensorflow/tfjs-node');


//setup();
async function setup() {
    const btc_general = await getDataSet(BTC_JPY,BTC_EUR,BTC_BRL)
    const xBtc_usd = await filter(BTC_USD)
    
    var xs = tf.tensor3d(btc_general, [btc_general.length, 3, 1]);
    var ys = tf.tensor2d(xBtc_usd, [xBtc_usd.length, 1]);

    const model = await createModel(3,1)
    train(xs,ys,model,5000);
}   

//imported()
async function imported() {
    const model = await tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/sentimental_words/model.json');
    
    //Btc_eur,Btc_brl,Btc_jpy
    const result = model.predict(tf.tensor3d([[[ 33 ], [ 17 ], [ 21 ]]], [1, 3, 1]));
    const value = parseFloat(result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ',''));
    console.log(value);
    
}

async function createModel(maxLen,vocabularySize) {
    const model = tf.sequential();
    model.add(
    tf.layers.lstm({
        units: 100,
        returnSequences: true,
        recurrentInitializer: "glorotNormal",
        inputShape: [maxLen, vocabularySize]
    })
    );
    model.add(
        tf.layers.dense({
        units: 32,
        activation:'linear' 
        })
    );
    model.add(
    tf.layers.lstm({
        units: 100,
        returnSequences: false,
    })
    );
    model.add(
    tf.layers.dense({ 
        units: 1,
        activation:'linear' 
        })
    );
    model.summary();
    model.compile({ loss: tf.losses.meanSquaredError, optimizer: "rmsprop" });

    return model;
}

async function train(xs,ys,model,epoch) {
    model
    .fit(xs, ys, {epochs: epoch, batch_size:4, validation_split:0.05})
    .then(history => {
    // Use the model to do inference on a data point the model hasn't seen before:
    // Open the browser devtools to see the output
    model.predict(tf.tensor3d([[[ 28 ], [ 18 ], [ 22 ] ]], [1, 3, 1])).print();

    const save = model.save('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/sentimental_words');
  })
  .catch(e => {
    console.log(e.toString());
  });
}

async function getDataSet(jpy,eur,brl) {
    
    const Btc_jpy = await filter(jpy);
    const Btc_eur = await filter(eur);
    const Btc_brl = await filter(brl);

    const data = []
    for (let i = 0; i < Btc_eur.length; i++) {
        let values = [[Btc_eur[i]],[Btc_brl[i]],[Btc_jpy[i]]]
        data.push(values);
    }
    
    return data

}

async function filter(data) {
    const col_x = data.map(function (obj) {
        if(obj.x == '0'){
            return 0;
        }else{
            return obj.x
        }
    });
    return col_x
}

//server()
function server() {
    var express = require("express");
    var app = express();

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });

    app.get("/DATA", (req, res, next) => {
        const col_x = BTC_USD.map(function (obj) {
            if(obj.x == '0'){
                return 0;
            }else{
                return obj.x
            }
        });
        
        var data =[]
        let cont = 0;
        col_x.forEach(element => {
            data.push({x:cont,y:element});
            cont++
        });

        const JSONData = JSON.stringify(data)
    
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.send(JSONData);
    });

    app.get("/PREV", (req, res, next) => {
        const Btc_jpy =  BTC_JPY.map(function (obj) {
            if(obj.x == '0'){
                return 0;
            }else{
                return obj.x
            }
        });
        const Btc_eur =  BTC_EUR.map(function (obj) {
            if(obj.x == '0'){
                return 0;
            }else{
                return obj.x
            }
        });
        const Btc_brl =  BTC_BRL.map(function (obj) {
            if(obj.x == '0'){
                return 0;
            }else{
                return obj.x
            }
        });

        const data = []
        for (let i = 0; i < Btc_eur.length; i++) {
            let values = [[Btc_eur[i]],[Btc_brl[i]],[Btc_jpy[i]]]
            data.push(values);
        }

        var predict =[]

        tf.loadLayersModel('file:///Users/dkdaniz/Documents/projetos/estudos/IA-RedeNeural-ESTUDOS/Code/tensorExemple/modelos_treinados/sentimental_words/model.json')
        .then(model => {
            let cont = 0;
            data.forEach(element => {
                const result = model.predict(tf.tensor3d([element], [1, 3, 1]));
                const value = parseFloat(result.toString().replace('[','').replace(']','').replace(',','').replace('[','').replace(']','').replace('Tensor\n     ',''));
                
                predict.push({x:cont,y:value});
                
                cont++
            });
            
            
            const JSONData = JSON.stringify(predict)
    
            res.setHeader('Access-Control-Allow-Origin', '*');
            res.send(JSONData);
        })
        .catch();
    });
}






     



