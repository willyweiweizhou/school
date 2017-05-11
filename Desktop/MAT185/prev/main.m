function main
    A = rand(50,50);
    B = rand(50,50);
    x = ones(2500,1);
    electricity_solver(2,4,3,1,20,0.1,[-1,1,0,1,-1])
    linsyst_fast(A,B,x);
    kronecker(A,B,x);
    error = sqrt(sum(abs(linsyst_fast(A,B,kronecker(A,B,x))-x)).^2)
end

    