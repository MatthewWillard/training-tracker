import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import LandingPage from "./components/LandingPage/LandingPage";
import LogIn from "./components/LogIn/LogIn";
import SignUpForm from "./components/SignUpForm/SignUpForm";
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
    minitrainings3: "",
    level: "Temp",
    newemployeeName: "",
    loggedIn: false
  };

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

  updateMinitrainings3 = trainings => {
    this.setState({
      minitrainings3: trainings
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

  handleUpdatetrainings = (e, employeeId) => {
    e.preventDefault();
    this.clearError();
    const data = { trainings: this.state.minitrainings, level: this.state.level, trainings2: this.state.minitrainings2, trainings3: this.state.minitrainings3 };
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
          minitrainings3: "",
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

  handleTimer = (employeeId, level) => {
    const time =
      level === "Full-Time" ? 300000 : level === "Part-Time" ? 600000 : 1200000;
    setTimeout(this.handleAlert, time, employeeId);
  };

  handleAlert = employeeId => {
    const alertemployee = this.state.employees.find(
      employee => employee.id === employeeId
    );
    const employeeOrder = { ...alertemployee, alert: true, order: new Date() };
    this.setState({
      employees: this.state.employees.map(employee =>
        employee.id !== employeeId ? employee : employeeOrder
      )
    });
  };

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

  handleSignUpSubmit = e => {
    e.preventDefault();
    const { username, password, email, confirm_password } = e.target;

    this.setState({
      hasError: false,
      error: null
    });

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
            minitrainings3: this.state.minitrainings3,
            level: this.state.level,
            loggedIn: this.state.loggedIn,
            newemployeeName: this.state.newemployeeName,
            handleAddemployee: this.handleAddemployee,
            handleAddemployeeSubmit: this.handleAddemployeeSubmit,
            handleDeleteemployee: this.handleDeleteemployee,
            toggleExpand: this.toggleExpand,
            updateMinitrainings: this.updateMinitrainings,
            updateMinitrainings2: this.updateMinitrainings2,
            updateMinitrainings3: this.updateMinitrainings3,
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
                <Route path="/signup" component={SignUpForm} />
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