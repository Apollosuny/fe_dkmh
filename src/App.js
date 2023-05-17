import { useEffect, useState } from 'react';
import './App.css';
import Data from '../src/Data/getClass.json';
import Cookies from 'js-cookie';

function App() {

  const [subjects, setSubjects] = useState([]);
  const [guid, setGuid] = useState([]);
  const [cookies, setCookies] = useState('');

  useEffect(() => {
    // fetch('https://jsonplaceholder.typicode.com/posts')
    // fetch('https://apollo-r35f.onrender.com/')
    // fetch('http://localhost:5000/get')
    //   .then(res => console.log(res))
    //   .then(data => {
    //     console.log(data);
    //     // setCookies(data.cookie.result);
    //   })
    //   .catch(err => console.log(err));
  }, [])

  console.log(Cookies.get('ASC.AUTH'));

  const handleSubmit = (e) => {

    const body = {
      guid: guid,
      subjects: subjects,
      cookies: Cookies.get('ASC.AUTH')
    };
    console.log(body);

    fetch('https://be-dkmh.onrender.com/register', {
      // fetch('http://localhost:5000/register', {
      method: "POST",
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body)
    })
    // console.log(JSON.stringify(subjects));

    // body {
    //  tên
    //  list môn học: [string]
    //  cookies
    // }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    const checked = e.target.checked;
    console.log(value, checked);
    // console.log(value.split(/-(.*)/s));
    let [ subjects_value, guid_value ] = value.split(/-(.*)/s);
    // console.log(subjects_value, guid_value);
    if (checked) {
      setGuid([
        ...guid, guid_value
      ])
      setSubjects([
        ...subjects, subjects_value
      ])
    } else {
      setSubjects(subjects.filter((e) => (e !== value)))
    }
  }

  const renderClass = () => {
    return Data.map((item, index) => {
      return <tr key={index}>
              <td>{index+1}</td>
              <td>{item.class_code}</td>
              <td>{item.course_code}</td>
              <td>{item.room}</td>
              <td>{item.time_slot}</td>
              <td>{item.lecturer}</td>
              <td>{item.from_to}</td>
              <th scope='row'>
                <input name={item.guid} value={`${item.course_code}-${item.guid}`} onChange={handleChange} className='checkbox-subject' type='checkbox' />
                <label className='form-check-label' htmlFor='js-check-all'></label>
              </th>
            </tr>
    })
  }

  return (
    <div className="App">
      <h1>Welcome to my tool</h1>
      <div className='subjects'>
        <div className='container'>
          <div className='table-header'>
            <table cellPadding="0" cellSpacing="0" border="0" className='table responsive-table'>
              <thead>
                <tr>
                  <th scope='col'>#</th>
                  <th scope='col'>class_code</th>
                  <th scope='col'>course_code</th>
                  <th scope='col'>room</th>
                  <th scope='col'>time_slot</th>
                  <th scope='col'>lecturer</th>
                  <th scope='col'>from_to</th>
                  <th scope='row'>
                    <input className='form-check-input' type='checkbox' id='checkbox-all' />
                    <label className='form-check-label' for='checkbox-all'></label>
                  </th>
                </tr>
              </thead>
            </table>
          </div>
          <div className='table-content'>
            <form onSubmit={handleSubmit}>
              <table cellPadding="0" cellSpacing="0" border="0">
                <tbody>
                  {renderClass()}
                </tbody>
              </table>
              <button className='btn-submit' type='submit'>Submit</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
