import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
import { sad, trash } from "ionicons/icons";
import { set } from "../data/store";

const Item: FC<{ name: string; category: string; setAlert: any }> = ({
  name,
  category,
  setAlert,
}) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton slot="end" onClick={() => setAlert(true)}>
        <IonIcon slot="icon-only" icon={sad} />
      </IonButton>
    </IonItem>
  );
};

export default Item;
