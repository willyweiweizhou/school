
e = 10:95; 
for eps = 10:95
    P = [0.6 ((50-eps/2)/100) 0.1 0.7 0.25;0.15 (eps/100) 0.2 0 0;0.05 (50-eps/2)/100 0.5 0.1 0;0.05 0 0.2 0.1 0.25;0.15 0 0 0.1 0.5];
    A = P - eye(5);%Ax = x -> Ax-x = 0 -> x(A-I) = 0 
    sol = null(A);
    sol = sol/sum(sol);
    x(eps - 9) = sol(2);%store the second element in sol matrix to x
    
end

plot(e, x, 'r-')
xlabel('effort(eps)')
ylabel('time in tank2')
title('second component of the stationary distribution')


    
    