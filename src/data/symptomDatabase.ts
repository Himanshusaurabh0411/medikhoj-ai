export interface SymptomDefinition {
  key: string;
  nameEn: string;
  nameHi: string;
  descriptionEn: string;
  descriptionHi: string;
  redFlags: {
    id: string;
    textEn: string;
    textHi: string;
    isCritical: boolean;
  }[];
  ageGuidance: {
    infant: {
      urgentAdviceEn: string;
      urgentAdviceHi: string;
      allowOtc: boolean;
      noteEn: string;
      noteHi: string;
    };
    child: {
      urgentAdviceEn: string;
      urgentAdviceHi: string;
      allowOtc: boolean;
      noteEn: string;
      noteHi: string;
    };
    adult: {
      urgentAdviceEn: string;
      urgentAdviceHi: string;
      allowOtc: boolean;
      noteEn: string;
      noteHi: string;
    };
    elderly: {
      urgentAdviceEn: string;
      urgentAdviceHi: string;
      allowOtc: boolean;
      noteEn: string;
      noteHi: string;
    };
  };
  selfCareAdviceEn: string[];
  selfCareAdviceHi: string[];
  safeOtcOptions: {
    saltName: string;
    dosageForm: string;
    cautions: string;
  }[];
  prescriptionOnlyAlerts: string[];
  recommendedTests: string[];
}

export const SYMPTOM_DATABASE: SymptomDefinition[] = [
  {
    key: "fever",
    nameEn: "Fever / Pyrexia",
    nameHi: "बुखार (Fever)",
    descriptionEn: "Elevated body temperature above normal range (≥ 100.4°F or 38°C).",
    descriptionHi: "शरीर का तापमान 100.4°F (38°C) से अधिक होना।",
    redFlags: [
      { id: "fever-stiff-neck", textEn: "Stiff neck, light sensitivity, or extreme lethargy (possible meningitis sign)", textHi: "गर्दन में अकड़न, तेज सिरदर्द या अत्यधिक सुस्ती (मेनिन्जाइटिस का संकेत)", isCritical: true },
      { id: "fever-seizure", textEn: "Febrile convulsions, seizures, or loss of consciousness", textHi: "दौरे पड़ना या बेहोशी", isCritical: true },
      { id: "fever-petechiae", textEn: "Dark purple rash or petechiae that does not fade under pressure", textHi: "त्वचा पर गहरे बैंगनी या लाल दाने जो दबाने पर फीके न पड़ें", isCritical: true },
      { id: "fever-high-duration", textEn: "Temperature exceeding 103°F (39.4°C) or lasting > 3 consecutive days", textHi: "बुखार 103°F से अधिक या 3 दिनों से अधिक समय तक लगातार रहना", isCritical: false },
      { id: "fever-breathing", textEn: "Difficulty breathing, chest tightness, or rapid respiration", textHi: "सांस लेने में कठिनाई या छाती में भारीपन", isCritical: true }
    ],
    ageGuidance: {
      infant: {
        urgentAdviceEn: "DOCTOR FIRST: Any infant under 3 months with temperature ≥ 100.4°F requires immediate emergency pediatric evaluation. Do not self-medicate.",
        urgentAdviceHi: "शिशुओं में 100.4°F से अधिक बुखार होने पर तुरंत बाल रोग विशेषज्ञ (पीडियाट्रिशियन) को दिखाएं। बिना डॉक्टर की सलाह दवा न दें।",
        allowOtc: false,
        noteEn: "Neonates and young infants can deteriorate rapidly. Professional evaluation is mandatory.",
        noteHi: "छोटे बच्चों की स्थिति तेजी से बिगड़ सकती है। तुरंत डॉक्टर से मिलना अनिवार्य है।"
      },
      child: {
        urgentAdviceEn: "Consult a pediatrician if fever persists > 48 hours or if the child is lethargic, refusing fluids, or vomiting repeatedly.",
        urgentAdviceHi: "यदि बुखार 48 घंटे से अधिक रहे या बच्चा सुस्त हो और पानी न पी रहा हो, तो बाल रोग विशेषज्ञ से मिलें।",
        allowOtc: true,
        noteEn: "Never administer Aspirin to children or adolescents (risk of fatal Reye's syndrome). Use pediatric Paracetamol under guidance.",
        noteHi: "बच्चों को कभी एस्पिरिन (Aspirin) न दें (रेये सिंड्रोम का खतरा)। केवल डॉक्टर द्वारा बताई खुराक ही दें।"
      },
      adult: {
        urgentAdviceEn: "Consult a physician if fever lasts > 3 days, does not respond to antipyretics, or is accompanied by severe rigors.",
        urgentAdviceHi: "यदि बुखार 3 दिन से अधिक रहे या कंपकंपी के साथ आए तो डॉक्टर से संपर्क करें।",
        allowOtc: true,
        noteEn: "Hydrate adequately. Monitor temperature every 4-6 hours.",
        noteHi: "खूब पानी पिएं और हर 4-6 घंटे में तापमान मापें।"
      },
      elderly: {
        urgentAdviceEn: "In the elderly, infection may manifest with confusion, hypothermia, or falls rather than high fever. Prompt medical review recommended.",
        urgentAdviceHi: "बुजुर्गों में तेज बुखार के बजाय भ्रम या कमजोरी जैसे लक्षण हो सकते हैं। तुरंत डॉक्टर से जांच कराएं।",
        allowOtc: true,
        noteEn: "Exercise caution regarding kidney function and polypharmacy interactions.",
        noteHi: "किडनी की स्थिति और पहले से चल रही अन्य दवाओं का ध्यान रखें।"
      }
    },
    selfCareAdviceEn: [
      "Drink plenty of fluids: Oral Rehydration Salts (ORS), coconut water, clear broths, and clean water.",
      "Rest in a well-ventilated room with light cotton clothing.",
      "Use lukewarm water sponge baths if temperature is uncomfortably high. Never use ice or cold alcohol rubs.",
      "Record temperature readings on a paper log twice daily."
    ],
    selfCareAdviceHi: [
      "पर्याप्त मात्रा में तरल पदार्थ पिएं: ओआरएस (ORS), नारियल पानी, सूप और स्वच्छ पानी।",
      "हवादार कमरे में आराम करें और हल्के सूती कपड़े पहनें।",
      "तेज बुखार में गुनगुने पानी की पट्टी माथे पर रखें। बर्फ के ठंडे पानी का प्रयोग न करें।",
      "दिन में दो बार थर्मामीटर से तापमान नापकर नोट करें।"
    ],
    safeOtcOptions: [
      {
        saltName: "Paracetamol",
        dosageForm: "Tablet / Syrup",
        cautions: "Do not exceed 4,000 mg in 24 hours. Check other cold remedies to prevent paracetamol duplication."
      }
    ],
    prescriptionOnlyAlerts: [
      "Antibiotics (e.g. Augmentin, Azithromycin, Ciplox) treat bacterial infections only and are completely ineffective for viral fevers. Never self-start antibiotics without laboratory tests and a doctor's prescription."
    ],
    recommendedTests: ["Complete Blood Count (CBC)", "Malarial Antigen / Rapid Diagnostic Test", "Dengue NS1 Antigen (if fever > 2 days in endemic season)", "Typhoid / Widal Test (if indicated by clinician)"]
  },
  {
    key: "acidity",
    nameEn: "Acidity, Heartburn & Acid Reflux",
    nameHi: "एसिडिटी, सीने में जलन और गैस",
    descriptionEn: "Burning sensation in the chest (heartburn), sour water reflux, or epigastric discomfort.",
    descriptionHi: "सीने में जलन, खट्टी डकारें या पेट के ऊपरी हिस्से में भारीपन।",
    redFlags: [
      { id: "acid-crushing-chest", textEn: "Crushing chest pain radiating to left arm, neck, or jaw, with sweating or nausea (MAY BE HEART ATTACK - CALL 112)", textHi: "सीने में असहनीय दबाव, दर्द जो बाएं हाथ या जबड़े तक फैले, पसीना आना (हार्ट अटैक का लक्षण - 112 डायल करें)", isCritical: true },
      { id: "acid-black-stools", textEn: "Black tarry stools (melena) or vomiting coffee-ground like material (active internal bleeding)", textHi: "काले रंग का मल आना या कॉफी के रंग की उल्टी होना (आंतरिक रक्तस्राव का संकेत)", isCritical: true },
      { id: "acid-dysphagia", textEn: "Difficulty swallowing food (dysphagia) or feeling food stuck in throat", textHi: "खाना निगलने में कठिनाई या भोजन गले में अटकने का अहसास", isCritical: false },
      { id: "acid-weight-loss", textEn: "Unexplained significant weight loss with persistent vomiting", textHi: "बिना कारण तेजी से वजन घटना और बार-बार उल्टी होना", isCritical: false }
    ],
    ageGuidance: {
      infant: {
        urgentAdviceEn: "Infantile reflux or projectile vomiting requires urgent pediatric evaluation to rule out pyloric stenosis.",
        urgentAdviceHi: "शिशुओं में दूध की उल्टी या तेजी से उल्टी होने पर तुरंत बाल रोग विशेषज्ञ को दिखाएं।",
        allowOtc: false,
        noteEn: "No antacid formulations should be administered to infants without pediatric prescription.",
        noteHi: "डॉक्टर के पर्चे के बिना शिशुओं को कोई एंटासिड न दें।"
      },
      child: {
        urgentAdviceEn: "Recurrent abdominal pain in children requires medical assessment to exclude allergies, celiac disease, or appendicitis.",
        urgentAdviceHi: "बच्चों में बार-बार पेट दर्द होने पर डॉक्टर से जांच कराएं।",
        allowOtc: false,
        noteEn: "Prioritize dietary adjustments: small frequent meals and avoiding spicy snacks.",
        noteHi: "खान-पान में सुधार करें: हल्का भोजन दें और मिर्च-मसाले से बचाएं।"
      },
      adult: {
        urgentAdviceEn: "If heartburn occurs > 2 times weekly for more than 4 weeks, consult a gastroenterologist for endoscopy evaluation.",
        urgentAdviceHi: "यदि सप्ताह में 2 बार से अधिक सीने में जलन हो, तो डॉक्टर से एंडोस्कोपी जांच के लिए मिलें।",
        allowOtc: true,
        noteEn: "Do not confuse severe cardiac chest pain with simple acid indigestion.",
        noteHi: "सीने के तेज दर्द को केवल गैस समझकर नजरअंदाज न करें।"
      },
      elderly: {
        urgentAdviceEn: "Carefully monitor for atypical cardiac presentations that mimic indigestion.",
        urgentAdviceHi: "बुजुर्गों में हार्ट अटैक के लक्षण कभी-कभी केवल गैस या सीने में जलन जैसे दिख सकते हैं।",
        allowOtc: true,
        noteEn: "Long-term PPI use may interact with cardiovascular medications like Clopidogrel.",
        noteHi: "लंबे समय तक गैस की दवाएं लेने से पहले डॉक्टर से समीक्षा कराएं।"
      }
    },
    selfCareAdviceEn: [
      "Eat smaller, more frequent meals rather than large heavy dinners.",
      "Avoid lying down for at least 2 to 3 hours after eating.",
      "Elevate the head of your bed by 6 inches if nighttime reflux occurs.",
      "Limit trigger foods: excessively spicy foods, deep-fried snacks, citrus fruits, carbonated beverages, caffeine, and tobacco."
    ],
    selfCareAdviceHi: [
      "एक साथ भारी भोजन करने के बजाय थोड़ा-थोड़ा करके खाएं।",
      "खाना खाने के तुरंत बाद न लेटें, कम से कम 2 घंटे बाद ही सोएं।",
      "रात में खट्टी डकार आने पर सिरहाने को 6 इंच ऊंचा रखें।",
      "मिर्च-मसाला, तला-भुना खाना, चाय-कॉफी और तंबाकू का सेवन कम करें।"
    ],
    safeOtcOptions: [
      {
        saltName: "Antacid Liquid (Magaldrate + Simethicone / Aluminium & Magnesium Hydroxide)",
        dosageForm: "Oral Suspension",
        cautions: "Temporary relief only. Take 1-2 hours after meals and at bedtime. Avoid excessive long-term use."
      }
    ],
    prescriptionOnlyAlerts: [
      "Proton Pump Inhibitors (Pantoprazole, Omeprazole, Rabeprazole) are Schedule H medicines that should be taken under medical direction, particularly for prolonged durations (> 8 weeks)."
    ],
    recommendedTests: ["Upper GI Endoscopy (if red flags present or age > 50)", "Helicobacter pylori stool antigen / urea breath test", "ECG (to exclude cardiac ischemia)"]
  },
  {
    key: "cough",
    nameEn: "Cough & Cold Symptoms",
    nameHi: "खांसी, जुकाम और गले में खराश",
    descriptionEn: "Dry irritating cough, productive chesty cough, nasal congestion, and sore throat.",
    descriptionHi: "सूखी खांसी, बलगम वाली खांसी, बंद नाक और गले में खराश।",
    redFlags: [
      { id: "cough-hemoptysis", textEn: "Coughing up blood or rust-colored sputum (hemoptysis)", textHi: "खांसी में खून या जंग के रंग का बलगम आना", isCritical: true },
      { id: "cough-dyspnea", textEn: "Severe shortness of breath, wheezing, or stridor (inability to complete sentences)", textHi: "सांस फूलना, सीने से सीटी की आवाज आना या बोलते समय सांस टूटना", isCritical: true },
      { id: "cough-duration-3w", textEn: "Cough persisting for more than 3 weeks (investigate for Tuberculosis / Asthma in India)", textHi: "3 सप्ताह से अधिक समय से लगातार खांसी (टीबी या अस्थमा की संभावना)", isCritical: false },
      { id: "cough-chest-pain", textEn: "Sharp localized chest pain exacerbated by breathing or coughing (pleuritic pain)", textHi: "सांस लेने या खांसने पर सीने में चुभन जैसा तेज दर्द", isCritical: false }
    ],
    ageGuidance: {
      infant: {
        urgentAdviceEn: "WHO & Indian Academy of Pediatrics (IAP) ALERT: Over-the-counter cough syrups are strictly prohibited in infants under 2 years. See doctor immediately for barky cough or stridor.",
        urgentAdviceHi: "विश्व स्वास्थ्य संगठन (WHO) और भारतीय बाल रोग अकादमी (IAP): 2 वर्ष से कम उम्र के बच्चों को खांसी का सिरप कभी न दें। तुरंत डॉक्टर को दिखाएं।",
        allowOtc: false,
        noteEn: "Risk of respiratory depression and toxicity. Warm fluids and saline nasal drops only under guidance.",
        noteHi: "सिरप से सांस रुकने का गंभीर खतरा हो सकता है। केवल डॉक्टर की सलाह पर ही नाक में सेलाइन ड्रॉप डालें।"
      },
      child: {
        urgentAdviceEn: "Do not give multi-ingredient adult cough cold mixtures. Consult a pediatrician.",
        urgentAdviceHi: "बच्चों को वयस्कों वाली खांसी की दवाएं न दें। बाल रोग विशेषज्ञ से मिलें।",
        allowOtc: false,
        noteEn: "Honey (only for children above 1 year of age) is an evidence-based demulcent for nighttime cough.",
        noteHi: "1 वर्ष से बड़े बच्चों को रात की खांसी के लिए एक चम्मच शहद दिया जा सकता है।"
      },
      adult: {
        urgentAdviceEn: "Distinguish between dry allergen/viral cough and bacterial productive cough. Consult doctor if fever accompanies cough.",
        urgentAdviceHi: "यदि खांसी के साथ तेज बुखार या पीला-हरा बलगम आए तो चिकित्सक से परामर्श लें।",
        allowOtc: true,
        noteEn: "Stay hydrated and use steam inhalation.",
        noteHi: "भाप लें और गुनगुना पानी पिएं।"
      },
      elderly: {
        urgentAdviceEn: "Elderly patients with chronic cough require chest X-ray to rule out cardiac failure or chronic pulmonary disease.",
        urgentAdviceHi: "बुजुर्गों में पुरानी खांसी होने पर छाती का एक्स-रे कराना जरूरी है।",
        allowOtc: true,
        noteEn: "Antihistamine-containing cough syrups can cause urinary retention or drowsiness in elderly men with BPH.",
        noteHi: "प्रोस्टेट की समस्या वाले बुजुर्गों में कुछ सिरप से पेशाब रुकने का खतरा हो सकता है।"
      }
    },
    selfCareAdviceEn: [
      "Inhale warm steam for 10-15 minutes twice daily to loosen secretions.",
      "Gargle with warm salt water (1/2 tsp salt in 1 glass warm water) 3 times daily for sore throat.",
      "Stay well hydrated with warm water, herbal teas, or ginger-tulsi decoctions.",
      "Avoid cold refrigerated drinks and exposure to smoke or construction dust."
    ],
    selfCareAdviceHi: [
      "दिन में दो बार 10-15 मिनट के लिए गर्म पानी की भाप लें।",
      "गले में खराश के लिए गुनगुने नमक के पानी से दिन में 3 बार गरारे करें।",
      "गुनगुना पानी, अदरक-तुलसी का काढ़ा और तरल पदार्थ पिएं।",
      "फ्रिज का ठंडा पानी, धूल-धुआं और प्रदूषण से बचें।"
    ],
    safeOtcOptions: [
      {
        saltName: "Normal Saline (0.9% NaCl) Nasal Spray / Drops",
        dosageForm: "Nasal Drops",
        cautions: "Safe for clearing congested nasal passages across age groups."
      }
    ],
    prescriptionOnlyAlerts: [
      "Codeine-containing cough syrups and dextromethorphan combinations carry abuse potential and sedation risks; they require valid medical prescription and must never be taken casually."
    ],
    recommendedTests: ["Chest X-Ray PA View (if cough > 2-3 weeks)", "Sputum Smear for AFB / CBNAAT (Tuberculosis screening)", "Complete Blood Count (CBC)"]
  },
  {
    key: "diarrhoea",
    nameEn: "Diarrhoea & Loose Stools",
    nameHi: "दस्त और पेट का संक्रमण (Diarrhoea)",
    descriptionEn: "Passage of 3 or more loose or watery stools per day.",
    descriptionHi: "दिन में 3 या उससे अधिक बार पतला दस्त होना।",
    redFlags: [
      { id: "diarrhea-blood", textEn: "Visible blood or mucus in stools (dysentery)", textHi: "मल में खून या आंव (म्यूकस) आना (पेचिश)", isCritical: true },
      { id: "diarrhea-severe-dehydration", textEn: "Severe dehydration: sunken eyes, dry tongue, skin turgor loss, absence of urination for > 8 hours", textHi: "अत्यधिक निर्जलीकरण (डिहाइड्रेशन): धंसी हुई आंखें, सूखा मुंह, 8 घंटे से पेशाब न होना", isCritical: true },
      { id: "diarrhea-high-fever", textEn: "High fever (> 102°F) accompanied by severe abdominal cramping or guarding", textHi: "तेज बुखार और पेट में असहनीय मरोड़", isCritical: true }
    ],
    ageGuidance: {
      infant: {
        urgentAdviceEn: "CRITICAL: Dehydration in infants is a medical emergency. Continue breastfeeding and administer WHO-ORS immediately while en route to a doctor.",
        urgentAdviceHi: "अत्यंत गंभीर: शिशुओं में दस्त से पानी की कमी जानलेवा हो सकती है। मां का दूध जारी रखें और ओआरएस देते हुए तुरंत अस्पताल ले जाएं।",
        allowOtc: false,
        noteEn: "Never give antimotility agents (e.g. Loperamide) to infants or children. Risk of toxic megacolon and death.",
        noteHi: "बच्चों को दस्त रोकने वाली दवा (लोपेरामाइड) कभी न दें।"
      },
      child: {
        urgentAdviceEn: "Prioritize WHO-ORS and Zinc supplementation for 14 days under pediatric advice. No antibiotics unless stool microscopy indicates.",
        urgentAdviceHi: "डब्ल्यूएचओ ओआरएस का घोल और डॉक्टर की सलाह से 14 दिन तक जिंक दें। बिना जांच एंटीबायोटिक न दें।",
        allowOtc: true,
        noteEn: "Offer fluids after every loose motion.",
        noteHi: "हर बार दस्त होने के बाद ओआरएस का घोल पिलाएं।"
      },
      adult: {
        urgentAdviceEn: "Maintain hydration. Avoid antimotility drugs if blood is present in stool.",
        urgentAdviceHi: "पर्याप्त ओआरएस पिएं। यदि मल में खून हो तो दस्त रोकने वाली गोलियां न लें।",
        allowOtc: true,
        noteEn: "Oral Rehydration Salts (ORS) is the cornerstone of therapy.",
        noteHi: "ओआरएस का घोल सबसे सुरक्षित और असरदार उपचार है।"
      },
      elderly: {
        urgentAdviceEn: "Elderly patients on diuretics or ACE inhibitors / ARBs face acute kidney injury risk during dehydration. Early medical consultation needed.",
        urgentAdviceHi: "बीपी की दवाएं लेने वाले बुजुर्गों में दस्त से किडनी पर असर पड़ सकता है। जल्दी डॉक्टर से सलाह लें।",
        allowOtc: true,
        noteEn: "Closely monitor fluid balance and blood pressure.",
        noteHi: "रक्तचाप और पेशाब की मात्रा पर नजर रखें।"
      }
    },
    selfCareAdviceEn: [
      "Prepare WHO-formula Oral Rehydration Salts (ORS) in 1 litre of clean boiled and cooled water. Sip steadily.",
      "Consume light, bland foods: khichdi, curd/buttermilk (contains natural probiotics), boiled potatoes, banana, and rice water.",
      "Avoid milk, caffeine, alcohol, raw salads, and overly sugary fruit juices."
    ],
    selfCareAdviceHi: [
      "1 लीटर उबले और ठंडे पानी में डब्ल्यूएचओ प्रमाणित ओआरएस (ORS) का पैकेट घोलें और घूंट-घूंट कर पिएं।",
      "हल्का और सुपाच्य भोजन लें: मूंग दाल की खिचड़ी, दही/छाछ (प्रोबायोटिक), केला और चावल का पानी।",
      "दूध, चाय, कॉफी, कच्चा सलाद और बाजार के जूस से परहेज करें।"
    ],
    safeOtcOptions: [
      {
        saltName: "WHO-Standard Oral Rehydration Salts (ORS)",
        dosageForm: "Powder Sachet",
        cautions: "Dissolve entire packet in the exact volume of water specified (usually 1 Litre). Do not dilute with milk or juice."
      }
    ],
    prescriptionOnlyAlerts: [
      "Fluoroquinolone / Nitroimidazole combinations (e.g. Norfloxacin + Tinidazole or Ofloxacin + Ornidazole) are Schedule H1 prescription antibiotics and should never be self-administered indiscriminately."
    ],
    recommendedTests: ["Stool Routine & Microscopy (Ova and Cysts)", "Stool Occult Blood", "Serum Electrolytes & Renal Function (in severe dehydration)"]
  }
];
