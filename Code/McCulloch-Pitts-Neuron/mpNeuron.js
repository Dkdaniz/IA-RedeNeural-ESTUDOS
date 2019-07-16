
const makeNeuron = options => inputs => {
    for (i of options.inhibitory)
      if (inputs[i] === 1) 
        return 0;

    let sum = 0;
    for (i of options.excitatory)
      sum += inputs[i];
    return sum >= options.threshold ? 1 : 0;
  }



const AND = makeNeuron({threshold: 2, excitatory: [0,1], inhibitory: []});
const OR  = makeNeuron({threshold: 1, excitatory: [0,1], inhibitory: []});
const NOR = makeNeuron({threshold: 0, excitatory: [], inhibitory: [0,1]});



console.log(AND([0,1]));
/*Tabela Verdade AND
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            0               false
    0	              1		            0               false
    1	              0		            0               false
    1	              1		            1               true
]
*/


console.log(OR([0,1]));
/*Tabela Verdade OR
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            0               false
    0	              1		            1               true
    1	              0		            1               true
    1	              1		            1               true
]
*/


console.log(NOR([0,1]));
/*Tabela Verdade NOR
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            1               true
    0	              1		            0               false
    1	              0		            0               false
    1	              1		            0               false
]
*/




