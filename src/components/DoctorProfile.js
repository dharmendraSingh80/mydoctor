import {
  Box,
  Typography,
  Grid,
  Avatar,
  Input,
  Button,
  TextField,
  MenuItem,
  Autocomplete,
} from "@mui/material";
import ResponsiveDrawer from "./pages/SideBar";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import "../styles/loader.css";
import {
  getDocotor,
  getDoctorImage,
  updateDoctorData,
  uploadDoctorImage,
} from "../api";
import { useNavigate } from "react-router-dom";

export default function DoctorProfile({ mobileOpen, handleDrawerToggle }) {
  const [editData, setEditData] = useState({
    fullName: "",
    consultationFee: "",
    contactNumber: "",
    email: "",
    gender: "",
    bio: "",
    languages: [],
  });
  const [editErrors, setEditErrors] = useState({
    fullName: "",
    consultationFee: "",
    contactNumber: "",
    email: "",
    bio: "",
  });
  const [editing, setEditing] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const validationPatterns = {
    fullName: /^$|^[^0-9].*$/,
    consultationFee: /^(?!0\d{1,3}$)[1-4]?\d{1,3}$|5000/,
    contactNumber: /^[0-9]{10}$/,
    email: /\S+@\S+\.\S+/,
    bio: /^(?=.*[A-Za-z])[\w\s.,!?'"()&$#@%*+-/:;<=>[\]^_`{|}~]*$/,
  };

  const validationMessages = {
    fullName: "Please enter a valid name!",
    consultationFee: "Please enter a value between 0 & 5000",
    contactNumber: "Please enter a valid 10 digit Number",
    email: "Please enter a valid email address",
    bio: "Please enter valid bio",
  };

  const validateInput = (e) => {
    let { name, value } = e.target;
    setEditErrors((prev) => {
      const stateObj = { ...prev, [name]: "" };
      const validationPattern = validationPatterns[name];
      if (!value || !validationPattern.test(value)) {
        stateObj[name] = validationMessages[name];
      }
      return stateObj;
    });
  };

  const handleEditClick = () => {
    setEditing(true);
  };
  const handleSaveClick = async () => {
    setEditing(false);
    const userName = editData.fullName.split(" ");
    const userDetails = {
      firstName: userName[0],
      gender: editData.gender,
      profile: {
        bio: editData.bio,
        consultationFee: +editData.consultationFee,
        languages: editData.languages,
      },
    };
    if (userName[1]) {
      userDetails.lastName = userName[1];
    }

    try {
      const response = await updateDoctorData(userDetails);
      if (response.enabled) {
        console.log("Doctor updated successfully");
      } else {
        console.log("Unable to update");
      }
      fetchDoctor();
    } catch (error) {
      console.error("Error updating patient data:", error);
    }
  };

  const inputHandleChange = (event) => {
    const { name, value } = event.target;
    setEditData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };
  const handleAutocomplete = (e, value) => {
    console.log(value);
    setEditData((prevData) => ({
      ...prevData,
      languages: value,
    }));
  };

  const handleImageChange = async (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      const formData = new FormData();
      formData.append("avatar", selectedFile);
      setLoading(true);
      try {
        const data = await uploadDoctorImage(formData);
        const reader = new FileReader();
        reader.onload = (e) => {
          setSelectedImage(e.target.result);
        };
        reader.readAsDataURL(selectedFile);
      } catch (error) {
        console.error("Error uploading image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  function fetchDoctor() {
    getDocotor()
      .then((doc) => {
        if (doc.email) {
          const defaultEditData = {
            ...editData,
            fullName: `${doc.firstName || ""} ${doc.lastName || ""}`,
            email: doc.email || "",
            contactNumber: doc.contactNumber || "",
            gender: doc.gender || "",
            consultationFee: doc.profile?.consultationFee || "N/a",
            languages: doc.profile?.languages || [],
            bio: doc.profile?.bio || "N/a",
          };
          // Set the default values into the state
          setEditData(defaultEditData);
        }
      })
      .catch((error) => {
        console.error("Error fetching patient data:", error);
      });
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getDoctorImage();
        if (data.name === "NotAuthenticated") {
          // localStorage.removeItem("userContext");
          navigate("/auth/login");
        }
        setSelectedImage(data.avatar.buffer);
      } catch (error) {
        console.error("Error fetching patient image:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
    fetchDoctor();
  }, [selectedImage]);

  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "68vh",
        flexFlow: "row nowrap",
        flexGrow: 1,
      }}
    >
      <ResponsiveDrawer
        mobileOpen={mobileOpen}
        handleDrawerToggle={handleDrawerToggle}
      />
      <Box
        component="main"
        sx={{ padding: "32px", flexGrow: 1, backgroundColor: "#fafafa" }}
      >
        <Box sx={{ width: "100%" }}>
          <Box sx={{ display: "flex", alignItems: "flex-start" }}>
            <Typography
              sx={{ color: "#000000", fontSize: "25px", fontWeight: "bold" }}
            >
              My Profile
            </Typography>
          </Box>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4} ms={4}>
              <Box sx={{ position: "relative" }}>
                <Avatar
                  sx={{
                    width: "120px",
                    height: "120px",
                    marginTop: "10px",
                    marginLeft: "27px",
                  }}
                  src={selectedImage || "/broken-image.jpg"}
                />
                {loading && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: "50%",
                      left: {
                        xl: "20%",
                        lg: "25%",
                        xs: "30%",
                        sm: "35%",
                        md: "40%",
                      },
                      transform: "translate(-50%, -50%)",
                      zIndex: 1,
                    }}
                  >
                    <div className="loader"></div>
                  </Box>
                )}
              </Box>
              <br />
              <Input
                accept="image/*"
                id="image-input"
                type="file"
                style={{ display: "none" }}
                onChange={handleImageChange}
              />
              <label htmlFor="image-input">
                <Box
                  sx={{
                    color: "rgb(63, 81, 181)",
                    fontWeight: "bold",
                    ml: { xs: "25px", md: "45px" },
                    fontSize: { xs: "12px", md: "18px" },
                  }}
                >
                  {editing ? "Change Image" : "Upload Image"}
                </Box>
              </label>
            </Grid>
          </Grid>
          <Box sx={{ display: "flex", flexDirection: "row-reverse" }}>
            <Box sx={{ alignSelf: "center" }}>
              {editing ? (
                <Button
                  sx={{ height: "40px" }}
                  variant="contained"
                  onClick={handleSaveClick}
                >
                  SAVE
                </Button>
              ) : (
                <Button
                  sx={{ height: "40px" }}
                  variant="contained"
                  onClick={handleEditClick}
                >
                  EDIT
                </Button>
              )}
            </Box>
          </Box>
          <Paper variant="outlined" sx={{ marginTop: "10px" }}>
            <Grid
              sx={{ mt: "10px", ml: "10px", mb: "10px" }}
              container
              spacing={3}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: "80%" }}
                  id="outlined-required"
                  label="Name"
                  error={editErrors.fullName}
                  name="fullName"
                  value={editData.fullName}
                  onChange={inputHandleChange}
                  onBlur={validateInput}
                  helperText={editErrors.fullName ? editErrors.fullName : ""}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  sx={{ width: "80%" }}
                  id="outlined-required"
                  label="Consultation Fee"
                  error={editErrors.consultationFee}
                  name="consultationFee"
                  value={editData.consultationFee}
                  onChange={inputHandleChange}
                  onBlur={validateInput}
                  helperText={
                    editErrors.consultationFee ? editErrors.consultationFee : ""
                  }
                  disabled={!editing}
                />
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: "10px", ml: "10px", mb: "10px" }}
              container
              spacing={3}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: "80%" }}
                  id="outlined-required"
                  label="Phone Number"
                  error={editErrors.contactNumber}
                  name="contactNumber"
                  value={editData.contactNumber}
                  onChange={inputHandleChange}
                  onBlur={validateInput}
                  helperText={
                    editErrors.contactNumber ? editErrors.contactNumber : ""
                  }
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-currency"
                  select
                  label="Gender"
                  sx={{ width: "80%" }}
                  name="gender"
                  value={editData.gender}
                  onChange={inputHandleChange}
                  disabled={!editing}
                >
                  {genders.map((option, index) => (
                    <MenuItem key={index} value={option.toLowerCase()}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: "10px", ml: "10px", mb: "10px" }}
              container
              spacing={3}
            >
              <Grid item xs={12} sm={6}>
                <TextField
                  sx={{ width: "80%" }}
                  id="outlined-required"
                  label="Email"
                  error={editErrors.email}
                  name="email"
                  value={editData.email}
                  onChange={inputHandleChange}
                  onBlur={validateInput}
                  helperText={editErrors.email ? editErrors.email : ""}
                  disabled={!editing}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Autocomplete
                  multiple
                  sx={{ width: "80%" }}
                  id="tags-outlined"
                  options={languages_list}
                  getOptionLabel={(option) => option.name}
                  value={editData.languages.map((language) => ({
                    name: language.name,
                  }))}
                  filterSelectedOptions
                  disabled={!editing}
                  onChange={handleAutocomplete}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      required
                      label="Languages"
                      placeholder="Enter Languages"
                    />
                  )}
                />
              </Grid>
            </Grid>
            <Grid
              sx={{ mt: "10px", ml: "10px", mb: "20px" }}
              container
              spacing={3}
            >
              <Grid item xs={12}>
                <TextField
                  required
                  sx={{ width: { xs: "80%", sm: "90%" } }}
                  id="outlined-required"
                  label="Bio"
                  multiline
                  rows={4}
                  variant="outlined"
                  defaultValue="Self"
                  error={editErrors.bio}
                  name="bio"
                  value={editData.bio}
                  onChange={inputHandleChange}
                  onBlur={validateInput}
                  helperText={editErrors.bio ? editErrors.bio : ""}
                  disabled={!editing}
                />
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
}
const genders = ["Male", "Female", "Other"];
const languages_list = [
  { name: "Afrikaans", code: "af" },
  { name: "Albanian - shqip", code: "sq" },
  { name: "Amharic - አማርኛ", code: "am" },
  { name: "Arabic - العربية", code: "ar" },
  { name: "Aragonese - aragonés", code: "an" },
  { name: "Armenian - հայերեն", code: "hy" },
  { name: "Asturian - asturianu", code: "ast" },
  { name: "Azerbaijani - azərbaycan dili", code: "az" },
  { name: "Basque - euskara", code: "eu" },
  { name: "Belarusian - беларуская", code: "be" },
  { name: "Bengali - বাংলা", code: "bn" },
  { name: "Bosnian - bosanski", code: "bs" },
  { name: "Breton - brezhoneg", code: "br" },
  { name: "Bulgarian - български", code: "bg" },
  { name: "Catalan - català", code: "ca" },
  { name: "Central Kurdish - کوردی (دەستنوسی عەرەبی)", code: "ckb" },
  { name: "Chinese - 中文", code: "zh" },
  { name: "Chinese (Hong Kong) - 中文（香港）", code: "zh-HK" },
  { name: "Chinese (Simplified) - 中文（简体）", code: "zh-CN" },
  { name: "Chinese (Traditional) - 中文（繁體）", code: "zh-TW" },
  { name: "Corsican", code: "co" },
  { name: "Croatian - hrvatski", code: "hr" },
  { name: "Czech - čeština", code: "cs" },
  { name: "Danish - dansk", code: "da" },
  { name: "Dutch - Nederlands", code: "nl" },
  { name: "English", code: "en" },
  { name: "English (Australia)", code: "en-AU" },
  { name: "English (Canada)", code: "en-CA" },
  { name: "English (India)", code: "en-IN" },
  { name: "English (New Zealand)", code: "en-NZ" },
  { name: "English (South Africa)", code: "en-ZA" },
  { name: "English (United Kingdom)", code: "en-GB" },
  { name: "English (United States)", code: "en-US" },
  { name: "Esperanto - esperanto", code: "eo" },
  { name: "Estonian - eesti", code: "et" },
  { name: "Faroese - føroyskt", code: "fo" },
  { name: "Filipino", code: "fil" },
  { name: "Finnish - suomi", code: "fi" },
  { name: "French - français", code: "fr" },
  { name: "French (Canada) - français (Canada)", code: "fr-CA" },
  { name: "French (France) - français (France)", code: "fr-FR" },
  { name: "French (Switzerland) - français (Suisse)", code: "fr-CH" },
  { name: "Galician - galego", code: "gl" },
  { name: "Georgian - ქართული", code: "ka" },
  { name: "German - Deutsch", code: "de" },
  { name: "German (Austria) - Deutsch (Österreich)", code: "de-AT" },
  { name: "German (Germany) - Deutsch (Deutschland)", code: "de-DE" },
  { name: "German (Liechtenstein) - Deutsch (Liechtenstein)", code: "de-LI" },
  { name: "German (Switzerland) - Deutsch (Schweiz)", code: "de-CH" },
  { name: "Greek - Ελληνικά", code: "el" },
  { name: "Guarani", code: "gn" },
  { name: "Gujarati - ગુજરાતી", code: "gu" },
  { name: "Hausa", code: "ha" },
  { name: "Hawaiian - ʻŌlelo Hawaiʻi", code: "haw" },
  { name: "Hebrew - עברית", code: "he" },
  { name: "Hindi - हिन्दी", code: "hi" },
  { name: "Hungarian - magyar", code: "hu" },
  { name: "Icelandic - íslenska", code: "is" },
  { name: "Indonesian - Indonesia", code: "id" },
  { name: "Interlingua", code: "ia" },
  { name: "Irish - Gaeilge", code: "ga" },
  { name: "Italian - italiano", code: "it" },
  { name: "Italian (Italy) - italiano (Italia)", code: "it-IT" },
  { name: "Italian (Switzerland) - italiano (Svizzera)", code: "it-CH" },
  { name: "Japanese - 日本語", code: "ja" },
  { name: "Kannada - ಕನ್ನಡ", code: "kn" },
  { name: "Kazakh - қазақ тілі", code: "kk" },
  { name: "Khmer - ខ្មែរ", code: "km" },
  { name: "Korean - 한국어", code: "ko" },
  { name: "Kurdish - Kurdî", code: "ku" },
  { name: "Kyrgyz - кыргызча", code: "ky" },
  { name: "Lao - ລາວ", code: "lo" },
  { name: "Latin", code: "la" },
  { name: "Latvian - latviešu", code: "lv" },
  { name: "Lingala - lingála", code: "ln" },
  { name: "Lithuanian - lietuvių", code: "lt" },
  { name: "Macedonian - македонски", code: "mk" },
  { name: "Malay - Bahasa Melayu", code: "ms" },
  { name: "Malayalam - മലയാളം", code: "ml" },
  { name: "Maltese - Malti", code: "mt" },
  { name: "Marathi - मराठी", code: "mr" },
  { name: "Mongolian - монгол", code: "mn" },
  { name: "Nepali - नेपाली", code: "ne" },
  { name: "Norwegian - norsk", code: "no" },
  { name: "Norwegian Bokmål - norsk bokmål", code: "nb" },
  { name: "Norwegian Nynorsk - nynorsk", code: "nn" },
  { name: "Occitan", code: "oc" },
  { name: "Oriya - ଓଡ଼ିଆ", code: "or" },
  { name: "Oromo - Oromoo", code: "om" },
  { name: "Pashto - پښتو", code: "ps" },
  { name: "Persian - فارسی", code: "fa" },
  { name: "Polish - polski", code: "pl" },
  { name: "Portuguese - português", code: "pt" },
  { name: "Portuguese (Brazil) - português (Brasil)", code: "pt-BR" },
  { name: "Portuguese (Portugal) - português (Portugal)", code: "pt-PT" },
  { name: "Punjabi - ਪੰਜਾਬੀ", code: "pa" },
  { name: "Quechua", code: "qu" },
  { name: "Romanian - română", code: "ro" },
  { name: "Romanian (Moldova) - română (Moldova)", code: "mo" },
  { name: "Romansh - rumantsch", code: "rm" },
  { name: "Russian - русский", code: "ru" },
  { name: "Scottish Gaelic", code: "gd" },
  { name: "Serbian - српски", code: "sr" },
  { name: "Serbo - Croatian", code: "sh" },
  { name: "Shona - chiShona", code: "sn" },
  { name: "Sindhi", code: "sd" },
  { name: "Sinhala - සිංහල", code: "si" },
  { name: "Slovak - slovenčina", code: "sk" },
  { name: "Slovenian - slovenščina", code: "sl" },
  { name: "Somali - Soomaali", code: "so" },
  { name: "Southern Sotho", code: "st" },
  { name: "Spanish - español", code: "es" },
  { name: "Spanish (Argentina) - español (Argentina)", code: "es-AR" },
  { name: "Spanish (Latin America) - español (Latinoamérica)", code: "es-419" },
  { name: "Spanish (Mexico) - español (México)", code: "es-MX" },
  { name: "Spanish (Spain) - español (España)", code: "es-ES" },
  { name: "Spanish (United States) - español (Estados Unidos)", code: "es-US" },
  { name: "Sundanese", code: "su" },
  { name: "Swahili - Kiswahili", code: "sw" },
  { name: "Swedish - svenska", code: "sv" },
  { name: "Tajik - тоҷикӣ", code: "tg" },
  { name: "Tamil - தமிழ்", code: "ta" },
  { name: "Tatar", code: "tt" },
  { name: "Telugu - తెలుగు", code: "te" },
  { name: "Thai - ไทย", code: "th" },
  { name: "Tigrinya - ትግርኛ", code: "ti" },
  { name: "Tongan - lea fakatonga", code: "to" },
  { name: "Turkish - Türkçe", code: "tr" },
  { name: "Turkmen", code: "tk" },
  { name: "Twi", code: "tw" },
  { name: "Ukrainian - українська", code: "uk" },
  { name: "Urdu - اردو", code: "ur" },
  { name: "Uyghur", code: "ug" },
  { name: "Uzbek - o‘zbek", code: "uz" },
  { name: "Vietnamese - Tiếng Việt", code: "vi" },
  { name: "Walloon - wa", code: "wa" },
  { name: "Welsh - Cymraeg", code: "cy" },
  { name: "Western Frisian", code: "fy" },
  { name: "Xhosa", code: "xh" },
  { name: "Yiddish", code: "yi" },
  { name: "Yoruba - Èdè Yorùbá", code: "yo" },
  { name: "Zulu - isiZulu", code: "zu" },
];
