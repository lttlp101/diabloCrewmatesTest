// components/CrewmateCard/CrewmateCard.jsx

import React from "react";
import { Link } from "react-router-dom";
import styles from "./CrewmateCard.module.css";

const CrewmateCard = ({ crewmate }) => {
	return (
		<div
			className={`${styles.card} ${styles[crewmate.color.toLowerCase()]}`}
		>
			<div className={styles.cardContent}>
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
							{crewmate.category === "Barbarian"
								? "Strength"
								: crewmate.category === "Druid"
								? "Willpower"
								: crewmate.category === "Rogue" ||
								  crewmate.category === "Spiritborn"
								? "Dexterity"
								: "Intelligence"}
						</span>
					</p>

					<p className={styles.infoRow}>
						<span className={styles.label}>Color of Crewmate:</span>
						<span className={styles.value}>{crewmate.color}</span>
					</p>
				</div>

				<div className={styles.cardActions}>
					<Link
						to={`/crewmate/${crewmate.name}`}
						className={styles.detailsLink}
					>
						View Details
					</Link>
					<Link
						to={`/edit/${crewmate.name}`}
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
