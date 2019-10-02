import React from "react";
import Nav from "../Nav/Nav";
import "./AddEmployee.css";
import Context from "../../context/Context";
import employeesApiService from "../../services/employees-api-service";
import TokenService from "../../services/token-service";

class AddEmployee extends React.Component {
  static contextType = Context;

  componentDidMount() {
    this.context.clearError();
    if (TokenService.hasAuthToken()) {
      return employeesApiService.getemployees()
      .then(employees => this.context.setemployees(employees))
      .catch(error => this.context.setError(error));
    }
    this.props.history.push("/login");
    this.context.setemployees([]);
  }

  render() {
    const employees = this.context.employees ? this.context.employees.map((employee, index) => {
      return (
        <li key={index}>
          {employee.name}
          <button
            onClick={e => this.context.handleDeleteemployee(employee)}
            className="delete-button"
          >
            Delete
          </button>
        </li>
      );
    }) : [];
    return (
      <div className="Add-employee">
        <Nav />
        <main>
          <header>
            <h2>Add employees</h2>
          </header>
          <form onSubmit={e => this.context.handleAddemployeeSubmit(e)}>
            <div>
              <label htmlFor="employee-name">Name:</label>
              <input
                placeholder="Employee Name"
                type="text"
                name="employee-name"
                id="employee-name"
                required
                aria-required="true"
                aria-label="employee name to add"
                value={this.context.newemployeeName}
                onChange={e =>
                  this.context.updateNewemployeeName(e.target.value)
                }
              />
            </div>
            <button type="submit">Add</button>
          </form>
        </main>
        <section className="add-employee-list">
          <ul>{employees}</ul>
        </section>
      </div>
    );
  }
}

export default AddEmployee;