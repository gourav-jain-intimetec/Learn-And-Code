using System;
using System.Numerics;
class MyClass {
    static void Main(string[] args) {
       var noOfArrayElementsAndQueries = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse);
            var givenArray = Array.ConvertAll(Console.ReadLine().Split(' '), long.Parse);
            long[] sumsOfPrefixSubArray = getSumsOfPrefixSubArray(givenArray,noOfArrayElementsAndQueries[0]);
            for (var x = 0; x < noOfArrayElementsAndQueries[1]; x++)
            {
                var startAndEndIndexes = Array.ConvertAll(Console.ReadLine().Split(' '), int.Parse)
                var meanOfSubArray = getMeanOfSubArray(sumsOfPrefixSubArray,startAndEndIndexes);
                Console.WriteLine(meanOfSubArray);
            }
    }

    static long[] getSumsOfPrefixSubArray(long[] givenArray, int sizeOfGivenArray){
        long[] sumsOfPrefixSubArray = new long[sizeOfGivenArray + 1];
            sumsOfPrefixSubArray[0] = 0;
            for (int i = 1; i <= sizeOfGivenArray; i++)
            {
                sumsOfPrefixSubArray[i] = sumsOfPrefixSubArray[i - 1] + givenArray[i - 1];
            }
            return sumsOfPrefixSubArray;
    }

     static long getMeanOfSubArray(long[] sumsOfPrefixSubArray, int[] startAndEndIndexes)
    {
        int startIndex = startAndEndIndexes[0];
        int endIndex = startAndEndIndexes[1];
        long sumOfSubArray = sumsOfPrefixSubArray[endIndex] - sumsOfPrefixSubArray[startIndex - 1];
        int lengthOfSubArray = endIndex - startIndex + 1;
        return sumOfSubArray / lengthOfSubArray;
    }

}