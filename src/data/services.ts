export interface Service {
  id: string;
  title: string;
  description: string;
  details: string[];
}

export const servicesData: { [key: string]: Service[] } = {
  uk: [
    {
      id: 'criminal',
      title: 'Кримінальне право',
      description: 'Захист у кримінальних справах, представництво в суді, консультації з кримінального права. Захист на всіх стадіях кримінального процесу: досудове розслідування, судовий розгляд, апеляційне та касаційне оскарження.',
      details: [
        'Захист підозрюваного, обвинуваченого на стадії досудового розслідування.',
        'Представництво інтересів потерпілого у кримінальному провадженні.',
        'Захист у суді першої, апеляційної та касаційної інстанцій.',
        'Оскарження запобіжних заходів.',
        'Підготовка клопотань, скарг та заяв.'
      ]
    },
    {
      id: 'civil',
      title: 'Цивільне право',
      description: 'Вирішення цивільних спорів, складання договорів, представництво в цивільних справах. Захист майнових та особистих немайнових прав, спори щодо нерухомості, спадкування, відшкодування шкоди.',
      details: [
        'Складання позовних заяв, апеляційних та касаційних скарг.',
        'Представництво інтересів у судах усіх інстанцій.',
        'Вирішення спорів щодо нерухомості та спадщини.',
        'Справи про розірвання шлюбу, поділ майна, аліменти.',
        'Захист прав споживачів.'
      ]
    },
    {
      id: 'corporate',
      title: 'Господарське право',
      description: 'Юридичний супровід бізнесу, корпоративні спори, реєстрація та ліквідація підприємств. Правова підтримка господарської діяльності, захист інтересів у господарських судах.',
      details: [
        'Реєстрація та ліквідація ФОП, ТОВ.',
        'Юридичний супровід господарської діяльності.',
        'Складання та аналіз договорів.',
        'Представництво інтересів у господарських судах.',
        'Вирішення корпоративних спорів.'
      ]
    },
    {
      id: 'military',
      title: 'Військове право',
      description: 'Юридична допомога з питань перетину кордону військовозобов\'язаними, проходження ВЛК, оформлення бронювання. Консультації з військового права та захист прав військовослужбовців.',
      details: [
        'Оскарження рішень ВЛК.',
        'Юридична допомога при мобілізації.',
        'Захист прав військовослужбовців та їхніх сімей.',
        'Консультації щодо перетину кордону.',
        'Допомога в оформленні відстрочки та бронювання.'
      ]
    },
    {
      id: 'administrative',
      title: 'Адміністративне право',
      description: 'Захист у справах про адміністративні правопорушення, оскарження дій органів влади. Представництво інтересів у відносинах з державними органами, захист від неправомірних дій чи бездіяльності.',
      details: [
        'Оскарження штрафів та постанов поліції.',
        'Представництво в судах у справах про адміністративні правопорушення.',
        'Захист у справах, пов\'язаних з порушенням ПДР.',
        'Оскарження дій та бездіяльності органів державної влади.',
        'Допомога у вирішенні митних спорів.'
      ]
    },
    {
      id: 'consultation',
      title: 'Юридичні консультації',
      description: 'Професійні консультації з правових питань, аналіз документів, юридичні висновки. Надання правової допомоги з будь-яких юридичних питань, роз\'яснення законодавства.',
      details: [
        'Усні та письмові консультації.',
        'Правовий аналіз документів.',
        'Розробка юридичної стратегії.',
        'Допомога у складанні договорів та заяв.',
        'Консультації з будь-яких галузей права.'
      ]
    }
  ],
  en: [
    {
      id: 'criminal',
      title: 'Criminal Law',
      description: 'Defense in criminal cases, court representation, criminal law consultations. Protection at all stages of the criminal process: pre-trial investigation, trial, appeal and cassation.',
      details: [
        'Defense of the suspect, accused at the pre-trial investigation stage.',
        'Representation of the victim\'s interests in criminal proceedings.',
        'Defense in courts of first, appellate, and cassation instances.',
        'Appealing preventive measures.',
        'Preparation of motions, complaints, and statements.'
      ]
    },
    {
      id: 'civil',
      title: 'Civil Law',
      description: 'Resolution of civil disputes, contract drafting, representation in civil cases. Protection of property and personal non-property rights, disputes regarding real estate, inheritance, compensation for damages.',
      details: [
        'Drafting statements of claim, appeals, and cassation complaints.',
        'Representation in courts of all instances.',
        'Resolution of disputes regarding real estate and inheritance.',
        'Cases of divorce, division of property, alimony.',
        'Protection of consumer rights.'
      ]
    },
    {
      id: 'corporate',
      title: 'Corporate Law',
      description: 'Legal support for business, corporate disputes, registration and liquidation of companies. Legal support for economic activities, protection of interests in commercial courts.',
      details: [
        'Registration and liquidation of individual entrepreneurs, LLCs.',
        'Legal support for business activities.',
        'Drafting and analysis of contracts.',
        'Representation in commercial courts.',
        'Resolution of corporate disputes.'
      ]
    },
    {
      id: 'military',
      title: 'Military Law',
      description: 'Legal assistance on border crossing for military-eligible persons, military medical commission, reservation documentation. Military law consultations and protection of servicemen\'s rights.',
      details: [
        'Appealing decisions of the military medical commission.',
        'Legal assistance during mobilization.',
        'Protection of the rights of servicemen and their families.',
        'Consultations on border crossing.',
        'Assistance in obtaining deferment and reservation.'
      ]
    },
    {
      id: 'administrative',
      title: 'Administrative Law',
      description: 'Defense in administrative offense cases, appealing actions of authorities. Representation of interests in relations with state bodies, protection against illegal actions or inaction.',
      details: [
        'Appealing police fines and citations.',
        'Representation in courts in cases of administrative offenses.',
        'Defense in cases related to traffic violations.',
        'Appealing actions and inaction of state authorities.',
        'Assistance in resolving customs disputes.'
      ]
    },
    {
      id: 'consultation',
      title: 'Legal Consultations',
      description: 'Professional consultations on legal issues, document analysis, legal opinions. Providing legal assistance on any legal issues, clarification of legislation.',
      details: [
        'Oral and written consultations.',
        'Legal analysis of documents.',
        'Development of a legal strategy.',
        'Assistance in drafting contracts and applications.',
        'Consultations on any branch of law.'
      ]
    }
  ]
};
