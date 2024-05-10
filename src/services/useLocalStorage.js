export function useLocalStorage() {
    function saveToLocalStorage(key, objectToPush) {
        const localStorageData = localStorage.getItem(key) || '[]';
        const parsedData = JSON.parse(localStorageData);
        let itemFound = false;
        parsedData.forEach((item, index) => {
            if (item.id === objectToPush.id) {
                parsedData[index] = objectToPush;
                itemFound = true;
            }
        });

        if (!itemFound) {
            parsedData.push(objectToPush);
        }
        localStorage.setItem(key, JSON.stringify(parsedData));
    }
    
    function saveToLocalStorageBulk(key, objectToPush) {
        localStorage.setItem(key, JSON.stringify(objectToPush));
    }

    function removeFromLocalStorage(key, id) {
        const localStorageData = localStorage.getItem(key) || '[]';
        const parsedData = JSON.parse(localStorageData);
        parsedData.forEach((item, index) => {
            if (item.id === id) {
                parsedData.splice(index, 1);
            }
        });
        localStorage.setItem(key, JSON.stringify(parsedData));
    }

    return {saveToLocalStorage, saveToLocalStorageBulk, removeFromLocalStorage};
} 
