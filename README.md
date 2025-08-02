# JO BTEC AI Agent

خدمة الذكاء الاصطناعي لمنصة JO BTEC التعليمية

## المميزات
- دعم المحادثة باللغة العربية
- معالجة استفسارات المبيعات والدعم الفني
- واجهة برمجة RESTful
- دعم Docker للنشر السهل

## متطلبات التشغيل
- Node.js v18 أو أحدث
- npm v9 أو أحدث

## التثبيت والتشغيل

1. تثبيت المكتبات:
```bash
npm install
```

2. تشغيل في وضع التطوير:
```bash
npm run dev
```

3. البناء للإنتاج:
```bash
npm run build
```

4. تشغيل في وضع الإنتاج:
```bash
npm start
```

## المتغيرات البيئية
قم بإنشاء ملف `.env` في المجلد الرئيسي:
```
PORT=3000
NODE_ENV=development
```

## النشر
المشروع منشور ويعمل على Render.com. 

### ملاحظات مهمة
- الخدمة تعمل على النسخة المجانية من Render.com
- الخادم سيتوقف تلقائياً بعد فترة من عدم النشاط
- قد يستغرق أول طلب بعد التوقف حوالي 50 ثانية للاستجابة

### المتغيرات البيئية المطلوبة على Render.com
```
PORT=3000
NODE_ENV=production
```

## استخدام الخدمة
عنوان الخدمة الأساسي: `https://jo-btec-server-1.onrender.com`

### نقاط النهاية API Endpoints
#### المحادثة
- **URL**: `/api/ai/chat`
- **Method**: `POST`
- **Headers**: 
  ```
  Content-Type: application/json
  ```
- **Body**:
  ```json
  {
    "message": "نص الرسالة هنا"
  }
  ```
- **Response**:
  ```json
  {
    "response": "رد المساعد الذكي",
    "status": "success"
  }
  ```

### أمثلة على الاستخدام
#### باستخدام cURL:
```bash
curl -X POST https://jo-btec-server-1.onrender.com/api/ai/chat \
  -H "Content-Type: application/json" \
  -d '{"message": "السلام عليكم"}'
```

#### باستخدام PowerShell:
```powershell
$headers = @{ 'Content-Type' = 'application/json' }
$body = '{"message": "السلام عليكم"}'
Invoke-WebRequest -Uri 'https://jo-btec-server-1.onrender.com/api/ai/chat' -Method Post -Headers $headers -Body $body
```

## الترخيص
جميع الحقوق محفوظة © 2025 JO BTEC
