import React, { useState } from 'react';
import styled from '@collinsonx/design-system/styled';
import { Box, Stack, Button, Text } from '@collinsonx/design-system/core';
import router from 'next/router';

// const router = useRouter();

export interface FilterPaneProps {
  isOpen: boolean;
  onClose: () => void;
  onChange: (filters: string[]) => void;
}

interface Facility {
  name: string;
  id: string;
}
const facilities: Facility[] = [
  { name: 'Wifi', id: 'wifi' },
  { name: 'Alcohol', id: 'alcohol' },
  { name: 'Non-smoking', id: 'non-smoking' },
  { name: 'TV', id: 'tv' },
  { name: 'Disabled Access', id: 'disabled-access' },
  { name: 'Telephone', id: 'telephone' },
  { name: 'Shower', id: 'shower' },
  { name: 'Air Conditioner', id: 'air-conditioner' },
  { name: 'News Stand', id: 'news-stand' },
  { name: 'Conference Room', id: 'conference-room' },
];

const FilterWrapper = styled.div`
  background-color: #f5f5f5;
  position: fixed;
  top: 0;
  right: -350px;
  width: 350px;
  bottom: 0;
  transition: right 0.3s ease-out;
  z-index: 2000;
  &.open {
    right: 0;
  }
`;

export default function FilterPane({
  isOpen,
  onChange,
  onClose,
}: FilterPaneProps) {
  const [selectedFacilities, setSelectedFacilities] = useState<string[]>([]);
  const paneClassName = isOpen ? 'filter-pane open' : 'filter-pane';

  const handleAddFacility = (facility: string) => {
    setSelectedFacilities((prevSelectedFacilities) => {
      if (prevSelectedFacilities.includes(facility)) {
        return prevSelectedFacilities.filter(
          (selectedFacility) => selectedFacility != facility
        );
      } else {
        return [...prevSelectedFacilities, facility];
      }
    });
  };

  const applyFilters = () => {
    onClose();
    onChange(selectedFacilities);
  };

  return (
    <FilterWrapper className={paneClassName}>
      <Stack
        style={{ alignItems: 'center', borderBottom: '2px solid #C8C9CA' }}
        spacing={0}
      >
        <Box
          className={'filter-options'}
          mt={60}
          style={{
            backgroundColor: '#F5F5F5',
            borderBottom: '2px solid #C8C9CA',
            width: '100%',
            paddingBottom: '24px',
            display: 'flex',
            justifyContent: 'center',
          }}
        >
          <Button
            style={{ backgroundColor: '#20c997', color: '#25262B' }}
            mr={8}
            w={130.5}
            onClick={applyFilters}
          >
            Apply
          </Button>
          <Button
            onClick={onClose}
            variant="outline default"
            style={{ color: '#25262B', border: '2px solid #25262B ' }}
            ml={8}
            w={130.5}
          >
            Close
          </Button>
        </Box>
        <Box
          style={{
            backgroundColor: '#FFFFFF',
            height: '100%',
            width: '100%',
          }}
          pt={16}
          pl={24}
          pb={24}
          className={'facilities-button'}
        >
          <Text fw={600}>Facilities</Text>

          {facilities.map((facility, index) => (
            <Button
              key={index}
              data-testid="facility-name"
              variant="outline default"
              style={{
                color: '#25262B',
                border: '2px solid #25262B ',
                backgroundColor: selectedFacilities.includes(facility.name)
                  ? '#C8C9CA'
                  : '#FFF',
              }}
              mr={16}
              mt={16}
              className={'facilities-button'}
              onClick={() => handleAddFacility(facility.name)}
            >
              {facility.name}
            </Button>
          ))}
        </Box>
      </Stack>
    </FilterWrapper>
  );
}
