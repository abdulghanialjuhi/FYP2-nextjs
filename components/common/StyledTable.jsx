import React from 'react';
import styled from 'styled-components';
import Image from 'next/image';

// Define styled components
const TableWrapper = styled.div`
    width: 100%;
    overflow-x: auto;
    // box-shadow: 0px 2px 7px -4px rgba(0,0,0,0.75);
    background-color: #fff;
    padding: 10px;
    border-raduis: 10px;
    border: 1px solid #e5e5e5;
    max-height: 500px;
    overflow: scroll;
`;
    
const Table = styled.table`
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 16px;
`;

const TableHeader = styled.th`
    // background-color: #f2f2f2;
    padding: 12px;
    text-align: left;
    border: none;
`;

const TableHeaderOption = styled.th`
    padding: 12px;
    text-align: center;
    border: none;
    // max-width: 50px;
    // width: auto;
`;

const TableData = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    border: none;
`;

const TableDataOption = styled.td`
    padding: 12px;
    border-bottom: 1px solid #ddd;
    border: none;
    text-align: center;
`;

const OptionIconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`
    
const SpanIcon = styled.button`
    cursor: pointer;
    padding: 0 5px;
    background-color: transparent;
    border: none;

    &:disabled {
        color: #7f8c8d;
        cursor: not-allowed;
    }
`

// Reusable Table component
const StyledTable = ({ columns, data, options=[] }) => {
    return (
        <TableWrapper>
            <Table>
                <thead>
                    <tr>
                        {columns.map((column, index) => (
                        <TableHeader key={index}>{column.headerName}</TableHeader>
                        ))}
                        {options.length > 0 && options.map((option) => (
                            <TableHeaderOption key={option.name}>
                                {option.name}
                            </TableHeaderOption>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row) => (
                        <tr key={row._id}>
                            {columns.map((column, colIndex) => (
                                    <TableData key={colIndex}>
                                        {column.field === 'photo' ? (
                                            <div className='flex'>
                                                <Image alt='barber' width={30} height={30} src={row[column.field]?.blob ? URL.createObjectURL(row[column.field]?.blob) : '/anonymous.png'} />
                                            </div>
                                        ) : (
                                            <>{row[column.field]}</>
                                        )}
                                    </TableData>
                                )
                            )}
                            {options.length > 0 && options.map((option) => (
                                <TableDataOption key={option.name}>
                                    <OptionIconContainer>
                                        <SpanIcon disabled={row?.editable === false} onClick={option.onclick.bind(this, row._id)}>
                                            <i className={option.icon}/>
                                        </SpanIcon>
                                    </OptionIconContainer>
                                </TableDataOption>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </Table>
        </TableWrapper>
    );
};

export default StyledTable;
