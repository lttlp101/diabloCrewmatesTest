// utils/imageHelper.js

import diabloClassesDescription from "../data/diabloClassesDescription";

// Map to hold the imported images
let imageCache = {};

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

// Import all images using Vite's import.meta.glob dynamic import
export const preloadAllImages = async () => {
	if (Object.keys(imageCache).length > 0) return imageCache;

	try {
		// Import images from the assets/images directory
		const images = import.meta.glob("/src/assets/images/*.png");

		for (const path in images) {
			// Extract filename without extension
			const fileName = path
				.split("/")
				.pop()
				.replace(".png", "")
				.toLowerCase();

			try {
				// Dynamically import the image and store it
				const module = await images[path]();
				imageCache[fileName] = module.default;
			} catch (error) {
				console.error(`Error loading image ${path}:`, error);
			}
		}

		return imageCache;
	} catch (error) {
		console.error("Error preloading images:", error);
		return {};
	}
};

// Load a specific image by name
export const loadImage = async (imageName) => {
	if (!imageName) return null;

	const normalizedName = imageName.toLowerCase();

	try {
		// If we've already loaded this image, return it from cache
		if (imageCache[normalizedName]) {
			return imageCache[normalizedName];
		}

		// Otherwise, load all images and then return the one we need
		await preloadAllImages();
		return imageCache[normalizedName] || null;
	} catch (error) {
		console.error(`Error loading image ${imageName}:`, error);
		return null;
	}
};

// Helper to get all available image names
export const getAvailableImageNames = async () => {
	const images = await preloadAllImages();
	return Object.keys(images);
};

// Preload images on module initialization
preloadAllImages().catch(console.error);
