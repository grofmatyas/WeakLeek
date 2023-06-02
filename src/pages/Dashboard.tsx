import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Dashboard.css';
import LineChart from '../components/LineChart';
import PieChart from '../components/PieChart';

const headingStyles = {
  textAlign: 'center',
};

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
            <IonTitle size="large">Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div>
          <h3 style={headingStyles}>Timelapse of thrown items</h3>
          <LineChart data={{
            labels: ['Monday', 'Tuesday', 'Wednesday', 'Yesterday', 'Today'],
            datasets: [{
              label: 'vegetable',
              data: [0,5,0,0,0,5,4,0,0],
            }, {
              label: 'meat',
              data: [0,0,0,1,0,0,1,0],
            }],
          }} />
        </div>
        <div>
          <h3 style={headingStyles}>Ratio of thrown categories</h3>
          <PieChart data={{
            labels: ['vegetable', 'meat'],
            values: [14,2],
          }} />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
