import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import TextInput from '../TextInput';

let errorMessage;
let retMockActionObject;
const inputHelpText = 'We are in test mode';
const labelText = 'Text Input Test';
const placeholderText = 'This is a test';
const mockTextInput = {
	id: 'ti-test',
	inputHelpText,
	label: labelText,
	placeHolder: placeholderText,
};

describe('TextInput component', function () {
	it('TextInput renders with label, placeholder, and help text', function () {
		render(<TextInput {...mockTextInput} />);
		expect(screen.getByLabelText(labelText)).toBeInTheDocument();
		expect(screen.getByPlaceholderText(placeholderText)).toBeInTheDocument();
		expect(screen.getByText(inputHelpText)).toBeInTheDocument();
	});

	it('Enter input text and validate entered text', function () {
		render(<TextInput {...mockTextInput} />);
		const expectedText = 'term';
		const textInput = screen.getByPlaceholderText(placeholderText);
		fireEvent.change(textInput, { target: { value: expectedText } });
		expect(screen.getByDisplayValue(expectedText).value).toBe(expectedText);
	});

	// Test for 'required' prop
	it('should render a required input field when required prop is true', () => {
		render(<TextInput {...mockTextInput} required />);
		const input = screen.getByLabelText(labelText);
		expect(input).toBeRequired();
	});

	// Test for 'disabled' prop
	it('should render a disabled input field when disabled prop is true', () => {
		render(<TextInput {...mockTextInput} disabled />);
		const input = screen.getByLabelText(labelText);
		expect(input).toBeDisabled();
	});

	// Test for 'type' prop
	it('should render an input field with correct type', () => {
		render(<TextInput {...mockTextInput} type="email" />);
		const input = screen.getByLabelText(labelText);
		expect(input).toHaveAttribute('type', 'email');
	});

	// Test for 'value' prop
	it('should render an input field with a default value', () => {
		const value = 'default value';
		render(<TextInput {...mockTextInput} value={value} />);
		const input = screen.getByDisplayValue(value);
		expect(input.value).toBe(value);
	});

	// Test for 'allowedChars' prop
	it('should prevent input of disallowed characters', () => {
		const allowedChars = {
			isValid: (input) => input.match(/^[a-zA-Z]$/),
		};
		render(<TextInput {...mockTextInput} allowedChars={allowedChars} />);
		const input = screen.getByPlaceholderText(placeholderText);
		fireEvent.change(input, { target: { value: '1' } });
		expect(input.value).toBe('');
		fireEvent.change(input, { target: { value: 'a' } });
		expect(input.value).toBe('a');
	});

	// Test for 'labelHidden' prop
	it('should hide label when labelHidden prop is true', () => {
		render(<TextInput {...mockTextInput} labelHidden />);
		expect(screen.queryByText(labelText)).not.toBeInTheDocument();
	});

	// Test for 'modified' prop
	it('should add "ncids-input--modified" class when modified prop is true', () => {
		render(<TextInput {...mockTextInput} modified />);
		const input = screen.getByPlaceholderText(placeholderText);
		expect(input).toHaveClass('ncids-input--modified');
	});

	describe('TextInput with error', function () {
		it('TextInput event handlers ( action, onBlur )', function () {
			const handleBlurEvent = jest.fn();
			const mockActionObject = {
				action: 'mock handler',
				isExecuted: false,
				hasCorrectTargetEventValue: false,
			};
			const mockActionEvent = {
				event: {
					target: {
						value: 'action handler test',
					},
				},
			};

			const actionEventHandler = (event) => {
				const { value } = event.target;
				retMockActionObject = {
					...mockActionObject,
					isExecuted: true,
					hasCorrectTargetEventValue:
						value === mockActionEvent.event.target.value,
				};
			};

			render(
				<TextInput
					action={actionEventHandler}
					allowedChars={{
						isValid: () => true,
					}}
					errorMessage={errorMessage}
					onBlur={handleBlurEvent}
					{...mockTextInput}
				/>
			);
			const textInput = screen.getByPlaceholderText(placeholderText);
			fireEvent.change(textInput, { ...mockActionEvent.event });
			fireEvent.blur(textInput);

			// onBlur event fired once
			expect(handleBlurEvent).toHaveBeenCalledTimes(1);
			// Check action handler passed is fired and validate target value is correct
			expect(retMockActionObject.isExecuted).toBe(true);
			expect(retMockActionObject.hasCorrectTargetEventValue).toBe(true);
		});

		it('Displays error message when error is present', function () {
			const errorMessage = 'You typed in "error" which generated an error';
			render(<TextInput errorMessage={errorMessage} {...mockTextInput} />);

			expect(screen.getByTestId('tid-error')).toBeInTheDocument();
			expect(screen.getByText(errorMessage)).toBeInTheDocument();
		});

		it('Does not display error message when no error is present', function () {
			render(<TextInput {...mockTextInput} />);

			expect(screen.queryByTestId('tid-error')).not.toBeInTheDocument();
		});
	});
});
