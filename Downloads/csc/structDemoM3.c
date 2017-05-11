#include<stdio.h>
#include<stdlib.h>
#include<string.h>

#define NAMELEN 10

typedef struct{
    char name[NAMELEN];
    int year;
    int ID;
}Student;

void printContent(Student s)
{ // pass structure as an argument
    printf("Name:%s\n",s.name);
    printf("Year:%d\n",s.year);
    printf("ID  :%d\n",s.ID);
    printf("\n");
}

Student initStruct(char * name, int year, int id)
{ // return structure
    Student s;
    strcpy(s.name,name);
    s.year=year;
    s.ID=id;
    
    return s;
}

void initExistingStruct(Student * s, char * name, int year, int id)
{
    strcpy(s->name,name);
    s->year=year;
    s->ID=id;
}

Student * initDynStruct(char * name, int year, int id)
{ // return pointer of a structure
    Student * sPtr=(Student *)malloc(sizeof(Student));
    //Dynamically allocate space for a structure
    strcpy(sPtr->name,name);
    sPtr->year=year;
    sPtr->ID=id;
    return sPtr;
}

int main()
{
    Student s1,s2,s3;
    Student *sPtr1, **sPtr2;
    //Need to include keyword "struct" during declaration
    Student sArr[2];
    s1=initStruct("Name1", 2000, 24243);
    s2=initStruct("Name2", 1999, 42344);
    printContent(s1);
    printContent(s2);
    
    sArr[0]=s1;
    // Copies the structure member to first index
    sArr[1]=s2;
    // Access each member using dot operator (i.e. sArr[0].year)
    printContent(sArr[0]);
    printContent(sArr[1]);
    
    initExistingStruct(&s3,"Name3", 2001, 545345);
    printContent(s3);
    
    sPtr1=initDynStruct("Name4", 2002, 32131);
    printContent(*sPtr1);
    sPtr2=&sPtr1;
    //(*s4).year <=> s4->year <=> *(*(sPtr2)).year <=>(*sPtr2)->year
    
    free(*sPtr2);
}