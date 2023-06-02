import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import './Dashboard.css';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

const Tab1: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle style={{ textAlign: 'center' }} size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
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
