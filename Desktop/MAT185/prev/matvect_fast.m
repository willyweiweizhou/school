function [y] = matvect_fast(A,B,x)
    
    [a,b] = size(A);
    [c,d] = size(B);
    B2 = inv(B);
    A2 = A';
    
    x = reshape(x,[d,b]);
    Y = B*x*A2;
    [y] = reshape(Y, [1, a*c]);
   
end

    