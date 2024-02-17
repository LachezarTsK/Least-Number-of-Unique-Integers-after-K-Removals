
#include <span>
#include <vector>
#include <algorithm>
#include <unordered_map>
using namespace std;

class Solution {
    
    size_t inputSize;

public:
    int findLeastNumOfUniqueInts(const vector<int>& input, int numberOfRemovals) {
        inputSize = input.size();
        return calculateLeastTotalUniqueValuesAfterRemovals(input, numberOfRemovals);
    }

private:
    int calculateLeastTotalUniqueValuesAfterRemovals(span<const int> input, int numberOfRemovals) const {

        unordered_map<int, int> valueToFrequency = createMapValueToFrequency(input);
        vector<int> occurrenceOfFrequency = createVectorOccurrenceOfFrequency(valueToFrequency);
        int totalUniqueValues = valueToFrequency.size();

        for (int frequency = 1; frequency < occurrenceOfFrequency.size() && numberOfRemovals >= frequency; ++frequency) {

            int numberOfUniqueValuesToSubtract
                    = min(occurrenceOfFrequency[frequency], numberOfRemovals / frequency);

            totalUniqueValues -= numberOfUniqueValuesToSubtract;
            numberOfRemovals -= frequency * occurrenceOfFrequency[frequency];
        }

        return totalUniqueValues;
    }

    unordered_map<int, int> createMapValueToFrequency(span<const int> input) const {
        unordered_map<int, int> valueToFrequency;
        for (const auto& value : input) {
            ++valueToFrequency[value];
        }
        return valueToFrequency;
    }

    vector<int> createVectorOccurrenceOfFrequency(const unordered_map<int, int>& valueToFrequency) const {
        vector<int> occurrenceOfFrequency(inputSize + 1);
        for (const auto& [value, frequency] : valueToFrequency) {
            ++occurrenceOfFrequency[frequency];
        }
        return occurrenceOfFrequency;
    }
};
