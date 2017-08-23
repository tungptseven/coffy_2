# Coffy

### Demo 
https://youtu.be/e1ot_Y0Cj_M

### Sử dụng REST 
1. Tìm địa điểm theo lat, long, khoảng cách r, loại quán type

    POST:  localhost:3000/find/location hoặc 163.44.206.220:3000/find/location

    param:  inLat, inLong, inR, inType

    vd: (21.014825, 105.846336, 2000, 2)

2. Tìm địa điểm theo quận và loại quán
  
    POST: localhost:3000/find/district hoặc 163.44.206.220:3000/find/district

    param: iType2, inDist

    vd: (2, 2)

## Cài đặt
1. Tải NodeJS: https://nodejs.org/en/download/
2. Mở terminal tới thư mục Coffy:
```
npm install
node app.js
```
