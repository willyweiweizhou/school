struct ExpressLaneRec
{
    float enterTime;
    float exitTime;
    struct Car * car;
    struct ExpressLaneRec * nextRec;
};

struct ExpressLaneRec * initExpressLane(float enterTime, float exitTime);
struct ExpressLaneRec * addCarRec(struct Car * c, float enterTime, float exitTime, struct ExpressLaneRec * eL);
void printRecords(struct ExpressLaneRec * eL);
void cleanUpRec(struct ExpressLaneRec * eL);