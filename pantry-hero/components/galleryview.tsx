import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid2 from '@mui/material/Grid2';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(2),
  textAlign: 'center',
  color: theme.palette.text.secondary,
  ...theme.applyStyles('dark', {
    backgroundColor: '#1A2027',
  }),
}));



export default function Gallery({food}:any) {
    if (!Array.isArray(food)) {
        return <div>Error: Data is unavailable.{JSON.stringify(food)}</div>;
        }
    return (
        <Box sx={{ flexGrow: 1 }}>
        <Grid2 container spacing={2}>
            {food.map((item, index) => (
            <Grid2 key={index} xs={12} sm={6} md={4} lg={3}>
                <Item>
                <h3>{item.name}</h3>
                <p>Quantity: {item.quantity}</p>
                </Item>
            </Grid2>
            ))}
        </Grid2>
        </Box>
    );
}