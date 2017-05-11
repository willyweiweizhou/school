function [y2] = kronecker(A,B,x)
    [a,b] = size(A);
    [c,d] = size(B);
    x2 = reshape(x, [b*d,1]);
    y = kron(A,B)*x2;
    [y2] = y;
end
