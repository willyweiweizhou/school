clear all;

%%%number_of_faces sets the number of faces that the program will read from the database.
%%%There are 4000 total, so you are welcome to increase number_of_faces to any number up to 4000.
number_of_faces = 2000;

%%%face_size sets the size of the face to a 60x60 image.
%%%The actual images have many more pixels, but using the full size can cause problems on
%%%slower machines and memory overloads
face_size = 60;

%%%these are numbers that I use to calculate the range of pixels I should extract
%%%from the image to get an image of size face_size by face_size
f_s_min = 64 - floor(face_size / 2);
f_s_max = f_s_min + face_size - 1;

%%%initialize the matrix that will hold all the face data.
%%%doing this initialization saves some run time
faces = NaN(face_size * face_size, number_of_faces);

for k=1223:1222 + number_of_faces
    fid=fopen(['rawdata/' int2str(k)]);
    %%% if the file doesn't open properly, set the pixels to all zero
    %%% The test 'if (is_valid_file_id(fid) == 0)' is not working in MATLAB and has been changed:
    if (fid < 0)
      faces(:, k - 1222) = zeros(face_size * face_size, 1);
    else
      face = fread(fid);
      if (length(face) == 16384)
        %%% in this case, the face has been properly read and has the expected number of pixels
        %%% the next line extracts a face_size by face_size sub-image, and converts it to a column matrix
        %%% The following line 
        %%% subface_column = reshape(reshape(face, 128, 128) (f_s_min:f_s_max, f_s_min:f_s_max), face_size*face_size, 1);
        %%% is not working in MATLAB and has been replaced by the two following lines:
        face_128_128 = reshape(face, 128, 128);
        face_extract = face_128_128(f_s_min:f_s_max, f_s_min:f_s_max);
        subface_column = reshape(face_extract, face_size*face_size, 1);
        faces(:, k-1222) = subface_column;
      else %%%if the file opens properly but doesn't contain the correct number of pixels, set it to all zero
        faces(:, k - 1222) = zeros(face_size * face_size, 1);
      end
      fclose(fid);
    end
end

%%%Calculate the mean of the data set, and create the normalized data set
mean_of_faces = mean(faces, 2);
%%% The following line
%%% mean_normalized_faces = faces - mean_of_faces;
%%%  is not working in MATLAB and is replaced by:
for i = 1:number_of_faces
   mean_normalized_faces(:,i) = faces(:,i) - mean_of_faces;
end

%%%now load christophe's face
fid=fopen('rawdata/christophe');
christophe = fread(fid);
fclose(fid);   
mean_normalized_christophe = (christophe - mean_of_faces);

%%%now load geoffrey's face
fid=fopen('rawdata/geoffrey');
geoffrey = fread(fid);
fclose(fid);   
mean_normalized_geoffrey = (geoffrey - mean_of_faces);



%%%Example of print:x

%%%face = reshape(faces(:, 200), 60, 60)';
%%%imagesc(face);
%%%colormap(gray(256));


% question b

face = reshape(faces(:, 200), 60, 60)';

C = mean_normalized_faces * mean_normalized_faces'/number_of_faces;
[V, B] = eig(C);
V_new = fliplr(V);

%question c

f = faces(:, 200);
A = V_new' * f;  

figure

face = reshape(faces(:, 200), 60, 60)';
subplot(1,6,1);
imagesc(face);
colormap(gray(256));
title('original');
axis off;




k = [10,20,50,100,500];
s = 1
for i = 1: 5;
    coord_Temp = A;
    n = k(i) + 1;
    for j= n :3600
        coord_Temp(j) = 0;
    end;
    
    coord_Temp = V_new * coord_Temp;
    
    face = reshape(coord_Temp, 60, 60)';
    subplot(1,6,i + 1)
    imagesc(face);
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
    end;

    
    %question d
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
