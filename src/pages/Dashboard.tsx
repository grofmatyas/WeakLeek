import { IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import './Dashboard.css';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import { getObject } from '../data/store';
import { GarbageHistory, TimeScale } from '../data/types';
import { useState } from 'react';

const Tab1: React.FC = () => {

  const [garbageHistory, setGarbageHistory] = useState<GarbageHistory>({ garbage: [] });
  const [scale, setScale] = useState<TimeScale>('Week');

	useIonViewWillEnter(async() => {
		const exists = await getObject<GarbageHistory>('garbage');
		if (exists) {
			setGarbageHistory(exists);
		} else {
      setGarbageHistory({
        garbage: [
          {
            name: 'Leek',
            category: 'Vegetable',
            values: [
              {
                date: new Date(),
                amount: 4,
              }
            ],
          },
          {
            name: 'Beef',
            category: 'Meat',
            values: [{
              date: new Date(),
              amount: 1,
            }],
          },
        ],
      })
    }
	});

  return (
    <IonPage>
       <IonHeader>
          <IonToolbar>
            <IonTitle style={{ textAlign: 'center', marginTop: '2px' }} size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTabBar slot="bottom">
          <IonTabButton onClick={() => setScale('Day')}>
            <IonLabel>Day</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => setScale('Week')}>
            <IonLabel>Week</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => setScale('Month')}>
            <IonLabel>Month</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => setScale('Year') }>
            <IonLabel>Year</IonLabel>
          </IonTabButton>
        </IonTabBar>
      <IonContent fullscreen>
        <div style={{ maxWidth: '100%', overflowX: 'auto' }}>
          <h3 style={{ textAlign: 'center' }}>Timelapse of thrown items</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80%' }}>
          <LineChart data={{
            labels: ['Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Today'],
            datasets: [{
              label: 'Vegetable',
              data: [0,5,0,0,0,5,4,0,0],
            }, {
              label: 'Meat',
              data: [0,0,0,1,0,0,1,0],
            }],
          }} />
          </div>
        </div>
        </div>
        <div>
          <h3 style={{ textAlign: 'center' }}>Ratio of thrown categories</h3>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '80%' }}>
            <PieChart data={{
              data: garbageHistory,
              scale,
            }} />
          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
