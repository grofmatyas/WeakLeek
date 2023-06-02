import { IonButton, IonIcon, IonItem, IonLabel } from "@ionic/react";
import { FC } from "react";
import { sad, trash } from "ionicons/icons";

const Item: FC<{ name: string; category: string }> = ({ name, category }) => {
  return (
    <IonItem>
      <IonLabel>{name}</IonLabel>
      <IonButton slot="end">
        <IonIcon slot="icon-only" icon={sad}></IonIcon>
      </IonButton>
    </IonItem>
  );
};

export default Item;
