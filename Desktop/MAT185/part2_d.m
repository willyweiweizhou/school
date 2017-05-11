
% question d

face = reshape(faces(:, 200), 60, 60)';

C = mean_normalized_faces * mean_normalized_faces'/number_of_faces;
[V, B] = eig(C);
V_new = fliplr(V);

k_2 = [10,20,50,100,500];
[V3, B] = eig(C);
V4 = fliplr(V3);



figure
subplot(1,6,1);
face2 = reshape(christophe, 60, 60)';
imagesc(face2);
colormap(gray(256));
axis off;
title('original');

for i = 1:5;
    coord_Temp = V4'*christophe;
    m = k_2(i) + 1
    for j= m:3600
        coord_Temp(j) = 0;
    end 
    
    coord_Temp_2 = V4 * coord_Temp;
    
    subplot(1,6,i + 1)
    face3 = reshape(coord_Temp_2, 60, 60)';
    imagesc(face3);
    colormap(gray(256));
    if i == 1
        title('k = 10')
    
    elseif i == 2
        title('k = 20')
    
    elseif i == 3
        title('k = 50')
    
    elseif i == 4
        title('k = 100')
     
    elseif i == 5
        title('k = 500')
    end;
    axis off;
end

%comment: it can be observed that christophe's photo do not converge as
%fast
%because Christophe's photo is not whithin the original database
%so using the orthogonal matrix based on original database can not
%approximate Christophe's photo properly. 

