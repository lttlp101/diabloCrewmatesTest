// pages/CrewmateDetail/CrewmateDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { getCrewmateByName } from "../../services/crewmateService";
import { getAttributeWarnings } from "../../utils/attributeValidator";
import { getClassImage, getClassDescription } from "../../utils/imageHelper";
import styles from "./CrewmateDetail.module.css";

const CrewmateDetail = () => {
	const { name } = useParams();
	const [crewmate, setCrewmate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchCrewmate = async () => {
			try {
				const data = await getCrewmateByName(name);
				setCrewmate(data);
			} catch (err) {
				setError("Failed to load crewmate. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrewmate();
	}, [name]);

	if (loading) {
		return (
			<div className={styles.loading}>Loading crewmate details...</div>
		);
	}

	if (error) {
		return <div className={styles.error}>{error}</div>;
	}

	if (!crewmate) {
		return <div className={styles.notFound}>Crewmate not found.</div>;
	}

	const warnings = getAttributeWarnings({
		strength: crewmate.strength,
		intelligence: crewmate.intelligence,
		willpower: crewmate.willpower,
		dexterity: crewmate.dexterity,
	});

	const classImage = getClassImage(crewmate.category);
	const classDescription = getClassDescription(crewmate.category);

	return (
		<div className={styles.detailPage}>
			<h1 className={styles.title}>Crewmate: {crewmate.name}</h1>

			<h2 className={styles.statsTitle}>Stats:</h2>
			<div className={styles.statsContainer}>
				<p className={styles.stat}>Category: {crewmate.category}</p>
				<p className={styles.stat}>Color: {crewmate.color}</p>

				<div className={styles.attributes}>
					<p className={styles.attribute}>
						Strength: {crewmate.strength}
					</p>
					<p className={styles.attribute}>
						Intelligence: {crewmate.intelligence}
					</p>
					<p className={styles.attribute}>
						Willpower: {crewmate.willpower}
					</p>
					<p className={styles.attribute}>
						Dexterity: {crewmate.dexterity}
					</p>
				</div>
			</div>

			{warnings.length > 0 && (
				<div className={styles.warningsContainer}>
					<h3>Warnings:</h3>
					<ul className={styles.warningsList}>
						{warnings.map((warning, index) => (
							<li key={index} className={styles.warning}>
								{warning}
							</li>
						))}
					</ul>
				</div>
			)}

			<div className={styles.classInfo}>
				<h3>Class Information:</h3>
				{classImage && (
					<img
						src={classImage}
						alt={`${crewmate.category} class`}
						className={styles.classImage}
					/>
				)}
				{classDescription && (
					<p className={styles.classDescription}>
						{classDescription}
					</p>
				)}
			</div>

			<div className={styles.actions}>
				<Link to={`/edit/${crewmate.name}`} className={styles.editBtn}>
					Wanna edit this Crewmate?
				</Link>
			</div>
		</div>
	);
};

export default CrewmateDetail;
