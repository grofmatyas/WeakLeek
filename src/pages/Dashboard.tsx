import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonButton,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Dashboard.css";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { getObject } from "../data/store";
import { GarbageHistory, TimeScale } from "../data/types";
import { useState } from "react";

const Tab1: React.FC = () => {
  const [garbageHistory, setGarbageHistory] = useState<GarbageHistory>({
    garbage: [],
  });
  const [scale, setScale] = useState<TimeScale>("Week");

  useIonViewWillEnter(async () => {
    const exists = await getObject<GarbageHistory>("garbage");
    if (exists) {
      setGarbageHistory(exists);
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Dashboard</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Dashboard</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            margin: "0 auto",
            marginTop: "2px",
          }}
        >
          <IonButton
            onClick={() => setScale("Day")}
            style={{ flex: 1 }}
            fill="outline"
          >
            <IonLabel>Day</IonLabel>
          </IonButton>
          <IonButton
            onClick={() => setScale("Week")}
            style={{ flex: 1 }}
            fill="outline"
          >
            <IonLabel>Week</IonLabel>
          </IonButton>
          <IonButton
            onClick={() => setScale("Month")}
            style={{ flex: 1 }}
            fill="outline"
          >
            <IonLabel>Month</IonLabel>
          </IonButton>
          <IonButton
            onClick={() => setScale("Year")}
            style={{ flex: 1 }}
            fill="outline"
          >
            <IonLabel>Year</IonLabel>
          </IonButton>
        </div>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <h3 style={{ textAlign: "center" }}>Food wasted over time</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%" }}>
              <LineChart
                data={{
                  data: garbageHistory,
                  scale,
                }}
              />
            </div>
          </div>
        </div>
        <div>
          <h3 style={{ textAlign: "center" }}>Categories of wasted food</h3>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: "80%" }}>
              <PieChart
                data={{
                  data: garbageHistory,
                  scale,
                }}
              />
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Tab1;
