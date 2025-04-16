import {
  Button,
  Card,
  CardContent,
  CircularProgress,
  Grid,
  Typography,
  Box
} from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setPage } from "../../redux/jobSlice";
import PageWrapper from '../../components/PageWrapper';
import Footer from '../../components/Footer';

const colors = ["#FFF8E1", "#E1F5FE", "#F1F8E9", "#FBE9E7"]; // 柔和背景色

const JobCard = ({ job, index }) => (
  <Card
    sx={{
      mb: 3,
      px: 2,
      py: 3,
      backgroundColor: colors[index % colors.length],
      boxShadow: 3,
      borderRadius: 3,
      transition: "0.3s",
      "&:hover": {
        boxShadow: 6,
        transform: "translateY(-4px)",
      },
    }}
  >
    <CardContent>
      <Typography variant="subtitle2" color="text.secondary" gutterBottom>
        Submitted By
      </Typography>
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        {job.Name}
      </Typography>

      <Typography variant="body1" gutterBottom>
        📞 <strong>Contact:</strong> {job.Contact}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        📝 <strong>Description:</strong> {job.description}
      </Typography>

      <Typography variant="body2" sx={{ mt: 1 }}>
        ⭐ <strong>Rating:</strong> {job.Rating}
      </Typography>
    </CardContent>
  </Card>
);

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobs, loading, currentPage, total } = useSelector((state) => state.jobs);
  const isLastPage = currentPage * 10 >= total; // 如果当前页不足 9 条，说明是最后一页


  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  return (
    <>
      <PageWrapper>
        <Box sx={{ maxWidth: '1200px', mx: 'auto', px: { xs: 2, sm: 4 }, py: 4 }}>
          <Typography variant="h4" align="center" fontWeight="bold" gutterBottom>
            📚 Questions Listing
          </Typography>

          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3} >
              {jobs?.map((job, index) => (
                <Grid item xs={12} sm={6} md={3} lg={3} key={job._id}>
                  <JobCard job={job} index={index} />
                </Grid>
              ))}
            </Grid>
          )}

          <Box sx={{ mt: 4, textAlign: "center" }}>
       
            <Button
              variant="outlined"
              onClick={() => dispatch(setPage(currentPage - 1))}
              disabled={currentPage === 1}
              sx={{ mx: 1 }}
            >
              Previous
            </Button>
            <Button
              variant="contained"
              onClick={() => dispatch(setPage(currentPage + 1))}
              disabled={isLastPage} 
              sx={{ mx: 1 }}
            >
              Next
            </Button>
          </Box>
        </Box>
      </PageWrapper>
      <Footer />
    </>
  );
};

export default JobListings;
