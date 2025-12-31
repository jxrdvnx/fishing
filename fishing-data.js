// fish-data.js

// Define available fish types
const fishTypes = [
  { name: "Salmon", value: 10, rarity: "common" },
  { name: "Tuna", value: 15, rarity: "uncommon" },
  { name: "Golden Carp", value: 50, rarity: "rare" },
  { name: "Boot", value: 1, rarity: "junk" }
];

// Function to randomly select a fish based on rarity
function getRandomFish() {
  const roll = Math.random();
  if (roll < 0.6) return fishTypes[0];       // 60% chance: Salmon
  else if (roll < 0.85) return fishTypes[1]; // 25% chance: Tuna
  else if (roll < 0.98) return fishTypes[2]; // 13% chance: Golden Carp
  else return fishTypes[3];                  // 2% chance: Boot
}