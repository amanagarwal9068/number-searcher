import { useContext, useState } from 'react';
import WorkersContext from '../context/WorkersContext';

const Navbar = () => {
  const workersContext = useContext(WorkersContext);
  const [search, setSearch] = useState({ name: '', profession: '' });

  const handleSearchOnChange = (event) => {
    console.log('inside handle onChange');
    if (event.target.name === 'name') {
      setSearch({ name: event.target.value, profession: search.profession });
    } else if (event.target.name === 'profession') {
      setSearch({ name: search.name, profession: event.target.value });
    }
  };

  const handleSearchOnClick = (event) => {
    console.log('inside handle onClick');
    console.log(search);
    event.preventDefault();
    workersContext.fetchWorkers(search);
  };

  return (
    <>
      <nav className='navbar navbar-expand-lg bg-body-tertiary'>
        <div className='container-fluid'>
          <a className='navbar-brand' href='/'>
            Number Searcher
          </a>
          <button
            className='navbar-toggler'
            type='button'
            data-bs-toggle='collapse'
            data-bs-target='#navbarSupportedContent'
            aria-controls='navbarSupportedContent'
            aria-expanded='false'
            aria-label='Toggle navigation'
          >
            <span className='navbar-toggler-icon'></span>
          </button>
          <div className='collapse navbar-collapse' id='navbarSupportedContent'>
            <form className='d-flex' role='search'>
              <input
                className='form-control me-2'
                type='search'
                placeholder='Enter a name...'
                name='name'
                onChange={handleSearchOnChange}
              />
              <input
                className='form-control me-2'
                type='search'
                placeholder='Enter a profession...'
                name='profession'
                onChange={handleSearchOnChange}
              />
              <button
                className='btn btn-outline-success'
                type='submit'
                onClick={handleSearchOnClick}
              >
                Search
              </button>
            </form>
          </div>
        </div>
      </nav>
    </>
  );
};
export default Navbar;
