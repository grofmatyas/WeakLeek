import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { camera, list } from "ionicons/icons";
import barChart from "./bar-chart.svg";
import Dashboard from "./pages/Dashboard";
import ItemList from "./pages/ItemList";
import ScanBill from "./pages/ScanBill";
import { createStore } from "./data/store";
import { useEffect } from "react";
import { LocalNotifications } from "@capacitor/local-notifications";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const setupStore = async () => {
      await createStore("default");
    };

    setupStore();
  }, []);

  LocalNotifications.requestPermissions();

  return (
    <IonApp>
      <IonReactRouter>
        <IonTabs>
          <IonRouterOutlet>
            <Route exact path="/dashboard">
              <Dashboard />
            </Route>
            <Route exact path="/itemList">
              <ItemList />
            </Route>
            <Route path="/scanBill">
              <ScanBill />
            </Route>
            <Route exact path="/">
              <Redirect to="/dashboard" />
            </Route>
          </IonRouterOutlet>
          <IonTabBar slot="bottom">
            <IonTabButton tab="scanBill" href="/scanBill">
              <IonIcon aria-hidden="true" icon={camera} />
            </IonTabButton>
            <IonTabButton tab="itemList" href="/itemList">
              <IonIcon aria-hidden="true" icon={list} />
            </IonTabButton>
            <IonTabButton tab="dashboard" href="/dashboard">
              <IonIcon aria-hidden="true" icon={barChart} />
            </IonTabButton>
          </IonTabBar>
        </IonTabs>
      </IonReactRouter>
    </IonApp>
  );
};

export default App;
