import {
  IonContent,
  IonHeader,
  IonLabel,
  IonPage,
  IonTabBar,
  IonButton,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import "./Dashboard.css";
import LineChart from "../components/LineChart";
import PieChart from "../components/PieChart";
import { getObject, setObject } from "../data/store";
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
    } else {
      setGarbageHistory({
        garbage: [
          {
            name: "Leek",
            category: "Vegetable",
            values: [
              {
                date: new Date(2023, 4, 20),
                amount: 2,
              },
              {
                date: new Date(2022, 9, 18),
                amount: 1,
              },
              {
                date: new Date(2023, 4, 25),
                amount: 4,
              },
              {
                date: new Date(2023, 5, 1),
                amount: 3,
              },
              {
                date: new Date(2023, 5, 2),
                amount: 7,
              },
              {
                date: new Date(2023, 1, 22),
                amount: 3,
              },
              {
                date: new Date(2023, 4, 22),
                amount: 2,
              },
            ],
          },
          {
            name: "Beef",
            category: "Meat",
            values: [
              {
                date: new Date(),
                amount: 1,
              },
              {
                date: new Date(2022, 11, 25),
                amount: 2,
              },
              {
                date: new Date(2023, 4, 18),
                amount: 5,
              },
              {
                date: new Date(2023, 3, 28),
                amount: 3,
              },
              {
                date: new Date(2023, 1, 2),
                amount: 6,
              },
              {
                date: new Date(2022, 8, 11),
                amount: 1,
              },
              {
                date: new Date(2023, 2, 2),
                amount: 1,
              },
              {
                date: new Date(2022, 10, 9),
                amount: 2,
              },
            ],
          },
        ],
      });
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle
            style={{ textAlign: "center", marginTop: "2px" }}
            size="large"
          >
            Dashboard
          </IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "90%",
            margin: "0 auto",
            marginTop: "2px",
          }}
        >
          <IonButton onClick={() => setScale("Day")} style={{ flex: 1 }}>
            <IonLabel>Day</IonLabel>
          </IonButton>
          <IonButton onClick={() => setScale("Week")} style={{ flex: 1 }}>
            <IonLabel>Week</IonLabel>
          </IonButton>
          <IonButton onClick={() => setScale("Month")} style={{ flex: 1 }}>
            <IonLabel>Month</IonLabel>
          </IonButton>
          <IonButton onClick={() => setScale("Year")} style={{ flex: 1 }}>
            <IonLabel>Year</IonLabel>
          </IonButton>
        </div>
        <div style={{ maxWidth: "100%", overflowX: "auto" }}>
          <h3 style={{ textAlign: "center" }}>Timelapse of thrown items</h3>
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
          <h3 style={{ textAlign: "center" }}>Ratio of thrown categories</h3>
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
