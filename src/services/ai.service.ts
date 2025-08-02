export class AIService {
  private readonly templates = {
    sales: {
      context: `
        أنت موظف مبيعات في JO BTEC.
        معلومات المنتجات:
        - الباقة الشهرية: 10 دنانير شهرياً
        - الباقة السنوية: 100 دينار (توفير 20 دينار)
        - باقة المدارس: حسب عدد الطلاب
        المميزات:
        - محتوى تعليمي شامل
        - دعم فني على مدار الساعة
        - تحديثات مستمرة للمحتوى
      `,
      keywords: ['سعر', 'اشتراك', 'تكلفة', 'باقة', 'دفع']
    },
    support: {
      context: `
        أنت موظف دعم فني في JO BTEC.
        الحلول الشائعة:
        1. تحديث التطبيق
        2. مسح الكاش
        3. إعادة تسجيل الدخول
        4. التحقق من الاتصال بالإنترنت
        5. تواصل مع الدعم الفني المباشر
      `,
      keywords: ['مشكلة', 'خطأ', 'لا يعمل', 'توقف', 'بطيء']
    },
    reception: {
      context: `
        أنت موظف استقبال في JO BTEC.
        معلومات عامة:
        - منصة تعليمية أردنية متخصصة
        - مناهج معتمدة من وزارة التربية
        - دعم مباشر للطلاب
        - محتوى باللغة العربية
        ساعات العمل:
        - خدمة العملاء: 24/7
        - الدعم الفني: 9 صباحاً - 10 مساءً
      `,
      keywords: ['معلومات', 'استفسار', 'كيف', 'متى', 'أين']
    }
  };

  async generateResponse(message: string): Promise<string> {
    const type = this.determineAgentType(message);
    const context = this.templates[type].context;
    
    // هنا يمكنك استخدام أي نموذج ذكاء اصطناعي مجاني
    // مثال بسيط للتوضيح:
    const responses = {
      sales: [
        'شكراً لاهتمامك بمنصتنا! يسعدني مساعدتك في اختيار الباقة المناسبة.',
        'لدينا عرض خاص حالياً على الباقة السنوية.',
        'هل تريد معرفة المزيد عن مميزات كل باقة؟'
      ],
      support: [
        'أنا هنا لمساعدتك في حل المشكلة.',
        'دعني أرشدك خطوة بخطوة لحل هذه المشكلة.',
        'هل جربت تحديث التطبيق أو إعادة تشغيله؟'
      ],
      reception: [
        'مرحباً بك في JO BTEC! كيف يمكنني مساعدتك؟',
        'سعيد بتواصلك معنا. أنا هنا للإجابة على استفساراتك.',
        'هل لديك أي أسئلة محددة عن خدماتنا؟'
      ]
    };

    // اختيار رد عشوائي مناسب للنوع
    const typeResponses = responses[type];
    const randomResponse = typeResponses[Math.floor(Math.random() * typeResponses.length)];

    return `${randomResponse}\n\n${this.getContextBasedResponse(message, type)}`;
  }

  determineAgentType(message: string): 'sales' | 'support' | 'reception' {
    message = message.toLowerCase();
    
    for (const [type, data] of Object.entries(this.templates)) {
      if (data.keywords.some(keyword => message.includes(keyword))) {
        return type as 'sales' | 'support' | 'reception';
      }
    }
    
    return 'reception';
  }

  private getContextBasedResponse(message: string, type: 'sales' | 'support' | 'reception'): string {
    // إضافة ردود سياقية بناءً على نوع الرسالة
    switch (type) {
      case 'sales':
        if (message.includes('سعر')) {
          return 'الباقة الشهرية تبدأ من 10 دنانير فقط، وهناك خصم 20% على الاشتراك السنوي!';
        }
        return 'هل تود الاطلاع على قائمة الأسعار والباقات المتوفرة؟';
      
      case 'support':
        if (message.includes('بطيء')) {
          return 'للتحسين السرعة، جرب:\n1. مسح ذاكرة التخزين المؤقت\n2. التأكد من سرعة الإنترنت\n3. تحديث التطبيق لآخر إصدار';
        }
        return 'هل يمكنك وصف المشكلة بالتفصيل لأتمكن من مساعدتك بشكل أفضل؟';
      
      default:
        return 'نحن نقدم خدمة تعليمية متكاملة تشمل شرح المناهج، والتمارين، والاختبارات التفاعلية. هل تريد معرفة المزيد؟';
    }
  }
}
