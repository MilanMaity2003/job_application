import React, { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

// --- Custom Components as replacements ---

const Card = ({ children, style, ...props }) => (
  <div
    style={{
      border: "1px solid #ddd",
      borderRadius: "8px",
      padding: "16px",
      marginBottom: "16px",
      boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ children, style, ...props }) => (
  <div style={{ ...style }} {...props}>
    {children}
  </div>
);

const Typography = ({ variant, children, style, ...props }) => {
  let Tag = "p";
  if (variant === "h1") Tag = "h1";
  else if (variant === "h2") Tag = "h2";
  else if (variant === "h3") Tag = "h3";
  else if (variant === "h4") Tag = "h4";
  else if (variant === "h5") Tag = "h5";
  else if (variant === "h6" || variant === "subtitle1" || variant === "subtitle2")
    Tag = "h6";
  return (
    <Tag style={style} {...props}>
      {children}
    </Tag>
  );
};

const Button = ({ children, onClick, style, disabled, ...props }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      padding: "8px 16px",
      border: "none",
      borderRadius: "4px",
      cursor: disabled ? "not-allowed" : "pointer",
      ...style,
    }}
    {...props}
  >
    {children}
  </button>
);

const Checkbox = (props) => <input type="checkbox" {...props} />;

const FormControlLabel = ({ control, label }) => (
  <label style={{ display: "block", marginBottom: "8px" }}>
    {control} {label}
  </label>
);

const FormGroup = ({ children, style, ...props }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      ...style,
    }}
    {...props}
  >
    {children}
  </div>
);

// A simple modal implementation for Dialog
const Dialog = ({ open, onClose, children, ...props }) => {
  if (!open) return null;
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      {...props}
    >
      <div
        style={{
          background: "#fff",
          padding: "20px",
          borderRadius: "8px",
          maxWidth: "600px",
          width: "90%",
          position: "relative",
        }}
      >
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: "10px",
            right: "10px",
            background: "transparent",
            border: "none",
            fontSize: "1.2rem",
            cursor: "pointer",
          }}
        >
          X
        </button>
        {children}
      </div>
    </div>
  );
};

const DialogTitle = ({ children, style, ...props }) => (
  <h2 style={{ margin: 0, ...style }} {...props}>
    {children}
  </h2>
);

const DialogContent = ({ children, style, ...props }) => (
  <div style={{ marginTop: "16px", ...style }} {...props}>
    {children}
  </div>
);

// Styled components with enhanced styling
const StyledCard = ({ color, style, children, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        position: "relative",
        backgroundColor: hover ? "#f0f0f0" : color || "#fff",
        overflow: "hidden",
        width: "100%",
        maxWidth: "100%",
        padding: "16px",         // Added padding
        borderRadius: "12px",     // Smoother border radius
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Subtle box shadow
        transition: "transform 0.3s ease, background-color 0.3s ease",
        transform: hover ? "scale(1.02)" : "scale(1)",
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
};

const StyledButton = ({ children, onClick, style, disabled, ...props }) => {
  const [hover, setHover] = useState(false);
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: "120px",
        margin: "10px",
        display: "block",
        padding: "8px 16px",
        border: "none",
        borderRadius: "0",
        cursor: disabled ? "not-allowed" : "pointer",
        transition: "background 0.3s ease, transform 0.3s ease",
        background: hover
          ? "linear-gradient(45deg, #FF6F61, #FF8E53)"
          : "#1976d2",
        color: "#fff",
        transform: hover ? "scale(1.05)" : "scale(1)",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
};

// --- Jobs Component (logic remains the same) ---

const Jobs = ({ isLoggedIn }) => {
  const [selectedLocations, setSelectedLocations] = useState([]);
  const [selectedNiches, setSelectedNiches] = useState([]);
  const [selectedJob, setSelectedJob] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [role, setRole] = useState(null);
  const [appliedJobs, setAppliedJobs] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const token = Cookies.get("authToken") || Cookies.get("token");
        if (!token) {
          console.error("No token found");
          return;
        }

        const userResponse = await Axios.get("http://localhost:4000/api/v1/getUser", {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        setRole(userResponse.data.user.role);
      } catch (error) {
        console.error("Error fetching user role:", error.response?.data || error.message);
      }
    };

    const fetchJobs = async () => {
      try {
        const response = await Axios.get("http://localhost:4000/api/v1/job/getJob");
        setJobs(response.data.jobs || []);
      } catch (error) {
        console.error("Error fetching jobs:", error.response?.data || error.message);
      }
    };

    fetchUserRole();
    fetchJobs();
  }, []);

  const handleLocationChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLocations((prev) =>
      checked ? [...prev, value] : prev.filter((location) => location !== value)
    );
  };

  const handleNicheChange = (event) => {
    const { value, checked } = event.target;
    setSelectedNiches((prev) =>
      checked ? [...prev, value] : prev.filter((niche) => niche !== value)
    );
  };

  const isApplied = async (jobId) => {
    try {
      const token = Cookies.get("authToken") || Cookies.get("token");
      if (!token) {
        console.error("No token found");
        return false;
      }

      const response = await Axios.get(
        `http://localhost:4000/api/v1/application/isApplied/${jobId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      return response.data.applied;
    } catch (error) {
      console.error(
        "Error checking application status:",
        error.response?.data || error.message
      );
      return false;
    }
  };

  const handleViewMore = async (job) => {
    setSelectedJob(job);
    if (isLoggedIn) {
      const alreadyApplied = await isApplied(job._id);
      if (alreadyApplied) {
        setAppliedJobs((prevAppliedJobs) => ({
          ...prevAppliedJobs,
          [job._id]: true,
        }));
      }
    }
  };

  const handleClose = () => {
    setSelectedJob(null);
  };

  const handleApply = async (jobId) => {
    if (isLoggedIn) {
      const alreadyApplied = await isApplied(jobId);
      if (alreadyApplied) {
        setAppliedJobs((prevAppliedJobs) => ({
          ...prevAppliedJobs,
          [jobId]: true,
        }));
        return;
      }
      navigate(`/apply/${jobId}`);
    } else {
      navigate("/signup");
    }
  };

  const filteredJobs = jobs.filter(
    (job) =>
      (selectedLocations.length > 0
        ? selectedLocations.includes(job.location)
        : true) &&
      (selectedNiches.length > 0
        ? selectedNiches.includes(job.jobNiche)
        : true)
  );

  const getRandomColor = () => {
    const colors = [
      "#FFDDC1",
      "#FFABAB",
      "#FFC3A0",
      "#D5AAFF",
      "#C1E1C1",
      "#D4E157",
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateRows: "500px",
          gridTemplateColumns: "25% 70%",
          gap: "10px",
        }}
      >
        {/* Left side filter */}
        <div style={{ padding: "16px" }}>
          <Card style={{ position: "sticky", top: "80px" }}>
            <CardContent>
              <Typography variant="h6" style={{ fontWeight: "bold", marginBottom: "16px" }}>
                Filter by Location
              </Typography>
              <FormGroup>
                {[
                  "Kolkata",
                  "Delhi",
                  "Mumbai",
                  "Bangalore",
                  "Hyderabad",
                  "Pune",
                  "Noida",
                ].map((location) => (
                  <FormControlLabel
                    key={location}
                    control={
                      <Checkbox
                        value={location}
                        onChange={handleLocationChange}
                        checked={selectedLocations.includes(location)}
                      />
                    }
                    label={location}
                  />
                ))}
              </FormGroup>

              <Typography variant="h6" style={{ fontWeight: "bold", margin: "24px 0 16px" }}>
                Filter by Job Niche
              </Typography>
              <FormGroup>
                {["Freelancing", "Remote", "On Site", "Internship"].map((niche) => (
                  <FormControlLabel
                    key={niche}
                    control={
                      <Checkbox
                        value={niche}
                        onChange={handleNicheChange}
                        checked={selectedNiches.includes(niche)}
                      />
                    }
                    label={niche}
                  />
                ))}
              </FormGroup>
            </CardContent>
          </Card>
        </div>

        {/* Right side job cards */}
        <div
          style={{
            padding: "16px",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "16px",
          }}
        >
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <StyledCard
                key={job._id}
                color={getRandomColor()}
                style={{
                  height: "200px",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  style={{
                    flex: "1 0 auto",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography variant="h5" style={{ fontSize: "1.1rem", marginBottom: "8px" }}>
                    {job.jobTitle}
                  </Typography>
                  <Typography variant="subtitle1" style={{ marginBottom: "8px", color: "#555" }}>
                    {job.companyName}
                  </Typography>
                  <Typography
                    variant="body2"
                    style={{
                      flex: "1",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      display: "-webkit-box",
                      WebkitBoxOrient: "vertical",
                      WebkitLineClamp: 3,
                    }}
                  >
                    {job.jobDescription.split(" ").slice(0, 5).join(" ")}
                    <span>...</span>
                  </Typography>
                  <Typography variant="caption" style={{ display: "block", marginTop: "8px" }}>
                    Location: {job.location}
                  </Typography>
                  <Typography
                    variant="caption"
                    style={{
                      position: "absolute",
                      bottom: "8px",
                      right: "8px",
                      fontSize: "0.8rem",
                    }}
                  >
                    Posted on: {new Date(job.psotedAt).toLocaleDateString()}
                  </Typography>
                </CardContent>
                <StyledButton onClick={() => handleViewMore(job)}>
                  View More
                </StyledButton>
              </StyledCard>
            ))
          ) : (
            <Typography variant="h6" style={{ textAlign: "center" }}>
              <img
                style={{ marginLeft: "200px" }}
                src="https://img.freepik.com/premium-vector/no-data-empty-file-folder-found-information-confused-office-worker-searching-documents-with-magnifying-glass-archive-storage-missing-papers-finding-malfunction-vector-concept_533410-3459.jpg?size=626&ext=jpg&ga=GA1.1.1367428396.1725394760&semt=ais_hybrid"
                alt="No data"
              />
            </Typography>
          )}
        </div>
      </div>

      {/* Floating dialog for viewing more details */}
      <Dialog open={!!selectedJob} onClose={handleClose}>
        <DialogTitle>{selectedJob?.jobTitle}</DialogTitle>
        <DialogContent>
          <Typography variant="h6" style={{ marginBottom: "16px", fontSize: "1.25rem" }}>
            Company: {selectedJob?.companyName}
          </Typography>
          <Typography variant="body1" style={{ marginBottom: "16px" }}>
            Job Description: {selectedJob?.jobDescription}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "8px", color: "#555" }}>
            Location: {selectedJob?.location}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "8px", color: "#555" }}>
            Salary: {selectedJob?.salary}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "8px", color: "#555" }}>
            Qualifications: {selectedJob?.qualifications}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "8px", color: "#555" }}>
            Required Skills: {selectedJob?.requiredSkills}
          </Typography>
          <Typography variant="body2" style={{ marginBottom: "8px", color: "#555" }}>
            Responsibilities: {selectedJob?.responsibilities}
          </Typography>
          <StyledButton
            onClick={() => handleApply(selectedJob?._id)}
            disabled={role === "Recruiter" || appliedJobs[selectedJob?._id]}
            style={{ marginTop: "16px" }}
          >
            {appliedJobs[selectedJob?._id] ? "Already Applied" : "Apply Now"}
          </StyledButton>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Jobs;
