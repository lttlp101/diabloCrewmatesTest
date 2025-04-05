// utils/imageHelper.js

import diabloClassesDescription from "../data/diabloClassesDescription";

// Function to get class image URL from the class descriptions
export const getClassImage = (category) => {
	const classData = diabloClassesDescription.find(
		(item) => item.category.toLowerCase() === category.toLowerCase()
	);

	return classData ? classData.image : null;
};

// Function to get class description from the class descriptions
export const getClassDescription = (category) => {
	const classData = diabloClassesDescription.find(
		(item) => item.category.toLowerCase() === category.toLowerCase()
	);

	return classData ? classData.description : null;
};

// Import all images from assets/images directory
export const importAllImages = () => {
	const context = import.meta.glob("/src/assets/images/*.png");
	const images = {};

	// Create an object with keys being the filename (without extension)
	// and values being the imported image path
	Object.keys(context).forEach((key) => {
		// Extract filename without path and extension
		const fileName = key.split("/").pop().replace(".png", "");
		images[fileName] = context[key];
	});

	return images;
};

// Create a function to load an image dynamically
export const loadImage = async (imageName) => {
	const images = importAllImages();

	if (images[imageName]) {
		// For Vite/import.meta.glob, we need to dynamically import
		const importedImage = await images[imageName]();
		return importedImage.default;
	}

	console.warn(`Image "${imageName}" not found in assets/images directory.`);
	return null;
};

// Helper to get all available image names
export const getAvailableImageNames = () => {
	const images = importAllImages();
	return Object.keys(images);
};
