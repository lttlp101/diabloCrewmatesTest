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
		warnings.push(
			"Paper armor! A gentle breeze might be your ultimate nemesis."
		);
	}

	if (attributes.intelligence <= 30) {
		warnings.push(
			"All Resistances? What all resistances? You're basically a magical sponge now."
		);
	}

	if (attributes.willpower <= 30) {
		warnings.push(
			"Healing? Band-Aids and wishful thinking won't save you in battle!"
		);
	}

	if (attributes.dexterity <= 30) {
		warnings.push(
			"Dodge chance? More like guaranteed hit piñata for enemy weapons!"
		);
	}

	return warnings;
};
