// pages/CrewmateGallery/CrewmateGallery.jsx

import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CrewmateCard from "../../components/CrewmateCard/CrewmateCard";
import { getAllCrewmates } from "../../services/crewmateService";
import styles from "./CrewmateGallery.module.css";

const CrewmateGallery = () => {
	const [crewmates, setCrewmates] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCrewmates = async () => {
			try {
				const data = await getAllCrewmates();
				setCrewmates(data);
			} catch (err) {
				setError("Failed to load crewmates. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrewmates();
	}, []);

	const calculateStats = () => {
		if (!crewmates.length) return null;

		const stats = {
			totalCrewmates: crewmates.length,
			categories: {},
			colors: {},
			primaryAttributes: {
				strength: 0,
				intelligence: 0,
				willpower: 0,
				dexterity: 0,
			},
		};

		crewmates.forEach((crewmate) => {
			// Count by category
			stats.categories[crewmate.category] =
				(stats.categories[crewmate.category] || 0) + 1;

			// Count by color
			stats.colors[crewmate.color] =
				(stats.colors[crewmate.color] || 0) + 1;

			// Count by primary attribute
			if (crewmate.category === "Barbarian") {
				stats.primaryAttributes.strength++;
			} else if (crewmate.category === "Druid") {
				stats.primaryAttributes.willpower++;
			} else if (["Rogue", "Spiritborn"].includes(crewmate.category)) {
				stats.primaryAttributes.dexterity++;
			} else {
				stats.primaryAttributes.intelligence++;
			}
		});

		return stats;
	};

	const stats = calculateStats();

	if (loading) {
		return <div className={styles.loading}>Loading crewmates...</div>;
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	if (!crewmates.length) {
		return (
			<div className={styles.emptyGallery}>
				<h1 className={styles.title}>Your Crewmate Gallery!</h1>
				<p className={styles.emptyMessage}>
					You haven't made a crewmate yet!
				</p>
				<Link to="/create" className={styles.createBtn}>
					Create one here!
				</Link>
			</div>
		);
	}

	return (
		<div className={styles.galleryPage}>
			<h1 className={styles.title}>Your Crewmate Gallery!</h1>

			{stats && (
				<div className={styles.statsSection}>
					<h2>Crew Statistics:</h2>
					<p>Total Crewmates: {stats.totalCrewmates}</p>
					<p>
						Primary Attributes:
						{Object.entries(stats.primaryAttributes)
							.filter(([_, count]) => count > 0)
							.map(
								([attr, count]) =>
									`${
										attr.charAt(0).toUpperCase() +
										attr.slice(1)
									}: ${Math.round(
										(count / stats.totalCrewmates) * 100
									)}%`
							)
							.join(", ")}
					</p>
				</div>
			)}

			<div className={styles.crewmateGrid}>
				{crewmates.map((crewmate) => (
					<CrewmateCard key={crewmate.name} crewmate={crewmate} />
				))}
			</div>
		</div>
	);
};

export default CrewmateGallery;
