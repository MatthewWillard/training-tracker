import React from "react";
import Nav from "../Nav/Nav";
import "./Main.css";
import Context from "../../context/Context";
import employeesApiService from "../../services/employees-api-service";
import TokenService from "../../services/token-service";


class Main extends React.Component {
  static contextType = Context;

  // When component loads, gets employees from server
  componentDidMount() {
    this.context.clearError();
    if(TokenService.hasAuthToken()) {
      return employeesApiService.getemployees()
      .then(employees => this.context.setemployees(employees))
      .catch(error => this.context.setError(error));
    }
    
    this.props.history.push("/login");
    this.context.setemployees([]);
  }

  render() {
    // employees are sorted and listed so that employees requiring checkins move to top of list
    // employee that has first expired timer stays at the top of the list
    // employees that do not have expired timers stay beneath all employees with expired timers
    const employeesFromContext = this.context.employees || [];
    const employeesToSort = employeesFromContext.filter(
      employee => employee.order !== 0
    );

    const sortedemployees = employeesToSort.sort((a, b) =>
      a.order > b.order ? 1 : -1
    );

    const employeesToList = employeesFromContext.filter(
      employee => employee.order === 0
    );

    const allemployees = [...sortedemployees, ...employeesToList];

    const employees = allemployees.map((employee, index) => {
      return (
        <li
          key={index}
          className={employee.alert === true ? `alert ${employee.level}` : ""}
        >
          <h4>{employee.name}</h4>
          <p className="trainings">Training Status: {employee.trainings}</p>
          <p className="trainings">Training Status: {employee.trainings2}</p>
          <p>Employement Level: {employee.level}</p>
          <button
            className={employee.expand ? "cancel" : "checkin"}
            onClick={e => this.context.toggleExpand(employee.id)}
          >
            {employee.expand === true ? "Cancel" : "Update Employee"}
          </button>
          <div className={employee.expand === false ? "hidden" : "show"}>
            <form onSubmit={e => this.context.handleUpdatetrainings(e, employee.id)}>
              <div>
                <label htmlFor="new-trainings">New trainings:</label>
                <textarea
                  placeholder="Update Training Status"
                  name="new-trainings"
                  id="new-trainings"
                  type="text"
                  value={this.context.minitrainings}
                  onChange={e => this.context.updateMinitrainings(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-trainings">New trainings2:</label>
                <textarea
                  placeholder="Update Training Status2"
                  name="new-trainings"
                  id="new-trainings"
                  type="text"
                  value={this.context.minitrainings2}
                  onChange={e => this.context.updateMinitrainings2(e.target.value)}
                  required
                />
              </div>
              <div className="radio">
                <input
                  type="radio"
                  value="0"
                  id="Full-Time"
                  name="level"
                  onChange={e => this.context.updateLevel("Full-Time")}
                />
                <label htmlFor="Full-Time">Full-Time</label>
                <input
                  type="radio"
                  value="1"
                  id="Part-Time"
                  name="level"
                  onChange={e => this.context.updateLevel("Part-Time")}
                />
                <label htmlFor="Part-Time">Part-Time</label>
                <input
                  type="radio"
                  value="3"
                  id="Temp"
                  name="level"
                  onChange={e => this.context.updateLevel("Temp")}
                />
                <label htmlFor="Temp">Temp</label>
              </div>
              <button type="submit" className="update-submit">
                Update
              </button>
            </form>
          </div>
        </li>
      );
    });
    return (
      <div className="main-view">
        <Nav />
        <main>
          <header>
            <h2>Welcome back{(this.context.username) ? `, ${this.context.username}` : ''}!</h2>
          </header>
          {/* {this.context.error && <p className="error">{this.context.error}</p>} */}
          <section className="employee-list">
            <h3>Employees</h3>
            <div className="employee-list-container">
              <ul>{employees}</ul>
            </div>
          </section>
        </main>
      </div>
    );
  }
}

export default Main;