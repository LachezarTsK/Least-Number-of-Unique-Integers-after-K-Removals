
/**
 * @param {number[]} input
 * @param {number} numberOfRemovals
 * @return {number}
 */
var findLeastNumOfUniqueInts = function (input, numberOfRemovals) {
    this.inputSize = input.length;
    return calculateLeastTotalUniqueValuesAfterRemovals(input, numberOfRemovals);
};

/**
 * @param {number[]} input
 * @param {number} numberOfRemovals
 * @return {number}
 */
function calculateLeastTotalUniqueValuesAfterRemovals(input, numberOfRemovals) {

    const valueToFrequency = createMapValueToFrequency(input);
    const occurrenceOfFrequency = createArrayOccurrenceOfFrequency(valueToFrequency);
    let totalUniqueValues = valueToFrequency.size;

    for (let frequency = 1; frequency < occurrenceOfFrequency.length && numberOfRemovals >= frequency; ++frequency) {

        const numberOfUniqueValuesToSubtract
                = Math.min(occurrenceOfFrequency[frequency], Math.floor(numberOfRemovals / frequency));

        totalUniqueValues -= numberOfUniqueValuesToSubtract;
        numberOfRemovals -= frequency * occurrenceOfFrequency[frequency];
    }

    return totalUniqueValues;
}

/**
 * @param {number[]}input
 * @return {Map<number, number>} valueToFrequency
 */
function createMapValueToFrequency(input) {
    const valueToFrequency = new Map();
    for (let value of input) {
        const previousFrequency = valueToFrequency.has(value) ? valueToFrequency.get(value) : 0;
        valueToFrequency.set(value, previousFrequency + 1);
    }
    return valueToFrequency;
}

/**
 * @param {Map<number, number>} valueToFrequency
 * @return {number[]}
 */
function createArrayOccurrenceOfFrequency(valueToFrequency) {
    const occurrenceOfFrequency = new Array(this.inputSize + 1).fill(0);
    for (let frequency of valueToFrequency.values()) {
        ++occurrenceOfFrequency[frequency];
    }
    return occurrenceOfFrequency;
}
