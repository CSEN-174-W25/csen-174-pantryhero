"use client";

import { useState } from 'react';
import { 
  Container, Grid, Typography, List, ListItem, 
  ListItemText, Button, FormControl, FormGroup, 
  FormControlLabel, Checkbox 
} from "@mui/material";

export default function UserProfileClient({ initialUser }) {
  const [allergies, setAllergies] = useState(
    initialUser[0]?.allergy || []
  );

  const handleUpdate = async () => {
    try {
      // Make sure allergies only contain valid values
      const validAllergies = ["gluten", "egg", "milk", "nuts", "shellfish", "soy", "sesame"];
      const sanitizedAllergies = allergies.filter(item => 
        validAllergies.includes(item)
      );
      
      console.log("Sending allergies:", sanitizedAllergies);
      
      const payload = {
        email: initialUser[0].email,
        allergy: sanitizedAllergies
      };
      
      const response = await fetch('/api/update-profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      });
      
      // Parse response as text first to debug
      const responseText = await response.text();
      console.log("Response text:", responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        console.error("Failed to parse response as JSON:", e);
        alert("Server response was not valid JSON");
        return;
      }
      
      if (response.ok) {
        alert("Profile updated successfully!");
      } else {
        throw new Error(result.error || 'Update failed');
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile: " + error.message);
    }
  }

  const MultiSelectAllergy = () => {
    const options = ["gluten", "egg", "milk", "nuts", "shellfish", "soy", "sesame"];
    
    const handleAllergyToggle = (option) => {
      setAllergies(current => {
        if (current.includes(option)) {
          return current.filter(item => item !== option);
        } else {
          return [...current, option];
        }
      });
    };
  
    return (
      <Container>
        <Typography variant="subtitle1" gutterBottom>
          Select your allergies:
        </Typography>
        <FormControl component="fieldset">
          <FormGroup>
            {options.map((option) => (
              <FormControlLabel
                key={option}
                control={
                  <Checkbox 
                    checked={allergies.includes(option)}
                    onChange={() => handleAllergyToggle(option)}
                  />
                }
                label={option.charAt(0).toUpperCase() + option.slice(1)}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Container>
    );
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={6}>
        <List>
          <ListItem>
            <ListItemText
              primary={"Email"}
              secondary={initialUser[0]?.email || ""}
            />
          </ListItem>
          <ListItem>
            <ListItemText
              primary={"Allergies"}
              secondary={initialUser[0]?.allergy?.join(", ") || "None"}
            />
          </ListItem>
        </List>
      </Grid>
      <Grid item xs={12} md={6}>
        <MultiSelectAllergy />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleUpdate}
          sx={{ mt: 2 }}
        >
          Update Profile
        </Button>
      </Grid>
    </Grid>
  );
}