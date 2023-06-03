import React, { useState } from "react";
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonFab,
  IonFabButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
  IonImg,
  IonActionSheet,
  IonToast,
} from "@ionic/react";
import {
  camera,
  trash,
  arrowForwardCircleOutline,
  close,
} from "ionicons/icons";
import { usePhotoGallery, UserPhoto } from "../hooks/usePhotoGallery";
import "./ScanBill.css";
import { recognizePhoto } from "../hooks/recognizePhoto";

const ScanBill: React.FC = () => {
  const { deletePhoto, photos, takePhoto } = usePhotoGallery();
  const [photoClicked, setPhotoClicked] = useState<UserPhoto>();
  const [recognized, setRecognized] = useState<boolean>(false);

  console.log("recognized", recognized);
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>My Bills</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">My Bills</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonGrid>
          <IonRow>
            {photos.map((photo, index) => (
              <IonCol size="6" key={index}>
                <IonImg
                  onClick={() => setPhotoClicked(photo)}
                  src={photo.webviewPath}
                />
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>

        <IonFab vertical="bottom" horizontal="center" slot="fixed">
          <IonFabButton onClick={() => takePhoto()}>
            <IonIcon icon={camera}></IonIcon>
          </IonFabButton>
        </IonFab>

        <IonActionSheet
          isOpen={!!photoClicked}
          buttons={[
            {
              text: "Recognize",
              role: "recognize",
              icon: arrowForwardCircleOutline,
              handler: () => {
                if (photoClicked) {
                  recognizePhoto(photoClicked, setRecognized);
                  setPhotoClicked(undefined);
                }
              },
            },
            {
              text: "Delete",
              role: "destructive",
              icon: trash,
              handler: () => {
                if (photoClicked) {
                  deletePhoto(photoClicked);
                  setPhotoClicked(undefined);
                }
              },
            },
            {
              text: "Cancel",
              icon: close,
              role: "cancel",
            },
          ]}
          onDidDismiss={() => setPhotoClicked(undefined)}
        />

        <IonToast
          isOpen={recognized}
          message="Your bill was added to your inventory!"
          onDidDismiss={() => setRecognized(false)}
          duration={5000}
          position="middle"
          color={"success"}
        ></IonToast>
      </IonContent>
    </IonPage>
  );
};

export default ScanBill;
