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
    
    return <UserProfileClient initialUser={user} />
  }