'use client'
import { useEffect, useState } from "react"
import { useRouter } from 'next/navigation'
import GaugeComponent from 'react-gauge-component';
import NavBar from './components/nav-bar'
import axios from 'axios'

export default function Home() {
  const [curReading, setCurReading] = useState({pH: 7, temp: 37.7, dox: 7.7})

  useEffect(()=>{

    getSensorData()
  },[])

  const getSensorData = async () => {
    await axios.get(`https://fishpondmonitoring.netlify.app/api/sensor-readings`).then(res => {
    // await axios.get(`http://localhost:3000/api/sensor-readings`).then(res => {
      // console.log('response', res.data.data)
      setCurReading(res.data?.data[0])
      console.log(res.data?.data[0])
      console.log
    }).catch(err => {
      console.log('error', err)
    })
  }

  return (
    <div className=" flex justify-center flex-col my-2 mb-14">
      <NavBar></NavBar>

      <div className="text-center text-2xl sm:text-3xl mb-6 text-gray-600 font-bold mt-2" >Fish Pond Monitoring</div>
      <div className="grid grid-flow-col sm:grid-rows-1 grid-rows-3 w-screen">
        <div className="justify-self-center" style={{width: '75%'}}>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 10,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low Temperature!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 15,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Temperature!'
                  }
                },
                {
                  limit: 40,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Temperature!'
                  }
                },
                {
                  limit: 45, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High Temperature!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high Temperature!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + '°C', 
                style: {display:'none'}
              },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + '°C' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 30 },
                  { value: curReading?.temp },
                  { value: 50 }
                ],
              }
            }}
            value={curReading?.temp}
            minValue={0}
            maxValue={50}
          />
          <p className="text-center text-gray-600">{curReading?.temp} °C</p>
          <h4 className="text-center text-gray-600 font-bold mb-4">Temperature</h4>
        </div>
        <div className="justify-self-center" style={{width: '75%'}}>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 4,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low pH!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 6,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low pH!'
                  }
                },
                {
                  limit: 9,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK pH!'
                  }
                },
                {
                  limit: 11, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High pH!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high pH!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + '', 
                style: {display:'none'}
              },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + '' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 3 },
                  { value: curReading?.pH },
                  { value: 12 }
                ],
              }
            }}
            value={curReading?.pH}
            minValue={3}
            maxValue={12}
          />
          <p className="text-center text-gray-600">{curReading?.pH}</p>
          <h4 className="text-center text-gray-600 font-bold">pH</h4>
        </div>
        <div className="justify-self-center" style={{width: '75%'}}>
          <GaugeComponent
            type="semicircle"
            arc={{
              width: 0.2,
              padding: 0.005,
              cornerRadius: 1,
              // gradient: true,
              subArcs: [
                {
                  limit: 2,
                  color: '#EA4228',
                  showTick: true,
                  tooltip: {
                    text: 'Too low Dissolved Oxygen!'
                  },
                  onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
                  onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
                  onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
                },
                {
                  limit: 3,
                  color: '#F5CD19',
                  showTick: true,
                  tooltip: {
                    text: 'Low Dissolved Oxygen!'
                  }
                },
                {
                  limit: 12,
                  color: '#5BE12C',
                  showTick: true,
                  tooltip: {
                    text: 'OK Dissolved Oxygen!'
                  }
                },
                {
                  limit: 13, color: '#F5CD19', showTick: true,
                  tooltip: {
                    text: 'High Dissolved Oxygen!'
                  }
                },
                {
                  color: '#EA4228',
                  tooltip: {
                    text: 'Too high Dissolved Oxygen!'
                  }
                }
              ]
            }}
            pointer={{
              color: '#345243',
              length: 0.80,
              width: 15,
              elastic: true,
            }}
            labels={{
              valueLabel: { formatTextValue: value => value + 'mg/L', 
                style: {display:'none'}
              },
              tickLabels: {
                type: 'outer',
                defaultTickValueConfig: { 
                  formatTextValue: (value) => value + 'mg/L' ,
                  style: {fontSize: 10}
              },
                ticks: [
                  { value: 0 },
                  { value: curReading?.dox },
                  { value: 15 }
                ],
              }
            }}
            value={curReading?.dox}
            minValue={0}
            maxValue={15}
          />
          <p className="text-center text-gray-600">{curReading?.dox} mg/L</p>
          <h4 className="text-center text-gray-600 font-bold">Dissolved Oxygen</h4>
        </div>



        
        
      </div>
    </div>
  );
}
