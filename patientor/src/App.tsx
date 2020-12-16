import React from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Link, Switch } from "react-router-dom";
import { Button, Divider, Header, Container } from "semantic-ui-react";

import { apiBaseUrl } from "./constants";
import { fetchDiagnosisList, setPatientList, useStateValue } from "./state";
import { Patient } from "./types";

import PatientListPage from "./PatientListPage";
import PatientDetails from "./PatientDetails";

const App: React.FC = () => {
  const [, dispatch] = useStateValue();

  React.useEffect(() => {
    axios.get<void>(`${apiBaseUrl}/ping`);

    const fetchPatientList = async () => {
      try {
        const { data: patientListFromApi } = await axios.get<Patient[]>(
          `${apiBaseUrl}/patients`
        );
        dispatch(setPatientList(patientListFromApi));
      } catch (e) {
        console.error(e);
      }
    };
    fetchPatientList();
  }, [dispatch]);

  React.useEffect(() => {
    const fetchDiagnosis = async () => {
      try {
        const result = await axios.get(`${apiBaseUrl}/diagnoses`);
        dispatch(fetchDiagnosisList(result.data));
      } catch (error) {
        console.log(`Error while fetching diagnosis from api: ${error.message}`);
      }
    }

    fetchDiagnosis();
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Container>
          <Header as="h1">Patientor</Header>
          <Button as={Link} to="/" primary>
            Home
          </Button>
          <Divider hidden />
          <Switch> 
            <Route path='/patient/:id' component={() => <PatientDetails />} />
            <Route path="/" render={() => <PatientListPage />} />
          </Switch>
        </Container>
      </Router>
    </div>
  );
};

export default App;
