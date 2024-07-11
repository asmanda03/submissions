//api.js
import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:3001";

class JoblyApi {
  static token;

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${JoblyApi.token}` };
    const params = (method === "get") ? data : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  static async getCompany(handle) {
    let res = await this.request(`companies/${handle}`);
    return res.company;
  }

  // Additional API methods...
}

JoblyApi.token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3R1c2VyIiwiaXNBZG1pbiI6ZmFsc2UsImlhdCI6MTU5ODE1OTI1OX0.FtrMwBQwe6Ue-glIFgz_Nf8XxRT2YecFCiSpYL0fCXc";
export default JoblyApi;


//App.js
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Homepage from './Homepage';
import CompanyList from './CompanyList';
import CompanyDetail from './CompanyDetail';
import JobList from './JobList';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import ProfileForm from './ProfileForm';
import NavBar from './NavBar';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/companies" component={CompanyList} />
        <Route exact path="/companies/:handle" component={CompanyDetail} />
        <Route exact path="/jobs" component={JobList} />
        <Route exact path="/login" component={LoginForm} />
        <Route exact path="/signup" component={SignupForm} />
        <Route exact path="/profile" component={ProfileForm} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

//CompanyList.js
import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import CompanyCard from './CompanyCard';

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getCompanies() {
      let companies = await JoblyApi.getCompanies(searchTerm);
      setCompanies(companies);
    }
    getCompanies();
  }, [searchTerm]);

  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <h1>Companies</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleSearch}
      />
      {companies.length
        ? companies.map(c => (
            <CompanyCard
              key={c.handle}
              handle={c.handle}
              name={c.name}
              description={c.description}
              logoUrl={c.logoUrl}
            />
          ))
        : <p>No companies found.</p>}
    </div>
  );
}

export default CompanyList;

//CompanyCard.js
import React from 'react';
import { Link } from 'react-router-dom';

function CompanyCard({ handle, name, description, logoUrl }) {
  return (
    <div>
      <Link to={`/companies/${handle}`}>
        <h2>{name}</h2>
        <p>{description}</p>
        {logoUrl && <img src={logoUrl} alt={name} />}
      </Link>
    </div>
  );
}

export default CompanyCard;

//CompanyDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from '../api';
import JobCard from './JobCard';

function CompanyDetail() {
  const { handle } = useParams();
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function getCompany() {
      let company = await JoblyApi.getCompany(handle);
      setCompany(company);
    }
    getCompany();
  }, [handle]);

  if (!company) return <div>Loading...</div>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.jobs.map(job => (
        <JobCard
          key={job.id}
          id={job.id}
          title={job.title}
          salary={job.salary}
          equity={job.equity}
        />
      ))}
    </div>
  );
}

export default CompanyDetail;

//JobList.js
import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from './JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    async function getJobs() {
      let jobs = await JoblyApi.getJobs(searchTerm);
      setJobs(jobs);
    }
    getJobs();
  }, [searchTerm]);

  function handleSearch(evt) {
    setSearchTerm(evt.target.value);
  }

  return (
    <div>
      <h1>Jobs</h1>
      <input
        type="text"
        placeholder="Enter search term"
        value={searchTerm}
        onChange={handleSearch}
      />
      {jobs.length
        ? jobs.map(j => (
            <JobCard
              key={j.id}
              id={j.id}
              title={j.title}
              salary={j.salary}
              equity={j.equity}
            />
          ))
        : <p>No jobs found.</p>}
    </div>
  );
}

export default JobList;


//JobCard.com
import React from 'react';

function JobCard({ id, title, salary, equity }) {
  return (
    <div>
      <h2>{title}</h2>
      <p>Salary: {salary}</p>
      <p>Equity: {equity}</p>
    </div>
  );
}

export default JobCard;


//LoginForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from '../api';

function LoginForm({ setToken }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let token = await JoblyApi.login(formData);
    setToken(token);
    history.push('/');
  }

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default LoginForm;


//SignUpForm.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import JoblyApi from '../api';

function SignupForm({ setToken }) {
  const history = useHistory();
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
  });

  function handleChange(evt) {
    const { name, value } = evt.target;
    setFormData(data => ({
      ...data,
      [name]: value
    }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    let token = await JoblyApi.signup(formData);
    setToken(token);
    history.push('/');
  }

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
        />
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignupForm;


