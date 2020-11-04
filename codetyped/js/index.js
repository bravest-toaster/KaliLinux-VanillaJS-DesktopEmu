const resolver = {
  resolve: function resolve(options, callback) {
    const resolveString = options.resolveString || options.element.getAttribute('data-target-resolver');
    const combinedOptions = Object.assign({}, options, { resolveString: resolveString });
    function getRandomInteger(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min;
    };
    function randomCharacter(characters) {
      return characters[getRandomInteger(0, characters.length - 1)];
    };
    function doRandomiserEffect(options, callback) {
      const characters = options.characters;
      const timeout = options.timeout;
      const element = options.element;
      const partialString = options.partialString;
      let iterations = options.iterations;
      setTimeout(() => {
        if (iterations >= 0) {
          const nextOptions = Object.assign({}, options, { iterations: iterations - 1 });

          if (iterations === 0) {
            element.textContent = partialString;
          } else {
            element.textContent = partialString.substring(0, partialString.length - 1) + randomCharacter(characters);
          }

          doRandomiserEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      }, options.timeout);
    };

    function doResolverEffect(options, callback) {
      const resolveString = options.resolveString;
      const characters = options.characters;
      const offset = options.offset;
      const partialString = resolveString.substring(0, offset);
      const combinedOptions = Object.assign({}, options, { partialString: partialString });

      doRandomiserEffect(combinedOptions, () => {
        const nextOptions = Object.assign({}, options, { offset: offset + 1 });

        if (offset <= resolveString.length) {
          doResolverEffect(nextOptions, callback);
        } else if (typeof callback === "function") {
          callback();
        }
      });
    };

    doResolverEffect(combinedOptions, callback);
  }

 };
 // MICHAEL YOU NEED TO BREAK YOUR BAD HABITS. REMEMBER WE"RE USING AN ARRAY OF STRINGS...DO NOT CHANGE THIS AGAIN
 // Need i remind you that while you find it 'necessary' to do it 'your way' - creating new nodes, creating new elements, appending these child elements
 // to the DOM....OR...setting them there to start and using JS to append new CSS values, or animate them from outside border frames
 // THEY BOTH WORK YES....BUT YOU, YOU DUMBASS, need to start taking bigger things into consideration. Remember the Battelle incident.
 // You may say, find it in good form chap, but bigger projects, clients, with bigger diverse libraries and elements do prioritize speed and availability
 // This may be a few pages, you may over-complicate the hell out of this just because you're a try-hard and have stupid ridiculous standards, BUTTTT
 // Memory usage and speed are not an issue here, you need to start taking this into consideration just across the damn board to implement proper procedures
 // and practices so they're solidified going forward. LESS IS MORE, Complicated and conveluded != cool or good
 // 
const strings = [
'.....',
'Hello Friend...',
'Welcome to the inner sanctum.',
'To prove you\'re authenticity and integrity please continue onward.',
'Prepare to be enlightened',
'Congratulations on your inviation',
'Just go.',
'......'];


let counter = 0;

const options = {
  offset: 1,
  //Time between iterations, only other viable option is 20-89 as above that it's slow AF
  timeout: 0,
  iterations: 30,
  characters: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'x', 'y', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'X', 'Y', ], // String to resolve
  resolveString: strings[counter],
  element: document.querySelector('[data-target-resolver]')

};function callback() {
  setTimeout(() => {
    counter++;
  function endIntro() {
  window.open("terminatorterminal.html", "_parent", true);
  }
//Where to implement changes and transitions. Watcher page should be after this for the 'underground' flipside of the site
    if (counter >= strings.length) {
      counter = 0;
      endIntro();
      // Marker script for timing purposes...Since we're concatenating a dumb amount of loaders, intros, and ladning page screens....     alert("DONE!");
    }

    let nextOptions = Object.assign({}, options, { resolveString: strings[counter] });
    resolver.resolve(nextOptions, callback);
  }, 1000);
}

resolver.resolve(options, callback);