import { FC, useState } from "react";
import {
  BillHistory,
  Categories,
  Garbage,
  GarbageHistory,
} from "../data/types";
import {
  IonButton,
  IonIcon,
  IonList,
  UseIonModalResult,
  useIonModal,
} from "@ionic/react";
import SingleList from "./SingleList";
import { OverlayEventDetail } from "@ionic/react/dist/types/components/react-component-lib/interfaces";
import { getObject, setObject } from "../data/store";
import { AddGarbageModal } from "./AddGarbageModal";
import { addCircle } from "ionicons/icons";
import dontEat from "../dontEat.svg";

export const ListOfLists: FC<BillHistory> = ({ bills }) => {
  const [currentGarbage, setcurrentGarbage] = useState<Garbage>({
    name: "",
    category: "Vegetable",
    values: [
      {
        date: new Date(),
        amount: 1,
      },
    ],
  } as Garbage);

  const [present, dismiss]: UseIonModalResult = useIonModal(AddGarbageModal, {
    onDismiss: (data: Garbage, role: string) => dismiss(data, role),
    currentGarbage,
  });

  const openModal = async () => {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        onModalDismiss(ev.detail.role, ev.detail?.data);
      },
    });
  };

  return (
    <>
      <IonButton onClick={() => openModal()}>
        <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
        <IonIcon slot="icon-only" icon={dontEat}></IonIcon>
      </IonButton>
      <IonList>
        {bills.map((bill) => {
          return (
            <SingleList
              bill={bill}
              openModal={openModal}
              setCurrentGarbage={setcurrentGarbage}
              key={`${bill.date}`}
            />
          );
        })}
      </IonList>
    </>
  );
};

const onModalDismiss = async (role?: string, inputData?: Garbage) => {
  if (role === "confirm" && inputData) {
    // setMessage(`${ev.detail?.data?.value?.amount} hii`);

    try {
      let garbage = await getObject<GarbageHistory>("garbage");

      console.log("garbage na zacatku", garbage);

      const thisGarbage = garbage?.garbage?.find(
        (item) =>
          item.name === inputData?.name && item.category === inputData?.category
      );

      console.log("this garbage", thisGarbage);
      if (thisGarbage) {
        thisGarbage.values.push(inputData.values[0]);
      } else {
        if (!garbage?.garbage) {
          garbage = { garbage: [] };
          console.log("garbage now set to empty array", garbage);
        }

        garbage?.garbage.push(inputData);
      }

      console.log("tenhle garbage posilam", garbage);
      await setObject("garbage", garbage!);
    } catch (e) {
      return null;
    }
  }
};
