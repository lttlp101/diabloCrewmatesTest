// components/CrewmateForm/CrewmateForm.jsx

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateAttributes } from "../../utils/attributeValidator";
import styles from "./CrewmateForm.module.css";

const attributeOptions = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
const categories = [
	"Barbarian",
	"Sorcerer",
	"Necromancer",
	"Rogue",
	"Druid",
	"Spiritborn",
];
const colors = [
	"Red",
	"Green",
	"Blue",
	"Purple",
	"Yellow",
	"Orange",
	"Pink",
	"Rainbow",
];

const CrewmateForm = ({ initialData, onSubmit, mode = "create" }) => {
	const navigate = useNavigate();
	const [formData, setFormData] = useState({
		name: "",
		category: "",
		strength: 10,
		intelligence: 10,
		willpower: 10,
		dexterity: 10,
		color: "Red",
		...initialData,
	});

	const [errors, setErrors] = useState({});

	useEffect(() => {
		if (initialData) {
			setFormData(initialData);
		}
	}, [initialData]);

	const handleChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: value }));
	};

	const handleAttributeChange = (attribute, value) => {
		setFormData((prev) => ({ ...prev, [attribute]: parseInt(value) }));
	};

	const validateForm = () => {
		const newErrors = {};

		if (!formData.name.trim()) {
			newErrors.name = "Name is required";
		}

		if (!formData.category) {
			newErrors.category = "Category is required";
		} else {
			const attributes = {
				strength: formData.strength,
				intelligence: formData.intelligence,
				willpower: formData.willpower,
				dexterity: formData.dexterity,
			};

			if (!validateAttributes(formData.category, attributes)) {
				newErrors.attributes = `For ${formData.category}, the primary attribute must be the highest`;
			}
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (validateForm()) {
			onSubmit(formData);
		}
	};

	return (
		<form className={styles.form} onSubmit={handleSubmit}>
			<div className={styles.formGroup}>
				<label className={styles.label}>Name:</label>
				<input
					type="text"
					name="name"
					value={formData.name}
					onChange={handleChange}
					className={styles.input}
					placeholder="Enter crewmate's name"
				/>
				{errors.name && <p className={styles.error}>{errors.name}</p>}
			</div>

			<div className={styles.formGroup}>
				<label className={styles.label}>Category:</label>
				<select
					name="category"
					value={formData.category}
					onChange={handleChange}
					className={styles.select}
				>
					<option value="">Select a category</option>
					{categories.map((category) => (
						<option key={category} value={category}>
							{category}
						</option>
					))}
				</select>
				{errors.category && (
					<p className={styles.error}>{errors.category}</p>
				)}
			</div>

			{formData.category && (
				<>
					<div className={styles.attributesContainer}>
						<h3>Attributes:</h3>
						<div className={styles.attributeGroup}>
							<label>Strength:</label>
							<div className={styles.attributeOptions}>
								{attributeOptions.map((value) => (
									<button
										key={`str-${value}`}
										type="button"
										className={`${styles.attributeBtn} ${
											formData.strength === value
												? styles.selected
												: ""
										}`}
										onClick={() =>
											handleAttributeChange(
												"strength",
												value
											)
										}
									>
										{value}
									</button>
								))}
							</div>
						</div>

						<div className={styles.attributeGroup}>
							<label>Intelligence:</label>
							<div className={styles.attributeOptions}>
								{attributeOptions.map((value) => (
									<button
										key={`int-${value}`}
										type="button"
										className={`${styles.attributeBtn} ${
											formData.intelligence === value
												? styles.selected
												: ""
										}`}
										onClick={() =>
											handleAttributeChange(
												"intelligence",
												value
											)
										}
									>
										{value}
									</button>
								))}
							</div>
						</div>

						<div className={styles.attributeGroup}>
							<label>Willpower:</label>
							<div className={styles.attributeOptions}>
								{attributeOptions.map((value) => (
									<button
										key={`will-${value}`}
										type="button"
										className={`${styles.attributeBtn} ${
											formData.willpower === value
												? styles.selected
												: ""
										}`}
										onClick={() =>
											handleAttributeChange(
												"willpower",
												value
											)
										}
									>
										{value}
									</button>
								))}
							</div>
						</div>

						<div className={styles.attributeGroup}>
							<label>Dexterity:</label>
							<div className={styles.attributeOptions}>
								{attributeOptions.map((value) => (
									<button
										key={`dex-${value}`}
										type="button"
										className={`${styles.attributeBtn} ${
											formData.dexterity === value
												? styles.selected
												: ""
										}`}
										onClick={() =>
											handleAttributeChange(
												"dexterity",
												value
											)
										}
									>
										{value}
									</button>
								))}
							</div>
						</div>
					</div>

					{errors.attributes && (
						<p className={styles.error}>{errors.attributes}</p>
					)}
				</>
			)}

			<div className={styles.formGroup}>
				<label className={styles.label}>Color:</label>
				<div className={styles.colorOptions}>
					{colors.map((color) => (
						<label key={color} className={styles.colorLabel}>
							<input
								type="radio"
								name="color"
								value={color}
								checked={formData.color === color}
								onChange={handleChange}
								className={styles.colorInput}
							/>
							<span
								className={`${styles.colorRadio} ${
									styles[color.toLowerCase()]
								}`}
							></span>
							{color}
						</label>
					))}
				</div>
			</div>

			<div className={styles.formActions}>
				<button type="submit" className={styles.submitBtn}>
					{mode === "create" ? "Create Crewmate" : "Update Crewmate"}
				</button>

				{mode === "update" && (
					<button
						type="button"
						className={styles.deleteBtn}
						onClick={() => navigate(`/delete/${formData.name}`)}
					>
						Delete Crewmate
					</button>
				)}
			</div>
		</form>
	);
};

export default CrewmateForm;
