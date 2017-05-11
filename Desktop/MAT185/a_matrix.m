% Yuxuan Chen 1002742587


function [ A ] = a_matrix( n )
%UNTITLED2 Summary of this function goes here
%   Detailed explanation goes here

X = ones(n);
A = -1 * X+tril(1*X,-2)+triu(1*X,2) + 3 * eye(n);

end

