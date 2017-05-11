#include<stdio.h>

void insertionSort(int n, int A[n])
{
    int i, k,j;
    for (i = 1; i<n; i++)

    {
        int temp = A[i];
        for (k = i-1; k = 0; k--)
        {
            if (A[i]<A[k])
            {
                A[k+1] = A[k];
            }
            else
            {
                A[i] = A[k+1];
            }
        }
    }
    for (j = n-1;j>=0;j--)
    {
        printf("%d\n", A[j]);
    }
}

int main()
{
     int A[] = {15,13,14,11,12,10,9,8,7};
     insertionSort(9,A);
}
