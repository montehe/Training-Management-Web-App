import { styled } from '@mui/system';

export const TableContainer = styled('div')({
    padding: '10px',
    marginRight: '60px',
    backgroundColor: '#f4f4f9',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

export const Table = styled('table')({
    width: '100%',
    borderCollapse: 'collapse',
});

export const Header = styled('th')({
    backgroundColor: '#E0CD9E',
    color: '#fff',
    padding: '12px 15px',
    textAlign: 'left',
    borderBottom: '2px solid #E0CD9E',
    fontWeight: 'bold',
});

export const Row = styled('tr')({
    '&:nth-of-type(even)': {
        backgroundColor: '#e9ecef',
    },
    '&:hover': {
        backgroundColor: '#dee2e6',
    },
});

export const Cell = styled('td')({
    padding: '12px 15px',
    borderBottom: '1px solid #ced4da',
    fontSize: '14px',
    color: '#495057',
    maxWidth: '200px', // Adjust as needed
    overflow: 'hidden', // Hide overflow content
    textOverflow: 'clip', // Ensure text is clipped without ellipsis
    whiteSpace: 'normal', // Allow text wrapping
});

export const DeleteButton = styled('button')({
    backgroundColor: 'black',
    color: '#fff',
    border: 'none',
    padding: '6px 12px',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '14px',
    transition: 'background-color 0.3s, transform 0.2s',
    '&:hover': {
        backgroundColor: '#c82333',
        transform: 'scale(1.05)',
    },
});

export const Loading = styled('div')({
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
    color: '#007bff',
});

export const Error = styled('div')({
    color: '#dc3545',
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '16px',
});

export const NoData = styled('div')({
    textAlign: 'center',
    padding: '20px',
    fontSize: '16px',
    color: '#6c757d',
});
