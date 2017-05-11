struct Vehicle{
    int numWheels;
    char model[NAME_LEN+1];
    int numPassengers;
    int currSpeed;
    int gear;
    struct vInterface vehInt;
};

struct Vehicle * initVehicle(int wheels, char * model, struct vInterface vInt);
void cleanUpVehicle(struct Vehicle * v);