'use strict';

(function() {

    var items = [{
            name: 'null',
            weight: 0,
            value: 0
        }, {
            name: 'ball',
            weight: 1,
            value: 5
        }, {
            name: 'oscars',
            weight: 5,
            value: 10,
        }, {
            name: 'bear',
            weight: 3,
            value: 6
        }, {
            name: 'book',
            weight: 2,
            value: 2
        },

    ];

    var W = 7; // Bag Weight capacity

    console.log('Building table...');

    var table = (function() {
        var t = new Array(items.length);
        for (var j = 0; j < items.length; j++) {
            t[j] = new Array(W);
        }
        return t;
    })();

    // Pad the table with 0s
    console.log('Padding table... 0th row');

    for (var i = 0; i <= W; i++) {
        table[0][i] = {
            picked: true,
            value: 0
        };
    }

    console.log('Padding table... 0th column');

    for (var j = 0; j < items.length; j++) {
        table[j][0] = {
            picked: true,
            value: 0
        };
    }

    console.log('Building solution set...');

    for (var i = 1; i <= W; i++) {
        for (var j = 1; j < items.length; j++) {

            var subprobMax = (table[j - 1][i - items[j].weight]) ? table[j - 1][i - items[j].weight].value : 0;
            if (items[j].weight <= i &&
                items[j].value + subprobMax > table[j - 1][i].value) {
                table[j][i] = {
                    picked: true,
                    value: items[j].value + subprobMax
                };
            } else {
                table[j][i] = {
                    picked: false,
                    value: table[j - 1][i].value
                };
            }

        }
    }

    for (var j = 0; j < items.length; j++) {
        var str = '';

        for (var i = 0; i <= W; i++) {
            str += table[j][i].value + '\t';
        }
        console.log(str);
    }


    // Backtracking
    var max = table[items.length-1][W];
    console.log('Max value = ' + max.value);

    var s = W;
    var j = items.length-1;

    var solnArr = [];
    while (s > 0 && j > 0) {
    	while ( max.picked === false ) {
    		j = j - 1;
    		max = table[j][s];
    	}
    	solnArr.push(items[j]);
    	s = s - items[j].weight;
    	j = j - 1;
    	max = table[j][s];
    }

    console.log(solnArr);
})();
