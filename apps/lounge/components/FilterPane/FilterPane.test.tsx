import React from 'react';
import FilterPane, { FilterPaneProps } from './FilterPane';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';

let filterProps: FilterPaneProps;

describe('FilterPane component test', () => {
  const options: string[] = [
    'Wifi',
    'Alcohol',
    'Non-smoking',
    'TV',
    'Disabled Access',
    'Telephone',
    'Shower',
    'Air Conditioner',
    'News Stand',
    'Conference Room',
  ];
  beforeEach(() => {
    filterProps = {
      isOpen: true,
      onClose: jest.fn(),
      onChange: jest.fn(),
    };
    render(<FilterPane {...filterProps} />);
  });

  describe('FilterPane component test', () => {
    it('checks if onChange is called with correct argument if one button is pressed', () => {
      const getFacilitiesElement = screen.getByText('Wifi');
      fireEvent.click(getFacilitiesElement);
      const getApplyButton = screen.getByText('Apply');
      fireEvent.click(getApplyButton);
      expect(filterProps.onChange).toHaveBeenCalledWith(['Wifi']);
      expect(filterProps.onClose).toHaveBeenCalled();
    });

    it('checks if Apply button still works with no argument selected/with no button pressed', () => {
      const getApplyButton = screen.getByText('Apply');
      fireEvent.click(getApplyButton);
      expect(filterProps.onChange).toHaveBeenCalledWith([]);
      expect(filterProps.onClose).toHaveBeenCalled();
    });

    it('checks if onChange is called with all arguments if all buttons are pressed', () => {
      options.forEach((option) => {
        const element = screen.getByText(option);
        fireEvent.click(element);
      });
      const getApplyButton = screen.getByText('Apply');
      fireEvent.click(getApplyButton);
      expect(filterProps.onChange).toHaveBeenCalledWith(options);
      expect(filterProps.onClose).toHaveBeenCalled();
    });

    it('checks if onChange is called with all arguments if all buttons are selected and then unselected', () => {
      options.forEach((option) => {
        const element = screen.getByText(option);
        fireEvent.click(element);
        fireEvent.click(element);
      });
      const getApplyButton = screen.getByText('Apply');
      fireEvent.click(getApplyButton);
      expect(filterProps.onChange).toHaveBeenCalledWith([]);
      expect(filterProps.onClose).toHaveBeenCalled();
    });

    it('Check if Close button works with no options selected', () => {
      const getCloseButton = screen.getByText('Close');
      fireEvent.click(getCloseButton);
      expect(filterProps.onClose).toHaveBeenCalled();
    });
  });
});
