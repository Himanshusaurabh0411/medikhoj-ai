import { SymptomTriageQuery, SymptomTriageResult } from "@/types/medicine";
import { SYMPTOM_DATABASE } from "@/data/symptomDatabase";

export function evaluateSymptomQuery(query: SymptomTriageQuery): SymptomTriageResult {
  const symptom = SYMPTOM_DATABASE.find(s => s.key === query.symptomKey);

  if (!symptom) {
    return {
      severity: "consult_doctor",
      headlineEn: "Consult a Registered Medical Practitioner",
      headlineHi: "पंजीकृत चिकित्सक से परामर्श लें",
      primaryActionEn: "The selected health concern requires direct professional evaluation by a qualified physician.",
      primaryActionHi: "इस स्वास्थ्य समस्या के लिए योग्य चिकित्सक द्वारा सीधे परीक्षण की आवश्यकता है।",
      redFlagsTriggered: [],
      contraindicationsNotes: [],
      generalAdvice: [
        {
          en: "Do not self-medicate with unverified pharmaceuticals or unprescribed antibiotics.",
          hi: "बिना डॉक्टर की सलाह के दवाएं या एंटीबायोटिक्स न लें।"
        }
      ],
      safeOtcOptions: [],
      prescriptionOnlyMentioned: ["All Schedule H, H1, and X medicines"],
      disclaimerEn: "This system provides general educational information and cannot replace individualized medical care.",
      disclaimerHi: "यह प्रणाली केवल सामान्य शैक्षिक जानकारी प्रदान करती है और चिकित्सीय सलाह का विकल्प नहीं है।"
    };
  }

  // 1. Check for Red Flags (Urgent Emergencies)
  const triggeredRedFlags = query.hasRedFlags || [];
  const hasCriticalRedFlag = triggeredRedFlags.some(flagId => {
    const flagObj = symptom.redFlags.find(rf => rf.id === flagId);
    return flagObj ? flagObj.isCritical : false;
  });

  if (triggeredRedFlags.length > 0) {
    return {
      severity: "emergency",
      headlineEn: "URGENT MEDICAL ATTENTION REQUIRED (CALL 112)",
      headlineHi: "तत्काल आपातकालीन चिकित्सा सहायता आवश्यक है (112 पर कॉल करें)",
      primaryActionEn: "One or more critical clinical red flags have been identified. Seek emergency medical care immediately at the nearest hospital emergency department or call India's Emergency Number 112.",
      primaryActionHi: "एक या अधिक गंभीर चेतावनी लक्षण पहचाने गए हैं। निकटतम अस्पताल के आपातकालीन विभाग में तुरंत जाएं या भारत के आपातकालीन नंबर 112 पर संपर्क करें।",
      redFlagsTriggered: triggeredRedFlags.map(id => {
        const rf = symptom.redFlags.find(r => r.id === id);
        return rf ? `${rf.textEn} / ${rf.textHi}` : id;
      }),
      contraindicationsNotes: [
        "Do not delay seeking emergency care for home remedies or unverified pills.",
        "Keep the patient calm, seated or in recovery position, and ensure open airway."
      ],
      recommendedTesting: symptom.recommendedTests,
      generalAdvice: [
        {
          en: "Call 112 or your nearest ambulance service immediately.",
          hi: "तुरंत 112 डायल करें या एम्बुलेंस बुलाएं।"
        }
      ],
      safeOtcOptions: [],
      prescriptionOnlyMentioned: [],
      disclaimerEn: "Emergency guidance is strictly advisory. Prioritize immediate professional medical transport.",
      disclaimerHi: "आपातकालीन मार्गदर्शन केवल सूचनात्मक है। तुरंत पेशेवर चिकित्सा सहायता लें।"
    };
  }

  // 2. Pediatric Age Restrictions (Infant or Child)
  if (query.ageBand === "infant") {
    const ageRules = symptom.ageGuidance.infant;
    return {
      severity: "consult_doctor",
      headlineEn: "Pediatric Consultation Required (Doctor-First for Infants)",
      headlineHi: "बाल रोग विशेषज्ञ से परामर्श आवश्यक (शिशुओं के लिए डॉक्टर प्रथम)",
      primaryActionEn: ageRules.urgentAdviceEn,
      primaryActionHi: ageRules.urgentAdviceHi,
      redFlagsTriggered: [],
      contraindicationsNotes: [
        ageRules.noteEn,
        "Over-the-counter self-medication is strictly unsafe for infants (< 1 year).",
        "Dosage errors in infants can lead to severe organ toxicity."
      ],
      recommendedTesting: symptom.recommendedTests,
      generalAdvice: [
        {
          en: "Keep the infant hydrated (breastfeed frequently or offer clean fluids under medical advice).",
          hi: "शिशु को निर्जलीकरण से बचाएं (मां का दूध पिलाते रहें)।"
        },
        {
          en: "Monitor alertness, wet diaper count, and breathing pattern constantly.",
          hi: "बच्चे की सुस्ती, पेशाब की संख्या और सांस लेने की गति पर लगातार नजर रखें।"
        }
      ],
      safeOtcOptions: [], // NO OTC for infants
      prescriptionOnlyMentioned: ["All medications for infants require an exact weight-based prescription from a pediatrician."],
      disclaimerEn: "Self-medication in infants is hazardous. A pediatrician must evaluate the child.",
      disclaimerHi: "शिशुओं को बिना डॉक्टर के दवा देना अत्यंत जोखिम भरा है। तुरंत बाल रोग विशेषज्ञ को दिखाएं।"
    };
  }

  // 3. Child guidance
  if (query.ageBand === "child") {
    const ageRules = symptom.ageGuidance.child;
    return {
      severity: query.durationDays > 2 ? "consult_doctor" : "self_care_otc",
      headlineEn: query.durationDays > 2 ? "Consult Pediatrician (Persistent Symptoms)" : "Pediatric Supportive Care & Monitoring",
      headlineHi: query.durationDays > 2 ? "बाल रोग विशेषज्ञ से परामर्श लें (लंबे समय से लक्षण)" : "बाल देखभाल एवं निगरानी",
      primaryActionEn: ageRules.urgentAdviceEn,
      primaryActionHi: ageRules.urgentAdviceHi,
      redFlagsTriggered: [],
      contraindicationsNotes: [
        ageRules.noteEn,
        "Never administer adult cough-cold mixtures or unapproved formulations to children."
      ],
      recommendedTesting: query.durationDays > 3 ? symptom.recommendedTests : undefined,
      generalAdvice: symptom.selfCareAdviceEn.map((en, idx) => ({
        en,
        hi: symptom.selfCareAdviceHi[idx] || en
      })),
      safeOtcOptions: symptom.safeOtcOptions,
      prescriptionOnlyMentioned: symptom.prescriptionOnlyAlerts,
      disclaimerEn: "Children require weight-adjusted dosing. Verify with a qualified doctor or pharmacist.",
      disclaimerHi: "बच्चों की दवा की खुराक उनके वजन के आधार पर तय होती है। डॉक्टर से जांच कराएं।"
    };
  }

  // 4. Adult & Elderly Flow
  const ageRules = query.ageBand === "elderly" ? symptom.ageGuidance.elderly : symptom.ageGuidance.adult;
  const isProlonged = query.durationDays > 3;

  return {
    severity: isProlonged ? "consult_doctor" : "self_care_otc",
    headlineEn: isProlonged
      ? `Medical Evaluation Recommended (Symptoms > ${query.durationDays} Days)`
      : "General Self-Care & Evidence-Based OTC Information",
    headlineHi: isProlonged
      ? `डॉक्टर से परामर्श आवश्यक (${query.durationDays} दिनों से लक्षण जारी)`
      : "सामान्य देखभाल एवं प्राथमिक सूचना",
    primaryActionEn: isProlonged
      ? "Because symptoms have lasted more than 3 days without resolution, a clinical consultation and laboratory diagnostics are advised."
      : ageRules.urgentAdviceEn,
    primaryActionHi: isProlonged
      ? "चूंकि लक्षण 3 दिन से अधिक समय से हैं, इसलिए क्लीनिकल जांच और आवश्यक लैब टेस्ट कराने की सलाह दी जाती है।"
      : ageRules.urgentAdviceHi,
    redFlagsTriggered: [],
    contraindicationsNotes: [
      ageRules.noteEn,
      query.isPregnantOrLactating ? "PREGNANCY / LACTATION ALERT: Many medications cross the placenta or enter breastmilk. Always check with your obstetrician." : "",
    ].filter(Boolean),
    recommendedTesting: isProlonged ? symptom.recommendedTests : undefined,
    generalAdvice: symptom.selfCareAdviceEn.map((en, idx) => ({
      en,
      hi: symptom.selfCareAdviceHi[idx] || en
    })),
    safeOtcOptions: symptom.safeOtcOptions,
    prescriptionOnlyMentioned: symptom.prescriptionOnlyAlerts,
    disclaimerEn: "Non-diagnostic educational tool. Does not constitute a clinical prescription.",
    disclaimerHi: "यह केवल सूचनात्मक टूल है। यह कोई मेडिकल पर्चा नहीं है।"
  };
}
