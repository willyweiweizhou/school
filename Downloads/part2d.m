load_faces;
x = mean_normalized_faces;
m = size(x);
C = x*x';
C = C/m(2);
[V,B] = eig(C);


for i=1:m(1)/2
    temp = B(i,i);
    B(i,i) = B(m(1)-i+1,m(1)-i+1);
    B(m(1)-i+1,m-i(1)+1) = temp;
    vec = V(:,i);
    V(:,i) = V(:,m(1)-i+1);
    V(:,m(1)-i+1) = vec;
end

coord1 = inv(V)*christophe;
coord2 = inv(V)*geoffrey;
k=[10 20 40 100 500];


figure
ax1 = subplot(1,6,1);
christophe = reshape(christophe,60,60)';
imagesc(ax1,christophe);
colormap(gray(256)); 
hold on






for i=1:5
    val1 = coord1;
 
    for j=k(i)+1:3600
        val1(j) = 0;
      
    end
    
    newface1 = V*val1;
    
    
    ax1 = subplot(1,6,i+1);
    newface1 = reshape(newface1,60,60)';
    imagesc(ax1,newface1);
    colormap(gray(256)); 
    
end

figure
ax2 = subplot(1,6,1);
geoffrey = reshape(geoffrey,60,60)';
imagesc(ax2,geoffrey);
colormap(gray(256)); 

hold on

for i=1:5
    
    val2 = coord2;
    for j=k(i)+1:3600
        
        val2(j) =0;
    end
    
    
    newface2 = V*val2;
    
 
    
    
    ax2 = subplot(1,6,i+1);
    newface2 = reshape(newface2,60,60)';
    imagesc(ax2,newface2);
    colormap(gray(256));
    
end























