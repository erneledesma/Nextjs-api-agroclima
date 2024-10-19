
"use client"
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  CartesianGrid, 
  LineChart, 
  ResponsiveContainer, 
  Line, 
  XAxis,
  YAxis,
  Tooltip, 
  Legend } from "recharts";


export default function WeatherSPA() {

  const [lat, setLat] = useState('');
  const [lon, setLon] = useState('');
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const API_KEY = 'Api Key';

  const fetchWeatherData = async () => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch(
        `http://api.agromonitoring.com/agro/1.0/weather?appid=${API_KEY}&lat=${lat}&lon=${lon}`
      );
      const data = await response.json();
      setWeather(data);
      console.log(data);
    }

    catch (error) {
      setError('Error fetching data');
    }
    setLoading(false);
  }

    const formatTemperature = (kelvin) => (kelvin - 273.15).toFixed(2);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6 text-center">Weather SPA</h1>

      <div className= "flex flex-col md:flew-row gap-4 mb-6">
        <Input 
        type="number"
        placeholder="Latitude"
        className="flex-1"
        value={lat}
        onChange={(e) => setLat(e.target.value)}
        />
         <Input 
        type="number"
        placeholder="Longitude"
        className="flex-1"
        value={lon}
        onChange={(e) => setLon(e.target.value)}
        />

        <Button onClick={fetchWeatherData} >
          Buscar
        </Button>
  //TODO: Funcion de error de respuesta
      </div>

    { weather && (
      <div className="grid grid=cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Weather</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Temperature:{formatTemperature(weather.main.temp)} Cº</p>
            <p>Humidity: {weather.main.humidity} %</p>
            <p>Wind: 10 km/h</p>
            <p>Feels Like</p>
          </CardContent>
          <CardContent>
          {/* <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={[
                {name: 'Current', temperature: '' },
                {name: 'feels like', temperature: '' },
                {name: 'Max', temperature: '' },
                {name: 'Min', temperature: '' },
              ]}
              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
            >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="temperature" stroke="#8884d8" activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer> */}
          </CardContent>
        </Card>
      </div>
    
    )}

    </div>
  );
}
