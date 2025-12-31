// game.js

// Canvas setup
const canvas = document.getElementById("game-canvas");
const ctx = canvas.getContext("2d");

// UI elements
const castButton = document.getElementById("cast-button");
const sellButton = document.getElementById("sell-button");
const fishList = document.getElementById("fish-list");
const moneyDisplay = document.getElementById("money");

// Game state
let inventory = [];
let totalMoney = 0;
let rodLevel = 1;
const maxRodLevel = 3;
const upgradeCost = [0, 50, 150, 300];

// Fish types
const fishTypes = [
  { name: "Salmon", value: 10 },
  { name: "Tuna", value: 15 },
  { name: "Golden Carp", value: 50 },
  { name: "Boot", value: 1 }
];

// Draw background
function drawScene() {
  ctx.fillStyle = "#87CEEB"; // Sky
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "#1E90FF"; // Water
  ctx.fillRect(0, canvas.height / 2, canvas.width, canvas.height / 2);

  ctx.fillStyle = "#228B22"; // Grass
  ctx.fillRect(0, canvas.height / 2 - 20, canvas.width, 20);
}

// Get random fish based on rod level
function getRandomFish() {
  const roll = Math.random();
  if (rodLevel === 1) {
    if (roll < 0.6) return fishTypes[0];
    else if (roll < 0.85) return fishTypes[1];
    else if (roll < 0.98) return fishTypes[2];
    else return fishTypes[3];
  } else if (rodLevel === 2) {
    if (roll < 0.5) return fishTypes[0];
    else if (roll < 0.8) return fishTypes[1];
    else if (roll < 0.97) return fishTypes[2];
    else return fishTypes[3];
  } else {
    if (roll < 0.4) return fishTypes[0];
    else if (roll < 0.75) return fishTypes[1];
    else if (roll < 0.95) return fishTypes[2];
    else return fishTypes[3];
  }
}

// Cast line
function castLine() {
  drawScene();
  ctx.fillStyle = "black";
  ctx.fillRect(400, 100, 2, 200); // Line

  const fish = getRandomFish();
  inventory.push(fish);
  updateInventory();

  ctx.fillStyle = "white";
  ctx.font = "20px Arial";
  ctx.fillText(`Caught a ${fish.name}!`, 300, 50);
}

// Sell fish
function sellFish() {
  const earnings = inventory.reduce((sum, fish) => sum + fish.value, 0);
  totalMoney += earnings;
  inventory = [];
  updateInventory();
}

// Upgrade rod
function upgradeRod() {
  if (rodLevel < maxRodLevel && totalMoney >= upgradeCost[rodLevel + 1]) {
    totalMoney -= upgradeCost[rodLevel + 1];
    rodLevel++;
    updateInventory();
    alert(`Rod upgraded to level ${rodLevel}!`);
  } else {
    alert("Not enough money or max level reached.");
  }
}

// Update inventory
function updateInventory() {
  fishList.innerHTML = "";
  inventory.forEach(fish => {
    const li = document.createElement("li");
    li.textContent = `${fish.name} ($${fish.value})`;
    fishList.appendChild(li);
  });
  moneyDisplay.textContent = totalMoney;

  // Show rod level
  const rodInfo = document.getElementById("rod-info");
  if (rodInfo) {
    rodInfo.textContent = `Rod Level: ${rodLevel}`;
  } else {
    const p = document.createElement("p");
    p.id = "rod-info";
    p.textContent = `Rod Level: ${rodLevel}`;
    document.getElementById("inventory").appendChild(p);
  }
}

// Add upgrade button
const upgradeButton = document.createElement("button");
upgradeButton.textContent = "Upgrade Rod";
document.getElementById("controls").appendChild(upgradeButton);

// Event listeners
castButton.addEventListener("click", castLine);
sellButton.addEventListener("click", sellFish);
upgradeButton.addEventListener("click", upgradeRod);

// Start game
drawScene();
updateInventory();