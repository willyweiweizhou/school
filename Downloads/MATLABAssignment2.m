%Jeong's copy 

clear;
close all; 

i = 1;
E = 10:95;

for Epsilon = 10:95
    Pnew = [0.6 ((50-Epsilon/2)/100) 0.1 0.7 0.25;0.15 (Epsilon/100) 0.2 0 0;0.05 (50-Epsilon/2)/100 0.5 0.1 0;0.05 0 0.2 0.1 0.25;0.15 0 0 0.1 0.5];
    A = Pnew - eye(5);
    x = null(A);
    x = x/sum(x);
    comp2(i) = x(2);
    i = 1 +i;
end

plot(E, comp2, 'b-')
ylim([0 1])
xlim([0 100])
title('Second component of the stationary distribution vs. Effort spent on decorations')
xlabel('Effot spent on decorations (Epsilon)')
ylabel('Time fish will spend in tank 2')
    
    