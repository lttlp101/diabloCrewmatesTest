// utils/imageHelper.js

import diabloClassesDescription from "../data/diabloClassesDescription";

export const getClassImage = (category) => {
	const classData = diabloClassesDescription.find(
		(item) => item.category.toLowerCase() === category.toLowerCase()
	);

	return classData ? classData.image : null;
};

export const getClassDescription = (category) => {
	const classData = diabloClassesDescription.find(
		(item) => item.category.toLowerCase() === category.toLowerCase()
	);

	return classData ? classData.description : null;
};
