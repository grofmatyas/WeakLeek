import { IonContent, IonHeader, IonLabel, IonPage, IonTabBar, IonTabButton, IonTitle, IonToolbar } from '@ionic/react';
import './Dashboard.css';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';
import { getObject } from '../data/store';
import { GarbageHistory } from '../data/types';

const Tab1: React.FC = () => {
  let scale = 'week';

  // const data: GarbageHistory = await getObject<GarbageHistory>('garbage');

  return (
    <IonPage>
       <IonHeader>
          <IonToolbar>
            <IonTitle style={{ textAlign: 'center', marginTop: '2px' }} size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonTabBar slot="bottom">
          <IonTabButton onClick={() => { scale = 'day' }}>
            <IonLabel>Day</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => { scale = 'week' }}>
            <IonLabel>Week</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => { scale = 'month' }}>
            <IonLabel>Month</IonLabel>
          </IonTabButton>
          <IonTabButton onClick={() => { scale = 'year' }}>
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
              labels: ['Vegetable', 'Meat'],
              values: [14, 2],
            }} />
          </div>
        </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
