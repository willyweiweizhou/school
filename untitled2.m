
e = 10:95;
for eps = 10:95
    P = [0.6 (50-0.5*eps/100) 0.1 0.7 0.25; 0.15 eps/100 0.2 0 0; 0.05 (50-0.5*eps/100) 0.5 0.1 0; 0.05 0 0.2 0.1 0.25; 0.15 0 0 0.1 0.5];
    A = P - eye(5);
    sol = null(A);
    sol = sol/sum(sol);
    sol2(eps - 9) = sol(2);
end

plot(e, sol2, 'b-')

    
    