// utils/successMetricCalculator.js

export const calculateCrewSuccess = (crewmates) => {
	if (!crewmates.length)
		return {
			score: 0,
			tier: "empty",
			message: "Recruit some crewmates first!",
		};

	// Initialize base score
	let score = 0;

	// 1. Class diversity bonus
	const uniqueClasses = new Set(crewmates.map((c) => c.category));
	const classDiversityScore = (uniqueClasses.size / 6) * 30; // Max 30 points
	score += classDiversityScore;

	// 2. Primary attribute optimization
	const attributeOptimizationScore = crewmates.reduce((sum, crewmate) => {
		let primaryAttr = 0;

		// Determine primary attribute based on class
		if (crewmate.category === "Barbarian") {
			primaryAttr = crewmate.strength;
		} else if (crewmate.category === "Druid") {
			primaryAttr = crewmate.willpower;
		} else if (["Rogue", "Spiritborn"].includes(crewmate.category)) {
			primaryAttr = crewmate.dexterity;
		} else {
			primaryAttr = crewmate.intelligence;
		}

		// Score based on how optimized the primary attribute is (max attribute is 100)
		return sum + (primaryAttr / 100) * 5;
	}, 0);

	score += attributeOptimizationScore;

	// 3. Team size bonus (up to 30 points)
	const sizeScore = Math.min(crewmates.length * 5, 30);
	score += sizeScore;

	// 4. Color diversity (team aesthetic bonus)
	const uniqueColors = new Set(crewmates.map((c) => c.color));
	const colorDiversityScore = (uniqueColors.size / 8) * 10; // Max 10 points
	score += colorDiversityScore;

	// Determine success tier based on final score
	let tier, message;
	if (score < 30) {
		tier = "doomed";
		message = "Your crew would barely survive the first wave of enemies!";
	} else if (score < 50) {
		tier = "struggling";
		message =
			"Your crew might reach the first checkpoint, but the journey ahead looks grim.";
	} else if (score < 70) {
		tier = "promising";
		message =
			"Your crew has potential! With some luck, you might clear the dungeon.";
	} else if (score < 90) {
		tier = "powerful";
		message =
			"Your crew is formidable! The demons of Sanctuary tremble at your approach.";
	} else {
		tier = "legendary";
		message =
			"Your crew is the stuff of legends! Not even the Prime Evils would stand a chance!";
	}

	return {
		score: Math.round(score),
		tier,
		message,
		classDiversity: Math.round(classDiversityScore),
		attributeOptimization: Math.round(attributeOptimizationScore),
		teamSize: Math.round(sizeScore),
		colorDiversity: Math.round(colorDiversityScore),
	};
};
