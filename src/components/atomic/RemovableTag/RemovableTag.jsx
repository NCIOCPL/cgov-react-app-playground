import PropTypes from 'prop-types';
import React from 'react';

import './RemovableTag.scss';

const RemovableTag = ({ label, onRemove }) => {
	const handleClick = () => {
		onRemove({ label });
	};

	return (
		<div
			data-testid=".cts-removable-tag"
			className="cts-removable-tag"
			role="option"
			aria-selected="true">
			<span
				data-testid=".cts-removable-tag__label"
				className="cts-removable-tag__label">
				{label}
			</span>
			<button
				data-testid=".cts-removable-tag__button"
				className="cts-removable-tag__button"
				type="button"
				aria-label={`remove ${label}`}
				onClick={handleClick}
				value={label}>
				<span aria-hidden="true">X</span>
			</button>
		</div>
	);
};

RemovableTag.propTypes = {
	label: PropTypes.string,
	onRemove: PropTypes.func,
};

RemovableTag.defaultProps = {
	onRemove: () => {},
};

export default RemovableTag;
