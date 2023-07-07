var calcHistory = [];

var planetMap = {
  1: "SUN (சூரியன்)",
  2: "MOON (சந்திரன்)",
  3: "JUPITER (குரு)",
  4: "RAGU (ராகு)",
  5: "MERCURY (புதன்)",
  6: "SUKRAN (சுக்கிரன்)",
  7: "KETHU (கேது)",
  8: "SATURN (சனி)",
  9: "MARS (செவ்வாய்)",
};

function calculateNumericValue() {
  var nameInput = document.getElementById("nameInput");
  var name = nameInput.value;
  if (name === "") {
    alert("Please enter a name");
    return;
  }
  var result = getNumericValue(name);
  var resultElement = document.getElementById("result");
  resultElement.innerHTML =
    "Numeric value of <strong>" +
    name +
    "</strong> is <strong>" +
    result.numericValue +
    "</strong>. <br>Corresponding planet is <strong>" +
    result.planet +
    "</strong>";

  // Add to history
  addToHistory(name, result.numericValue);
}

function addToHistory(name, numericValue) {
  var entry = name + " - " + numericValue;
  calcHistory.push(entry);

  // Update history list
  var historyList = document.getElementById("historyList");
  var entryElement = document.createElement("li");
  entryElement.innerHTML = entry;
  historyList.appendChild(entryElement);
}

function getNumericValue(name) {
  var numerologyTable = {
    1: ["A", "I", "J", "Q", "Y"],
    2: ["B", "K", "R"],
    3: ["C", "G", "L", "S"],
    4: ["D", "M", "T"],
    5: ["E", "H", "N", "X"],
    6: ["U", "V", "W"],
    7: ["O", "Z"],
    8: ["F", "P"],
    9: [],
  };

  var name = name.toUpperCase();
  var numericValue = 0;

  for (var i = 0; i < name.length; i++) {
    var character = name.charAt(i);
    for (var key in numerologyTable) {
      if (
        numerologyTable.hasOwnProperty(key) &&
        numerologyTable[key].includes(character)
      ) {
        numericValue += parseInt(key);
        break;
      }
    }
  }

  while (numericValue > 9) {
    var sum = 0;
    while (numericValue > 0) {
      sum += numericValue % 10;
      numericValue = Math.floor(numericValue / 10);
    }
    numericValue = sum;
  }

  var planet = planetMap[numericValue];

  return { numericValue: numericValue, planet: planet };
}

function handleKeyUp(event) {
  if (event.keyCode === 13) {
    calculateNumericValue();
  }
}

function displayPlanetMap() {
  var planetMapList = document.getElementById("planetMapList");
  for (var key in planetMap) {
    if (planetMap.hasOwnProperty(key)) {
      var planetName = planetMap[key];
      var planetElement = document.createElement("li");
      planetElement.textContent = key + ": " + planetName;
      planetMapList.appendChild(planetElement);
    }
  }
}

// Call the function to display the planet map when the page loads
window.onload = displayPlanetMap;
