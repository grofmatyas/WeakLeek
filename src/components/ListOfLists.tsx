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

const defaultGarbage: Garbage = {
  name: "",
  category: "Vegetable",
  values: [
    {
      date: new Date(),
      amount: 1,
    },
  ],
};

export const ListOfLists: FC<BillHistory> = ({ bills }) => {
  const [currentGarbage, setcurrentGarbage] = useState<Garbage>(defaultGarbage);

  const [present, dismiss]: UseIonModalResult = useIonModal(AddGarbageModal, {
    onDismiss: (data: Garbage, role: string) => dismiss(data, role),
    currentGarbage,
  });

  const openModal = async () => {
    present({
      onWillDismiss: async (ev: CustomEvent<OverlayEventDetail>) => {
        onModalDismiss(ev.detail.role, ev.detail?.data);
        setcurrentGarbage(defaultGarbage);
      },
    });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <IonButton onClick={() => openModal()}>
          <IonIcon slot="icon-only" icon={addCircle}></IonIcon>
          <IonIcon slot="icon-only" icon={dontEat}></IonIcon>
        </IonButton>
      </div>
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
      const thisGarbage = garbage?.garbage?.find(
        (item) =>
          item.name === inputData?.name && item.category === inputData?.category
      );

      if (thisGarbage) {
        thisGarbage.values.push(inputData.values[0]);
      } else {
        if (!garbage?.garbage) {
          garbage = { garbage: [] };
        }
        garbage?.garbage.push(inputData);
      }

      await setObject("garbage", garbage!);
    } catch (e) {
      return null;
    }
  }
};
