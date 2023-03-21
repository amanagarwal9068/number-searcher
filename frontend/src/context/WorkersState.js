import WorkersContext from './WorkersContext';
import { useState } from 'react';

const WorkersState = (props) => {
  const [workers, setWorkers] = useState([]);

  const fetchWorkers = (params) => {
    let apiUrl = `${process.env.REACT_APP_API_URL}/worker/list?`;
    for (let param in params) {
      if (params[param]) {
        apiUrl += `${param}=${params[param]}&`;
      }
    }
    fetch(apiUrl)
      .then((response) => {
        response
          .json()
          .then((response) => {
            console.log(response);
            setWorkers(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <WorkersContext.Provider value={{ workers, setWorkers, fetchWorkers }}>
      {props.children}
    </WorkersContext.Provider>
  );
};
export default WorkersState;
