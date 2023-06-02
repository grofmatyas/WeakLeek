import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
// import { sad, trash } from "ionicons/icons";
import dontEat from '../dontEat.svg';

const Item: FC<{ name: string; category: string; setAlert: any }> = ({
  name,
  category,
  setAlert,
}) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton slot="end" onClick={() => setAlert(true)}>
        <IonIcon slot="icon-only" icon={dontEat} />
      </IonButton>
    </IonItem>
  );
};

export default Item;
