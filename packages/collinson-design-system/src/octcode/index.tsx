import React, { useState } from 'react';
import AuthCode from 'react-auth-code-input';
import styled from '@emotion/styled';

const CodeWrapper = styled.div`
    input {
        width: 45px;
        height: 45px;
        padding: 0;
        font-size: 24px;
        text-align: center;
        margin-right: 11px;
        text-transform: uppercase;
        color: #494949;
        font-family: SF Pro Text,SF Pro Icons,Helvetica Neue,Helvetica,Arial,sans-serif;
        border: 1px solid #d6d6d6;
        border-radius: 4px;
        background: #fff;
        background-clip: padding-box;
    }

    input:last-child {
        margin-right: 0px;
    }
`;

export default function Octcode({ ...props }) {
    const [result, setResult] = useState();
    const handleOnChange = (res: string) => {
        setResult(res);
    };

    return (
        <>
            <CodeWrapper> 
                 <AuthCode onChange={handleOnChange} />
            </CodeWrapper>
        </>
    )
}
