import {
  Avatar,
  Box,
  Button,
  IconButton,
  Input,
  Typography,
} from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import CloseIcon from "@mui/icons-material/Close";
import "../../styles/loader.css";

export default function PatientProfileHeader({
  handleEditClick,
  handleSaveClick,
  editing,

  loading,
  handleImageChange,
  selectedImage,
  isFilled,
}) {
  return (
    <>
      <Box sx={styles.titleWrapper1}>
        <Box sx={styles.titleWrapper2}>
          <Typography sx={styles.title}>My Profile</Typography>
        </Box>
      </Box>
      <Box sx={styles.avatarEditBox}>
        <Box sx={styles.avatarEditBox2}>
          <Box sx={{ marginTop: "10px" }}>
            <Box sx={styles.avatarWrapper2}>
              <Box sx={styles.avatarWrapper}>
                <Avatar
                  sx={styles.avatar}
                  src={selectedImage || "/broken-image.jpg"}
                />

                {loading && (
                  <Box sx={styles.loader}>
                    <div className="loader"></div>
                  </Box>
                )}

                <Box
                  sx={{
                    display: editing ? "flex" : "none",
                    flexWrap: "wrap",
                    boxSizing: "border-box",
                    width: "calc(100% + 24px)",
                    margin: "-12px -12px 6% 6%",
                  }}
                >
                  <Box sx={styles.cameraIconWrapper}>
                    <Input
                      accept="image/*"
                      id="image-input"
                      type="file"
                      style={{ display: "none" }}
                      onChange={handleImageChange}
                    />
                    <label htmlFor="image-input">
                      <div className="image-preview">
                        <IconButton color="primary" component="span">
                          <PhotoCameraIcon color="primary" fontSize="large" />
                        </IconButton>
                      </div>
                    </label>
                  </Box>
                  <Box sx={styles.closeIconWrapper}>
                    <CloseIcon fontSize="large" color="action" />
                  </Box>
                </Box>
                <Typography sx={styles.note}>
                  JPEG, JPG or PNG image less than 1 MB <br />
                  <span>(Close up face picture looks great)</span>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
        <Box sx={styles.editButtonWrapper}>
          {editing ? (
            <Button
              sx={styles.saveButton}
              variant="contained"
              disabled={!isFilled}
              onClick={handleSaveClick}
            >
              Save
            </Button>
          ) : (
            <Button
              sx={styles.editButton}
              variant="contained"
              onClick={handleEditClick}
            >
              Edit
            </Button>
          )}
        </Box>
      </Box>
    </>
  );
}

const styles = {
  titleWrapper1: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
  },
  titleWrapper2: {
    flexGrow: 0,
    maxWidth: "100%",
    flexBasis: "100%",
    margin: 0,
    boxSizing: "border-box",
  },
  title: {
    color: "#3f51b5",
    flexGrow: 1,
    fontSize: { xs: "26px", sm: "30px", md: "32px" },
    fontWeight: "bold",
  },
  avatarEditBox: {
    display: "flex",
    flexWrap: "wrap",
    boxSizing: "border-box",
    justifyContent: "space-between",
    width: "calc(100% + 8px)",
    margin: "-4px",
  },
  avatarEditBox2: {
    padding: "4px",
    margin: 0,
    boxSizing: "border-box",
    flexGrow: 0,
    maxWidth: { xs: "58.3333%", sm: "50%", md: "41.6666%" },
    flexBasis: { xs: "58.3333%", sm: "50%", md: "41.6666%" },
  },
  avatarWrapper2: {
    display: "flex",
    padding: "0px",
    justifyContent: "space-between",
    alignItems: "center",
  },

  avatarWrapper: {
    position: "relative",
    TextAlign: "center",
  },
  avatar: {
    width: "120px",
    height: "120px",
    borderRadius: "50%",
  },

  loader: {
    position: "absolute",
    top: "30%",
    left: "25%",
    transform: "translate(-50%, -50%)",
    zIndex: 1,
  },

  cameraIconWrapper: {
    pt: ".7rem",
    pl: "1rem",
    flexGrow: 0,
    maxWidth: "16.666667%",
    flexBasis: "16.666667%",
  },

  closeIconWrapper: {
    pt: "1.2rem",
    flexGrow: 0,
    maxWidth: "16.666667%",
    flexBasis: "16.666667%",
    pl: ".6rem",
    boxSizing: "border-box",
  },
  note: { fontSize: "12px", width: "100%", color: "grey", mt: "10px" },

  editButtonWrapper: {
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    margin: 0,
    boxSizing: "border-box",
    justifyContent: "flex-end",
    padding: "4px",
    flexGrow: 0,
    maxWidth: { xs: "16.666667%", sm: "33.333333%" },
    flexBasis: { xs: "16.666667%", sm: "33.333333%" },
  },
  editButton: { height: "40px" },
  saveButton: { height: "40px" },
};
