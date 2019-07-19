//MODELO DE NEURONIO ARTIFICIAL McCulloch-Pitts-Neuron

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

/* EXPLICACAO AND
se a soma dos parametros for 2, ou seja, se tivermos chamando a funcao com o parametro 
threshold = 2, quer dizer que se a soma deles forem 2, o retorno sera 1 (True).

no exemplo o retorno como verdadeiro se da pela logica sum >= options.threshold ? 1 : 0.
Que e o mesmo que sum >= 2 ? 1 : 0; se a soma dos parametros for maior ou igual a dois o retorno e 1 (true)
consulte a tabela verdade do AND.

Tabela Verdade AND
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            0               false
    0	              1		            0               false
    1	              0		            0               false
    1	              1		            1               true
]

obs: sum >= 2 ? 1 : 0 essa forma de teste logico poderia tambem ser expressada como:

if(sum >= 2) {
    return 1
}else{
    return 0
}

é apenas uma expressao mais enchuta do teste logico que o IF é responsavel.
*/

const OR  = makeNeuron({threshold: 1, excitatory: [0,1], inhibitory: []});

/* EXPLICAO OR
Como sabemos o OR é inversamente proporcional a tabela verdade do AND, ou seja, sempre que o valor
resultar em 1, sendo pela tabela verdade a unica forma de no OR retornar false è [0,0], [false,false].
entao teremos:

return sum >= options.threshold ? 1 : 0; => return sum >= 1 ? 1 : 0;

sendo assim pela tabela verdade, sempre que a soma dos parametros for maior ou igual a 1, 
ele sera uma condicao verdadeira, caso contrario sera falsa, conforme a tabela verdade do OR.

Tabela Verdade OR
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            0               false
    0	              1		            1               true
    1	              0		            1               true
    1	              1		            1               true
]
*/


const NOR = makeNeuron({threshold: 0, excitatory: [], inhibitory: [0,1]});

/* EXPLICAO OR

A condicao Logica NOR, nos diz que a unica forma de o retorno, ser positivo e que ambas as condicaoes
devem ser falsa, ou seja, [0,0] => [false,false] sendo assim qualquer outra condicao que contenha o 1, ira ser falso.

no codigo onde esta inputs[i] === 1, podemos ver que se qualquer um dos imputs for 1, nossa condicao ja sera 0 = false.

/*Tabela Verdade NOR
[
    Entrada A	    Entrada B		  Saída            Logico
    0	              0		            1               true
    0	              1		            0               false
    1	              0		            0               false
    1	              1		            0               false
]
*/

console.log(AND([0,1]));
console.log(OR([0,1]));
console.log(NOR([0,1]));





