# Dockerfile للخادم
FROM node:18-alpine

WORKDIR /app

# نسخ ملفات التكوين أولاً للاستفادة من التخزين المؤقت
COPY package*.json ./
COPY tsconfig*.json ./

# تثبيت الحزم
RUN npm install

# نسخ بقية الملفات
COPY . .

# بناء التطبيق
RUN npm run build

EXPOSE 3000

# تشغيل التطبيق
CMD ["npm", "start"]
