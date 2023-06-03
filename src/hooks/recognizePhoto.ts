import { createWorker } from "tesseract.js";
import { UserPhoto } from "./usePhotoGallery";
import * as fuzz from "fuzzball";
import foodCategories from "../data/foodCategories.json";
import { Bill, BillHistory, Categories } from "../data/types";
import { getObject, setObject } from "../data/store";
import { scheduleNotifications } from "./scheduleNotifications";

export const recognizePhoto = async (photo: UserPhoto, setRecognized: any) => {
  const worker = await createWorker({
    logger: (m) => console.log(m),
  });

  (async () => {
    await worker.loadLanguage("ces");
    await worker.initialize("ces");
    const {
      data: { text },
    } = await worker.recognize(photo.webviewPath!);

    await worker.terminate();
    const textar = text.split("\n");
    // create new empty bill
    const bill: Bill = { date: new Date(), values: [] };
    // for each thing in food, find the best matching line on the bill
    for (let food in foodCategories) {
      const res = fuzz.extract(food, textar, {
        scorer: fuzz.partial_ratio,
        limit: 1,
        returnObjects: true,
      })[0];
      console.log(res, food);
      if (res.score > 80) {
        console.log("Found", food);
        // @ts-ignore lol
        bill.values.push({ name: food, category: foodCategories[food] });
      }
    }

    try {
      let billHistory = await getObject<BillHistory>("bills");

      if (billHistory) {
        billHistory.bills.push(bill);
      } else {
        billHistory = {
          bills: [bill],
        };
      }

      await setObject<BillHistory>("bills", billHistory!);
      setRecognized(true);
    } catch (e) {
      return null;
    }
    await scheduleNotifications(bill);
  })();
};

// Test text:
// l :É
// feedback kaufland.cz
// Kaufland česká republika v.o.s.
// Bělohorská 2428/203, Praha 6
// Ié 25110161 / DIč CZ25110161
// www.kaufland.cz
// Obchod: 5010 Nymburk
// Adresa: Nymburk, Kolínská 2507
// *kx*axxxx
// Otevírací doba
// Po-Ne 7:00-22:00
// Cena CZ
// Sladkosti K
// Maretti česnek 70g
// 26 í 39,80 B
// Maretti 4 sýry 70g
// 2 * 19,90 39,80 B
// pivo/víno/alkohol /alkohol jcké nápoje
// Tmavé léžák 0,51
// 2 xv 12 5) D (8
// Láhev pivo 0,51 *
// 2 3 S0 6,00 A
// Pepinova destika Ů
// 2) G5 10) 810] zn „0) ©
// Láhev pivo 0,51 » o
// 2 * 3,00 6,00 A
// Postř. Svát 14 0,5VL 19,%?(\ ů
// Láhev pivo 0,5) * 3,00 A
// Jubi lej. lež.0,SVL 14,90 C
// táhev pivo 0,51 » 3,00 A
// Backshop jt
// SVN: „s.goud.809g
// 10 000 w9.60 6
// Ovoce /zelenina /rostliny
// Ci trony-sit 0,5kg 2000 5 7
// Japlka Grannyý 2
// 0 zsŠ KG * 39,90 23,46 B
// Melotní vodmiém 6651 B
