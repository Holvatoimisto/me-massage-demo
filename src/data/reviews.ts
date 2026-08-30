// Location-specific review data for the Asiakkaiden kokemuksia page.
//
// LOCATION ATTRIBUTION IS VERIFIED: these reviews were manually copied from
// the correct location-specific Google review profiles (ME massage Klaukkala
// / ME massage Vaasa) during the client review process. Do not mix locations.
//
// STRUCTURE: `reviews` holds the general location collection (exactly 18 per
// location). `highlights` holds the EXTRA therapist-highlight quotes shown
// beside the therapist images — they never count toward the general 18 and
// are not duplicated inside it.
//
// Review texts are kept VERBATIM in their ORIGINAL LANGUAGE on purpose:
// customer quotes are never rewritten, grammar-corrected or translated.
// Relative dates are not stored — they go stale without sync. The future
// Google Reviews sync can replace this static source without touching the
// page components.

export interface LocationReview {
  id: string;
  author: string;
  text: string;
  /** The reviewer's actual Google rating — never normalized. */
  rating: 4 | 5;
  /** Set only when the review text explicitly names the therapist. */
  therapistMention?: 'mathias' | 'janina';
  source: 'Google';
}

export interface LocationReviewsData {
  slug: 'klaukkala' | 'vaasa';
  /** Live-verified Google rating for this location's own profile. */
  rating: string;
  /** Undefined = not publicly verifiable; do not render a fabricated number. */
  reviewCount?: number;
  /** Exactly 18 general reviews per location (therapist highlights excluded). */
  reviews: LocationReview[];
  /** Extra image-adjacent therapist quotes, separate from the general 18. */
  highlights: LocationReview[];
  /** Highlight review ids shown for a given therapist. */
  highlightedByTherapist: Partial<Record<'mathias' | 'janina', string[]>>;
}

export const locationReviews: Record<'klaukkala' | 'vaasa', LocationReviewsData> = {
  klaukkala: {
    slug: 'klaukkala',
    rating: '5,0',
    reviewCount: undefined,
    // First six are curated for variety (professionalism, effectiveness,
    // treatment contexts, atmosphere) — they render before "Katso lisää".
    reviews: [
      {
        id: 'klk-terhi',
        author: 'Terhi Rauhamäki',
        text: 'Erittäin hyvä koko vartalon hieronta. Hienoa, että hieroja kirjoitti ylös tietoja hierottavasta sekä ennen että jälkeen hieronnan ja neuvoi vielä hyviä venyttelyliikkeitä lopuksi.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-minna',
        author: 'Minna Karesti',
        text: 'Hierojat aivan mahtavia ammattilaisia, rento ja miellyttävä tunnelma. Erityisen vahva suositus kuumakivi+klassiseen hierontaan.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-ramona',
        author: 'Ramona Blomerus',
        text: 'Aivan mahtava hieronta kokemus! Kerrankin ongelma kohtiin perehdyttiin eikä vain silitelty. Suosittelen lämpimästi kaikille ihan 5/5.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-jenni',
        author: 'Jenni Nurmi',
        text: 'Ajan sai nopeasti, asiansa osaava ja asiakkaan ammatillisesti kohtaava ammattilainen.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-peppi',
        author: 'Peppi Kankkunen',
        text: 'Erittäin tehokasta ja asiantuntevaa hierontaa. Erinomaisia vinkkejä myös venyttelyyn enemmänkin liikuntaa harrastaneelle! 6/5 💫',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-arina',
        author: 'Arina Abakanova',
        text: 'Hieronta oli todella hyvä ja ammattitaitoinen. Hieroja löysi paljon kipukohtia ja käsitteli ne huolellisesti. Hieronnan jälkeen olo oli paljon parempi ja kevyempi. Voin lämpimästi suositella!',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-linda',
        author: 'Linda Koskinen',
        text: 'Suosittelen lämpimästi. Säännölliseen kehonhuoltoon oiva paikka, kokonaisvaltainen hoito venyttelyohjeineen. Plussaa hyvästä asiakaspalvelusta.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-joni',
        author: 'Joni Talonen',
        text: 'Hyvä palvelu ja hieronta. Käydään läpi asioita, ja saa tarvittaessa ohjeet mukaan.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-tatu',
        author: 'Tatu Verkkomäki',
        text: 'Paras hieroja missä minä olen koskaan ollut. Hyvää hieromista ei silittelyä👍',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-tomipekka',
        author: 'Tomi-Pekka Turpeinen',
        text: 'Hyvä paikka. Tämän kunnon hierontaa.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-markus',
        author: 'Markus Mäkelä',
        text: 'Todella hyvin jumeihin tehoavaa hierontaa ja todella ystävällistä palvelua. Kannattaa tulla vaikka vähän kauempaakin.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-auli',
        author: 'Auli Henriksson',
        text: 'Hienotunteinen ja ystävällinen asiakaspalvelu. Todella ammattitaidolla suoritettu jalkahieronta. Kotimatkalle kevein jaloin.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-heidi',
        author: 'Heidi Mukkala',
        text: 'Kaikin puolin kymppitason hierontaa. Erittäin ammattitaitoinen hieroja! 😊',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-anna',
        author: 'Anna Westerback',
        text: 'Ystävällinen ja ammattitaitoinen palvelu. Purentalihashieronta oli super! 👌',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-oona',
        author: 'Oona Auvinen',
        text: 'Jos haluaa kunnon hierontaan eikä mihinkään hipsuttelusipsutteluun niin tämä on oikea paikka👍',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-pia',
        author: 'Pia Mikkola',
        text: 'Ystävällinen palvelu ja napakat otteet.',
        rating: 4,
        source: 'Google',
      },
      {
        id: 'klk-noel',
        author: 'Noel Uusitalo',
        text: 'Todella osaava hieroja. Uudelleensyntynyt olo 💪🏻',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'klk-jussi',
        author: 'Jussi Liimatta',
        text: 'Erittäin hyvää ja ammattitaitoista palvelua👍🏻',
        rating: 5,
        source: 'Google',
      },
    ],
    // Extra image-adjacent therapist quotes — NOT part of the general 18.
    highlights: [
      {
        id: 'klk-hl-suna',
        author: 'Suna Koljonen',
        text: 'Todella kivat uudet tilat ja Mathiaksen hieronta on ihan 11/10. Suosittelen, niin pysyy kroppa iskussa.',
        rating: 5,
        therapistMention: 'mathias',
        source: 'Google',
      },
      {
        id: 'klk-hl-marjatta',
        author: 'Marjatta Larisuo',
        text: 'Mathias tekee työnsä suurella sydämellä ja asiakastaan kunnioittaen. On joustava, empaattinen ja ihmisläheinen',
        rating: 5,
        therapistMention: 'mathias',
        source: 'Google',
      },
      {
        id: 'klk-hl-sanni',
        author: 'Sanni Välimäki',
        text: 'Kävin Janinalla klassisessa hieronnassa. Erinomainen ammattitaitoinen asiakaspalvelu ja viihtyisät uudet tilat. Hieronnasta jäi hyvä kokemus😊⭐️',
        rating: 5,
        therapistMention: 'janina',
        source: 'Google',
      },
      {
        id: 'klk-hl-ada',
        author: 'Ada Hiltunen',
        text: 'Kävin Janinalla hieronnassa. Osaava ja ammattitaitoinen hieroja. Sain apua ongelmakohtiin ja huomasin heti hieronnan jälkeen, että olo oli rennompi! Aivan upeat uudet tilat!🤩',
        rating: 5,
        therapistMention: 'janina',
        source: 'Google',
      },
    ],
    highlightedByTherapist: {
      mathias: ['klk-hl-suna', 'klk-hl-marjatta'],
      janina: ['klk-hl-sanni', 'klk-hl-ada'],
    },
  },
  vaasa: {
    slug: 'vaasa',
    rating: '5,0',
    reviewCount: undefined,
    reviews: [
      {
        id: 'vaa-mikael',
        author: 'Mikael Sorsa',
        text: 'Suosituksesta varasin hieronnan. Ei tarvinnut pettyä. Erittäin sympaattinen ja kuunteleva hieroja. Jo ensimmäisen käsittelyn jälkeen vahva usko, että pitkäaikainen vaiva saadaan korjattua. 😊',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-henri',
        author: 'Henri Kronqvist',
        text: 'Hieroja oli erittäin ystävällinen ja ammattitaitoinen. Hoiti kipukohdat hyvin ja höllensi otetta jos sattui liikaa. Hieronnan jälkeen antoi erittäin hyviä venyttelyliikkeitä kotiläksyksi.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-eveliina',
        author: 'Eveliina Jaurakkajärvi',
        text: 'Ammattitaitoinen hieronta ja rento asiakkaan kohtaaminen, ei tarvinutkaan jännittää :)',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-tarja',
        author: 'Tarja Viitanen',
        text: 'Mathias todella tietää, mitä tekee! Selkäpaniikki hellittää pikkuhiljaa.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-laura',
        author: 'Laura Ollila',
        text: 'Osaava ja ammattitaitoinen hieroja! Tietää mitä tekee.\nPlussana viikonloppu- ja ilta-ajat 😊\nSuosittelen vahvasti!',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-anton',
        author: 'Anton Salmi',
        text: 'Pätevä hieroja joka tietää mitä tekee.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-miia',
        author: 'Miia Kontturi',
        text: 'Kauan vaivanut revähtymän jälki oireet sai hoidettua kuntoon niin pääsi taas juokseen.',
        rating: 4,
        source: 'Google',
      },
      {
        id: 'vaa-markku',
        author: 'Markku Viitanen',
        text: 'Ei mitään silittelyä eikä taputtelua. Jumit löytyi ja korjaustoimenpiteet alkoivat...',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-eetu',
        author: 'Eetu Ponsiluoma',
        text: 'Löytyy varmasti kaikille asiakkaille mitä tarvitsee, itse halusin vähä kovempaa hierontaa ja sitä todellakin sai! 😄',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-paula',
        author: 'Paula Charlotte Sinisalo',
        text: 'Hyvä ensimmäinen kokemus! Taitava ja asiansa osaava.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-esa',
        author: 'Esa Soikkeli',
        text: 'Hyvä hieronta.Todella suosittelen, 10 pistettä.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-suvi',
        author: 'Suvi Koski',
        text: 'Todella hyvä ja asiantunteva palvelu.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-tommy',
        author: 'Tommy Udelius',
        text: 'Loistava kokemus ja toimi kuten piti, suositus',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-elina',
        author: 'Elina',
        text: 'Jos et kaipaa hipsuttelua, niin Mathias on oikea hieroja sulle. Vahva suositus!',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-karhulahti',
        author: 'Mikael Karhulahti',
        text: 'Intressanta diskussioner och väl utförd massage. Mathias är mycket erfaren och anpassade trycket/styrkan väl. Bokade genast följande besök.',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-ragnar',
        author: 'Ragnar Friðriksson',
        text: 'Första besöket på ME Massage, men absolut inte det sista! Fantastisk upplevelse och väldigt duktig personal. 5/5 stjärnor',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-lindaholm',
        author: 'Linda Holm',
        text: 'Går regelbundet, och är alltid lika nöjd.🙏\nBra grepp, inget "pjasas". 🔥',
        rating: 5,
        source: 'Google',
      },
      {
        id: 'vaa-emma',
        author: 'Emma Söderlund',
        text: 'Väldigt bra och professionell upplevelse, en trygg och effektiv behandling.',
        rating: 5,
        source: 'Google',
      },
    ],
    // Extra image-adjacent therapist quotes — NOT part of the general 18.
    highlights: [
      {
        id: 'vaa-hl-kirsi',
        author: 'Kirsi Spoof-Tuomi',
        text: 'Mathias pelasti mun reidet – ja siinä sivussa EM-kisat! Kramppaavat koivet rauhoittuivat kertaheitolla, ja mitalitkin napsahtivat kaulaan, kun käsittely oli kohdillaan. Todella osaava ja rento tyyppi, jonka pöydälle palaan mielelläni.',
        rating: 5,
        therapistMention: 'mathias',
        source: 'Google',
      },
      {
        id: 'vaa-hl-lora',
        author: 'Lora Doykova',
        text: 'Mathias on todella osaava ja taitava hieroja! Ongelma alueet tuntu heti paremmilta. Tunnelma oli todella rento ja juteltavaa riittää hänen kanssaan, jos tekee mieli höpötellä samalla.',
        rating: 5,
        therapistMention: 'mathias',
        source: 'Google',
      },
    ],
    highlightedByTherapist: {
      mathias: ['vaa-hl-kirsi', 'vaa-hl-lora'],
    },
  },
};
