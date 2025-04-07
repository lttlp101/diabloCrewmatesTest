// pages/CrewmateDetail/CrewmateDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCrewmateByName } from "../../services/crewmateService";
import { getAttributeWarnings } from "../../utils/attributeValidator";
import { getClassImage, getClassDescription } from "../../utils/imageHelper";
import inarius_pop from "../../assets/branding/diablo_inarius_pop.webp";
import styles from "./CrewmateDetail.module.css";

const CrewmateDetail = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [crewmate, setCrewmate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [classImage, setClassImage] = useState(null);
	const [classDescription, setClassDescription] = useState(null);
	const [attributeWarnings, setAttributeWarnings] = useState([]);

	useEffect(() => {
		const fetchCrewmate = async () => {
			try {
				const data = await getCrewmateByName(name);
				if (!data) {
					// If no crewmate found with this name, redirect to NotFound
					navigate("/not-found", { replace: true });
					return;
				}
				setCrewmate(data);

				// Get class image and description
				if (data.category) {
					setClassImage(getClassImage(data.category));
					setClassDescription(getClassDescription(data.category));
				}

				// Check for attribute warnings
				const warnings = getAttributeWarnings({
					strength: data.strength,
					intelligence: data.intelligence,
					willpower: data.willpower,
					dexterity: data.dexterity,
				});
				setAttributeWarnings(warnings);
			} catch (err) {
				setError("Failed to load crewmate. Please try again.");
				console.error(err);
			} finally {
				setLoading(false);
			}
		};

		fetchCrewmate();
	}, [name, navigate]);

	if (loading) {
		return (
			<div className={styles.loading}>Loading crewmate details...</div>
		);
	}

	if (error) {
		return (
			<div className={styles.error}>
				<p>{error}</p>
				<Link to="/gallery" className={styles.backLink}>
					Back to Gallery
				</Link>
			</div>
		);
	}

	// Get the color class (lowercase)
	const colorClass = crewmate.color ? crewmate.color.toLowerCase() : "";

	return (
		<div className={styles.detailPage}>
			<h1 className={styles.title}>Crewmate: {crewmate.name}</h1>

			<div className={`${styles.statsSection} ${styles[colorClass]}`}>
				<h2>Stats:</h2>
				<div className={styles.statsList}>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Category:</span>
						<span className={styles.statValue}>
							{crewmate.category}
						</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Color:</span>
						<span className={styles.statValue}>
							{crewmate.color}
						</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Strength:</span>
						<span className={styles.statValue}>
							{crewmate.strength}
						</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Intelligence:</span>
						<span className={styles.statValue}>
							{crewmate.intelligence}
						</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Willpower:</span>
						<span className={styles.statValue}>
							{crewmate.willpower}
						</span>
					</div>
					<div className={styles.statItem}>
						<span className={styles.statLabel}>Dexterity:</span>
						<span className={styles.statValue}>
							{crewmate.dexterity}
						</span>
					</div>
				</div>
			</div>

			{attributeWarnings.length > 0 && (
				<div className={styles.warningsSection}>
					{attributeWarnings.map((warning, index) => (
						<div key={index} className={styles.warning}>
							⚠️ {warning}
						</div>
					))}
				</div>
			)}

			{classDescription && (
				<div className={`${styles.classSection} ${styles[colorClass]}`}>
					<h3>Class Information:</h3>
					<div className={styles.classContent}>
						{classImage && (
							<img
								src={classImage}
								alt={`${crewmate.category} Class`}
								className={styles.classImage}
							/>
						)}
						<p className={styles.classDescription}>
							{classDescription}
						</p>
					</div>
				</div>
			)}

			<div className={styles.actions}>
				<button
					className={styles.editButton}
					onClick={() => navigate(`/edit/${crewmate.name}`)}
				>
					Wanna edit this Crewmate?
				</button>
				<Link to="/gallery" className={styles.backLink}>
					Back to Gallery
				</Link>
			</div>

			<div className={styles.crewmateVisual}>
				<div
					className={`${styles.crewmateAvatar} ${styles[colorClass]}`}
				>
					<img src={inarius_pop} alt="Diablo Inarius Pop" />
				</div>
			</div>
		</div>
	);
};

export default CrewmateDetail;
