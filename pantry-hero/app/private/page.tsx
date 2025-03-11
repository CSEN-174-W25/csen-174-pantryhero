import { redirect } from 'next/navigation'
import { Box, Container, Grid, Typography, List, ListItem, ListItemText, Button, TextField } from "@mui/material";
import UserProfileClient from "@/components/userprofile"
import { createClient } from '@/utils/supabase/server'
import prisma from "@/lib/prisma";
export default async function UserPage() {
  const supabase = await createClient()

  const { data, error } = await supabase.auth.getUser()
  if (error || !data?.user) {
    redirect('/login')
  }

  const user = await prisma.user.findMany({
    where: {
      email: {
        startsWith: `${data.user.email}`
      },
    },
  });
  console.log(user);
  return(
    
      <UserProfileClient initialUser={user}/>

    )
}