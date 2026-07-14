export type Language = 'fi' | 'en' | 'sv';

export const translations = {
  fi: {
    // Navigation
    nav: {
      home: 'Etusivu',
      services: 'Palvelut',
      pricing: 'Hinnasto',
      contact: 'Yhteystiedot',
      reviews: 'Asiakkaiden kokemuksia',
      faq: 'Usein kysyttyä',
      bookNow: 'Varaa aika',
      allServices: 'Kaikki palvelut',
    },
    // Hero
    hero: {
      eyebrow: 'ME MASSAGE',
      headline: 'Ammattitaitoista hierontaa Klaukkalassa ja Vaasassa',
      subheadline: 'Klassinen hieronta, kuumakivihieronta, purentalihashieronta ja faskiarautakäsittely. Koulutetut hierojat sinua varten.',
      bookNow: 'Varaa aika',
      exploreServices: 'Tutustu palveluihin',
      statRating: 'Google-arvostelu',
      statSince: 'Vuodesta lähtien',
      statLocations: 'Toimipistettä',
    },
    // Intro
    intro: 'Ammattitaitoista hierontaa ja kehonhuoltoa',
    // Services
    services: {
      eyebrow: 'PALVELUT',
      headline: 'Hierontaa ja kehonhuoltoa',
      body: 'Valitse tarpeisiisi sopiva hoito. Kaikki hoidot räätälöidään yksilöllisesti.',
      reassurance: 'Etkö ole varma, mikä palvelu sopii sinulle? Soita {phone} ja kysy.',
      primary: {
        classic: {
          title: 'Klassinen hieronta',
          description: 'Perinteinen hieronta lihaskireyksiin ja rentoutumiseen. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan.',
          link: 'Tutustu hierontaan',
        },
        hotStone: {
          title: 'Kuumakivihieronta',
          description: 'Lämpimien kivien avulla tehtävä hieronta, joka rentouttaa syvällä tasolla ja lievittää lihaskireyksiä.',
          link: 'Tutustu kuumakivihierontaan',
        },
      },
      secondaryLabel: 'Myös saatavilla',
      jaw: 'Purentalihashieronta',
      iastm: 'Faskiarautakäsittely',
    },
    // Pricing
    pricing: {
      eyebrow: 'HINNASTO',
      headline: 'Selkeät hinnat, ei yllätyksiä',
      body: 'Kaikki hoidot räätälöidään yksilöllisesti tarpeidesi mukaan.',
      tabs: {
        classic: {
          label: 'Klassinen hieronta',
          description: 'Perinteinen hieronta lihaskireyksiin, palautumiseen ja rentoutumiseen. Hoidon voimakkuus ja käsiteltävät alueet sovitetaan aina tarpeidesi mukaan.',
        },
        hotStone: {
          label: 'Kuumakivihieronta',
          description: 'Lämpimillä kivillä tehtävä rauhallinen hoito, joka auttaa rentoutumaan ja pehmentämään lihaskireyksiä.',
        },
        jaw: {
          label: 'Purentalihashieronta',
          description: 'Purentalihasten, leuan ja kasvojen alueen käsittelyä jännityksen, kireyden ja kuormituksen helpottamiseen.',
        },
        iastm: {
          label: 'Faskiarautakäsittely',
          description: 'Faskiarautaa hyödyntävä käsittely lihaskireyksiin ja pehmytkudosten liikkuvuuden tukemiseen.',
        },
      },
      bookNow: 'Varaa aika',
      askService: 'Kysy sopivaa hoitoa',
      duration: '{duration}',
      priceUnit: '€',
    },
    // Reviews
    reviews: {
      eyebrow: 'ASIAKASKOKEMUKSIA',
      headline: 'Mitä asiakkaat sanovat',
      description: 'Kiitettävät arvostelut Googlesta.',
      allReviews: 'Katso kaikki arvostelut',
      leaveReview: 'Jätä arvostelu',
      items: [
        { name: 'Anni K.', text: 'Mathias on ehdottomasti paras hieroja, jolla olen käynyt. Ammattitaitoinen, kuuntelee ja osaa kohdistaa hoidon oikein. Suosittelen lämpimästi!', service: 'Klassinen hieronta' },
        { name: 'Mikael L.', text: 'Upea hierontakokemus! Mathias otti hyvin huomioon toiveeni ja keskittyi juuri niihin kohtiin, jotka kaipasivat huomiota. Tulen ehdottomasti uudelleen.', service: 'Klassinen hieronta' },
        { name: 'Sanna R.', text: 'Kuumakivihieronta oli aivan mieletön elämys. Lämmin ja rauhallinen tunnelma, ja hieronta rentoutti koko kehon. Kiitos!', service: 'Kuumakivihieronta' },
        { name: 'Petri H.', text: 'Purentalihashieronta auttoi minua todella paljon. Olen kärsinyt leukakivuista vuosia ja nyt ne ovat vihdoin helpottaneet. Kiitos Mathias!', service: 'Purentalihashieronta' },
        { name: 'Laura M.', text: 'Faskiarautakäsittely oli tehokasta ja ammattimaista. Mathias osaa kertoa mitä tekee ja miksi. Tulen varmasti uudelleen!', service: 'Faskiarautakäsittely' },
        { name: 'Jussi T.', text: 'Erittäin ammattitaitoinen hieroja. Rentouttava ilmapiiri ja laadukas hoito. Suosittelen kaikille!', service: 'Klassinen hieronta' },
        { name: 'Tiina S.', text: 'Paras hierontakokemukseni Klaukkalassa. Mathias kuuntelee asiakasta ja räätälöi hoidon tarpeiden mukaan.', service: 'Kuumakivihieronta' },
        { name: 'Marko P.', text: 'Säännöllinen hieronta Mathiaksen luona on auttanut selkäkipuihin merkittävästi. Ammattitaitoista ja ystävällistä palvelua.', service: 'Klassinen hieronta' },
      ],
    },
    // Team
    team: {
      eyebrow: 'TUTUSTU MEIHIN',
      headline: 'Asiantuntijat sinua varten',
      mathias: {
        title: 'Koulutettu hieroja, yrittäjä',
        bio: 'Mathias on ME massagen perustaja ja koulutettu hieroja. Hän aloitti yritystoiminnan vuonna 2023 ja palvelee asiakkaita sekä Klaukkalassa että Vaasassa.\n\nMathiakselta saat monipuolisia hieronta- ja kehonhuoltopalveluita: klassinen hieronta, kuumakivihieronta, purentalihashieronta ja faskiarautakäsittely (IASTM).\n\nHänelle tärkeää on kohdata jokainen asiakas yksilöllisesti, kuunnella toiveita ja räätälöidä hoito vastaamaan juuri sinun tarpeitasi.',
        quote: 'Tärkeintä minulle on, että jokainen asiakas lähtee vastaanotolta paremminvoivana.',
      },
      janina: {
        title: 'Koulutettu hieroja',
        bio: 'Janina on koulutettu hieroja, joka liittyi ME massagen tiimiin vuonna 2024. Hän tuo mukanaan lämpöistä ja ammattitaitoista otetta hierontapalveluihin.\n\nJaninalta saat klassista hierontaa ja kuumakivihierontaa. Hän on erityisen kiinnostunut kokonaisvaltaisesta hyvinvoinnista ja kehonhuollosta.',
        quote: 'Haluan auttaa asiakkaitani löytämään keinot rentoutumiseen ja kivunlievitykseen.',
      },
    },
    // FAQ
    faq: {
      eyebrow: 'ENNEN ENSIMMÄISTÄ KÄYNTIÄ',
      headline: 'Usein kysyttyä',
      items: [
        {
          question: 'Minkä pituinen hieronta minulle?',
          answer: 'Ensikertalaisille suosittelemme 45–60 minuutin hoitoa. 30 min riittää, jos haluat keskittyä vain yhteen alueeseen. 90 min antaa aikaa koko keholle perusteellisesti.',
        },
        {
          question: 'Sopiiko hieronta minulle?',
          answer: 'Kyllä! Hieronta sopii kaikille ikään ja kuntoon katsomatta. Meille ovat tervetulleita niin urheilijat, toimistotyöntekijät kuin senioritkin.',
        },
        {
          question: 'Mitä eroa on klassisella hieronnalla ja kuumakivihieronnalla?',
          answer: 'Klassinen hieronta on perinteistä lihaskäsittelyä, joka räätälöidään tarpeidesi mukaan. Kuumakivihieronnassa käytetään lämpimiä kiviä, jotka rentouttavat syvällä tasolla ja lievittävät lihaskireyksiä tehokkaasti.',
        },
        {
          question: 'Miten ajanvaraus toimii?',
          answer: 'Varaa aika helposti nettiajanvarauksestamme osoitteessa memassage.fi/ajanvaraus tai soita {phone}.',
        },
      ],
    },
    // Final CTA
    finalCta: {
      eyebrow: 'VARAA AIKA',
      headline: 'Hoida kehoasi, se ansaitsee huolenpitoa',
      supportText: 'Varaa hieronta jo tänään ja aloita matkasi kohti parempaa hyvinvointia.',
      bookKlaukkala: 'Varaa aika Klaukkalaan',
      bookVaasa: 'Varaa aika Vaasaan',
      phoneSupport: 'Soita tai lähetä sähköpostia',
      trustLine: '★ 4.9 Google-arvostelu • Koulutettu hieroja • Klaukkala ja Vaasa',
    },
    // Footer
    footer: {
      services: 'Palvelut',
      company: 'Yritys',
      contact: 'Yhteystiedot',
      team: 'Tutustu tiimiin',
      customerReviews: 'Asiakkaiden kokemuksia',
      klaukkala: 'Lepsämäntie 1, 2 krs, Klaukkala',
      vaasa: 'Vaasanpuistikko 1 A1, Vaasa',
      paymentMethods: 'Maksutavat: Käteinen, MobilePay, Edenred, Smartum, Epassi',
      copyright: 'ME massage. Kaikki oikeudet pidätetään.',
      maps: {
        klaukkala: 'Klaukkala',
        vaasa: 'Vaasa',
        vaasaAddress: 'Vaasanpuistikko 1 A1, 65100 Vaasa (Rantakatu 11)',
      },
    },
    // Survey
    survey: {
      eyebrow: 'ETKÖ OLE VARMA?',
      headline: 'Selvitä mikä hoito sopii tilanteeseesi',
      description: 'Vastaa muutamaan kysymykseen ja saat suosituksen oireidesi perusteella.',
      startButton: 'Aloita oirekysely',
      duration: 'Kestää noin 30 sekuntia',
      step: 'Vaihe',
      of: '/',
      back: '← Takaisin',
      resultEyebrow: 'SUOSITUKSEMME',
      bookNow: 'Varaa aika',
      exploreService: 'Tutustu hoitomuotoon',
      restart: 'Tee kysely uudelleen',
      questions: [
        {
          question: 'Missä oireesi sijaitsee?',
          options: [
            { label: 'Niska ja hartiat', value: 'niska' },
            { label: 'Selkä', value: 'selka' },
            { label: 'Leuka ja purenta', value: 'leuka' },
            { label: 'Käsi tai olkapää', value: 'kasi' },
            { label: 'Jalka tai lonkka', value: 'jalka' },
            { label: 'Useampi alue', value: 'useampi' },
          ],
        },
        {
          question: 'Mikä kuvaa tilannettasi parhaiten?',
          options: [
            { label: 'Lihaskireys', value: 'kireys' },
            { label: 'Kipu liikkuessa', value: 'kipu' },
            { label: 'Päänsärky tai migreeni', value: 'paansarky' },
            { label: 'Puutuminen tai säteilyoire', value: 'puutuminen' },
            { label: 'Urheiluvamma', value: 'urheiluvamma' },
            { label: 'Palautuminen harjoittelusta', value: 'palautuminen' },
          ],
        },
        {
          question: 'Kuinka kauan oire on jatkunut?',
          options: [
            { label: 'Alle viikon', value: 'viikko' },
            { label: '1–4 viikkoa', value: '4vko' },
            { label: '1–6 kuukautta', value: '6kk' },
            { label: 'Yli 6 kuukautta', value: 'yli6kk' },
            { label: 'Toistuu säännöllisesti', value: 'toistuu' },
          ],
        },
        {
          question: 'Mitä toivot hoidolta eniten?',
          options: [
            { label: 'Kivun lievitystä', value: 'kivunlievitys' },
            { label: 'Parempaa liikkuvuutta', value: 'liikkuvuus' },
            { label: 'Lihaskireyden helpotusta', value: 'kireydenhelpotus' },
            { label: 'Nopeampaa palautumista', value: 'palautuminen' },
            { label: 'Selvyyttä oireen syyhyn', value: 'selvyys' },
            { label: 'Rentoutumista', value: 'rentoutuminen' },
          ],
        },
      ],
      results: {
        jaw: {
          title: 'Suosittelemme purentalihashierontaa',
          description: 'Niska-hartiaseudun jännitykset ja purentalihasten kuormitus voivat olla yhteydessä päänsärkyihin ja leukojen alueen oireisiin. Purentalihashieronta voi auttaa vähentämään lihasjännitystä ja parantamaan alueen toimintaa.',
        },
        hotStone: {
          title: 'Suosittelemme kuumakivihierontaa',
          description: 'Kuumakivihieronta rentouttaa syvällä tasolla ja lievittää lihaskireyksiä tehokkaasti. Lämpimät kivet avaavat lihaksia ja tarjoavat syvällisen rentoutumiskokemuksen.',
        },
        iastm: {
          title: 'Suosittelemme faskiarautakäsittelyä',
          description: 'Faskiarautakäsittely (IASTM) on tehokas menetelmä selän lihaskireyksien ja fascian käsittelyyn. Se voi auttaa erityisesti pitkään jatkuneisiin kireyksiin.',
        },
        classic: {
          title: 'Suosittelemme klassista hierontaa',
          description: 'Klassinen hieronta sopii monenlaisiin oireisiin. Se auttaa lihaskireyksiin, parantaa verenkiertoa ja edistää kehon omaa palautumiskykyä. Hoidon aikana voimme tarvittaessa hyödyntää myös muita tekniikoita.',
        },
      },
    },
    // Service pages
    servicePages: {
      backToHome: 'Takaisin etusivulle',
      benefits: 'Hoidon hyödyt',
      duration: 'Kesto',
      callPrompt: 'tai soita',
      allServices: 'Kaikki palvelut',
      classic: {
        eyebrow: 'HIERONTA',
        title: 'Klassinen hieronta',
        subtitle: 'Kehon pehmytkudosten käsittelyä ammattitaidolla',
        description: 'Käsin tehtävää kehon pehmytkudosten muokkaavaa ja huoltavaa terapiamuotoa. Mobilisoivia otteita, faskia- ja triggerpistekäsittelyä sekä venytyksiä. Voimakkuus räätälöidään aina asiakkaan tarpeiden mukaan. Klassinen hieronta sopii kaikille – niin urheilijoille, toimistotyöntekijöille kuin senioritkin.',
        benefits: ['Rentouttaa lihaksia', 'Parantaa verenkiertoa', 'Auttaa palautumisessa', 'Lieventää kipua', 'Lisää liikkuvuutta', 'Ehkäisee vammoja'],
        duration: '30–120 min',
      },
      hotStone: {
        eyebrow: 'KUUMAKIVIHIERONTA',
        title: 'Kuumakivihieronta',
        subtitle: 'Syvärentoutumista lämpimillä kivillä',
        description: 'Kuumakivihieronta on erityisen rentouttava hoitomuoto, jossa käytetään lämpimiä, sileitä kiviä hieronnan yhteydessä. Lämpö tunkeutuu syvälle lihaksiin, rentouttaa tehokkaasti ja lievittää lihaskireyksiä. Hoito rauhoittaa hermostoa ja tarjoaa syvällisen rentoutumiskokemuksen.',
        benefits: ['Syvärentouttaa lihaksia', 'Lievittää lihaskireyksiä', 'Parantaa verenkiertoa', 'Rauhoittaa hermostoa', 'Vähentää stressiä', 'Lämmin ja miellyttävä kokemus'],
        duration: '60–90 min',
      },
      jaw: {
        eyebrow: 'PUREMENTALIHASHIERONTA',
        title: 'Purentalihashieronta',
        subtitle: 'Apua leukakipuihin ja päänsärkyyn',
        description: 'Purentalihashieronta keskittyy leuan alueen lihaksiin, jotka voivat aiheuttaa päänsärkyä, leukakipua ja niskajännitystä. Hoito sisältää leukanivelen mobilisointia, lihaskäsittelyä ja tarvittaessa venytyksiä. Useat asiakkaat ovat kokeneet merkittävää helpotusta pitkäaikaisiin vaivoihin.',
        benefits: ['Lieventää leukakipua', 'Vähentää päänsärkyä', 'Rentouttaa purentalihakset', 'Parantaa leukanivelten liikkuvuutta', 'Vähentää niskajännitystä', 'Auttaa narskutteluun'],
        duration: '45–60 min',
      },
      iastm: {
        eyebrow: 'IASTM',
        title: 'Faskiarautakäsittely (IASTM)',
        subtitle: 'Syväkäsittely lihaskudokselle',
        description: 'IASTM (Instrument Assisted Soft Tissue Mobilization) on syväkäsittelyä, jossa käytetään erityisiä metallisia työkaluja lihaskudoksen käsittelyyn. Se auttaa lihaskireyksissä, arpikudoksessa ja palautumisessa. Erittäin tehokasta urheilijoille ja aktiiviliikkujille.',
        benefits: ['Käsittely syvemmälle kudokseen', 'Auttaa arpikudoksessa', 'Parantaa liikkuvuutta', 'Nopeuttaa palautumista', 'Vapauttaa lihaskalvot', 'Tehostaa hierontaa'],
        duration: '30–90 min',
      },
    },
    // FAQ page
    faqPage: {
      eyebrow: 'USEIN KYSYTTYÄ',
      headline: 'Vastauksia yleisimpiin kysymyksiin',
      supportText: 'Jos et löydä vastausta kysymykseesi, soita {phone} tai lähetä sähköpostia.',
      notFound: 'Etkö löytänyt vastausta?',
      callButton: 'Soita',
      faqs: [
        { question: 'Minkä pituinen hieronta minulle?', answer: 'Ensikertalaisille suosittelemme 45–60 minuutin hoitoa. 30 min riittää, jos haluat keskittyä vain yhteen alueeseen. 90 min antaa aikaa koko keholle perusteellisesti.' },
        { question: 'Sopiiko hieronta minulle?', answer: 'Kyllä! Hieronta sopii kaikille ikään ja kuntoon katsomatta. Meille ovat tervetulleita niin urheilijat, toimistotyöntekijät kuin senioritkin.' },
        { question: 'Mitä eroa on klassisella hieronnalla ja kuumakivihieronnalla?', answer: 'Klassinen hieronta on perinteistä lihaskäsittelyä, joka räätälöidään tarpeidesi mukaan. Kuumakivihieronnassa käytetään lämpimiä kiviä, jotka rentouttavat syvällä tasolla ja lievittävät lihaskireyksiä tehokkaasti.' },
        { question: 'Miten ajanvaraus toimii?', answer: 'Varaa aika helposti nettiajanvarauksestamme osoitteessa memassage.fi/ajanvaraus tai soita {phone}.' },
        { question: 'Missä sijaitsette?', answer: 'Palvelemme kahdessa toimipisteessä: Klaukkalassa osoitteessa Lepsämäntie 1 (2. krs) ja Vaasassa osoitteessa Vaasanpuistikko 1 A1.' },
        { question: 'Maksutavat?', answer: 'Käteinen, MobilePay, Edenred, Smartum ja Epassi.' },
        { question: 'Onko teillä lahjakortteja?', answer: 'Kyllä, lahjakortteja saa kaikkiin hoitoihimme. Ota yhteyttä puhelimitse tai paikan päällä.' },
        { question: 'Voinko perua ajan?', answer: 'Kyllä, peruutus viimeistään 24 tuntia ennen varattua aikaa. Myöhäisemmästä peruutuksesta veloitetaan hoidon hinta.' },
        { question: 'Mitä vaatetusta hierontaan tarvitsen?', answer: 'Riittää, että riisut yläosan. Alaosan voi pitää päällä tai riisua tarpeen mukaan. Saat peiton päälle hoidon ajaksi.' },
        { question: 'Sopiiko hieronta raskausaikana?', answer: 'Kyllä, raskausaikana hieronta on turvallista ja erittäin hyödyllistä. Kerrothan raskaudestasi etukäteen.' },
        { question: 'Kuinka usein kannattaa käydä hieronnassa?', answer: 'Se riippuu tilanteestasi. Akuuttiin vaivaan suositellaan 1–2 kertaa viikossa, ylläpitohoitona kerran kuukaudessa.' },
        { question: 'Mitä jos minulla on kipua tai sairaus?', answer: 'Kerrothan kaikista sairauksistasi ja lääkityksestäsi etukäteen. Joitakin tilanteita vastaan ei voi hieroa (esim. akuutti tulehdus, kuume).' },
      ],
    },
  },

  en: {
    // Navigation
    nav: {
      home: 'Home',
      services: 'Services',
      pricing: 'Pricing',
      contact: 'Contact',
      reviews: 'Customer Reviews',
      faq: 'FAQ',
      bookNow: 'Book Now',
      allServices: 'All Services',
    },
    // Hero
    hero: {
      eyebrow: 'ME MASSAGE',
      headline: 'Professional Massage in Klaukkala and Vaasa',
      subheadline: 'Classic massage, hot stone massage, TMJ massage and IASTM treatment. Certified massage therapists at your service.',
      bookNow: 'Book Now',
      exploreServices: 'Explore Services',
      statRating: 'Google Rating',
      statSince: 'Since',
      statLocations: 'Locations',
    },
    // Intro
    intro: 'Professional massage and body care',
    // Services
    services: {
      eyebrow: 'SERVICES',
      headline: 'Massage and Body Care',
      body: 'Choose the treatment that suits your needs. All treatments are customized individually.',
      reassurance: 'Not sure which service is right for you? Call {phone} and ask.',
      primary: {
        classic: {
          title: 'Classic Massage',
          description: 'Traditional massage for muscle tension and relaxation. Intensity is always tailored to the client\'s needs.',
          link: 'Learn about massage',
        },
        hotStone: {
          title: 'Hot Stone Massage',
          description: 'Massage with warm stones that relaxes at a deep level and relieves muscle tension.',
          link: 'Learn about hot stone massage',
        },
      },
      secondaryLabel: 'Also Available',
      jaw: 'TMJ Massage',
      iastm: 'IASTM Treatment',
    },
    // Pricing
    pricing: {
      eyebrow: 'PRICING',
      headline: 'Clear Prices, No Surprises',
      body: 'All treatments are customized individually according to your needs.',
      tabs: {
        classic: {
          label: 'Classic Massage',
          description: 'Classic massage with all techniques. Intensity is always tailored to the client\'s needs.',
        },
        hotStone: {
          label: 'Hot Stone Massage',
          description: 'Massage with warm stones that relaxes at a deep level and relieves muscle tension.',
        },
        jaw: {
          label: 'TMJ Massage',
          description: 'Specialized treatment for the jaw and masticatory muscles. Relieves tension and improves function.',
        },
        iastm: {
          label: 'IASTM Treatment',
          description: 'IASTM technique for treating muscle tension and fascia. Effective instrument-assisted therapy.',
        },
      },
      bookNow: 'Book Now',
      askService: 'Ask About Treatment',
      duration: '{duration}',
      priceUnit: '€',
    },
    // Reviews
    reviews: {
      eyebrow: 'CUSTOMER REVIEWS',
      headline: 'What Our Clients Say',
      description: 'Excellent reviews on Google.',
      allReviews: 'See All Reviews',
      leaveReview: 'Leave a Review',
      items: [
        { name: 'Anni K.', text: 'Mathias is absolutely the best masseur I have been to. Professional, listens carefully and knows how to target the treatment correctly. Highly recommended!', service: 'Classic Massage' },
        { name: 'Mikael L.', text: 'Amazing massage experience! Mathias took my wishes into account and focused exactly on the areas that needed attention. I will definitely come back.', service: 'Classic Massage' },
        { name: 'Sanna R.', text: 'The hot stone massage was an incredible experience. Warm and peaceful atmosphere, and the massage relaxed my entire body. Thank you!', service: 'Hot Stone Massage' },
        { name: 'Petri H.', text: 'TMJ massage helped me tremendously. I have suffered from jaw pain for years and now it has finally eased. Thank you Mathias!', service: 'TMJ Massage' },
        { name: 'Laura M.', text: 'IASTM treatment was effective and professional. Mathias knows how to explain what he does and why. I will definitely return!', service: 'IASTM Treatment' },
        { name: 'Jussi T.', text: 'Extremely professional masseur. Relaxing atmosphere and quality treatment. I recommend to everyone!', service: 'Classic Massage' },
        { name: 'Tiina S.', text: 'The best massage experience I have had in Klaukkala. Mathias listens to the client and customizes the treatment according to needs.', service: 'Hot Stone Massage' },
        { name: 'Marko P.', text: 'Regular massage with Mathias has helped my back pain significantly. Professional and friendly service.', service: 'Classic Massage' },
      ],
    },
    // Team
    team: {
      eyebrow: 'MEET OUR TEAM',
      headline: 'Experts for You',
      mathias: {
        title: 'Certified Masseur, Entrepreneur',
        bio: 'Mathias is the founder of ME massage and a certified masseur. He started the business in 2023 and serves clients in both Klaukkala and Vaasa.\n\nFrom Mathias, you can receive versatile massage and body care services: classic massage, hot stone massage, TMJ massage, and IASTM treatment.\n\nIt is important to him to meet each client individually, listen to their wishes, and customize the treatment to match their specific needs.',
        quote: 'The most important thing for me is that every client leaves the session feeling better.',
      },
      janina: {
        title: 'Certified Masseur',
        bio: 'Janina is a certified masseur who joined the ME massage team in 2024. She brings a warm and professional touch to massage services.\n\nFrom Janina, you can receive classic massage and hot stone massage. She is particularly interested in holistic well-being and body care.',
        quote: 'I want to help my clients find ways to relax and relieve pain.',
      },
    },
    // FAQ
    faq: {
      eyebrow: 'BEFORE YOUR FIRST VISIT',
      headline: 'Frequently Asked Questions',
      items: [
        {
          question: 'What length of massage should I choose?',
          answer: 'For first-time clients, we recommend a 45–60 minute treatment. 30 minutes is enough if you want to focus on just one area. 90 minutes allows time for a thorough full-body treatment.',
        },
        {
          question: 'Is massage suitable for me?',
          answer: 'Yes! Massage is suitable for everyone regardless of age or fitness level. Athletes, office workers, and seniors are all welcome.',
        },
        {
          question: 'What is the difference between classic massage and hot stone massage?',
          answer: 'Classic massage is traditional manual therapy tailored to your needs. Hot stone massage uses warm stones that relax at a deep level and effectively relieve muscle tension.',
        },
        {
          question: 'How does booking work?',
          answer: 'Book easily through our online booking at memassage.fi/ajanvaraus or call {phone}.',
        },
      ],
    },
    // Final CTA
    finalCta: {
      eyebrow: 'BOOK NOW',
      headline: 'Take Care of Your Body, It Deserves It',
      supportText: 'Book a massage today and start your journey towards better well-being.',
      bookKlaukkala: 'Book Klaukkala',
      bookVaasa: 'Book Vaasa',
      phoneSupport: 'Call or send an email',
      trustLine: '★ 4.9 Google Rating • Certified Masseur • Klaukkala and Vaasa',
    },
    // Footer
    footer: {
      services: 'Services',
      company: 'Company',
      contact: 'Contact',
      team: 'Meet the Team',
      customerReviews: 'Customer Reviews',
      klaukkala: 'Lepsämäntie 1, 2nd floor, Klaukkala',
      vaasa: 'Vaasanpuistikko 1 A1, Vaasa',
      paymentMethods: 'Payment methods: Cash, MobilePay, Edenred, Smartum, Epassi',
      copyright: 'ME massage. All rights reserved.',
      maps: {
        klaukkala: 'Klaukkala',
        vaasa: 'Vaasa',
        vaasaAddress: 'Vaasanpuistikko 1 A1, 65100 Vaasa (Rantakatu 11)',
      },
    },
    // Survey
    survey: {
      eyebrow: 'NOT SURE?',
      headline: 'Find Out Which Treatment Suits Your Situation',
      description: 'Answer a few questions and get a recommendation based on your symptoms.',
      startButton: 'Start Symptom Quiz',
      duration: 'Takes about 30 seconds',
      step: 'Step',
      of: '/',
      back: '← Back',
      resultEyebrow: 'OUR RECOMMENDATION',
      bookNow: 'Book Now',
      exploreService: 'Learn About Treatment',
      restart: 'Retake Quiz',
      questions: [
        {
          question: 'Where is your symptom located?',
          options: [
            { label: 'Neck and shoulders', value: 'niska' },
            { label: 'Back', value: 'selka' },
            { label: 'Jaw and bite', value: 'leuka' },
            { label: 'Arm or shoulder', value: 'kasi' },
            { label: 'Leg or hip', value: 'jalka' },
            { label: 'Multiple areas', value: 'useampi' },
          ],
        },
        {
          question: 'What best describes your situation?',
          options: [
            { label: 'Muscle tension', value: 'kireys' },
            { label: 'Pain when moving', value: 'kipu' },
            { label: 'Headache or migraine', value: 'paansarky' },
            { label: 'Numbness or radiating sensation', value: 'puutuminen' },
            { label: 'Sports injury', value: 'urheiluvamma' },
            { label: 'Recovery from exercise', value: 'palautuminen' },
          ],
        },
        {
          question: 'How long has the symptom persisted?',
          options: [
            { label: 'Less than a week', value: 'viikko' },
            { label: '1–4 weeks', value: '4vko' },
            { label: '1–6 months', value: '6kk' },
            { label: 'Over 6 months', value: 'yli6kk' },
            { label: 'Reoccurs regularly', value: 'toistuu' },
          ],
        },
        {
          question: 'What do you most hope to get from the treatment?',
          options: [
            { label: 'Pain relief', value: 'kivunlievitys' },
            { label: 'Better mobility', value: 'liikkuvuus' },
            { label: 'Relief from muscle tension', value: 'kireydenhelpotus' },
            { label: 'Faster recovery', value: 'palautuminen' },
            { label: 'Clarity about the cause', value: 'selvyys' },
            { label: 'Relaxation', value: 'rentoutuminen' },
          ],
        },
      ],
      results: {
        jaw: {
          title: 'We Recommend TMJ Massage',
          description: 'Neck-shoulder tension and masticatory muscle strain can be connected to headaches and jaw area symptoms. TMJ massage can help reduce muscle tension and improve function.',
        },
        hotStone: {
          title: 'We Recommend Hot Stone Massage',
          description: 'Hot stone massage relaxes at a deep level and effectively relieves muscle tension. The warm stones open up muscles and provide a deep relaxation experience.',
        },
        iastm: {
          title: 'We Recommend IASTM Treatment',
          description: 'IASTM treatment is an effective method for treating back muscle tension and fascia. It can especially help with long-standing tension.',
        },
        classic: {
          title: 'We Recommend Classic Massage',
          description: 'Classic massage is suitable for many types of symptoms. It helps with muscle tension, improves circulation, and promotes the body\'s own recovery ability. During the treatment, we can also use other techniques if needed.',
        },
      },
    },
    // Service pages
    servicePages: {
      backToHome: 'Back to Home',
      benefits: 'Treatment Benefits',
      duration: 'Duration',
      callPrompt: 'or call',
      allServices: 'All Services',
      classic: {
        eyebrow: 'MASSAGE',
        title: 'Classic Massage',
        subtitle: 'Professional soft tissue treatment',
        description: 'Manual therapy that modifies and maintains the body\'s soft tissues. Mobilizing techniques, fascia and trigger point treatment, and stretches. Intensity is always tailored to the client\'s needs. Classic massage is suitable for everyone – athletes, office workers, and seniors alike.',
        benefits: ['Relaxes muscles', 'Improves circulation', 'Aids recovery', 'Relieves pain', 'Increases mobility', 'Prevents injuries'],
        duration: '30–120 min',
      },
      hotStone: {
        eyebrow: 'HOT STONE MASSAGE',
        title: 'Hot Stone Massage',
        subtitle: 'Deep relaxation with warm stones',
        description: 'Hot stone massage is an especially relaxing treatment that uses warm, smooth stones during the massage. The heat penetrates deep into the muscles, effectively relaxes, and relieves muscle tension. The treatment calms the nervous system and provides a deep relaxation experience.',
        benefits: ['Deep muscle relaxation', 'Relieves muscle tension', 'Improves circulation', 'Calms the nervous system', 'Reduces stress', 'Warm and pleasant experience'],
        duration: '60–90 min',
      },
      jaw: {
        eyebrow: 'TMJ MASSAGE',
        title: 'TMJ Massage',
        subtitle: 'Relief for jaw pain and headaches',
        description: 'TMJ massage focuses on the jaw muscles, which can cause headaches, jaw pain, and neck tension. The treatment includes jaw joint mobilization, muscle treatment, and stretches when needed. Many clients have experienced significant relief from long-term problems.',
        benefits: ['Relieves jaw pain', 'Reduces headaches', 'Relaxes masticatory muscles', 'Improves jaw joint mobility', 'Reduces neck tension', 'Helps with teeth grinding'],
        duration: '45–60 min',
      },
      iastm: {
        eyebrow: 'IASTM',
        title: 'IASTM Treatment',
        subtitle: 'Deep treatment for muscle tissue',
        description: 'IASTM (Instrument Assisted Soft Tissue Mobilization) is a deep treatment that uses special metal tools to treat muscle tissue. It helps with muscle tension, scar tissue, and recovery. Extremely effective for athletes and active individuals.',
        benefits: ['Treatment deeper into tissue', 'Helps with scar tissue', 'Improves mobility', 'Speeds up recovery', 'Releases muscle fascia', 'Enhances massage'],
        duration: '30–90 min',
      },
    },
    // FAQ page
    faqPage: {
      eyebrow: 'FAQ',
      headline: 'Answers to Common Questions',
      supportText: 'If you can\'t find the answer, call {phone} or send an email.',
      notFound: 'Couldn\'t find the answer?',
      callButton: 'Call',
      faqs: [
        { question: 'What length of massage should I choose?', answer: 'For first-time clients, we recommend a 45–60 minute treatment. 30 minutes is enough if you want to focus on just one area. 90 minutes allows time for a thorough full-body treatment.' },
        { question: 'Is massage suitable for me?', answer: 'Yes! Massage is suitable for everyone regardless of age or fitness level. Athletes, office workers, and seniors are all welcome.' },
        { question: 'What is the difference between classic massage and hot stone massage?', answer: 'Classic massage is traditional manual therapy tailored to your needs. Hot stone massage uses warm stones that relax at a deep level and effectively relieve muscle tension.' },
        { question: 'How does booking work?', answer: 'Book easily through our online booking at memassage.fi/ajanvaraus or call {phone}.' },
        { question: 'Where are you located?', answer: 'We serve at two locations: in Klaukkala at Lepsämäntie 1 (2nd floor) and in Vaasa at Vaasanpuistikko 1 A1.' },
        { question: 'Payment methods?', answer: 'Cash, MobilePay, Edenred, Smartum, and Epassi.' },
        { question: 'Do you have gift cards?', answer: 'Yes, gift cards are available for all our treatments. Contact us by phone or in person.' },
        { question: 'Can I cancel my appointment?', answer: 'Yes, cancellation at least 24 hours before the appointment. Late cancellations will be charged the full treatment price.' },
        { question: 'What clothing do I need for massage?', answer: 'Just remove your upper body clothing. You can keep lower clothing on or remove as needed. You will be covered with a blanket during the treatment.' },
        { question: 'Is massage safe during pregnancy?', answer: 'Yes, massage during pregnancy is safe and very beneficial. Please let us know in advance so we can customize the treatment.' },
        { question: 'How often should I get a massage?', answer: 'It depends on your situation. For acute issues 1–2 times per week, for maintenance once a month or as needed.' },
        { question: 'What if I have pain or an illness?', answer: 'Please inform us of all conditions and medications in advance. Some situations cannot be massaged (e.g., acute inflammation, fever).' },
      ],
    },
  },

  sv: {
    // Navigation
    nav: {
      home: 'Hem',
      services: 'Tjänster',
      pricing: 'Priser',
      contact: 'Kontakt',
      reviews: 'Kundrecensioner',
      faq: 'Vanliga frågor',
      bookNow: 'Boka Tid',
      allServices: 'Alla Tjänster',
    },
    // Hero
    hero: {
      eyebrow: 'ME MASSAGE',
      headline: 'Professionell Massage i Klaukkala och Vaasa',
      subheadline: 'Klassisk massage, varm stenmassage, tuggmuskelmassage och IASTM-behandling. Diplomerade massörer till din tjänst.',
      bookNow: 'Boka Tid',
      exploreServices: 'Utforska Tjänster',
      statRating: 'Google-betyg',
      statSince: 'Sedan',
      statLocations: 'Platser',
    },
    // Intro
    intro: 'Professionell massage och kroppsvård',
    // Services
    services: {
      eyebrow: 'TJÄNSTER',
      headline: 'Massage och Kroppsvård',
      body: 'Välj den behandling som passar dina behov. Alla behandlingar anpassas individuellt.',
      reassurance: 'Osäker på vilken tjänst som passar dig? Ring {phone} och fråga.',
      primary: {
        classic: {
          title: 'Klassisk Massage',
          description: 'Traditionell massage för muskelspänningar och avkoppling. Intensiteten anpassas alltid efter kundens behov.',
          link: 'Läs om massage',
        },
        hotStone: {
          title: 'Varm Stenmassage',
          description: 'Massage med varma stenar som slappnar av på djupet och lindrar muskelspänningar.',
          link: 'Läs om varm stenmassage',
        },
      },
      secondaryLabel: 'Också Tillgängligt',
      jaw: 'Tuggmuskelmassage',
      iastm: 'IASTM-behandling',
    },
    // Pricing
    pricing: {
      eyebrow: 'PRISER',
      headline: 'Klara Priser, Inga Överraskningar',
      body: 'Alla behandlingar anpassas individuellt efter dina behov.',
      tabs: {
        classic: {
          label: 'Klassisk Massage',
          description: 'Klassisk massage med alla tekniker. Intensiteten anpassas alltid efter kundens behov.',
        },
        hotStone: {
          label: 'Varm Stenmassage',
          description: 'Massage med varma stenar som slappnar av på djupet och lindrar muskelspänningar.',
        },
        jaw: {
          label: 'Tuggmuskelmassage',
          description: 'Specialiserad behandling för käk- och tuggmusklerna. Lindrar spänningar och förbättrar funktionen.',
        },
        iastm: {
          label: 'IASTM-behandling',
          description: 'IASTM-teknik för behandling av muskelspänningar och fascia. Effektiv instrumentassisterad terapi.',
        },
      },
      bookNow: 'Boka Tid',
      askService: 'Fråga Om Behandling',
      duration: '{duration}',
      priceUnit: '€',
    },
    // Reviews
    reviews: {
      eyebrow: 'KUNDRECENSIONER',
      headline: 'Vad Våra Kunder Säger',
      description: 'Utmärkta recensioner på Google.',
      allReviews: 'Se Alla Recensioner',
      leaveReview: 'Lämna en Recension',
      items: [
        { name: 'Anni K.', text: 'Mathias är absolut den bästa massören jag har varit hos. Professionell, lyssnar och vet hur man riktar in behandlingen korrekt. Rekommenderas varmt!', service: 'Klassisk Massage' },
        { name: 'Mikael L.', text: 'Fantastisk massageupplevelse! Mathias tog hänsyn till mina önskemål och fokuserade exakt på de områden som behövde uppmärksamhet. Jag kommer definitivt tillbaka.', service: 'Klassisk Massage' },
        { name: 'Sanna R.', text: 'Varm stenmassage var en otrolig upplevelse. Varm och lugn atmosfär, och massagen kopplade av hela kroppen. Tack!', service: 'Varm Stenmassage' },
        { name: 'Petri H.', text: 'Tuggmuskelmassage hjälpte mig enormt. Jag har lidit av käk-smärta i åratal och nu har det äntligen lättat. Tack Mathias!', service: 'Tuggmuskelmassage' },
        { name: 'Laura M.', text: 'IASTM-behandling var effektiv och professionell. Mathias kan förklara vad han gör och varför. Jag kommer definitivt tillbaka!', service: 'IASTM-behandling' },
        { name: 'Jussi T.', text: 'Ytterst professionell massör. Avkopplande atmosfär och kvalitetsbehandling. Jag rekommenderar till alla!', service: 'Klassisk Massage' },
        { name: 'Tiina S.', text: 'Den bästa massageupplevelsen jag haft i Klaukkala. Mathias lyssnar på klienten och anpassar behandlingen efter behov.', service: 'Varm Stenmassage' },
        { name: 'Marko P.', text: 'Regelbunden massage hos Mathias har hjälpt min rygg-smärta avsevärt. Professionell och vänlig service.', service: 'Klassisk Massage' },
      ],
    },
    // Team
    team: {
      eyebrow: 'LÄR KÄNNA OSS',
      headline: 'Experter för Dig',
      mathias: {
        title: 'Diplomerad Massör, Företagare',
        bio: 'Mathias är grundaren av ME massage och en diplomerad massör. Han startade företaget 2023 och betjänar kunder i både Klaukkala och Vaasa.\n\nHos Mathias får du mångsidiga massage- och kroppsvårdstjänster: klassisk massage, varm stenmassage, tuggmuskelmassage och IASTM-behandling.\n\nDet är viktigt för honom att möta varje kund individuellt, lyssna på önskemål och anpassa behandlingen efter just dina behov.',
        quote: 'Det viktigaste för mig är att varje kund lämnar sessionen med bättre välbefinnande.',
      },
      janina: {
        title: 'Diplomerad Massör',
        bio: 'Janina är en diplomerad massör som gick med i ME massage-teamet 2024. Hon bidrar med en varm och professionell touch till massagetjänsterna.\n\nHos Janina kan du få klassisk massage och varm stenmassage. Hon är särskilt intresserad av holistiskt välbefinnande och kroppsvård.',
        quote: 'Jag vill hjälpa mina kunder att hitta vägar till avkoppling och smärtlindring.',
      },
    },
    // FAQ
    faq: {
      eyebrow: 'INNAN DITT FÖRSTA BESÖK',
      headline: 'Vanliga Frågor',
      items: [
        {
          question: 'Hur lång massage ska jag välja?',
          answer: 'För förstagångskunder rekommenderar vi en 45–60 minuters behandling. 30 minuter räcker om du vill fokusera på ett område. 90 minuter ger tid för en grundlig helkroppsbehandling.',
        },
        {
          question: 'Passar massage för mig?',
          answer: 'Ja! Massage passar alla oavsett ålder eller kondition. Atleter, kontorsarbetare och seniorer är alla välkomna.',
        },
        {
          question: 'Vad är skillnaden mellan klassisk massage och varm stenmassage?',
          answer: 'Klassisk massage är traditionell manuell terapi som anpassas efter dina behov. Varm stenmassage använder varma stenar som slappnar av på djupet och effektivt lindrar muskelspänningar.',
        },
        {
          question: 'Hur fungerar bokning?',
          answer: 'Boka enkelt via vår online-bokning på memassage.fi/ajanvaraus eller ring {phone}.',
        },
      ],
    },
    // Final CTA
    finalCta: {
      eyebrow: 'BOKA TID',
      headline: 'Ta Hand om Din Kropp, Den Förtjänar Det',
      supportText: 'Boka en massage idag och påbörja din resa mot bättre välbefinnande.',
      bookKlaukkala: 'Boka Klaukkala',
      bookVaasa: 'Boka Vaasa',
      phoneSupport: 'Ring eller skicka e-post',
      trustLine: '★ 4.9 Google-betyg • Diplomerad Massör • Klaukkala och Vaasa',
    },
    // Footer
    footer: {
      services: 'Tjänster',
      company: 'Företag',
      contact: 'Kontakt',
      team: 'Lär Känna Teamet',
      customerReviews: 'Kundrecensioner',
      klaukkala: 'Lepsämäntie 1, 2 vån, Klaukkala',
      vaasa: 'Vaasanpuistikko 1 A1, Vaasa',
      paymentMethods: 'Betalningsmetoder: Kontant, MobilePay, Edenred, Smartum, Epassi',
      copyright: 'ME massage. Alla rättigheter förbehållna.',
      maps: {
        klaukkala: 'Klaukkala',
        vaasa: 'Vaasa',
        vaasaAddress: 'Vaasanpuistikko 1 A1, 65100 Vaasa (Rantakatu 11)',
      },
    },
    // Survey
    survey: {
      eyebrow: 'OSÄKER?',
      headline: 'Ta Reda på Vilken Behandling som Passar Din Situation',
      description: 'Svara på några frågor och få en rekommendation baserad på dina symtom.',
      startButton: 'Starta Symtomfrågeformulär',
      duration: 'Tar cirka 30 sekunder',
      step: 'Steg',
      of: '/',
      back: '← Tillbaka',
      resultEyebrow: 'VÅR REKOMMENDATION',
      bookNow: 'Boka Tid',
      exploreService: 'Läs Om Behandlingen',
      restart: 'Gör Om Frågeformuläret',
      questions: [
        {
          question: 'Var ligger dina symtom?',
          options: [
            { label: 'Nacke och axlar', value: 'niska' },
            { label: 'Rygg', value: 'selka' },
            { label: 'Käke och bett', value: 'leuka' },
            { label: 'Arm eller axel', value: 'kasi' },
            { label: 'Ben eller höft', value: 'jalka' },
            { label: 'Flera områden', value: 'useampi' },
          ],
        },
        {
          question: 'Vad beskriver din situation bäst?',
          options: [
            { label: 'Muskelspänning', value: 'kireys' },
            { label: 'Smärta vid rörelse', value: 'kipu' },
            { label: 'Huvudvärk eller migrän', value: 'paansarky' },
            { label: 'Domningar eller strålande känsla', value: 'puutuminen' },
            { label: 'Idrottsskada', value: 'urheiluvamma' },
            { label: 'Återhämtning från träning', value: 'palautuminen' },
          ],
        },
        {
          question: 'Hur länge har symtomen pågått?',
          options: [
            { label: 'Mindre än en vecka', value: 'viikko' },
            { label: '1–4 veckor', value: '4vko' },
            { label: '1–6 månader', value: '6kk' },
            { label: 'Över 6 månader', value: 'yli6kk' },
            { label: 'Återkommer regelbundet', value: 'toistuu' },
          ],
        },
        {
          question: 'Vad hoppas du mest få av behandlingen?',
          options: [
            { label: 'Smärtlindring', value: 'kivunlievitys' },
            { label: 'Bättre rörlighet', value: 'liikkuvuus' },
            { label: 'Lindring av muskelspänning', value: 'kireydenhelpotus' },
            { label: 'Snabbare återhämtning', value: 'palautuminen' },
            { label: 'Klarhet om orsaken', value: 'selvyys' },
            { label: 'Avkoppling', value: 'rentoutuminen' },
          ],
        },
      ],
      results: {
        jaw: {
          title: 'Vi Rekommenderar Tuggmuskelmassage',
          description: 'Nacke-axelspänningar och tuggmusklernas belastning kan vara kopplade till huvudvärk och käkområdets symtom. Tuggmuskelmassage kan hjälpa till att minska muskelspänningar och förbättra funktionen.',
        },
        hotStone: {
          title: 'Vi Rekommenderar Varm Stenmassage',
          description: 'Varm stenmassage slappnar av på djupet och lindrar muskelspänningar effektivt. De varma stenarna öppnar musklerna och ger en djup avkopplingsupplevelse.',
        },
        iastm: {
          title: 'Vi Rekommenderar IASTM-behandling',
          description: 'IASTM-behandling är en effektiv metod för behandling av ryggmuskelspänningar och fascia. Den kan särskilt hjälpa vid långvariga spänningar.',
        },
        classic: {
          title: 'Vi Rekommenderar Klassisk Massage',
          description: 'Klassisk massage passar för många typer av symtom. Den hjälper vid muskelspänningar, förbättrar cirkulationen och främjar kroppens egna återhämtningsförmåga. Under behandlingen kan vi också använda andra tekniker vid behov.',
        },
      },
    },
    // Service pages
    servicePages: {
      backToHome: 'Tillbaka Hem',
      benefits: 'Behandlingsfördelar',
      duration: 'Varaktighet',
      callPrompt: 'eller ring',
      allServices: 'Alla Tjänster',
      classic: {
        eyebrow: 'MASSAGE',
        title: 'Klassisk Massage',
        subtitle: 'Professionell mjukvävnadsbehandling',
        description: 'Manuell terapi som modifierar och underhåller kroppens mjukvävnader. Mobiliserande tekniker, fascia- och triggerpunktbehandling, samt stretchningar. Intensiteten anpassas alltid efter kundens behov. Klassisk massage passar alla – atleter, kontorsarbetare och seniorer.',
        benefits: ['Slappnar av muskler', 'Förbättrar cirkulation', 'Hjälper återhämtning', 'Lindrar smärta', 'Ökar rörlighet', 'Förebygger skador'],
        duration: '30–120 min',
      },
      hotStone: {
        eyebrow: 'VARM STENMASSAGE',
        title: 'Varm Stenmassage',
        subtitle: 'Djup avkoppling med varma stenar',
        description: 'Varm stenmassage är en särskilt avkopplande behandling som använder varma, släta stenar under massagen. Värmen tränger djupt in i musklerna, slappnar av effektivt och lindrar muskelspänningar. Behandlingen lugnar nervsystemet och ger en djup avkopplingsupplevelse.',
        benefits: ['Djup muskelavkoppling', 'Lindrar muskelspänningar', 'Förbättrar cirkulation', 'Lugnar nervsystemet', 'Minskar stress', 'Varm och behaglig upplevelse'],
        duration: '60–90 min',
      },
      jaw: {
        eyebrow: 'TUGGMUSKELMASSAGE',
        title: 'Tuggmuskelmassage',
        subtitle: 'Lindring för käksmärta och huvudvärk',
        description: 'Tuggmuskelmassage fokuserar på käkmusklerna, som kan orsaka huvudvärk, käksmärta och nackspänningar. Behandlingen inkluderar käkledsmobilisering, muskelbehandling och stretchningar vid behov. Många kunder har upplevt betydande lindring av långvariga problem.',
        benefits: ['Lindrar käksmärta', 'Minskar huvudvärk', 'Slappnar av tuggmuskler', 'Förbättrar käkledernas rörlighet', 'Minskar nackspänningar', 'Hjälper vid tandgnissling'],
        duration: '45–60 min',
      },
      iastm: {
        eyebrow: 'IASTM',
        title: 'IASTM-behandling',
        subtitle: 'Djupbehandling för muskelvävnad',
        description: 'IASTM (Instrument Assisted Soft Tissue Mobilization) är en djupbehandling som använder speciella metallverktyg för att behandla muskelvävnad. Den hjälper vid muskelspänningar, ärrvävnad och återhämtning. Extremt effektiv för atleter och aktiva individer.',
        benefits: ['Behandling djupare in i vävnaden', 'Hjälper vid ärrvävnad', 'Förbättrar rörlighet', 'Påskyndar återhämtning', 'Frigör muskelfascia', 'Förbättrar massage'],
        duration: '30–90 min',
      },
    },
    // FAQ page
    faqPage: {
      eyebrow: 'VANLIGA FRÅGOR',
      headline: 'Svar på Vanliga Frågor',
      supportText: 'Om du inte hittar svaret, ring {phone} eller skicka ett e-postmeddelande.',
      notFound: 'Kunde du inte hitta svaret?',
      callButton: 'Ring',
      faqs: [
        { question: 'Hur lång massage ska jag välja?', answer: 'För förstagångskunder rekommenderar vi en 45–60 minuters behandling. 30 minuter räcker om du vill fokusera på ett område. 90 minuter ger tid för en grundlig helkroppsbehandling.' },
        { question: 'Passar massage för mig?', answer: 'Ja! Massage passar alla oavsett ålder eller kondition. Atleter, kontorsarbetare och seniorer är alla välkomna.' },
        { question: 'Vad är skillnaden mellan klassisk massage och varm stenmassage?', answer: 'Klassisk massage är traditionell manuell terapi anpassad efter dina behov. Varm stenmassage använder varma stenar som slappnar av på djupet och effektivt lindrar muskelspänningar.' },
        { question: 'Hur fungerar bokning?', answer: 'Boka enkelt via vår online-bokning på memassage.fi/ajanvaraus eller ring {phone}.' },
        { question: 'Var finns ni?', answer: 'Vi betjänar på två platser: i Klaukkala på Lepsämäntie 1 (2:a vån) och i Vaasa på Vaasanpuistikko 1 A1.' },
        { question: 'Betalningsmetoder?', answer: 'Kontant, MobilePay, Edenred, Smartum och Epassi.' },
        { question: 'Har ni presentkort?', answer: 'Ja, presentkort finns tillgängliga för alla våra behandlingar. Kontakta oss via telefon eller på plats.' },
        { question: 'Kan jag avboka?', answer: 'Ja, avbokning minst 24 timmar före bokad tid. Senare avbokning debiteras fullt treatmentspris.' },
        { question: 'Vilka kläder behöver jag för massage?', answer: 'Det räcker att ta av överkroppen. Underkroppen kan behållas på eller tas av efter behov. Du får en filt över dig under behandlingen.' },
        { question: 'Passar massage under graviditet?', answer: 'Ja, massage under graviditet är säker och mycket fördelaktig. Meddela oss i förväg så vi kan anpassa behandlingen.' },
        { question: 'Hur ofta bör jag gå på massage?', answer: 'Det beror på din situation. För akuta besvär 1–2 gånger per vecka, för underhåll en gång i månaden.' },
        { question: 'Vad gör jag om jag har smärta eller sjukdom?', answer: 'Meddela oss om alla sjukdomar och mediciner i förväg. Vissa tillstånd kan inte masseras (t.ex. akut inflammation, feber).' },
      ],
    },
  },
} as const;

export type Translations = typeof translations;
