import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewWillEnter,
} from "@ionic/react";
import { ListOfLists } from "../components/ListOfLists";
import { BillHistory } from "../data/types";
import { getObject } from "../data/store";
import { useState } from "react";

const billHistoryMock: BillHistory = {
  bills: [
    {
      date: new Date(2022, 4, 5),
      values: [
        {
          name: "apple",
          category: "Fruit",
        },
        {
          name: "banana",
          category: "Fruit",
        },
      ],
    },
    {
      date: new Date(),
      values: [
        {
          name: "apple2",
          category: "Fruit",
        },
        {
          name: "banana2",
          category: "Fruit",
        },
      ],
    },
  ],
};

const ItemList: React.FC = () => {
  const [billHistory, setBillHistory] = useState<BillHistory>(billHistoryMock);

  useIonViewWillEnter(async () => {
    const billsObject = await getObject<BillHistory>("bills");
    if (billsObject) {
      setBillHistory(billsObject);
    }
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Item List</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Item List</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <ExploreContainer name="Tab 2 page" /> */}
        <ListOfLists bills={billHistory.bills} />
      </IonContent>
    </IonPage>
  );
};

export default ItemList;
