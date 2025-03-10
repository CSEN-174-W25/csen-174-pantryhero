"use client"

import { login, signup } from './actions'
import React, { useState } from 'react';
import { Grid, Card, CardContent, TextField, Button, Typography } from '@mui/material';

function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <Grid container justifyContent="center" alignItems="center" style={{ minHeight: '100vh' }}>
      <Grid item xs={10} sm={6} md={4}>
        <Card>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>Login</Typography>
            <form>
              <TextField
                label="Email"
                variant="outlined"
                fullWidth
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                margin="normal"
              />
              <TextField
                label="Password"
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                required
                margin="normal"
              />
              <div style={{ display: 'flex', gap: '10px', marginTop: '16px' }}>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary" 
                  formAction={login}
                >
                  Login
                </Button>
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="secondary" 
                  formAction={signup}
                >
                  Sign Up
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}

export default LoginPage;