
import java.util.HashMap;
import java.util.Map;

public class Solution {

    int inputSize;

    public int findLeastNumOfUniqueInts(int[] input, int numberOfRemovals) {
        inputSize = input.length;
        return calculateLeastTotalUniqueValuesAfterRemovals(input, numberOfRemovals);
    }

    private int calculateLeastTotalUniqueValuesAfterRemovals(int[] input, int numberOfRemovals) {

        Map<Integer, Integer> valueToFrequency = createMapValueToFrequency(input);
        int[] occurrenceOfFrequency = createArrayOccurrenceOfFrequency(valueToFrequency);
        int totalUniqueValues = valueToFrequency.size();

        for (int frequency = 1; frequency < occurrenceOfFrequency.length && numberOfRemovals >= frequency; ++frequency) {

            int numberOfUniqueValuesToSubtract
                    = Math.min(occurrenceOfFrequency[frequency], numberOfRemovals / frequency);

            totalUniqueValues -= numberOfUniqueValuesToSubtract;
            numberOfRemovals -= frequency * occurrenceOfFrequency[frequency];
        }

        return totalUniqueValues;
    }

    private Map<Integer, Integer> createMapValueToFrequency(int[] input) {
        Map<Integer, Integer> valueToFrequency = new HashMap<>();
        for (int value : input) {
            valueToFrequency.put(value, valueToFrequency.getOrDefault(value, 0) + 1);
        }
        return valueToFrequency;
    }

    private int[] createArrayOccurrenceOfFrequency(Map<Integer, Integer> valueToFrequency) {
        int[] occurrenceOfFrequency = new int[inputSize + 1];
        for (int frequency : valueToFrequency.values()) {
            ++occurrenceOfFrequency[frequency];
        }
        return occurrenceOfFrequency;
    }
}
