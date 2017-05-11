struct vInterface{
    int (*setSpeed)(int);
    int (*setGear)(int);
    int (*setPassengers)(int);
};

struct vInterface initVInterface(int (*sS)(int), int (*sG)(int), int (*sP)(int));