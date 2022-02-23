# Covid-Safe-ZoneApp
```
1. Clone Project ลงเครื่อง
2. yarn install
3. expo start
4. เอาโทรศัพท์มาแสกน QR CODE ที่ได้จาก Expo แล้วรันในโทรศัพท์
**ภายในแอปพลิเคชันมีฟังก์ชันการแสกน QR CODE ต้องใช้โทรศัพท์จริงๆมาลองรันแอปพลิเคชัน
**แอปพลิเคชันสามารถทำงานได้ทั้งบน IOS และ Android แต่ใน IOS หน้าตาของ UI อาจจะไม่เสถียรเท่าฝั่ง Android
```
วิดีโอสาธิตการใช้งานแอปพลิเคชัน : [COVID19 Safe Zone! App Presentation](https://youtu.be/ivoMWmO9CcI) เริ่ม Demo นาทีที่ 07:18

ใช้ ``Firebase`` ในการเก็บข้อมูลของผู้ใช้
* Collection ``infoVaccineUser`` เก็บข้อมูลดังนี้

| Field Name | Description |
|------------|-------------|
| CertificateNo | Certificate Serial No. 10 หลัก ที่ได้รับจากเอกสารการฉีดวัคซีนของหมอพร้อม |
| CertificateCode | ได้จากการสแกน QR CODE ของหมอพร้อม |
| vaccineBrandFirstDose | วัคซีนเข็มที่ 1|
| vaccineBrandSecondDose | วัคซีนเข็มที่ 2 |
| vaccineBrandThirdDose | วัคซีนเข็มที่ 3 |
| vaccinationPlace | สถานที่ฉีดวัคซีน |
| quantity | จำนวนโดสของวัคซีนที่ผู้ใช้รับมา |
| name | ชื่อ - นามสกุล |
| gender | เพศ |
| age | อายุ |
| longitude | พิกัด longitude ของผู้ใช้ |
| latitude | พิกัด latitude ของผู้ใช้ |
