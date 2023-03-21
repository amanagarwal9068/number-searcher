const CardItem = (props) => {
  return (
    <>
      <div className='card mx-2 my-2' style={{ width: '14rem' }}>
        <img src={props.worker.Picture?.url} className='card-img-top' alt='' />
        <div className='card-body'>
          <h5 className='card-title'>
            {props.worker.name.length < 12
              ? props.worker.name
              : props.worker.name.slice(0, 12) + '...'}
          </h5>
          <p className='card-text'>{props.worker.profession}</p>
          <i className='fa-solid fa-phone' style={{ color: '#075ef2' }}></i>
        </div>
      </div>
    </>
  );
};
export default CardItem;
