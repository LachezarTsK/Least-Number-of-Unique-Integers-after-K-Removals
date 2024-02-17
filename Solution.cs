
using System;
using System.Collections.Generic;

public class Solution
{
    int inputSize;
    public int FindLeastNumOfUniqueInts(int[] input, int numberOfRemovals)
    {
        inputSize = input.Length;
        return calculateLeastTotalUniqueValuesAfterRemovals(input, numberOfRemovals);
    }

    private int calculateLeastTotalUniqueValuesAfterRemovals(int[] input, int numberOfRemovals)
    {
        Dictionary<int, int> valueToFrequency = createMapValueToFrequency(input);
        int[] occurrenceOfFrequency = createArrayOccurrenceOfFrequency(valueToFrequency);
        int totalUniqueValues = valueToFrequency.Count;

        for (int frequency = 1; frequency < occurrenceOfFrequency.Length && numberOfRemovals >= frequency; ++frequency)
        {

            int numberOfUniqueValuesToSubtract
                    = Math.Min(occurrenceOfFrequency[frequency], numberOfRemovals / frequency);

            totalUniqueValues -= numberOfUniqueValuesToSubtract;
            numberOfRemovals -= frequency * occurrenceOfFrequency[frequency];
        }

        return totalUniqueValues;
    }

    private Dictionary<int, int> createMapValueToFrequency(int[] input)
    {
        Dictionary<int, int> valueToFrequency = new Dictionary<int, int>();
        foreach (int value in input)
        {
            if (!valueToFrequency.ContainsKey(value))
            {
                valueToFrequency.Add(value, 0);
            }
            ++valueToFrequency[value];
        }
        return valueToFrequency;
    }

    private int[] createArrayOccurrenceOfFrequency(Dictionary<int, int> valueToFrequency)
    {
        int[] occurrenceOfFrequency = new int[inputSize + 1];
        foreach (int frequency in valueToFrequency.Values)
        {
            ++occurrenceOfFrequency[frequency];
        }
        return occurrenceOfFrequency;
    }
}
