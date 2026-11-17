import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageSeo } from '@/components/PageSeo';

const sectionHeadingClass = 'font-inter text-[16px] font-semibold text-[#152238] leading-[1.5] mb-3';
const subsectionHeadingClass = 'font-inter text-[15px] font-semibold text-[#152238] leading-[1.5] mb-2';
const paragraphClass = 'font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.8]';
const linkClass = 'text-[#152238] underline underline-offset-4 hover:text-[#5A6A7A] transition-colors';

export function PurchaseTermsPage() {
  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      <PageSeo
        title="Ostoehdot | ME massage"
        description="ME Massagen verkkokaupan tilaamista, maksamista, palautuksia ja reklamaatioita koskevat ostoehdot."
      />

      <Header />
      <div className="h-[60px] md:h-[68px]" />

      <main className="px-6 md:px-12 py-14 md:py-20">
        <article className="max-w-[720px] mx-auto">
          <header className="mb-12 md:mb-14">
            <h1 className="font-cormorant text-[30px] md:text-[40px] text-[#152238] leading-[1.2] mb-6">
              Ostoehdot
            </h1>
            <p className={paragraphClass}>
              ME massage 3361791-2 (jäljempänä verkkokauppa) myy tuotteita yksityishenkilöille Suomeen. Pidätämme oikeuden toimitusehtojen ja hintojen muutoksiin. Tuotteiden hinta ei sisällä arvonlisäveroa.
            </p>
          </header>

          <div className="space-y-9 md:space-y-10">
            <section>
              <h2 className={sectionHeadingClass}>Verkkokaupan yhteystiedot</h2>
              <div className={`${paragraphClass} space-y-1`}>
                <p>Sähköposti: <a href="mailto:mathias.eklund@memassage.fi" className={linkClass}>mathias.eklund@memassage.fi</a></p>
                <p>Puhelin: <a href="tel:+358408338512" className={linkClass}>040 8338512</a></p>
                <p>Postiosoite: Vaasanpuistikko 1 A1, 65100 Vaasa</p>
              </div>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Tilaaminen</h2>
              <p className={paragraphClass}>
                Tilattavat tuotteet valitaan verkkosivuilla lisäämällä ne ostoskoriin. Tilaus lähetetään maksamalla ostoskorin sisältö verkkokaupan kassalla. Tehdessäsi tilauksen hyväksyt nämä toimitusehdot, tuotteiden hinnat sekä toimituskulut. Mikäli tilaushetkellä annetaan sähköpostiosoite, tilauksesta lähetetään tilausvahvistus sähköpostitse. Tilausvahvistuksesta ilmenevät tilatut tuotteet sekä hinta.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Maksaminen</h2>
              <div className={`${paragraphClass} space-y-4`}>
                <p>Verkkokaupan maksuvälittäjänä toimii Visma Pay (Visma Payments Oy, y-tunnus 2486559-4), joka on rekisteröity Finanssivalvonnan ylläpitämään maksulaitosrekisteriin. Maksamiseen siirrytään Visma Payn verkkopalvelun kautta ja tiliotteella ja laskulla maksun saajana näkyy Visma Pay tai Visma Payments Oy. Visma Pay välittää maksut verkkokauppiaalle. Maksaminen on turvallista, sillä kaikki maksutapahtumaa koskevat tiedot välitetään salattua yhteyttä käyttäen niin, ettei kukaan ulkopuolinen taho näe maksutapahtuman tietoja.</p>
                <p>Kauppa syntyy verkkokaupan asiakkaan ja verkkokaupan välille. Verkkokaupan vastuulla ovat kaikki kauppaan liittyvät velvoitteet.</p>
                <p>Lue lisää Visma Paysta: <a href="https://www.vismapay.fi/" target="_blank" rel="noopener noreferrer" className={linkClass}>https://www.vismapay.fi/</a></p>
              </div>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Maksutavat</h2>
              <p className={`${paragraphClass} mb-7`}>
                Visma Pay -palvelun kautta voit maksaa verkkopankkitunnuksilla, mobiililompakolla, maksukorteilla (credit/debit), laskulla tai osamaksulla. Käytettävissä ovat seuraavat maksutavat: Osuuspankki, Nordea, Danske Bank, Oma Säästöpankki, Säästöpankki, Aktia, Paikallisosuuspankit, S-Pankki, Handelsbanken, Ålandsbanken, MobilePay, Siirto, Visa-, Visa Debit-, Visa Electron-, MasterCard- ja Debit MasterCard -kortit sekä Alisa Lasku.
              </p>

              <div className="space-y-7">
                <div>
                  <h3 className={subsectionHeadingClass}>MobilePay</h3>
                  <p className={paragraphClass}>Voit maksaa MobilePay-palvelulla mikäli olet sallinut verkkokaupoissa maksamisen sovelluksen asetuksista. MobilePaylla suoritetut maksut veloitetaan palveluun liitetyltä maksukortilta. Mikäli maksun veloittaminen maksukortilta epäonnistuu, MobilePaylla maksaminen ei ole mahdollista verkkokaupassa.</p>
                </div>

                <div>
                  <h3 className={subsectionHeadingClass}>OP Lasku</h3>
                  <p className={`${paragraphClass} mb-2`}>OP Lasku – Joustava tapa kaikkien pankkien asiakkaille maksaa verkko-ostokset. OP Laskulla voit tehdä enintään 5 000 euron suuruisia ostoksia ja maksaa ne korottomasti pois 45 vuorokauden sisällä. Halutessasi voit pilkkoa laskun useampaan maksuerään. Ostoksesi näkyvät yhdessä paikassa, joten pysyt helposti perillä rahan käytöstä. Luottorajan avulla pidät kulutuksen haluamissasi rajoissa. Saat laskut kätevästi sähköpostiisi. Verkkopalvelussamme näet tietoja OP Laskun käytöstäsi ja tekemiesi ostosten summan. Voit käyttää OP Laskua, jos olet maksukykyinen, yli 20-vuotias, ja sinulla on suomalaisen pankin verkkotunnukset.</p>
                  <a href="https://www.op.fi/henkiloasiakkaat/paivittaiset/maksaminen/op-lasku" target="_blank" rel="noopener noreferrer" className={`${paragraphClass} ${linkClass}`}>https://www.op.fi/henkiloasiakkaat/paivittaiset/maksaminen/op-lasku</a>
                </div>

                <div>
                  <h3 className={subsectionHeadingClass}>Alisa Lasku</h3>
                  <p className={`${paragraphClass} mb-2`}>Alisa Lasku on joustava ja turvallinen maksutapa. Maksutapa sopii kaikille yli 20-vuotiaille kuluttajille kaiken tyyppisiin ostoksiin. Halutessasi voit jakaa laskun pienempiin osiin ja maksaa takaisin jopa 60 erässä.</p>
                  <a href="https://www.alisapankki.fi/" target="_blank" rel="noopener noreferrer" className={`${paragraphClass} ${linkClass}`}>https://www.alisapankki.fi/</a>
                </div>
              </div>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Visma Pay -maksupalvelun yhteystiedot</h2>
              <div className={`${paragraphClass} space-y-1`}>
                <p>Visma Payments Oy (Y-tunnus 2486559-4)</p>
                <p>Sähköposti: <a href="mailto:helpdesk@vismapay.com" className={linkClass}>helpdesk@vismapay.com</a></p>
                <p>Puhelin: <a href="tel:+358931542037" className={linkClass}>09 315 42 037</a> (arkisin klo 9-16)</p>
                <p>Postiosoite: Brahenkatu 4, 53100 Lappeenranta</p>
              </div>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Palautukset</h2>
              <p className={paragraphClass}>Verkkokaupan asiakkaalla on kuluttajansuojalain mukainen 14 vuorokauden vaihto- ja palautusoikeus. Asiakkaalla on oikeus vaihtaa tai palauttaa joko osa tai kaikki tilauksen tuotteet. Palautettavat tai vaihdettavat tuotteet tulee olla alkuperäispakkauksessa ja myyntikuntoisia. Jos haluat palauttaa tai vaihtaa tuotteita, ota ensin yhteyttä verkkokauppaan ja kysy palautusohjeita. Liitäthän palautukseen mukaan nimesi, yhteystietosi sekä tilinumerosi mahdollista maksusuorituksen palauttamista varten.</p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>Tilauksen peruuttaminen, virhevastuu ja reklamaatiot</h2>
              <div className={`${paragraphClass} space-y-4`}>
                <p>Ennen tilauksen toimitusta tilauksen voi peruuttaa sähköpostitse lähetetyllä kirjallisella ilmoituksella.</p>
                <p>Verkkokaupalla on lakisääteinen virhevastuu myydyistä tuotteista. Reklamaatiotapauksissa pyydämme olemaan yhteydessä asiakaspalveluumme. Kuluttajalla on oikeus viedä mahdolliset riitatilanteet kuluttajariitalautakunnan ratkaistavaksi.</p>
              </div>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
