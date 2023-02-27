import * as React from 'react';
import renderer from 'react-test-renderer';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import  Button  from '.';

const mockFn = jest.fn();

describe('<Button />', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });


    it('renders text-primary', () => {
        const tree = renderer
            .create(
                <Button
                    variant="outline"
                    color="dark"
                    fullWidth={true}
                    handleClick={mockFn}
                />
            )
            .toJSON();
        expect(tree).toMatchSnapshot();
    });
})