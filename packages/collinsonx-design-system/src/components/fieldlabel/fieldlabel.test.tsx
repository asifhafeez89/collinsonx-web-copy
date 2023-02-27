import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import  FieldLabel  from '.';

const mockFn = jest.fn();

describe('<FieldLabel />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders fieldlabel', () => {
        const tree = renderer
            .create(
                <FieldLabel
                    title="Time of arrival"
                    value={"test"}
                    handleClick={mockFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})