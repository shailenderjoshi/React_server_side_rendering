import React, { useState, useEffect } from 'react';
import './App.css';

function App() {

  const [ dataArr, setDataArr] = useState([]);
  const [ loading, setLoading] = useState(false);
  const [ launchSuccess, setlaunchSuccess] = useState('NO');
  const [ landSuccess, setlandSuccess] = useState('NO');
  const [ launchYear, setlaunchYear] = useState('NO');
  

  const handleFilter = (e, filterType) => {
    if( filterType === 'year' ) {
      setlaunchYear(e.target.id);
    }
    if( filterType === 'launch' ) {
      setlaunchSuccess(e.target.id);
    }
    if( filterType === 'landing' ) {
      setlandSuccess(e.target.id);
    } 
  }

  useEffect(() => {
    setLoading(true);
    fetch('https://api.spacexdata.com/v3/launches?limit=100')
    .then( res => res.json())
    .then( data => {
        setDataArr([data]);
        setLoading(false);
    });
  }, []);

  useEffect(() => {
    let queryString = '';
    if( launchSuccess !== 'NO' ) {
      queryString = '&launch_success='+launchSuccess;
    }
    if( landSuccess !== 'NO' ) {
      queryString += '&land_success='+launchSuccess;
    }
    if( launchYear !== 'NO' ) {
      queryString += '&launch_year='+launchYear;
    }
    call_api(queryString);
  }, [launchYear, launchSuccess, landSuccess]);

  async function call_api(query) {
    setLoading(true);
    const response = await fetch('https://api.spacexdata.com/v3/launches?limit=100'+query);
    const json = await response.json();
    setDataArr([json]);
    setLoading(false);
  }
  
  return (
    <div className="row">
      <div className="col_left">
          <h3>SpaceX Launch Programs</h3>
          <div className="filter_col">
              <div className="filter">Filter</div>
              <div className="filter_heading">Launch Year</div>
              <div className="button_filter_container">
                <div className="button_filter_container_left">
                    <button className={launchYear === '2006' ? 'year_button active_button': 'year_button'} id="2006" onClick={(e) => handleFilter(e, 'year')}>2006</button>
                    <button className={launchYear === '2008' ? 'year_button active_button': 'year_button'} id="2008" onClick={(e) => handleFilter(e, 'year')}>2008</button>
                    <button className={launchYear === '2010' ? 'year_button active_button': 'year_button'} id="2010" onClick={(e) => handleFilter(e, 'year')}>2010</button>
                    <button className={launchYear === '2012' ? 'year_button active_button': 'year_button'} id="2012" onClick={(e) => handleFilter(e, 'year')}>2012</button>
                    <button className={launchYear === '2014' ? 'year_button active_button': 'year_button'} id="2014" onClick={(e) => handleFilter(e, 'year')}>2014</button>
                    <button className={launchYear === '2016' ? 'year_button active_button': 'year_button'} id="2016" onClick={(e) => handleFilter(e, 'year')}>2016</button>
                    <button className={launchYear === '2018' ? 'year_button active_button': 'year_button'} id="2018" onClick={(e) => handleFilter(e, 'year')}>2018</button>
                    <button className={launchYear === '2020' ? 'year_button active_button': 'year_button'} id="2020" onClick={(e) => handleFilter(e, 'year')}>2020</button>
                </div>
                <div className="button_filter_container_right">
                    <button className={launchYear === '2007' ? 'year_button active_button': 'year_button'} id="2007" onClick={(e) => handleFilter(e, 'year')}>2007</button>
                    <button className={launchYear === '2009' ? 'year_button active_button': 'year_button'} id="2009" onClick={(e) => handleFilter(e, 'year')}>2009</button>
                    <button className={launchYear === '2011' ? 'year_button active_button': 'year_button'} id="2011" onClick={(e) => handleFilter(e, 'year')}>2011</button>
                    <button className={launchYear === '2013' ? 'year_button active_button': 'year_button'} id="2013" onClick={(e) => handleFilter(e, 'year')}>2013</button>
                    <button className={launchYear === '2015' ? 'year_button active_button': 'year_button'} id="2015" onClick={(e) => handleFilter(e, 'year')}>2015</button>
                    <button className={launchYear === '2017' ? 'year_button active_button': 'year_button'} id="2017" onClick={(e) => handleFilter(e, 'year')}>2017</button>
                    <button className={launchYear === '2019' ? 'year_button active_button': 'year_button'} id="2019" onClick={(e) => handleFilter(e, 'year')}>2019</button>
                </div>  
                <div className="filter_heading">Successfull Launch</div>
                <div className="button_filter_container_left">
                    <button className={launchSuccess === 'true' ? 'year_button active_button' : 'year_button'} onClick={(e) => handleFilter(e, 'launch')} id="true">True</button>
                </div>
                <div className="button_filter_container_right">
                    <button className={launchSuccess === 'false' ? 'year_button active_button' : 'year_button'} onClick={(e) => handleFilter(e, 'launch')} id="false">False</button>
                </div>

                <div className="filter_heading">Successfull Landing</div>
                <div className="button_filter_container_left">
                    <button className={landSuccess === 'true' ? 'year_button active_button' : 'year_button'} onClick={(e) => handleFilter(e, 'landing')} id="true">True</button>
                </div>
                <div className="button_filter_container_right">
                    <button className={landSuccess === 'false' ? 'year_button active_button' : 'year_button'} onClick={(e) => handleFilter(e, 'landing')} id="false">False</button>
                </div>
              </div>  
          </div>
      </div>
      <div className="col_right">
          {
            loading &&
            <div className="loading_content">Loading...</div>
          }  

          {
            !loading && dataArr[0] && dataArr[0].length === 0 && 
            <div className="no_content"> Content not match for the filter...</div>
          }

          {!loading && dataArr[0] && dataArr[0].map( val => (
              <div className="product_col" key={val.flight_number}>
                <div className="prod_img"><img src={val.links.mission_patch_small} alt=""  /></div>
                <p className="prod_detail blue">{val.mission_name} #{val.flight_number}</p>
                <p className="prod_detail"><span>Mission Id:</span>
                  {val.mission_id && val.mission_id.map( val => (
                    <li key={val}>{val}</li>
                  ))}
                </p>
                <p className="prod_detail"><span>Launch Year: </span> {val.launch_year}</p>
                <p className="prod_detail"><span>Successfull Launch:</span> {(val.launch_success === true) ? 'Launch_Success' : 'false'}</p>
                <p className="prod_detail"><span>Successfull Landing:</span></p>
              </div>
          ))}
      </div>

      <div className="footer">Developed By : Shailender Joshi </div>
      
    </div>
  );
}

export default App;
