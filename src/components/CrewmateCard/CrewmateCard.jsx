// components/CrewmateCard/CrewmateCard.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { loadImage } from "../../utils/imageHelper";
import styles from "./CrewmateCard.module.css";

const CrewmateCard = ({ crewmate }) => {
	const [image, setImage] = useState(null);

	useEffect(() => {
		const loadCrewmateImage = async () => {
			// Load image based on crewmate category (assumes image file is named after the category)
			try {
				const imagePath = await loadImage(
					crewmate.category.toLowerCase()
				);
				setImage(imagePath);
			} catch (error) {
				console.error("Failed to load crewmate image:", error);
			}
		};

		loadCrewmateImage();
	}, [crewmate.category]);

	// Make sure the color is properly lowercase to match CSS classes
	const colorClass = crewmate.color ? crewmate.color.toLowerCase() : "";

	// Format the URL - replace spaces with underscores if present
	const formattedUrlName = crewmate.name.includes(" ")
		? crewmate.name.replace(/ /g, "_")
		: crewmate.name;

	// Determine primary attribute based on category
	const getPrimaryAttribute = () => {
		if (crewmate.category === "Barbarian") return "Strength";
		if (crewmate.category === "Druid") return "Willpower";
		if (["Rogue", "Spiritborn"].includes(crewmate.category))
			return "Dexterity";
		return "Intelligence";
	};

	return (
		<div className={`${styles.card} ${styles[colorClass]}`}>
			<div className={styles.cardContent}>
				<div className={styles.crewmateImage}>
					{image ? (
						<img
							src={image}
							alt={`${crewmate.category} Crewmate`}
						/>
					) : (
						<div className={styles.imagePlaceholder}></div>
					)}
				</div>
				<div className={styles.crewmateInfo}>
					<p className={styles.infoRow}>
						<span className={styles.label}>Name of Crewmate:</span>
						<span className={styles.value}>{crewmate.name}</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Category:</span>
						<span className={styles.value}>
							{crewmate.category}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Primary Attribute:</span>
						<span className={styles.value}>
							{getPrimaryAttribute()}
						</span>
					</p>

					{/* Attribute rows */}
					<p className={styles.infoRow}>
						<span className={styles.label}>Strength:</span>
						<span className={styles.value}>
							{crewmate.strength}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Intelligence:</span>
						<span className={styles.value}>
							{crewmate.intelligence}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Willpower:</span>
						<span className={styles.value}>
							{crewmate.willpower}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Dexterity:</span>
						<span className={styles.value}>
							{crewmate.dexterity}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Color of Crewmate:</span>
						<span className={styles.value}>{crewmate.color}</span>
					</p>
				</div>

				<div className={styles.cardActions}>
					<Link
						to={`/crewmate/${formattedUrlName}`}
						className={styles.detailsLink}
					>
						View Details
					</Link>
					<Link
						to={`/edit/${formattedUrlName}`}
						className={styles.editLink}
					>
						Edit Crewmate
					</Link>
				</div>
			</div>
		</div>
	);
};

export default CrewmateCard;
