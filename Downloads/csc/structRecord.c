#include<stdio.h>
#include<stdlib.h>
#include<string.h>
#define NAMELEN 20

/*
 *         hier->     Monarchy
 *                      |
 *                     P M
 *               /      |       \
 *      PM Office    Cabinet    Privy Council Office
 */

struct GovEntity{
    char label[NAMELEN];
    struct GovEntity * next;
};

/*   ___________
 *   | label   |
 *   | next->? |
 *   |_________|
 *   GovEntity
 */

/*
 *         hier->  Monarchy
 *                    |
 *                   P M      curr
 *                    |         |
 *               PM Office -> Cabinet -> Privy Council Office -> []
 */

/*          ___________     ___________
 *  hier->  | label   |     |  label  |
 *          | next------>   |  next --------> []
 *          |_________|     |_________|
 *          dynAlloc        dynAlloc
 *                                ^
                                  |
 *                              curr
 */

struct GovEntity * createDynStruct(char * labelName)
{
    struct GovEntity * sPtr = (struct GovEntity *)malloc(sizeof(struct GovEntity));
    strcpy(sPtr->label, labelName);
    sPtr->next=NULL;
    return sPtr;
}

void printChain(struct GovEntity * sPtr)
{
    while (sPtr!=NULL) {
        printf("%s\n", sPtr->label);
        sPtr=sPtr->next;
    }
}

void freeChain(struct GovEntity * sPtr)
{
    if (sPtr->next==NULL) {
        free(sPtr);
    }
    else {
        freeChain(sPtr->next);
        free(sPtr);
    }
}

int main()
{
    struct GovEntity * hier, * curr;
    hier=createDynStruct("Monarchy");
    curr=hier;
    curr->next=createDynStruct("PM");
    curr=curr->next;
    curr->next=createDynStruct("PM Office");
    curr=curr->next;
    curr->next=createDynStruct("Cabinet");
    curr=curr->next;
    curr->next=createDynStruct("Privy Council Office");
    
    printChain(hier);
    freeChain(hier);
    hier=NULL;
}