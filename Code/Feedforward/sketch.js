var train = true;

function setup() {
    createCanvas(500, 500);
    background(0);

    nn = new RedeNeural(2, 3, 1);

    // XOR Problem
    dataset = {
        inputs:
            [[1, 5],
            [3, 4],
            [6, 2],
            [8, 1]],
        outputs:
            [[6],
            [7],
            [8],
            [9]]
    }
}

function draw() {
    if (train) {
        for (var i = 0; i < 10000; i++) {
            var index = floor(random(4));
            nn.train(dataset.inputs[index], dataset.outputs[index]);
            console.log(index);
        }
        
        
        if (nn.predict([1, 5])[6] < 0.6 && nn.predict([8, 1])[9] > 0.99) {
            
            train = false;
            console.log("terminou");
        }
    }
}

