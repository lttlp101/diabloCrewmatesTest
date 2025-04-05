// utils/attributeValidator.js

export const validateAttributes = (category, attributes) => {
	const { strength, intelligence, willpower, dexterity } = attributes;

	switch (category.toLowerCase()) {
		case "barbarian":
			return (
				strength > intelligence &&
				strength > willpower &&
				strength > dexterity
			);
		case "druid":
			return (
				willpower > strength &&
				willpower > intelligence &&
				willpower > dexterity
			);
		case "rogue":
		case "spiritborn":
			return (
				dexterity > strength &&
				dexterity > intelligence &&
				dexterity > willpower
			);
		case "sorcerer":
		case "necromancer":
			return (
				intelligence > strength &&
				intelligence > willpower &&
				intelligence > dexterity
			);
		default:
			return false;
	}
};

export const getAttributeWarnings = (attributes) => {
	const warnings = [];

	if (attributes.strength <= 30) {
		warnings.push("Less Armor");
	}

	if (attributes.intelligence <= 30) {
		warnings.push("Less All Resistant");
	}

	if (attributes.willpower <= 30) {
		warnings.push("Less Healing");
	}

	if (attributes.dexterity <= 30) {
		warnings.push("Less Dodge Chance");
	}

	return warnings;
};
