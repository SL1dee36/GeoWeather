import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonItem, IonLabel, IonButton } from '@ionic/react';
import { locationOutline, cloudOutline, thermometerOutline, partlySunnyOutline } from 'ionicons/icons'; // Исправлено здесь
import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import axios from 'axios';
import './Tab1.css';

const Tab1: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [errorCode, setErrorCode] = useState<number | null>(null);
    const [manualInput, setManualInput] = useState<boolean>(false);
    const [manualLatitude, setManualLatitude] = useState<string>('');
    const [manualLongitude, setManualLongitude] = useState<string>('');
    const [weatherData, setWeatherData] = useState<any | null>(null);
    const apiKey = 'bf735a0b0f4f17caaada412effe70fa9';  // Замените на ваш API ключ

    useEffect(() => {
        const getCurrentPosition = async () => {
            try {
                const position = await Geolocation.getCurrentPosition();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
                setError(null);
                setErrorCode(null);
                console.log('Current position:', position);
            } catch (err: any) {
                setError('Error getting location: ' + err.message);
                setErrorCode(err.code);
                console.error('Error getting location:', err);
            }
        };
       getCurrentPosition();
    }, []);

    useEffect(() => {
        const fetchWeatherData = async () => {
            if (latitude && longitude) {
                try {
                    const response = await axios.get(
                        `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`
                    );
                    setWeatherData(response.data);
                    console.log('Weather data:', response.data);
                } catch (err: any) {
                    setError('Error fetching weather data: ' + err.message);
                   console.error('Error fetching weather data', err);
                }
            }
        }
      fetchWeatherData();
    }, [latitude, longitude, apiKey])

  const handleManualInputToggle = () => {
    setManualInput(!manualInput);
  };

  const handleManualSubmit = () => {
      const lat = parseFloat(manualLatitude);
      const lng = parseFloat(manualLongitude);
      if (!isNaN(lat) && !isNaN(lng)) {
          setLatitude(lat);
          setLongitude(lng);
          setError(null);
          setErrorCode(null);
          setManualInput(false)
      }else {
        setError('Invalid latitude or longitude');
        setErrorCode(null)
      }
    }
    return (
      <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Weather</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Weather</IonTitle>
          </IonToolbar>
        </IonHeader>
      
        <div id="container">
          {latitude && longitude ? (
            <IonCard>
            <IonCardContent>
              <IonItem>
                <IonIcon icon={locationOutline} slot="start" />
                <IonLabel>
                <strong>
                  Latitude: {latitude} <br />
                  Longitude: {longitude}
                  </strong>
                </IonLabel>
              </IonItem>
                {weatherData ? (
                    <div style={{marginTop: '10px'}}>
                      <IonItem>
                        <IonIcon icon={thermometerOutline} slot="start" />
                          <IonLabel>Temperature: {weatherData.main.temp} °C</IonLabel>
                      </IonItem>
                       <IonItem>
                       <IonIcon icon={cloudOutline} slot="start" />
                       <IonLabel>Description: {weatherData.weather[0].description}</IonLabel>
                       </IonItem>
                     <IonItem>
                       <IonIcon icon={partlySunnyOutline} slot="start" />
                       <IonLabel>Wind speed: {weatherData.wind.speed} m/s</IonLabel>
                       </IonItem>
                    </div>
                ) : null}
              </IonCardContent>
              </IonCard>
          ) : null}
           {error ? (
                <IonCard>
              <IonCardContent>
                <IonItem>
                    <IonLabel>
                      <strong>
                        {error}
                            {errorCode===2 ? 
                                <>
                                    <p>Не удалось получить местоположение. Попробуйте использовать ручной ввод.</p>
                                    <IonButton onClick={handleManualInputToggle} expand="full" fill="outline">
                                      {manualInput ? "Скрыть ручной ввод" : "Ручной ввод"}
                                    </IonButton>
                                </>
                                :''}
                              {errorCode !== null ? ` (Error Code: ${errorCode})` : ''}
                          </strong>
                    </IonLabel>
                  </IonItem>
                {manualInput &&(
                   <div>
                    <IonItem>
                    <IonLabel position="floating">Latitude</IonLabel>
                      <input
                        type="text"
                        placeholder="Enter latitude"
                        value={manualLatitude}
                        onInput={(e) => setManualLatitude((e.target as HTMLInputElement).value)} //Исправлено здесь
                        />
                    </IonItem>
                    <IonItem>
                    <IonLabel position="floating">Longitude</IonLabel>
                      <input
                        type="text"
                        placeholder="Enter longitude"
                        value={manualLongitude}
                        onInput={(e) => setManualLongitude((e.target as HTMLInputElement).value)}  //Исправлено здесь
                        />
                    </IonItem>
                   <IonButton onClick={handleManualSubmit} expand="full" fill="outline">Submit</IonButton>
                    </div>
                     )}
                </IonCardContent>
                 </IonCard>
          ) : null}
           </div>
      </IonContent>
    </IonPage>
    )
};

export default Tab1;