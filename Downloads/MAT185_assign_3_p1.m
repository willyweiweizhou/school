clear all;%remove all the variables from the workspace
format long; %variables are displayed with 15 digits after decimal point


%a

n = 10;
h = 1/(n +1);
A = a_matrix(n);


%b

eigen_v = eig(A);


for i = 1:size(eigen_v)
    for j = 1:size(eigen_v)-1
        if eigen_v(j) > eigen_v(j+1)
            temp = eigen_v(j);
            eigen_v(j) = eigen_v(j+1);
            eigen_v(j+1) = temp;
        end;
    end;
end;

for i = 1:n
    x_array(i) = i*h;
    lam(i) = 2*(1-cos(pi*x_array(i)));
end;
eigen_v
lam'
diff = eigen_v - lam'


% diff =
% 
%    1.0e-15 *
% 
%   -0.416333634234434
%    0.222044604925031
%                    0
%                    0
%   -0.444089209850063
%                    0
%                    0
%    0.444089209850063
%   -0.888178419700125
%   -0.444089209850063



% Question c
N = [10,100,500,1000];
[a,b] = size(N);
for k = 1:b
    X = ones(N(k));
    A = a_matrix(N(k));
    h = 1/(N(k) +1);
    eigen_v = eig(A);
    for i = 1:size(eigen_v)
        for j = 1:size(eigen_v)-1
            if eigen_v(j) > eigen_v(j+1)
                temp = eigen_v(j);
                eigen_v(j) = eigen_v(j+1);
                eigen_v(j+1) = temp;
            end;
        end;
    end;
    min = eigen_v(1)
    max = eigen_v(N(k))
end;
% min =
% 
%    0.081014052771005
% 
% 
% max =
% 
%    3.918985947228995
% 
% 
% min =
% 
%      9.674354160243079e-04
% 
% 
% max =
% 
%    3.999032564583975
% 
% 
% min =
% 
%      3.932084756990627e-05
% 
% 
% max =
% 
%    3.999960679152430
% 
% 
% min =
% 
%      9.849886676072264e-06
% 
% 
% max =
% 
%    3.999990150113323

% As N increase, the max value, of eigevalue of A is closer to 4, 
% As N increase, the minimum value of eigen value is closer to 0.


% Question d
N = 100;
h = 1/(N+1);
for i = 1: N
    x_array(i) = i*h;
    b_array(i) = (1-x_array(i).^3) * h * h;
end;

X = ones(N);
A = a_matrix(N);

u_array  = A\b_array';


euclidean_norm = norm(b_array' - A * u_array)

%euclidean_norm = 

%        1.371543085162037e-16
% The Euclidean norm is shown above, which is pretty close to the matlab
% machine precision.



% Question e
N = 100;
h = 1/(N+1);

for i = 1: N
    x_array(i) = i*h;
end;
x = [0, x_array, 1];
y = [0, u_array', 0];
subplot(2,1,1);
plot(x,y,'LineWidth',1)
title('The solution to ODEs')
hold on


for i = 1:N
    u_exact(i) = -x_array(i).^2/2 + x_array (i) .^5/20  + 9/20 * x_array(i);
end;



uExact = [0, u_exact, 0];
subplot(2,1,1);
plot(x, uExact,'o:')
legend('Numerical solution', 'Exact solution');
title('The solution to ODEs');
xlabel('x');
ylabel('y');
grid on;

dis_error = sqrt(h * sum((y(2:N+1)-uExact(2:N+1)).^2))

%dis_error =

%     2.254895123417637e-06



% Question f
N = [10,100,500,1000];
[a,b] = size(N);
for k = 1:b
    X = ones(N(k));
    x_array = zeros(1, N(k));
    b_array = zeros(1, N(k));
    u_array = zeros(N(k),1);
    u_exact = zeros(1,N(k));
    
    
    A =a_matrix(N(k));
    
    for i = 1: N(k)
        h = 1/(N(k)+1);
        x_array(i) = i*h;
        b_array(i) = (1-x_array(i).^3) * h * h;
    end;
    
    u_array  = A\b_array';
    y = [0, u_array', 0];
    
    for j = 1:N(k)
        u_exact(j) = -x_array(j).^2/2 + x_array(j).^5/20  + 9/20 * x_array(j);
    end;
    uExact = [0, u_exact, 0];
    
    error(k) = sqrt(h * sum((y(2:N(k)+1)-uExact(2:N(k)+1)).^2));
    
    for i = 1: N(k)
        x_array(i) = i*h;
    end;
    x_log = [0, log(x_array), log(1)];
    
end;

error

for k = 1:b
    h_log(k) = log10(1/(N(k)+1));
    dis_error_log(k) = log10(error(k));
end;
subplot(2,1,2);
plot(h_log,dis_error_log)
title('The relationship between solution error and mesh grids');
xlabel('x');
ylabel('y');
grid on

% error =

%    1.0e-03 *
% 
%    0.190092200791588   0.002254895123418   0.000091641819885   0.000022956227705
% When N increased, the h decreases, and the relationship between solution
% error and h is linear. 
% we can make error smaller by making N larger

