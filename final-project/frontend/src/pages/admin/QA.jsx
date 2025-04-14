import { Button, Card, CardContent, CircularProgress, Grid, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchJobs, setPage } from "../../redux/jobSlice";

const colors = ["#FFEBEE", "#E3F2FD", "#E8F5E9", "#FFF3E0"];

const JobCard = ({ job, index }) => (
  <Card sx={{ mb: 2, p: 2, backgroundColor: colors[index % colors.length], elevation: 3 }}>
    <CardContent>
      <Typography variant="h6">Name: {job.Name}</Typography>
      <Typography variant="h5">{job.Contact}</Typography>
      <Typography>Description: {job.description}</Typography>
      <Typography>Rating: {job.Rating}</Typography>
    </CardContent>
  </Card>
);

const JobListings = () => {
  const dispatch = useDispatch();
  const { jobs, loading, currentPage } = useSelector((state) => state.jobs);

  useEffect(() => {
    dispatch(fetchJobs(currentPage));
  }, [dispatch, currentPage]);

  return (
    <div>
      <h1>Questions Listings</h1>
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container spacing={2}>
          {jobs.map((job, index) => (
            <Grid item xs={12} sm={6} md={4} key={job._id}>
              <JobCard job={job} index={index} />
            </Grid>
          ))}
        </Grid>
      )}
      <div style={{ marginTop: 20 }}>
        <Button onClick={() => dispatch(setPage(currentPage - 1))} disabled={currentPage === 1}>
          Previous
        </Button>
        <Button onClick={() => dispatch(setPage(currentPage + 1))}>Next</Button>
      </div>
    </div>
  );
};

export default JobListings;