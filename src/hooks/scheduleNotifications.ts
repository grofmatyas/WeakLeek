import { LocalNotifications } from '@capacitor/local-notifications';
import { Bill, GarbageHistory } from '../data/types';
import { getObject } from '../data/store';

function getRndInteger(min = -214748364, max = 214748364) {
    return Math.floor(Math.random() * (max - min) ) + min;
  }
  
export const scheduleNotifications = async (newBill: Bill): Promise<void> => {
    const garbageHistory = await getObject<GarbageHistory>('garbage');

    const matches: Bill['values'] = [];

    for (const itemOnBill of newBill.values) {
        if (garbageHistory?.garbage.find(item => item.name === itemOnBill.name && item.category === itemOnBill.category)) {
            matches.push(itemOnBill);
        }
    }

    for (const match of matches) {
        const scheduleTime = new Date();
        scheduleTime.setMinutes(new Date().getMinutes() + 1);
        LocalNotifications.schedule({
            notifications: [
            {
                title: `You ${match.name} expiration is soon`,
                body: `In wisdom's embrace, this user stands,\nAwareness blooms, in mindful hands.\,No ${match.name} wasted, its worth understood,\nA green treasure cherished, for the greater good.`,
                id: getRndInteger(),
                schedule: {
                    at: scheduleTime,
                },
            }
            ],
        });
    }
};



