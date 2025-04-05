// pages/CrewmateDetail/CrewmateDetail.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { getCrewmateByName } from "../../services/crewmateService";
import { getAttributeWarnings } from "../../utils/attributeValidator";
import { getClassImage, getClassDescription } from "../../utils/imageHelper";
import styles from "./CrewmateDetail.module.css";

const CrewmateDetail = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [crewmate, setCrewmate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

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

	// Rest of the component remains the same...
};

export default CrewmateDetail;
