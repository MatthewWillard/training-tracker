import React from "react";

const Context = React.createContext({
  employees: [],
  hasError: false,
  error: null,
  username: '',
  user_id: null,
  minitrainings: '',
  level: '',
  loggedIn: false,
  newemployeeName: '',
  handleAddemployee: () => {},
  handleAddemployeeSubmit: () => {},
  handleDeleteemployee: () => {},
  toggleExpand: () => {},
  updateMinitrainings: () => {},
  updateMinitrainings2: () => {},
  updateMinitrainings3: () => {},
  updateLevel: () => {},
  handleUpdatetrainings: () => {},
  updateNewemployeeName: () => {},
  updateConfirmPassword: () => {},
  updatePassword: () => {},
  updateEmail: () => {},
  updateUsername: () => {},
  updatedLoggedIn: () => {},
  updateUserId: () => {},
  handleSignUpSubmit: () => {},
  setError: () => {},
  clearError: () => {},
  setemployees: () => {}
});

export default Context;