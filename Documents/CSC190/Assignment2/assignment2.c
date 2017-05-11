#include "assignment2.h"

typedef int** Matrix;

void denseMatrixMult(int ** A, int ** B, int *** resultMatrix, int n)
{
    int i,j,k;
    int **ptr;
    initMatrix(&ptr, n);
    
    initMatrix(resultMatrix, n);
    
    if (n == 1)
    {
        (*resultMatrix)[0][0] = A[0][0] * B[0][0];
    }
        

    else
    {
        
        
    
        Matrix M0, M1, M2, M3, M4, M5, M6, C00, C01, C10, C11;
        Matrix M, N;
        
        M = sum(A,A, 0, 0, n/2, n/2, n/2), N = sum(B,B,0,0, n/2, n/2, n/2);
        denseMatrixMult(M, N, &M0, n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        M =sum(A,A, n/2, 0, n/2, n/2, n/2), N = sum(B, ptr, 0,0 ,0,0 , n/2);
        denseMatrixMult(M, N , &M1, n/2);
        freeMatrix(n/2,M), freeMatrix(n/2, N);
        
        M =sum(A, ptr, 0,0,0,0,n/2), N = sub(B, B, 0,n/2, n/2,n/2, n/2 );
        denseMatrixMult(M, N , &M2, n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        M =sum(A, ptr, n/2, n/2, 0,0, n/2), N =sub(B,B, n/2,0, 0,0, n/2);
        denseMatrixMult(M, N , &M3,n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        M =sum(A, A, 0,0, 0, n/2, n/2), N =sum(B, ptr, n/2, n/2 ,0,0, n/2);
        denseMatrixMult(M,N ,&M4, n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        
        M =sub(A, A, n/2, 0, 0, 0, n/2), N =sum(B,B,0,0,0,n/2,n/2);
        denseMatrixMult(M,N ,&M5, n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        M =sub(A, A, 0, n/2, n/2, n/2, n/2), N = sum(B,B, n/2, 0, n/2, n/2, n/2);
        denseMatrixMult(M, N,&M6, n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        
        M = sum(M0, M3, 0,0,0,0,n/2);
        N = sub(M, M4, 0,0,0,0,n/2);
        C00 = sum(N,M6, 0,0,0,0, n/2) ;
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        C01 = sum(M2, M4, 0,0,0,0,n/2);
        C10 = sum(M1, M3, 0,0,0,0,n/2);
        
        M = sub(M0, M1, 0,0,0,0,n/2);
        N = sum(M, M2, 0,0,0,0,n/2);
        C11 = sum(N, M5, 0,0,0,0,n/2);
        freeMatrix(n/2, M), freeMatrix(n/2, N);
        
        for (j = 0; j < n/2; j ++)
        {
            for (k = 0; k<n/2; k ++)
            {
                (*resultMatrix)[j][k] = C00[j][k];
                (*resultMatrix)[j][k + n/2] = C01 [j][k];
                (*resultMatrix)[j + n/2][k] = C10[j][k];
                (*resultMatrix)[j + n/2][k + n/2] = C11 [j][k];
            }
        }
        
        freeMatrix(n/2, M0);
        freeMatrix(n/2, M1);
        freeMatrix(n/2, M2);
        freeMatrix(n/2, M3);
        freeMatrix(n/2, M4);
        freeMatrix(n/2, M5);
        freeMatrix(n/2, M6);
        
        freeMatrix(n/2, C00);
        freeMatrix(n/2, C01);
        freeMatrix(n/2, C10);
        freeMatrix(n/2, C11);
    }
    
    freeMatrix(n, ptr);

}
int **sum(int ** A, int ** B, int x1, int y1, int x2, int y2, int n)
{
    int i,j,k;
    int **ptr = (int ** )malloc(sizeof(int *)* n);
    for (i = 0; i<n; i ++)
    {
        ptr[i] = (int*)malloc(sizeof(int)*n);
    }
    for (j = 0; j<n; j++)
    {
        for (k = 0; k<n; k++)
        {
            ptr [j][k] = A[x1 + j][y1 + k] + B[x2 + j][y2 + k];
        }
    }
    return ptr;
    

}
int **sub(int **A, int **B, int x1, int y1, int x2, int y2, int n)
{
    int i,j,k;
    int **ptr = (int ** )malloc(sizeof(int *)* n);
    for (i = 0; i<n; i ++)
    {
        ptr[i] = (int*)malloc(sizeof(int)*n);
    }
    for (j = 0; j<n; j++)
    {
        for (k = 0; k<n; k++)
        {
            ptr [j][k] = A[x1 + j][y1 + k] - B[x2 + j][y2 + k];
        }
    }
    return ptr;

}	
void initMatrix(int ***mat,int n)
{
    int i, j;
    
    
    
    *mat = (int **)malloc(sizeof(int*) * n);
    for (i = 0; i < n; i ++)
    {
        (*mat)[i] = (int *)malloc(sizeof(int) * n);
        for(j = 0; j < n; j++) {
            (*mat)[i][j] = 0;
        }
    }
    
    
}

int **readMatrix(char * filename)
{
    int i,j,k;
    int **ptr = (int **) malloc(sizeof(int *)*MATSIZE);
    for (i = 0; i < MATSIZE; i ++)
    {
        ptr[i] = (int *) malloc (sizeof(int) * MATSIZE);
    }
    FILE *fp = fopen(filename, "r");
    for (j= 0 ; j< MATSIZE; j ++)
    {
        for (k = 0; k<MATSIZE; k ++)
        {
            fscanf(fp, "%d", &ptr[j][k]);
        }
    }
    return ptr;
    

}
void freeMatrix(int n, int ** matrix)
{
    int i;
    for (i = 0; i < n; i ++)
    {
        int* currentptr = matrix[i];
        free(currentptr);
    }
    free(matrix);
}

void printMatrix(int n, int ** A)
{
    int i, j;
    for (i=0; i<n; i++)
    {
        for (j = 0; j<n; j ++)
        {
            printf("%d ", A[i][j]);
        }
        printf("\n");
    }
    
            

}
