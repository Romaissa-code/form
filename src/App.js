import "./App.css";
import * as React from "react";
import Axios from "axios";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";

import {
  Radio,
  Table,
  Container,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Slider,
  FormControl,
  TextareaAutosize,
  FormControlLabel,
  RadioGroup,
  Autocomplete,
  TextField,
  Button,
  Box,
  CssBaseline,
} from "@mui/material";

const questions = [
  "The course as a whole was",
  "The course content was",
  "The instructor's contribution to the course was",
  "The instructor's effectiveness in teaching the subject matter was",
  "Explanations by instructor were",
  "Instructor's use of examples and illustrations was",
  "Student's confidence in instructor's knowledge was",
  "Instructor's enthusiasm was",
  "Encouragement given to students to participate was",
  "Availability of extra help when needed was",
  "Use of class time was",
  "Amount of assigned work was",
  "Grading techniques were",
];
const instructors = ["Dr. NAMANE R"];
const modules = ["EE121 Algorithmic [FALL 2022]"];

function App() {
  const initialData = {
    instructor_name: "",
    module: "",
    an1: "",
    an2: "",
    an3: "",
    an4: "",
    an5: "",
    an6: "",
    an7: "",
    an8: "",
    an9: "",
    an10: "",
    an11: "",
    an12: "",
    an13: "",
    student_effort: 0,
    student_work: "",
    message: "",
  };

  const [formdata, setFormData] = React.useState(initialData);
  const [err, setErr] = React.useState(false);
  const [clicked, setClicked] = React.useState(false);
  const clickhandler = () => {
    setClicked(true);
    const {
      instructor_name,
      module,
      an1,
      an2,
      an3,
      an4,
      an5,
      an6,
      an7,
      an8,
      an9,
      an10,
      an11,
      an12,
      an13,
      student_effort,
      student_work,
 
    } = formdata;
    if (
      instructor_name &&
      module &&
      an1 &&
      an2 &&
      an3 &&
      an4 &&
      an5 &&
      an6 &&
      an7 &&
      an8 &&
      an9 &&
      an10 &&
      an11 &&
      an12 &&
      an13 &&
      student_effort &&
      student_work
    ) {
      console.log(formdata);
      setErr(false);
      Axios.post(
        "https://course-evaluation-server-production-3a88.up.railway.app/api/insert",
        {
          formdata,
        }
      );
    } else {
      console.log("misssed filed");
      setErr(true);
    }
  };

  return (
    <>
      <CssBaseline />
      <div className="App">
        <Container maxWidth="md">
          <Paper elevation={8} sx={{ padding: "30px" }}>
            <Typography variant="h4">Course Evaluation Form</Typography>
            <Box
              sx={{
                margin: "20px 0",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={instructors}
                sx={{ width: 350 }}
                onChange={(event, value) => {
                  formdata["instructor_name"] = value;
                }}
                renderInput={(params) => (
                  <TextField {...params} label="Instructor Name" />
                )}
              />
              <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={modules}
                onChange={(event, value) => {
                  formdata["module"] = value;
                }}
                sx={{ width: 350 }}
                renderInput={(params) => (
                  <TextField {...params} label="Course Name" required />
                )}
              />
            </Box>
            <Box sx={{ margin: "20px 0px" }}>
              <Typography variant="h6" sx={{ margin: "20px 0" }}>
                Please evaluate honestly
              </Typography>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead></TableHead>
                  <TableBody>
                    {questions.map((question, index) => (
                      <TableRow
                        key={index}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell
                          component="th"
                          scope="row"
                          sx={{ fontSize: "14px", padding: "10px" }}
                        >
                          {question}
                        </TableCell>

                        <TableCell align="right" sx={{ padding: "10px" }}>
                          <FormControl required>
                            <RadioGroup
                              row
                              aria-labelledby="demo-row-radio-buttons-group-label"
                              name="row-radio-buttons-group"
                              onChange={(e) =>
                                (formdata[`an${index + 1}`] = e.target.value)
                              }
                            >
                              <FormControlLabel
                                value="Excellent"
                                control={<Radio />}
                                label={
                                  <Typography variant="body2">
                                    Excellent
                                  </Typography>
                                }
                              />
                              <FormControlLabel
                                value="Good"
                                control={<Radio />}
                                label={
                                  <Typography variant="body2">Good</Typography>
                                }
                              />
                              <FormControlLabel
                                value="Fair"
                                control={<Radio />}
                                label={
                                  <Typography variant="body2">Fair</Typography>
                                }
                              />
                              <FormControlLabel
                                value="Poor"
                                control={<Radio />}
                                label={
                                  <Typography variant="body2">Poor</Typography>
                                }
                              />
                            </RadioGroup>
                          </FormControl>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Box>
            <Typography variant="h5" sx={{ margin: "20px 0" }}>
              Student Participation
            </Typography>
            <Box sx={{ margin: "10px 0" }}>
              <Typography variant="h6">
                The amount of effort you put into this course was:
              </Typography>
              <Slider
                aria-label="Temperature"
                defaultValue={1}
                valueLabelDisplay="auto"
                step={1}
                marks
                min={1}
                max={6}
                onChange={(e) => (formdata["student_effort"] = e.target.value)}
              />
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Typography variant="h6">
                On average, how many hours a week did you spend on this course?
              </Typography>
              <FormControl required>
                <RadioGroup
                  aria-labelledby="demo-radio-buttons-group-label"
                  defaultValue="female"
                  name="radio-buttons-group"
                  onChange={(e) => (formdata["student_work"] = e.target.value)}
                >
                  <FormControlLabel
                    value="0-2"
                    control={<Radio />}
                    label="0-2"
                  />
                  <FormControlLabel
                    value="2-5"
                    control={<Radio />}
                    label="2-5"
                  />
                  <FormControlLabel
                    value="6-10"
                    control={<Radio />}
                    label="6-10"
                  />
                  <FormControlLabel
                    value="11-14"
                    control={<Radio />}
                    label="11-14"
                  />
                  <FormControlLabel
                    value="15-up"
                    control={<Radio />}
                    label="15-up"
                  />
                </RadioGroup>
              </FormControl>
            </Box>
            <Box sx={{ margin: "10px 0" }}>
              <Typography variant="h6">
                Is there any other feedback you'd like to give on this class?
              </Typography>
              <TextareaAutosize
                aria-label="empty textarea"
                style={{ width: "100%", margin: "15px 0" }}
                minRows={10}
                onChange={(e) => (formdata["message"] = e.target.value)}
              />
            </Box>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
              }}
            >
              <Button variant="contained" size="large" onClick={clickhandler}>
                Submit
              </Button>
            </Box>
          </Paper>
          {clicked ? (
            err ? (
              <h4 className="failed">{`some missing fields :(`}</h4>
            ) : (
              <h4 className="success">send successfuly !</h4>
            )
          ) : null}
        </Container>
        <footer className="footer">
          <Typography variant="subtitle2">
            <AutoAwesomeIcon sx={{ fontSize: "14px" }} /> Created by R.Bakhouche
            2023
          </Typography>
        </footer>
      </div>
    </>
  );
}

export default App;
