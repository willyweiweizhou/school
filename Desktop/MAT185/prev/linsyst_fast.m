function [x] = linsyst_fast(A,B,d)
    [a,b] = size(A);
    [c,e] = size(B);
    
    
    b1 = inv(B);
    a1 = inv(A');
    D = reshape(d,[e,b]);
    [x] = reshape(B\D/A',a*c,1);
end
