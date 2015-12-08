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
 *  Note: This does not actually split up and make two separate copies of each half of the array. Instead, it uses references to the original.
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
    function mergesort(arr, lo, hi) {
        if (lo < hi) {
            var mid = Math.floor((hi - lo) / 2) + lo;

            console.log('---- Gave Friend 1');
            console.log(arr.slice(lo, mid+1));

            console.log('---- Gave Friend 2');
            console.log(arr.slice(mid+1, hi+1));

            mergesort(arr, lo, mid);
            mergesort(arr, mid + 1, hi);

            console.log('---- Friend 1 gave back');
            console.log(arr.slice(lo, mid+1));

            console.log('---- Friend 2 gave back');
            console.log(arr.slice(mid+1, hi+1));

            arr = assemble(arr, lo, mid, hi);
        }
    }

    // This function assembled two separate arrays into one
    function assemble(arr, lo, mid, hi) {
        // Helper Array to store references
        var helperArr = new Array((hi - lo) + 1);

        var i = 0,
            lo1 = lo,
            lo2 = mid + 1;
        while (i < helperArr.length) {
            /**
             *    There're four cases
             *    1) Both array still have contents and friend1's item is less than friend2's
             *    2) ""                              and friend2's item is less than friend1's
             *    3) friend1's array still has items but friend2's doesn't
             *    4) friend2's array ""              but friend1's doesn't
             */
            if (lo1 <= mid && lo2 <= hi && arr[lo1] <= arr[lo2]) {
                helperArr[i] = arr[lo1++];
            } else if (lo1 <= mid && lo2 <= hi && arr[lo2] <= arr[lo1]) {
                helperArr[i] = arr[lo2];
                lo2++;
            } else if (lo1 <= mid) {
                helperArr[i] = arr[lo1];
                lo1++;
            } else {
                helperArr[i] = arr[lo2];
                lo2++;
            }
            i++;
        }

        // Copy into original array
        for (i = 0; i < helperArr.length; i++) {
            arr[lo] = helperArr[i];
            lo++;
        }
    }

    mergesort(swords, 0, swords.length - 1);

    console.log('--- You finish comparing the swords your friends gave back');
    console.log(swords);

})();
