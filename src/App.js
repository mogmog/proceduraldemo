import logo from './logo.svg';
import './App.css';
import ProceduralMap from 'procedural-gl-react';
//import waypoints from './waypoints.json'
import {useState, useRef} from 'react';

const waypoints = [
    {
        "position" : {
            "latitude": 47.5,
            "longitude": 13.55
        }
    },

    {
        "position" : {
            "latitude": 47.6,
            "longitude": 13.45
        }
    },

    {
        "position" : {
            "latitude": 47.5,
            "longitude": 13.55
        }
    }
];

function App() {

  const containerRef = useRef(null);
  const [waypoint, setWaypoint] = useState(waypoints);

  return (
    <div className="App">

        <div className={"Map"}>

                <ProceduralMap
                    ref={containerRef}
                    datasource={{
                        elevation: {
                        apiKey: '1b045ec93f5b94db894037db8d297128e'
                    },
                        imagery: {
                        urlFormat: 'https://api.maptiler.com/tiles/satellite/{z}/{x}/{y}.jpg?key=cZQg2QaktSnI18BSAxZX',
                        attribution: '<a href="https://www.maptiler.com/copyright/">Maptiler</a> <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    }
                     }}
                    compassVisible={false}
                    displayLocation={
                        {
                            latitude: 44.5, longitude: 6.3
                        }
                    }/>
        </div>

          <div className="gallery_scroller">

              {waypoints.map((w, i) => <div key={i} className="colored_card" >
                  test
                  <button onClick={() => {

                      const Procedural = (containerRef.current);

                      var target = {
                          latitude: 44.5, longitude: 6.3,
                          angle: 0, bearing: i *20, distance: 1000,
                          animationDuration: 2
                      };
                      Procedural.focusOnLocation ( target );

                      //setWaypoint(w)

                  }}>Go to </button>
              </div>)}

          </div>

    </div>
  );
}

export default App;
