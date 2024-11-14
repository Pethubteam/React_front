// src/HospitalVue/HospitalListPage.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, Typography, Avatar, Grid, Box } from '@mui/material';

function HospitalListPage({ hospitals }) {
  return (
    <Box p={3}>
      <Typography variant="h6" gutterBottom>
        병원 목록 ({hospitals.length})
      </Typography>
      <Grid container spacing={2}>
        {hospitals.map((hospital) => (
          <Grid item xs={12} key={hospital.id}>
            <Card variant="outlined" style={{ display: 'flex', padding: '16px' }}>
              <Avatar
                variant="square"
                src={hospital.imagePath}
                alt={hospital.hospitalName}
                style={{ width: '150px', height: '100%', marginRight: '16px', borderRadius: '8px' }}
              />
              <CardContent style={{ flex: 1 }}>
                <Typography variant="h6" style={{ fontWeight: 'bold' }}>
                  {hospital.hospitalName}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {hospital.address}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  전화번호: {hospital.phoneNumber}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  영업 시간: {hospital.operatingHours}
                </Typography>
                <Link to={`/hospital/${hospital.id}`} style={{ marginTop: '8px', color: 'blue' }}>
                  상세보기
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default HospitalListPage;
