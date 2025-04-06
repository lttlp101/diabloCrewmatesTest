// pages/UpdateCrewmate/UpdateCrewmate.jsx

import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import CrewmateForm from "../../components/CrewmateForm/CrewmateForm";
import {
	getCrewmateByName,
	updateCrewmate,
	deleteCrewmate,
} from "../../services/crewmateService";
import diabloGroupPic from "../../assets/branding/diablo_all_classes.png";
import styles from "./UpdateCrewmate.module.css";

const UpdateCrewmate = () => {
	const { name } = useParams();
	const navigate = useNavigate();
	const [crewmate, setCrewmate] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [successMessage, setSuccessMessage] = useState("");

	useEffect(() => {
		const fetchCrewmate = async () => {
			try {
				const data = await getCrewmateByName(name);
				if (!data) {
					// Redirect to NotFound if crewmate doesn't exist
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

	const handleUpdate = async (updatedData) => {
		try {
			await updateCrewmate(name, updatedData);
			setSuccessMessage("Crewmate updated successfully!");
			// Navigate to the detail page of the updated crewmate
			setTimeout(() => {
				navigate(`/crewmate/${updatedData.name}`);
			}, 1500);
		} catch (err) {
			setError("Failed to update crewmate. Please try again.");
			console.error(err);
		}
	};

	const handleDelete = async () => {
		if (window.confirm("Are you sure you want to delete this crewmate?")) {
			try {
				await deleteCrewmate(name);
				// Navigate to gallery after successful delete
				navigate("/gallery");
			} catch (err) {
				setError("Failed to delete crewmate. Please try again.");
				console.error(err);
			}
		}
	};

	if (loading) {
		return <div className={styles.loading}>Loading crewmate data...</div>;
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

	return (
		<div className={styles.updatePage}>
			<h1 className={styles.title}>Update Your Crewmate :)</h1>

			<div className={styles.crewmateImage}>
				<img src={diabloGroupPic} alt="Diablo All Classes" />
			</div>

			{successMessage && (
				<div className={styles.successMessage}>{successMessage}</div>
			)}

			<div className={styles.currentInfo}>
				<h2>Current Crewmate Info:</h2>
				<p>
					Name: {crewmate.name}, Category: {crewmate.category}, Color:{" "}
					{crewmate.color}
				</p>
			</div>

			<CrewmateForm
				initialData={crewmate}
				onSubmit={handleUpdate}
				mode="update"
			/>

			<div className={styles.actions}>
				<button className={styles.deleteButton} onClick={handleDelete}>
					Delete Crewmate
				</button>
			</div>
		</div>
	);
};

export default UpdateCrewmate;
