import React from 'react'
import Layout from '../components/Layout'
import { Container, Typography, Card, CardContent, Avatar, Box } from '@mui/material'
import Grid from '@mui/material/Grid'

const AboutPage: React.FC = () => {
  const team = [
    {
      name: 'Taing Ero',
      role: 'CEO & Founder',
      bio: '15+ years in financial technology and lending industry.',
      avatar: '/images/team/john.jpg'
    },
    {
      name: 'Taing Ero',
      role: 'CTO',
      bio: 'Expert in AI/ML and financial software development.',
      avatar: '/images/team/sarah.jpg'
    },
    {
      name: 'Taing Ero',
      role: 'Head of Risk',
      bio: 'Former banking executive with expertise in risk assessment.',
      avatar: '/images/team/michael.jpg'
    }
  ]

  return (
    <Layout title="About Us - LoanEase Pro">
      <Container maxWidth="lg" className="py-16">
        <Typography variant="h2" className="text-center mb-8">
          About LoanEase Pro
        </Typography>
        
        <Typography variant="h5" className="text-center text-gray-600 mb-12">
          We're revolutionizing the lending industry with cutting-edge technology
          and exceptional customer service.
        </Typography>
        
        <Grid container spacing={6} className="mb-16">
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" className="mb-4">
              Our Mission
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              To democratize access to credit by making the loan origination process
              faster, more transparent, and more accessible for both lenders and borrowers.
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              We believe that everyone deserves fair access to financial services,
              and we're committed to using technology to break down barriers and
              create opportunities.
            </Typography>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Typography variant="h4" className="mb-4">
              Our Vision
            </Typography>
            <Typography variant="body1" className="text-gray-600 mb-4">
              To become the leading platform for digital lending, empowering
              financial institutions to serve their customers better while
              reducing operational costs and risks.
            </Typography>
            <Typography variant="body1" className="text-gray-600">
              We envision a future where loan applications are processed in minutes,
              not days, and where data-driven decisions lead to better outcomes
              for everyone involved.
            </Typography>
          </Grid>
        </Grid>
        
        <Typography variant="h3" className="text-center mb-8">
          Meet Our Team
        </Typography>
        
        <Grid container spacing={4}>
          {team.map((member, index) => (
            <Grid size={{ xs: 12, md: 4 }} key={index}>
              <Card className="text-center h-full">
                <CardContent className="p-6">
                  <Avatar
                    src={member.avatar}
                    alt={member.name}
                    className="w-24 h-24 mx-auto mb-4"
                  />
                  <Typography variant="h6" className="mb-2">
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" color="primary" className="mb-3">
                    {member.role}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {member.bio}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Layout>
  )
}

export default AboutPage