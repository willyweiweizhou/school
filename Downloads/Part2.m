%2b) 
C = mean_normalized_faces * mean_normalized_faces'/number_of_faces;
[V, B] = eig(C);
V2 = fliplr(V);

%2c) 
f = faces(:, 200);
coords = V2' * f;  

figure
face = reshape(faces(:, 200), 60, 60)';
imagesc(face);
colormap(gray(256));


for i = [10,20,50,100,500];
    coord_Temp = coords;
    for j= i+1:3600
        coord_Temp(j) = 0;
    end 
    
    coord_Temp = V2 * coord_Temp;
    
    figure
    face = reshape(coord_Temp, 60, 60)';
    imagesc(face);
    colormap(gray(256));    
end

%2d) 
C2 = mean_normalized_christophe * mean_normalized_christophe'/number_of_faces;
[V3, B] = eig(C2);
V4 = fliplr(V3);

figure
face2 = reshape(christophe, 60, 60)';
imagesc(face2);
colormap(gray(256));


for i = [10,20,50,100,500];
    coord_Temp = coords;
    for j= i+1:3600
        coord_Temp(j) = 0;
    end 
    
    coord_Temp = V4 * coord_Temp;
    
    figure
    fac2e = reshape(coord_Temp, 60, 60)';
    imagesc(face2);
    colormap(gray(256));    
end



