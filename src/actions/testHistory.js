import { database } from '../firebase/firebase';
import { ref, push, get } from "firebase/database";

export const startAddTestHistory = (state, userID, username, createdAt) => {

    const testHistoryItem = {
        username: username,
        count: state.count,
        correct: state.correct, 
        longestStreak: state.longestStreak,
        createdAt: createdAt, 
    };

    const dbref = ref(database, `users/${userID}/testHistory`)

    push(dbref , testHistoryItem);
};

export const startSetTestHistory = async (userID) => {

    const dbref = ref(database, `users/${userID}/testHistory`)
    
    get(dbref).then((snapshot) => {
        const testHistoryItems = [];

        snapshot.forEach((childSnapshot) => {
            testHistoryItems.push({
                id: childSnapshot.key,
                ...childSnapshot.val()
            });
        });

        return testHistoryItems;
    });
};
