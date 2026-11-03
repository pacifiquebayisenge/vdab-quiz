# Plan van aanpak – Ontwikkeling VDAB Game

**Status:** Mijn voorstel voor de ontwikkeling van de volledige game  
**Doel:** Een onderhoudbare, toegankelijke en betrouwbaar uitrolbare game ontwikkelen.

## 1. Doel en scope

Met de quizdemo heb ik de technische mogelijkheden al verkend. Voor de volledige game wil ik eerst samen met de opdrachtgever de functionele eisen, spelregels, gebruikersstromen, acceptatiecriteria en scope bevestigen. In dit document beschrijf ik hoe ik de ontwikkeling zou organiseren en welke technische keuzes ik voorstel. De definitieve planning bepalen we op basis van de bevestigde scope en de beschikbare teamcapaciteit.

## 2. Fase 1 – Functionele analyse en technische voorbereiding

- Ik inventariseer de schermen, spelregels, gebruikersrollen en functionaliteiten van de volledige game.
- We vertalen de functionaliteiten naar user stories met toetsbare acceptatiecriteria en prioriteren ze als must-have, should-have en nice-to-have.
- Ik breng de afhankelijkheden van de externe API in kaart en leg niet-functionele eisen vast rond toegankelijkheid, beveiliging, prestaties en beschikbaarheid.
- Op basis van de analyse werk ik de architectuur uit. Daarna richten we de ontwikkelomgeving in.

### Voorgestelde technische stack

| Onderdeel | Keuze | Waarom |
|---|---|---|
| Framework | Nuxt 4, Vue 3, TypeScript | Bestaande Vue-kennis, serverroutes, typeveiligheid en structuur |
| State management | Pinia | Gedeelde spelstatus overzichtelijk beheren |
| Styling | Tailwind CSS en eventueel SCSS | Consistente, responsieve interface |
| Kwaliteit | ESLint, Prettier | Uniforme codeconventies |
| Lokale checks | Husky, lint-staged | Linting/formatting vóór commits |
| Unit- en componenttests | Vitest, Vue Test Utils | Spelregels en componentgedrag testen |
| End-to-endtests | Playwright | Complete spelersstromen en browsergedrag testen |
| CI/CD | GitHub Actions | Automatische kwaliteitscontroles en builds |
| Deployment | Docker, indien passend bij infrastructuur | Reproduceerbare serverruntime |

### Aanvullende tools – opgenomen in de voorgestelde standaardsetup

| Tool | Toepassing |
|---|---|
| **Storybook** | Centrale componentcatalogus met documentatie, props, slots, varianten en states |
| **Zod** | Runtimevalidatie van externe API-responses en gebruikersinvoer |
| **MSW** | API-responses mocken voor voorspelbare ontwikkel- en testscenario’s |
| **axe-core** | Geautomatiseerde toegankelijkheidschecks, aangevuld met handmatige controles |
| **SonarQube** | Statische codeanalyse en opvolging van kwaliteitsproblemen |
| **Snyk** | Scannen op kwetsbaarheden in dependencies en waar relevant containerimages |
| **Dependabot** | Geautomatiseerde voorstellen voor dependency- en security-updates |
| **Sentry** | Monitoring en diagnose van fouten tijdens runtime |
| **Jira** | Ticketing, user stories, prioriteiten, sprintplanning en backlogbeheer |

Ik neem deze tools op in mijn voorgestelde standaardsetup. We stemmen de concrete integratie, licenties en configuratie af op de bestaande VDAB-infrastructuur en teamafspraken. Ik beschrijf hier mijn keuzes voor het volledige project, niet wat al geïmplementeerd is.

Voor handmatige API-tests gebruiken we waar nodig Postman of Bruno. Ik gebruik OpenAPI-documentatie wanneer die beschikbaar is en Figma voor de afstemming met de aangeleverde ontwerpen.

### Team- en repositoryafspraken

- We documenteren de opstartinstructies in `README.md` en voorzien een `.env.example` zonder geheime waarden.
- We leggen de Node-versie en dependencyversies vast met bijvoorbeeld `.nvmrc` en een lockfile.
- Ik stel afspraken voor rond componentstructuur, naamgeving, Definition of Done en pull-requesttemplates. We stemmen die als team af.
- Ik wil `main` beschermen tegen directe pushes. Wijzigingen verlopen via pull requests met **twee approvals** en verplichte geslaagde CI-checks. Dit is een regel die ik voor het project voorstel.

## 3. Fase 2 – Architectuur en uitwerking

1. Ik deel de functionaliteiten op in features en identificeer herbruikbare Vue-componenten, zoals `QuestionCard`, `AnswerButton`, `GameTimer` en `ScoreBoard`.
2. Ik bepaal welke spelstatus we met Pinia beheren en welke gegevens of controles op de server moeten blijven.
3. Ik definieer de Nuxt-serverroutes en API-contracten. Correcte antwoorden geven we niet vooraf vrij aan de client.
4. **Ik ontkoppel de externe API:** via een adapterlaag in Nuxt valideren we externe responses en zetten we die om naar ons eigen datamodel. Onze componenten werken uitsluitend met dat interne model. We voorzien contracttests en gecontroleerde foutafhandeling. Zo beperken we de impact van wijzigingen, zonder te veronderstellen dat iedere storing vermeden kan worden.
5. We werken loading-, timeout- en foutscenario's uit. Ik visualiseer de datastromen in een architectuurdiagram.
6. Samen met het team vertalen we features naar taken, afhankelijkheden en voorlopige inschattingen.

### Schermanalyse: hergebruik en Storybook

In de aangeleverde ontwerpen herken ik verschillende levels van de Automachanicien-game. Ik heb de schermen voorlopig gegroepeerd volgens hun visuele structuur en mogelijke componenthergebruik. De exacte spelregels, interacties en API-mogelijkheden wil ik nog bevestigen.

| Schermfamilie | Zichtbare voorbeelden | Voorgestelde componenten |
|---|---|---|
| Gedeelde game-omgeving | Vrijwel alle schermen | `GameLayout`, `PlayerPanel`, `GameHeader`, `ProgressBar`, `GameTimer` |
| Multiplechoicevragen | Levels 36–43 en andere quizschermen | `QuizGame`, `QuestionCard`, `AnswerOption`, `SubmitButton` |
| Feedback en voltooiing | Pop-ups bij meerdere levels | `GameModal` met `variant`, titel, bericht, icon-slot en acties |
| Informatieve tussenstappen | Informatieschermen in diverse levels | `InfoScreen`, `InfoCard`, `GameButton` |
| Iconen- en rasterpuzzels | Levels 7, 10, 12 en 13 | `PuzzleGame`, `PuzzleGrid`, `PuzzleTile` |
| Keuzescherm | Automachanicien 29 | `GameChoiceCard` |
| Eindresultaat | Automachanicien 13 | `GameResultScreen` |
| Kaartopdracht | Step 21 | `MapGame` met eigen interactielogica |

**Mijn uitgangspunt voor hergebruik:** wanneer de interface alleen verschilt in tekst, iconen, kleuren, states of knoppen, bouw ik liever één configureerbare component met getypeerde props en slots. Voorbeeld: `GameModal` met `title`, `message`, `variant` en slots voor icoon en acties. We houden afwijkende spelregels in aparte modules, zodat één component niet alle speltypes hoeft af te handelen.

**Architectuur in drie lagen:**
1. `GameLayout`: gedeelde navigatie, spelerinformatie, voortgang en globale layout.
2. Speltypecomponenten zoals `QuizGame`, `PuzzleGame`, `InfoScreen` en `MapGame`.
3. UI-bouwstenen zoals `GameButton`, `GameModal`, `GameTimer`, `AnswerOption` en `GameIcon`.

Ik wil onderzoeken of een gedeelde spelcontroller geschikt is voor voortgang, levelovergangen en score. **Validatie en spelregels houden we per speltype gescheiden.** Welke controles server-side mogelijk zijn, hangt af van de beschikbare externe API.

Ik gebruik **Storybook** als centrale catalogus voor onze gedeelde componenten. We documenteren er props, events, slots, responsive gedrag en toegankelijkheid, en tonen varianten en states zoals `default`, `selected`, `correct`, `wrong` en `disabled`. Zo kunnen developers componenten eenvoudig terugvinden en consistent hergebruiken.

**Datastroom:** Externe API → Nuxt-serverroute + validatie/adapter → intern model → Pinia / Vue-componenten. Antwoordcontrole blijft waar nodig op de server.

## 4. Fase 3 – Implementatie in sprints

- Ik stel sprints van twee weken voor, afhankelijk van de bestaande werkwijze van het team.
- We bepalen per sprint een helder doel en ontwikkelen eerst de belangrijkste end-to-endspelstroom (MVP).
- We verdelen taken volgens expertise, beschikbaarheid en afhankelijkheden. Ik help blockers tijdig zichtbaar te maken en op te lossen.
- We werken met featurebranches, code reviews en overzichtelijke pull requests.
- We schrijven unit-, component- en integratietests tijdens de ontwikkeling, niet pas op het einde.
- Aan het einde van elke sprint demonstreren we werkende functionaliteiten en verwerken we feedback van stakeholders in Jira.

### Mijn voorstel voor de CI/CD-pipeline

Via GitHub Actions laten we bij iedere pull request de volgende controles uitvoeren:

1. We installeren dependencies en controleren linting en formatting.
2. We voeren de TypeScript/Nuxt-typecheck uit.
3. We draaien Vitest-tests (waar nodig met MSW-mocks) en geautomatiseerde axe-core-checks.
4. We voeren Playwright-tests uit met een gestarte testapplicatie.
5. We draaien SonarQube-codeanalyse en een Snyk-beveiligingsscan en bouwen vervolgens de Nuxt-productieversie.
6. We bouwen de Docker-image en starten, als Docker gebruikt wordt, een container voor een healthcheck.
7. Een geslaagde image-build alleen is voor mij onvoldoende bewijs dat de applicatie correct draait.

**Staging, acceptatie en promotie naar productie**

Ik voorzie een afzonderlijke **stagingomgeving** die automatisch wordt bijgewerkt vanuit een `develop`-branch of een expliciet aangeduide releasekandidaat. Een branch is daarbij een codeversie; staging is de werkelijk gedeployde testomgeving. We deployen er de gebouwde Docker-image en controleren niet alleen of de container opstart, maar ook of de belangrijkste gebruikersstromen werken.

In staging testen we de applicatie functioneel en visueel op verschillende browsers (zoals Chrome, Firefox en Safari), besturingssystemen en toestellen (desktop, tablet en smartphone). We combineren geautomatiseerde Playwright-tests met manuele controles. Gevonden fouten registreren we in Jira, waarna we de verbeterde releasekandidaat opnieuw testen.

Pas wanneer alle verplichte controles slagen en **twee aangewezen testgebruikers** de acceptatie bevestigen, stellen we de release voor via een pull request naar de beveiligde `main`-branch. Daarnaast blijven **twee code-reviewgoedkeuringen** en de verplichte CI-checks vereist voordat we mergen. Testgebruikersgoedkeuring en code review zijn dus twee afzonderlijke kwaliteitscontroles.

Na de merge promoten we bij voorkeur **dezelfde geteste, onveranderde Docker-image** naar productie, in plaats van een nieuwe image met mogelijk andere inhoud te bouwen. We leggen de gebruikte imageversie en release vast.

**Rollback**

Ik bewaar de laatst stabiele productie-image met een vaste versietag of digest en documenteer hoe we die opnieuw deployen. Als een productie-release problemen veroorzaakt, kunnen we terugkeren naar de **laatst goedgekeurde productieversie**. Een succesvolle stagingtest alleen maakt een versie nog niet automatisch geschikt als rollbackdoel.

We kunnen lokaal zonder Docker ontwikkelen met `npm install` en `npm run dev`. Voor de deployment gebruiken we Docker als dit past binnen de bestaande infrastructuur.

## 5. Fase 4 – Finale testing en acceptatie

- We controleren alle functionaliteiten tegen de overeengekomen acceptatiecriteria.
- We voeren regressie-, integratie-, API-, beveiligings- en waar nodig performancetests uit.
- We controleren responsive gedrag, browsercompatibiliteit en WCAG-toegankelijkheid. Daarbij combineren we axe-core met handmatige toetsenbord- en screenreadertests.
- We organiseren gebruikersacceptatietests (UAT) met stakeholders.
- We registreren bugs, lossen blokkerende fouten op en vragen formele releasegoedkeuring.

## 6. Fase 5 – Deployment, monitoring en onderhoud

- We rollen de goedgekeurde versie via CI/CD uit naar de bestaande hostinginfrastructuur. Ik stel Docker voor als dat aansluit op de omgeving.
- Na de uitrol controleren we healthchecks en kritieke gebruikersstromen.
- We monitoren beschikbaarheid, foutmeldingen en prestaties met Sentry.
- Ik voorzie in het releaseplan een rollbackprocedure en duidelijke verantwoordelijkheden bij incidenten.
- We volgen runtimefouten op via Sentry, dependency-updates via Dependabot en beveiligingsmeldingen via Snyk. We plannen patches en verdere verbeteringen in de backlog.

## 7. Voorlopige sprintplanning en tijdsinschatting

Ik stel voor om **per speltype afzonderlijk te ontwikkelen en te testen**. We delen wel de algemene layout, navigatie, knoppen, modals, timers, voortgangsindicatoren en Storybook-componenten. Zo kunnen we elk spelmechanisme afzonderlijk opleveren zonder de gedeelde architectuur te dupliceren.

Ik werk met **sprints van twee weken** en stel onderstaande eerste planning voor. De indeling van de speltypes is voorlopig en wordt na een volledige functionele inventaris en bevestiging van de API-mogelijkheden verfijnd.

| Sprint | Doel en belangrijkste werkzaamheden | Duur | Oplevering |
|---|---|---|---|
| 1 | Requirements verfijnen, Nuxt-setup, CI/CD, API-contracten, adapterlaag en basiscomponenten in Storybook | 2 weken | Technische basis en geprioriteerde backlog |
| 2 | Eerste end-to-end-MVP: spel starten, één vraag ophalen, antwoorden, servervalidatie, feedback en voortgang | 2 weken | Eén volledig speelbare spelstroom |
| 3 | Multiplechoice-speltype verder ontwikkelen, inclusief varianten, timers en antwoordfeedback | 2 weken | Herbruikbare quizmodule |
| 4 | Iconen- en gridpuzzels afzonderlijk ontwikkelen en testen | 2 weken | Speelbare puzzelmodule |
| 5 | Keuze- en interactiespellen afzonderlijk ontwikkelen en testen | 2 weken | Speelbare interactiemodule |
| 6 | Overige specifieke spelmechanieken, waaronder kaartinteracties, uitwerken | 2 weken | Aanvullende speelbare modules |
| 7 | Alle modules integreren met levels, score, spelvoortgang, resultaten en overgangen | 2 weken | Geïntegreerde game en regressietests |
| 8 | Integrale toegankelijkheids-, browser-, performance- en acceptatietests; bugfixes en releasevoorbereiding | 2 weken | Goedgekeurde releasekandidaat en deploymentplan |

**Voorlopige totale doorlooptijd: 8 sprints × 2 weken = 16 weken (ongeveer vier maanden).** Dit is een indicatieve kalenderinschatting, **geen definitieve toezegging**. Ze veronderstelt een team met voldoende capaciteit, tijdige feedback en bruikbare externe API-endpoints. De teamgrootte, de precieze spelregels, het aantal unieke spelmechanieken en de bestaande VDAB-infrastructuur moeten nog worden bevestigd. Analyse, documentatie, reviews en geautomatiseerde tests lopen door alle sprints heen; finale acceptatie en releasevoorbereiding krijgen extra aandacht in sprint 8. De productiedatum hangt ook af van goedkeuringen en deploymentvoorwaarden.

Ik verfijn deze raming samen met het team door per speltype user stories, afhankelijkheden, technische onzekerheden en acceptatiecriteria vast te leggen in Jira. We evalueren na elke sprint de werkelijke voortgang en sturen scope of planning bij wanneer nodig. Als één speltype complexer blijkt, kan het meerdere sprints vragen; eenvoudige modules kunnen parallel ontwikkeld worden als de teamcapaciteit dat toelaat.

## 8. Risicoanalyse

| Risico | Impact | Mitigatie |
|---|---|---|
| Externe API verandert van structuur | Hoog | Adapterlaag, intern datamodel, Zod-validatie en contracttests; afspraken over API-versies indien mogelijk |
| Externe API tijdelijk onbeschikbaar | Hoog | Time-outs, foutmeldingen, gecontroleerde retries en eventueel caching waar verantwoord |
| Onduidelijke of veranderende requirements | Hoog | Acceptatiecriteria bevestigen, prioriteren en wijzigingen expliciet beoordelen |
| Ontwikkeltijd onderschat | Middel | Teaminschattingen, afhankelijkheden, buffers en herplanning per sprint |
| Onvoldoende testdekking | Hoog | Vitest, Vue Test Utils, Playwright en verplichte CI-checks |
| Toegankelijkheidsproblemen | Hoog | WCAG-controles vanaf ontwerp, axe-core en handmatige tests |
| Inconsistente codekwaliteit | Middel | ESLint, Prettier, code reviews en beschermde hoofdbranch |
| Deploymentproblemen | Hoog | Productiebuild, Docker-build en healthchecks, staging en rollback |
| Onbekende teamcapaciteit | Middel | Capaciteit bevestigen vóór definitieve planning |

## 9. Conclusie

Met deze aanpak wil ik de volledige game gestructureerd, onderhoudbaar en toegankelijk ontwikkelen. Ik kies voor een Nuxt-architectuur met herbruikbare componenten, gedocumenteerd in Storybook, en een adapterlaag tussen de externe API en onze eigen applicatie. We werken iteratief in sprints, bewaken de kwaliteit via code reviews en geautomatiseerde controles, en rollen pas uit na testing en acceptatie. Ik neem de verantwoordelijkheid om technische keuzes te onderbouwen, risico’s tijdig te signaleren en de samenwerking binnen het team te ondersteunen.

---

*Dit plan beschrijft mijn voorstel voor de volledige game. De eerder gebouwde quizdemo is de technische verkenning waarop ik verder wil bouwen.*
