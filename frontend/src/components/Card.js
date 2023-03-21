import { useEffect, useState } from 'react';
import CardItem from './CardItem';

const Card = () => {
  const [workers, setWorkers] = useState(null);

  const fetchWorkers = () => {
    fetch(`${process.env.REACT_APP_API_URL}/worker/list?rangeLimit=1000`)
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

  useEffect(() => {
    fetchWorkers();
  }, []);

  return (
    <>
      <div className='row d-flex justify-content-center my-5'>
        {workers &&
          workers.map((worker) => {
            return <CardItem key={worker.id} worker={worker} />;
          })}
      </div>
      {!workers || !workers.length ? <h1>No workers found</h1> : null}
    </>
  );
};
export default Card;
