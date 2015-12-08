'use strict';

/**
 *  So, you're a Ninja and your Sensei gives you a duffle bag of swords of varying sizes and asks you to sort them.
 *   He asks you to do this as your homework. You also have to go play some Hearthstone tonight, so you want to do it as efficiently as possible.
 *  
 *   So what do you do? You could sort it all using the simple way where we place the smallest in front.
 *   But by doing so, you won't have enough time to play Hearthstone.
 *
 *   Instead, you give half the pack of swords to your buddy Joe and the other half to Annie and ask them to sort it.
 *   It's cool, you can play Hearthstone while they sort it for you. (How resourceful and what nice friends!)
 *
 *   When they get back, you already have the containers for the swords set up.
 *   Joe and Annie both return their respective sorted batches. All you have left to do is to go look at the two batches simulataneously
 *   and compare which should go in the container first in increasing order.
 *
 *   You finish quickly. That wasn't a lot of work. I mean, all you had to do was compare each sword from each batch but that's it!
 *
 *   You end up with a good amount of time to play Hearthstone. Best of all, you had some time to play in between!
 *
 *   Little did you know, Joe and Annie did the exact same thing! That is, split their work in half and get their own friends to sort them!
 *   Joke's on you!
 *
 *  We kept dividing the work by a factor of 2. This gives it logN divisions. Every time the work came back we had to do N comparisons.
 *  Running time: O(NlogN) where N is number of swords
 *
 *  Go forth, Shinobi!
 */

(function() {

    var swords = new Array(8);

    // Fill'er up
    for (var i = 0; i < swords.length; i++) {
        swords[i] = Math.floor(Math.random() * 11);
    }

    console.log('--- Sensei gives you a duffle bag of swords:');
    console.log(swords);

    // This is the main function for the mergesort alg
    function mergesort(arr) {
        if (arr.length <= 1) {
            return arr;
        } else {
            var lo = 0,
                hi = arr.length - 1;

            var mid = Math.floor((hi - lo) / 2);

            var f1 = arr.slice(lo, mid + 1);
            var f2 = arr.slice(mid + 1, hi + 1);

            console.log('---- Gave Friend 1');
            console.log(f1);
            console.log('---- Gave Friend 2');
            console.log(f2);

            var friend1 = mergesort(f1);
            var friend2 = mergesort(f2);

            console.log('---- Friend 1 gave back');
            console.log(friend1);
            console.log('---- Friend 2 gave back');
            console.log(friend2);

            arr = assemble(arr, friend1, friend2);

            console.log('--- Assembled! ');
            console.log(arr);

            return arr;
        }
    }

    // This function assembled two separate arrays into one
    function assemble(arr, friend1, friend2) {
        for (var i = 0; i < arr.length; i++) {
            /**
             *    There're four cases
             *    1) Both array still have contents and friend1's item is less than friend2's
             *    2) ""                              and friend2's item is less than friend1's
             *    3) friend1's array still has items but friend2's doesn't
             *    4) friend2's array ""              but friend1's doesn't
             */
            if (friend1[0] !== undefined && friend2[0] !== undefined) {
                arr[i] = (friend1[0] <= friend2[0]) ? friend1.shift() : friend2.shift(); // Prunes off first element
            } else if (friend1[0] !== undefined) {
                arr[i] = friend1.shift();
            } else {
                arr[i] = friend2.shift();
            }
        }
        return arr;
    }

    var sorted = mergesort(swords);

    console.log('--- You finish comparing the swords your friends gave back');
    console.log(sorted);

})();
