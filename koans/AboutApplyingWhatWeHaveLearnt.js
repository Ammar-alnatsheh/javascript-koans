var _; // globals

describe("About Applying What We Have Learnt", function() {
  var products;

  beforeEach(function () {
    products = [
       { name: "Sonoma", ingredients: ["artichoke", "sundried tomatoes", "mushrooms"], containsNuts: false },
       { name: "Pizza Primavera", ingredients: ["roma", "sundried tomatoes", "goats cheese", "rosemary"], containsNuts: false },
       { name: "South Of The Border", ingredients: ["black beans", "jalapenos", "mushrooms"], containsNuts: false },
       { name: "Blue Moon", ingredients: ["blue cheese", "garlic", "walnuts"], containsNuts: true },
       { name: "Taste Of Athens", ingredients: ["spinach", "kalamata olives", "sesame seeds"], containsNuts: true }
    ];
  });

  /*********************************************************************************/

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (imperative)", function () {
    var i,j,hasMushrooms, productsICanEat = [];

    for (i = 0; i < products.length; i+=1) {
        if (products[i].containsNuts === false) {
            hasMushrooms = false;
            for (j = 0; j < products[i].ingredients.length; j+=1) {
               if (products[i].ingredients[j] === "mushrooms") {
                  hasMushrooms = true;
               }
            }
            if (!hasMushrooms) productsICanEat.push(products[i]);
        }
    }

    expect(productsICanEat.length).toBe(1);
  });

  it("given I'm allergic to nuts and hate mushrooms, it should find a pizza I can eat (functional)", function () {
      var productsICanEat = [];

      /* solve using filter() & all() / any() */

      productsICanEat = products.filter(function(element){
        return element.containsNuts === false && !element.ingredients.some(
          function(el){return el === "mushrooms"; }
          );
      });

      expect(productsICanEat.length).toBe(1);
  });

  /*********************************************************************************/

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (imperative)", function () {
    var sum = 0;

    for(var i=1; i<1000; i+=1) {
      if (i % 3 === 0 || i % 5 === 0) {
        sum += i;
      }
    }

    expect(sum).toBe(233168);
  });

  it("should add all the natural numbers below 1000 that are multiples of 3 or 5 (functional)", function () {
    var sum = _.range(0,1000).reduce(function(sum, el){

      if (el % 3 === 0 || el % 5 === 0) {
        return sum += el;
      }else{
        return sum;
      }

    });   /* try chaining range() and reduce() */

    expect(233168).toBe(sum);
  });

  /*********************************************************************************/
   it("should count the ingredient occurrence (imperative)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    for (i = 0; i < products.length; i+=1) {
        for (j = 0; j < products[i].ingredients.length; j+=1) {
            ingredientCount[products[i].ingredients[j]] = (ingredientCount[products[i].ingredients[j]] || 0) + 1;
        }
    }

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  it("should count the ingredient occurrence (functional)", function () {
    var ingredientCount = { "{ingredient name}": 0 };

    /* chain() together map(), flatten() and reduce() */

    _(products).chain()
              .map(function(el) { return el.ingredients; } )
              .flatten()
              .forEach(function(element) { ingredientCount[element] = (ingredientCount[element] || 0) + 1;})
              .value();

    expect(ingredientCount['mushrooms']).toBe(2);
  });

  /*********************************************************************************/
  /* UNCOMMENT FOR EXTRA CREDIT */

  it("should find the largest prime factor of a composite number", function () {

    var largestPrimeFactor = function(n) {
      var largestFactor,
          factor = 2;

      while (n > 1) {
          if (n % factor === 0) {
              largestFactor = factor;
              n = n / factor;
              while (n % factor === 0) {
                  n = n / factor;
              }
          }

          factor += (factor === 2) ? 1 : 2;
      }

      return largestFactor;
    };

    expect(largestPrimeFactor(600851475143)).toBe(6857);
  });

  it("should find the largest palindrome made from the product of two 3 digit numbers", function () {

    var isPalindrome = function(value){
      return value.toString() == value.toString().split("").reverse().join("");
    }

    //largest palindrome made from the product of two 3 digit numbers
    var largestPalindrome = function(){
      var max = 0;
      for(var i =999; i>100; i--){
        for(var j = 999; j>100; j--){
            var num = j*i;
            if(isPalindrome(num) && num > max){
                max = num;
            }
        }
      }
      return max;
    }

  expect(largestPalindrome()).toBe(906609);
  });

  it("should find the smallest number divisible by each of the numbers 1 to 20", function () {

    var smallestNumber = function(){
      //smallest number div on 1 to 20
      var number = 20;
      // div represent all the numbers from 1 to 20
      // since all numbers divide on 1, 1 will be our stop point
      var div = 20;
      while( div > 1 ){
        if(number % div === 0){
          div --;
        }else{
          number ++;
          div = 20;
        }
      }
      return number;
    };

  expect(smallestNumber()).toBe(232792560);
  });

  it("should find the difference between the sum of the squares and the square of the sums", function () {

    var sumOfSqrVsSquareOfSum = function(first,second){
       return ( (first * 2) + ( second * 2 ) ) - ( (first+second) * 2 );
     };

  expect(sumOfSqrVsSquareOfSum(3,4)).toBe(0);
  });

  it("should find the 10001st prime", function () {
    var first1000Prime = function(){
      var result = [2,3];
      var i = 5;
      while( result.length < 1000 ){
        if( isPrime(i)){
          result.push(i);
        }
        i += 2;
      }
      return result;
    }

    var isPrime = function(value){
      // use start as a counter to save time and memory
      var i = 3;
      while( i < value ){
        if( value % i === 0 ){
          return false;
        }
        i += 2;
      }
      return true;
    }
    var first1000PrimeList = first1000Prime();
  expect(first1000PrimeList[0]=== 2 && first1000PrimeList[999]=== 7919).toBe(true);
  });

});
