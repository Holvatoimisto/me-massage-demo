import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';
import { PageSeo } from '@/components/PageSeo';

const sectionHeadingClass = 'font-inter text-[16px] font-semibold text-[#152238] leading-[1.5] mb-3';
const paragraphClass = 'font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.8]';
const listClass = 'list-disc pl-5 space-y-1 font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.8]';

export function PrivacyPage() {
  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      <PageSeo
        title="Tietosuojan kuvaus | ME massage"
        description="ME Massagen tietosuojaseloste kertoo, kuinka asiakkaiden henkilötietoja käsitellään."
      />

      <Header />
      <div className="h-[60px] md:h-[68px]" />

      <main className="px-6 md:px-12 py-14 md:py-20">
        <article className="max-w-[720px] mx-auto">
          <header className="mb-12 md:mb-14">
            <h1 className="font-cormorant text-[30px] md:text-[40px] text-[#152238] leading-[1.2] mb-6">
              Tietosuojan kuvaus
            </h1>
            <p className={`${paragraphClass} font-semibold`}>Tietosuojaseloste ME massagein asiakasrekisteriin</p>
            <p className={`${paragraphClass} text-[#5A6A7A]`}>Viimeksi päivitetty 2.6.2025</p>
            <p className={`${paragraphClass} mt-6`}>
              Tämä tietosuojaseloste kertoo, kuinka ME Massage käsittelee asiakkaidensa henkilötietoja.
            </p>
          </header>

          {/* TODO BEFORE LAUNCH: confirm the controller address with Mathias. Legacy privacy notice says Vaasanpuistikko 1 A1, 65100 Vasa, while the new site uses Rantakatu 11, 65100 Vaasa. */}
          {/* Mixed FI/SV wording is preserved intentionally until Mathias confirms whether it should be cleaned up. */}
          <div className="space-y-9 md:space-y-10">
            <section>
              <h2 className={sectionHeadingClass}>1. Personuppgiftsansvarig:</h2>
              <div className={`${paragraphClass} space-y-1`}>
                <p>Nimi: ME Massage</p>
                <p>Y-tunnus: 3361791-2</p>
                <p>Osoite: Vaasanpuistikko 1 A1, 65100 Vasa</p>
                <p>Puhelin: 040 8338512</p>
                <p>
                  Sähköposti:{' '}
                  <a href="mailto:mathias.eklund@memassage.fi" className="text-[#152238] underline underline-offset-4 hover:text-[#5A6A7A] transition-colors">
                    mathias.eklund@memassage.fi
                  </a>
                </p>
              </div>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>2. Rekisterin nimi:</h2>
              <p className={paragraphClass}>Asiakasrekisteri – hierontapalvelut</p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>3. Käsittelyn tarkoitus ja oikeusperuste:</h2>
              <p className={`${paragraphClass} mb-2`}>Tietoja käsitellään:</p>
              <ul className={listClass}>
                <li>Ajanvarauksien ja asiakassuhteiden hoitoon</li>
                <li>Laskutukseen ja kirjanpitoon</li>
                <li>Hoitohistorian seurantaan (asiakkaan suostumuksella)</li>
                <li>Lakisääteisten velvoitteiden täyttämiseksi</li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>4. Rekisterin tietosisältö:</h2>
              <ul className={listClass}>
                <li>Nimi</li>
                <li>Yhteystiedot (puhelin, sähköposti)</li>
                <li>Ajanvaraustiedot / Bokningsuppgifter</li>
                <li>Laskutustiedot</li>
                <li>Hoitohistoria ja terveystiedot (asiakkaan suostumuksella)</li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>5. Tietojen säilytysaika:</h2>
              <p className={paragraphClass}>
                Tietoja säilytetään vain niin kauan kuin se on tarpeen asiakassuhteen hoitamiseksi ja lainsäädännön (esim. kirjanpitolain) edellyttämällä tavalla.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>6. Tietojen luovutus ja siirto:</h2>
              <p className={paragraphClass}>
                Tietoja ei luovuteta kolmansille osapuolille ilman asiakkaan suostumusta, ellei laki toisin määrää.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>7. Suojaus:</h2>
              <ul className={listClass}>
                <li>Tiedot säilytetään suojatuissa järjestelmissä</li>
                <li>Pääsy tietoihin on rajattu vain rekisterinpitäjän käyttöön</li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>8. Rekisteröidyn oikeudet:</h2>
              <p className={`${paragraphClass} mb-2`}>Asiakkaalla on oikeus:</p>
              <ul className={listClass}>
                <li>Saada pääsy omiin tietoihinsa</li>
                <li>Pyytää oikaisua tai poistoa</li>
                <li>Vastustaa tietojen käsittelyä</li>
                <li>Peruuttaa suostumuksensa (esim. terveystietoihin)</li>
                <li>Tehdä valitus tietosuojavaltuutetulle</li>
              </ul>
            </section>

            <section>
              <p className={`${paragraphClass} font-semibold mb-1`}>Yhteydenotot tietosuojaan liittyen:</p>
              <a href="mailto:mathias.eklund@memassage.fi" className="font-inter text-[14px] md:text-[15px] text-[#152238] underline underline-offset-4 hover:text-[#5A6A7A] transition-colors">
                mathias.eklund@memassage.fi
              </a>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
