 function [sol] = electricity_solver(R1, R2, R3, R4, Vo, sigma, eps)
    R1 = R1+ sigma*eps(1);
    R2 = R2+sigma*eps(2);
    R3 = R3 + sigma * eps(3);
    R4 = R4 + sigma * eps(4);
    Vo = Vo + sigma * eps(5);
    A = [(R1+R2), -R3, 0; 0, R3, R4; 1, 1, -1];
    b= [0; -Vo; 0];
    [sol] = A\b;
 end