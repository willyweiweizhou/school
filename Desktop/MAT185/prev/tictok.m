A = rand(100,100);
B = rand(100,100);
x = ones(100);


tic
matvect_fast(A,B,x);
time1 = toc

tic

kronecker(A,B,x);

time2 = toc

% i observed that matvect_fast is a lot faster than kron function.