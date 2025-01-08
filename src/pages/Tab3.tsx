import React, { useState } from 'react'; // Импортировано useState здесь
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonCard, IonCardContent, IonItem, IonLabel, IonIcon } from '@ionic/react';
import { linkOutline } from 'ionicons/icons';
import './Tab3.css';

interface Items {
  name: string,
  description: string,
  url: string
}

const Tab3: React.FC = () => {
    const initialItems:Items[] = [{
      name:"Google",
      description:"Search Engine",
      url: "https://google.com"
    },
      {
        name:"Bing",
          description:"Search Engine",
          url: "https://bing.com"
      },
      {
          name:"DuckDuckGo",
          description:"Private Search Engine",
          url: "https://duckduckgo.com"
      }]
    const [items,setItems] =useState<Items[]>(initialItems);
    return (
      <IonPage>
          <IonHeader>
              <IonToolbar>
                  <IonTitle>Tab 3</IonTitle>
              </IonToolbar>
          </IonHeader>
          <IonContent fullscreen>
              <IonHeader collapse="condense">
                  <IonToolbar>
                      <IonTitle size="large">Tab 3</IonTitle>
                  </IonToolbar>
              </IonHeader>
              <div id="container">
               {items.map((i: Items, index: number)=> // Исправлено здесь
                    <IonCard key={index}>
                    <IonCardContent>
                        <IonItem>
                            <IonLabel>
                                <strong>{i.name}</strong>
                            </IonLabel>
                        </IonItem>
                        <IonItem>
                            <IonLabel>{i.description}</IonLabel>
                         </IonItem>
                        <IonItem>
                        <a href={i.url} target="_blank"> <IonIcon icon={linkOutline} /> Open URL </a>
                        </IonItem>
                   </IonCardContent>
                   </IonCard>
                    )}
               </div>
          </IonContent>
      </IonPage>
    )
};

export default Tab3;