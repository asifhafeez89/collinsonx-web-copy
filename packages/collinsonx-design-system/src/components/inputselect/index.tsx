import React from 'react';
import {SelectProps, Select } from '@mantine/core';
    
/**
* Primary UI component for user interaction
*/
export default function SelectInput({ 
    ...props
}:SelectProps) {
    return (
        <>
            <Select
                {...props}
                styles={{label: {color: '#000000'}}}
            />

        </>
    );
}
    