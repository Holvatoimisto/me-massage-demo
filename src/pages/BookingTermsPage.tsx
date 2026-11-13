import { Helmet } from 'react-helmet-async';
import { Header } from '@/components/Header';
import { Footer } from '@/components/Footer';

const sectionHeadingClass = 'font-inter text-[16px] font-semibold text-[#152238] leading-[1.5] mb-3';
const paragraphClass = 'font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.8]';
const listClass = 'list-disc pl-5 space-y-1 font-inter text-[14px] md:text-[15px] text-[#1F2937] leading-[1.8]';

export function BookingTermsPage() {
  return (
    <div className="bg-[#F7F5F2] min-h-[100dvh]">
      <Helmet>
        <title>VARAUSEHDOT – Hierontapalvelu</title>
      </Helmet>

      <Header />
      <div className="h-[60px] md:h-[68px]" />

      <main className="px-6 md:px-12 py-14 md:py-20">
        <article className="max-w-[720px] mx-auto">
          <header className="mb-12 md:mb-14">
            <h1 className="font-cormorant text-[30px] md:text-[40px] text-[#152238] leading-[1.2]">
              VARAUSEHDOT – Hierontapalvelu
            </h1>
          </header>

          <div className="space-y-9 md:space-y-10">
            <section>
              <h2 className={sectionHeadingClass}>1. Ajanvaraus</h2>
              <p className={paragraphClass}>
                Ajanvaraus tehdään ensisijaisesti verkossa, puhelimitse tai paikan päällä. Varaus on sitova.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>2. Peruutukset:</h2>
              <ul className={listClass}>
                <li>Ajan voi peruuttaa tai siirtää maksutta viimeistään 24 tuntia ennen varattua aikaa.</li>
                <li>Alle 24 tunnin sisällä tehdyistä peruutuksista veloitamme 50 % palvelun hinnasta.</li>
                <li>Peruuttamattomasta ajasta veloitetaan koko hoidon hinta.</li>
                <li>Akuutissa sairastapauksessa ota meihin yhteyttä puhelimitse.</li>
              </ul>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>3. Saapuminen:</h2>
              <p className={paragraphClass}>
                Saavuthan hoitoon ajoissa. Myöhästyminen lyhentää hoitoaikaa, mutta hinta säilyy ennallaan.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>4. Terveystiedot</h2>
              <p className={paragraphClass}>
                Asiakkaan tulee ilmoittaa mahdollisista sairauksista, lääkityksistä ja muista hoitoon vaikuttavista tekijöistä.
              </p>
            </section>

            <section>
              <h2 className={sectionHeadingClass}>5. Oikeus muutoksiin</h2>
              <p className={paragraphClass}>
                Palveluntarjoajalla on oikeus perua tai siirtää varaus force majeure -tilanteissa.
              </p>
            </section>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  );
}
