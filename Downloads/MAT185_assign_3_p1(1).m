clear all;%remove all the variables from the workspace
format long; %variables are displayed with 15 digits after decimal point
n=10;
X = ones(n);
A = -1 * X+tril(1*X,-2)+triu(1*X,2) + 3 * eye(n);

%b
n = 10;
h = 1/(n +1);
e_v = eig(A);
for i = 1:size(e_v)
    for j = 1:size(e_v)-1
        if e_v(j) > e_v(j+1)
            temp = e_v(j);
            e_v(j) = e_v(j+1);
            e_v(j+1) = temp;
        end;end;end;
for i = 1:n
    x_array(i) = i*h;
    lam(i) = 2*(1-cos(pi*x_array(i)));
end;
e_v
lam'
diff = e_v - lam'

%c
N = [10,100,500,1000];
[a,b] = size(N);
for k = 1:b
    X = ones(N(k));
    A = -1 * X+tril(1*X,-2)+triu(1*X,2) + 3 * eye(N(k));
    h = 1/(N(k) +1);
    e_v = eig(A);
    for i = 1:size(e_v)
        for j = 1:size(e_v)-1
            if e_v(j) > e_v(j+1)
                temp = e_v(j);
                e_v(j) = e_v(j+1);
                e_v(j+1) = temp;
            end;end;end;
    min = e_v(1)
    max = e_v(N(k))
end;

%d
N = 100;
h = 1/(N+1);
for i = 1: N
    x_array(i) = i*h;
    b_array(i) = (1-x_array(i).^3) * h * h;
end;

X = ones(N);
A = -1 * X+tril(1*X,-2)+triu(1*X,2) + 3 * eye(N);

u_array  = A\b_array';


euclidean_norm = norm(b_array' - A * u_array)

%e
N = 100;
h = 1/(N+1);

for i = 1: N
    x_array(i) = i*h;
end;
x = [0, x_array, 1];
y = [0, u_array', 0];

plot(x,y,'LineWidth',2)

hold on


for i = 1:N
    u_exact(i) = -x_array(i).^2/2 + x_array (i) .^5/20  + 9/20 * x_array(i);
end;

uExact = [0, u_exact, 0];

plot(x, uExact,'o:')

dis_error = sqrt(h * sum((y(2:N+1)-uExact(2:N+1)).^2))

%f
N = [10,100,500,1000];
[a,b] = size(N);
for k = 1:b
    X = ones(N(k));
    x_array = zeros(1, N(k));
    b_array = zeros(1, N(k));
    u_array = zeros(N(k),1);
    u_exact = zeros(1,N(k));
    
    
    A = -1 * X+tril(1*X,-2)+triu(1*X,2) + 3 * eye(N(k));
    
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
    
    dis_error(k) = sqrt(h * sum((y(2:N+1)-uExact(2:N+1)).^2));
    
    for i = 1: N(k)
        x_array(i) = i*h;
    end;
    x_log = [0, log(x_array), log(1)];
    
end;

dis_error

for k = 1:b
    h_log(k) = log10(1/(N(k)+1));
    dis_error_log(k) = log10(dis_error(k));
end;
%plot(h_log,dis_error_log)
