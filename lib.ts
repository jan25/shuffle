
/**
 * Shuffles list of elements with grouped elements uniformly
 * placed throughout the list.
 * 
 * @param list List to shuffle.
 * @param grouper Function to identify grouping criteria for each element.
 * @returns New shuffled list.
 */
export const shuffle = <T>(list: Array<T>,
    grouper: (element: T) => any = (_) => 0): Array<T> => {

    // Logically group elements
    const groups = new Map<any, Array<T>>();
    list.forEach((element: T) => {
        const groupId = grouper(element);
        const group = groups.get(groupId);
        if (group) {
            group.push(element);
        } else {
            groups.set(groupId, [element]);
        }
    });

    // Distribute groups amoung columns
    const columnShuffled: Array<Array<T>> = [];
    for (let count = 0; count < list.length; ++count) columnShuffled.push([]);
        
    groups.forEach((group: Array<T>) => {
        fisherYates(group);
        const partition = Math.floor(list.length / group.length);
        const offset = randInt(0, Math.floor(partition));
        let idx = offset;
        for (let count = 0; count < group.length; ++count) {
            if (idx >= columnShuffled.length) idx = idx % columnShuffled.length;
            columnShuffled[idx].push(group[count]);
            idx += partition;
        }
    });

    // Merge columns
    const shuffled: Array<T> = [];
    for (const column of columnShuffled) {
        if (column.length === 0) continue;
        fisherYates(column);
        let idx = 0;
        while (shuffled.length > 0
            && grouper(shuffled[shuffled.length - 1]) === grouper(column[idx])
            && idx < column.length) {
            idx++;
        }
        for (let count = 0; count < column.length; ++count) {
            if (idx >= column.length) idx = idx % column.length;
            shuffled.push(column[idx]);
            idx++;
        }
    }

    return shuffled;
}

/**
 * Fisher yates shuffling algorithm.
 * 
 * @param list List to shuffle in place.
 */
const fisherYates = (list: Array<any>): void => {
    for (let idx = 0; idx < list.length; ++idx) {
        let swapIdx = randInt(idx, list.length - 1);
        [list[idx], list[swapIdx]] = [list[swapIdx], list[idx]];
    }
}

/**
 * Generate random integer between min and max both inclusive.
 * 
 * @param min minimum of range.
 * @param max maximum of range.
 * @returns random integer betwee min and max.
 */
const randInt = (min: number, max: number): number => {
    return Math.floor(Math.random() * (max - min + 1) + min);
}