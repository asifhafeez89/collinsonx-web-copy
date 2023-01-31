import React from 'react';
import {TextareaProps, Textarea } from '@mantine/core';
        
/**
 * Primary UI component for user interaction
 */
export default function InputTextArea({ 
    ...props
}:TextareaProps) {
    return (
        <>
            <Textarea {...props} />
        </>
    );
}
        