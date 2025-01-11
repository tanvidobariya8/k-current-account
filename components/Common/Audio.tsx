import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { Audio } from "expo-av";

export default function AudioConsent() {
  const [currentLanguage, setCurrentLanguage] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioPlayer, setAudioPlayer] = useState(null);

  const audioObject = {
    consentLanguages: [
      {
        consentMessage:
          "I hereby voluntarily provide my consent to Kotak Mahindra Bank to obtain my Aadhaar number, Biometric and/or One Time PIN (OTP) data for authenticating my demographic details (including photograph/eKYC) from UIDAI.\nI consent to the use of Aadhaar-based authentication for the purpose of processing my request with Kotak Mahindra Bank. I agree and understand that the demographic data or eKYC information received from UIDAI will be used to process my request with Kotak Mahindra Bank.\nI voluntarily consent to update and link my Aadhaar to all my existing or new bank account/s and customer profile/s for the purpose of operating my account/s and availing banking services.\n",
        languageName: "English",
        languageDisplayName: "English",
        consentAudio: "https://images.kotak.com/bank/audio/English.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "Change Language",
        audioControlPlayLabel: "Listen Audio",
        audioControlPauseLabel: "Pause Audio",
      },
      {
        consentMessage:
          "मैं इसके द्वारा अपने जनसांख्यिकीय विवरण (फोटो/ई-केवाईसी सहित) प्रमाणित करने के लिए यूआईडीएआई से अपना आधार नंबर, बायोमेट्रिक और/या वन-टाइम पिन (ओटीपी) डेटा प्राप्त करने के लिए कोटक महिंद्रा बैंक को स्वैच्छिक रूप से अपनी सहमति प्रदान करता/करती हूँ।\nमैं कोटक महिंद्रा बैंक में अपने अनुरोध को संसाधित करने के उद्देश्य से आधार-आधारित प्रमाणीकरण के उपयोग के लिए सहमति देता/देती हूँ। मैं सहमत हूँ और समझता/समझती हूँ कि यूआईडीएआई से प्राप्त जनसांख्यिकीय (डेमोग्राफिक) डेटा या ईकेवाईसी जानकारी का उपयोग कोटक महिंद्रा बैंक में मेरे अनुरोध को संसाधित करने के लिए किया जाएगा।\nमैं अपने खाते/खातों के संचालन और बैंकिंग सेवाओं का लाभ उठाने के उद्देश्य से अपने आधार को अपने सभी मौजूदा या नए बैंक खाते/खातों और ग्राहक प्रोफाइल में अपडेट करने और उनसे लिंक करने के लिए स्वैच्छिक रूप से सहमति देता/देती हूँ।",
        languageName: "Hindi",
        languageDisplayName: "हिंदी",
        consentAudio: "https://images.kotak.com/bank/audio/Hindi.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "भाषा बदलें",
        audioControlPlayLabel: "ऑडियो सुनें",
        audioControlPauseLabel: "ऑडियो रोकें",
      },
      {
        consentMessage:
          "UIDAI నుంచి నా జనగణన వివరాలను (ఫోటోగ్రాఫ్/ eKYCతో సహా) ధృవీకరించడానికి నా ఆధార్ నెంబరు, బయోమెట్రిక్ మరియు/లేదా ఒక్కసారి పిన్ (OTP) డేటా పొందడానికి నేను ఇందుమూలంగా కొటక్ మహీంద్రా బ్యాంకుకు నా సమ్మతిని అందిస్తున్నాను.\nకొటక్ మహీంద్రా బ్యాంక్‌తో నా అభ్యర్థనను ప్రాసెస్ చేయడానికి ఆధార్ ఆధారిత ప్రామాణీకరణను ఉపయోగించడానికి నేను సమ్మతిస్తున్నాను. కొటక్ మహీంద్రా బ్యాంక్‌కు నేను చేసిన  అభ్యర్థన ప్రాసెస్ చేయడానికి UIDAI నుంచి అందుకున్న జనగణన సమాచారం లేదా eKYC సమాచారాన్ని ఉపయోగిస్తారని నేను అంగీకరిస్తున్నాను మరియు అర్థం చేసుకున్నాను.\nనా ఖాతా/లు ఆపరేట్ చేయడం మరియు బ్యాంకింగ్ సేవలను పొందడానికి నా ఆధార్‌ని నా ప్రస్తుత లేదా కొత్త బ్యాంకు ఖాతా/లు మరియు ఖాతాదారుల ప్రొఫైల్/లకు అప్‌డేట్ చేయడానికి మరియు లింక్ చేయడానికి నేను స్వచ్ఛందంగా సమ్మతిస్తున్నాను.",
        languageName: "Telugu",
        languageDisplayName: "తెలుగు",
        consentAudio: "https://images.kotak.com/bank/audio/Telugu.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "భాష మార్చు",
        audioControlPlayLabel: "ఆడియో వినండి",
        audioControlPauseLabel: "ఆడియోను పాజ్ చేయండి",
      },
      {
        consentMessage:
          "মই ইয়াৰ দ্বাৰা স্বেচ্ছাত UIDAI –ৰ পৰা মোৰ জনসংখ্যা সংক্রান্ত বিশদ (ফটো/ই-কেৱাইচি সহ) প্রমাণীকৰণৰ বাবে মোৰ আধাৰ নম্বৰ, বায়োমেট্রিক আৰু/অথবা ওৱান টাইম পিন (OTP) ডেটা পাবলৈ কোটাক মাহিন্দ্রা  বেংকক মোৰ সন্মতি প্রদান কৰিছো।\nকোটাক মাহিন্দ্রা বেংকৰ সৈতে মোৰ অনুৰোধ প্রক্রিয়াকৰণৰ উদ্দেশ্যে মই আধাৰ-ভিত্তিক প্রমাণীকৰণ ব্যৱহাৰত মোৰ সন্মতি দিছো।  মই সন্মত হৈছো আৰু বুজি পাইছো যে UIDAI –ৰ পৰা প্রাপ্ত ডেমোগ্রাফিক ডেটা বা ইকেৱাইচি তথ্য কোটাক মাহিন্দ্রা বেংকৰ সৈতে মোৰ অনুৰোধ প্রক্রিয়া কৰাৰ বাবে ব্যৱহাৰ কৰা হ'ব।\nমোৰ একাউন্ট/বিলাক পৰিচালনা আৰু বেংকিং পৰিসেৱাবিলাক নিয়াৰ উদ্দেশ্যে মই স্বেচ্ছাত মোৰ সকলো বিদ্যমান বা নতুন বেংক একাউন্ট/বিলাক আৰু গ্রাহক প্র'ফাইল/বিলাকৰ সৈতে মোৰ আধাৰ আপডেট আৰু লিঙ্ক কৰিবলৈ সন্মতি দিছো।",
        languageName: "Assamese",
        languageDisplayName: "অসমীয়া",
        consentAudio: "https://images.kotak.com/bank/audio/Assamese.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ভাষা সলনি কৰক",
        audioControlPlayLabel: "অডিঅ' শুনক",
        audioControlPauseLabel: "অডিঅ' বিৰাম দিয়ক",
      },
      {
        consentMessage:
          "আমি এতদ্দ্বারা স্বেচ্ছা সহকারে কোটাক মাহিন্দ্রা ব্যাংককে আমার জনতাত্ত্বিক বিশদ প্রমাণীকরণ করার লক্ষ্যে (ছবি/eKYC সহ) UIDAI থেকে আমার আধার নম্বর, বায়োমেট্রিক এবং/অথবা ওয়ান টাইম পিন (OTP) উপাত্ত প্রাপ্ত করার সম্মতি প্রদান করছি।\nকোটাক মাহিন্দ্রা ব্যাংককে আমার দেওয়া অনুরোধ প্রক্রিয়াকরণ করার লক্ষ্যে আধার ভিত্তিক প্রমাণীকরণের জন্য আমি সম্মতি প্রদান করছি।আমি রাজি হচ্ছি এবং আমি বুঝি যে কোটাক মাহিন্দ্রা ব্যাংককে দেওয়া আমার অনুরোধটি প্রক্রিয়াকরণ করার লক্ষ্যে eKYC-র জন্য UIDAI থেকে প্রাপ্ত আমার জনতাত্ত্বিক তথ্য ব্যবহার করা হবে।\nআমার অ্যাকাউন্ট/সমূহ ক্রিয়াগত করা এবং ব্যাংকের পরিষেবা উপলভ্য করার লক্ষ্যে\nআমার অধুনা বিদ্যমান অথবা নতুন ব্যাংক অ্যাকাউন্ট এবং কাস্টোমার প্রোফাইলের/গুলির সঙ্গে আমার আধার অদ্যতনকরণ এবং যুক্ত করার জন্য আমি স্বেচ্ছা সহকারে সম্মতি প্রদান করছি।",
        languageName: "Bengali",
        languageDisplayName: "বাংলা",
        consentAudio: "https://images.kotak.com/bank/audio/Bengali.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ভাষা পরিবর্তন করুন",
        audioControlPlayLabel: "অডিও শুনুন",
        audioControlPauseLabel: "অডিও পজ করুন",
      },
      {
        consentMessage:
          "આથી હું યુઆઇડીએઆઈ પાસેથી મારી વસતીવિષયક વિગતો (ફોટોગ્રાફ/ઈ-કેવાયસી સહિત)નું પ્રમાણીકરણ કરવા માટે મારા આધાર નંબર, બાયોમેટ્રિક અને/અથવા વન ટાઇમ પિન (ઓટીપી)ના ડેટા મેળવવા માટે કોટક મહિન્દ્રા બેંકને સ્વૈચ્છિક રીતે મારી સંમતિ આપું છું.\nહું કોટક મહિન્દ્રા બેંકને મારા દ્વારા કરવામાં આવેલી વિનંતી પર પ્રક્રિયા હાથ ધરવાના હેતુથી આધાર-આધારિત પ્રમાણીકરણના ઉપયોગની મંજૂરી આપું છું. હું સંમત થાઉં છું અને એ સમજું છું કે, યુઆઇડીએઆઈ પાસેથી પ્રાપ્ત થયેલા વસતીવિષયક ડેટા અથવા ઈ-કેવાયસીની માહિતીનો ઉપયોગ કોટક મહિન્દ્રા બેંકને મારા દ્વારા કરવામાં આવેલી વિનંતી પર પ્રક્રિયા હાથ ધરવા માટે કરવામાં આવશે.\nઆથી હું, મારા ખાતા/ઓનું સંચાલન કરવા અને બેંકિંગ સેવા મેળવવાના હેતુસર મારા આધારને મારા તમામ વર્તમાન અથવા નવા બેંક ખાતું/ખાતા અને ગ્રાહક પ્રોફાઇલ/લો સાથે જોડવાની અને અપડેટ કરવાની સ્વૈચ્છિક સંમતિ આપું છું.",
        languageName: "Gujarati",
        languageDisplayName: "ગુજરાતી",
        consentAudio: "https://images.kotak.com/bank/audio/Gujarati.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ભાષા બદલો",
        audioControlPlayLabel: "ઓડિયો સાંભળો",
        audioControlPauseLabel: "ઑડિયો થોભાવો",
      },
      {
        consentMessage:
          "UIDAI ನಿಂದ ನನ್ನ ಜನಸಂಖ್ಯಾ ವಿವರಗಳನ್ನು (ಛಾಯಾಚಿತ್ರ/eKYC ಸೇರಿದಂತೆ) ದೃಢೀಕರಿಸಲು ನನ್ನ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಬಯೋಮೆಟ್ರಿಕ್ ಮತ್ತು/ಅಥವಾ ಒಂದು ಬಾರಿಯ ಪಿನ್ (OTP) ಡೇಟಾವನ್ನು ಪಡೆಯಲು ನಾನು ಕೋಟಕ್ ಮಹೀಂದ್ರಾ ಬ್ಯಾಂಕ್‌ಗೆ ಸ್ವಯಂಪ್ರೇರಣೆಯಿಂದ ನನ್ನ ಒಪ್ಪಿಗೆಯನ್ನು ನೀಡುತ್ತೇನೆ.\nಕೋಟಕ್ ಮಹೀಂದ್ರಾ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ನನ್ನ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸುವ ಉದ್ದೇಶಕ್ಕಾಗಿ ಆಧಾರ್ ಆಧಾರಿತ ದೃಢೀಕರಣದ ಬಳಕೆಗೆ ನಾನು ಸಮ್ಮತಿಸುತ್ತೇನೆ. ಕೋಟಕ್ ಮಹೀಂದ್ರಾ ಬ್ಯಾಂಕ್‌ನೊಂದಿಗೆ ನನ್ನ ವಿನಂತಿಯನ್ನು ಪ್ರಕ್ರಿಯೆಗೊಳಿಸಲು UIDAI ನಿಂದ ಪಡೆದ ಜನಸಂಖ್ಯಾ ಡೇಟಾ ಅಥವಾ eKYC ಮಾಹಿತಿಯನ್ನು ಬಳಸಲಾಗುತ್ತದೆ ಎಂದು ನಾನು ಒಪ್ಪುತ್ತೇನೆ ಮತ್ತು ಅರ್ಥಮಾಡಿಕೊಂಡಿದ್ದೇನೆ.\nನನ್ನ ಖಾತೆ/ಗಳನ್ನು ನಿರ್ವಹಿಸುವ ಮತ್ತು ಬ್ಯಾಂಕಿಂಗ್ ಸೇವೆಗಳನ್ನು ಪಡೆಯುವ ಉದ್ದೇಶಕ್ಕಾಗಿ ನನ್ನ ಎಲ್ಲಾ ಅಸ್ತಿತ್ವದಲ್ಲಿರುವ ಅಥವಾ ಹೊಸ ಬ್ಯಾಂಕ್ ಖಾತೆ/ಗಳು ಮತ್ತು ಗ್ರಾಹಕರ ಪ್ರೊಫೈಲ್/ಗಳಿಗೆ ನನ್ನ ಆಧಾರ್ ಅನ್ನು ನವೀಕರಿಸಲು ಮತ್ತು ಲಿಂಕ್ ಮಾಡಲು ನಾನು ಸ್ವಯಂಪ್ರೇರಣೆಯಿಂದ ಸಮ್ಮತಿಸುತ್ತೇನೆ.",
        languageName: "Kannada",
        languageDisplayName: "ಕನ್ನಡ",
        consentAudio: "https://images.kotak.com/bank/audio/Kannada.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ಭಾಷೆ ಬದಲಾಯಿಸಿ",
        audioControlPlayLabel: "ಆಡಿಯೋ ಆಲಿಸಿ",
        audioControlPauseLabel: "ಆಡಿಯೊವನ್ನು ವಿರಾಮಗೊಳಿಸಿ",
      },
      {
        consentMessage:
          "എന്റെ ജനസംഖ്യാപരമായ വിശദാംശങ്ങൾ (ഫോട്ടോ/ഇകെവൈസി ഉൾപ്പെടെ) പ്രാമാണീകരിക്കുന്നതിന് യുഐഡിഎഐയിൽ നിന്ന്  എന്റെ ആധാർ നമ്പർ, ബയോമെട്രിക് കൂടാതെ/അല്ലെങ്കിൽ വൺ ടൈം പിൻ (ഒടിപി) ഡാറ്റ എന്നിവ ലഭ്യമാക്കുന്നതിന് ഞാൻ കോട്ടക് മഹീന്ദ്ര ബാങ്കിന് സ്വമേധയാ എന്റെ സമ്മതം നൽകുന്നു.\nകോട്ടക് മഹീന്ദ്ര ബാങ്കിൽ സമർപ്പിച്ചിരിക്കുന്നഎന്റെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നതിനായി ആധാർ അടിസ്ഥാനമാക്കിയുള്ള പ്രാമാണീകരണം ഉപയോഗിക്കുന്നതിന് ഞാൻ സമ്മതം നൽകുന്നു. യുഐഡിഎഐയിൽ നിന്ന് ലഭിച്ച ജനസംഖ്യാ വിവരങ്ങളോ ഇകെവൈസി വിവരങ്ങളോ കോട്ടക് മഹീന്ദ്ര ബാങ്കിനു മുന്നിലുള്ള എന്റെ അഭ്യർത്ഥന പ്രോസസ്സ് ചെയ്യുന്നതിന് ഉപയോഗിക്കുമെന്ന് ഞാൻ മനസ്സിലാക്കുകയും അതിന് സമ്മതിക്കുകയും  ചെയ്യുന്നു.\nഎന്റെ അക്കൗണ്ട്/കൾ പ്രവർത്തിപ്പിക്കുന്നതിനും ബാങ്കിംഗ് സേവനങ്ങൾ ലഭ്യമാക്കുന്നതിനുമായി എന്റെ നിലവിലുള്ളതോ പുതിയതോ ആയ എല്ലാ ബാങ്ക് അക്കൗണ്ടുകളിലേക്കും ഉപഭോക്തൃ പ്രൊഫൈലിലേക്കും എന്റെ ആധാർ അപ്ഡേറ്റ് ചെയ്യാനും ലിങ്ക് ചെയ്യാനും ഞാൻ സ്വമേധയാ സമ്മതിക്കുന്നു.\n",
        languageName: "Malayalam",
        languageDisplayName: "മലയാളം",
        consentAudio: "https://images.kotak.com/bank/audio/Malyalam.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ഭാഷ മാറ്റുക",
        audioControlPlayLabel: "ഓഡിയോ കേൾക്കുക",
        audioControlPauseLabel: "ഓഡിയോ താൽക്കാലികമായി നിർത്തുക",
      },
      {
        consentMessage:
          "मी याद्वारे, माझ्याविषयीचे डेमोग्राफिक तपशील (छायाचित्र आणि ईकेवायसीसह) अधिकृत करण्यासाठी यूआयडीएआय कडून माझा आधार क्रमांक, बायोमेट्रिक आणि/किंवा वन टाईम पिन (ओटीपी) डेटा प्राप्त करण्यासाठी कोटक महिंद्रा बँकेला स्वेच्छेने संमती देत आहे.\n\nमी कोटक महिंद्रा बँकेला केलेल्या माझ्या विनंतीवर प्रक्रिया करण्याच्या उद्देश्यासाठी आधार-आधारित प्रमाणीकरणाच्या वापरासाठी संमती देत आहे. मला हे मान्य आहे आणि समजते की, यूआयडीएआयकडून प्राप्त झालेला डेमोग्राफिक डेटा किंवा ईकेवायसीसंबंधीची माहिती यांचा उपयोग मी कोटक महिंद्रा बँकेला केलेल्या विनंतीवर प्रक्रिया करण्यासाठी करण्यात येईल. \n\nमाझ्या खात्याचे प्रचालन करण्यासाठी व बँकेच्या सेवा प्राप्त करण्यासाठी मी माझा आधार क्रमांक माझ्या सर्व सध्याच्या किंवा नवीन बँक खात्यांशी आणि कस्टमर प्रोफाईल / प्रोफाईल्सशी अपडेट करण्यासाठी व लिंक करण्यासाठी स्वेच्छेने संमती देत आहे.",
        languageName: "Marathi",
        languageDisplayName: "मराठी",
        consentAudio: "https://images.kotak.com/bank/audio/Marathi.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "भाषा बदला",
        audioControlPlayLabel: "ऑडिओ ऐका",
        audioControlPauseLabel: "ऑडिओला विराम द्या",
      },
      {
        consentMessage:
          "ମୁଁ ଏତଦ୍ବାରା ୟୁଆଇଡିଏଆଇ ଠାରୁ ମୋର ଡେମୋଗ୍ରାଫିକ୍ ବିବରଣୀ (ଫଟୋଗ୍ରାଫ୍/ ଇ-କେୱାଇସି ସହିତ) ସିକୃତିକରଣ ପାଇଁ ସ୍ବେଚ୍ଛାକୃତ ଭାବରେ ମୋର ଆଧାର ନମ୍ବର, ବାୟୋ ମେଟ୍ରିକ୍ ଏବଂ /କିମ୍ବା ୱାନ୍ ଟାଇମ୍ ପିନ୍ (ଓଟିପି) ଡାଟା ପ୍ରାପ୍ତ କରିବା ପାଇଁ କୋଟାକ୍ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କକୁ ମୋର ସହମତି ପ୍ରଦାନ କରୁଛି।\nକୋଟକ୍ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ସହିତ ମୋର ଅନୁରୋଧକୁ ପ୍ରକ୍ରିୟାକରଣ ଉଦ୍ଦେଶ୍ୟରେ ଆଧାରଭିତ୍ତିକ ସ୍ବୀକୃତିକରଣର ବ୍ୟବହାର ପାଇଁ ମୁଁ ସହମତି ପ୍ରଦାନ କରୁଛି। ମୁଁ ଏହା ସହମତ ଏବଂ ବୁଝିଅଛି ଯେ ୟୁଆଇଡିଏଆଇ ଠାରୁ ପ୍ରାପ୍ତ କରିଥିବା ଡେମୋଗ୍ରାଫିକ ଡାଟା କିମ୍ବା ଇ-କେୱାଇସି ସୂଚନା କୋଟକ୍ ମହିନ୍ଦ୍ରା ବ୍ୟାଙ୍କ ସହିତ ମୋର ଅନୁରୋଧ ପ୍ରକ୍ରିୟାକରଣ ପାଇଁ ବ୍ୟବହାର କରାଯିବ।\nମୋର ଆକାଉଣ୍ଟ ପରିଚାଳନା ଏବଂ ବ୍ୟାଙ୍କ ସେବା ଉପଲବ୍ଧ ଉଦ୍ଦେଶ୍ୟ ପାଇଁ ମୋର ବିଦ୍ୟମାନ କିମ୍ବା ନୂଆ ବ୍ୟାଙ୍କ ଆକାଉଣ୍ଟ/ସମୂହ ଏବଂ ଗ୍ରାହକ ପ୍ରୋଫାଇଲ୍/ ସମୂହ ନିମନ୍ତେ ମୋର ଆଧାରକୁ ଅପଡେଟ୍ କରାଯିବ ଓ ଲିଙ୍କ କରିବାକୁ ମୁଁ ସ୍ବେଚ୍ଛାକୃତ ସହମତି ଦେଉଛି।",
        languageName: "Oriya",
        languageDisplayName: "ଓଡିଆ",
        consentAudio: "https://images.kotak.com/bank/audio/Oriya.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ଭାଷା ପରିବର୍ତ୍ତନ କରନ୍ତୁ",
        audioControlPlayLabel: "ଅଡିଓ ଶୁଣ",
        audioControlPauseLabel: "ଅଡିଓକୁ ବିରତି ଦିଅ",
      },
      {
        consentMessage:
          "ਮੈਂ ਇਸ ਦੁਆਰਾ ਆਪਣੀ ਮਰਜ਼ੀ ਨਾਲ ਕੋਟਕ ਮਹਿੰਦਰਾ ਬੈਂਕ ਨੂੰ ਯੂਆਈਡੀਏਆਈ ਤੋਂ ਆਪਣੇ ਜਨਸੰਖਿਆ ਵੇਰਵਿਆਂ (ਫੋਟੋ/ਈਕੇਵਾਈਸੀ ਸਮੇਤ) ਨੂੰ ਪ੍ਰਮਾਣਿਤ ਕਰਨ ਲਈ ਆਪਣਾ ਆਧਾਰ ਨੰਬਰ, ਬਾਇਓਮੈਟ੍ਰਿਕ ਅਤੇ/ਜਾਂ ਵਨ ਟਾਈਮ ਪਿੰਨ (OTP) ਡੈਟਾ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਆਪਣੀ ਸਹਿਮਤੀ ਪ੍ਰਦਾਨ ਕਰਦਾ/ ਕਰਦੀ ਹਾਂ।\nਮੈਂ ਕੋਟਕ ਮਹਿੰਦਰਾ ਬੈਂਕ ਕੋਲ ਆਪਣੀ ਬੇਨਤੀ 'ਤੇ ਕਾਰਵਾਈ ਕਰਨ ਦੇ ਉਦੇਸ਼ ਲਈ ਆਧਾਰ-ਆਧਾਰਿਤ ਪ੍ਰਮਾਣੀਕਰਨ ਦੀ ਵਰਤੋਂ ਕਰਨ ਲਈ ਸਹਿਮਤੀ ਦਿੰਦਾ ਹਾਂ। ਮੈਂ ਸਹਿਮਤ ਹਾਂ ਅਤੇ ਸਮਝਦਾ/ਸਮਝਦੀ ਹਾਂ ਕਿ ਯੂਆਈਡੀਏਆਈ ਤੋਂ ਪ੍ਰਾਪਤ ਜਨਸੰਖਿਆ ਡੈਟਾ ਜਾਂ ਈਕੇਵਾਈਸੀ ਜਾਣਕਾਰੀ ਦੀ ਵਰਤੋਂ ਕੋਟਕ ਮਹਿੰਦਰਾ ਬੈਂਕ ਨਾਲ ਮੇਰੀ ਬੇਨਤੀ 'ਤੇ ਕਾਰਵਾਈ ਕਰਨ ਲਈ ਕੀਤੀ ਜਾਵੇਗੀ।\nਮੈਂ ਆਪਣੇ ਖਾਤੇ/ਖਾਤਿਆਂ ਨੂੰ ਚਲਾਉਣ ਅਤੇ ਬੈਂਕਿੰਗ ਸੇਵਾਵਾਂ ਦਾ ਲਾਭ ਲੈਣ ਦੇ ਉਦੇਸ਼ ਲਈ ਆਪਣੇ ਸਾਰੇ ਮੌਜੂਦਾ ਜਾਂ ਨਵੇਂ ਬੈਂਕ ਖਾਤੇ/ਖਾਤਿਆਂ ਅਤੇ ਗਾਹਕ ਪ੍ਰੋਫਾਈਲ/ਪ੍ਰੋਫਾਈਲਾਂ ਨਾਲ ਆਪਣੇ ਆਧਾਰ ਨੂੰ ਅੱਪਡੇਟ ਕਰਨ ਅਤੇ ਲਿੰਕ ਕਰਨ ਲਈ ਸਵੈ-ਇੱਛਾ ਨਾਲ ਸਹਿਮਤੀ ਦਿੰਦਾ/ਦਿੰਦੀ ਹਾਂ।",
        languageName: "Punjabi",
        languageDisplayName: "ਪੰਜਾਬੀ",
        consentAudio: "https://images.kotak.com/bank/audio/Punjabi.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "ਭਾਸ਼ਾ ਬਦਲੋ",
        audioControlPlayLabel: "ਆਡੀਓ ਸੁਣੋ",
        audioControlPauseLabel: "ਆਡੀਓ ਰੋਕੋ",
      },
      {
        consentMessage:
          "என்னுடைய இருப்பிடத் தகவல்களை (புகைப்படம்/ eKYC உட்பட) சரிபார்க்கும் வகையில் என் ஆதார் எண், பயோமெட்ரிக் மற்றும்/அல்லது ஒரு முறை கடவுச்சொல்லை (OTP) UIDAI-இடமிருந்து பெற கோட்டக் மஹிந்திரா வங்கிக்கு நான் தன்னார்வத்தின் அடிப்படையில் ஒப்புதல் வழங்குகிறேன்.\nகோட்டக் மஹிந்திரா வங்கியிடம் நான் வைத்துள்ள கோரிக்கையினை செயலாக்கம் செய்வதற்கு ஆதார்-அடிப்படையிலான சரிபார்ப்பை மேற்கொள்ள ஒப்புதல் வழங்குகிறேன். UIDAI பெற்ற இருப்பிட தகவல்கள் அல்லது eKYC தகவல்கள் என் கோரிக்கை செயல்படுத்தப்படுவதற்கு கோட்டக் மஹிந்திரா வங்கி பயன்படுத்தும் என்பதை நான் புரிந்து கொண்டு அதனை ஏற்கிறேன்.\nதற்போது இருக்கும் அல்லது புதிய வங்கி கணக்கு(கள்) மற்றும் வாடிக்கையாளர் சுயவிவரங்களுடன் என் கணக்கை செயல்படுத்துவதற்கும் மற்றும் வங்கி சேவைகளை பெறுவதற்கும் ஆதார் எண்ணை இணைக்க தன்னார்வத்தின் அடிப்படையில் ஒப்புதல் வழங்குகிறேன்.",
        languageName: "Tamil",
        languageDisplayName: "தமிழ்",
        consentAudio: "https://images.kotak.com/bank/audio/Tamil.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "மொழியை மாற்றவும்",
        audioControlPlayLabel: "ஆடியோவைக் கேளுங்கள்",
        audioControlPauseLabel: "ஆடியோவை இடைநிறுத்து",
      },
      {
        consentMessage:
          "میں بذریعہ ہذا کوٹک مہیندرا بینک کو UIDAI سے اپنی آبادیاتی تفصیلات (بشمول تصویر/ eKYC) کی تصدیق کے لیے رضاکارانہ طور پر اپنا آدھار نمبر، بایومیٹریک اور/ یا یک-وقتی پن (OTP) ڈیٹا حاصل کرنے کی مںظوری دیتا/ دیتی \nمیں کوٹک مہیندرا بینک کے ساتھ اپنی درخواست پر کارروائی کے مقصد کے لیے آدھار-پر مبنی تصدیق کے استعمال کی منظوری دیتا ہوں۔میں اس بات سے متفق ہوں اور سمجھتا/ سمجھتی ہوں کہ UIDAI سے حاصل شدہ آبادیاتی ڈیٹا یا eKYC معلومات کا استعمال کوٹک مہیندرا بینک کے ساتھ میری درخواست پر کارروائی کے لیے کیا جائے گا۔\nمیں اپنے اکاؤنٹ/ اکاؤٹس کو چلانے اور بینک کاری کی خدمات حاصل کرنے کے لیے رضاکارانہ طور پر اپنے تمام موجودہ یا نئے بینک اکاؤنٹ/ اکاؤنٹس اور کسٹمر پروفائل/ پروفائلز کو اپ ڈیٹ کرنے اور اپنے آدھار سے لنک کرنے کی منظوری دیتا/ دیتی ہوں۔",
        languageName: "Urdu",
        languageDisplayName: "اردو",
        consentAudio: "https://images.kotak.com/bank/audio/Urdu.mp3",
        consentVersion: "1.0",
        changeLanguageLabel: "زبان تبدیل کریں",
        audioControlPlayLabel: "آڈیو سنیں۔",
        audioControlPauseLabel: "آڈیو روکیں۔",
      },
    ],
  };

  const changeLanguage = (index: any) => {};
  const pauseAudio = (index: any) => {};
  const playAudio = (index: any) => {};

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Consent Form</Text>
      <Text style={styles.message}>
        {audioObject.consentLanguages[currentLanguage].consentMessage}
      </Text>
      <View style={styles.buttonContainer}>
        {isPlaying ? (
          <Button title="Pause Audio" onPress={pauseAudio} />
        ) : (
          <Button title="Play Audio" onPress={playAudio} />
        )}
      </View>
      <Text style={styles.languageLabel}>Change Language:</Text>
      <FlatList
        horizontal
        data={audioObject.consentLanguages}
        keyExtractor={(item) => item.languageName}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            style={[
              styles.languageButton,
              index === currentLanguage && styles.selectedLanguageButton,
            ]}
            onPress={() => changeLanguage(index)}
          >
            <Text style={styles.languageText}>{item.languageDisplayName}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#fff",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  message: {
    fontSize: 16,
    marginBottom: 20,
  },
  buttonContainer: {
    marginBottom: 20,
  },
  languageLabel: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 10,
  },
  languageButton: {
    padding: 10,
    marginRight: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  selectedLanguageButton: {
    backgroundColor: "#ddd",
  },
  languageText: {
    fontSize: 16,
  },
});
