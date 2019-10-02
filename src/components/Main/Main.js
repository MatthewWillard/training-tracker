import React from "react";
import Nav from "../Nav/Nav";
import "./Main.css";
import Context from "../../context/Context";
import employeesApiService from "../../services/employees-api-service";
import TokenService from "../../services/token-service";


class Main extends React.Component {
  static contextType = Context;

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
          <h2>{employee.name}</h2>
          <p className="trainings">Current Training Level: {employee.trainings}</p>
          <p className="trainings">Next Training: {employee.trainings2}</p>
          <p className="trainings">Next Training2: {employee.trainings3}</p>
          <button
            className={employee.expand ? "cancel" : "checkin"}
            onClick={e => this.context.toggleExpand(employee.id)}
          >
            {employee.expand === true ? "Cancel" : "Update Employee"}
          </button>
          <div className={employee.expand === false ? "hidden" : "show"}>
            <form onSubmit={e => this.context.handleUpdatetrainings(e, employee.id)}>
              <div>
                <label htmlFor="new-trainings">Current Training Level</label>
                <textarea
                  placeholder="Update Training Level"
                  name="new-trainings"
                  id="new-trainings"
                  type="text"
                  value={this.context.minitrainings}
                  onChange={e => this.context.updateMinitrainings(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-trainings">Next Training</label>
                <textarea
                  placeholder="Update Next Training"
                  name="new-trainings"
                  id="new-trainings"
                  type="text"
                  value={this.context.minitrainings2}
                  onChange={e => this.context.updateMinitrainings2(e.target.value)}
                  required
                />
              </div>
              <div>
                <label htmlFor="new-trainings">Next Training2</label>
                <textarea
                  placeholder="Update Next Training2"
                  name="new-trainings"
                  id="new-trainings"
                  type="text"
                  value={this.context.minitrainings3}
                  onChange={e => this.context.updateMinitrainings3(e.target.value)}
                  required
                />
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
          <section className="employee-list">
            <h3>Employee List</h3>
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