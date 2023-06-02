import { IonAlert, IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
import { sad, trash } from "ionicons/icons";

const Item: FC<{ name: string; category: string }> = ({ name, category }) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton slot="end" id="present-alert">
        <IonIcon slot="icon-only" icon={sad} />
      </IonButton>
      <IonAlert
        trigger="present-alert"
        header="Alert"
        subHeader="Important message"
        message="This is an alert!"
        buttons={["OK"]}
      />
    </IonItem>
  );
};

export default Item;
