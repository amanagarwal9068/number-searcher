import { useContext, useEffect } from 'react';
import WorkersContext from '../context/WorkersContext';
import CardItem from './CardItem';

const Card = () => {
  const workersContext = useContext(WorkersContext);

  useEffect(() => {
    workersContext.fetchWorkers();
  }, []);

  return (
    <>
      <div className='row d-flex justify-content-center my-5'>
        {!workersContext.workers || !workersContext.workers.length ? (
          <h1>No workers found</h1>
        ) : (
          workersContext.workers.map((worker) => {
            return <CardItem key={worker.id} worker={worker} />;
          })
        )}
      </div>
    </>
  );
};
export default Card;
