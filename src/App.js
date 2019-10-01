import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import LogIn from "./components/LogIn/LogIn";
import Main from "./components/Main/Main";
import Addemployee from "./components/AddEmployee/AddEmployee";
import NotFound from "./components/NotFound/NotFound";
import Footer from "./components/Footer/Footer";
import Context from "./context/Context";
import employeesApiService from "./services/employees-api-service";
import AuthApiService from "./services/auth-api-service";
import TokenService from "./services/token-service";
import IdleService from "./services/idle-service";

class App extends Component {
  state = {
    error: null,
    hasError: null,
    employees: [],
    username: "",
    user_id: "",
    minitrainings: "",
    minitrainings2: "",
    level: "Temp",
    newemployeeName: "",
    loggedIn: false
  };

  // Error handling
  setError = error => {
    console.error('THE ERROR IS', error);
    this.setState({
      error,
      hasError: true
    });
  };

  clearError = () => {
    this.setState({
      error: null,
      hasError: false
    });
  };

  // Adding UI data to employees from database
  setemployees = employees => {
    const addKeysemployees = employees.map(employee => {
      employee.expand = false;
      employee.alert = false;
      employee.order = 0;
      employee.level = "Temp";

      return employee;
    });
    this.setState({
      employees: addKeysemployees
    });
  };

  setNewemployee = newemployee => {
    this.setState({
      employees: [...this.state.employees, newemployee]
    });
  };

  // Auth/Idle
  componentDidMount() {
    IdleService.setIdleCallback(this.logoutFromIdle);

    if (TokenService.hasAuthToken()) {
      IdleService.registerIdleTimerResets();
      TokenService.queueCallbackBeforeExpiry(() => {
        AuthApiService.postRefreshToken();
      });
    }
  }

  componentWillUnmount() {
    IdleService.unRegisterIdleResets();
    TokenService.clearCallbackBeforeExpiry();
  }

  logoutFromIdle = () => {
    TokenService.clearAuthToken();
    TokenService.clearCallbackBeforeExpiry();
    IdleService.unRegisterIdleResets();
    this.forceUpdate();
    this.setState({
      loggedIn: false
    });
  };

  // all 'update' prefixes set state
  updateUsername = username => {
    this.setState({
      username
    });
  };

  updateUserId = user_id => {
    this.setState({
      user_id
    });
  };

  updateMinitrainings = trainings => {
    this.setState({
      minitrainings: trainings
    });
  };

  updateMinitrainings2 = trainings => {
    this.setState({
      minitrainings2: trainings
    });
  };

  updateLevel = level => {
    const updateLevel = level === "" ? "Temp" : level;
    this.setState({
      level: updateLevel
    });
  };

  updateNewemployeeName = name => {
    this.setState({
      newemployeeName: name
    });
  };

  updatedLoggedIn = () => {
    this.setState({
      loggedIn: false
    });
  };

  // Updates mini-trainings and level for employee having check-in (Main view)
  handleUpdatetrainings = (e, employeeId) => {
    e.preventDefault();
    this.clearError();
    const data = { trainings: this.state.minitrainings, level: this.state.level, trainings2: this.state.minitrainings2 };
    employeesApiService.updateemployee(employeeId, data)
      .then(res => {
        const employeeToUpdate = this.state.employees.find(
          employee => employee.id === employeeId
        );
        const updatedemployee = {
          ...employeeToUpdate,
          ...data,
          expand: false,
          order: 0
        };
        this.handleTimer(updatedemployee.id, this.state.level);
        this.setState({
          employees: this.state.employees.map(employee =>
            employee.id !== employeeId ? employee : updatedemployee
          ),
          minitrainings: "",
          minitrainings2: "",
          level: "Temp"
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({
          hasError: true,
          error: err.message
        });
      });
  };

  // Sets timer for specified level (Main view)
  // High - 5 min/300000, Medium - 10min/600000, Low - 20 min/1200000 
  handleTimer = (employeeId, level) => {
    const time =
      level === "Full-Time" ? 300000 : level === "Part-Time" ? 600000 : 1200000;
    setTimeout(this.handleAlert, time, employeeId);
  };

  // Callback fn for level timers, enables alert status and reorders (Main view)
  handleAlert = employeeId => {
    const alertemployee = this.state.employees.find(
      employee => employee.id === employeeId
    );
    // toggle alert
    const employeeOrder = { ...alertemployee, alert: true, order: new Date() };
    // re-order
    this.setState({
      employees: this.state.employees.map(employee =>
        employee.id !== employeeId ? employee : employeeOrder
      )
    });
  };

  //Updates employee and adds them to employee list (Add employee view)
  handleAddemployeeSubmit = e => {
    e.preventDefault();
    this.clearError();
    const newemployeeName = this.state.newemployeeName;

    employeesApiService.postemployee(newemployeeName)
      .then(employee => {
        this.setState({
          employees: [...this.state.employees, employee],
          newemployeeName: ""
        });
      })
      .catch(err => {
        console.error(err);
        this.setError(err);
      });
  };

  //Deletes employee from list (Add employee view)
  handleDeleteemployee = deleteemployee => {
    this.clearError();
    const employeeId = deleteemployee.id;

    employeesApiService.deleteemployee(employeeId)
      .then(() => {
        this.setState({
          employees: this.state.employees.filter(
            employee => employee.id !== employeeId
          )
        });
      })
      .catch(err => {
        console.error(err);
        this.setError(err);
      });
  };

  // Handles sign up, and validation -> will redirect upon valid sign in (see SignUpForm)
  handleSignUpSubmit = e => {
    e.preventDefault();
    const { username, password, email, confirm_password } = e.target;

    this.setState({
      hasError: false,
      error: null
    });

    //VALIDATE THAT PASSWORD MATCHES
    if (password.value !== confirm_password.value) {
      this.setState({
        hasError: true,
        error: "Passwords do not match!"
      });
      return Promise.reject();
    } else {
      return AuthApiService.postUser({
        username: username.value,
        password: password.value,
        email: email.value
      })
        .then(res => {
          if (res.username) {
            return AuthApiService.postLogin({
              username: username.value,
              password: password.value
            });
          }
        })
        .then(() => {
          if (TokenService.hasAuthToken) {
            this.setState({
              loggedIn: true,
              username: username.value
            });
          }
          username.value = "";
          password.value = "";
          email.value = "";
          confirm_password.value = "";
        })
        .catch(res => {
          this.setState({
            hasError: true,
            error: res.error
          });
        });
    }
  };


  // Expands employee checkin and updates alert and order conditions (Main view)
  toggleExpand = employeeId => {
    const employeeToExpand = this.state.employees.find(
      employee => employee.id === employeeId
    );
    const alertCheck =
      employeeToExpand.alert === false ? 0 : employeeToExpand.order;
    const expandedemployee = {
      ...employeeToExpand,
      expand: !employeeToExpand.expand,
      alert: false,
      order: alertCheck
    };
    this.setState({
      employees: this.state.employees.map(employee =>
        employee.id !== employeeId ? employee : expandedemployee
      )
    });
  };

  render() {
    return (
      <Router>
        <Context.Provider
          value={{
            employees: this.state.employees,
            hasError: this.state.hasError,
            error: this.state.error,
            username: this.state.username,
            user_id: this.state.user_id,
            minitrainings: this.state.minitrainings,
            minitrainings2: this.state.minitrainings2,
            level: this.state.level,
            loggedIn: this.state.loggedIn,
            newemployeeName: this.state.newemployeeName,
            handleAddemployee: this.handleAddemployee,
            handleAddemployeeSubmit: this.handleAddemployeeSubmit,
            handleDeleteemployee: this.handleDeleteemployee,
            toggleExpand: this.toggleExpand,
            updateMinitrainings: this.updateMinitrainings,
            updateMinitrainings2: this.updateMinitrainings2,
            updateLevel: this.updateLevel,
            handleUpdatetrainings: this.handleUpdatetrainings,
            updateNewemployeeName: this.updateNewemployeeName,
            updateConfirmPassword: this.updateConfirmPassword,
            updatePassword: this.updatePassword,
            updateEmail: this.updateEmail,
            updateUsername: this.updateUsername,
            updatedLoggedIn: this.updatedLoggedIn,
            updateUserId: this.updateUserId,
            handleSignUpSubmit: this.handleSignUpSubmit,
            setError: this.setError,
            clearError: this.clearError,
            setemployees: this.setemployees
          }}
        >
          <div className="App">
            <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route path="/login" component={LogIn} />
                <Route path="/main" component={Main} />
                <Route path="/add" component={Addemployee} />
                <Route component={NotFound} />
            </Switch>
            <Footer />
          </div>
        </Context.Provider>
      </Router>
    );
  }
}

export default App;