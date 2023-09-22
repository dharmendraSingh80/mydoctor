import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";

export default function ReviewsDocDashboard() {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid
        container
        style={{
          justifyContent: "space-between",
          backgroundColor: "white",
        }}
      >
        <Grid item xs={12} lg={5} style={{ borderColor: "rgb(230, 230, 230)" }}>
          <Box
            sx={{
              padding: "110px 20px",
              fontSize: "20px",
              textAlign: "center",
            }}
          >
            No review so far
          </Box>
        </Grid>
        <Grid
          item
          xs={12}
          lg={5}
          style={{
            marginRight: "4%",
            marginLeft: "1%",
            backgroundColor: "white",
          }}
        >
          <Typography
            sx={{
              color: "#3f51b5",
              padding: "5px 40px",
              fontSize: "52px",
              textAlign: "center",
            }}
          >
            3.4
          </Typography>
          <Typography
            sx={{
              padding: "0 44px",
              fontSize: "14px",
              marginTop: "-15px",
              textAlign: "center",
            }}
          >
            5 ratings
          </Typography>
          <Box sx={{ mt: "-27px", ml: "15%" }}>
            <div>
              <Typography sx={{ mt: "30px", ml: "10%" }}>
                5
                <StarIcon
                  sx={{
                    color: "#f1af09",
                    fontSize: "22px",
                    marginTop: "-25px",
                    marginBottom: "-4px",
                  }}
                />
              </Typography>

              <LinearProgress
                sx={{
                  width: "50%",
                  mt: "-15px",
                  ml: { lg: "19%", xs: "24%" },
                }}
                value={60}
                variant="determinate"
              />

              <Typography
                variant="body1"
                sx={{ mt: "-15px", ml: { lg: "72%", xs: "77%" } }}
              >
                60%
              </Typography>
            </div>
            <Box sx={{ mt: "-25px" }}>
              <Typography sx={{ mt: "30px", ml: "10%" }}>
                4
                <StarIcon
                  sx={{
                    color: "#f1af09",
                    fontSize: "22px",
                    marginTop: "-25px",
                    marginBottom: "-4px",
                  }}
                />
              </Typography>

              <LinearProgress
                sx={{
                  width: "50%",
                  mt: "-15px",
                  ml: { lg: "19%", xs: "24%" },
                }}
                value={50}
                variant="determinate"
              />

              <Typography
                variant="body1"
                sx={{ mt: "-15px", ml: { lg: "72%", xs: "77%" } }}
              >
                50%
              </Typography>
            </Box>
            <Box sx={{ mt: "-25px" }}>
              <Typography sx={{ mt: "30px", ml: "10%" }}>
                3
                <StarIcon
                  sx={{
                    color: "#f1af09",
                    fontSize: "22px",
                    marginTop: "-25px",
                    marginBottom: "-4px",
                  }}
                />
              </Typography>

              <LinearProgress
                sx={{
                  width: "50%",
                  mt: "-15px",
                  ml: { lg: "19%", xs: "24%" },
                }}
                value={70}
                variant="determinate"
              />

              <Typography
                variant="body1"
                sx={{ mt: "-15px", ml: { lg: "72%", xs: "77%" } }}
              >
                70%
              </Typography>
            </Box>
            <Box sx={{ mt: "-25px" }}>
              <Typography sx={{ mt: "30px", ml: "10%" }}>
                2
                <StarIcon
                  sx={{
                    color: "#f1af09",
                    fontSize: "22px",
                    marginTop: "-25px",
                    marginBottom: "-4px",
                  }}
                />
              </Typography>

              <LinearProgress
                sx={{
                  width: "50%",
                  mt: "-15px",
                  ml: { lg: "19%", xs: "24%" },
                }}
                value={20}
                variant="determinate"
              />

              <Typography
                variant="body1"
                sx={{ mt: "-15px", ml: { lg: "72%", xs: "77%" } }}
              >
                20%
              </Typography>
            </Box>
            <Box sx={{ mt: "-25px" }}>
              <Typography sx={{ mt: "30px", ml: "10%" }}>
                1
                <StarIcon
                  sx={{
                    color: "#f1af09",
                    fontSize: "22px",
                    marginTop: "-25px",
                    marginBottom: "-4px",
                  }}
                />
              </Typography>

              <LinearProgress
                sx={{
                  width: "50%",
                  mt: "-15px",
                  ml: { lg: "19%", xs: "24%" },
                }}
                value={30}
                variant="determinate"
              />

              <Typography
                variant="body1"
                sx={{ mt: "-15px", ml: { lg: "72%", xs: "77%" } }}
              >
                30%
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
