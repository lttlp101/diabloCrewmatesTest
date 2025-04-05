import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { validateAttributes } from "../../utils/attributeValidator";
import styles from "./CrewmateForm.module.css";

const CrewmateForm = ({ initialData, onSubmit, mode = "create" }) => {
	const navigate = useNavigate();
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

	const [formData, setFormData] = useState({
		name: "",
		category: "",
		strength: 50,
		intelligence: 50,
		willpower: 50,
		dexterity: 50,
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

	const handleNumberChange = (e) => {
		const { name, value } = e.target;
		setFormData((prev) => ({ ...prev, [name]: parseInt(value, 10) }));
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
				// Determine which attribute should be highest based on category
				let primaryAttribute = "";
				switch (formData.category.toLowerCase()) {
					case "barbarian":
						primaryAttribute = "Strength";
						break;
					case "druid":
						primaryAttribute = "Willpower";
						break;
					case "rogue":
					case "spiritborn":
						primaryAttribute = "Dexterity";
						break;
					case "sorcerer":
					case "necromancer":
						primaryAttribute = "Intelligence";
						break;
					default:
						break;
				}

				newErrors.attributes = `For ${formData.category}, the ${primaryAttribute} attribute must be higher than all other attributes`;
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
				<div className={styles.attributesContainer}>
					<h3>Attributes:</h3>

					<div className={styles.attributeGroup}>
						<label className={styles.label}>Strength:</label>
						<input
							type="number"
							name="strength"
							value={formData.strength}
							onChange={handleNumberChange}
							min="10"
							max="100"
							step="10"
							className={styles.numberInput}
						/>
					</div>

					<div className={styles.attributeGroup}>
						<label className={styles.label}>Intelligence:</label>
						<input
							type="number"
							name="intelligence"
							value={formData.intelligence}
							onChange={handleNumberChange}
							min="10"
							max="100"
							step="10"
							className={styles.numberInput}
						/>
					</div>

					<div className={styles.attributeGroup}>
						<label className={styles.label}>Willpower:</label>
						<input
							type="number"
							name="willpower"
							value={formData.willpower}
							onChange={handleNumberChange}
							min="10"
							max="100"
							step="10"
							className={styles.numberInput}
						/>
					</div>

					<div className={styles.attributeGroup}>
						<label className={styles.label}>Dexterity:</label>
						<input
							type="number"
							name="dexterity"
							value={formData.dexterity}
							onChange={handleNumberChange}
							min="10"
							max="100"
							step="10"
							className={styles.numberInput}
						/>
					</div>

					{errors.attributes && (
						<p className={styles.error}>{errors.attributes}</p>
					)}
				</div>
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
						onClick={() => {
							if (
								window.confirm(
									"Are you sure you want to delete this crewmate?"
								)
							) {
								navigate(`/delete/${formData.name}`);
							}
						}}
					>
						Delete Crewmate
					</button>
				)}
			</div>
		</form>
	);
};

export default CrewmateForm;
