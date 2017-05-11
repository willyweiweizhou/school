struct Car{
    struct Vehicle * veh;
    int hasNav;
    void (*setCarState)(struct Car *, int, int, int, int);
};

int setSpeed(int speed);
int setGear(int gear);
int setPassengers(int passengers);
void setCarState(struct Car * c, int speed, int gear, int passengers, int nav);
void printCarState(struct Car * c);
struct Car * initCar(int nav, char * model);
void cleanUpCar(struct Car * c);