import { Box, Skeleton } from '@mui/material'
import React from 'react'

const BarSkeleton = () => {
  return (
    <div>
        <div className="d-flex justify-content-center">
            <Box sx={{ width: 600 }}>
              <Skeleton />
              <Skeleton animation="wave" />
              <Skeleton animation={false} />
            </Box>
          </div>
    </div>
  )
}

export default BarSkeleton