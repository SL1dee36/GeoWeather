import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { pinOutline } from 'ionicons/icons';
import { useState, useEffect } from 'react';
import { Geolocation } from '@capacitor/geolocation';
import './Tab2.css';

const Tab2: React.FC = () => {
    const [latitude, setLatitude] = useState<number | null>(null);
    const [longitude, setLongitude] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);


    useEffect(() => {
        const getCurrentPosition = async () => {
          try {
            const position = await Geolocation.getCurrentPosition();
                setLatitude(position.coords.latitude);
                setLongitude(position.coords.longitude);
              setError(null);
          } catch (err: any) {
                setError('Error getting location: ' + err.message);
                console.error('Error getting location:', err);
            }
        };
        getCurrentPosition();
    }, []);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Tab 2</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Tab 2</IonTitle>
                    </IonToolbar>
                </IonHeader>

                 <div id="container">
                {latitude && longitude ? (
                <IonCard>
                 <IonCardContent>
                   <IonItem>
                     <IonIcon icon={pinOutline} slot="start"/>
                     <IonLabel>Your location latitude {latitude} longitude {longitude}</IonLabel>
                    </IonItem>
                  <div style={{width: '100%',height:"400px",backgroundColor:"#f0f0f0",textAlign:"center"}}>
                   <p style={{padding:"20px"}}>Map Placeholder - would show a map with a marker here.</p>
                    </div>
                     </IonCardContent>
                  </IonCard>
                    ) : null}
                  {error ? (
                   <IonCard>
                   <IonCardContent>
                   <IonItem>
                     <IonLabel>
                       <strong>{error}</strong>
                    </IonLabel>
                      </IonItem>
                  </IonCardContent>
                   </IonCard>
               ) : null}
               </div>
            </IonContent>
        </IonPage>
    )
};

export default Tab2;