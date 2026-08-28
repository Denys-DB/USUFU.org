/* ==========================================================================
   United States Universities For Ukraine — tools.js

   Interactive tools. Load AFTER i18n.js, BEFORE main.js.
   Each module self-checks for its markup, so this file is safe to
   include on every page.

   Contents
   1. Tip of the day            (useful.html)
   2. GPA calculator + gauge    (calculators.html)
   3. Horizontal swipe timeline (timelines.html)
   4. Spine timelines           (leveled timeline pages)
   5. Career pathfinder quiz    (pathfinder.html)
   6. Finances tools            (finances.html)
   7. Countdown to College      (timelines.html)
   8. Aid letter de-coder       (finances.html)
   9. Jargon translator          (college-life.html)
   10. Major pivot assessor     (finances.html)
   11. Ukrainian grade → US GPA (calculators.html)
   12. NMT → SAT/ACT estimator  (calculators.html)
   13. Education record helper  (timeline-builder.html)
   14. Intl financial aid finder (financial-aid-finder.html)
   15. College list match engine (college-list.html)
   16. Net price & I-20 funding gap (funding-gap.html)
   ========================================================================== */

(function () {
  "use strict";

  const T = window.USUFU_I18N ? window.USUFU_I18N.t : function (s) { return s; };

  /* ------------------------------------------------------------------
     1. Tip of the day
        Deterministic pick by day of year — everyone sees the same tip,
        and it changes at midnight. Add new tips to the end of TIPS.
     ------------------------------------------------------------------ */
  const TIPS = [
    "Email a professor like this: short subject line, greet them by name, one clear question, thank you. Five sentences maximum.",
    "Asking for an extension? Ask before the deadline — even one day early completely changes how the request lands.",
    "Take notes by hand in class, then type a summary the same evening. The second pass is what makes it stick.",
    "Save every essay you ever write. Application season is ten times easier with a folder of drafts to reuse.",
    "Ask for recommendation letters at least three weeks early, and attach a one-page list of things you're proud of.",
    "Common App activity descriptions get 150 characters. Start each one with a verb and a number.",
    "SAT practice works best as full-length sittings. One real test on a Saturday morning beats five scattered drills.",
    "Make a serious email address before you apply — your name, not a nickname. Admissions officers notice.",
    "Keep one spreadsheet: every college, deadline, essay prompt, fee and login. Chaos is the real enemy of applications.",
    "Scholarship essay due? Your best college essay is usually 80% reusable — rewrite the intro, not the whole thing.",
    "When you email an admissions office, put your full name and date of birth in the signature — it helps them pull your file in seconds.",
    "If a professor has not replied in a week, send one polite follow-up in the same email thread. Never start a fresh one.",
    "Address teachers as Professor or Dr. until they tell you otherwise. Guessing wrong is the fastest way to look careless.",
    "Reply to acceptance and aid emails within a day, even if it is only to say thank you and that you are reviewing the details.",
    "Build an email signature with your name, school and graduation year before you send a single application message.",
    "Read every email from a university twice before replying. Half of all missed steps are instructions people skimmed past.",
    "Keep a separate inbox folder for each university. When decisions land, you will not be digging through chaos.",
    "Never use slang, emojis or a lowercase i in a message to a school. Write the way you would speak to a stranger you respect.",
    "If English is your second language, run important emails through a grammar checker, then read them aloud once before sending.",
    "When you ask a question by email, offer an answer too. Would Tuesday work beats a blank When are you free.",
    "Put a clear ask in the first line of any email. Busy people decide whether to keep reading in about three seconds.",
    "CC no one unless there is a reason. Adding your parents to a message to admissions can make you look younger, not safer.",
    "If you missed a deadline, email and say so plainly, without excuses. Honesty gets more grace than a clever story.",
    "Save the direct email of every regional admissions officer you meet. One human contact beats ten forms.",
    "When a school emails a form to fill, do it the same day. Momentum is the quiet advantage nobody talks about.",
    "Screenshot every confirmation page and portal receipt. If a system loses your submission, your proof is the whole argument.",
    "Reply-all only when everyone truly needs to see it. Otherwise you are just adding noise to someone's day.",
    "A thank-you note after an interview or a favor takes four sentences and is remembered far longer than it took to write.",
    "Take the official digital SAT practice on the real Bluebook app, not a paper copy. The tool itself is part of the test.",
    "The digital SAT is adaptive — a strong first module unlocks harder, higher-scoring questions in the second. Start sharp.",
    "On the SAT, every question is worth the same. Never burn three minutes on one problem while five easy ones wait.",
    "Learn to flag and skip. On a digital test, the smartest students circle back to hard questions with time to spare.",
    "For SAT Reading, read the question before the passage detail. You are hunting for specific evidence, not admiring the prose.",
    "SAT Math lets you use a calculator throughout, but the fastest students still do simple steps by hand. Speed is fluency.",
    "Memorize the SAT Math reference formulas anyway. Looking them up mid-test costs seconds you will wish you had.",
    "Your SAT superscore combines your best section scores across dates. Retaking to lift one section is a real strategy.",
    "Book your SAT seat weeks early. Test centers near you fill up, and a two-hour commute on test morning helps nobody.",
    "Sleep matters more than one last cram session. A rested brain outscores a tired one that studied an extra hour.",
    "Bring an approved calculator with fresh batteries and a backup. Test day is the wrong time to discover a dead screen.",
    "The ACT is faster per question than the SAT. If you read quickly and hate lingering, take a practice ACT and compare.",
    "The ACT has a Science section that is really about reading graphs, not memorizing biology. Practice the format, not facts.",
    "Send official scores only to schools that require them. Some are test-optional, and one clear-eyed choice can help you.",
    "Test-optional does not mean test-blind. If your score is strong for a school, sending it still helps your case.",
    "Register for the TOEFL or IELTS as early as your target scores allow. Retakes take time you may not have in the fall.",
    "For TOEFL Speaking, use templates for structure but fill them with real, specific detail. Graders reward organized answers.",
    "In TOEFL Writing, one clear thesis and two well-built paragraphs beat a rushed essay that tries to say everything.",
    "Practice English listening with real lectures at natural speed, not slowed-down clips. The test will not slow down for you.",
    "The Duolingo English Test is cheaper, at home, and accepted by many US schools. Check your list before booking a pricier exam.",
    "Read one page of academic English aloud every day. Your Speaking score climbs when your mouth stops tripping on long words.",
    "Keep a running vocabulary list of words you meet twice. The second sighting means it is common enough to learn.",
    "For any English test, know exactly which score each of your schools requires. Aim two points above the highest, for safety.",
    "An AP or IB exam can turn into real college credit — sometimes a whole semester of it. Check each school's credit policy.",
    "Highly selective universities often grant placement but little credit for AP scores. Public flagships are far more generous.",
    "Register for AP exams in the autumn, months before you sit them. Late registration carries a fee and sometimes no seat.",
    "For IB, your Extended Essay is a genuine research paper. Treat it as writing practice for the personal statement to come.",
    "A 3 on an AP exam is a pass, but many colleges only grant credit for a 4 or 5. Know the number your school actually rewards.",
    "Report your best AP and IB scores on the Common App, and let weaker ones go. You choose what to self-report.",
    "If your school offers no AP or IB, colleges know. They read you against your own school's options, not someone else's.",
    "Start the Common App account in the summer before senior year. The essay is easier when it is not competing with deadlines.",
    "On the Common App, one main essay goes to every school, but supplements are per-college. Budget time for the supplements.",
    "List activities on the Common App by importance to you, not by chronology. The reader's eye lands on the top three.",
    "The additional information box exists for real context — an illness, a gap, a disruption. Use it for facts, not for a second essay.",
    "Fill the Common App honors section even if you feel modest. A regional olympiad or a scholarship belongs there.",
    "Proofread your Common App in the preview PDF, not the web form. Formatting breaks in ways the editor hides.",
    "Apply to a balanced list: a few reach schools, several matches, and at least two safeties you would happily attend.",
    "A safety school is only a safety if you can afford it and would truly go. A place you cannot pay for is not a backup.",
    "Early Action lets you apply early and hear early without a commitment. It signals interest at no cost — use it where you can.",
    "Early Decision is binding: get in and you must attend. Only apply ED to a school you can afford and love above all others.",
    "Submit applications a few days before the deadline. Portals crash at midnight when thousands hit submit at once.",
    "After you apply, check each portal for a document checklist. A missing transcript can quietly stall your whole file.",
    "Your personal essay is about you, not your hero or your country. Admissions want to meet the person behind the achievements.",
    "Start the essay with a scene, not a summary. Put the reader inside a moment before you explain what it meant.",
    "Show one specific story deeply rather than five stories briefly. Depth is what a memorable essay is made of.",
    "Cut the first paragraph of your first draft. The real beginning is usually hiding in the second one.",
    "Read your essay aloud. Every place your tongue stumbles is a sentence a stranger will stumble over too.",
    "Avoid the thesaurus. An honest word you own beats an impressive word you borrowed for one sentence.",
    "Answer the actual prompt. A beautiful essay about the wrong question still misses the mark.",
    "Let one trusted person read your essay, not ten. Too many editors sand away the voice that makes it yours.",
    "The last line should land. End on an image or a turn of thought, not a moral summary of what you just wrote.",
    "Write the supplement about why this school as if the reader will quiz you. Name real courses, professors and programs.",
    "Never reuse a why us essay with the college name swapped. Readers spot a recycled paragraph instantly.",
    "If a prompt asks about community, define which community and why it shaped you. Vague warmth reads as filler.",
    "Save every draft of every essay. The version you cut a paragraph from often holds the line you need for another prompt.",
    "Ask for recommendation letters at least three weeks early, and a month before deadlines is kinder still.",
    "Give each recommender a one-page sheet of what you are proud of. You are making it easy to write you a specific letter.",
    "Choose recommenders who taught you recently and know your growth, not just the teacher who gave the highest grade.",
    "Ask in person or by a warm email, never through a form. A recommendation is a favor, and favors are asked with care.",
    "Waive your right to see recommendation letters on the Common App. Schools trust a letter more when it stays confidential.",
    "Send your recommenders the deadlines and a gentle reminder a week before. You are managing the project, kindly.",
    "Thank every recommender after they submit, and again when you are admitted. They spent unpaid hours on your future.",
    "A recommendation from someone who watched you struggle and improve beats one from someone who only saw you succeed.",
    "Depth beats a long list of activities. Four years in one thing you led says more than twelve clubs you visited once.",
    "Colleges look for impact, not titles. What changed because you were there matters more than the word president.",
    "Start something small and real rather than joining something large and passive. A project you built is a story you own.",
    "Quantify your activities. Tutored 20 students weekly says more than helped with tutoring.",
    "Summer is a canvas, not a void. A job, a project, a course, or caring for family all count as a real answer to what you did.",
    "An unglamorous job — a cashier, a waiter, a farmhand — shows responsibility that admissions genuinely respect.",
    "Keep a simple log of your activities as they happen. In senior year you will not remember the hours or the details.",
    "Leadership is not a badge, it is a behavior. Organizing five people around one goal is leadership worth writing about.",
    "If you care about one cause, go deep on it across years. A consistent thread is more convincing than scattered good deeds.",
    "Turn a hobby into evidence. A photography Instagram, a coding project on GitHub, a blog — proof beats a claim.",
    "Complete the FAFSA as soon as it opens each year, even if you think you will not qualify. Some aid is first come, first served.",
    "Many private universities require the CSS Profile on top of the FAFSA. Check each school, because they cost real money to submit.",
    "International students often cannot file the FAFSA, but many schools have their own aid forms. Ask each admissions office directly.",
    "Search for universities that are need-blind and meet full need for internationals. That combination changes what is possible.",
    "A university's sticker price is rarely what you pay. Run the net price calculator on each school's site before you rule it out.",
    "Gift aid — grants and scholarships — never has to be repaid. Loans do. Learn to read which is which in every offer.",
    "When you compare aid letters, subtract loans and work-study from the total. Only grants truly lower the price.",
    "Apply for small scholarships too. Ten awards of 500 dollars spend exactly like one award of 5000.",
    "Local scholarships have far less competition than national ones. Ask your school counselor for the community list.",
    "Read every scholarship's eligibility twice before you spend an evening applying. Half of all rejections are missed requirements.",
    "Meet scholarship deadlines to the hour. Aid money runs out, and a late perfect application loses to an on-time good one.",
    "Ask each university whether outside scholarships reduce your grants or your loans. The answer changes how much you truly gain.",
    "Keep one spreadsheet of every scholarship: name, amount, deadline, essay prompt and status. Chaos is the enemy of aid.",
    "Merit scholarships often come automatically with admission. Applying early can put you in the running for the biggest ones.",
    "If your family's finances changed this year, email the aid office and ask about a professional judgment review. It exists for this.",
    "A work-study award is money you earn, not money you are given. Budget it as a part-time job, because that is what it is.",
    "Never pay a fee to apply for a scholarship. Legitimate awards cost you effort, never money.",
    "Build your college list around fit, not rank. The best school is the one where you will thrive and graduate, not the highest name.",
    "For every reach school, add a match and a safety. A list of ten reaches is a plan to be disappointed.",
    "Research a university beyond its homepage. Read the course catalog, the department pages and the student newspaper.",
    "Class size, advising and graduation rate tell you more about your four years than a prestige ranking ever will.",
    "Check whether your intended major is impacted or capped. At some schools, getting into the university is only half the battle.",
    "Look up where a program's graduates end up. A department's job and grad-school outcomes are a fair test of its promises.",
    "Location is a lifestyle choice. A city campus and a rural one are two different four-year lives, not just two dots on a map.",
    "Fly-in programs and virtual tours exist for a reason. Seeing a campus, even on a screen, sharpens a vague list fast.",
    "Demonstrated interest matters at some schools. Open their emails, attend a webinar, and they will notice you noticed them.",
    "Do not apply somewhere only because it is famous. Apply because you can name three specific things you want to do there.",
    "An F-1 visa is the standard student visa for the US. Your university issues the I-20 that lets you apply for it.",
    "You cannot start the visa process until a school admits you and sends the I-20. Getting admitted early buys you visa time.",
    "Pay the SEVIS fee before your visa interview and bring the receipt. No receipt can mean no interview.",
    "Book your visa interview the moment you have your I-20. Appointment slots at busy consulates disappear months ahead.",
    "At the visa interview, show ties to home and a clear study plan. The officer wants a genuine student, not a vague one.",
    "Keep your visa answers short and honest. The interview is often two minutes, and rambling rarely helps your case.",
    "Carry originals and copies of everything to the interview: I-20, passport, financials, admission letter. Order beats searching.",
    "Prove you can fund the first year. Consular officers want to see the money that matches the number on your I-20.",
    "Never let your passport expire within six months of travel. Renew it early, because embassy queues do not care about your deadline.",
    "Print your I-20, visa and admission letter for the airport. US border officers may ask for paper, not a phone screen.",
    "Enter the US no more than 30 days before your program start date. The F-1 rule is strict, and airlines will check.",
    "Keep your I-20 signed and current every year. An unsigned travel page can strand you outside the country.",
    "If your name is spelled differently across your passport, transcript and application, fix it before it becomes a visa problem.",
    "Ukrainian transcripts usually need certified English translations for US applications. Start them early — good translation takes time.",
    "Some universities require a course-by-course credential evaluation from a service like WES. Check each school before you pay for one.",
    "Your Ukrainian 12-point grades do not map one-to-one onto a US 4.0. Let the calculator convert them, then explain if asked.",
    "An apostille certifies your documents for use abroad. Ask each university whether they need one before you chase the stamp.",
    "Keep scanned, dated copies of every original document in the cloud. Reissuing a Ukrainian record from overseas is slow.",
    "When a form asks for your address, use one you will still control in a year. Application mail can arrive months later.",
    "Mind the time zone when a deadline says 11:59 pm. A US Eastern deadline can be the early hours of the next day in Ukraine.",
    "If war or displacement disrupted your schooling, say so briefly in the additional information box. Context is not an excuse, it is a fact.",
    "Universities with strong international offices answer email fast. A responsive office now often means good support later.",
    "Your NMT results can be read as an SAT or ACT range with the estimator, but always send the score a school actually asks for.",
    "Keep both Ukrainian and English versions of your name consistent across email, applications and payment. Mismatches cause real delays.",
    "Ask admitted international students from Ukraine how they handled banking, housing and arrival. Their map saves you months.",
    "Currency swings change what a US year costs in hryvnia. Budget with a margin, not with today's exact exchange rate.",
    "Some scholarships are set aside specifically for Ukrainian and displaced students. Ask each aid office whether any apply to you.",
    "Treat an alumni interview as a conversation, not an exam. They are volunteers who want to like you, so let them.",
    "Research the interviewer's university before you meet. Having two thoughtful questions ready is half the impression you make.",
    "Arrive early to any interview, in person or online. Log in five minutes ahead and test your camera and mic before it starts.",
    "Prepare a two-minute answer to tell me about yourself. It is asked almost every time, and rambling wastes your best moment.",
    "In an interview, use short stories to answer questions. A specific example is remembered long after an opinion is forgotten.",
    "Have one genuine question ready about student life. What surprised you here works far better than what is your ranking.",
    "Dress one level above what you think is needed for an interview. Being slightly too neat never cost anyone an offer.",
    "After an interview, email a short thank-you within a day. It is rare enough that doing it makes you stand out.",
    "It is fine to pause and think in an interview. A considered answer after three seconds beats a fast, empty one.",
    "Study in 50-minute blocks with real breaks. Your focus fades long before your willingness to keep sitting there does.",
    "Teach a concept to an empty room. If you cannot explain it out loud, you have not learned it yet.",
    "Review new material within a day, then a week, then a month. Spaced repetition beats one long night every single time.",
    "Do the hardest task first, when your mind is fresh. Willpower is a morning resource that thins out by evening.",
    "Turn your notes into questions and quiz yourself. Retrieving an answer builds memory far better than rereading it does.",
    "Sit near the front of a class you find hard. Proximity quietly raises your attention and your grade.",
    "Read the assignment rubric before you start, not after. Knowing how you are graded is half of earning the marks.",
    "When you get a test back, study your mistakes harder than your score. The wrong answers are the syllabus for next time.",
    "Keep one master calendar for every deadline in your life. A due date living only in your head is a due date you will miss.",
    "Break a big project into small dated steps. Write the outline Monday feels possible in a way write the paper never does.",
    "Start assignments the day they are given, even for ten minutes. Beginning early kills the panic that waits at the deadline.",
    "Protect one block of deep work a day with no phone. An hour of true focus outproduces a whole scattered afternoon.",
    "Put your phone in another room while you study. Out of reach beats face-down, because willpower loses to a buzz.",
    "Plan tomorrow tonight in three lines. A short list written the evening before turns a chaotic morning into a calm one.",
    "Say no to the fourth club if it costs your sleep. Doing three things well beats doing six things badly.",
    "Batch similar tasks together. Answering all your emails once a day is faster than answering each the moment it arrives.",
    "Guard your sleep like a grade, because it is one. A rested week of study beats a brilliant, sleepless night before an exam.",
    "Move your body most days, even a walk. Exercise is not time taken from studying, it is what makes studying work.",
    "Ask for help early, before a small confusion becomes a failing grade. Every professor prefers a question in week two.",
    "Perfectionism is procrastination in a nicer outfit. A finished draft you can fix beats a perfect one that does not exist.",
    "Build one habit at a time. Trying to change everything in September is why most resolutions are gone by October.",
    "Talk to someone when the pressure gets heavy. Carrying it alone does not make you stronger, it makes you slower.",
    "Compare yourself only to who you were last year. Someone else's highlight reel is not your measuring stick.",
    "Rejection from one school is information, not a verdict on your worth. The right place is still out there, and it is looking too.",
    "Celebrate the small wins — a submitted application, a good draft, a returned email. The long road is walked one step at a time.",
    "Go to office hours in the first two weeks, before you need anything. A professor who knows your face is an ally later.",
    "Learn the campus map before classes start. Being lost on day one costs you the calm you will want that morning.",
    "Register for classes the minute your enrollment window opens. Popular sections fill in minutes, not hours.",
    "Read the syllabus for every course in week one. Every deadline, rule and grade weight is written there for you.",
    "Find the writing center and the tutoring center early. The strongest students use them, which is part of why they are strong.",
    "Introduce yourself to two people in every class. A single study partner can carry you through a hard semester.",
    "Buy or rent textbooks used, and check the library first. New textbooks are a tax on students who did not shop around.",
    "Learn to use your university library's databases. What you pay tuition for includes research tools worth thousands.",
    "Back up every paper to the cloud as you write. A dead laptop the night before is a story that ends better with a backup.",
    "Keep your student ID and important documents in one fixed place. The five minutes of searching always come at the worst time.",
    "Join one club that has nothing to do with your major. The friends and the balance are worth the couple of hours.",
    "Eat and sleep on a schedule even when the week is wild. Your brain runs on routine more than on motivation.",
    "Learn to cook three cheap meals. It saves money, saves time, and beats the dining hall by the second month.",
    "Open a local bank account in your first weeks. Paying fees to use a foreign card adds up faster than you expect.",
    "Track your spending for one month before you decide you cannot afford something. Most budgets leak in small, invisible ways.",
    "Build an emergency fund, even a tiny one. A hundred dollars set aside turns a crisis into an inconvenience.",
    "Understand your student loans before you sign. Know the interest rate, the total, and what the monthly payment will be after you graduate.",
    "Borrow only what you truly need, not the maximum offered. Every dollar you skip now is a dollar you do not repay with interest later.",
    "A part-time campus job is worth more than its wage. It builds a routine, a reference and a network you cannot buy.",
    "Keep receipts and records for anything tax or visa related. The paperwork you save today answers a question you cannot predict.",
    "Learn how credit works before you get a card. In the US, a good credit history quietly shapes your rent, loans and future.",
    "Never spend to match your wealthiest classmate. The people worth knowing do not measure you by your phone or your shoes.",
    "Ask about student discounts everywhere — software, transit, museums, food. Your ID is a coupon you already paid for.",
    "Do at least one internship before you graduate, even an unpaid or small one. Experience is the line on a resume that talks.",
    "Build a simple, honest LinkedIn profile in your first year. The network you grow slowly is the one that helps you later.",
    "When someone helps your career, follow up and stay in touch. A network is a garden, not a vending machine.",
    "Say yes to informational chats with people in fields you like. Fifteen minutes of their story can redraw your plan.",
    "Keep a running document of your accomplishments. When a resume or scholarship is due, you will not be starting from a blank page.",
    "Learn one practical skill outside class — coding, design, a language, spreadsheets. Skills open doors that grades alone cannot.",
    "Ask a professor about research in your field. Undergraduate research is a door many students never think to knock on.",
    "Attend career fairs even in your first year, just to watch. Knowing how the room works makes you calm when it counts.",
    "Practice explaining your work to someone outside your major. The ability to be understood is a career skill in itself.",
    "A mentor is worth more than a hundred articles. Find one person a few steps ahead and ask them good questions.",
    "Register your arrival with your university's international office within the required days. Falling out of status is a paperwork problem you never want.",
    "Learn where the campus health center is before you are sick. Knowing the number in advance is half the cure.",
    "Sign up for your school's emergency alert system on day one. Two minutes now can matter enormously later.",
    "Keep digital and paper copies of your passport, visa and I-20 in two separate places. If one is lost, the other saves your week.",
    "Set strong, unique passwords for your school and financial accounts, and use a password manager. One breach should not become five.",
    "Photograph your important documents and email them to yourself. A searchable copy has rescued more trips than any checklist.",
    "Learn the local emergency number and your consulate's contact before you need either. Preparedness is quiet, and it works.",
    "Keep a small folder of vaccination and medical records. US universities often require proof, and originals are hard to get from abroad.",
    "Write down your professors' office hours and locations in one place. The help is there, but only if you can find it.",
    "Set two alarms for anything that truly cannot be missed. Redundancy is not paranoia when a flight or an exam is on the line.",
    "Check your student email every single day. Universities assume that if they emailed you, you know — even if you never opened it.",
    "Read the fine print on housing and meal plan contracts. What you sign in July is what you live with all year.",
    "Learn the difference between withdrawing and failing a course before you ever consider either. A W and an F are not the same on a transcript.",
    "Keep your professors' expectations in writing. When a grade seems wrong, a polite reference to the syllabus settles it fastest.",
    "Answer every no-reply reminder as if a person sent it. Behind most automated emails is a deadline that is very real.",
    "Reply to roommate messages before you arrive. The first impression of a good roommate is often made weeks before move-in.",
    "Learn to write a clear one-paragraph message. Half of adult life is asking for something without wasting anyone's time.",
    "Keep your calendar and your to-do list in the same place. Two systems is the same as no system when the week gets hard.",
    "When you feel behind, write down everything you owe. A list on paper is always smaller and calmer than the pile in your head.",
    "Do the boring administrative task before it grows teeth. Forms, fees and forwarding addresses only get worse with waiting.",
    "Learn to ask a specific question. I do not understand gets a shrug, but I am stuck on step three gets an answer.",
    "When you move, update your address everywhere the same day. A single missed letter can be a fine, a fee, or a lost check.",
    "Keep one emergency contact who knows your plans and documents. Someone should always be able to find you if a system cannot.",
    "Save the confirmation number for every payment, booking and application. The number is the proof, and proof ends arguments.",
    "Turn on two-factor authentication for your email first. It is the account that can reset all the others, so protect it most.",
    "Do not sign anything you have not read to the end. The important clause is almost always near the bottom.",
    "Ask what happens if I need to change this before you commit to a plan, a lease or a course. Flexibility is worth knowing in advance.",
    "When in doubt about a rule, ask the office that made it, not a forum. One official answer beats ten confident strangers.",
    "Keep a small buffer of time and money for the thing you did not plan for. Something always comes up, and it always costs.",
    "Write your goals down where you will see them. A goal in your head is a wish, and a goal on the wall is a plan.",
    "Choose your major for the work it involves day to day, not only the job it might lead to. You will spend years doing the work.",
    "It is normal to change your major. Most students do, and switching early is far cheaper than switching late.",
    "Take one course outside your comfort zone each year. The class you were nervous about is often the one you remember.",
    "Meet your academic advisor every semester, not just when there is a problem. A plan reviewed on time avoids a crisis later.",
    "Map your degree requirements in your first year. Knowing the whole path keeps you from a surprise fifth-year course.",
    "A minor can be a small, strategic addition, not a second major. A few extra courses can sharpen how the world sees your degree.",
    "Do not overload your first semester. Adjusting to a new country and a new system is itself a full course.",
    "Learn what a prerequisite chain is for your major. One missed early course can push a whole sequence back a year.",
    "Sit in on a class before you commit to it if your school allows. Ten minutes tells you what the catalog cannot.",
    "Keep every graded assignment until the term ends. A grade dispute is won with paper, not with memory.",
    "Ask upper-year students which professors to seek and which sections to avoid. Their map of the department is priceless.",
    "When you pick between two courses, choose the professor over the topic. A great teacher can make any subject worth it.",
    "Read one book a month outside your field. A wide mind writes better essays and asks better questions.",
    "Learn to skim and to read closely, and to know which a text needs. Reading everything slowly is how students run out of time.",
    "Summarize each lecture in three sentences before you leave the room. If you cannot, you have found what to review tonight.",
    "Form a study group of three or four, not ten. Small groups work, and large ones become social hours with snacks.",
    "Explain your reasoning on math and science problems, not just the answer. Understanding the path is what survives the exam.",
    "Keep your notes in one system all year, digital or paper, not both. Consistency is what makes notes findable in April.",
    "Before an exam, redo the hardest homework problems from scratch. Familiar problems on a blank page reveal what you truly know.",
    "On any exam, read every instruction before you write. The points lost to misread directions are the saddest points to lose.",
    "Budget exam time by the marks. Spend the most minutes where the most points live, and move on when the clock says so.",
    "When you finish early, do not leave. Rereading one section usually finds one careless mistake worth a whole grade step.",
    "After results come out, ask what a top answer looked like. Seeing the standard is how you reach it next time.",
    "Send one thoughtful email to a professor whose class you loved. A real connection is worth more than a perfect transcript line.",
    "Learn to accept feedback without defending yourself. The fastest way to improve is to hear the criticism all the way through.",
    "Keep a folder of kind words — thank-yous, good grades, notes of encouragement. On a hard day, evidence beats a pep talk.",
    "Write down why you started when you began this journey. On the days it feels pointless, your own words will remind you.",
    "Do the small right thing when no one is watching. Integrity is built in the moments that never make it onto an application.",
    "When you succeed, remember who helped you get there and tell them. Gratitude spoken out loud comes back around.",
    "Progress is rarely a straight line. A hard week is not a failed plan, it is a normal part of a long climb.",
    "Rest is part of the work, not a reward for finishing it. A mind that never stops does not think as clearly as one that does.",
    "Choose your five closest people carefully in a new place. You become the average of the people you spend your time with.",
    "Keep a promise to yourself once a week, however small. Trusting your own word is the foundation of every bigger goal.",
    "Learn to be alone without being lonely. The quiet hours are where a lot of real thinking and growth happen.",
    "Write a letter to yourself for a year from now. In twelve months, few things are more useful than your own past honesty.",
    "When you help a student a year behind you, you finish learning the thing you are teaching. Passing it on completes it.",
    "Update your resume every time something changes, not once a year. A living document is never a last-minute scramble.",
    "Keep the confirmation email for every visa, flight and housing booking in one labeled folder. The day you need it, you will be grateful.",
    "Learn to read a contract's cancellation terms first. Knowing how to leave is part of deciding whether to enter.",
    "Ask about health insurance the moment you accept an offer. In the US, a single visit uninsured can cost more than a course.",
    "Set your phone to the correct time zone the day you decide to apply abroad. A missed deadline over one hour is a cruel way to lose.",
    "Keep some cash in the local currency for your first days in a new country. Cards fail at the worst possible moments.",
    "Learn the campus shuttle and public transit before your first week. Getting somewhere on time starts with knowing the route.",
    "Write your emergency contacts on paper and keep it in your wallet. A dead phone should never mean no one can be reached.",
    "Confirm your housing in writing before you fly. Arriving to a lease that fell through is a problem best avoided from afar.",
    "Ask your university about arrival and orientation dates early. Booking a flight before you know them can cost you a change fee.",
    "Keep a checklist for the week before you travel: documents, money, insurance, address, contacts. Calm is a list, checked twice.",
    "Learn to say I do not know, but I will find out. It is more trusted than a confident guess that turns out wrong.",
    "Return what you borrow, on time and in good shape — books, tools, money, favors. A reputation for reliability opens quiet doors.",
    "Under-promise and over-deliver on anything you commit to. The habit builds a name that walks into rooms ahead of you.",
    "When you make a mistake, own it fast and fix it faster. People forgive errors far more easily than excuses.",
    "Keep a beginner's mind in a new country. The willingness to ask a basic question is what turns a stranger into a local.",
    "Learn three phrases of kindness in every language around you. Thank you in someone's own tongue opens more than any resume.",
    "Write things down the moment they are decided. The clearest memory is dimmer than the shortest note.",
    "When two paths look equal, choose the one that scares you a little. Growth lives just past the edge of comfortable.",
    "Read your acceptance letter slowly and let it land. You worked for this, and a moment of pride is fuel for the next climb.",
    "Keep your first rejection. One day it will be the proof that a no was not the end of your story.",
    "Ask for what you want clearly and early. Most doors that stay closed were simply never knocked on.",
    "Finish what you start this year, even the small things. A habit of completion is the quiet engine behind every big result.",
    "Learn to wait well. Between applying and hearing back, the students who keep building are the ones ready when the yes arrives.",
    "When you finally arrive, look up on your first day and remember how far you came. Then get to work, because the next chapter starts now.",
    "Save every version of your application in a dated folder. Next year's applicant — maybe a sibling or a friend — will thank you for the map.",
    "Read the confirmation, not just the subject line. The details that matter are usually one scroll below the word Congratulations.",
    "Keep your questions short and your gratitude long. It is the fastest way to be someone people want to help twice.",
    "When a plan fails, change the plan, not the goal. The destination can stay fixed while every road to it is negotiable.",
    "Do the thing you are avoiding for just five minutes. Starting is the hard part, and five minutes almost always becomes more.",
    "Keep learning after the acceptance arrives. The offer is the start line, not the finish, and the real work is only beginning.",
    "A waitlist is not a no. Send a short letter of continued interest, name one new achievement, and say you would enroll if admitted.",
    "If you are deferred from an early round, treat it as a second chance. Update the school with fall grades and one strong new item.",
    "Apply for a Common App fee waiver if the cost is a barrier. It is built in, confidential, and costs you nothing to request.",
    "Ask about SAT and ACT fee waivers through your school counselor. If you qualify, they can cover college application fees too.",
    "Your school sends a mid-year report with your fall senior grades. Keep those grades up, because colleges genuinely read it.",
    "Senioritis is real and it shows on the final transcript. An admission can be revoked, so finish the year the way you started it.",
    "You may hold only one enrollment deposit. Depositing at two schools to keep your options open can cost you both offers.",
    "Enrollment and housing deposits have their own deadlines, often before classes. Miss the housing date and you may lose your room.",
    "An F-1 student may work on campus up to 20 hours a week during term. Know the limit before you take a second shift.",
    "Off-campus work on an F-1 visa needs authorization like CPT or OPT. Never work off campus without checking with your international office first.",
    "You will likely need a US Social Security Number once you have a campus job. Your international office walks you through the application.",
    "Most F-1 students must file IRS Form 8843 every year, even with no income. It is short, it is required, and it is easy to forget.",
    "Learn the add and drop dates for your term. Dropping a course in the first week is free and invisible; dropping late is neither.",
    "Some schools let you take one class pass or fail. Use it for a tough elective to protect your GPA, never for a major requirement.",
    "Read the emails from the registrar and the bursar closely. One is about your courses and the other about your bill — both bite if ignored.",
    "Do not double-book your enthusiasm. Applying to twenty schools well is impossible, so cut the list to what you can do with care.",
    "Cite your sources properly from your very first paper. A citation habit built early keeps you far from an integrity hearing.",
    "Learn one citation style your department uses and keep a reference guide open while you write. Small format errors add up to lost marks.",
    "Group projects are graded on the result, not the drama. Volunteer to own the schedule, and you will quietly steer the whole thing.",
    "Prepare a slide deck the night before, then present it aloud once to a wall. The second run is where the nerves leave.",
    "A US winter is colder than most photos suggest. Buy one real coat and waterproof boots before your first November, not during it.",
    "Get a local phone plan in your first week. A working number is how banks, jobs and new friends actually reach you.",
    "Homesickness peaks around week three, when the novelty fades. Plan a call home and one small tradition to carry you through it.",
    "Culture shock is normal and temporary. Give yourself a full semester before you judge whether a place is right for you.",
    "Learn where the counseling center is and that using it is ordinary. The strongest students ask for support before they are drowning.",
    "Placement tests in math or language decide your first courses. Take them seriously, because starting a level too high is a rough term.",
    "Ask when you must declare your major. At many schools you have a year or two, and rushing the choice helps no one.",
    "Keep your enrollment status full-time. Dropping below the required credits can quietly break your F-1 visa standing.",
    "A US driver's license or state ID makes daily life easier and travel smoother. Ask your international office how to apply as a student.",
    "Learn the laundry, the meal swipes and the mailroom in your first week. The small systems are what a smooth semester is built on.",
    "Keep your banking simple at first: one checking account, one card, no surprises. Complexity is the enemy of a new student's budget.",
    "When you get an aid offer, note the renewal conditions. A scholarship that needs a minimum GPA is a scholarship you must keep earning.",
    "Ask each school whether merit aid is renewable for four years or just the first. The difference is tens of thousands of dollars.",
    "Write your why major essay about a specific moment you got curious, not about the salary. Curiosity reads as genuine, and pay does not.",
    "Supplemental prompts about diversity want your real perspective, not a performance. Write what only you could write.",
    "When a school offers an optional essay, treat it as required. Optional is where interested applicants quietly separate from the rest.",
    "Keep your list of extracurricular hours honest. An inflated number that a recommender cannot back up costs more than it gains.",
    "Practice your handwriting for any exam still done on paper. A grader who cannot read your answer cannot give you the marks.",
    "Learn to take a screenshot, save a PDF, and scan a document with your phone. These three small skills solve a hundred admin problems.",
    "Set a weekly time to check every application portal. Schools post requests there that never reach your inbox.",
    "Keep one trusted adult in the loop on your applications — a parent, teacher or counselor. A second set of eyes catches missed steps.",
    "When the whole process feels too big, do the next single task and nothing more. A year of applications is won one small action at a time.",
    "The night before a test, pack your bag and lay out your documents. Forgotten IDs are made by morning decisions, not evening ones.",
    "Learn the exact word or character limit for every essay and hit it. Going over reads as not respecting the instructions.",
    "When you research a scholarship, note who funds it and why. Tailoring one paragraph to their mission lifts an ordinary application.",
    "Keep a two-line note on every college you research: what you liked and what worried you. In April, that note decides for you.",
  ];

  const tipText = document.getElementById("tip-text");

  if (tipText) {
    const now = new Date();
    const dayOfYear = Math.floor((now - new Date(now.getFullYear(), 0, 0)) / 86400000);
    const index = dayOfYear % TIPS.length;
    tipText.textContent = T(TIPS[index]);
    document.getElementById("tip-index").textContent =
      String(index + 1).padStart(2, "0") + " / " + String(TIPS.length).padStart(2, "0");
  }

  /* ------------------------------------------------------------------
     2. GPA calculator
        Built to fit real schools, not one textbook:
        - base scale: 4.0, 4.3 (A+ counts extra) or 100-point
        - course types (Regular / Honors / AP·IB·DE) with
          school-editable bonuses — +0.5/+1.0 by default, but a
          school that gives +0.7 just types 0.7
        - weighted AND unweighted GPA computed side by side
        - single-year or cumulative four-year mode
     ------------------------------------------------------------------ */
  const gpaCalc = document.getElementById("gpa-calc");

  if (gpaCalc) {
    const GRADES = ["A+", "A", "A-", "B+", "B", "B-", "C+", "C", "C-", "D+", "D", "D-", "F"];

    // Base (unweighted) points per scale. 100-point uses band midpoints.
    const SCALES = {
      "4.0": { max: 4.0, decimals: 2, points: { "A+": 4.0, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0 } },
      "4.3": { max: 4.3, decimals: 2, points: { "A+": 4.3, "A": 4.0, "A-": 3.7, "B+": 3.3, "B": 3.0, "B-": 2.7, "C+": 2.3, "C": 2.0, "C-": 1.7, "D+": 1.3, "D": 1.0, "D-": 0.7, "F": 0 } },
      "100": { max: 100, decimals: 1, points: { "A+": 98.5, "A": 95, "A-": 91.5, "B+": 88.5, "B": 85, "B-": 81.5, "C+": 78.5, "C": 75, "C-": 71.5, "D+": 68.5, "D": 65, "D-": 61.5, "F": 50 } },
    };

    // Default course-type bonuses per scale (schools can edit them)
    const DEFAULT_BONUS = {
      "4.0": { honors: 0.5, ap: 1.0 },
      "4.3": { honors: 0.5, ap: 1.0 },
      "100": { honors: 5, ap: 10 },
    };

    const TYPES = ["Regular", "Honors", "AP / IB / DE"];
    const YEARS = ["Freshman", "Sophomore", "Junior", "Senior"];

    const scaleSelect = document.getElementById("gpa-scale");
    const honorsInput = document.getElementById("gpa-honors-bonus");
    const apInput = document.getElementById("gpa-ap-bonus");
    const modeTabs = gpaCalc.querySelectorAll(".mode-tab");
    const yearTabsWrap = document.getElementById("year-tabs");
    const rowsWrap = document.getElementById("gpa-rows");
    const addBtn = document.getElementById("gpa-add");
    const weightedEl = document.getElementById("gauge-weighted");
    const unweightedEl = document.getElementById("gauge-unweighted");
    const letterEl = document.getElementById("gauge-letter");
    const needle = document.getElementById("gauge-needle");

    let mode = "single";
    let activeYear = 0;
    const years = YEARS.map(function () {
      return [
        { name: "", grade: "A", credits: 1, type: 0 },
        { name: "", grade: "A", credits: 1, type: 0 },
        { name: "", grade: "A", credits: 1, type: 0 },
      ];
    });

    function bonuses() {
      return {
        honors: Math.max(0, parseFloat(honorsInput.value) || 0),
        ap: Math.max(0, parseFloat(apInput.value) || 0),
      };
    }

    function applyBonusDefaults() {
      const d = DEFAULT_BONUS[scaleSelect.value];
      honorsInput.value = d.honors;
      apInput.value = d.ap;
    }

    function drawYearTabs() {
      yearTabsWrap.hidden = mode === "single";
      if (mode === "single") return;
      yearTabsWrap.innerHTML = "";
      YEARS.forEach(function (name, i) {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "year-tab" + (i === activeYear ? " is-active" : "");
        btn.textContent = T(name) + " · " + years[i].length;
        btn.addEventListener("click", function () {
          activeYear = i;
          drawYearTabs();
          drawRows();
        });
        yearTabsWrap.appendChild(btn);
      });
    }

    function drawRows() {
      const list = years[mode === "single" ? 0 : activeYear];
      rowsWrap.innerHTML = "";

      list.forEach(function (item, index) {
        const row = document.createElement("div");
        row.className = "gpa-row";

        const name = document.createElement("input");
        name.type = "text";
        name.className = "gpa-name";
        name.placeholder = T("Class") + " " + (index + 1);
        name.setAttribute("aria-label", T("Class name (optional)"));
        // names live in state too — otherwise every redraw erases them
        name.value = item.name || "";
        name.addEventListener("input", function () {
          item.name = name.value;
        });

        const grade = document.createElement("select");
        grade.setAttribute("aria-label", T("Grade"));
        GRADES.forEach(function (g) {
          const opt = document.createElement("option");
          opt.value = g;
          opt.textContent = g;
          grade.appendChild(opt);
        });
        grade.value = item.grade;
        grade.addEventListener("change", function () {
          item.grade = grade.value;
          compute();
        });

        const type = document.createElement("select");
        type.setAttribute("aria-label", T("Course type"));
        TYPES.forEach(function (t, i) {
          const opt = document.createElement("option");
          opt.value = String(i);
          opt.textContent = T(t);
          type.appendChild(opt);
        });
        type.value = String(item.type);
        type.addEventListener("change", function () {
          item.type = parseInt(type.value, 10);
          compute();
        });

        const credits = document.createElement("input");
        credits.type = "number";
        credits.min = "0.5";
        credits.max = "10";
        credits.step = "0.5";
        credits.value = item.credits;
        credits.setAttribute("aria-label", T("Credits"));
        credits.addEventListener("input", function () {
          item.credits = parseFloat(credits.value) || 0;
          compute();
        });

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "gpa-remove";
        remove.setAttribute("aria-label", T("Remove class"));
        remove.innerHTML =
          '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        remove.addEventListener("click", function () {
          if (list.length > 1) {
            list.splice(index, 1);
            drawRows();
            drawYearTabs();
            compute();
          }
        });

        row.appendChild(name);
        row.appendChild(grade);
        row.appendChild(type);
        row.appendChild(credits);
        row.appendChild(remove);
        rowsWrap.appendChild(row);
      });
    }

    function letterFor(gpa, scale) {
      let best = "F";
      let bestDiff = Infinity;
      GRADES.forEach(function (g) {
        const diff = Math.abs(SCALES[scale].points[g] - gpa);
        if (diff < bestDiff) {
          bestDiff = diff;
          best = g;
        }
      });
      return best;
    }

    function compute() {
      const scale = scaleSelect.value;
      const b = bonuses();
      const bonusByType = [0, b.honors, b.ap];
      const lists = mode === "single" ? [years[0]] : years;

      let base = 0;
      let weighted = 0;
      let credits = 0;
      lists.forEach(function (list) {
        list.forEach(function (item) {
          if (item.credits > 0) {
            const points = SCALES[scale].points[item.grade];
            base += points * item.credits;
            // an F earns no weighting bump on any scale
            weighted += (item.grade === "F" ? points : points + bonusByType[item.type]) * item.credits;
            credits += item.credits;
          }
        });
      });

      const unweighted = credits ? base / credits : 0;
      const weightedGpa = credits ? weighted / credits : 0;
      const d = SCALES[scale].decimals;

      weightedEl.textContent = weightedGpa.toFixed(d);
      unweightedEl.textContent = unweighted.toFixed(d);
      letterEl.textContent = "≈ " + letterFor(unweighted, scale);

      // Needle shows the weighted GPA against the highest score a
      // student at this school could earn (scale max + AP bonus).
      // The dial is a 240° arc, so the needle sweeps -120° … +120°.
      const gaugeMax = SCALES[scale].max + b.ap;
      const angle = -120 + Math.min(1, Math.max(0, weightedGpa / gaugeMax)) * 240;
      needle.style.transform = "rotate(" + angle + "deg)";
    }

    // The active option was signalled by a navy pill and nothing else, so a
    // screen reader could not tell which of the two was chosen. aria-pressed
    // carries the same state the class does.
    function syncModeTabs(active) {
      modeTabs.forEach(function (t) {
        t.setAttribute("aria-pressed", String(t === active));
      });
    }
    syncModeTabs(gpaCalc.querySelector(".mode-tab.is-active") || modeTabs[0]);

    modeTabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        modeTabs.forEach(function (other) {
          other.classList.toggle("is-active", other === tab);
        });
        syncModeTabs(tab);
        mode = tab.dataset.mode;
        activeYear = 0;
        drawYearTabs();
        drawRows();
        compute();
      });
    });

    scaleSelect.addEventListener("change", function () {
      applyBonusDefaults();
      compute();
    });
    honorsInput.addEventListener("input", compute);
    apInput.addEventListener("input", compute);

    addBtn.addEventListener("click", function () {
      const list = years[mode === "single" ? 0 : activeYear];
      if (list.length < 16) {
        list.push({ name: "", grade: "A", credits: 1, type: 0 });
        drawRows();
        drawYearTabs();
        compute();
      }
    });

    applyBonusDefaults();
    drawYearTabs();
    drawRows();
    compute();
  }

  /* ------------------------------------------------------------------
     3. Horizontal swipe timeline (timelines.html)
        Swipe or use the arrows; the line fills to the active stop.
     ------------------------------------------------------------------ */
  const hstrip = document.querySelector(".hstrip");

  if (hstrip) {
    const fill = hstrip.querySelector(".hstrip-fill");
    const stops = Array.prototype.slice.call(hstrip.querySelectorAll(".hstrip-stop"));
    const prevBtn = document.querySelector(".hstrip-arrow--prev");
    const nextBtn = document.querySelector(".hstrip-arrow--next");
    let active = 0;
    let ticking = false;

    // Pad the track so the first and last stops can reach the center —
    // without this, snap physics skips the stops near the edges.
    function padTrack() {
      const pad = Math.max(4, (hstrip.clientWidth - stops[0].offsetWidth) / 2);
      const track = hstrip.querySelector(".hstrip-track");
      track.style.paddingLeft = pad + "px";
      track.style.paddingRight = pad + "px";
    }
    padTrack();
    window.addEventListener("resize", padTrack);

    function setActive(index) {
      active = Math.min(stops.length - 1, Math.max(0, index));
      stops.forEach(function (stop, i) {
        stop.classList.toggle("is-active", i === active);
      });
      const dot = stops[active].querySelector(".hstrip-dot");
      fill.style.width = (stops[active].offsetLeft + dot.offsetLeft + dot.offsetWidth / 2) + "px";
      if (prevBtn) prevBtn.disabled = active === 0;
      if (nextBtn) nextBtn.disabled = active === stops.length - 1;
    }

    function nearestStop() {
      // at the very ends of the scroller the outermost stops can't
      // reach the viewport center — hand them the active state anyway
      const maxScroll = hstrip.scrollWidth - hstrip.clientWidth;
      if (hstrip.scrollLeft <= 2) return 0;
      if (hstrip.scrollLeft >= maxScroll - 2) return stops.length - 1;
      const center = hstrip.scrollLeft + hstrip.clientWidth / 2;
      let best = 0;
      let bestDist = Infinity;
      stops.forEach(function (stop, i) {
        const mid = stop.offsetLeft + stop.offsetWidth / 2;
        const dist = Math.abs(mid - center);
        if (dist < bestDist) { bestDist = dist; best = i; }
      });
      return best;
    }

    // Arrow clicks navigate from a cursor, not from `active`, so quick
    // consecutive clicks stack up instead of re-reading a stale index.
    let cursor = 0;
    let navLock = null;

    hstrip.addEventListener("scroll", function () {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(function () {
        setActive(nearestStop());
        if (navLock === null) cursor = active; // manual swipes re-sync the cursor
        ticking = false;
      });
    });

    function go(delta) {
      cursor = Math.min(stops.length - 1, Math.max(0, cursor + delta));
      clearTimeout(navLock);
      navLock = setTimeout(function () { navLock = null; }, 700);
      const target = stops[cursor];
      hstrip.scrollTo({
        left: target.offsetLeft + target.offsetWidth / 2 - hstrip.clientWidth / 2,
        behavior: "smooth",
      });
    }

    if (prevBtn) prevBtn.addEventListener("click", function () { go(-1); });
    if (nextBtn) nextBtn.addEventListener("click", function () { go(1); });

    setActive(0);
  }

  /* ------------------------------------------------------------------
     4. Spine timelines (leveled timeline pages)
        The center line draws itself down to wherever the reader has
        scrolled; the season cards slide in via .reveal-left/right.
     ------------------------------------------------------------------ */
  const spines = document.querySelectorAll(".spine");

  if (spines.length) {
    let spineTick = false;

    function drawSpines() {
      spines.forEach(function (spine) {
        const rect = spine.getBoundingClientRect();
        // draw down to just below the middle of the viewport
        const target = window.innerHeight * 0.62 - rect.top;
        const progress = Math.min(1, Math.max(0, target / rect.height));

        const curve = spine.querySelector(".curve-fill");
        if (curve) {
          // curved variant: the path has pathLength="1", so the
          // dash offset IS the remaining fraction
          curve.style.strokeDashoffset = String(1 - progress);
          return;
        }

        const fillEl = spine.querySelector(".spine-fill");
        if (fillEl) fillEl.style.height = progress * rect.height + "px";
      });
      spineTick = false;
    }

    function queueDraw() {
      if (!spineTick) {
        spineTick = true;
        requestAnimationFrame(drawSpines);
      }
    }

    window.addEventListener("scroll", queueDraw, { passive: true });
    window.addEventListener("resize", queueDraw);
    drawSpines();
  }

  /* ------------------------------------------------------------------
     5. Career pathfinder quiz
        A small decision tree: three clicks from "what pulls you in"
        to a concrete set of majors, careers and a high-school track.
     ------------------------------------------------------------------ */
  const quiz = document.getElementById("pathfinder");

  if (quiz) {
    const NODES = {
      start: {
        question: "What pulls you in the most?",
        options: [
          { label: "People — helping, teaching, leading", next: "people" },
          { label: "Data, machines and how things work", next: "data" },
          { label: "Ideas, stories and things I can create", next: "ideas" },
        ],
      },
      people: {
        question: "How do you want to work with people?",
        options: [
          { label: "One-on-one — care, advice, support", next: "care" },
          { label: "In front of a class or a community", next: "r-education" },
          { label: "Leading teams, projects and organizations", next: "lead" },
        ],
      },
      care: {
        question: "Which side of helping feels more like you?",
        options: [
          { label: "The body — medicine, treatment, health", next: "r-health" },
          { label: "The mind — behavior, emotions, motivation", next: "r-psychology" },
        ],
      },
      lead: {
        question: "What's your instrument of choice?",
        options: [
          { label: "Numbers, markets and strategy", next: "r-business" },
          { label: "Argument, rules and negotiation", next: "r-law" },
        ],
      },
      data: {
        question: "Digital world or physical world?",
        options: [
          { label: "Software, apps and the internet", next: "software" },
          { label: "Machines, structures and energy", next: "r-engineering" },
          { label: "Nature, experiments and the lab", next: "r-science" },
        ],
      },
      software: {
        question: "What sounds like a better day?",
        options: [
          { label: "Building a product people use", next: "r-cs" },
          { label: "Finding patterns hidden in data", next: "r-datasci" },
        ],
      },
      ideas: {
        question: "How do your ideas come out best?",
        options: [
          { label: "Visually — drawing, design, spaces", next: "visual" },
          { label: "In words — writing, reporting, speaking", next: "r-media" },
          { label: "On stage or in sound", next: "r-arts" },
        ],
      },
      visual: {
        question: "Art for its own sake, or design that works?",
        options: [
          { label: "Art — expression first", next: "r-finearts" },
          { label: "Design — beauty that solves a problem", next: "r-design" },
        ],
      },
    };

    const RESULTS = {
      "r-health": {
        title: "Health & Medicine",
        blurb: "You want your work to fix something real. Medicine rewards exactly that patience and care.",
        majors: ["Pre-Med / Biology", "Nursing", "Public Health", "Biomedical Engineering"],
        careers: ["Physician", "Nurse practitioner", "Physical therapist", "Epidemiologist"],
        track: "Load up on biology and chemistry, and look for hospital or clinic volunteering — admissions committees love it.",
      },
      "r-psychology": {
        title: "Psychology & Counseling",
        blurb: "You read people well and want to understand why they do what they do.",
        majors: ["Psychology", "Cognitive Science", "Social Work", "Neuroscience"],
        careers: ["Clinical psychologist", "School counselor", "UX researcher", "HR specialist"],
        track: "Take statistics seriously — modern psychology runs on data. Psychology and debate clubs are a great start.",
      },
      "r-education": {
        title: "Education & Social Impact",
        blurb: "Explaining things until eyes light up — that's your superpower, and the world is short on it.",
        majors: ["Education", "International Development", "Sociology", "Nonprofit Management"],
        careers: ["Teacher", "Education policy analyst", "NGO project manager", "Instructional designer"],
        track: "Tutor younger students now — it's the clearest proof of teaching talent an application can show.",
      },
      "r-business": {
        title: "Business & Finance",
        blurb: "You see how the pieces make money move, and you like being the one deciding where it goes.",
        majors: ["Finance", "Economics", "Business Administration", "Accounting"],
        careers: ["Financial analyst", "Consultant", "Entrepreneur", "Investment banker"],
        track: "Math through calculus plus any DECA/business club. Start a tiny venture — even a lemonade-scale one teaches more than a textbook.",
      },
      "r-law": {
        title: "Law, Policy & International Relations",
        blurb: "You argue to win, but you'd rather win for someone who needs it.",
        majors: ["Political Science", "International Relations", "Philosophy", "Pre-Law"],
        careers: ["Attorney", "Diplomat", "Policy advisor", "Human rights advocate"],
        track: "Debate club is the classic path for a reason. Model UN and essay competitions round it out.",
      },
      "r-engineering": {
        title: "Engineering",
        blurb: "You take things apart to see why they work — engineering pays you to put them back together better.",
        majors: ["Mechanical Engineering", "Civil Engineering", "Electrical Engineering", "Aerospace Engineering"],
        careers: ["Design engineer", "Project engineer", "Robotics engineer", "Energy systems engineer"],
        track: "Physics and calculus are non-negotiable. Robotics teams and science fairs carry real weight.",
      },
      "r-science": {
        title: "Natural Sciences & Research",
        blurb: "You ask 'but why?' one more time than everyone else. That's the whole job description of a scientist.",
        majors: ["Chemistry", "Physics", "Environmental Science", "Biology"],
        careers: ["Research scientist", "Environmental consultant", "Lab director", "Science writer"],
        track: "Chase lab time: science olympiads, summer research placements, any bench you can get behind.",
      },
      "r-cs": {
        title: "Computer Science & Software Engineering",
        blurb: "You'd rather build the thing than talk about the thing. Software is the fastest place to do that.",
        majors: ["Computer Science", "Software Engineering", "Computer Engineering", "Cybersecurity"],
        careers: ["Software engineer", "Mobile developer", "Security engineer", "Product engineer"],
        track: "Ship something real — an app, a game, a website. One finished project beats ten certificates.",
      },
      "r-datasci": {
        title: "Data Science & AI",
        blurb: "Patterns jump out at you. Data science turns that instinct into a career.",
        majors: ["Data Science", "Statistics", "Applied Mathematics", "Machine Learning"],
        careers: ["Data scientist", "ML engineer", "Quantitative analyst", "Research engineer"],
        track: "Statistics + programming is the combo. Kaggle competitions are a friendly on-ramp.",
      },
      "r-media": {
        title: "Media, Journalism & Communications",
        blurb: "You notice the story everyone else walked past — and you can't rest until it's told well.",
        majors: ["Journalism", "Communications", "English", "Public Relations"],
        careers: ["Journalist", "Content strategist", "Speechwriter", "Editor"],
        track: "Write in public: school paper, a blog, a newsletter. A byline archive is the portfolio.",
      },
      "r-arts": {
        title: "Performing Arts & Music",
        blurb: "The stage doesn't scare you — it recharges you.",
        majors: ["Music", "Theater", "Film Production", "Dance"],
        careers: ["Performer", "Music producer", "Director", "Arts manager"],
        track: "Perform everywhere you can and record everything — auditions and applications both run on footage.",
      },
      "r-finearts": {
        title: "Fine Arts & Animation",
        blurb: "You think in images. The right school will sharpen that into a voice.",
        majors: ["Fine Arts", "Illustration", "Animation", "Game Art"],
        careers: ["Illustrator", "Animator", "Concept artist", "Art director"],
        track: "The portfolio is everything — draw daily and curate your best 15 pieces, not your latest 50.",
      },
      "r-design": {
        title: "Design & Architecture",
        blurb: "You believe beautiful and useful are the same thing done right.",
        majors: ["Architecture", "Industrial Design", "UX/UI Design", "Graphic Design"],
        careers: ["Architect", "UX designer", "Product designer", "Urban planner"],
        track: "Learn one design tool properly and redesign things around you — school posters count as portfolio work.",
      },
    };

    const ARROW = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M13 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/></svg>';

    let trail = ["start"];

    function esc(s) {
      return s.replace(/&/g, "&amp;").replace(/</g, "&lt;");
    }

    function render() {
      const nodeId = trail[trail.length - 1];

      if (nodeId.indexOf("r-") === 0) {
        renderResult(RESULTS[nodeId]);
        return;
      }

      const node = NODES[nodeId];
      const step = trail.length;
      const dots = [1, 2, 3].map(function (n) {
        return '<span class="quiz-dot' + (n <= step ? " is-done" : "") + '"></span>';
      }).join("");

      quiz.innerHTML =
        '<div class="quiz-card reveal is-visible">' +
        '  <div class="quiz-progress">' + dots +
        '    <span class="quiz-step">' + step + " / 3</span>" +
        "  </div>" +
        '  <h2 class="quiz-question">' + esc(T(node.question)) + "</h2>" +
        '  <div class="quiz-options">' +
        node.options.map(function (opt, i) {
          return '<button class="quiz-option" type="button" data-i="' + i + '">' +
            "<span>" + esc(T(opt.label)) + "</span>" + ARROW + "</button>";
        }).join("") +
        "  </div>" +
        (trail.length > 1
          ? '<button class="quiz-back" type="button">' + ARROW + esc(T("Back")) + "</button>"
          : "") +
        "</div>";

      quiz.querySelectorAll(".quiz-option").forEach(function (btn) {
        btn.addEventListener("click", function () {
          trail.push(node.options[parseInt(btn.dataset.i, 10)].next);
          render();
        });
      });

      const back = quiz.querySelector(".quiz-back");
      if (back) back.addEventListener("click", function () {
        trail.pop();
        render();
      });
    }

    function renderResult(result) {
      quiz.innerHTML =
        '<div class="quiz-card reveal is-visible">' +
        '  <span class="quiz-eyebrow">' + esc(T("Your direction")) + "</span>" +
        '  <h2 class="quiz-result-title">' + esc(T(result.title)) + "</h2>" +
        '  <p class="quiz-result-blurb">' + esc(T(result.blurb)) + "</p>" +
        '  <div class="quiz-lists">' +
        '    <div class="quiz-list"><h3>' + esc(T("College majors")) + "</h3><ul>" +
        result.majors.map(function (m) { return "<li>" + esc(T(m)) + "</li>"; }).join("") +
        "    </ul></div>" +
        '    <div class="quiz-list"><h3>' + esc(T("Careers")) + "</h3><ul>" +
        result.careers.map(function (c) { return "<li>" + esc(T(c)) + "</li>"; }).join("") +
        "    </ul></div>" +
        "  </div>" +
        '  <p class="quiz-track"><strong>' + esc(T("In high school:")) + "</strong> " + esc(T(result.track)) + "</p>" +
        '  <div class="quiz-actions">' +
        '    <button class="btn btn-dark" type="button" id="quiz-restart">' + esc(T("Start Over")) + "</button>" +
        '    <a class="btn btn-light" style="border: 1px solid var(--grey-line);" href="programs.html">' + esc(T("Discover Your Level")) + "</a>" +
        "  </div>" +
        "</div>";

      document.getElementById("quiz-restart").addEventListener("click", function () {
        trail = ["start"];
        render();
      });
    }

    render();
  }

  /* ------------------------------------------------------------------
     6. Finances — true cost of attendance + AP/IB credit value
        (finances.html)

        True cost: three input groups (billed / never billed / gift
        aid) roll up into four headline numbers and two SVG bar
        charts. AP/IB: a tiered benchmark model — three built-in
        acceptance policies instead of a 2,000-college database —
        tracks credits toward a 120-credit degree and prices them
        at $1,500 per three-credit course.
     ------------------------------------------------------------------ */
  const SVG_NS = "http://www.w3.org/2000/svg";

  function usd(n) {
    return "$" + Math.round(n).toLocaleString("en-US");
  }

  function svgEl(tag, attrs, text) {
    const el = document.createElementNS(SVG_NS, tag);
    for (const key in attrs) el.setAttribute(key, attrs[key]);
    if (text != null) el.textContent = text;
    return el;
  }

  /* --- 6a. True cost of attendance --- */
  const trueCost = document.getElementById("truecost-calc");

  if (trueCost) {
    const finInputs = Array.prototype.slice.call(
      trueCost.querySelectorAll("input[data-fin]")
    );

    const INK = "#0f152a";
    // Grey-blue for "money you spend but the university never bills".
    // Kept low-saturation on purpose: at legend-swatch size a lighter,
    // more saturated blue reads as lavender, which is off-palette.
    const SLATE = "#767f96";
    const SAND = "#b9a97f";
    const AXIS = "rgba(15, 21, 42, 0.25)";
    const CAPTION = "#5a6076";

    // No real yearly line item exceeds this — keeps totals from ever
    // outgrowing their tiles (matches max="" on the inputs)
    const FIELD_MAX = 999999;

    function finSum(groupName) {
      return finInputs.reduce(function (sum, input) {
        if (input.dataset.fin !== groupName) return sum;
        const v = parseFloat(input.value);
        return sum + (isFinite(v) && v > 0 ? Math.min(v, FIELD_MAX) : 0);
      }, 0);
    }

    // Pull typed values back into range the moment they leave it
    function clampField(input) {
      if (input.value === "") return;
      const v = parseFloat(input.value);
      if (!isFinite(v)) { input.value = ""; return; }
      if (v > FIELD_MAX) input.value = FIELD_MAX;
      else if (v < 0) input.value = 0;
    }

    /* Shared frame: two bars on a baseline, captions under, values above */
    function drawBars(svg, bars, maxValue) {
      svg.innerHTML = "";
      const H = 180, TOP = 30, BW = 110, X = [80, 270];
      const h = function (v) { return maxValue > 0 ? (v / maxValue) * H : 0; };

      bars.forEach(function (bar, i) {
        let y = TOP + H;
        bar.segments.forEach(function (seg) {
          const segH = h(seg.value);
          y -= segH;
          svg.appendChild(svgEl("rect", {
            x: X[i], y: y, width: BW, height: Math.max(segH, 0),
            fill: seg.color, opacity: seg.opacity || 1, rx: 3
          }));
        });
        svg.appendChild(svgEl("text", {
          x: X[i] + BW / 2, y: TOP + H + 20,
          "text-anchor": "middle", "font-size": "12", fill: CAPTION
        }, bar.caption));
        svg.appendChild(svgEl("text", {
          x: X[i] + BW / 2, y: y - 8,
          "text-anchor": "middle", "font-size": "13",
          "font-weight": "500", fill: INK
        }, bar.headline));
      });

      svg.appendChild(svgEl("line", {
        x1: 40, y1: TOP + H, x2: 420, y2: TOP + H,
        stroke: AXIS, "stroke-width": 1
      }));
    }

    function updateTrueCost() {
      const direct = finSum("direct");
      const indirect = finSum("indirect");
      const gift = finSum("gift");

      const gross = direct + indirect;
      const remaining = Math.max(gross - gift, 0);
      const covered = Math.min(gift, gross);

      document.getElementById("tc-sub-direct").textContent = usd(direct);
      document.getElementById("tc-sub-indirect").textContent = usd(indirect);
      document.getElementById("tc-sub-gift").textContent = usd(gift);
      document.getElementById("tc-direct").textContent = usd(direct);
      document.getElementById("tc-gift").textContent = usd(gift);
      document.getElementById("tc-net").textContent = usd(direct - gift);
      document.getElementById("tc-coa").textContent = usd(gross - gift);

      drawBars(
        document.getElementById("tc-chart-stack"),
        [
          {
            caption: T("Full price"),
            headline: usd(gross),
            segments: [
              { value: direct, color: INK },
              { value: indirect, color: SLATE }
            ]
          },
          {
            caption: T("After gift aid"),
            headline: usd(remaining),
            segments: [
              { value: remaining, color: INK },
              { value: covered, color: SAND, opacity: 0.45 }
            ]
          }
        ],
        Math.max(gross, 1)
      );

      drawBars(
        document.getElementById("tc-chart-sides"),
        [
          {
            caption: T("The bill"),
            headline: usd(direct),
            segments: [{ value: direct, color: INK }]
          },
          {
            caption: T("Daily life"),
            headline: usd(indirect),
            segments: [{ value: indirect, color: SLATE }]
          }
        ],
        Math.max(direct, indirect, 1)
      );
    }

    finInputs.forEach(function (input) {
      input.addEventListener("input", function () {
        clampField(input);
        updateTrueCost();
      });
    });

    updateTrueCost();
  }

  /* --- 6b. AP/IB credit value --- */
  const creditCalc = document.getElementById("credit-calc");

  if (creditCalc) {
    const EXAMS = [
      ["AP Calculus AB", "ap"], ["AP Calculus BC", "ap"],
      ["AP Statistics", "ap"], ["AP Biology", "ap"],
      ["AP Chemistry", "ap"], ["AP Physics 1", "ap"],
      ["AP Physics C: Mechanics", "ap"], ["AP Computer Science A", "ap"],
      ["AP English Language", "ap"], ["AP English Literature", "ap"],
      ["AP U.S. History", "ap"], ["AP World History", "ap"],
      ["AP Psychology", "ap"], ["AP Macroeconomics", "ap"],
      ["AP Microeconomics", "ap"], ["AP Human Geography", "ap"],
      ["IB Mathematics AA (HL)", "ib"], ["IB Biology (HL)", "ib"],
      ["IB Chemistry (HL)", "ib"], ["IB Physics (HL)", "ib"],
      ["IB History (HL)", "ib"], ["IB Economics (HL)", "ib"],
      ["IB English A (HL)", "ib"]
    ];
    const DEGREE_CREDITS = 120;
    const COURSE_VALUE = 1500; // dollars per standard 3-credit course

    const rowsBox = document.getElementById("cm-rows");
    let examRows = []; // session-only state — nothing is stored

    /* Credits one exam earns at each benchmark tier */
    function tierCredits(type, score, tier) {
      const isAP = type === "ap";
      if (tier === 1) {
        return (isAP ? score === 5 : score === 7) ? 3 : 0;
      }
      if (tier === 2) {
        if (isAP ? score < 3 : score < 5) return 0;
        return (isAP ? score === 5 : score === 7) ? 4 : 3;
      }
      if (isAP ? score < 3 : score < 4) return 0;
      return (isAP ? score >= 4 : score >= 6) ? 5 : 4;
    }

    let examRowSeq = 0;
    function addExamRow() {
      const row = document.createElement("div");
      row.className = "fin-exam-row";

      const examField = document.createElement("div");
      examField.className = "form-field";
      const examLabel = document.createElement("label");
      examLabel.textContent = T("Exam");
      const examSelect = document.createElement("select");
      // Rows start blank — the student picks the exam themselves
      const placeholder = document.createElement("option");
      placeholder.value = "";
      placeholder.disabled = true;
      placeholder.selected = true;
      placeholder.textContent = T("Select an exam");
      examSelect.appendChild(placeholder);
      EXAMS.forEach(function (exam, i) {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = exam[0];
        examSelect.appendChild(opt);
      });
      // Rows are added and removed as the student works, so the label/control
      // pair needs a generated id — without it the visible label is decoration
      // and a screen reader announces a bare combo box.
      examSelect.id = "cm-exam-" + (++examRowSeq);
      examLabel.htmlFor = examSelect.id;
      examField.appendChild(examLabel);
      examField.appendChild(examSelect);

      const scoreField = document.createElement("div");
      scoreField.className = "form-field";
      const scoreLabel = document.createElement("label");
      scoreLabel.textContent = T("Score");
      const scoreSelect = document.createElement("select");
      scoreSelect.id = "cm-score-" + examRowSeq;
      scoreLabel.htmlFor = scoreSelect.id;
      scoreField.appendChild(scoreLabel);
      scoreField.appendChild(scoreSelect);

      const removeBtn = document.createElement("button");
      removeBtn.type = "button";
      removeBtn.className = "fin-remove";
      removeBtn.textContent = "×";
      removeBtn.setAttribute("aria-label", T("Remove exam"));

      function fillScores(keep) {
        scoreSelect.innerHTML = "";
        if (examSelect.value === "") {
          // No exam picked yet — the score menu waits, disabled
          const blank = document.createElement("option");
          blank.value = "";
          blank.textContent = "–";
          scoreSelect.appendChild(blank);
          scoreSelect.disabled = true;
          return;
        }
        scoreSelect.disabled = false;
        const max = EXAMS[examSelect.value][1] === "ap" ? 5 : 7;
        for (let s = max; s >= 1; s--) {
          const opt = document.createElement("option");
          opt.value = s;
          opt.textContent = s;
          scoreSelect.appendChild(opt);
        }
        scoreSelect.value = isFinite(keep) ? Math.min(Math.max(keep, 1), max) : max;
      }
      fillScores(NaN);

      examSelect.addEventListener("change", function () {
        fillScores(parseInt(scoreSelect.value, 10));
        updateCredits();
      });
      scoreSelect.addEventListener("change", updateCredits);
      removeBtn.addEventListener("click", function () {
        examRows = examRows.filter(function (r) { return r.el !== row; });
        row.remove();
        updateCredits();
      });

      row.appendChild(examField);
      row.appendChild(scoreField);
      row.appendChild(removeBtn);
      rowsBox.appendChild(row);

      examRows.push({
        el: row,
        credits: function (tier) {
          if (examSelect.value === "") return 0; // still blank
          return tierCredits(
            EXAMS[examSelect.value][1],
            parseInt(scoreSelect.value, 10),
            tier
          );
        }
      });
    }

    function updateCredits() {
      const totals = [1, 2, 3].map(function (tier) {
        return examRows.reduce(function (sum, r) { return sum + r.credits(tier); }, 0);
      });

      totals.forEach(function (credits, i) {
        const tier = i + 1;
        const pct = Math.min((credits / DEGREE_CREDITS) * 100, 100);
        document.getElementById("cm-c" + tier).textContent = credits;
        document.getElementById("cm-p" + tier).textContent = Math.round(pct) + "%";
        document.getElementById("cm-b" + tier).style.width = pct + "%";
      });

      const value = function (credits) { return (credits / 3) * COURSE_VALUE; };
      document.getElementById("cm-roi").textContent = usd(value(totals[1]));
      document.getElementById("cm-roi-range").textContent =
        usd(value(totals[0])) + " – " + usd(value(totals[2]));
    }

    document.getElementById("cm-add").addEventListener("click", function () {
      addExamRow();
      updateCredits();
    });

    addExamRow();
    updateCredits();
  }

  /* Escape user-adjacent text for the few places we assemble HTML */
  function escHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* Fill "{key}" placeholders — lets whole sentences be translated
     as single dictionary entries with the numbers dropped in after */
  function tpl(str, map) {
    return str.replace(/\{(\w+)\}/g, function (m, k) {
      return map[k] !== undefined ? map[k] : m;
    });
  }

  /* --- Human dates from the data files, rendered in the reader's language ---

     `verified` fields ("July 2026") and the hryvnia rate date
     ("26 July 2026") are written in English because a maintainer edits
     them by hand. Dropped straight into a translated sentence they put an
     English month inside Ukrainian copy. This parses the handful of shapes
     we actually write and re-formats through Intl, which knows Ukrainian
     month forms — so no month dictionary has to be kept in step.

     Anything that does not parse is returned EXACTLY as given. A date is a
     fact from the dataset; guessing at one would be worse than showing it
     in English. */
  const MONTHS = ["january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"];

  function localDate(str) {
    if (typeof str !== "string") return str;
    const m = str.trim().match(/^(?:(\d{1,2})\s+)?([A-Za-z]+)\.?\s+(\d{4})$/);
    if (!m) return str;
    const name = m[2].toLowerCase();
    let idx = MONTHS.indexOf(name);
    if (idx < 0) {
      idx = MONTHS.findIndex(function (full) {
        return name.length >= 3 && full.slice(0, name.length) === name;
      });
    }
    if (idx < 0) return str;

    const uk = !!(window.USUFU_I18N && window.USUFU_I18N.lang() === "uk");
    if (!uk) return str;

    const day = m[1] ? parseInt(m[1], 10) : 1;
    const opts = { month: "long", year: "numeric" };
    if (m[1]) opts.day = "numeric";
    let out;
    try {
      out = new Intl.DateTimeFormat("uk-UA", opts)
        .format(new Date(parseInt(m[3], 10), idx, day));
    } catch (e) {
      return str;
    }
    /* uk-UA appends the era marker " р." — the surrounding copy already
       makes it plain these are dates, so drop it. */
    return out.replace(/\s*р\.\s*$/, "");
  }

  /* ------------------------------------------------------------------
     Shared student profile (localStorage: "usufu-profile")

     The estimator tools publish their results here so the College
     List Builder (module 15) can pre-fill a student's academic
     profile instead of asking them to re-type numbers this site
     already helped them work out:
       gpa        number 0–4      — module 11, Ukrainian grade converter
       satLow/satHigh  integers   — module 12, NMT estimator (a RANGE:
                                    there is no official NMT↔SAT table)
       actLow/actHigh  integers   — module 12
       savedAt    ISO date string — so the builder can say how fresh it is
     Every field is optional; the builder handles any subset, including
     none at all. Writes are merge-patches so one tool never erases
     another tool's field.
     ------------------------------------------------------------------ */
  const PROFILE_KEY = "usufu-profile";

  /* toISOString() reports UTC, so it stamps the wrong day for anyone whose
     local date differs from UTC's — for Ukraine (UTC+3) that is every night
     between midnight and 03:00. Build the stamp from local parts instead,
     the same way vsToday() derives "today" for the visa scheduler. */
  function todayISO() {
    const d = new Date();
    const pad = function (n) { return String(n).padStart(2, "0"); };
    return d.getFullYear() + "-" + pad(d.getMonth() + 1) + "-" + pad(d.getDate());
  }

  function profileRead() {
    try {
      const raw = localStorage.getItem(PROFILE_KEY);
      if (!raw) return {};
      const parsed = JSON.parse(raw);
      return parsed && typeof parsed === "object" ? parsed : {};
    } catch (e) { return {}; }
  }

  function profilePatch(patch) {
    try {
      const next = profileRead();
      for (const k in patch) {
        if (patch[k] === null || patch[k] === undefined) delete next[k];
        else next[k] = patch[k];
      }
      next.savedAt = todayISO();
      localStorage.setItem(PROFILE_KEY, JSON.stringify(next));
    } catch (e) { /* storage unavailable — tools still work for this visit */ }
  }

  /* ------------------------------------------------------------------
     Shared school shortlist (localStorage: "usufu-shortlist")

     The second cross-tool contract, added v19. The College List
     Builder (module 15) classifies all 72 schools in the dataset —
     that is a catalogue, not a shortlist, so the Funding Gap
     Calculator (module 16) cannot simply read the builder's output.
     Instead the builder lets a student SAVE individual schools, and
     that saved set is what the funding tool starts from.

     Shape: { saved: [ { name, cat } ], savedAt }
       name  exact dataset name — the join key into js/aid-data.js
       cat   'reach'|'target'|'safety'|'nodata' at the moment of
             saving, so the funding tool can order reach schools last
             without re-running the whole match engine. Advisory only:
             the funding tool never lets a stale category change an
             arithmetic result.
     ------------------------------------------------------------------ */
  const SHORTLIST_KEY = "usufu-shortlist";

  function shortlistRead() {
    try {
      const raw = localStorage.getItem(SHORTLIST_KEY);
      if (!raw) return [];
      const parsed = JSON.parse(raw);
      if (!parsed || !Array.isArray(parsed.saved)) return [];
      return parsed.saved.filter(function (r) {
        return r && typeof r.name === "string" && r.name;
      });
    } catch (e) { return []; }
  }

  function shortlistWrite(rows) {
    try {
      localStorage.setItem(SHORTLIST_KEY, JSON.stringify({
        saved: rows, savedAt: todayISO()
      }));
    } catch (e) { /* storage unavailable — the tool still works this visit */ }
  }

  function shortlistHas(name) {
    return shortlistRead().some(function (r) { return r.name === name; });
  }

  /* Returns the new saved-state (true = now saved). */
  function shortlistToggle(name, cat) {
    const rows = shortlistRead();
    const i = rows.findIndex(function (r) { return r.name === name; });
    if (i >= 0) { rows.splice(i, 1); shortlistWrite(rows); return false; }
    rows.push({ name: name, cat: cat || null });
    shortlistWrite(rows);
    return true;
  }

  /* ------------------------------------------------------------------
     7. Countdown to College (timelines.html)
        Three onboarding answers filter a bank of admissions tasks
        into a seasonal checklist. Progress and answers persist in
        localStorage; the whole plan exports as a styled PDF
        (jsPDF, loaded from CDN only when the button is pressed).
     ------------------------------------------------------------------ */
  const cdlRoot = document.getElementById("cdl-onboard");

  if (cdlRoot) {
    const STORE_KEY = "usufu-countdown";

    const STAGES = [
      { id:"freshman",      name:"Freshman Year" },
      { id:"sophomore",     name:"Sophomore Year" },
      { id:"junior-fall",   name:"Junior Year — Fall" },
      { id:"junior-spring", name:"Junior Year — Spring" },
      { id:"summer",        name:"Summer Before Senior Year" },
      { id:"senior-sep",    name:"Senior Year — September" },
      { id:"senior-oct",    name:"Senior Year — October" },
      { id:"senior-nov",    name:"Senior Year — November & December" },
      { id:"senior-spring", name:"Senior Year — Spring" }
    ];
    const GRADE_START = {
      "freshman":0, "sophomore":1, "junior-fall":2, "junior-spring":3,
      "senior-fall":5, "senior-spring":8
    };
    const GRADE_LABEL = {
      "freshman":"Freshman", "sophomore":"Sophomore", "junior-fall":"Junior — Fall",
      "junior-spring":"Junior — Spring", "senior-fall":"Senior — Fall", "senior-spring":"Senior — Spring"
    };
    const TIER_LABEL = {
      ivy:"Highly selective / Ivies", state:"State universities", cc:"Community college / transfer route"
    };

    /* cond(s) gets {grade, tier, early, regular, testopt, finaid} */
    const CDL_TASKS = [
      // Freshman
      { id:"f-map", st:0, p:"high", t:"Build a four-year course map",
        d:"Sketch which math, science and language courses you will take each year. Rigor is judged over all four years, not just senior fall.",
        tip:"Counselors can print your school's course-sequence sheet. Aim for the hardest load you can carry without your grades slipping.",
        cond:function(s){ return true; } },
      { id:"f-clubs", st:0, p:"medium", t:"Join two activities you could one day lead",
        d:"Depth beats breadth. Pick two things you would still enjoy in three years, and start showing up every week.",
        cond:function(s){ return true; } },
      { id:"f-gpa", st:0, p:"low", t:"Set a semester GPA check-in",
        d:"Every semester counts toward the transcript colleges see. A calendar reminder twice a year keeps surprises away.",
        cond:function(s){ return true; } },

      // Sophomore
      { id:"so-psat", st:1, p:"medium", t:"Take the PSAT for practice",
        d:"Sophomore-year PSAT scores are a no-risk diagnostic — they tell you what to work on before the score starts to matter.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"so-list", st:1, p:"medium", t:"Draft a first list of ten colleges",
        d:"Mix reaches, matches and safeties. This list will change — the point is to start noticing what you care about.",
        cond:function(s){ return true; } },
      { id:"so-rigor", st:1, p:"high", t:"Choose junior-year rigor deliberately",
        d:"Junior year is the transcript's centerpiece. Pick AP, IB or dual-enrollment courses now, while seats are open.",
        tip:"If your school caps AP enrollment, ask in writing early — waitlists resolve in order of who asked first.",
        cond:function(s){ return true; } },
      { id:"so-transfer", st:1, p:"medium", t:"Research guaranteed-transfer agreements",
        d:"Many state universities guarantee admission from partner community colleges. Knowing the rules early shapes every course you pick.",
        cond:function(s){ return s.tier === "cc"; } },

      // Junior — Fall
      { id:"jf-psat", st:2, p:"high", t:"Take the PSAT/NMSQT — this one counts",
        d:"Junior-year PSAT is the National Merit qualifier. A strong score can turn directly into scholarship money.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"jf-sat", st:2, p:"high", t:"Register for a spring SAT or ACT date",
        d:"Book the seat now so spring-you has a deadline. One real sitting before summer leaves time for a retake.",
        cond:function(s){ return s.tier !== "cc" && !s.testopt; } },
      { id:"jf-testplan", st:2, p:"medium", t:"Decide your testing plan",
        d:"Test-optional does not mean test-blind — a good score can still help aid and honors programs. Decide now whether one sitting is worth it.",
        tip:"Rule of thumb: take one practice test. If you land near a school's middle 50%, testing is probably worth one real attempt.",
        cond:function(s){ return s.tier !== "cc" && s.testopt; } },
      { id:"jf-scholar", st:2, p:"medium", t:"Start a scholarship tracker",
        d:"One spreadsheet: name, amount, deadline, requirements. Local awards have the least competition and add up fast.",
        cond:function(s){ return s.finaid; } },
      { id:"jf-visits", st:2, p:"low", t:"Tour campuses — in person or virtual",
        d:"Even one visit sharpens what you want. Compare a big state campus with a small one and note what feels right.",
        cond:function(s){ return true; } },

      // Junior — Spring
      { id:"js-recs", st:3, p:"high", t:"Ask two core academic teachers for recommendation letters before summer",
        d:"Ask in person before the year ends, while their memory of your work is fresh — the best writers get booked.",
        tip:"Choose teachers from junior-year core subjects who saw you improve, not just the class where you had the highest grade.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"js-sat", st:3, p:"high", t:"Sit the SAT or ACT",
        d:"Take the real test this spring. If the score disappoints, there is still a fall date before applications are due.",
        cond:function(s){ return s.tier !== "cc" && !s.testopt; } },
      { id:"js-list", st:3, p:"high", t:"Cut your college list to about twelve",
        d:"Enough reaches to dream, enough matches to count on, at least two true safeties you would genuinely attend.",
        cond:function(s){ return s.tier === "ivy"; } },
      { id:"js-list-st", st:3, p:"medium", t:"Shortlist your state universities",
        d:"Compare campuses, programs and honors colleges within your state system — and note which have earlier priority deadlines.",
        cond:function(s){ return s.tier === "state"; } },
      { id:"js-summer", st:3, p:"medium", t:"Lock in a summer that shows depth",
        d:"A job, a research program, a real project — anything sustained beats an expensive two-week resume decoration.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"js-credits", st:3, p:"high", t:"Map your credits against the target degree",
        d:"Sit with an advisor and check every planned course against the four-year program you want to transfer into.",
        cond:function(s){ return s.tier === "cc"; } },

      // Summer before senior year
      { id:"su-essay", st:4, p:"high", t:"Draft your Common App personal essay",
        d:"Write a full draft before school starts. Fall-semester you will be too busy to start from a blank page.",
        tip:"650 words, one honest story, your voice. Read it aloud — if it sounds like a stranger wrote it, revise.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"su-finalize", st:4, p:"high", t:"Finalize the college list",
        d:"Freeze the list so every remaining hour goes into applications, not indecision. Note each school's deadlines in one calendar.",
        cond:function(s){ return true; } },
      { id:"su-commonapp", st:4, p:"medium", t:"Open your Common App and fill the activities section",
        d:"The account rolls over each August. Enter activities early — 150 characters per entry takes longer than it sounds.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"su-ed", st:4, p:"high", t:"Choose your Early Decision school deliberately",
        d:"ED is binding. Only commit if you would choose this school over every acceptance — and if the aid math works without comparing offers.",
        tip:"Run the school's net price calculator with your family before signing anything. ED removes your power to compare aid letters.",
        cond:function(s){ return s.early; } },
      { id:"su-aid", st:4, p:"medium", t:"Run net price calculators for every school on the list",
        d:"Every college posts one. Thirty minutes per school tells your family what the aid letter will roughly say in spring.",
        cond:function(s){ return s.finaid; } },

      // Senior — September
      { id:"ss-essay", st:5, p:"high", t:"Finalize your Common App essay and submit the Early Decision agreement form",
        d:"Polish the essay to final, and file the ED agreement — your counselor and a parent sign it too, so start the signatures now.",
        cond:function(s){ return s.early; } },
      { id:"ss-brag", st:5, p:"high", t:"Confirm recommenders and hand them a brag sheet",
        d:"One page: your activities, what you're proud of, where you're applying and the earliest deadline. Writers write better with material.",
        cond:function(s){ return s.tier !== "cc"; } },
      { id:"ss-retake", st:5, p:"medium", t:"Register for a fall test retake if you need one",
        d:"October and November sittings still reach most deadlines. Check each school's 'latest accepted test date' before booking.",
        cond:function(s){ return s.tier !== "cc" && !s.testopt; } },
      { id:"ss-cc-app", st:5, p:"medium", t:"Check your community college's application window",
        d:"Most have rolling admission, but placement testing and orientation slots fill early. Know the dates now.",
        cond:function(s){ return s.tier === "cc"; } },

      // Senior — October
      { id:"so2-fafsa", st:6, p:"high", t:"Gather tax documents and submit the FAFSA and CSS Profile",
        d:"The FAFSA opens October 1. File early — several states and colleges hand out aid until the money runs out.",
        tip:"You need last year's tax return, W-2s and bank balances. The CSS Profile is separate and only some private colleges require it.",
        cond:function(s){ return s.finaid; } },
      { id:"so2-early", st:6, p:"high", t:"Submit Early Decision / Early Action applications",
        d:"Most early deadlines are November 1. Submit days early — portals slow to a crawl on deadline night.",
        cond:function(s){ return s.early; } },
      { id:"so2-transcript", st:6, p:"medium", t:"Request transcripts for your early schools",
        d:"Counselors need lead time, and October is their busiest month. Ask at least two weeks before the deadline.",
        cond:function(s){ return s.early; } },
      { id:"so2-supp", st:6, p:"medium", t:"Draft supplemental essays for regular-decision schools",
        d:"'Why us?' essays take research. Two per week through fall beats ten in the last week of December.",
        cond:function(s){ return s.regular; } },

      // Senior — November & December
      { id:"sn-rd", st:7, p:"high", t:"Submit regular-decision applications before winter break",
        d:"January 1 deadlines are best met in mid-December. Nothing good happens in a portal on New Year's Eve.",
        cond:function(s){ return s.regular; } },
      { id:"sn-results", st:7, p:"medium", t:"Use early results to adjust the regular list",
        d:"Mid-December ED/EA news changes the plan: an acceptance may end the process, a deferral means the RD list needs to be real.",
        cond:function(s){ return s.early; } },
      { id:"sn-scholar", st:7, p:"medium", t:"Apply to local and state scholarships",
        d:"Deadlines cluster December through February. The tracker from junior year earns its keep now.",
        cond:function(s){ return s.finaid; } },
      { id:"sn-cc", st:7, p:"high", t:"Submit your community college application and book placement",
        d:"Applying now gets first pick of classes and time to sort financial aid before the semester starts.",
        cond:function(s){ return s.tier === "cc"; } },

      // Senior — Spring
      { id:"sp-compare", st:8, p:"high", t:"Compare aid letters line by line before choosing",
        d:"Letters bury loans next to grants on purpose. Decode every offer into free, earned and borrowed money before you decide.",
        tip:"The Aid Letter De-Coder on our Finances page does exactly this for up to three schools at once.",
        cond:function(s){ return s.finaid; } },
      { id:"sp-appeal", st:8, p:"medium", t:"Appeal your aid if a better offer exists",
        d:"A polite appeal with a competing letter attached works more often than people think. The worst answer is no.",
        cond:function(s){ return s.finaid; } },
      { id:"sp-deposit", st:8, p:"high", t:"Send one enrollment deposit by May 1",
        d:"One school, one deposit, before National Decision Day. Double-depositing can get acceptances revoked.",
        cond:function(s){ return true; } },
      { id:"sp-final", st:8, p:"medium", t:"Send final transcripts and register for orientation",
        d:"Admission stays conditional until the final transcript lands. Book orientation early — good class times go first.",
        cond:function(s){ return true; } },
      { id:"sp-transfer", st:8, p:"medium", t:"Get your transfer-agreement requirements in writing",
        d:"Print the exact GPA and course requirements your future four-year school expects. Paper beats a website that changes.",
        cond:function(s){ return s.tier === "cc"; } }
    ];

    let cdlState = null; // {setup:{...}, done:{taskId:true}}

    function cdlLoad() {
      try {
        const raw = localStorage.getItem(STORE_KEY);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !parsed.setup || !GRADE_START.hasOwnProperty(parsed.setup.grade)) return null;
        parsed.done = parsed.done || {};
        return parsed;
      } catch (e) { return null; }
    }
    function cdlSave() {
      try { localStorage.setItem(STORE_KEY, JSON.stringify(cdlState)); }
      catch (e) { /* storage unavailable — the plan still works for this visit */ }
    }

    function cdlReadForm() {
      const tier = document.querySelector('input[name="cdl-tier"]:checked');
      return {
        grade: document.getElementById("cdl-grade").value,
        tier: tier ? tier.value : "state",
        early: document.getElementById("cdl-s-early").checked,
        regular: document.getElementById("cdl-s-regular").checked,
        testopt: document.getElementById("cdl-s-testopt").checked,
        finaid: document.getElementById("cdl-s-finaid").checked
      };
    }
    function cdlWriteForm(setup) {
      document.getElementById("cdl-grade").value = setup.grade;
      document.getElementById("cdl-s-early").checked = !!setup.early;
      document.getElementById("cdl-s-regular").checked = !!setup.regular;
      document.getElementById("cdl-s-testopt").checked = !!setup.testopt;
      document.getElementById("cdl-s-finaid").checked = !!setup.finaid;
      const radio = document.querySelector('input[name="cdl-tier"][value="' + setup.tier + '"]');
      if (radio) radio.checked = true;
    }

    function cdlActive() {
      const start = GRADE_START[cdlState.setup.grade];
      return CDL_TASKS.filter(function (task) {
        return task.st >= start && task.cond(cdlState.setup);
      });
    }

    /* Anchor on today's midnight, not on the current instant. Comparing a
       midnight target against "now" rolled the date forward on the deadline
       day itself, so anyone opening the checklist on 1 November was told
       "365 days until Early Decision deadlines". The deadline day now reads
       0 — which is the one day it matters most to get right. */
    function cdlMidnight() {
      const n = new Date();
      return new Date(n.getFullYear(), n.getMonth(), n.getDate());
    }
    function nextDate(month, day) { // month 1–12
      const today = cdlMidnight();
      let d = new Date(today.getFullYear(), month - 1, day);
      if (d < today) d = new Date(today.getFullYear() + 1, month - 1, day);
      return d;
    }
    function cdlCountdown() {
      const s = cdlState.setup;
      let target, label;
      if (s.early) { target = nextDate(11, 1); label = "days until Early Decision deadlines (Nov 1)"; }
      else if (s.regular) { target = nextDate(1, 1); label = "days until Regular Decision deadlines (Jan 1)"; }
      else if (s.finaid) { target = nextDate(10, 1); label = "days until the FAFSA opens (Oct 1)"; }
      else { target = nextDate(5, 1); label = "days until National Decision Day (May 1)"; }
      // Whole days between two midnights — no rounding drift from the clock.
      document.getElementById("cdl-days").textContent =
        Math.round((target - cdlMidnight()) / 86400000);
      document.getElementById("cdl-what").textContent = T(label);
    }

    function cdlProgress() {
      const tasks = cdlActive();
      const done = tasks.filter(function (t) { return cdlState.done[t.id]; }).length;
      const pct = tasks.length ? Math.round(done / tasks.length * 100) : 0;
      document.getElementById("cdl-pct").textContent = pct + "%";
      document.getElementById("cdl-fill").style.width = pct + "%";
      document.getElementById("cdl-counts").textContent =
        tpl(T("{done} of {total} tasks done"), { done: done, total: tasks.length });
      document.querySelectorAll(".cdl-mile").forEach(function (m) {
        const boxes = m.querySelectorAll(".cdl-check");
        const dn = m.querySelectorAll(".cdl-check:checked").length;
        m.querySelector(".cdl-mile-count").textContent = dn + " / " + boxes.length;
        m.classList.toggle("is-complete", dn === boxes.length);
      });
    }

    function cdlBuildTask(task) {
      const row = document.createElement("div");
      row.className = "cdl-task" + (cdlState.done[task.id] ? " is-done" : "");

      const box = document.createElement("input");
      box.type = "checkbox";
      box.className = "cdl-check";
      box.checked = !!cdlState.done[task.id];
      box.setAttribute("aria-label", T(task.t));
      box.addEventListener("change", function () {
        if (box.checked) cdlState.done[task.id] = true;
        else delete cdlState.done[task.id];
        row.classList.toggle("is-done", box.checked);
        cdlSave();
        cdlProgress();
      });

      const main = document.createElement("div");
      main.className = "cdl-main";
      const titleRow = document.createElement("div");
      titleRow.className = "cdl-title-row";
      const title = document.createElement("span");
      title.className = "cdl-title";
      title.textContent = T(task.t);
      const badge = document.createElement("span");
      badge.className = "cdl-badge p-" + (task.p === "high" ? "high" : task.p === "medium" ? "med" : "low");
      badge.textContent = T(task.p === "high" ? "High" : task.p === "medium" ? "Medium" : "Low");
      titleRow.appendChild(title);
      titleRow.appendChild(badge);
      const desc = document.createElement("p");
      desc.className = "cdl-desc";
      desc.textContent = T(task.d);
      main.appendChild(titleRow);
      main.appendChild(desc);

      if (task.tip) {
        const more = document.createElement("div");
        more.className = "cdl-more";
        const btn = document.createElement("button");
        btn.type = "button";
        btn.textContent = T("Learn more");
        btn.setAttribute("aria-expanded", "false");
        const tip = document.createElement("div");
        tip.className = "cdl-tip";
        tip.textContent = T(task.tip);
        btn.addEventListener("click", function () {
          const open = tip.classList.toggle("is-open");
          btn.setAttribute("aria-expanded", String(open));
          btn.textContent = open ? T("Show less") : T("Learn more");
        });
        more.appendChild(btn);
        main.appendChild(more);
        main.appendChild(tip);
      }

      row.appendChild(box);
      row.appendChild(main);
      return row;
    }

    function cdlRender() {
      const box = document.getElementById("cdl-miles");
      box.innerHTML = "";
      const tasks = cdlActive();
      STAGES.forEach(function (stage, idx) {
        const own = tasks.filter(function (t) { return t.st === idx; });
        if (!own.length) return;
        const det = document.createElement("details");
        det.className = "cdl-mile";
        det.open = true;
        const sum = document.createElement("summary");
        const h = document.createElement("h3");
        h.textContent = T(stage.name);
        const count = document.createElement("span");
        count.className = "cdl-mile-count";
        const chev = document.createElement("span");
        chev.className = "cdl-chev";
        sum.appendChild(h);
        sum.appendChild(count);
        sum.appendChild(chev);
        const body = document.createElement("div");
        body.className = "cdl-mile-body";
        own.forEach(function (t) { body.appendChild(cdlBuildTask(t)); });
        det.appendChild(sum);
        det.appendChild(body);
        box.appendChild(det);
      });
      cdlCountdown();
      cdlProgress();
    }

    function cdlShowPlan() {
      document.getElementById("cdl-onboard").hidden = true;
      document.getElementById("cdl-plan").hidden = false;
      cdlRender();
    }
    function cdlShowOnboard() {
      document.getElementById("cdl-plan").hidden = true;
      document.getElementById("cdl-onboard").hidden = false;
    }

    /* --- PDF export.
       jsPDF's built-in fonts are Latin-only, so when the site runs in
       Ukrainian the DejaVu Sans family (full Cyrillic coverage) is
       fetched from the same CDN and embedded — the PDF then renders
       through T() in the visitor's language. --- */
    function loadJsPdf() {
      return new Promise(function (resolve, reject) {
        if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf.jsPDF); return; }
        const s = document.createElement("script");
        // Pin the exact jsPDF build — a compromised or swapped CDN file
        // fails the integrity check and simply won't run.
        s.integrity = "sha384-JcnsjUPPylna1s1fvi1u12X5qjY5OL56iySh75FdtrwhO/SWXgMjoVqcKyIIWOLk";
        s.crossOrigin = "anonymous";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = function () {
          if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
          else reject(new Error("jsPDF missing after load"));
        };
        s.onerror = function () { reject(new Error("jsPDF failed to load")); };
        document.head.appendChild(s);
      });
    }

    function pdfUk() {
      return !!(window.USUFU_I18N && window.USUFU_I18N.lang() === "uk");
    }

    const PDF_FONTS = [
      { file: "DejaVuSans.ttf", style: "normal",
        url: "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf",
        sha384: "WWCI8RVJmiZvis8EpwnSyGn7cTtzGfshxkxsg5ZuL9AUFpzKg99zhn/2lkFh2+vG" },
      { file: "DejaVuSans-Bold.ttf", style: "bold",
        url: "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans-Bold.ttf",
        sha384: "NaVuSXCZeye4QyXzNedGU5Jz3B9xbAydt90g8TJAfHeosmQCXUNytQnYH5ZzJgKv" },
      { file: "DejaVuSans-Oblique.ttf", style: "italic",
        url: "https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans-Oblique.ttf",
        sha384: "QrwdLaYMAPu/g1Eqn1Apmm7ggqHyyqnIfgjCEgdjy5P/npl3cSANTYn5m4UBx9pE" }
    ];
    let pdfFontCache = null; // base64 fonts survive repeated exports

    function bufToB64(buf) {
      const bytes = new Uint8Array(buf);
      let bin = "";
      for (let i = 0; i < bytes.length; i += 0x8000) {
        bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
      }
      return btoa(bin);
    }

    // The integrity attribute only covers <script>/<link>, not fetch(),
    // so verify each font's SHA-384 by hand and reject a CDN that serves
    // anything but the exact pinned file.
    function fetchFontB64(font) {
      return fetch(font.url, { cache: "force-cache" }).then(function (res) {
        if (!res.ok) throw new Error("Font HTTP " + res.status);
        return res.arrayBuffer();
      }).then(function (buf) {
        return crypto.subtle.digest("SHA-384", buf).then(function (digest) {
          if (bufToB64(digest) !== font.sha384) {
            throw new Error("Font integrity check failed: " + font.file);
          }
          return bufToB64(buf);
        });
      });
    }

    function loadCyrillicFonts() {
      if (pdfFontCache) return Promise.resolve(pdfFontCache);
      return Promise.all(PDF_FONTS.map(function (f) { return fetchFontB64(f); }))
        .then(function (b64s) {
          pdfFontCache = b64s;
          return b64s;
        });
    }

    function buildPdf(JsPDF) {
      const doc = new JsPDF({ unit: "pt", format: "a4" });
      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();
      const M = 56;
      const NAVY = [15, 21, 42], INK = [18, 19, 23], GREY = [104, 110, 130],
            FAINT = [200, 203, 214], BEIGE = [254, 253, 250], LOW = [160, 164, 180];
      const setup = cdlState.setup;
      const tasks = cdlActive();
      const doneCount = tasks.filter(function (t) { return cdlState.done[t.id]; }).length;
      let y;

      /* Ukrainian PDFs swap both families for the embedded DejaVu —
         the built-in times/helvetica have no Cyrillic glyphs */
      const uk = pdfUk() && pdfFontCache;
      if (uk) {
        PDF_FONTS.forEach(function (f, i) {
          doc.addFileToVFS(f.file, pdfFontCache[i]);
          doc.addFont(f.file, "DejaVu", f.style);
        });
      }
      const SERIF = uk ? "DejaVu" : "times";
      const SANS = uk ? "DejaVu" : "helvetica";
      // DejaVu ships no bold-italic here; italic text falls back cleanly
      const ITALIC = "italic";

      /* First-page masthead */
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.rect(0, 0, W, 108, "F");
      doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);
      doc.setFont(SANS, "normal");
      doc.setFontSize(8);
      doc.text("UNITED STATES UNIVERSITIES FOR UKRAINE", M, 34, { charSpace: 2 });
      doc.setTextColor(BEIGE[0], BEIGE[1], BEIGE[2]);
      doc.setFont(SERIF, "bold");
      doc.setFontSize(26);
      doc.text(T("Countdown to College"), M, 68);
      doc.setFont(SANS, "normal");
      doc.setFontSize(9);
      doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);
      const dateStr = new Date().toLocaleDateString(uk ? "uk-UA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" });
      doc.text(tpl(T("Personal admissions checklist — generated {date}"), { date: dateStr }), M, 88);

      /* Plan summary strip */
      y = 134;
      doc.setFontSize(9);
      doc.setTextColor(GREY[0], GREY[1], GREY[2]);
      const strategies = [];
      if (setup.early) strategies.push(T("Early Decision / Early Action"));
      if (setup.regular) strategies.push(T("Regular Decision"));
      if (setup.testopt) strategies.push(T("Test-optional schools"));
      if (setup.finaid) strategies.push(T("Financial aid / FAFSA"));
      doc.text(
        tpl(T("Grade: {g}"), { g: T(GRADE_LABEL[setup.grade]) }) +
        "    ·    " +
        tpl(T("Target: {t}"), { t: T(TIER_LABEL[setup.tier]) }), M, y);
      y += 14;
      doc.text(tpl(T("Strategy: {s}"), { s: strategies.length ? strategies.join(", ") : "—" }), M, y);
      y += 16;
      const pct = tasks.length ? Math.round(doneCount / tasks.length * 100) : 0;
      doc.setDrawColor(230, 228, 220);
      doc.setFillColor(236, 234, 226);
      doc.roundedRect(M, y, W - M * 2, 7, 3.5, 3.5, "F");
      if (pct > 0) {
        doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.roundedRect(M, y, Math.max((W - M * 2) * pct / 100, 7), 7, 3.5, 3.5, "F");
      }
      y += 20;
      doc.setTextColor(INK[0], INK[1], INK[2]);
      doc.text(tpl(T("{done} of {total} tasks complete — {pct}%"),
        { done: doneCount, total: tasks.length, pct: pct }), M, y);
      y += 14;

      function ensure(height) {
        if (y + height <= H - 72) return;
        doc.addPage();
        doc.setFont(SANS, "normal");
        doc.setFontSize(8);
        doc.setTextColor(LOW[0], LOW[1], LOW[2]);
        doc.text(T("Countdown to College") + " — United States Universities For Ukraine", M, 40);
        doc.setDrawColor(224, 222, 214);
        doc.setLineWidth(0.6);
        doc.line(M, 48, W - M, 48);
        y = 70;
      }

      const bodyW = W - M * 2 - 26; // text column right of the checkbox
      STAGES.forEach(function (stage, idx) {
        const own = tasks.filter(function (t) { return t.st === idx; });
        if (!own.length) return;

        ensure(64);
        y += 14;
        doc.setFont(SERIF, "bold");
        doc.setFontSize(13);
        doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.text(T(stage.name), M, y);
        const dn = own.filter(function (t) { return cdlState.done[t.id]; }).length;
        doc.setFont(SANS, "normal");
        doc.setFontSize(8);
        doc.setTextColor(GREY[0], GREY[1], GREY[2]);
        doc.text(tpl(T("{done} of {total} done"), { done: dn, total: own.length }), W - M, y, { align: "right" });
        y += 8;
        doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.setLineWidth(0.8);
        doc.line(M, y, W - M, y);
        y += 16;

        own.forEach(function (task) {
          const isDone = !!cdlState.done[task.id];
          doc.setFont(SANS, "normal");
          doc.setFontSize(8.5);
          const descLines = doc.splitTextToSize(T(task.d), bodyW);
          const tipLines = task.tip ? doc.splitTextToSize(T("Tip:") + " " + T(task.tip), bodyW) : [];
          const blockH = 14 + descLines.length * 10.5 + (tipLines.length ? tipLines.length * 10 + 4 : 0) + 10;
          ensure(blockH);

          // checkbox
          doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
          doc.setLineWidth(1);
          if (isDone) {
            doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
            doc.roundedRect(M, y - 8, 10, 10, 2.5, 2.5, "F");
            doc.setDrawColor(BEIGE[0], BEIGE[1], BEIGE[2]);
            doc.setLineWidth(1.2);
            doc.line(M + 2.4, y - 3.4, M + 4.1, y - 1.4);
            doc.line(M + 4.1, y - 1.4, M + 7.8, y - 6);
          } else {
            doc.roundedRect(M, y - 8, 10, 10, 2.5, 2.5, "S");
          }

          // priority tag, right-aligned
          const tag = T(task.p === "high" ? "High" : task.p === "medium" ? "Medium" : "Low").toUpperCase();
          doc.setFont(SANS, "bold");
          doc.setFontSize(6.5);
          const tagW = doc.getTextWidth(tag) + 10;
          const tagX = W - M - tagW;
          if (task.p === "high") {
            doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
            doc.roundedRect(tagX, y - 7.5, tagW, 10, 5, 5, "F");
            doc.setTextColor(BEIGE[0], BEIGE[1], BEIGE[2]);
          } else if (task.p === "medium") {
            doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
            doc.setLineWidth(0.7);
            doc.roundedRect(tagX, y - 7.5, tagW, 10, 5, 5, "S");
            doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
          } else {
            doc.setDrawColor(LOW[0], LOW[1], LOW[2]);
            doc.setLineWidth(0.7);
            doc.roundedRect(tagX, y - 7.5, tagW, 10, 5, 5, "S");
            doc.setTextColor(LOW[0], LOW[1], LOW[2]);
          }
          doc.text(tag, tagX + 5, y - 0.5);

          // title (struck through when done)
          doc.setFont(SANS, "bold");
          doc.setFontSize(10);
          if (isDone) doc.setTextColor(GREY[0], GREY[1], GREY[2]);
          else doc.setTextColor(INK[0], INK[1], INK[2]);
          const titleMax = tagX - (M + 18) - 8;
          const titleLines = doc.splitTextToSize(T(task.t), titleMax);
          doc.text(titleLines[0], M + 18, y);
          if (isDone) {
            const tw = Math.min(doc.getTextWidth(titleLines[0]), titleMax);
            doc.setDrawColor(GREY[0], GREY[1], GREY[2]);
            doc.setLineWidth(0.7);
            doc.line(M + 18, y - 3, M + 18 + tw, y - 3);
          }
          y += 13;
          if (titleLines.length > 1) {
            doc.text(titleLines[1], M + 18, y);
            y += 13;
          }

          // description
          doc.setFont(SANS, "normal");
          doc.setFontSize(8.5);
          doc.setTextColor(GREY[0], GREY[1], GREY[2]);
          doc.text(descLines, M + 18, y);
          y += descLines.length * 10.5;

          // tip
          if (tipLines.length) {
            y += 2;
            doc.setFont(SANS, ITALIC);
            doc.setFontSize(8);
            doc.setTextColor(LOW[0], LOW[1], LOW[2]);
            doc.text(tipLines, M + 18, y);
            y += tipLines.length * 10;
          }
          y += 12;
        });
      });

      /* Footer on every page */
      const pages = doc.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setDrawColor(224, 222, 214);
        doc.setLineWidth(0.6);
        doc.line(M, H - 52, W - M, H - 52);
        doc.setFont(SANS, "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(LOW[0], LOW[1], LOW[2]);
        doc.text("United States Universities For Ukraine — " + T("“Advancing Excellence. Ensuring Success.”"), M, H - 38);
        doc.text(tpl(T("Page {i} of {n}"), { i: i, n: pages }), W - M, H - 38, { align: "right" });
      }

      doc.save("USUFU-Countdown-to-College.pdf");
    }

    /* --- Wire up --- */
    document.getElementById("cdl-build").addEventListener("click", function () {
      const setup = cdlReadForm();
      cdlState = cdlState || { setup: null, done: {} };
      cdlState.setup = setup; // done states survive answer changes — ids are stable
      cdlSave();
      cdlShowPlan();
    });
    document.getElementById("cdl-edit").addEventListener("click", function () {
      cdlWriteForm(cdlState.setup);
      cdlShowOnboard();
    });
    document.getElementById("cdl-reset").addEventListener("click", function () {
      try { localStorage.removeItem(STORE_KEY); } catch (e) {}
      cdlState = null;
      cdlShowOnboard();
    });
    const pdfBtn = document.getElementById("cdl-pdf");
    pdfBtn.addEventListener("click", function () {
      pdfBtn.disabled = true;
      const original = pdfBtn.textContent;
      pdfBtn.textContent = T("Preparing PDF…");
      Promise.all([
        loadJsPdf(),
        pdfUk() ? loadCyrillicFonts() : Promise.resolve(null)
      ])
        .then(function (loaded) { buildPdf(loaded[0]); })
        .catch(function () {
          alert(T("The PDF could not be prepared — check your internet connection and try again."));
        })
        .then(function () {
          pdfBtn.disabled = false;
          pdfBtn.textContent = original;
        });
    });

    cdlState = cdlLoad();
    if (cdlState) cdlShowPlan();
  }

  /* ------------------------------------------------------------------
     8. Aid letter de-coder (finances.html)
        Up to three award letters, decoded into free / earned /
        borrowed money: net price, cash still needed, four-year debt
        with a warning threshold, a stacked comparison chart and a
        ranked verdict. Nothing is stored.
     ------------------------------------------------------------------ */
  const decoderCalc = document.getElementById("decoder-calc");

  if (decoderCalc) {
    const DEC_MAX = 999999;
    const DEBT_WARN = 60000; // ≈ a typical starting salary
    const C_FREE = "#2f7d4f", C_WORK = "#b9a23a", C_LOAN = "#b0552f", C_GAP = "#9aa0b5";
    const KEYS = ["coa", "merit", "fedgrant", "work", "fedloan", "plusloan"];

    const cols = [0, 1, 2].map(function (ci) {
      const col = { letter: "ABC"[ci], vals: {}, nameInput: document.getElementById("dec-name-" + ci) };
      col.nameInput.addEventListener("input", decUpdate);
      KEYS.forEach(function (key) {
        const input = document.getElementById("dec-" + key + "-" + ci);
        input.addEventListener("input", function () {
          if (input.value !== "") {
            const v = parseFloat(input.value);
            if (!isFinite(v)) input.value = "";
            else if (v > DEC_MAX) input.value = DEC_MAX;
            else if (v < 0) input.value = 0;
          }
          col.vals[key] = parseFloat(input.value) || 0;
          decUpdate();
        });
      });
      return col;
    });

    function decMetrics(col) {
      const v = function (k) { return col.vals[k] || 0; };
      const coa = v("coa");
      const free = v("merit") + v("fedgrant");
      const work = v("work");
      const loans = v("fedloan") + v("plusloan");
      return {
        name: col.nameInput.value.trim() || tpl(T("College {x}"), { x: col.letter }),
        coa: coa, free: free, work: work, loans: loans,
        net: Math.max(coa - free, 0),
        cash: Math.max(coa - free - work - loans, 0),
        debt4: loans * 4,
        hasData: coa > 0
      };
    }

    function decCards(list) {
      const box = document.getElementById("dec-cards");
      box.innerHTML = "";
      list.forEach(function (m) {
        const card = document.createElement("div");
        if (!m.hasData) {
          card.className = "dec-card is-empty";
          card.textContent = tpl(T("Enter {name}’s sticker price to decode the offer."), { name: m.name });
          box.appendChild(card);
          return;
        }
        card.className = "dec-card";
        const h = document.createElement("h4");
        h.textContent = m.name;
        const netLabel = document.createElement("div");
        netLabel.className = "dec-net-label";
        netLabel.textContent = T("What you actually owe the school");
        const net = document.createElement("div");
        net.className = "dec-net";
        net.textContent = usd(m.net);
        const rows = document.createElement("div");
        rows.className = "dec-rows";
        [
          [T("Sticker price"), usd(m.coa), false],
          [T("Free money"), "− " + usd(m.free), false],
          [T("Work-study"), usd(m.work), false],
          [T("Loans this year"), usd(m.loans), m.loans > 0],
          [T("Cash still needed"), usd(m.cash), false],
          [T("Projected 4-year debt"), usd(m.debt4), m.debt4 > DEBT_WARN]
        ].forEach(function (r) {
          const row = document.createElement("div");
          row.className = "dec-row" + (r[2] ? " warn" : "");
          const s1 = document.createElement("span"); s1.textContent = r[0];
          const s2 = document.createElement("b"); s2.textContent = r[1];
          row.appendChild(s1);
          row.appendChild(s2);
          rows.appendChild(row);
        });
        card.appendChild(h);
        card.appendChild(netLabel);
        card.appendChild(net);
        card.appendChild(rows);
        if (m.debt4 > DEBT_WARN) {
          const warn = document.createElement("div");
          warn.className = "dec-warn";
          warn.textContent = "⚠ " + tpl(
            T("{amount} over four years is more than a typical starting salary. Borrowing beyond your expected first-year income is where debt turns dangerous."),
            { amount: usd(m.debt4) });
          card.appendChild(warn);
        }
        box.appendChild(card);
      });
    }

    function decChart(list) {
      const box = document.getElementById("dec-chart-box");
      box.innerHTML = "";
      const active = list.filter(function (m) { return m.hasData; });
      if (!active.length) {
        const p = document.createElement("p");
        p.className = "dec-empty";
        p.textContent = T("The chart draws itself as soon as one school has a sticker price.");
        box.appendChild(p);
        return;
      }
      const W = 760, H = 300, TOP = 34, BOT = 44, plotH = H - TOP - BOT;
      const svg = svgEl("svg", { viewBox: "0 0 " + W + " " + H, role: "img",
        "aria-label": "Stacked comparison of each school's cost of attendance" });
      const maxTotal = Math.max.apply(null, active.map(function (m) {
        return Math.max(m.coa, m.free + m.work + m.loans);
      }));
      const scale = function (v) { return v / maxTotal * plotH; };
      const bw = 120;
      active.forEach(function (m, i) {
        const x = (W / (active.length + 1)) * (i + 1) - bw / 2;
        let y = TOP + plotH;
        const gap = Math.max(m.coa - m.free - m.work - m.loans, 0);
        [[m.free, C_FREE], [m.work, C_WORK], [m.loans, C_LOAN], [gap, C_GAP]].forEach(function (seg) {
          if (seg[0] <= 0) return;
          const h = scale(seg[0]);
          y -= h;
          svg.appendChild(svgEl("rect", { x: x, y: y, width: bw, height: h, fill: seg[1], rx: 3 }));
        });
        svg.appendChild(svgEl("text", { x: x + bw / 2, y: y - 10, "text-anchor": "middle",
          "font-size": "13", "font-weight": "500", fill: "#121317" }, usd(m.coa)));
        const label = m.name.length > 16 ? m.name.slice(0, 15) + "…" : m.name;
        svg.appendChild(svgEl("text", { x: x + bw / 2, y: TOP + plotH + 20, "text-anchor": "middle",
          "font-size": "12", fill: "#5a6076" }, label));
        svg.appendChild(svgEl("text", { x: x + bw / 2, y: TOP + plotH + 36, "text-anchor": "middle",
          "font-size": "11", fill: "#9aa0b5" }, tpl(T("net {v}"), { v: usd(m.net) })));
      });
      svg.appendChild(svgEl("line", { x1: 30, y1: TOP + plotH, x2: W - 30, y2: TOP + plotH,
        stroke: "rgba(15,21,42,.25)", "stroke-width": 1 }));
      box.appendChild(svg);
    }

    function decInsight(list) {
      const active = list.filter(function (m) { return m.hasData; });
      const wrap = document.getElementById("dec-insight");
      const box = document.getElementById("dec-insight-text");
      if (active.length < 2) { wrap.hidden = true; return; }
      wrap.hidden = false;

      const byNet = active.slice().sort(function (a, b) { return a.net - b.net; });
      const byDebt = active.slice().sort(function (a, b) { return a.debt4 - b.debt4; });
      const cheapest = byNet[0], priciest = byNet[byNet.length - 1];
      const leastDebt = byDebt[0], mostDebt = byDebt[byDebt.length - 1];

      let text;
      if (priciest.net - cheapest.net > 0) {
        text = tpl(T("{best} has the lowest true cost — {net} a year after free money, {diff} less than {worst}."),
          { best: cheapest.name, net: usd(cheapest.net), diff: usd(priciest.net - cheapest.net), worst: priciest.name });
      } else {
        text = tpl(T("The offers tie on true cost — {net} a year after free money at each school."),
          { net: usd(cheapest.net) });
      }
      if (mostDebt.debt4 - leastDebt.debt4 > 0) {
        text += " " + tpl(T("On borrowing alone, {safe} is the safest choice: roughly {diff} less debt over four years than {risky}."),
          { safe: leastDebt.name, diff: usd(mostDebt.debt4 - leastDebt.debt4), risky: mostDebt.name });
      } else {
        text += " " + T("Their loan burdens are identical, so the decision comes down to cost and fit.");
      }
      box.textContent = text;
    }

    function decUpdate() {
      const list = cols.map(decMetrics);
      decCards(list);
      decChart(list);
      decInsight(list);
    }

    decUpdate();
  }

  /* ------------------------------------------------------------------
     9. Jargon translator (college-life.html)
        A searchable, phase-filtered dictionary of the hidden
        curriculum. Opens on the four most famous terms; "Everything"
        reveals all of them with a scroll-staggered fade-in. Each term
        carries a Ukrainian gloss + transliteration (.jg-ua), shown
        by CSS only when the site runs in Ukrainian; the card content
        itself translates through T() like the rest of the site.
     ------------------------------------------------------------------ */
  const jgGrid = document.getElementById("jg-grid");

  if (jgGrid) {
    const PHASES = {
      money:   "Applying & Financials",
      week1:   "The First Week of Class",
      profs:   "Interacting with Professors",
      trouble: "Uh-Oh, I'm in Trouble"
    };

    /* Term schema: id, term, top (featured on open), tags[],
       find[] (search aliases), ua + say (Ukrainian gloss and
       how the English word sounds), official, plain, trick, action */
    const JG_TERMS = [
      { id:"office-hours", term:"Office Hours", top:true, tags:["profs"],
        find:["office hours","office hour"],
        ua:"прийомні години викладача", say:"офіс-аверз",
        official:"Scheduled times during which faculty members are available to meet with students outside of class.",
        plain:"A weekly block where your professor sits in their office, door open, waiting for someone — anyone — to walk in.",
        trick:"They are required to hold these, and most of the time the room is empty. Professors remember the five students who show up. Regulars get the benefit of the doubt on borderline grades and the good recommendation letters.",
        action:"Go once in the first two weeks with one genuine question about the material. That's it — you're now a face, not a row in the gradebook." },

      { id:"syllabus", term:"Syllabus", top:true, tags:["week1"],
        find:["syllabus","syllabi"],
        ua:"програма курсу — документ-договір", say:"сíлабас",
        official:"A document outlining course objectives, required materials, grading policies, and a schedule of assignments and examinations.",
        plain:"The instruction manual and legal contract for the class, handed out on day one and ignored by half the room.",
        trick:"Around 80% of the questions students email professors are answered in the syllabus — and professors know it. 'It's in the syllabus' is their favorite sentence. It also locks in grading rules: if it says the final is 30%, that's enforceable.",
        action:"Day one: put every deadline from every syllabus into one calendar. Twenty minutes now saves an all-nighter in November." },

      { id:"fafsa", term:"FAFSA", top:true, tags:["money"],
        find:["fafsa"],
        ua:"федеральна заявка на фінансову допомогу", say:"фáфса",
        official:"The Free Application for Federal Student Aid, used to determine eligibility for federal grants, loans, and work-study.",
        plain:"The one form that unlocks nearly all US financial aid — federal, state, and often the college's own money too.",
        trick:"It's first-come, first-served in disguise: several states and colleges hand out aid until it runs out. Filing in October versus March can literally be a thousands-of-dollars difference. File even if you think you earn 'too much' — many scholarships require a FAFSA on record.",
        action:"File within a month of it opening (October 1) every single year, not just the first one." },

      { id:"prerequisite", term:"Prerequisite", top:true, tags:["week1"],
        find:["prerequisites","prerequisite","prereqs","prereq"],
        ua:"обов'язковий попередній курс", say:"пріреквізит",
        official:"A course or requirement that must be completed prior to enrollment in a more advanced course.",
        plain:"The class you must pass before they let you into the next class — a locked door with one key.",
        trick:"Prereq chains are why people graduate late: miss one in fall and the whole sequence slides a year. Some departments will waive a prereq if you can show equivalent experience — but only if you ask.",
        action:"Map the prereq chain for your major's longest sequence (usually math or science) and take the first link as early as possible." },

      { id:"add-drop", term:"Add/Drop Period", tags:["week1","trouble"],
        find:["add/drop","add-drop","add drop","drop deadline","drop period"],
        ua:"період вільної зміни розкладу", say:"ед-дроп",
        official:"A designated period at the start of the term during which students may adjust their course schedules without academic or financial penalty.",
        plain:"The first week or two of the semester when classes work like a free-returns store: swap anything, no receipt needed, no trace.",
        trick:"A class dropped inside this window vanishes — no transcript entry, full tuition refund. One day after the window, the same decision costs money and leaves a mark. The exact date matters more than almost any other deadline.",
        action:"Find the add/drop date for this term and write it everywhere. Attend every class once before the window closes — syllabus day tells you everything." },

      { id:"withdrawal", term:"Withdrawal (the “W”)", tags:["trouble","week1"],
        find:["withdrawal","withdraw","withdrew"],
        ua:"офіційна відмова від курсу з позначкою W", say:"віздроал",
        official:"The act of formally discontinuing enrollment in a course after the add/drop period, resulting in a grade notation of 'W' on the transcript.",
        plain:"The emergency exit after the free-returns window: you leave the class, a 'W' appears on your transcript, and the tuition is usually gone.",
        trick:"A W is almost always better than an F — grad schools barely blink at one or two. The real trap is financial: dropping below full-time can quietly break your aid, visa status, or scholarship. Check that before you pull the handle.",
        action:"Before withdrawing, ask financial aid one question: 'Does this change my aid or enrollment status?' Then decide." },

      { id:"bursar", term:"Bursar", tags:["money"],
        find:["bursar's office","bursar"],
        ua:"каса університету — розрахунковий відділ", say:"бéрсар",
        official:"The university official responsible for the billing and collection of student tuition and fees.",
        plain:"The money-collection office. Not financial aid — the bursar is who you owe, financial aid is who helps you pay.",
        trick:"An unpaid bursar balance triggers a 'hold' that silently blocks you from registering for next semester. Almost every bursar offers a monthly payment plan — but it appears only if you ask for it.",
        action:"If a bill looks impossible, call the bursar before the due date and say 'payment plan.' Those two words solve more than panic does." },

      { id:"registrar", term:"Registrar", tags:["week1"],
        find:["registrar's office","registrar"],
        ua:"відділ студентських записів і документів", say:"реджистрáр",
        official:"The administrative office responsible for maintaining academic records, course registration, and enrollment verification.",
        plain:"The record-keepers: transcripts, enrollment letters, degree audits, name changes — the paperwork heart of the school.",
        trick:"When anyone official (landlord, insurance, embassy) needs proof you're a student, the registrar's 'enrollment verification' letter is the document they want — free and usually same-day online.",
        action:"Bookmark the registrar's forms page in week one. You will need it at the least convenient possible moment." },

      { id:"verification", term:"FAFSA Verification", tags:["money","trouble"],
        find:["fafsa verification","verification process","selected for verification","verification"],
        ua:"перевірка даних вашої заявки FAFSA", say:"веріфікéйшн",
        official:"A process by which the institution confirms the accuracy of the data reported on a student's FAFSA.",
        plain:"A random audit of your FAFSA. Scary email, boring reality: they want documents, not explanations.",
        trick:"Your aid is frozen — not cancelled — until you respond. Students lose real money by ignoring these emails out of fear. It's routine: roughly one in five applications gets picked, many at random.",
        action:"Send exactly the documents requested within a week, then email to confirm receipt. Speed is everything here." },

      { id:"sub-unsub", term:"Subsidized vs. Unsubsidized Loans", tags:["money"],
        find:["subsidized loans","unsubsidized loans","subsidized loan","unsubsidized loan","subsidized","unsubsidized"],
        ua:"позика з/без державної сплати відсотків", say:"сабсидáйзд / ансабсидáйзд",
        official:"Direct Subsidized Loans do not accrue interest during enrollment; Direct Unsubsidized Loans begin accruing interest upon disbursement.",
        plain:"Subsidized: the government pays the interest while you're in school. Unsubsidized: the meter starts running the day the money lands.",
        trick:"Same paperwork, very different price. Always max the subsidized offer before touching a dollar of unsubsidized — and both beat private loans on protections. The aid letter lists them side by side hoping you won't notice the difference.",
        action:"On your aid letter, accept in this order: free money → subsidized → unsubsidized → stop and think hard." },

      { id:"work-study", term:"Work-Study", tags:["money"],
        find:["work-study","work study","federal work study"],
        ua:"підробіток на кампусі в межах фіндопомоги", say:"ворк-стáді",
        official:"A federally funded program providing part-time employment to students with demonstrated financial need.",
        plain:"A campus job reserved for aid recipients — library desk, lab assistant, front office — with hours built around your classes.",
        trick:"Two hidden perks: the earnings don't count against you on next year's FAFSA the way outside-job income does, and campus employers plan around finals week. The catch — being 'awarded' work-study is just permission. You still have to go get hired, and the good jobs vanish in week one.",
        action:"If your aid letter lists work-study, apply to campus jobs the first week of the semester — treat it like a real job hunt." },

      { id:"net-price", term:"Net Price", tags:["money"],
        find:["net price"],
        ua:"реальна ціна року після грантів", say:"нет прайс",
        official:"The cost of attendance minus grant and scholarship aid, representing the estimated actual annual cost to the student.",
        plain:"What a year really costs you after free money — the number that matters, hiding behind the sticker price.",
        trick:"A $70k private college with big grants regularly beats a $30k public one at sticker. Never compare colleges by sticker price; compare net. Every US college is legally required to publish a net price calculator.",
        action:"Run each college's net price calculator before you fall in love. Our Finances page decodes the full aid letters when they arrive." },

      { id:"appeal", term:"Financial Aid Appeal", tags:["money","trouble"],
        find:["professional judgment","aid appeal","financial aid appeal","appeal"],
        ua:"запит на перегляд фінансової допомоги", say:"епíл",
        official:"A formal request for the reevaluation of a financial aid award based on special or changed circumstances, also termed 'professional judgment.'",
        plain:"Politely asking the college for more money — a real, normal process with a form and everything, not begging.",
        trick:"Aid offices expect appeals and have discretionary funds for them. Job loss, medical bills, a currency collapse, a better offer from a rival school — all legitimate grounds. The phrase 'professional judgment review' signals you know the system.",
        action:"Email the aid office: one paragraph, the change in circumstances, a document proving it, and a specific ask. Worst case is 'no.'" },

      { id:"credit-hour", term:"Credit Hour", tags:["week1"],
        find:["credit hours","credit hour"],
        ua:"залікова одиниця (кредит)", say:"крéдит-áвер",
        official:"A unit measuring educational credit, typically corresponding to one hour of classroom instruction per week over a semester.",
        plain:"The currency of college. Classes cost 3–4 credits each; a bachelor's degree costs about 120.",
        trick:"The quiet math nobody shows you: 12 credits/semester is 'full-time' — but at that pace you finish in five years, not four. Four-year graduation requires ~15 per semester. Each credit also expects 2–3 hours of homework weekly: 15 credits is a full-time job.",
        action:"Default to 15 credits a semester. Drop to 12 only deliberately — and know you're buying an extra semester when you do." },

      { id:"lecture-discussion", term:"Lecture vs. Discussion Section", tags:["week1","profs"],
        find:["discussion section","discussion sections","recitation","lecture section"],
        ua:"лекція та мала група для обговорення", say:"дискáшн сéкшн",
        official:"Large courses may combine a faculty lecture with smaller, regularly scheduled discussion sections led by teaching assistants.",
        plain:"Big class, two parts: the 300-person lecture where the professor performs, and the 20-person section where you actually get to talk.",
        trick:"The section is where your grade lives — attendance is usually taken there, participation is scored there, and the TA who runs it grades your exams. Skipping lecture is survivable. Skipping section rarely is.",
        action:"Learn your section TA's name in week one and speak once per meeting. Small room, easy visibility, real payoff." },

      { id:"ta", term:"TA (Teaching Assistant)", tags:["profs"],
        find:["teaching assistant","teaching assistants","the ta","tas"],
        ua:"асистент викладача — аспірант", say:"ті-ей",
        official:"A graduate student appointed to assist a faculty member with instructional responsibilities, including grading and section leadership.",
        plain:"A grad student — half teacher, half student — who runs your section, grades your work, and remembers being in your seat.",
        trick:"The TA grades your exams and often decides borderline cases. Their office hours are emptier and friendlier than the professor's, and they know exactly what's on the test because they're helping write the rubric. Being known by the TA is the most underrated grade insurance in college.",
        action:"Take one graded assignment to TA office hours and ask 'what would have made this an A?' Then do that next time." },

      { id:"adjunct", term:"Adjunct vs. Tenured Professor", tags:["profs"],
        find:["adjunct professor","adjunct","tenured professor","tenure-track","tenured","tenure"],
        ua:"викладач за контрактом / постійний професор", say:"áджанкт / тéньюрд",
        official:"Adjunct faculty are employed on a part-time or contractual basis; tenured faculty hold permanent appointments with institutional governance roles.",
        plain:"Adjuncts are freelancers teaching class-by-class, sometimes at three campuses at once. Tenured professors are the permanent residents with the corner offices.",
        trick:"Neither is 'better' for you, but they're useful differently: adjuncts often have current industry jobs — internship gold. Tenured professors control research spots, grad-school letters, and department favors. Adjuncts may answer email slowly (three campuses!) — patience, not offense.",
        action:"Look your professors up before asking for help: industry question → the adjunct; research or grad school → the tenured one." },

      { id:"advisor", term:"Academic Advisor", tags:["profs","week1"],
        find:["academic advisor","academic adviser","advisor","adviser"],
        ua:"академічний радник", say:"едвáйзер",
        official:"A professional or faculty member assigned to assist students with course selection and degree planning.",
        plain:"Your assigned guide through the degree maze. Quality ranges from life-changing mentor to a person reading the catalog to you slowly.",
        trick:"Advisors juggle hundreds of students, so the ones who arrive with a plan get the real advice. And an advisor's verbal 'that will count' has caused a thousand delayed graduations — course substitutions are real only in writing.",
        action:"Book advising two weeks before registration opens (not during the rush), bring a draft schedule, and get any promise in an email." },

      { id:"probation", term:"Academic Probation", tags:["trouble"],
        find:["academic probation","probation"],
        ua:"академічний випробувальний термін", say:"пробéйшн",
        official:"A status assigned when a student's GPA falls below the required minimum, indicating that continued enrollment is conditional upon improvement.",
        plain:"A formal warning shot — usually for a GPA under 2.0. Not expulsion, not the end: a semester to turn it around, with conditions.",
        trick:"Probation unlocks help that's otherwise hidden: priority tutoring, success coaching, sometimes course-retake forgiveness. The real danger is silence — students who hide from it get suspended; students who walk into the advising office mostly recover. Also: check SAP, because aid has its own separate rulebook.",
        action:"Within a week of the letter: meet your advisor, ask about grade-replacement policies, and confirm your financial aid status." },

      { id:"sap", term:"SAP (Satisfactory Academic Progress)", tags:["trouble","money"],
        find:["satisfactory academic progress","sap appeal","sap"],
        ua:"правила успішності для збереження фіндопомоги", say:"ес-ей-пí",
        official:"Federal standards requiring aid recipients to maintain a minimum GPA and complete a minimum percentage of attempted credits.",
        plain:"Financial aid's own report card: keep roughly a 2.0 and finish about two-thirds of what you sign up for, or the money stops.",
        trick:"This is the quiet aid-killer — separate from academic probation, and Ws and Fs both count against your 'completion rate.' Students discover SAP exists the day their aid disappears. There is always an appeal process, and documented hardship (illness, family crisis, war) usually wins it.",
        action:"If aid is ever suspended, file the SAP appeal immediately with documentation — don't accept the first 'no' as final." },

      { id:"incomplete", term:"Incomplete (the “I”)", tags:["trouble"],
        find:["incomplete grade","an incomplete","incomplete"],
        ua:"тимчасова оцінка «незавершено»", say:"інкомплíт",
        official:"A temporary grade assigned when a student, for documented reasons, is unable to complete course requirements within the term.",
        plain:"A pause button for a class: life exploded near finals, so the professor gives you extra weeks to finish instead of a grade.",
        trick:"Two unwritten rules: it's for students who were passing until the emergency (not a rescue from failing), and it must be requested before finals — a documented emergency plus a specific plan almost always gets a yes. Ignore the agreed deadline and the I silently becomes an F.",
        action:"If disaster strikes mid-semester, email the professor before the final: what happened, proof, and a completion date you can hit." },

      { id:"plagiarism", term:"Academic Integrity / Plagiarism", tags:["trouble"],
        find:["academic integrity","academic dishonesty","plagiarism","plagiarized"],
        ua:"академічна доброчесність / плагіат", say:"плéйджерізм",
        official:"Policies prohibiting the representation of another's work or ideas as one's own, violations of which may result in disciplinary action.",
        plain:"The one rule with no free retry: passing off someone else's words, code, or work as yours — on purpose or by accident.",
        trick:"'By accident' counts. A forgotten citation, reusing your own old essay, sharing a doc a friend then copies — all triggerable offenses, and the software catches everything. First-offense outcomes vary wildly between 'redo it' and 'suspension,' so never sign anything at an integrity meeting without reading your school's process first.",
        action:"When rushed and unsure, cite it anyway — over-citing has never hurt anyone. Confused about sources? That's a (free) writing-center visit." },

      { id:"hold", term:"Hold (on your account)", tags:["trouble","money"],
        find:["registration hold","financial hold","a hold on your account","hold on your account"],
        ua:"блокування дій на студентському акаунті", say:"холд",
        official:"A restriction placed on a student account preventing registration, transcript release, or other services until a requirement is resolved.",
        plain:"An invisible handbrake on your account — unpaid bill, missing form, overdue advising — that blocks registration at the worst moment.",
        trick:"Holds don't announce themselves; they wait until registration morning while everyone else takes the good sections. The causes are usually five-minute fixes: a $40 balance, an unsigned form, a missing measles shot from 2019.",
        action:"Check your portal for holds two weeks before every registration period. One glance, once a term." },

      { id:"gen-ed", term:"General Education (“Gen Eds”)", tags:["week1"],
        find:["general education","gen eds","gen-ed","gen ed"],
        ua:"загальноосвітні обов'язкові курси", say:"джен-едз",
        official:"A required core of courses across disciplines intended to provide breadth of knowledge beyond the major.",
        plain:"The mandatory sampler platter — writing, math, science, humanities — that every degree includes no matter your major.",
        trick:"Gen eds are the pivot-insurance of course selection: they count toward any major, so they're the safest credits a freshman can take. The unwritten move is checking which section — the same requirement taught by different professors can be a completely different class.",
        action:"When unsure what to take, take a gen ed. When choosing between sections, check the professor, not the time slot." },

      { id:"dean", term:"The Dean (and the Dean's Office)", tags:["profs","trouble"],
        find:["dean of students","the dean's office","dean's office","the dean"],
        ua:"декан / деканат у справах студентів", say:"дін",
        official:"An academic administrator overseeing a college, school, or student-life division within the university.",
        plain:"The management layer above professors. The 'Dean of Students' office in particular is the fix-it desk for problems too big for any one class.",
        trick:"When life falls apart mid-semester (hospitalization, family emergency, disaster back home), one email to the Dean of Students triggers absence letters to all your professors at once — you don't have to negotiate five times. It's also the office that handles emergency funds most students never know exist.",
        action:"In a real crisis, email the Dean of Students first, professors second. One message: situation, dates, documentation." }
    ];

    /* --- Scroll-staggered card entrance.
       A plain rect sweep instead of IntersectionObserver: 25 cards
       make it cheap, and it can never strand a card invisible. --- */
    function jgSweep() {
      const vh = window.innerHeight;
      document.querySelectorAll(".jg-card:not(.is-in)").forEach(function (c) {
        // Anything at or above the viewport line reveals; only cards
        // still below the fold wait for the scroll to reach them
        if (c.getBoundingClientRect().top < vh - 30) c.classList.add("is-in");
      });
    }
    window.addEventListener("scroll", jgSweep, { passive: true });
    window.addEventListener("resize", jgSweep);

    let jgPhase = "top"; // featured view on open
    let jgQuery = "";

    function jgMatches(t) {
      if (jgQuery) {
        // English fields + their translations + the Ukrainian gloss, so
        // the search works in whichever language the visitor types
        const hay = (t.term + " " + t.find.join(" ") + " " + t.ua + " " +
          t.plain + " " + t.official + " " + t.trick + " " +
          T(t.plain) + " " + T(t.official) + " " + T(t.trick)).toLowerCase();
        return jgQuery.split(/\s+/).every(function (w) { return hay.includes(w); });
      }
      if (jgPhase === "top") return !!t.top;
      if (jgPhase === "all") return true;
      return t.tags.includes(jgPhase);
    }

    function jgCard(t, index) {
      const el = document.createElement("article");
      el.className = "jg-card";
      el.style.transitionDelay = (index % 4) * 70 + "ms";

      const top = document.createElement("div");
      top.className = "jg-top";
      const h = document.createElement("h3");
      h.textContent = t.term;
      const tags = document.createElement("div");
      tags.className = "jg-tags";
      t.tags.forEach(function (tag) {
        const s = document.createElement("span");
        s.className = "jg-tag";
        s.textContent = T(PHASES[tag]);
        tags.appendChild(s);
      });
      top.appendChild(h);
      top.appendChild(tags);
      el.appendChild(top);

      // Ukrainian aid — hardcoded Ukrainian, revealed by html[lang="uk"] CSS
      const ua = document.createElement("p");
      ua.className = "jg-ua";
      ua.innerHTML = "<b>Укр.:</b> " + escHtml(t.ua) + " · звучить як «" + escHtml(t.say) + "»";
      el.appendChild(ua);

      const off = document.createElement("p");
      off.className = "jg-official";
      off.innerHTML = "<b>" + escHtml(T("What the college says")) + "</b>" + escHtml(T(t.official));
      const plain = document.createElement("p");
      plain.className = "jg-plain";
      plain.innerHTML = "<b>" + escHtml(T("Plain English")) + "</b>" + escHtml(T(t.plain));
      const trick = document.createElement("div");
      trick.className = "jg-trick";
      trick.innerHTML = "<b>" + escHtml(T("The unwritten rule")) + "</b>" + escHtml(T(t.trick));
      el.appendChild(off);
      el.appendChild(plain);
      el.appendChild(trick);

      const action = document.createElement("div");
      action.className = "jg-action";
      const atext = document.createElement("div");
      atext.innerHTML = "<b>" + escHtml(T("Your move")) + "</b>" + escHtml(T(t.action));
      const copy = document.createElement("button");
      copy.type = "button";
      copy.className = "jg-copy";
      copy.textContent = T("Copy");
      copy.addEventListener("click", function () {
        const payload = t.term + " — " + T(t.action);
        const done = function () {
          copy.textContent = T("Copied ✓");
          copy.classList.add("is-done");
          setTimeout(function () {
            copy.textContent = T("Copy");
            copy.classList.remove("is-done");
          }, 1600);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(payload).then(done, done);
        } else { done(); }
      });
      action.appendChild(atext);
      action.appendChild(copy);
      el.appendChild(action);

      return el;
    }

    function jgRender() {
      jgGrid.innerHTML = "";
      const found = JG_TERMS.filter(jgMatches);
      found.forEach(function (t, i) { jgGrid.appendChild(jgCard(t, i)); });
      if (!found.length) {
        const none = document.createElement("p");
        none.className = "jg-none";
        none.textContent = T("Nothing matches — but if a college said it and it confused you, it belongs here. Tell us and we'll add it.");
        jgGrid.appendChild(none);
      }
      document.getElementById("jg-count").textContent =
        tpl(T("{shown} of {total} terms"), { shown: found.length, total: JG_TERMS.length });
      setTimeout(jgSweep, 0);
    }

    /* Filters: featured view first, then Everything, then the phases */
    const jgFilterBox = document.getElementById("jg-filters");
    const jgChips = [["top", "The essentials"], ["all", "Everything"]]
      .concat(Object.keys(PHASES).map(function (k) { return [k, PHASES[k]]; }));
    jgChips.forEach(function (pair) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "jg-chip" + (pair[0] === "top" ? " is-on" : "");
      b.setAttribute("aria-pressed", String(pair[0] === "top"));
      b.textContent = T(pair[1]);
      b.addEventListener("click", function () {
        jgPhase = pair[0];
        jgQuery = "";
        document.getElementById("jg-search").value = "";
        jgFilterBox.querySelectorAll(".jg-chip").forEach(function (c) {
          c.classList.remove("is-on");
          c.setAttribute("aria-pressed", "false");
        });
        b.classList.add("is-on");
        b.setAttribute("aria-pressed", "true");
        jgRender();
      });
      jgFilterBox.appendChild(b);
    });

    document.getElementById("jg-search").addEventListener("input", function () {
      jgQuery = this.value.trim().toLowerCase();
      jgRender();
    });

    jgRender();
  }

  /* ------------------------------------------------------------------
     10. Major pivot risk assessor (finances.html)
         Benchmark first-two-year maps for twelve majors over one
         shared course catalog. Overlap credits → Pivot Score and
         risk tier, a Plan A / safe zone / Plan B breakdown, a
         safe-bets-first roadmap, and the cost of switching after
         freshman vs. sophomore year.
     ------------------------------------------------------------------ */
  const pivotCalc = document.getElementById("pivot-calc");

  if (pivotCalc) {
    const PV_CATALOG = {
      ENG101:{ n:"English Composition I", c:3 },
      COMM:  { n:"Public Speaking", c:3 },
      STAT:  { n:"Intro Statistics", c:3 },
      CALC1: { n:"Calculus I", c:4 },
      CALC2: { n:"Calculus II", c:4 },
      BIO1:  { n:"General Biology I + Lab", c:4 },
      BIO2:  { n:"General Biology II", c:4 },
      CHEM1: { n:"General Chemistry I + Lab", c:4 },
      CHEM2: { n:"General Chemistry II", c:4 },
      ORGO:  { n:"Organic Chemistry I", c:4 },
      PHYS1: { n:"Physics I", c:4 },
      PSY101:{ n:"Intro Psychology", c:3 },
      SOC101:{ n:"Intro Sociology", c:3 },
      MICRO: { n:"Microeconomics", c:3 },
      MACRO: { n:"Macroeconomics", c:3 },
      ACCT:  { n:"Financial Accounting", c:3 },
      BUS101:{ n:"Intro to Business", c:3 },
      CS101: { n:"Intro to Programming", c:3 },
      CS102: { n:"Data Structures", c:3 },
      ANAT:  { n:"Anatomy & Physiology I", c:4 },
      NUTR:  { n:"Nutrition", c:3 },
      HUM:   { n:"Humanities Elective", c:3 },
      HIST:  { n:"U.S. History Survey", c:3 },
      LIT:   { n:"Intro to Literature", c:3 },
      ART1:  { n:"Drawing I", c:3 },
      ART2:  { n:"2D Design", c:3 },
      ARTH:  { n:"Art History Survey", c:3 },
      EDU101:{ n:"Foundations of Education", c:3 },
      POLS:  { n:"American Government", c:3 },
      ENGR:  { n:"Intro to Engineering", c:3 },
      LANG:  { n:"Foreign Language I", c:3 },
      ETHIC: { n:"Intro to Philosophy & Ethics", c:3 }
    };

    /* core: the Plan-A-only courses that carry the most pivot risk —
       they lead the sunk-cost list */
    const PV_MAJORS = {
      "Nursing":                { courses:["ENG101","PSY101","BIO1","CHEM1","ANAT","NUTR","STAT","SOC101","HUM","COMM"], core:["ANAT","NUTR"] },
      "Biology":                { courses:["ENG101","BIO1","BIO2","CHEM1","CHEM2","CALC1","STAT","PSY101","HUM","PHYS1"], core:["BIO2","CHEM2"] },
      "Chemistry":              { courses:["ENG101","CHEM1","CHEM2","ORGO","CALC1","CALC2","PHYS1","BIO1","HUM","STAT"], core:["ORGO","CHEM2"] },
      "Business Administration":{ courses:["ENG101","BUS101","ACCT","MICRO","MACRO","STAT","COMM","PSY101","HUM","CALC1"], core:["ACCT","BUS101"] },
      "Psychology":             { courses:["ENG101","PSY101","STAT","BIO1","SOC101","HUM","COMM","LIT","ETHIC","POLS"], core:[] },
      "Computer Science":       { courses:["ENG101","CS101","CS102","CALC1","CALC2","STAT","PHYS1","HUM","ETHIC","COMM"], core:["CS102"] },
      "Mechanical Engineering": { courses:["ENG101","ENGR","CALC1","CALC2","PHYS1","CHEM1","CS101","HUM","COMM","ETHIC"], core:["ENGR","CALC2"] },
      "English":                { courses:["ENG101","LIT","HIST","LANG","HUM","ETHIC","COMM","PSY101","ARTH","POLS"], core:["LANG"] },
      "Fine Arts":              { courses:["ENG101","ART1","ART2","ARTH","HUM","LIT","HIST","COMM","ETHIC","PSY101"], core:["ART1","ART2"] },
      "Economics":              { courses:["ENG101","MICRO","MACRO","STAT","CALC1","POLS","PSY101","HUM","COMM","ACCT"], core:["MACRO"] },
      "Education":              { courses:["ENG101","EDU101","PSY101","SOC101","HIST","LIT","COMM","STAT","HUM","POLS"], core:["EDU101"] },
      "Communications":         { courses:["ENG101","COMM","PSY101","SOC101","LIT","POLS","HUM","STAT","BUS101","ARTH"], core:[] }
    };

    const PV_SEM_CREDITS = 15;
    const PV_RATE_MAX = 5000;

    const pvA = document.getElementById("pv-a");
    const pvB = document.getElementById("pv-b");
    Object.keys(PV_MAJORS).forEach(function (name) {
      [pvA, pvB].forEach(function (sel) {
        const o = document.createElement("option");
        o.value = name;
        o.textContent = name;
        sel.appendChild(o);
      });
    });
    pvA.value = "Nursing";
    pvB.value = "Business Administration";

    const pvCredits = function (ids) {
      return ids.reduce(function (s, id) { return s + PV_CATALOG[id].c; }, 0);
    };

    function pvCourseRow(id) {
      const row = document.createElement("div");
      row.className = "pv-course";
      const s = document.createElement("span");
      s.textContent = PV_CATALOG[id].n;
      const e = document.createElement("em");
      e.textContent = PV_CATALOG[id].c + " cr";
      row.appendChild(s);
      row.appendChild(e);
      return row;
    }
    function pvChip(id) {
      const c = document.createElement("span");
      c.className = "pv-chip";
      c.textContent = PV_CATALOG[id].n;
      return c;
    }
    function pvFill(box, ids) {
      box.innerHTML = "";
      if (!ids.length) {
        const p = document.createElement("p");
        p.className = "pv-emptycol";
        p.textContent = T("Nothing — the plans fully overlap here.");
        box.appendChild(p);
        return;
      }
      ids.forEach(function (id) { box.appendChild(pvCourseRow(id)); });
    }

    function pvUpdate() {
      const a = pvA.value, b = pvB.value;
      const A = PV_MAJORS[a], B = PV_MAJORS[b];
      const same = a === b;

      const shared = A.courses.filter(function (id) { return B.courses.includes(id); });
      const onlyA = A.courses.filter(function (id) { return !B.courses.includes(id); });
      const onlyB = B.courses.filter(function (id) { return !A.courses.includes(id); });

      const totalA = pvCredits(A.courses);
      const overlapCr = pvCredits(shared);
      const pct = same ? 100 : Math.round(overlapCr / ((totalA + pvCredits(B.courses)) / 2) * 100);

      document.getElementById("pv-pct").textContent = pct;
      document.getElementById("pv-fill").style.width = pct + "%";
      const tierEl = document.getElementById("pv-tier");
      let tierClass, tierText, read;
      if (same) {
        tierClass = "low"; tierText = T("No risk");
        read = T("That's the same major twice — the safest pivot in history. Pick a real Plan B to stress-test your schedule.");
      } else if (pct >= 70) {
        tierClass = "low"; tierText = T("Low risk");
        read = tpl(T("{a} and {b} share most of their foundations — {cr} credits count for both. Switching would barely dent your timeline."),
          { a: "<b>" + escHtml(a) + "</b>", b: "<b>" + escHtml(b) + "</b>", cr: overlapCr });
      } else if (pct >= 45) {
        tierClass = "mod"; tierText = T("Moderate risk");
        read = tpl(T("{a} and {b} overlap on {cr} credits. A pivot is affordable — if you schedule the shared courses first."),
          { a: "<b>" + escHtml(a) + "</b>", b: "<b>" + escHtml(b) + "</b>", cr: overlapCr });
      } else {
        tierClass = "high"; tierText = T("High risk");
        read = tpl(T("{a} and {b} live on different planets — only {cr} credits count for both. Front-load the safe zone and decide fast."),
          { a: "<b>" + escHtml(a) + "</b>", b: "<b>" + escHtml(b) + "</b>", cr: overlapCr });
      }
      tierEl.className = "pv-tier " + tierClass;
      tierEl.textContent = tierText;
      document.getElementById("pv-read").innerHTML = read;

      document.getElementById("pv-col-a").textContent = tpl(T("{major} only"), { major: a });
      document.getElementById("pv-col-b").textContent = tpl(T("{major} only"), { major: b });
      pvFill(document.getElementById("pv-list-a"), onlyA);
      pvFill(document.getElementById("pv-list-shared"), shared);
      pvFill(document.getElementById("pv-list-b"), onlyB);

      const safeBox = document.getElementById("pv-safe");
      const sunkBox = document.getElementById("pv-sunk");
      safeBox.innerHTML = "";
      sunkBox.innerHTML = "";
      shared.forEach(function (id) { safeBox.appendChild(pvChip(id)); });
      const sunk = same ? [] : onlyA.filter(function (id) { return A.core.includes(id); })
        .concat(onlyA.filter(function (id) { return !A.core.includes(id); }));
      if (!sunk.length) {
        const p = document.createElement("p");
        p.className = "pv-emptycol";
        p.textContent = same
          ? T("No risk to schedule around — it's the same plan.")
          : T("None — every Plan A course also serves Plan B.");
        sunkBox.appendChild(p);
      } else {
        sunk.forEach(function (id) { sunkBox.appendChild(pvChip(id)); });
      }

      /* Switching cost: a default-path student takes Plan A courses in
         proportion; the non-overlap share of taken credits is lost */
      const rateInput = document.getElementById("pv-rate");
      let rate = parseFloat(rateInput.value);
      if (!isFinite(rate) || rate < 0) rate = 0;
      if (rate > PV_RATE_MAX) { rate = PV_RATE_MAX; rateInput.value = PV_RATE_MAX; }
      const lossShare = same ? 0 : pvCredits(onlyA) / totalA;
      const cap = pvCredits(onlyA);
      const lost1 = Math.min(Math.round(2 * PV_SEM_CREDITS * lossShare), cap);
      const lost2 = Math.min(Math.round(4 * PV_SEM_CREDITS * lossShare), cap);
      const fmtSem = function (lost) {
        const r = Math.round(lost / PV_SEM_CREDITS * 2) / 2;
        if (r <= 0) return T("no extra time");
        return "≈ " + r + " " + T(r === 1 ? "extra semester" : "extra semesters");
      };
      document.getElementById("pv-money-1").textContent = usd(lost1 * rate);
      document.getElementById("pv-sub-1").textContent = lost1 === 0
        ? T("Nothing lost — every credit carries over.")
        : tpl(T("~{cr} credits wouldn't transfer · {time}"), { cr: lost1, time: fmtSem(lost1) });
      document.getElementById("pv-money-2").textContent = usd(lost2 * rate);
      document.getElementById("pv-sub-2").textContent = lost2 === 0
        ? T("Nothing lost — every credit carries over.")
        : tpl(T("~{cr} credits wouldn't transfer · {time}"), { cr: lost2, time: fmtSem(lost2) });

      const noteEl = document.getElementById("pv-note");
      if (same) {
        noteEl.innerHTML = "<b>" + escHtml(T("The strategy:")) + "</b> " +
          escHtml(T("pick a genuinely different Plan B above and this box will tell you how to schedule around it."));
      } else if (overlapCr >= 2 * PV_SEM_CREDITS) {
        noteEl.innerHTML = "<b>" + escHtml(T("The strategy:")) + "</b> " +
          escHtml(tpl(T("the safe zone holds {cr} credits — enough to fill your entire freshman year with courses that count for both plans. Played right, a freshman-year pivot costs you close to nothing."), { cr: overlapCr }));
      } else {
        const safeSem = Math.floor(overlapCr / PV_SEM_CREDITS * 10) / 10;
        noteEl.innerHTML = "<b>" + escHtml(T("The strategy:")) + "</b> " +
          escHtml(tpl(T("the safe zone holds {cr} credits — about {sem} of pivot-proof classes. Take all of them before touching the high-sunk-cost list, and you shrink the worst case above dramatically."),
            { cr: overlapCr, sem: safeSem + " " + T(safeSem === 1 ? "semester" : "semesters") }));
      }
    }

    pvA.addEventListener("change", pvUpdate);
    pvB.addEventListener("change", pvUpdate);
    document.getElementById("pv-rate").addEventListener("input", pvUpdate);
    pvUpdate();
  }

  /* ------------------------------------------------------------------
     11. Ukrainian grade → US GPA converter (calculators.html)
         Converts real Ukrainian transcripts (12-point secondary,
         5-point and 100-point university, ECTS letters — mixable
         row by row) to an estimated unweighted 4.0 GPA, showing the
         US letter behind every course. Entries persist in
         localStorage so navigation doesn't destroy a half-typed
         transcript.

         Conversion bands — sources, checked 2026-07:
         · 12-point and 5-point → US letters follow the standard
           Ukraine tables used by credential evaluators (Scholaro GPA
           country guide for Ukraine; WES iGPA uses the same
           Excellent/Good/Satisfactory banding): 10–12 = A, 7–9 = B,
           4–6 = C, 1–3 = F; and 5 = A, 4 = B, 3 = C, 1–2 = F.
         · 100-point bands follow the ECTS-aligned table Ukrainian
           universities publish in transcripts (e.g. KNU/NaUKMA
           regulations): 90–100 A, 82–89 B, 74–81 C, 64–73 D,
           60–63 E, <60 FX/F — mapped to US letters A / B+ / B / C /
           D / F. Cutoffs vary slightly by institution, which is why
           they live in the UAC_BANDS data table, not in code.
         · ECTS letters map A→A, B→B+, C→B, D→C, E→D, FX/F→F.
         No official national table exists — the visible disclaimer
         in the markup is part of the feature, keep it.
     ------------------------------------------------------------------ */
  const uacCalc = document.getElementById("ua-gpa-calc");

  if (uacCalc) {
    const UAC_STORE = "usufu-ua-gpa";
    const UAC_POINTS = { "A": 4.0, "B+": 3.3, "B": 3.0, "C": 2.0, "D": 1.0, "F": 0 };

    /* Band tables as data — order matters: first match from the top */
    const UAC_BANDS = {
      ua12:  { min: 1, max: 12, bands: [[10, "A"], [7, "B"], [4, "C"], [1, "F"]] },
      ua5:   { min: 1, max: 5,  bands: [[4.5, "A"], [3.5, "B"], [2.5, "C"], [1, "F"]] },
      ua100: { min: 0, max: 100, bands: [[90, "A"], [82, "B+"], [74, "B"], [64, "C"], [60, "D"], [0, "F"]] },
      ects:  { letters: { "A": "A", "B": "B+", "C": "B", "D": "C", "E": "D", "FX": "F", "F": "F" } }
    };
    const UAC_SCALES = [
      ["ua12", "12-point"],
      ["ua5", "5-point"],
      ["ua100", "100-point"],
      ["ects", "ECTS"],
      ["pass", "Зараховано / pass"]
    ];
    const UAC_PLACEHOLDER = { ua12: "1–12", ua5: "1–5", ua100: "0–100", ects: "A–FX", pass: "—" };
    const UAC_RANGE_MSG = {
      ua12: "The 12-point scale takes 1–12 only.",
      ua5: "The 5-point scale takes 1–5 only.",
      ua100: "The 100-point scale takes 0–100 only.",
      ects: "ECTS grades are A, B, C, D, E, FX or F."
    };

    let uacRows = []; // [{name, scale, grade, credits}]

    function uacLoad() {
      try {
        const raw = localStorage.getItem(UAC_STORE);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.rows) || !parsed.rows.length) return null;
        return parsed;
      } catch (e) { return null; }
    }
    function uacSave() {
      try {
        localStorage.setItem(UAC_STORE, JSON.stringify({
          defaultScale: document.getElementById("uac-default-scale").value,
          rows: uacRows
        }));
      } catch (e) { /* storage unavailable — the tool still works for this visit */ }
    }

    /* One row's US letter, or null when it can't be scored.
       Returns { letter } | { skip: true } (pass/fail) | { error } */
    function uacScore(row) {
      if (row.scale === "pass") return { skip: true };
      const raw = String(row.grade == null ? "" : row.grade).trim();
      if (raw === "") return { empty: true };
      if (row.scale === "ects") {
        const key = raw.toUpperCase();
        const letter = UAC_BANDS.ects.letters[key];
        return letter ? { letter: letter } : { error: UAC_RANGE_MSG.ects };
      }
      const def = UAC_BANDS[row.scale];
      const value = parseFloat(raw.replace(",", "."));
      // Reject out-of-range loudly instead of clamping it quietly
      if (!isFinite(value) || value < def.min || value > def.max) {
        return { error: UAC_RANGE_MSG[row.scale] };
      }
      for (let i = 0; i < def.bands.length; i++) {
        if (value >= def.bands[i][0]) return { letter: def.bands[i][1] };
      }
      return { letter: "F" };
    }

    function uacBuildRow(row, index) {
      const el = document.createElement("div");
      el.className = "uac-row";

      const name = document.createElement("input");
      name.type = "text";
      name.className = "uac-name";
      name.placeholder = T("Class") + " " + (index + 1);
      name.setAttribute("aria-label", T("Class name (optional)"));
      name.value = row.name || "";
      name.addEventListener("input", function () {
        row.name = name.value;
        uacSave();
      });

      const scale = document.createElement("select");
      scale.className = "uac-scale";
      scale.setAttribute("aria-label", T("Grading scale"));
      UAC_SCALES.forEach(function (pair) {
        const opt = document.createElement("option");
        opt.value = pair[0];
        opt.textContent = T(pair[1]);
        scale.appendChild(opt);
      });
      scale.value = row.scale;

      const grade = document.createElement("input");
      grade.type = "text";
      grade.className = "uac-grade";
      grade.setAttribute("aria-label", T("Grade"));
      grade.placeholder = UAC_PLACEHOLDER[row.scale];
      grade.value = row.grade || "";
      grade.disabled = row.scale === "pass";

      const credits = document.createElement("input");
      credits.type = "number";
      credits.className = "uac-credits";
      credits.min = "0.5";
      credits.max = "10";
      credits.step = "0.5";
      credits.value = row.credits;
      credits.setAttribute("aria-label", T("Credits"));

      const chip = document.createElement("span");
      chip.className = "uac-letter-chip";

      const remove = document.createElement("button");
      remove.type = "button";
      remove.className = "uac-remove";
      remove.setAttribute("aria-label", T("Remove class"));
      remove.innerHTML =
        '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';

      const err = document.createElement("p");
      err.className = "uac-err";
      err.setAttribute("aria-live", "polite");

      function refreshRow() {
        const result = uacScore(row);
        grade.classList.toggle("is-invalid", !!result.error);
        err.textContent = result.error ? T(result.error) : "";
        if (result.letter) {
          chip.textContent = result.letter;
          chip.classList.remove("is-muted");
        } else {
          chip.textContent = result.skip ? T("pass") : "—";
          chip.classList.add("is-muted");
        }
      }

      scale.addEventListener("change", function () {
        row.scale = scale.value;
        grade.placeholder = UAC_PLACEHOLDER[row.scale];
        grade.disabled = row.scale === "pass";
        if (row.scale === "pass") { row.grade = ""; grade.value = ""; }
        refreshRow();
        uacSave();
        uacCompute();
      });
      grade.addEventListener("input", function () {
        row.grade = grade.value;
        refreshRow();
        uacSave();
        uacCompute();
      });
      credits.addEventListener("input", function () {
        row.credits = parseFloat(credits.value) || 0;
        uacSave();
        uacCompute();
      });
      remove.addEventListener("click", function () {
        if (uacRows.length > 1) {
          uacRows.splice(index, 1);
          uacDrawRows();
          uacSave();
          uacCompute();
        }
      });

      refreshRow();
      el.appendChild(name);
      el.appendChild(scale);
      el.appendChild(grade);
      el.appendChild(credits);
      el.appendChild(chip);
      el.appendChild(remove);
      el.appendChild(err);
      return el;
    }

    function uacDrawRows() {
      const wrap = document.getElementById("uac-rows");
      wrap.innerHTML = "";
      uacRows.forEach(function (row, i) {
        wrap.appendChild(uacBuildRow(row, i));
      });
    }

    function uacCompute() {
      let points = 0, credits = 0, counted = 0, skipped = 0, invalid = 0;
      uacRows.forEach(function (row) {
        const result = uacScore(row);
        if (result.letter && row.credits > 0) {
          points += UAC_POINTS[result.letter] * row.credits;
          credits += row.credits;
          counted++;
        } else if (result.skip) {
          skipped++;
        } else if (result.error) {
          invalid++;
        }
      });

      const valueEl = document.getElementById("uac-value");
      const letterEl = document.getElementById("uac-letter");
      const needle = document.getElementById("uac-needle");
      const countedEl = document.getElementById("uac-counted");

      if (!credits) {
        valueEl.textContent = "—";
        letterEl.textContent = "";
        needle.style.transform = "rotate(-120deg)";
        profilePatch({ gpa: null }); // nothing valid to publish yet
      } else {
        const gpa = points / credits;
        valueEl.textContent = gpa.toFixed(2);
        // Publish for the College List Builder to pre-fill (module 15)
        profilePatch({ gpa: Math.round(gpa * 100) / 100 });
        let best = "F", diff = Infinity;
        Object.keys(UAC_POINTS).forEach(function (L) {
          const d = Math.abs(UAC_POINTS[L] - gpa);
          if (d < diff) { diff = d; best = L; }
        });
        letterEl.textContent = "≈ " + best;
        // 240° dial — same sweep as the GPA gauge above
        needle.style.transform = "rotate(" + (-120 + Math.min(1, Math.max(0, gpa / 4)) * 240) + "deg)";
      }

      let status = tpl(T("{n} graded courses in the average"), { n: counted });
      if (skipped) status += " · " + tpl(T("{n} pass/credit rows left out"), { n: skipped });
      if (invalid) status += " · " + tpl(T("{n} rows need a valid grade"), { n: invalid });
      countedEl.textContent = status;
    }

    /* --- Boot: restore a saved transcript or start with three rows --- */
    const saved = uacLoad();
    const defaultScaleSel = document.getElementById("uac-default-scale");
    if (saved) {
      uacRows = saved.rows.map(function (r) {
        return {
          name: typeof r.name === "string" ? r.name : "",
          scale: UAC_PLACEHOLDER.hasOwnProperty(r.scale) ? r.scale : "ua12",
          grade: typeof r.grade === "string" ? r.grade : "",
          credits: isFinite(parseFloat(r.credits)) && r.credits > 0 ? parseFloat(r.credits) : 1
        };
      });
      if (UAC_PLACEHOLDER.hasOwnProperty(saved.defaultScale)) defaultScaleSel.value = saved.defaultScale;
    } else {
      uacRows = [
        { name: "", scale: "ua12", grade: "", credits: 1 },
        { name: "", scale: "ua12", grade: "", credits: 1 },
        { name: "", scale: "ua12", grade: "", credits: 1 }
      ];
    }

    defaultScaleSel.addEventListener("change", uacSave);
    document.getElementById("uac-add").addEventListener("click", function () {
      if (uacRows.length < 24) {
        uacRows.push({ name: "", scale: defaultScaleSel.value, grade: "", credits: 1 });
        uacDrawRows();
        uacSave();
        uacCompute();
      }
    });

    uacDrawRows();
    uacCompute();
  }

  /* ------------------------------------------------------------------
     12. NMT → SAT/ACT estimator (calculators.html)
         No official NMT↔SAT/ACT concordance exists, so the estimate
         is percentile-anchored: NMT score → percentile among NMT
         takers → the SAT/ACT score at that same percentile. Output
         is a range (±10 percentile points), never a single number.

         Data sources — document before touching the tables:
         · NMT-2024 distributions: cumulative percentiles below are
           APPROXIMATE curves interpolated by us from the official
           UCEQA NMT-2024 statistics (testportal.gov.ua official
           report: math mean 132.5 with 12.8% under threshold,
           Ukrainian mean 146.8 with 0.4% under threshold; 200-point
           counts and the 150+/170+ cohort shares via the UCEQA
           report as summarized by education.ua, Sept 2024). UCEQA
           publishes exact histograms only in the PDF report
           (Zvit_NMT_2024_Tom_I) — if you can transcribe those
           tables, replace these curves and delete this caveat.
         · SAT: College Board "Understanding SAT Scores 2024" user
           percentiles (total and section).
         · ACT: ACT national norms 2024 (composite).
         Percentile tables are [score, cumulative percentile] pairs,
         linearly interpolated both ways.
     ------------------------------------------------------------------ */
  const nmtCalc = document.getElementById("nmt-calc");

  if (nmtCalc) {
    // Approximate cumulative percentile among scored NMT-2024 takers
    const NMT_DIST = {
      math: [[100, 2], [110, 22], [120, 40], [130, 55], [140, 67], [150, 77], [160, 85], [170, 91], [180, 95], [190, 98], [200, 99.6]],
      lang: [[100, 1], [110, 5], [120, 12], [130, 24], [140, 38], [150, 55], [160, 70], [170, 82], [180, 91], [190, 97], [200, 99.8]]
    };
    // College Board 2024 SAT user percentiles (total, 400–1600)
    const SAT_TOTAL = [[400, 1], [700, 2], [800, 8], [900, 21], [1000, 39], [1050, 49], [1100, 58], [1150, 67], [1200, 74], [1250, 81], [1300, 86], [1350, 91], [1400, 94], [1450, 96], [1500, 98], [1560, 99], [1600, 99.9]];
    // SAT section user percentiles (200–800)
    const SAT_MATH = [[400, 7], [450, 17], [500, 30], [550, 44], [600, 57], [650, 69], [700, 80], [750, 90], [800, 97]];
    const SAT_ERW = [[400, 6], [450, 15], [500, 28], [550, 42], [600, 57], [650, 71], [700, 84], [750, 93], [800, 99]];
    // ACT 2024 national norms (composite, 1–36)
    const ACT_COMP = [[12, 7], [14, 15], [16, 28], [18, 41], [20, 53], [22, 64], [24, 74], [26, 82], [28, 88], [30, 93], [32, 97], [34, 99], [36, 100]];

    const BAND = 10; // ± percentile points shown as the range

    function interp(table, x) { // score → percentile
      if (x <= table[0][0]) return table[0][1];
      for (let i = 1; i < table.length; i++) {
        if (x <= table[i][0]) {
          const a = table[i - 1], b = table[i];
          return a[1] + (b[1] - a[1]) * (x - a[0]) / (b[0] - a[0]);
        }
      }
      return table[table.length - 1][1];
    }
    function invert(table, p) { // percentile → score
      if (p <= table[0][1]) return table[0][0];
      for (let i = 1; i < table.length; i++) {
        if (p <= table[i][1]) {
          const a = table[i - 1], b = table[i];
          return a[0] + (b[0] - a[0]) * (p - a[1]) / (b[1] - a[1]);
        }
      }
      return table[table.length - 1][0];
    }
    function roundTo(v, step) { return Math.round(v / step) * step; }
    function clampP(p) { return Math.min(99.5, Math.max(1, p)); }

    const langIn = document.getElementById("nmt-lang");
    const mathIn = document.getElementById("nmt-math");

    function readScore(input, errId) {
      const err = document.getElementById(errId);
      const raw = input.value.trim();
      input.classList.remove("is-invalid");
      err.textContent = "";
      if (raw === "") return null;
      const v = parseFloat(raw);
      if (!isFinite(v) || v < 100 || v > 200) {
        input.classList.add("is-invalid");
        err.textContent = T("NMT scores run from 100 to 200 — below 100 means the threshold wasn't cleared.");
        return { invalid: true };
      }
      return { value: v };
    }

    function nmtUpdate() {
      const lang = readScore(langIn, "nmt-lang-err");
      const math = readScore(mathIn, "nmt-math-err");
      const satEl = document.getElementById("nmt-sat");
      const actEl = document.getElementById("nmt-act");
      const statusEl = document.getElementById("nmt-status");
      const whyEl = document.getElementById("nmt-why");
      whyEl.innerHTML = "";

      const parts = [];
      if (lang && lang.value != null) parts.push({ key: "lang", label: "Ukrainian language", value: lang.value, section: SAT_ERW, sectionName: "SAT Reading & Writing" });
      if (math && math.value != null) parts.push({ key: "math", label: "Mathematics", value: math.value, section: SAT_MATH, sectionName: "SAT Math" });

      if ((lang && lang.invalid) || (math && math.invalid) || !parts.length) {
        satEl.textContent = "—";
        actEl.textContent = "—";
        profilePatch({ satLow: null, satHigh: null, actLow: null, actHigh: null });
        statusEl.textContent = !parts.length && !((lang && lang.invalid) || (math && math.invalid))
          ? T("Enter at least one NMT score to see an estimate.")
          : "";
        return;
      }

      let pSum = 0;
      parts.forEach(function (part) {
        part.p = clampP(interp(NMT_DIST[part.key], part.value));
        pSum += part.p;
      });
      const p = clampP(pSum / parts.length);

      const satLow = Math.max(400, roundTo(invert(SAT_TOTAL, clampP(p - BAND)), 10));
      const satHigh = Math.min(1600, roundTo(invert(SAT_TOTAL, clampP(p + BAND)), 10));
      const actLow = Math.max(1, Math.round(invert(ACT_COMP, clampP(p - BAND))));
      const actHigh = Math.min(36, Math.round(invert(ACT_COMP, clampP(p + BAND))));

      satEl.textContent = satLow + " – " + satHigh;
      actEl.textContent = actLow + " – " + actHigh;
      // Publish the RANGE (never a single number — this estimate is
      // deliberately approximate) for the College List Builder, module 15
      profilePatch({ satLow: satLow, satHigh: satHigh, actLow: actLow, actHigh: actHigh });

      let status = tpl(T("Roughly the top {top}% of NMT takers — anchored to NMT-2024 and 2024 SAT/ACT percentile tables."),
        { top: Math.max(1, Math.round(100 - p)) });
      if (parts.length === 1) {
        status = T("Based on one subject only — a partial estimate.") + " " + status;
      }
      statusEl.textContent = status;

      // The reasoning, spelled out per subject — the transparency is the credibility
      parts.forEach(function (part) {
        const line = document.createElement("p");
        line.className = "nmt-why-line";
        const secLow = Math.max(200, roundTo(invert(part.section, clampP(part.p - BAND)), 10));
        const secHigh = Math.min(800, roundTo(invert(part.section, clampP(part.p + BAND)), 10));
        const strong = document.createElement("b");
        strong.textContent = tpl(T("{subject} {score}"), { subject: T(part.label), score: part.value });
        line.appendChild(strong);
        line.appendChild(document.createTextNode(" — " + tpl(
          T("≈ top {top}% of NMT-2024 takers, which sits around {low}–{high} on the {section} section."),
          { top: Math.max(1, Math.round(100 - part.p)), low: secLow, high: secHigh, section: T(part.sectionName) })));
        whyEl.appendChild(line);
      });
    }

    langIn.addEventListener("input", nmtUpdate);
    mathIn.addEventListener("input", nmtUpdate);
    nmtUpdate();
  }

  /* ------------------------------------------------------------------
     13. Education record helper (timeline-builder.html)
         A guided timeline of the student's real schooling history →
         flags for the points a US admissions reader is likely to
         ask about → short factual explanations assembled from FIXED,
         human-written templates (never generated at runtime — the
         material is sensitive and the wording must stay neutral,
         reviewed and bilingual-by-translation) → per-category
         evidence checklist → one consistent copy/print summary.
         Word budget tracks the Common App Additional Information
         hard cap of 300 words. Everything persists in localStorage.

         Sensitivity rules (from the spec, non-negotiable): never
         infer a student's situation from their data — categories
         are always chosen by the student, "skip" is always offered,
         and the framing is "context", never "excuse".
     ------------------------------------------------------------------ */
  const tbBuilder = document.getElementById("tb-builder");

  if (tbBuilder) {
    const TB_STORE = "usufu-record-helper";
    const TB_WORD_CAP = 300;

    const TB_MODES = [
      ["inperson", "In person"],
      ["online", "Fully online"],
      ["hybrid", "Hybrid"],
      ["none", "No formal instruction"]
    ];
    const TB_TRANSCRIPT = [
      ["yes", "Grades exist"],
      ["partial", "Partial grades"],
      ["no", "No transcript"]
    ];

    /* Explanation categories — chosen by the student, never inferred */
    const TB_CATS = [
      ["relocation", "Relocation due to unsafe conditions in the region"],
      ["closure", "School closure at my previous location"],
      ["online", "Remote/online instruction after relocation or closure"],
      ["repeat", "Repeated term or year"],
      ["noenroll", "Period with no formal enrollment"],
      ["nmt", "NMT replaced the standard final assessment (2022–2023 rules)"],
      ["family", "Family circumstances — kept general, on my terms"]
    ];

    /* Fixed templates. {label} spans become inline blanks; the
       surrounding wording is pre-written and translated once in
       i18n.js — nothing is composed at runtime. */
    const TB_TEMPLATES = {
      relocation: "In {month year}, my family relocated from {city, country} to {new city, country} because of the security situation in the region. I resumed Grade {grade} at {school name} in {month year}.",
      closure: "My school, {school name} in {city}, closed in {month year}. I continued the term through {online classes / self-study} until enrolling at {new school} in {month year}.",
      online: "From {month year} to {month year} I completed Grade {grade} fully online through {school name}, as relocation made in-person attendance impossible. Grades for this period {are available / are partially available}.",
      repeat: "I repeated Grade {grade} in {school year} because {reason, e.g. instruction was disrupted mid-year}. Both years appear on my transcript.",
      noenroll: "From {month year} to {month year} I was not formally enrolled due to {reason}. During this period I {continued core subjects through self-study / had no access to instruction}. I re-enrolled at {school name} in {month year}.",
      nmt: "In {year}, Ukraine's state final attestation (DPA) was suspended nationwide; the National Multi-subject Test (NMT) served as the standardized assessment instead. My NMT results are available in place of standard year-end examination records.",
      family: "Due to family circumstances, my education was interrupted from {month year} to {month year}. I resumed studies at {school name} in {month year}."
    };

    const TB_EVIDENCE = {
      relocation: [
        "Enrollment confirmation from the school you joined after relocating",
        "Any records from the previous school you still have, even partial",
        "Displacement or refugee registration papers, where they exist — some universities ask separately"
      ],
      closure: [
        "A letter from the school administration or local education authority confirming the closure",
        "Your last report card from before the closure"
      ],
      online: [
        "Enrollment confirmation from the online school",
        "Grade records or report cards for the online period"
      ],
      repeat: [
        "A transcript showing both years",
        "A short counselor note stating the reason"
      ],
      noenroll: [
        "Confirmation of re-enrollment",
        "Any informal record of self-study — notes, course certificates, reading lists",
        "A counselor letter summarizing the period"
      ],
      nmt: [
        "Your NMT certificate or information card",
        "The UCEQA score report printout"
      ],
      family: [
        "Confirmation of re-enrollment — the general statement needs nothing more"
      ]
    };

    let tbEntries = []; // [{id, grade, years, school, location, mode, transcript, note}]
    let tbGapData = {}; // gapKey → {cat: "", values: [], } — survives re-detection via stable keys
    let tbIdSeq = 1;

    function tbLoad() {
      try {
        const raw = localStorage.getItem(TB_STORE);
        if (!raw) return null;
        const parsed = JSON.parse(raw);
        if (!parsed || !Array.isArray(parsed.entries)) return null;
        return parsed;
      } catch (e) { return null; }
    }
    function tbSave() {
      try {
        localStorage.setItem(TB_STORE, JSON.stringify({ entries: tbEntries, gaps: tbGapData, seq: tbIdSeq }));
      } catch (e) { /* storage unavailable — session-only, still works */ }
    }

    function tbBlankEntry() {
      return { id: tbIdSeq++, grade: "", years: "", school: "", location: "", mode: "inperson", transcript: "yes", note: "" };
    }

    function tbGradeLabel(g) {
      if (g === "uni") return T("University");
      if (g) return tpl(T("Grade {n}"), { n: g });
      return T("Grade not set");
    }

    /* ---- Step 2: detection. Neutral titles on purpose — these are
       "a reader may ask" markers, never alarms. ---- */
    function tbDetect() {
      const gaps = [];
      const flagsByEntry = {};
      const add = function (key, entryIds, title, entry) {
        gaps.push({ key: key, title: title, where: tbWhere(entry) });
        entryIds.forEach(function (id) {
          (flagsByEntry[id] = flagsByEntry[id] || []).push(title);
        });
      };
      const norm = function (s) { return (s || "").trim().toLowerCase(); };

      if (tbEntries.length >= 2) {
        for (let i = 0; i < tbEntries.length; i++) {
          const e = tbEntries[i];
          if (e.mode === "none") {
            add("none:" + e.id, [e.id], T("A period without formal instruction — context helps here."), e);
          } else if (e.transcript === "no") {
            add("notr:" + e.id, [e.id], T("No transcript for this period — say what exists instead."), e);
          }
          if (i === 0) continue;
          const p = tbEntries[i - 1];
          const g1 = parseInt(p.grade, 10), g2 = parseInt(e.grade, 10);
          if (isFinite(g1) && isFinite(g2)) {
            if (g2 - g1 >= 2) {
              add("miss:" + p.id + ":" + e.id, [e.id],
                tpl(T("Grade {g} has no entry — a reader may wonder about this year."), { g: g2 - g1 === 2 ? String(g1 + 1) : (g1 + 1) + "–" + (g2 - 1) }), e);
            }
            if (g1 === g2) {
              if (norm(p.school) && norm(e.school) && norm(p.school) !== norm(e.school)) {
                add("split:" + p.id + ":" + e.id, [e.id],
                  tpl(T("Two schools within Grade {g} — worth one line of context."), { g: e.grade }), e);
              } else {
                add("rep:" + p.id + ":" + e.id, [e.id],
                  tpl(T("Grade {g} appears twice — add the reason so nobody guesses."), { g: e.grade }), e);
              }
            }
          }
          if ((p.mode === "inperson" && e.mode === "online") || (p.mode === "online" && e.mode === "inperson")) {
            add("mode:" + p.id + ":" + e.id, [e.id],
              T("Instruction switched between in-person and online — easy to explain in a sentence."), e);
          }
          if (norm(p.location) && norm(e.location) && norm(p.location) !== norm(e.location)) {
            add("move:" + p.id + ":" + e.id, [e.id],
              T("The location changes here — one factual line prevents questions."), e);
          }
        }
      }
      return { gaps: gaps, flagsByEntry: flagsByEntry };
    }

    function tbWhere(entry) {
      const bits = [tbGradeLabel(entry.grade)];
      if (entry.years.trim()) bits.push(entry.years.trim());
      return bits.join(" · ");
    }

    /* ---- Step 1: entry cards on the spine ---- */
    /* Every field in the repeater rows is built here, so this is the one
       place that has to tie the visible label to its control. Without the
       for/id pair a screen reader announces these as bare "edit text" —
       the label is only visual. Ids are generated because the rows are
       created and destroyed as the student adds and removes periods. */
    let tbFieldSeq = 0;
    function tbField(labelText, control, extraClass) {
      const f = document.createElement("div");
      f.className = "form-field" + (extraClass ? " " + extraClass : "");
      const l = document.createElement("label");
      l.textContent = labelText;
      if (!control.id) control.id = "tb-f-" + (++tbFieldSeq);
      l.htmlFor = control.id;
      f.appendChild(l);
      f.appendChild(control);
      return f;
    }
    function tbSelect(options, value, onChange, translate) {
      const s = document.createElement("select");
      options.forEach(function (pair) {
        const o = document.createElement("option");
        o.value = pair[0];
        o.textContent = translate === false ? pair[1] : T(pair[1]);
        s.appendChild(o);
      });
      s.value = value;
      s.addEventListener("change", function () { onChange(s.value); });
      return s;
    }
    function tbText(value, placeholder, onInput, maxLen) {
      const i = document.createElement("input");
      i.type = "text";
      i.value = value;
      i.placeholder = placeholder;
      if (maxLen) i.maxLength = maxLen;
      i.addEventListener("input", function () { onInput(i.value); });
      return i;
    }

    function tbDrawEntries(detection) {
      const wrap = document.getElementById("tb-entries");
      wrap.innerHTML = "";
      tbEntries.forEach(function (entry) {
        const card = document.createElement("div");
        card.className = "tb-entry";
        card.dataset.entryId = entry.id;
        const flags = detection.flagsByEntry[entry.id] || [];
        if (flags.length) card.classList.add("has-flags");

        const gradeOpts = [["", "—"]];
        for (let g = 1; g <= 12; g++) gradeOpts.push([String(g), tpl(T("Grade {n}"), { n: g })]);
        gradeOpts.push(["uni", T("University")]);

        const row1 = document.createElement("div");
        row1.className = "tb-entry-grid";
        row1.appendChild(tbField(T("Grade / year"), tbSelect(gradeOpts, entry.grade, function (v) {
          entry.grade = v; tbUpdate();
        }, false)));
        row1.appendChild(tbField(T("Academic year"), tbText(entry.years, T("e.g. 2021–2022"), function (v) {
          entry.years = v; tbRefreshDynamic();
        }, 40)));
        row1.appendChild(tbField(T("School"), tbText(entry.school, T("unknown is fine"), function (v) {
          entry.school = v; tbRefreshDynamic();
        }, 80), "tb-f-school"));
        row1.appendChild(tbField(T("City, country"), tbText(entry.location, T("Kharkiv, Ukraine"), function (v) {
          entry.location = v; tbRefreshDynamic();
        }, 60)));

        const remove = document.createElement("button");
        remove.type = "button";
        remove.className = "tb-remove";
        remove.setAttribute("aria-label", T("Remove this period"));
        remove.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
        remove.addEventListener("click", function () {
          if (tbEntries.length > 1) {
            tbEntries = tbEntries.filter(function (x) { return x.id !== entry.id; });
            tbUpdate();
          }
        });
        row1.appendChild(remove);

        const row2 = document.createElement("div");
        row2.className = "tb-entry-grid2";
        row2.appendChild(tbField(T("Instruction"), tbSelect(TB_MODES, entry.mode, function (v) {
          entry.mode = v; tbUpdate();
        })));
        row2.appendChild(tbField(T("Transcript"), tbSelect(TB_TRANSCRIPT, entry.transcript, function (v) {
          entry.transcript = v; tbUpdate();
        })));
        row2.appendChild(tbField(T("Note (optional)"), tbText(entry.note, T("One short line if needed"), function (v) {
          entry.note = v; tbRefreshDynamic();
        }, 120), "tb-f-note"));

        card.appendChild(row1);
        card.appendChild(row2);

        if (flags.length) {
          const chips = document.createElement("div");
          chips.className = "tb-entry-flags";
          flags.forEach(function (f) {
            const c = document.createElement("span");
            c.className = "tb-flagchip";
            c.textContent = f;
            chips.appendChild(c);
          });
          card.appendChild(chips);
        }
        wrap.appendChild(card);
      });

      const clean = document.getElementById("tb-clean");
      const isClean = tbEntries.length >= 2 && !detection.gaps.length;
      clean.hidden = !isClean;
      if (isClean) {
        clean.textContent = T("No flags — your record reads as a straight line. You likely don't need this tool at all, and that's the best outcome.");
      }
    }

    /* ---- Step 3: template blocks per flagged point ---- */
    function tbGapState(key) {
      if (!tbGapData[key]) tbGapData[key] = { cat: "", values: [] };
      return tbGapData[key];
    }

    function tbTemplateParts(cat) {
      // Translate the whole template first, then split into text/blank
      // parts — blank labels are language-local, values are positional.
      return T(TB_TEMPLATES[cat]).split(/\{([^}]+)\}/);
    }

    function tbAssemble(cat, values) {
      const parts = tbTemplateParts(cat);
      let out = "";
      for (let i = 0; i < parts.length; i++) {
        if (i % 2 === 0) out += parts[i];
        else {
          const idx = (i - 1) / 2;
          const v = (values[idx] || "").trim();
          out += v ? v : "[" + parts[i] + "]";
        }
      }
      return out;
    }

    function tbDrawGaps(detection) {
      const box = document.getElementById("tb-gaps");
      box.innerHTML = "";

      if (tbEntries.length < 2) {
        const p = document.createElement("p");
        p.className = "tb-nogaps";
        p.textContent = T("Add at least two periods above — anything a reader might ask about will appear here automatically.");
        box.appendChild(p);
        return;
      }
      if (!detection.gaps.length) {
        const p = document.createElement("p");
        p.className = "tb-nogaps";
        p.textContent = T("Nothing to explain — no flags found. Leaving the Additional Information section blank is a completely normal choice.");
        box.appendChild(p);
        return;
      }

      detection.gaps.forEach(function (gap, gi) {
        const state = tbGapState(gap.key);
        const block = document.createElement("div");
        block.className = "tb-gap";

        const head = document.createElement("div");
        head.className = "tb-gap-head";
        const num = document.createElement("span");
        num.className = "tb-gap-num";
        num.textContent = gi + 1;
        const title = document.createElement("span");
        title.className = "tb-gap-title";
        title.textContent = gap.title;
        const where = document.createElement("span");
        where.className = "tb-gap-where";
        where.textContent = gap.where;
        head.appendChild(num);
        head.appendChild(title);
        head.appendChild(where);
        block.appendChild(head);

        const catOpts = [["", T("Choose what actually happened — your call, never assumed…")]]
          .concat(TB_CATS.map(function (c) { return [c[0], T(c[1])]; }))
          .concat([["skip", T("Skip this point — I'll leave it without an explanation")]]);
        const sel = tbSelect(catOpts, state.cat, function (v) {
          state.cat = v;
          if (v !== state.lastCat) state.values = state.values || [];
          state.lastCat = v;
          tbSave();
          tbDrawGaps(detection);
          tbBudgetAndSummary(detection);
        }, false);
        block.appendChild(tbField(T("What happened"), sel));

        if (state.cat === "skip") {
          const p = document.createElement("p");
          p.className = "tb-gap-skip";
          p.textContent = T("Skipped — that's a legitimate choice. You can always come back to it.");
          block.appendChild(p);
        } else if (state.cat && TB_TEMPLATES[state.cat]) {
          const para = document.createElement("p");
          para.className = "tb-template";
          const parts = tbTemplateParts(state.cat);
          for (let i = 0; i < parts.length; i++) {
            if (i % 2 === 0) {
              para.appendChild(document.createTextNode(parts[i]));
            } else {
              const idx = (i - 1) / 2;
              const input = document.createElement("input");
              input.type = "text";
              input.className = "tb-blank";
              input.placeholder = parts[i];
              input.value = state.values[idx] || "";
              input.style.width = Math.max(60, Math.min(260, (parts[i].length + 2) * 7)) + "px";
              input.setAttribute("aria-label", parts[i]);
              input.addEventListener("input", function () {
                state.values[idx] = input.value;
                tbSave();
                tbBudgetAndSummary(detection);
              });
              para.appendChild(input);
            }
          }
          block.appendChild(para);

          const ev = document.createElement("div");
          ev.className = "tb-evidence";
          const evLabel = document.createElement("span");
          evLabel.className = "tb-evidence-label";
          evLabel.textContent = T("Have ready if asked — a missing document is never disqualifying");
          const ul = document.createElement("ul");
          (TB_EVIDENCE[state.cat] || []).forEach(function (item) {
            const li = document.createElement("li");
            li.textContent = T(item);
            ul.appendChild(li);
          });
          ev.appendChild(evLabel);
          ev.appendChild(ul);
          block.appendChild(ev);
        }

        box.appendChild(block);
      });
    }

    /* ---- Word budget + summary ---- */
    function tbExplainedTexts(detection) {
      const texts = [];
      detection.gaps.forEach(function (gap) {
        const state = tbGapData[gap.key];
        if (state && state.cat && state.cat !== "skip" && TB_TEMPLATES[state.cat]) {
          texts.push(tbAssemble(state.cat, state.values || []));
        }
      });
      return texts;
    }

    function tbBudgetAndSummary(detection) {
      const texts = tbExplainedTexts(detection);
      const combined = texts.join(" ");
      const words = combined.trim() ? combined.trim().split(/\s+/).length : 0;

      const budget = document.getElementById("tb-budget");
      const fill = document.getElementById("tb-budget-fill");
      const line = document.getElementById("tb-budget-line");
      fill.style.width = Math.min(100, words / TB_WORD_CAP * 100) + "%";
      budget.classList.toggle("is-warn", words > 240 && words <= TB_WORD_CAP);
      budget.classList.toggle("is-over", words > TB_WORD_CAP);

      let msg = tpl(T("{w} of 300 words — the Common App Additional Information limit."), { w: words });
      if (words > TB_WORD_CAP) {
        msg += " " + T("Over the limit — shorten the blanks or skip the least consequential point (usually the oldest).");
      } else if (words > 240) {
        msg += " " + T("Getting close — prefer the shortest phrasing that still states the facts.");
      }
      if (texts.length >= 3) {
        msg += " " + T("With several points, give space to the most recent and most academically consequential ones first — a middle-school gap rarely needs many words.");
      }
      line.textContent = msg;

      tbSummary(detection, texts);
    }

    function tbSummary(detection, texts) {
      if (!texts) texts = tbExplainedTexts(detection);
      const lines = [];
      lines.push(T("EDUCATION RECORD — TIMELINE"));
      tbEntries.forEach(function (e) {
        const modeLabel = T((TB_MODES.find(function (m) { return m[0] === e.mode; }) || TB_MODES[0])[1]);
        const trLabel = T((TB_TRANSCRIPT.find(function (t) { return t[0] === e.transcript; }) || TB_TRANSCRIPT[0])[1]);
        const bits = [
          e.years.trim() || "—",
          tbGradeLabel(e.grade),
          (e.school.trim() || T("school name unknown")) + (e.location.trim() ? ", " + e.location.trim() : ""),
          modeLabel,
          trLabel
        ];
        let ln = "· " + bits.join(" · ");
        if (e.note.trim()) ln += " — " + e.note.trim();
        lines.push(ln);
      });
      lines.push("");
      lines.push(T("CONTEXT — same wording for the Common App Additional Information section, your counselor's letter, and any «explain a gap» prompt"));
      lines.push(texts.length ? texts.join(" ") : T("(No explanations added. Leaving the Additional Information section blank is a normal, legitimate choice.)"));

      // Aggregate the evidence for every chosen category, once each
      const evidence = [];
      detection.gaps.forEach(function (gap) {
        const state = tbGapData[gap.key];
        if (state && state.cat && state.cat !== "skip") {
          (TB_EVIDENCE[state.cat] || []).forEach(function (item) {
            const t = T(item);
            if (evidence.indexOf(t) === -1) evidence.push(t);
          });
        }
      });
      if (evidence.length) {
        lines.push("");
        lines.push(T("DOCUMENTS AVAILABLE ON REQUEST"));
        evidence.forEach(function (item) { lines.push("· " + item); });
      }

      document.getElementById("tb-summary").textContent = lines.join("\n");
    }

    /* ---- Master update ---- */
    function tbUpdate() {
      const detection = tbDetect();
      tbDrawEntries(detection);
      tbDrawGaps(detection);
      tbBudgetAndSummary(detection);
      tbSave();
    }

    /* Text-input path: recompute everything downstream but leave the
       entry cards' DOM alone, so the field being typed in keeps focus.
       Flag chips are patched in place via each card's data-entry-id. */
    function tbRefreshDynamic() {
      const detection = tbDetect();
      document.querySelectorAll("#tb-entries .tb-entry").forEach(function (card) {
        const id = parseInt(card.dataset.entryId, 10);
        const flags = detection.flagsByEntry[id] || [];
        card.classList.toggle("has-flags", flags.length > 0);
        let chips = card.querySelector(".tb-entry-flags");
        if (!flags.length) {
          if (chips) chips.remove();
          return;
        }
        if (!chips) {
          chips = document.createElement("div");
          chips.className = "tb-entry-flags";
          card.appendChild(chips);
        }
        chips.innerHTML = "";
        flags.forEach(function (f) {
          const c = document.createElement("span");
          c.className = "tb-flagchip";
          c.textContent = f;
          chips.appendChild(c);
        });
      });
      const clean = document.getElementById("tb-clean");
      const isClean = tbEntries.length >= 2 && !detection.gaps.length;
      clean.hidden = !isClean;
      if (isClean) {
        clean.textContent = T("No flags — your record reads as a straight line. You likely don't need this tool at all, and that's the best outcome.");
      }
      tbDrawGaps(detection);
      tbBudgetAndSummary(detection);
      tbSave();
    }

    /* ---- Boot ---- */
    const savedTb = tbLoad();
    if (savedTb) {
      tbIdSeq = savedTb.seq || 1;
      tbEntries = savedTb.entries.map(function (e) {
        return {
          id: e.id || tbIdSeq++,
          grade: typeof e.grade === "string" ? e.grade : "",
          years: typeof e.years === "string" ? e.years : "",
          school: typeof e.school === "string" ? e.school : "",
          location: typeof e.location === "string" ? e.location : "",
          mode: ["inperson", "online", "hybrid", "none"].indexOf(e.mode) >= 0 ? e.mode : "inperson",
          transcript: ["yes", "partial", "no"].indexOf(e.transcript) >= 0 ? e.transcript : "yes",
          note: typeof e.note === "string" ? e.note : ""
        };
      });
      tbGapData = savedTb.gaps && typeof savedTb.gaps === "object" ? savedTb.gaps : {};
      if (!tbEntries.length) tbEntries = [tbBlankEntry()];
    } else {
      tbEntries = [tbBlankEntry()];
    }

    document.getElementById("tb-add").addEventListener("click", function () {
      if (tbEntries.length < 16) {
        tbEntries.push(tbBlankEntry());
        tbUpdate();
      }
    });

    const tbCopyBtn = document.getElementById("tb-copy");
    tbCopyBtn.addEventListener("click", function () {
      const text = document.getElementById("tb-summary").textContent;
      const done = function () {
        const original = T("Copy summary");
        tbCopyBtn.textContent = T("Copied ✓");
        setTimeout(function () { tbCopyBtn.textContent = original; }, 1600);
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else { done(); }
    });

    /* --- PDF download.
       Unlike the Countdown PDF (English-only), this document carries
       user-typed Ukrainian (school names, reasons) in either UI
       language — so we embed DejaVu Sans (full Cyrillic) fetched
       once from jsDelivr (allowed by the site CSP's connect-src)
       instead of relying on jsPDF's Latin-only built-in fonts. --- */
    let tbFontCache = null;

    function tbLoadJsPdf() {
      return new Promise(function (resolve, reject) {
        if (window.jspdf && window.jspdf.jsPDF) { resolve(window.jspdf.jsPDF); return; }
        const s = document.createElement("script");
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
        s.onload = function () {
          if (window.jspdf && window.jspdf.jsPDF) resolve(window.jspdf.jsPDF);
          else reject(new Error("jsPDF missing after load"));
        };
        s.onerror = function () { reject(new Error("jsPDF failed to load")); };
        document.head.appendChild(s);
      });
    }

    function tbFetchFonts() {
      if (tbFontCache) return Promise.resolve(tbFontCache);
      const toB64 = function (buf) {
        const bytes = new Uint8Array(buf);
        let bin = "";
        for (let i = 0; i < bytes.length; i += 0x8000) {
          bin += String.fromCharCode.apply(null, bytes.subarray(i, i + 0x8000));
        }
        return btoa(bin);
      };
      const grab = function (url) {
        return fetch(url).then(function (r) {
          if (!r.ok) throw new Error("font fetch failed");
          return r.arrayBuffer();
        });
      };
      return Promise.all([
        grab("https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans.ttf"),
        grab("https://cdn.jsdelivr.net/npm/dejavu-fonts-ttf@2.37.3/ttf/DejaVuSans-Bold.ttf")
      ]).then(function (bufs) {
        tbFontCache = { reg: toB64(bufs[0]), bold: toB64(bufs[1]) };
        return tbFontCache;
      });
    }

    function tbBuildPdf(JsPDF, fonts) {
      const doc = new JsPDF({ unit: "pt", format: "a4" });
      doc.addFileToVFS("DejaVuSans.ttf", fonts.reg);
      doc.addFont("DejaVuSans.ttf", "DejaVu", "normal");
      doc.addFileToVFS("DejaVuSans-Bold.ttf", fonts.bold);
      doc.addFont("DejaVuSans-Bold.ttf", "DejaVu", "bold");

      const W = doc.internal.pageSize.getWidth();
      const H = doc.internal.pageSize.getHeight();
      const M = 56;
      const NAVY = [15, 21, 42], INK = [18, 19, 23], GREY = [104, 110, 130],
            FAINT = [200, 203, 214], BEIGE = [254, 253, 250], LOW = [160, 164, 180];
      const detection = tbDetect();
      const texts = tbExplainedTexts(detection);
      const isUk = window.USUFU_I18N && window.USUFU_I18N.lang() === "uk";
      let y;

      /* Masthead — same visual language as the Countdown PDF */
      doc.setFillColor(NAVY[0], NAVY[1], NAVY[2]);
      doc.rect(0, 0, W, 108, "F");
      doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);
      doc.setFont("DejaVu", "normal");
      doc.setFontSize(8);
      doc.text("UNITED STATES UNIVERSITIES FOR UKRAINE", M, 34, { charSpace: 2 });
      doc.setTextColor(BEIGE[0], BEIGE[1], BEIGE[2]);
      doc.setFont("DejaVu", "bold");
      doc.setFontSize(21);
      doc.text(T("Education Record & Context Notes"), M, 68);
      doc.setFont("DejaVu", "normal");
      doc.setFontSize(9);
      doc.setTextColor(FAINT[0], FAINT[1], FAINT[2]);
      const dateStr = new Date().toLocaleDateString(isUk ? "uk-UA" : "en-US",
        { year: "numeric", month: "long", day: "numeric" });
      doc.text(tpl(T("Generated {date}"), { date: dateStr }), M, 88);

      y = 140;
      function ensure(height) {
        if (y + height <= H - 72) return;
        doc.addPage();
        doc.setFont("DejaVu", "normal");
        doc.setFontSize(8);
        doc.setTextColor(LOW[0], LOW[1], LOW[2]);
        doc.text(T("Education Record & Context Notes") + " — United States Universities For Ukraine", M, 40);
        doc.setDrawColor(224, 222, 214);
        doc.setLineWidth(0.6);
        doc.line(M, 48, W - M, 48);
        y = 70;
      }
      function heading(text) {
        ensure(40);
        doc.setFont("DejaVu", "bold");
        doc.setFontSize(11.5);
        doc.setTextColor(NAVY[0], NAVY[1], NAVY[2]);
        const lines = doc.splitTextToSize(text, W - M * 2);
        doc.text(lines, M, y);
        y += lines.length * 14 + 2;
        doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
        doc.setLineWidth(0.8);
        doc.line(M, y, W - M, y);
        y += 16;
      }
      function body(text, size, color) {
        doc.setFont("DejaVu", "normal");
        doc.setFontSize(size || 9.5);
        const c = color || INK;
        doc.setTextColor(c[0], c[1], c[2]);
        const lines = doc.splitTextToSize(text, W - M * 2);
        for (let i = 0; i < lines.length; i++) {
          ensure(14);
          doc.text(lines[i], M, y);
          y += (size || 9.5) + 4.5;
        }
      }

      /* Timeline */
      heading(T("EDUCATION RECORD — TIMELINE"));
      tbEntries.forEach(function (e) {
        const modeLabel = T((TB_MODES.find(function (m) { return m[0] === e.mode; }) || TB_MODES[0])[1]);
        const trLabel = T((TB_TRANSCRIPT.find(function (t) { return t[0] === e.transcript; }) || TB_TRANSCRIPT[0])[1]);
        let ln = "•  " + [
          e.years.trim() || "—",
          tbGradeLabel(e.grade),
          (e.school.trim() || T("school name unknown")) + (e.location.trim() ? ", " + e.location.trim() : ""),
          modeLabel,
          trLabel
        ].join("  ·  ");
        if (e.note.trim()) ln += " — " + e.note.trim();
        body(ln, 9.5);
        y += 2;
      });
      y += 14;

      /* Context */
      heading(T("CONTEXT — same wording for the Common App Additional Information section, your counselor's letter, and any «explain a gap» prompt"));
      if (texts.length) {
        body(texts.join(" "), 10);
        const combined = texts.join(" ").trim();
        const words = combined ? combined.split(/\s+/).length : 0;
        y += 4;
        body(tpl(T("{w} of 300 words — the Common App Additional Information limit."), { w: words }), 8.5, GREY);
      } else {
        body(T("(No explanations added. Leaving the Additional Information section blank is a normal, legitimate choice.)"), 10, GREY);
      }
      y += 14;

      /* Evidence */
      const evidence = [];
      detection.gaps.forEach(function (gap) {
        const state = tbGapData[gap.key];
        if (state && state.cat && state.cat !== "skip") {
          (TB_EVIDENCE[state.cat] || []).forEach(function (item) {
            const t = T(item);
            if (evidence.indexOf(t) === -1) evidence.push(t);
          });
        }
      });
      if (evidence.length) {
        heading(T("DOCUMENTS AVAILABLE ON REQUEST"));
        evidence.forEach(function (item) {
          body("•  " + item, 9.5);
          y += 2;
        });
      }

      /* Footer on every page */
      const pages = doc.getNumberOfPages();
      for (let i = 1; i <= pages; i++) {
        doc.setPage(i);
        doc.setDrawColor(224, 222, 214);
        doc.setLineWidth(0.6);
        doc.line(M, H - 52, W - M, H - 52);
        doc.setFont("DejaVu", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(LOW[0], LOW[1], LOW[2]);
        doc.text("United States Universities For Ukraine — “Advancing Excellence. Ensuring Success.”", M, H - 38);
        doc.text(tpl(T("Page {i} of {n}"), { i: i, n: pages }), W - M, H - 38, { align: "right" });
      }

      doc.save("USUFU-Education-Record.pdf");
    }

    const tbPdfBtn = document.getElementById("tb-print");
    tbPdfBtn.addEventListener("click", function () {
      tbPdfBtn.disabled = true;
      const original = tbPdfBtn.textContent;
      tbPdfBtn.textContent = T("Preparing PDF…");
      Promise.all([tbLoadJsPdf(), tbFetchFonts()])
        .then(function (loaded) { tbBuildPdf(loaded[0], loaded[1]); })
        .catch(function () {
          alert(T("The PDF could not be prepared — check your internet connection and try again."));
        })
        .then(function () {
          tbPdfBtn.disabled = false;
          tbPdfBtn.textContent = original;
        });
    });

    document.getElementById("tb-reset").addEventListener("click", function () {
      if (!window.confirm(T("Clear the whole timeline and every explanation? This cannot be undone."))) return;
      try { localStorage.removeItem(TB_STORE); } catch (e) {}
      tbEntries = [tbBlankEntry()];
      tbGapData = {};
      tbUpdate();
    });

    tbUpdate();
  }

  /* ------------------------------------------------------------------
     14. International financial aid finder (financial-aid-finder.html)
         A curated, dated, sourced directory of US universities cut
         the way an international applicant needs it: need-blind vs
         need-aware FOR INTERNATIONALS, meets-full-need, loans in
         packages, transition flags. The dataset lives in
         js/aid-data.js (window.USUFU_AID_DATA) and is refreshed by
         hand — the visible "data last verified" date and the
         per-card source lines are part of the feature's honesty,
         never remove them. Default sort is aid strength, not
         prestige, on purpose.
     ------------------------------------------------------------------ */
  const afGrid = document.getElementById("af-grid");

  if (afGrid && window.USUFU_AID_DATA) {
    const AF_DATA = window.USUFU_AID_DATA;
    const AF_REGION = {
      ne: ["CT","MA","ME","NH","NJ","NY","PA","RI","VT"],
      mw: ["IL","IN","IA","KS","MI","MN","MO","NE","ND","OH","SD","WI"],
      so: ["AL","AR","DC","DE","FL","GA","KY","LA","MD","MS","NC","OK","SC","TN","TX","VA","WV"],
      we: ["AK","AZ","CA","CO","HI","ID","MT","NV","NM","OR","UT","WA","WY"]
    };

    const afState = { policy: "all", need: "all", region: "all", size: "all", sel: "all", q: "", sort: "aid" };

    function afSize(s) { return s.ug < 5000 ? "small" : s.ug <= 15000 ? "medium" : "large"; }
    function afSel(s) { return s.admit < 15 ? "reach" : s.admit <= 35 ? "mid" : "open"; }
    function afRegion(s) {
      for (const key in AF_REGION) {
        if (AF_REGION[key].indexOf(s.state) >= 0) return key;
      }
      return "";
    }
    /* Aid strength, the deliberate default order: policy first, then
       full-need, then no-loan packaging. Prestige plays no part. */
    function afScore(s) {
      const p = s.policy === "blind" ? 40 : s.policy === "aware" ? 20 : 0;
      const n = s.fullNeed === "yes" ? 10 : s.fullNeed === "partial" ? 5 : 0;
      const l = s.loans === "no-loan" ? 1 : 0;
      return p + n + l;
    }

    function afWhy(s) {
      const bits = [];
      bits.push(T(s.policy === "blind" ? "Need-blind for international applicants"
        : s.policy === "aware" ? "Need-aware for international applicants — your aid application can affect the admission decision"
        : "No need-based aid for international applicants"));
      if (s.policy !== "none") {
        bits.push(T(s.fullNeed === "yes" ? "meets 100% of demonstrated need once admitted"
          : s.fullNeed === "partial" ? "meets part of demonstrated need — packages vary"
          : s.fullNeed === "no" ? "does not commit to meeting full need"
          : "full-need policy unconfirmed — check directly"));
      }
      let out = bits.join("; ") + ".";
      if (s.loans === "no-loan") out += " " + T("Aid packages contain no loans.");
      else if (s.loans === "loans") out += " " + T("Aid packages may include loans.");
      return out;
    }

    function afCard(s) {
      const card = document.createElement("article");
      card.className = "af-card";

      const top = document.createElement("div");
      top.className = "af-top";
      const h = document.createElement("h3");
      h.textContent = s.name;
      const place = document.createElement("span");
      place.className = "af-place";
      place.textContent = s.city + ", " + s.state + " · " + T(s.type === "public" ? "Public" : "Private") +
        " · ~" + s.ug.toLocaleString("en-US") + " " + T("undergrads");
      top.appendChild(h);
      top.appendChild(place);
      card.appendChild(top);

      const badges = document.createElement("div");
      badges.className = "af-badges";
      const pb = document.createElement("span");
      pb.className = "af-badge p-" + s.policy;
      pb.textContent = T(s.policy === "blind" ? "Need-blind" : s.policy === "aware" ? "Need-aware" : "No need aid");
      badges.appendChild(pb);
      if (s.fullNeed === "yes" || s.fullNeed === "partial") {
        const nb = document.createElement("span");
        nb.className = "af-badge " + (s.fullNeed === "yes" ? "b-need" : "b-partial");
        nb.textContent = T(s.fullNeed === "yes" ? "100% of need" : "Partial need");
        badges.appendChild(nb);
      }
      if (s.loans === "no-loan") {
        const lb = document.createElement("span");
        lb.className = "af-badge b-noloan";
        lb.textContent = T("No loans");
        badges.appendChild(lb);
      }
      if (s.transition) {
        const tb = document.createElement("span");
        tb.className = "af-badge b-trans";
        tb.textContent = T("Policy in transition");
        badges.appendChild(tb);
      }
      card.appendChild(badges);

      const why = document.createElement("p");
      why.className = "af-why";
      why.textContent = afWhy(s);
      card.appendChild(why);

      if (s.intlAided) {
        const st = document.createElement("p");
        st.className = "af-stat";
        st.textContent = T("Aid to internationals:") + " " + s.intlAided;
        card.appendChild(st);
      }
      if (s.transition) {
        const tr = document.createElement("div");
        tr.className = "af-trans";
        const b = document.createElement("b");
        b.textContent = T("Recently changed — check which class year the new policy covers");
        tr.appendChild(b);
        tr.appendChild(document.createTextNode(s.transition));
        card.appendChild(tr);
      }
      if (s.note) {
        const nt = document.createElement("p");
        nt.className = "af-note";
        nt.textContent = s.note;
        card.appendChild(nt);
      }

      const foot = document.createElement("div");
      foot.className = "af-foot";
      const src = document.createElement("span");
      src.className = "af-src";
      src.textContent = s.src + (s.conf === "medium" ? " · " + T("secondary sources — verify directly") : "");
      const link = document.createElement("a");
      link.className = "af-link";
      link.href = s.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = T("Official aid page");
      foot.appendChild(src);
      foot.appendChild(link);
      card.appendChild(foot);

      return card;
    }

    function afMatches(s) {
      if (afState.policy !== "all" && s.policy !== afState.policy) return false;
      if (afState.need !== "all" && s.fullNeed !== afState.need) return false;
      if (afState.region !== "all" && afRegion(s) !== afState.region) return false;
      if (afState.size !== "all" && afSize(s) !== afState.size) return false;
      if (afState.sel !== "all" && afSel(s) !== afState.sel) return false;
      if (afState.q && s.name.toLowerCase().indexOf(afState.q) === -1) return false;
      return true;
    }

    function afRender() {
      afGrid.innerHTML = "";
      const found = AF_DATA.schools.filter(afMatches);
      if (afState.sort === "az") {
        found.sort(function (a, b) { return a.name.localeCompare(b.name); });
      } else {
        found.sort(function (a, b) {
          return afScore(b) - afScore(a) || a.name.localeCompare(b.name);
        });
      }
      found.forEach(function (s) { afGrid.appendChild(afCard(s)); });
      if (!found.length) {
        const p = document.createElement("p");
        p.className = "af-none";
        p.textContent = T("Nothing matches this exact combination — loosen a filter or two. Strict aid filters plus narrow location or size can rule out every school on the list.");
        afGrid.appendChild(p);
      }
      document.getElementById("af-count").textContent =
        tpl(T("{n} of {total} schools shown — ordered by aid strength for internationals, not by fame."),
          { n: found.length, total: AF_DATA.schools.length });
    }

    function afChips(boxId, key) {
      const box = document.getElementById(boxId);
      box.querySelectorAll(".jg-chip").forEach(function (chip) {
        chip.setAttribute("aria-pressed", String(chip.classList.contains("is-on")));
        chip.addEventListener("click", function () {
          afState[key] = chip.dataset.v;
          box.querySelectorAll(".jg-chip").forEach(function (c) {
            c.classList.remove("is-on");
            c.setAttribute("aria-pressed", "false");
          });
          chip.classList.add("is-on");
          chip.setAttribute("aria-pressed", "true");
          afRender();
        });
      });
    }
    afChips("af-policy", "policy");
    afChips("af-need", "need");
    ["region", "size", "sel", "sort"].forEach(function (key) {
      document.getElementById("af-" + key).addEventListener("change", function () {
        afState[key] = this.value;
        afRender();
      });
    });
    document.getElementById("af-search").addEventListener("input", function () {
      afState.q = this.value.trim().toLowerCase();
      afRender();
    });

    document.getElementById("af-verified").textContent =
      tpl(T("Data last verified: {date}."), { date: localDate(AF_DATA.verified) });
    afRender();
  }

  /* ------------------------------------------------------------------
     15. College list builder / match engine (college-list.html)

         Turns the estimates the other tools produced into a balanced
         list of real universities, split into Reach / Target / Safety
         with a SEPARATE affordability verdict, because a comfortable
         academic safety a student cannot pay for is not a safety.

         Reads the shared dataset js/aid-data.js — the same file the
         Financial Aid Finder uses, so the two tools can never disagree
         about one school's aid policy. Academic fields live in
         school.adm (see that file's header).

         THE RULES, in the order they are applied (do not reorder):

         Step 1  academic fit  — the student's test score against the
                 school's 25th/75th percentile band: below / within /
                 above. With both SAT and ACT available, the test that
                 places the student MORE FAVOURABLY wins: an estimate
                 that happens to look weaker should never be the one a
                 student is judged on.
         Step 2  baseline      — below→Reach, within→Target, above→Safety.
         Step 3  admit-rate override, and this is the single most
                 important rule in the engine: ANY school admitting
                 under 20% is a Reach, full stop, even for a student
                 above its 75th percentile — at that selectivity
                 admission is holistic and raw stats stop predicting.
                 A 20–40% school downgrades Safety→Target, never lower.
         Step 4  affordability — a second, independent dimension, never
                 merged into the category.
         Step 5  match score 0–100 — 50% how CENTRED the student is in
                 the band (centred scores highest; far above scores
                 lower than centred, because the question is "realistic
                 fit", not "how much stronger am I"), 30% affordability,
                 20% preferences. Sorting aid only, inside a tier —
                 never a probability, never compared across tiers.

         Two places where the spec's prose and its worked example
         disagree, resolved in favour of the worked example because
         Part 8 makes it the shipping gate:
         · School B is need-AWARE yet meets full need, and the example
           calls that a STRONG fit. Meeting full need once admitted is
           what decides a family's actual bill, so need-aware alone
           never means weak.
         · School C's student picked "may need some aid" (not
           "significant") and the example still flags a no-aid school
           WEAK. So weak triggers for any student who needs aid at all.

         Preferences filter and nudge the sort. They never touch a
         category — a school must not look more reachable merely
         because it sits in a region the student likes.
     ------------------------------------------------------------------ */
  const clBuilder = document.getElementById("cl-builder");

  if (clBuilder && window.USUFU_AID_DATA) {
    const CL_STORE = "usufu-college-list";
    const CL_SCHOOLS = window.USUFU_AID_DATA.schools || [];

    /* Thresholds — deliberately chosen, see the block comment above */
    const CL_REACH_ADMIT = 20;   // under this: always Reach
    const CL_TARGET_ADMIT = 40;  // under this: Safety downgrades to Target
    const CL_GPA_BAND = 0.15;    // ± around a published average = "within"

    const el = function (id) { return document.getElementById(id); };

    let clState = {
      gpa: "", sat: "", act: "", need: "some",
      region: "all", size: "all", filtermode: "filter"
    };
    let clImported = { gpa: false, test: false };

    /* ---------- profile: builder's own values first, then imports ---------- */
    function clLoad() {
      let saved = null;
      try {
        const raw = localStorage.getItem(CL_STORE);
        if (raw) saved = JSON.parse(raw);
      } catch (e) { saved = null; }

      if (saved && typeof saved === "object") {
        ["gpa", "sat", "act", "need", "region", "size", "filtermode"].forEach(function (k) {
          if (typeof saved[k] === "string") clState[k] = saved[k];
        });
      }

      // Pre-fill anything still blank from what the other tools published
      const prof = profileRead();
      if (!clState.gpa && typeof prof.gpa === "number") {
        clState.gpa = String(prof.gpa);
        clImported.gpa = true;
      }
      if (!clState.sat && typeof prof.satLow === "number" && typeof prof.satHigh === "number") {
        // The NMT tool publishes a RANGE on purpose; the comparison
        // needs one number, so use the midpoint — and keep showing the
        // student the range it came from (see clBasis).
        clState.sat = String(Math.round((prof.satLow + prof.satHigh) / 2));
        clImported.test = true;
        clState._satRange = prof.satLow + "–" + prof.satHigh;
      }
      if (!clState.act && typeof prof.actLow === "number" && typeof prof.actHigh === "number") {
        clState.act = String(Math.round((prof.actLow + prof.actHigh) / 2));
        clImported.test = true;
        clState._actRange = prof.actLow + "–" + prof.actHigh;
      }
    }

    function clSave() {
      try {
        localStorage.setItem(CL_STORE, JSON.stringify({
          gpa: clState.gpa, sat: clState.sat, act: clState.act, need: clState.need,
          region: clState.region, size: clState.size,
          filtermode: clState.filtermode
        }));
      } catch (e) { /* storage unavailable — the tool still works this visit */ }
    }

    /* ---------- validated student numbers ---------- */
    function clNum(raw, min, max) {
      if (raw === "" || raw === null || raw === undefined) return null;
      const v = parseFloat(String(raw).replace(",", "."));
      if (!isFinite(v) || v < min || v > max) return null;
      return v;
    }
    function clProfile() {
      return {
        gpa: clNum(clState.gpa, 0, 4),
        sat: clNum(clState.sat, 400, 1600),
        act: clNum(clState.act, 1, 36),
        need: clState.need
      };
    }

    /* ---------- buckets shared with the aid finder ---------- */
    function clSize(s) { return s.ug < 5000 ? "small" : s.ug <= 15000 ? "medium" : "large"; }

    /* ---------- Step 1: academic fit ----------
       Returns { fit, basis } where fit is "below"|"within"|"above",
       or null when no honest comparison is possible. */
    const FIT_RANK = { below: 0, within: 1, above: 2 };

    function clBandFit(score, lo, hi) {
      if (score < lo) return "below";
      if (score > hi) return "above";
      return "within";
    }

    function clAcademicFit(p, s) {
      const adm = s.adm || {};
      const options = [];

      if (p.sat !== null && typeof adm.sat25 === "number" && typeof adm.sat75 === "number") {
        options.push({
          fit: clBandFit(p.sat, adm.sat25, adm.sat75),
          test: "SAT", score: p.sat, lo: adm.sat25, hi: adm.sat75
        });
      }
      if (p.act !== null && typeof adm.act25 === "number" && typeof adm.act75 === "number") {
        options.push({
          fit: clBandFit(p.act, adm.act25, adm.act75),
          test: "ACT", score: p.act, lo: adm.act25, hi: adm.act75
        });
      }
      if (options.length) {
        // more favourable of the two — never judge a student on the
        // weaker-looking of two equally valid estimates
        options.sort(function (a, b) { return FIT_RANK[b.fit] - FIT_RANK[a.fit]; });
        return options[0];
      }

      /* No test comparison possible. Fall back to a published average
         GPA — but ONLY an unweighted one: the student's number is on a
         4.0 unweighted scale, and comparing it to a school's weighted
         4.3 average would be quietly wrong. */
      if (p.gpa !== null && typeof adm.gpaAvg === "number" && adm.gpaScale === "unweighted") {
        let fit = "within";
        if (p.gpa < adm.gpaAvg - CL_GPA_BAND) fit = "below";
        else if (p.gpa > adm.gpaAvg + CL_GPA_BAND) fit = "above";
        return { fit: fit, test: "GPA", score: p.gpa, lo: adm.gpaAvg, hi: adm.gpaAvg, isGpa: true };
      }
      return null;
    }

    /* ---------- Steps 2 + 3: category ---------- */
    function clCategory(basis, s) {
      const admit = typeof s.admit === "number" ? s.admit : null;

      if (!basis) {
        // Edge case: opaque school with no published ranges at all.
        // A sub-20% admit rate alone is still enough to call it a Reach.
        if (admit !== null && admit < CL_REACH_ADMIT) {
          return { cat: "reach", override: "noRange" };
        }
        return { cat: "nodata", override: null };
      }

      let cat = basis.fit === "below" ? "reach" : basis.fit === "within" ? "target" : "safety";
      let override = null;

      if (admit !== null && admit < CL_REACH_ADMIT) {
        // THE override. Applies even to "above range" — do not weaken.
        if (cat !== "reach") override = "reach";
        cat = "reach";
      } else if (admit !== null && admit <= CL_TARGET_ADMIT && cat === "safety") {
        cat = "target";
        override = "target";
      }
      return { cat: cat, override: override };
    }

    /* ---------- Step 4: affordability, an independent verdict ---------- */
    function clAfford(p, s) {
      // Unknown or unconfirmed aid data is said plainly, never guessed.
      if (s.policy === undefined || s.policy === null || s.fullNeed === "unconfirmed") {
        return "unknown";
      }
      if (p.need === "none") return "neutral";

      const meetsFullNeed = s.fullNeed === "yes";
      const needBlind = s.policy === "blind";
      // need-aware + meets full need is still STRONG: what a family
      // actually pays is decided by the aid package, not by whether
      // finances were visible during the admission read.
      if (needBlind || meetsFullNeed) return "strong";

      const littleOrNoAid = s.policy === "none" || s.fullNeed === "no";
      if (littleOrNoAid) return "weak";

      /* Everything left is a school that gives international aid but
         stops short of meeting full need. That is NOT the same as
         "aid isn't a factor for you" — this student said they need
         some — so it gets its own honest verdict rather than being
         folded into the neutral bucket. */
      return "partial";
    }

    /* ---------- Step 5: match score (sorting aid only) ---------- */
    function clPrefHits(s) {
      const stated = [];
      if (clState.region !== "all") stated.push(s.region === clState.region);
      if (clState.size !== "all") stated.push(clSize(s) === clState.size);
      return stated;
    }

    function clScore(basis, afford, s) {
      // 50% — how centred in the band. Centre = 100; each half-width of
      // distance costs 40, so the band edges score 60 and a student far
      // above the range scores below a student sitting in the middle.
      let centred = 50;
      if (basis && !basis.isGpa) {
        const mid = (basis.lo + basis.hi) / 2;
        const half = (basis.hi - basis.lo) / 2;
        const d = half > 0 ? Math.abs(basis.score - mid) / half : (basis.score === mid ? 0 : 2);
        centred = Math.max(0, Math.min(100, 100 - 40 * d));
      } else if (basis && basis.isGpa) {
        centred = basis.fit === "within" ? 85 : 55; // coarser signal, flagged as such
      }

      const affordPts = afford === "strong" ? 100 : afford === "weak" ? 10 : 50;

      const hits = clPrefHits(s);
      // No preferences stated → nothing to fail; uniform across schools,
      // so it never distorts the ordering.
      const prefPts = hits.length
        ? (hits.filter(Boolean).length / hits.length) * 100
        : 100;

      return Math.round(0.5 * centred + 0.3 * affordPts + 0.2 * prefPts);
    }

    /* ---------- the reason sentence, built from the real numbers ---------- */
    function clWhy(p, s, basis, catInfo) {
      const admit = typeof s.admit === "number" ? s.admit : null;

      if (!basis) {
        if (catInfo.override === "noRange") {
          return tpl(T("This school publishes no admitted-score ranges, so no academic comparison was possible — but it admits about {admit}% of applicants, which makes it a reach for everyone."),
            { admit: admit });
        }
        return T("This school doesn't publish the admitted-student ranges this comparison needs, so we won't guess a category for it.");
      }

      const admitBit = admit !== null
        ? tpl(T(", and it admits about {admit}% of applicants"), { admit: admit })
        : "";

      let sentence;
      if (basis.isGpa) {
        const rel = basis.fit === "below" ? T("below") : basis.fit === "above" ? T("above") : T("in line with");
        sentence = tpl(T("You have no test estimate for this comparison, so it rests on GPA: yours ({gpa}) is {rel} this school's published average of {avg}{admitBit}."),
          { gpa: basis.score.toFixed(2), rel: rel, avg: basis.lo.toFixed(2), admitBit: admitBit });
      } else {
        const key = basis.fit === "below"
          ? "Your estimated {test} ({score}) falls below this school's typical admitted range ({lo}–{hi}){admitBit}."
          : basis.fit === "above"
            ? "Your estimated {test} ({score}) sits above this school's typical admitted range ({lo}–{hi}){admitBit}."
            : "Your estimated {test} ({score}) falls inside this school's typical admitted range ({lo}–{hi}){admitBit}.";
        sentence = tpl(T(key), {
          test: basis.test, score: basis.score, lo: basis.lo, hi: basis.hi, admitBit: admitBit
        });
      }

      if (catInfo.override === "reach") {
        sentence += " " + T("Even so, any school admitting under 20% is a reach: at that level decisions turn on essays, context and luck that no score can predict.");
      } else if (catInfo.override === "target") {
        sentence += " " + T("Strong on paper, but at this admit rate it belongs in the target column rather than as a safety.");
      }
      return sentence;
    }

    function clAffordWhy(s, afford) {
      if (afford === "unknown") {
        return T("Aid policy for international students is unconfirmed for this school — check its own page before counting on anything.");
      }
      if (afford === "strong") {
        return s.policy === "blind"
          ? T("Need-blind for international applicants and committed to meeting demonstrated need.")
          : T("Need-aware in admission, but it does meet full demonstrated need once you are admitted — which is what decides your actual bill.");
      }
      if (afford === "weak") {
        return T("Little or no need-based aid for international students, which makes this expensive no matter how likely admission is.");
      }
      if (afford === "partial") {
        return T("This school does award aid to international students but stops short of meeting full need — expect a gap you have to cover, so run its net price calculator early.");
      }
      return T("Cost is not a primary constraint for you, so aid policy isn't weighted here.");
    }

    /* ---------- rendering ---------- */
    const CL_CATS = ["reach", "target", "safety", "nodata"];
    const CL_CAT_LABEL = { reach: "Reach", target: "Target", safety: "Safety", nodata: "Insufficient data" };
    const CL_AFF_LABEL = {
      strong: "Strong affordability fit", weak: "Weak affordability fit",
      partial: "Partial aid — expect a gap",
      neutral: "Aid not a primary factor", unknown: "Aid policy unconfirmed"
    };
    const CL_AFF_CLASS = {
      strong: "a-strong", weak: "a-weak", partial: "a-partial",
      neutral: "a-neutral", unknown: "a-neutral"
    };

    function clCard(row) {
      const s = row.s;
      const card = document.createElement("article");
      card.className = "cl-card";

      const top = document.createElement("div");
      top.className = "cl-card-top";
      const h = document.createElement("h4");
      h.textContent = s.name;
      const place = document.createElement("span");
      place.className = "cl-place";
      place.textContent = s.city + ", " + s.state + " · " + T(s.type === "public" ? "Public" : "Private") +
        " · ~" + s.ug.toLocaleString("en-US") + " " + T("undergrads");
      top.appendChild(h);
      top.appendChild(place);
      card.appendChild(top);

      const badges = document.createElement("div");
      badges.className = "cl-badges";
      const cb = document.createElement("span");
      cb.className = "cl-badge c-" + row.cat;
      cb.textContent = T(CL_CAT_LABEL[row.cat]);
      badges.appendChild(cb);
      const ab = document.createElement("span");
      ab.className = "cl-badge " + CL_AFF_CLASS[row.afford];
      ab.textContent = T(CL_AFF_LABEL[row.afford]);
      badges.appendChild(ab);
      if (row.cat !== "nodata") {
        const sc = document.createElement("span");
        sc.className = "cl-score";
        sc.textContent = tpl(T("match {n}"), { n: row.score });
        sc.title = T("A relative sorting aid inside this tier — not a probability of admission.");
        badges.appendChild(sc);
      }
      card.appendChild(badges);

      const why = document.createElement("p");
      why.className = "cl-why";
      why.textContent = row.why;
      card.appendChild(why);

      const aidWhy = document.createElement("p");
      aidWhy.className = "cl-aid-why";
      aidWhy.textContent = row.affordWhy;
      card.appendChild(aidWhy);

      /* The sentence above makes an academic claim, so cite where the
         ranges came from — and say so out loud when the row is only
         aggregator-confident rather than read from the school's CDS. */
      const adm = s.adm || {};
      if (row.usedRanges && adm.admSrc) {
        const note = document.createElement("p");
        note.className = "cl-src-note";
        note.textContent = tpl(T("Ranges: {src}"), { src: adm.admSrc }) +
          (adm.admConf === "medium" ? " · " + T("aggregated source — confirm on the school's own page") : "");
        card.appendChild(note);
      }

      /* Save toggle — this is what turns the catalogue into a real
         shortlist for the Funding Gap Calculator (module 16). It only
         records the name and the tier; every number the funding tool
         shows is recomputed there from the dataset. */
      const saveWrap = document.createElement("div");
      saveWrap.className = "cl-save-row";
      const saveBtn = document.createElement("button");
      saveBtn.type = "button";
      saveBtn.className = "cl-save";
      function paintSave(on) {
        saveBtn.classList.toggle("is-on", on);
        saveBtn.setAttribute("aria-pressed", on ? "true" : "false");
        saveBtn.textContent = on ? T("Saved for the funding check") : T("Save for the funding check");
      }
      paintSave(shortlistHas(s.name));
      saveBtn.addEventListener("click", function () {
        paintSave(shortlistToggle(s.name, row.cat));
        clPaintShortlistBar();
      });
      saveWrap.appendChild(saveBtn);
      card.appendChild(saveWrap);

      const foot = document.createElement("div");
      foot.className = "cl-foot";
      const src = document.createElement("span");
      src.className = "af-src";
      src.textContent = s.src || "";
      const link = document.createElement("a");
      link.className = "cl-link";
      link.href = s.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = T("Official aid page");
      foot.appendChild(src);
      foot.appendChild(link);
      card.appendChild(foot);

      return card;
    }

    /* The saved-count bar under the basis note. Hidden until the
       student has saved at least one school, so it never nags. */
    function clPaintShortlistBar() {
      const bar = el("cl-shortlist");
      if (!bar) return;
      const n = shortlistRead().length;
      if (!n) { bar.hidden = true; bar.innerHTML = ""; return; }
      bar.hidden = false;
      bar.innerHTML = "";
      const txt = document.createElement("span");
      txt.textContent = n === 1
        ? T("1 school saved.")
        : tpl(T("{n} schools saved."), { n: n });
      const link = document.createElement("a");
      link.href = "funding-gap.html";
      link.textContent = T("Check what a year would actually cost you →");
      bar.appendChild(txt);
      bar.appendChild(link);
    }

    function clBasisNote(p) {
      const bits = [];
      if (p.gpa !== null) {
        bits.push(tpl(T("GPA {v}"), { v: p.gpa.toFixed(2) }) +
          (clImported.gpa ? " " + T("(imported)") : ""));
      }
      if (p.sat !== null) {
        bits.push(tpl(T("SAT {v}"), { v: p.sat }) +
          (clState._satRange ? " " + tpl(T("(midpoint of your {r} estimate)"), { r: clState._satRange }) : ""));
      }
      if (p.act !== null) {
        bits.push(tpl(T("ACT {v}"), { v: p.act }) +
          (clState._actRange ? " " + tpl(T("(midpoint of your {r} estimate)"), { r: clState._actRange }) : ""));
      }
      let text = bits.length
        ? tpl(T("Built from: {bits}."), { bits: bits.join(" · ") })
        : T("No usable numbers yet — add a GPA or a test estimate above.");

      // Edge case: only one of the two inputs is available
      const hasTest = p.sat !== null || p.act !== null;
      if (p.gpa !== null && !hasTest) {
        text += " " + T("Without a test estimate this comparison rests on GPA alone, so treat the categories as rougher than usual — the NMT estimator will sharpen them.");
      } else if (hasTest && p.gpa === null) {
        text += " " + T("No GPA entered, so schools are judged on test range alone — that is the stronger signal here, but adding your GPA helps.");
      }
      return text;
    }

    function clRun() {
      const p = clProfile();
      const results = el("cl-results");
      const basisNote = el("cl-basis");

      basisNote.textContent = clBasisNote(p);

      const usable = p.gpa !== null || p.sat !== null || p.act !== null;
      if (!usable) {
        results.hidden = true;
        el("cl-partial").textContent = T("Enter at least a GPA or a test score to build your list.");
        return;
      }
      el("cl-partial").textContent = "";
      results.hidden = false;

      const strict = clState.filtermode === "filter";
      const buckets = { reach: [], target: [], safety: [], nodata: [] };
      let filteredOut = 0;

      CL_SCHOOLS.forEach(function (s) {
        // Preferences narrow the list (or merely re-rank, if the student
        // chose the softer mode) — they never reach the classifier.
        const hits = clPrefHits(s);
        const allMatch = hits.every(Boolean);
        if (strict && hits.length && !allMatch) { filteredOut++; return; }

        const basis = clAcademicFit(p, s);
        const catInfo = clCategory(basis, s);
        const afford = clAfford(p, s);

        buckets[catInfo.cat].push({
          s: s, cat: catInfo.cat, afford: afford,
          score: clScore(basis, afford, s),
          why: clWhy(p, s, basis, catInfo),
          affordWhy: clAffordWhy(s, afford),
          usedRanges: !!(basis && !basis.isGpa) // cite ranges only when we used them
        });
      });

      CL_CATS.forEach(function (cat) {
        const rows = buckets[cat];
        // Score orders schools INSIDE a tier only, never across tiers.
        rows.sort(function (a, b) { return b.score - a.score || a.s.name.localeCompare(b.s.name); });

        const grid = el("cl-grid-" + cat);
        grid.innerHTML = "";
        el("cl-count-" + cat).textContent = rows.length;

        if (!rows.length) {
          const empty = document.createElement("p");
          empty.className = "cl-empty";
          empty.textContent = filteredOut
            ? tpl(T("Nothing here with your current filters — {n} schools were hidden by them. Try setting a preference back to “no preference”, or switch to “show everything”."), { n: filteredOut })
            : T("Nothing in this tier from the schools we cover yet.");
          grid.appendChild(empty);
          return;
        }
        rows.forEach(function (row) { grid.appendChild(clCard(row)); });
      });

      clPaintShortlistBar();
    }

    /* ---------- wiring ---------- */
    function clSyncInputs() {
      el("cl-gpa").value = clState.gpa;
      el("cl-sat").value = clState.sat;
      el("cl-act").value = clState.act;
      el("cl-need").value = clState.need;
      el("cl-region").value = clState.region;
      el("cl-size").value = clState.size;
      el("cl-filtermode").value = clState.filtermode;

      const banner = el("cl-import");
      if (clImported.gpa || clImported.test) {
        const which = [];
        if (clImported.gpa) which.push(T("your GPA conversion"));
        if (clImported.test) which.push(T("your NMT estimate"));
        banner.hidden = false;
        banner.textContent = tpl(T("Filled in from {which} — edit anything that has changed."),
          { which: which.join(T(" and ")) });
      } else {
        banner.hidden = true;
      }
    }

    function clValidate() {
      const checks = [
        ["cl-gpa", clNum(clState.gpa, 0, 4), clState.gpa, T("GPA must be between 0 and 4.0.")],
        ["cl-sat", clNum(clState.sat, 400, 1600), clState.sat, T("SAT totals run from 400 to 1600.")],
        ["cl-act", clNum(clState.act, 1, 36), clState.act, T("ACT composites run from 1 to 36.")]
      ];
      checks.forEach(function (c) {
        const errEl = el(c[0] + "-err");
        const bad = c[2] !== "" && c[1] === null;
        errEl.textContent = bad ? c[3] : "";
        el(c[0]).classList.toggle("is-invalid", bad);
      });
    }

    ["gpa", "sat", "act"].forEach(function (k) {
      el("cl-" + k).addEventListener("input", function () {
        clState[k] = this.value;
        // typed values are the student's own; drop the "imported" note
        if (k === "gpa") clImported.gpa = false;
        else { clImported.test = false; clState["_" + k + "Range"] = null; }
        clValidate();
        clSave();
        if (!el("cl-results").hidden) clRun();
      });
    });
    ["need", "region", "size", "filtermode"].forEach(function (k) {
      el("cl-" + k).addEventListener("change", function () {
        clState[k] = this.value;
        clSave();
        if (!el("cl-results").hidden) clRun();
      });
    });

    el("cl-run").addEventListener("click", function () {
      clValidate();
      clRun();
      const results = el("cl-results");
      if (!results.hidden) results.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    el("cl-reset").addEventListener("click", function () {
      clState = { gpa: "", sat: "", act: "", need: "some", region: "all", size: "all", filtermode: "filter" };
      clImported = { gpa: false, test: false };
      try { localStorage.removeItem(CL_STORE); } catch (e) {}
      clSyncInputs();
      clValidate();
      el("cl-results").hidden = true;
      el("cl-partial").textContent = "";
    });

    clLoad();
    clSyncInputs();
    clValidate();
    // If the other tools already gave us something to work with, show
    // the list immediately rather than making the student press a button
    // to see numbers the site already had.
    const boot = clProfile();
    if (boot.gpa !== null || boot.sat !== null || boot.act !== null) clRun();
  }

  /* ------------------------------------------------------------------
     16. Net price & I-20 funding gap calculator (funding-gap.html)

         The step after the match engine. Getting in and being able to
         pay are two problems; proving you can pay, in a documented
         form, by a deadline, is a third one families meet late and
         unprepared. Before a university issues the I-20 an F-1 visa
         application needs, it must see documentation covering its full
         published first-year cost of attendance from an accepted
         source. That is a binary checkpoint — the paperwork reaches
         the figure or the visa process stops — and it is what this
         module computes against.

         Reads the SAME dataset as the aid finder and the match engine
         (js/aid-data.js), extended with a `coa` block per school, so
         all three tools quote one set of numbers for any school.

         THE CALCULATION, per school, in order:
           1  total first-year cost  = school's own published COA
                                       (coa.total). Null ⇒ no result.
           2  expected aid, most specific source first:
                a  a confirmed award letter amount the student typed
                   for THIS school — always wins, because a specific
                   letter beats any school-wide average;
                b  coa.intlAvgAid, the school's own published typical
                   international award;
                c  neither ⇒ UNKNOWN. Not zero, not a plausible guess.
                   Unknown aid produces "insufficient data", never a
                   confident number in either direction.
           3  net estimated cost = total − expected aid (only when
                                   step 2 gave a real number)
           4  funding available  = family/sponsor funds
                                 + the loan, but only if the student
                                   said they would use one AND the
                                   school does not exclude loans.
                                 The confirmed award is NOT added here:
                                   it was already subtracted in step 3
                                   and adding it again would double it.
           5  gap = net cost − funding available. ≤ 0 ⇒ coverable.
                    > 0 ⇒ stated plainly, as an exact figure.

         Two deliberate refinements over a literal reading of the spec,
         both in the honest direction:

         · Unknown aid + funds already above FULL sticker price ⇒ still
           "coverable". This is arithmetic, not optimism: if the family
           can document more than the entire published cost before any
           aid at all, no unknown aid figure can change the answer.
           Saying "insufficient data" there would be the bug class this
           project has hit before — an authoritative sentence that
           contradicts the user's own input.
         · A loan is counted when the school has not published whether
           it accepts loans (coa.loansOk === null), because most do —
           but the card says so out loud, and when the loan is the only
           thing closing the gap it also shows the gap without it. The
           student sees both numbers rather than one optimistic one.

         No total-across-schools figure is shown anywhere, on purpose:
         a student attends one university, so a summed gap would be a
         large, frightening number that means nothing.
     ------------------------------------------------------------------ */
  const fgBuilder = document.getElementById("fg-builder");

  if (fgBuilder && window.USUFU_AID_DATA) {
    const FG_STORE = "usufu-funding-gap";
    const FG_SCHOOLS = window.USUFU_AID_DATA.schools || [];
    const FG_MAX = 999999;   // same input ceiling as the finances tools

    /* Static, dated rate — this site has no backend and will not pretend
       to a live feed. Displayed as a secondary figure only; every
       decision on this page is made in the USD the I-20 is written in. */
    const FG_UAH = 44.64;
    const FG_UAH_DATE = "3 August 2026";
    const FG_UAH_SRC = "National Bank of Ukraine official rate";

    const fel = function (id) { return document.getElementById(id); };

    let fgState = { family: "", loanUse: "no", loan: "", schools: [], awards: {} };
    let fgImported = false;

    function fgFind(name) {
      return FG_SCHOOLS.filter(function (s) { return s.name === name; })[0] || null;
    }

    /* ---------- state ---------- */
    function fgLoad() {
      let saved = null;
      try {
        const raw = localStorage.getItem(FG_STORE);
        if (raw) saved = JSON.parse(raw);
      } catch (e) { saved = null; }

      if (saved && typeof saved === "object") {
        if (typeof saved.family === "string") fgState.family = saved.family;
        if (saved.loanUse === "yes" || saved.loanUse === "no") fgState.loanUse = saved.loanUse;
        if (typeof saved.loan === "string") fgState.loan = saved.loan;
        if (Array.isArray(saved.schools)) {
          // Drop anything no longer in the dataset rather than rendering
          // a card this tool cannot compute.
          fgState.schools = saved.schools.filter(function (n) {
            return typeof n === "string" && fgFind(n);
          });
        }
        if (saved.awards && typeof saved.awards === "object") {
          Object.keys(saved.awards).forEach(function (k) {
            if (typeof saved.awards[k] === "string") fgState.awards[k] = saved.awards[k];
          });
        }
      }

      // First visit with nothing of our own: start from what the student
      // saved in the College List Builder.
      if (!fgState.schools.length) {
        const shortlist = shortlistRead().filter(function (r) { return fgFind(r.name); });
        if (shortlist.length) {
          fgState.schools = shortlist.map(function (r) { return r.name; });
          fgImported = true;
        }
      }
    }

    function fgSave() {
      try {
        localStorage.setItem(FG_STORE, JSON.stringify({
          family: fgState.family, loanUse: fgState.loanUse, loan: fgState.loan,
          schools: fgState.schools, awards: fgState.awards
        }));
      } catch (e) { /* storage unavailable — the tool still works this visit */ }
    }

    /* ---------- numbers ---------- */
    function fgNum(raw) {
      if (raw === "" || raw === null || raw === undefined) return null;
      const v = parseFloat(String(raw).replace(/[\s,]/g, "").replace(",", "."));
      if (!isFinite(v) || v < 0 || v > FG_MAX) return null;
      return Math.round(v);
    }
    function fgUsd(n) {
      return "$" + Math.round(n).toLocaleString("en-US");
    }
    function fgUah(n) {
      // Rounded to the nearest thousand hryvnia: this is a budgeting
      // aid, and false precision on a converted figure would be noise.
      const v = Math.round((n * FG_UAH) / 1000) * 1000;
      return "≈ " + v.toLocaleString("en-US") + " ₴";
    }

    /* ---------- the calculation (see the block comment above) ---------- */
    function fgCompute(name) {
      const s = fgFind(name);
      const coa = (s && s.coa) || null;
      const out = {
        s: s, name: name, cat: fgCatOf(name),
        total: null, tuition: null, living: null,
        aid: null, aidFrom: null, net: null,
        family: fgNum(fgState.family) || 0,
        loanEntered: fgState.loanUse === "yes" ? (fgNum(fgState.loan) || 0) : 0,
        loanCounted: 0, loanUnconfirmed: false, loanRefused: false,
        available: 0, gap: null, status: "nodata", reason: null,
        src: coa ? coa.coaSrc : null,
        conf: coa ? coa.coaConf : null,
        year: coa ? coa.year : null
      };

      if (!coa || typeof coa.total !== "number") {
        out.reason = "noCost";
        return out;
      }
      out.total = coa.total;
      if (typeof coa.tuitionFees === "number") out.tuition = coa.tuitionFees;
      if (typeof coa.livingOther === "number") out.living = coa.livingOther;

      // Step 4 first — funding available does not depend on the aid figure.
      if (out.loanEntered > 0) {
        if (coa.loansOk === false) out.loanRefused = true;
        else {
          out.loanCounted = out.loanEntered;
          out.loanUnconfirmed = coa.loansOk !== true;
        }
      }
      out.available = out.family + out.loanCounted;

      // Step 2 — most specific source wins.
      const award = fgNum(fgState.awards[name]);
      if (award !== null) { out.aid = award; out.aidFrom = "letter"; }
      else if (typeof coa.intlAvgAid === "number") { out.aid = coa.intlAvgAid; out.aidFrom = "typical"; }

      if (out.aid === null) {
        /* Aid unknown. Normally that is "insufficient data" — except
           when the student's documented funds already clear the FULL
           sticker price, where the answer is certain regardless. */
        if (out.available >= out.total) {
          out.status = "covered";
          out.reason = "coversSticker";
          out.net = out.total;
          out.gap = out.total - out.available;
        } else {
          out.status = "nodata";
          out.reason = "noAid";
          /* We cannot say what this year would NET out at — but we can
             say what it would cost with no aid whatsoever, and that is
             a hard ceiling rather than an estimate. A family that walks
             away knowing the worst case has learned something real;
             "insufficient data" on its own teaches nothing. */
          out.stickerGap = out.total - out.available;
        }
        return out;
      }

      out.net = Math.max(0, out.total - out.aid);
      out.gap = out.net - out.available;
      out.status = out.gap > 0 ? "gap" : "covered";
      return out;
    }

    /* Tier from the saved shortlist, purely for ordering. Advisory —
       it never enters the arithmetic. */
    function fgCatOf(name) {
      const row = shortlistRead().filter(function (r) { return r.name === name; })[0];
      return row && row.cat ? row.cat : null;
    }

    /* Reach schools last: funding planning pays off most for the schools
       a student is most likely to actually attend. They are never hidden. */
    const FG_ORDER = { target: 0, safety: 1, nodata: 2, reach: 4 };
    function fgRank(cat) {
      return cat && FG_ORDER[cat] !== undefined ? FG_ORDER[cat] : 3;
    }

    /* ---------- Step 1: the school list (rebuilt ONLY on add/remove) ----------
       Typing in an award field must never rebuild these cards — that is
       the focus-loss bug this project has already shipped once. Award
       input re-renders the RESULTS only, which live in separate DOM. */
    function fgRenderSchools() {
      const wrap = fel("fg-schools");
      wrap.innerHTML = "";

      // "Check my funding" has nothing to check until a school is on the
      // list, and a button that does nothing when pressed reads as broken.
      // Hide it (and the smooth-scroll it triggers) until there is a list.
      fel("fg-run").hidden = !fgState.schools.length;

      if (!fgState.schools.length) {
        const empty = document.createElement("div");
        empty.className = "fg-empty";
        const p1 = document.createElement("p");
        p1.textContent = T("No schools yet. Add one below to check it on its own.");
        const p2 = document.createElement("p");
        p2.appendChild(document.createTextNode(T("For the fuller picture, build a balanced list first and save the schools you are serious about — they arrive here automatically.") + " "));
        const a = document.createElement("a");
        a.href = "college-list.html";
        a.textContent = T("Open the College List Builder →");
        p2.appendChild(a);
        empty.appendChild(p1);
        empty.appendChild(p2);
        wrap.appendChild(empty);
      }

      fgState.schools.forEach(function (name, i) {
        const s = fgFind(name);
        if (!s) return;

        const row = document.createElement("div");
        row.className = "fg-school";

        const top = document.createElement("div");
        top.className = "fg-school-top";
        const h = document.createElement("h4");
        h.textContent = s.name;
        const place = document.createElement("span");
        place.className = "fg-school-place";
        place.textContent = s.city + ", " + s.state;
        const cat = fgCatOf(name);
        if (cat && cat !== "nodata") {
          const chip = document.createElement("span");
          chip.className = "fg-chip c-" + cat;
          chip.textContent = T(cat === "reach" ? "Reach" : cat === "safety" ? "Safety" : "Target");
          place.appendChild(document.createTextNode(" "));
          place.appendChild(chip);
        }
        const rm = document.createElement("button");
        rm.type = "button";
        rm.className = "fg-remove";
        rm.textContent = T("Remove");
        rm.setAttribute("aria-label", tpl(T("Remove {school} from my list"), { school: s.name }));
        rm.addEventListener("click", function () {
          fgState.schools.splice(fgState.schools.indexOf(name), 1);
          delete fgState.awards[name];
          fgSave();
          fgRenderSchools();
          fgRenderAddSelect();
          if (!fel("fg-results").hidden) fgRun();
        });
        top.appendChild(h);
        top.appendChild(place);
        top.appendChild(rm);
        row.appendChild(top);

        const field = document.createElement("div");
        field.className = "form-field fg-award";
        const lab = document.createElement("label");
        lab.setAttribute("for", "fg-award-" + i);
        lab.textContent = T("Confirmed award, in US$ (optional)");
        const inp = document.createElement("input");
        inp.id = "fg-award-" + i;
        inp.type = "number";
        inp.inputMode = "numeric";
        inp.min = "0";
        inp.max = String(FG_MAX);
        inp.step = "100";
        inp.placeholder = T("Leave blank if you have no letter yet");
        inp.value = fgState.awards[name] || "";
        inp.addEventListener("input", function () {
          fgState.awards[name] = this.value;
          const bad = this.value !== "" && fgNum(this.value) === null;
          this.classList.toggle("is-invalid", bad);
          err.textContent = bad ? T("Enter an amount between 0 and 999,999.") : "";
          fgSave();
          if (!fel("fg-results").hidden) fgRun();   // results only — never this card
        });
        const hint = document.createElement("span");
        hint.className = "fg-hint";
        hint.textContent = T("Only if you already hold an award letter with a figure on it. A real letter always overrides any published average.");
        const err = document.createElement("p");
        err.className = "uac-err";
        err.setAttribute("aria-live", "polite");

        field.appendChild(lab);
        field.appendChild(inp);
        field.appendChild(hint);
        field.appendChild(err);
        row.appendChild(field);

        wrap.appendChild(row);
      });
    }

    function fgRenderAddSelect() {
      const sel = fel("fg-add-sel");
      const keep = sel.value;
      sel.innerHTML = "";
      const remaining = FG_SCHOOLS
        .filter(function (s) { return fgState.schools.indexOf(s.name) < 0; })
        .sort(function (a, b) { return a.name.localeCompare(b.name); });

      if (!remaining.length) {
        const o = document.createElement("option");
        o.value = "";
        o.textContent = T("Every school we cover is already on your list");
        sel.appendChild(o);
        sel.disabled = true;
        fel("fg-add-btn").disabled = true;
        return;
      }
      sel.disabled = false;
      fel("fg-add-btn").disabled = false;
      const first = document.createElement("option");
      first.value = "";
      first.textContent = T("Choose a university…");
      sel.appendChild(first);
      remaining.forEach(function (s) {
        const o = document.createElement("option");
        o.value = s.name;
        o.textContent = s.name + " — " + s.city + ", " + s.state;
        sel.appendChild(o);
      });
      if (keep && remaining.some(function (s) { return s.name === keep; })) sel.value = keep;
    }

    /* ---------- a breakdown row: US$ headline, ₴ underneath ---------- */
    function fgRow(label, usd, opts) {
      const o = opts || {};
      const r = document.createElement("div");
      r.className = "fg-row" + (o.cls ? " " + o.cls : "");

      const l = document.createElement("span");
      l.className = "fg-row-label";
      l.textContent = label;
      if (o.note) {
        const n = document.createElement("span");
        n.className = "fg-row-note";
        n.textContent = o.note;
        l.appendChild(n);
      }

      const v = document.createElement("span");
      v.className = "fg-row-value";
      if (usd === null) {
        const t = document.createElement("b");
        t.className = "fg-unknown";
        t.textContent = o.unknownText || T("not published");
        v.appendChild(t);
      } else {
        const t = document.createElement("b");
        t.textContent = (o.sign === "-" ? "− " : "") + fgUsd(Math.abs(usd));
        const u = document.createElement("span");
        u.className = "fg-uah";
        u.textContent = fgUah(Math.abs(usd));
        v.appendChild(t);
        v.appendChild(u);
      }
      r.appendChild(l);
      r.appendChild(v);
      return r;
    }

    /* ---------- the per-school card ---------- */
    function fgCard(c) {
      const s = c.s;
      const card = document.createElement("article");
      card.className = "fg-card s-" + c.status;

      const top = document.createElement("div");
      top.className = "cl-card-top";
      const h = document.createElement("h4");
      h.textContent = s.name;
      const place = document.createElement("span");
      place.className = "cl-place";
      place.textContent = s.city + ", " + s.state + " · " + T(s.type === "public" ? "Public" : "Private");
      top.appendChild(h);
      top.appendChild(place);
      card.appendChild(top);

      /* Headline — the one sentence a family reads first. A gap is
         stated as an exact figure and never softened; it is also never
         dressed up as bad news. */
      const head = document.createElement("p");
      head.className = "fg-status";
      if (c.status === "covered") {
        head.textContent = T("Funding likely coverable");
      } else if (c.status === "gap") {
        head.textContent = tpl(T("Funding gap: {amount}"), { amount: fgUsd(c.gap) });
      } else {
        head.textContent = T("Insufficient data to assess");
      }
      card.appendChild(head);

      if (c.status === "nodata") {
        const p = document.createElement("p");
        p.className = "fg-why";
        p.textContent = c.reason === "noCost"
          ? T("We do not yet hold this school's published cost of attendance, so there is no honest figure to work from. Its international student office can give you both the exact cost and the exact amount it requires you to document.")
          : T("This school's published cost of attendance is here, but it does not publish a typical international aid award — and you have not entered an award letter for it. Rather than invent an aid figure, we leave this one open. Add a letter above once you have one, or ask the school's financial aid office what an applicant like you typically receives.");
        card.appendChild(p);

        if (c.total !== null) {
          const box = document.createElement("div");
          box.className = "fg-breakdown";
          box.appendChild(fgRow(T("Total first-year cost, published"), c.total, {
            note: c.year ? tpl(T("{year} figures"), { year: c.year }) : null
          }));
          box.appendChild(fgRow(T("Expected aid"), null, {}));
          box.appendChild(fgRow(T("Funding you can document"), c.available, { sign: "-" }));
          box.appendChild(fgRow(T("At most, still to document"), c.stickerGap, {
            cls: "is-total is-ceiling",
            note: T("the figure if this school gave you nothing at all — any aid brings it down")
          }));
          card.appendChild(box);
        }
        fgAppendSource(card, c);
        return card;
      }

      /* Full breakdown — every number that produced the headline, shown
         so a family can check the arithmetic themselves. */
      const box = document.createElement("div");
      box.className = "fg-breakdown";

      const splitNote = (c.tuition !== null && c.living !== null)
        ? tpl(T("{tuition} tuition & fees + {living} living, insurance & personal"),
            { tuition: fgUsd(c.tuition), living: fgUsd(c.living) })
        : null;
      box.appendChild(fgRow(T("Total first-year cost, published"), c.total, {
        note: [c.year ? tpl(T("{year} figures"), { year: c.year }) : null, splitNote]
          .filter(Boolean).join(" · ") || null
      }));

      if (c.reason === "coversSticker") {
        box.appendChild(fgRow(T("Expected aid"), null, {
          note: T("not published — and not needed for this result")
        }));
      } else {
        box.appendChild(fgRow(T("Expected aid"), c.aid, {
          sign: "-",
          note: c.aidFrom === "letter"
            ? T("from the award letter you entered")
            : T("the school's average award to international students who did receive aid — not a promise you will be offered it")
        }));
        box.appendChild(fgRow(T("Net estimated cost"), c.net, { cls: "is-sub" }));
      }

      const fundNote = [];
      fundNote.push(tpl(T("{amount} family or sponsor funds"), { amount: fgUsd(c.family) }));
      if (c.loanCounted > 0) fundNote.push(tpl(T("{amount} education loan"), { amount: fgUsd(c.loanCounted) }));
      box.appendChild(fgRow(T("Funding you can document"), c.available, {
        sign: "-", note: fundNote.join(" + ")
      }));

      box.appendChild(fgRow(
        c.gap > 0 ? T("Still to document") : T("Covered, with room to spare"),
        Math.abs(c.gap),
        { cls: "is-total " + (c.gap > 0 ? "is-gap" : "is-ok") }
      ));
      card.appendChild(box);

      /* Loan caveats — stated on the card, not in a footnote. */
      if (c.loanRefused) {
        const p = document.createElement("p");
        p.className = "fg-flag";
        p.textContent = tpl(T("This school states it does not accept an education loan toward I-20 funding documentation, so the {amount} loan is not counted above."),
          { amount: fgUsd(c.loanEntered) });
        card.appendChild(p);
      } else if (c.loanCounted > 0 && c.loanUnconfirmed) {
        const p = document.createElement("p");
        p.className = "fg-flag";
        let txt = tpl(T("The {amount} loan is counted above. This school has not published whether an approved education loan counts toward its I-20 documentation — most do, but confirm it with the international student office before relying on it."),
          { amount: fgUsd(c.loanCounted) });
        // Only worth showing the loan-free figure when the loan is the
        // single thing turning a gap into a covered result.
        const without = c.gap + c.loanCounted;
        if (c.gap <= 0 && without > 0) {
          txt += " " + tpl(T("Without it, the gap would be {amount}."), { amount: fgUsd(without) });
        }
        p.appendChild(document.createTextNode(txt));
        card.appendChild(p);
      }

      if (c.reason === "coversSticker") {
        const p = document.createElement("p");
        p.className = "fg-why";
        p.textContent = T("This school publishes no typical international aid award, so we normally could not judge it. Here we can: what you can document already covers the entire published cost before any aid at all, so an unknown aid figure cannot change the answer. Any aid you do receive only widens the margin.");
        card.appendChild(p);
      }

      /* Next steps — only when there is a gap, and written to be
         worked on rather than absorbed as bad news. */
      if (c.status === "gap") {
        const next = document.createElement("div");
        next.className = "fg-next";
        const nh = document.createElement("b");
        nh.textContent = T("What could close this");
        const np = document.createElement("p");
        np.textContent = T("A gap at this stage is a figure to work on, not a verdict — and universities let several kinds of proof add up to the same total. A sponsor's own bank statement with a signed letter of support counts. So does a scholarship or grant letter you have not entered here yet, including outside awards. So does an approved education loan, at almost every school. Ask this university's international student office which combination it accepts and what its exact required figure is: that question is completely routine for them, and it is far better asked now than after an offer arrives.");
        next.appendChild(nh);
        next.appendChild(np);
        card.appendChild(next);
      }

      fgAppendSource(card, c);
      return card;
    }

    function fgAppendSource(card, c) {
      const foot = document.createElement("div");
      foot.className = "cl-foot";
      const src = document.createElement("span");
      src.className = "af-src";
      src.textContent = c.src
        ? (c.src + (c.conf === "medium" ? " · " + T("secondary source — confirm on the school's own page") : ""))
        : T("No published cost figure on file for this school yet.");
      const link = document.createElement("a");
      link.className = "cl-link";
      link.href = c.s.url;
      link.target = "_blank";
      link.rel = "noopener";
      link.textContent = T("Official aid page");
      foot.appendChild(src);
      foot.appendChild(link);
      card.appendChild(foot);
    }

    /* ---------- run ---------- */
    function fgRun() {
      const results = fel("fg-results");
      const grid = fel("fg-grid");

      if (!fgState.schools.length) {
        results.hidden = true;
        return;
      }
      results.hidden = false;

      const family = fgNum(fgState.family);
      const loan = fgState.loanUse === "yes" ? fgNum(fgState.loan) : null;
      const bits = [tpl(T("{amount} in family or sponsor funds"), { amount: fgUsd(family || 0) })];
      if (fgState.loanUse === "yes") {
        bits.push(tpl(T("{amount} in education loan funds"), { amount: fgUsd(loan || 0) }));
      }
      fel("fg-basis").textContent =
        tpl(T("Working from {bits}, for one academic year, against each school's own published cost."),
          { bits: bits.join(" " + T("and") + " ") }) +
        (family === null || family === 0
          ? " " + T("You have not entered any family funds yet, so every figure below is the full amount still to be documented.")
          : "");

      const rows = fgState.schools.map(fgCompute);
      rows.sort(function (a, b) {
        return fgRank(a.cat) - fgRank(b.cat) || a.name.localeCompare(b.name);
      });

      grid.innerHTML = "";
      let reachSeen = false;
      rows.forEach(function (c) {
        if (c.cat === "reach" && !reachSeen) {
          reachSeen = true;
          const div = document.createElement("p");
          div.className = "fg-divider";
          div.textContent = T("Reach schools come last here — not because they matter less, but because funding paperwork is worth assembling first for the schools most likely to admit you.");
          grid.appendChild(div);
        }
        grid.appendChild(fgCard(c));
      });

      fel("fg-rate").textContent = tpl(
        T("Hryvnia figures are a secondary convenience only, converted at ₴{rate} to US$1 — the {src} on {date}. Every I-20 and every cost of attendance is written in US dollars, and the rate will have moved by the time you file."),
        { rate: FG_UAH.toFixed(2), src: T(FG_UAH_SRC), date: localDate(FG_UAH_DATE) }
      );
    }

    /* ---------- wiring ---------- */
    function fgValidate() {
      const checks = [
        ["fg-family", fgState.family],
        ["fg-loan", fgState.loan]
      ];
      checks.forEach(function (c) {
        const node = fel(c[0]);
        const errNode = fel(c[0] + "-err");
        if (!node || !errNode) return;
        const bad = c[1] !== "" && fgNum(c[1]) === null;
        errNode.textContent = bad ? T("Enter an amount between 0 and 999,999.") : "";
        node.classList.toggle("is-invalid", bad);
      });
    }

    function fgSyncInputs() {
      fel("fg-family").value = fgState.family;
      fel("fg-loan-use").value = fgState.loanUse;
      fel("fg-loan").value = fgState.loan;
      fel("fg-loan-field").hidden = fgState.loanUse !== "yes";

      const banner = fel("fg-import");
      if (fgImported) {
        banner.hidden = false;
        banner.textContent = fgState.schools.length === 1
          ? T("Brought over from the College List Builder: 1 school you saved.")
          : tpl(T("Brought over from the College List Builder: {n} schools you saved."),
              { n: fgState.schools.length });
      } else {
        banner.hidden = true;
      }
    }

    ["family", "loan"].forEach(function (k) {
      fel("fg-" + k).addEventListener("input", function () {
        fgState[k] = this.value;
        fgValidate();
        fgSave();
        if (!fel("fg-results").hidden) fgRun();
      });
    });

    fel("fg-loan-use").addEventListener("change", function () {
      fgState.loanUse = this.value;
      fel("fg-loan-field").hidden = this.value !== "yes";
      fgSave();
      if (!fel("fg-results").hidden) fgRun();
    });

    fel("fg-add-btn").addEventListener("click", function () {
      const name = fel("fg-add-sel").value;
      if (!name || fgState.schools.indexOf(name) >= 0) return;
      fgState.schools.push(name);
      fgImported = false;   // the list is the student's own now
      fgSave();
      fgSyncInputs();
      fgRenderSchools();
      fgRenderAddSelect();
      fgRun();
    });

    fel("fg-run").addEventListener("click", function () {
      fgValidate();
      fgRun();
      const results = fel("fg-results");
      if (!results.hidden) results.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    fel("fg-reset").addEventListener("click", function () {
      fgState = { family: "", loanUse: "no", loan: "", schools: [], awards: {} };
      fgImported = false;
      try { localStorage.removeItem(FG_STORE); } catch (e) {}
      fgSyncInputs();
      fgValidate();
      fgRenderSchools();
      fgRenderAddSelect();
      fel("fg-results").hidden = true;
    });

    const fgVerified = fel("fg-verified");
    if (fgVerified && window.USUFU_AID_DATA.verified) {
      fgVerified.textContent = tpl(T("Cost figures in this tool were last verified {when}."),
        { when: localDate(window.USUFU_AID_DATA.verified) });
    }

    fgLoad();
    fgSyncInputs();
    fgValidate();
    fgRenderSchools();
    fgRenderAddSelect();
    // Schools already in hand? Show the answer rather than making the
    // student press a button for numbers the site already has.
    if (fgState.schools.length) fgRun();
  }

  /* ------------------------------------------------------------------
     17. Visa & document processing backward-scheduler (visa-scheduler.html)

         The last step in the chain, and the first tool here whose core
         logic is SCHEDULING, not conversion or arithmetic. Given a fixed
         target date it works backward through every lead-time-bearing
         step and reports the latest safe date to START each one.

         TWO PHASES WITH DIFFERENT TRIGGERS — never conflated:

         Phase A · document preparation (before applying). Driver: the
           EARLIEST application deadline across the student's shortlist.
           Apostilled/translated records are prepared once and reused
           across every school, so the soonest deadline binds. Per
           document, chain backward:
             deadline − submit buffer − translation − apostille
           APOSTILLE PRECEDES TRANSLATION on purpose: you apostille the
           original, then translate the apostilled document. Modelled
           sequential, not parallel. (If a future maintainer learns a
           document type allows the reverse order, this is the assumption
           to revisit — it lives in vsPhaseADoc below.)

         Phase B · visa logistics (after admission). Driver: the program
           START DATE at the ONE chosen school. Chain backward:
             start − final US travel − visa issuance − appointment wait
                   − third-country travel
           SEVIS fee is a PARALLEL branch: it must simply clear before the
           interview (≥3 business days), not sit in the main chain — so it
           is scheduled off the interview date and sorts near it, not at
           the top.

         THE VOLATILE NUMBER (appointment wait time) is never shown as a
         live figure. A wide, clearly-labelled conservative band is used,
         the plan always links out to the State Department's weekly page,
         and a prominent standing disclaimer — escalated automatically when
         USUFU_VISA_DATA.policyPause.active is set — warns that F/M/J
         scheduling has been paused by policy before and could be again.
         This is the one caveat on the whole site whose absence could make
         a family book non-refundable travel around a plan that quietly
         assumed conditions that were not true, so it is the first thing in
         Phase B, not a footnote.

         Backward date math distinguishes "business" days (skip weekends)
         from "calendar" days. Public holidays are NOT modelled — an honest
         simplification the disclaimer states out loud. The plan always
         uses the LONGER (max) end of each range, so a "start by" date errs
         toward more buffer, never less.
     ------------------------------------------------------------------ */
  const vsRoot = document.getElementById("visa-scheduler");

  if (vsRoot && window.USUFU_VISA_DATA) {
    const VS_STORE = "usufu-visa-scheduler";
    const VD = window.USUFU_VISA_DATA;
    const STEP = VD.steps;
    const vel = function (id) { return document.getElementById(id); };
    const vsLang = function () {
      return (window.USUFU_I18N && USUFU_I18N.lang && USUFU_I18N.lang()) || "en";
    };

    let vsState = {
      phase: "a",
      deadlines: [],   // [{id, school, date}]  date = "YYYY-MM-DD" or ""
      docs: [],        // [{id, name, apostille, translation, older, done, suggested}]
      translation: "standard",
      schoolB: "", start: "", post: "warsaw", travel: ""
    };
    let vsSeq = 1;
    let vsImportedA = false, vsImportedB = false;

    /* ---------- date helpers ---------- */
    function vsToday() {
      const d = new Date();
      return new Date(d.getFullYear(), d.getMonth(), d.getDate());
    }
    function vsParse(str) {
      if (!str || !/^\d{4}-\d{2}-\d{2}$/.test(str)) return null;
      const p = str.split("-");
      const d = new Date(+p[0], +p[1] - 1, +p[2]);
      return isNaN(d.getTime()) ? null : d;
    }
    function vsSubCal(date, n) {
      const d = new Date(date.getTime());
      d.setDate(d.getDate() - n);
      return d;
    }
    function vsSubBiz(date, n) {
      const d = new Date(date.getTime());
      let left = n;
      while (left > 0) {
        d.setDate(d.getDate() - 1);
        const day = d.getDay();
        if (day !== 0 && day !== 6) left--;
      }
      return d;
    }
    function vsFmt(date) {
      try {
        return date.toLocaleDateString(vsLang() === "uk" ? "uk-UA" : "en-GB",
          { day: "numeric", month: "short", year: "numeric" });
      } catch (e) {
        return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate();
      }
    }
    function vsDaysBetween(a, b) {
      return Math.round((b.getTime() - a.getTime()) / 86400000);
    }

    /* comfortable / tight / at-risk against today */
    function vsStatus(startBy) {
      const diff = vsDaysBetween(vsToday(), startBy);
      if (diff < 0) return "past";
      if (diff <= 21) return "tight";
      return "ok";
    }
    const VS_STATUS_LABEL = { past: "At risk — start now", tight: "Tight — begin soon", ok: "Comfortable" };
    function vsGuide(status, canRush) {
      if (status === "past") {
        return canRush
          ? T("Today is already past the safe start date. Begin this immediately and ask about rush processing to claw the time back.")
          : T("Today is already past the safe start date. Begin this immediately — there is no slack left on this step.");
      }
      if (status === "tight") {
        return T("There is little room here. Start within the next couple of weeks and keep this one moving.");
      }
      return T("There is comfortable room on this step at today's date.");
    }

    /* ---------- state persistence ---------- */
    function vsLoad() {
      let saved = null;
      try {
        const raw = localStorage.getItem(VS_STORE);
        if (raw) saved = JSON.parse(raw);
      } catch (e) { saved = null; }

      if (saved && typeof saved === "object") {
        if (saved.phase === "a" || saved.phase === "b") vsState.phase = saved.phase;
        if (typeof saved.translation === "string") vsState.translation = saved.translation;
        if (typeof saved.schoolB === "string") vsState.schoolB = saved.schoolB;
        if (typeof saved.start === "string") vsState.start = saved.start;
        if (typeof saved.post === "string") vsState.post = saved.post;
        if (typeof saved.travel === "string") vsState.travel = saved.travel;
        if (Array.isArray(saved.deadlines)) {
          vsState.deadlines = saved.deadlines
            .filter(function (r) { return r && typeof r === "object"; })
            .map(function (r) {
              return { id: vsSeq++, school: String(r.school || ""), date: String(r.date || "") };
            });
        }
        if (Array.isArray(saved.docs)) {
          vsState.docs = saved.docs
            .filter(function (r) { return r && typeof r === "object"; })
            .map(function (r) {
              return {
                id: vsSeq++, name: String(r.name || ""),
                apostille: r.apostille !== false, translation: r.translation !== false,
                older: !!r.older, done: !!r.done, suggested: !!r.suggested
              };
            });
        }
      }

      // First visit: seed deadlines from the saved shortlist, and add the
      // NMT certificate if the Education Record Helper flagged that path.
      if (!vsState.deadlines.length) {
        const sl = shortlistRead();
        if (sl.length) {
          vsState.deadlines = sl.map(function (r) { return { id: vsSeq++, school: r.name, date: "" }; });
          vsImportedA = true;
        }
      }
      if (!vsState.docs.length) {
        vsState.docs = [
          { id: vsSeq++, name: T("Transcript / academic records"), apostille: true, translation: true, older: false, done: false, suggested: false },
          { id: vsSeq++, name: T("School-leaving certificate (diploma)"), apostille: true, translation: true, older: false, done: false, suggested: false }
        ];
        if (vsRecordFlags().nmt) {
          vsState.docs.push({ id: vsSeq++, name: T("NMT certificate"), apostille: true, translation: true, older: false, done: false, suggested: true });
          vsImportedA = true;
        }
      }
      // Phase B: prefer the school the funding tool was last used with.
      if (!vsState.schoolB) {
        const fs = vsFundingSchool();
        if (fs) { vsState.schoolB = fs; vsImportedB = true; }
        else {
          const sl = shortlistRead();
          if (sl.length) { vsState.schoolB = sl[0].name; vsImportedB = true; }
        }
      }
    }
    function vsSave() {
      try {
        localStorage.setItem(VS_STORE, JSON.stringify({
          phase: vsState.phase, translation: vsState.translation,
          schoolB: vsState.schoolB, start: vsState.start, post: vsState.post, travel: vsState.travel,
          deadlines: vsState.deadlines.map(function (r) { return { school: r.school, date: r.date }; }),
          docs: vsState.docs.map(function (r) {
            return { name: r.name, apostille: r.apostille, translation: r.translation, older: r.older, done: r.done, suggested: r.suggested };
          })
        }));
      } catch (e) { /* storage unavailable — still works this visit */ }
    }

    function vsRecordFlags() {
      try {
        const raw = localStorage.getItem("usufu-record-helper");
        if (!raw) return { nmt: false };
        const p = JSON.parse(raw);
        let nmt = false;
        if (p && p.gaps) {
          Object.keys(p.gaps).forEach(function (k) {
            if (p.gaps[k] && p.gaps[k].cat === "nmt") nmt = true;
          });
        }
        return { nmt: nmt };
      } catch (e) { return { nmt: false }; }
    }
    function vsFundingSchool() {
      try {
        const raw = localStorage.getItem("usufu-funding-gap");
        if (!raw) return null;
        const p = JSON.parse(raw);
        if (p && Array.isArray(p.schools) && p.schools.length) return p.schools[0];
      } catch (e) {}
      return null;
    }

    /* ================= PHASE A ================= */

    /* One document's backward chain. Apostille THEN translation — see the
       module header; this is the single assumption to revisit if a
       document type is ever confirmed to allow the reverse order. */
    function vsPhaseADoc(doc, docsReadyBy) {
      let cursor = docsReadyBy;
      const chain = [];
      let transDays = 0, apoDays = 0;

      if (doc.translation) {
        const opt = STEP.translation.options[vsState.translation] || STEP.translation.options.standard;
        transDays = opt.maxDays;
        cursor = vsSubBiz(cursor, transDays);
      }
      if (doc.apostille) {
        apoDays = STEP.apostille.maxDays + (doc.older ? STEP.apostille.olderDocExtraDays : 0);
        cursor = vsSubBiz(cursor, apoDays);
      }

      if (doc.apostille) {
        chain.push(tpl(T("apostille (up to {n} business days{older})"),
          { n: apoDays, older: doc.older ? " " + T("— older/archival document") : "" }));
      }
      if (doc.translation) {
        chain.push(tpl(T("certified translation (up to {n} business days, {speed})"),
          { n: transDays, speed: T(STEP.translation.options[vsState.translation].label) }));
      }
      return { startBy: cursor, chain: chain };
    }

    function vsRunA() {
      const results = vel("vs-a-results");
      const basis = vel("vs-a-basis");

      const dated = vsState.deadlines
        .map(function (r) { return { school: r.school, date: vsParse(r.date) }; })
        .filter(function (r) { return r.date; });

      if (!dated.length) {
        results.hidden = false;
        basis.textContent = T("Add at least one school with an application deadline above, and the schedule appears here.");
        vsRenderSpine("vs-a-spine", []);
        return { ok: false, reason: "nodate" };
      }
      dated.sort(function (a, b) { return a.date - b.date; });
      const earliest = dated[0];

      const scheduled = vsState.docs.filter(function (d) {
        return !d.done && (d.apostille || d.translation);
      });

      results.hidden = false;

      // basis note
      const others = dated.slice(1);
      let basisText = tpl(T("Planning against your earliest deadline: {school}, {date}."),
        { school: earliest.school || T("your first school"), date: vsFmt(earliest.date) });
      if (others.length) {
        basisText += " " + tpl(T("Your other deadlines ({list}) have more room and are marked on the line below."),
          { list: others.map(function (o) { return (o.school || "—") + " " + vsFmt(o.date); }).join(" · ") });
      }
      if (!scheduled.length) {
        basisText += " " + T("No documents currently need apostille or translation — add one, or untick “already done”.");
      }
      basis.textContent = basisText;

      const submitBuf = STEP.submissionBuffer.maxDays;
      const docsReadyBy = vsSubCal(earliest.date, submitBuf);

      const nodes = [];
      scheduled.forEach(function (doc) {
        const r = vsPhaseADoc(doc, docsReadyBy);
        const status = vsStatus(r.startBy);
        nodes.push({
          date: r.startBy, kind: "action", status: status,
          title: doc.name || T("Untitled document"),
          when: tpl(T("Start by {date}"), { date: vsFmt(r.startBy) }),
          desc: r.chain.join(" → ") + " → " + tpl(T("then {n} days to submit"), { n: submitBuf }) + ".",
          guide: vsGuide(status, true)
        });
      });
      // sort action nodes earliest-first
      nodes.sort(function (a, b) { return a.date - b.date; });
      // then the deadline target(s)
      dated.forEach(function (d) {
        nodes.push({
          date: d.date, kind: "target", status: null,
          title: d.school || T("Application due"),
          when: tpl(T("Deadline · {date}"), { date: vsFmt(d.date) }),
          desc: d === earliest ? T("Your earliest deadline — the one this plan is built around.") : T("A later deadline — more breathing room."),
          guide: null
        });
      });
      nodes.sort(function (a, b) { return a.date - b.date || (a.kind === "target" ? 1 : -1); });

      vsRenderSpine("vs-a-spine", nodes);
      return { ok: true, worstStatus: vsWorst(nodes) };
    }

    /* ================= PHASE B ================= */

    function vsWaitDays() {
      const w = vsState.post === "undetermined" ? STEP.waitTime.undetermined : STEP.waitTime.named;
      return { min: w.minWeeks * 7, max: w.maxWeeks * 7, minW: w.minWeeks, maxW: w.maxWeeks };
    }
    function vsTravelDays() {
      const v = parseInt(vsState.travel, 10);
      if (isFinite(v) && v >= 0 && v <= 120) return v;
      return STEP.thirdCountryTravel.maxDays;
    }
    function vsPostCity() {
      if (vsState.post === "undetermined") return T("a post you have not chosen yet");
      const p = (VD.posts || []).filter(function (x) { return x.id === vsState.post; })[0];
      return p ? p.city : T("your interview post");
    }

    function vsRunB() {
      const results = vel("vs-b-results");
      const basis = vel("vs-b-basis");
      const start = vsParse(vsState.start);

      if (!start) {
        results.hidden = true;
        basis.textContent = "";
        return { ok: false, reason: "nodate" };
      }
      results.hidden = false;

      const wait = vsWaitDays();
      const travel = vsTravelDays();

      // backward milestones (max/conservative ends throughout)
      const visaInHandBy = vsSubCal(start, STEP.finalTravel.maxDays);
      const interviewBy = vsSubCal(visaInHandBy, STEP.issuance.maxDays);
      const bookApptBy = vsSubCal(interviewBy, wait.max);
      const beginBy = vsSubCal(bookApptBy, travel);
      const sevisPayBy = vsSubBiz(interviewBy, STEP.sevis.minDays); // parallel branch

      const nodes = [];
      function action(date, title, when, desc, canRush) {
        const st = vsStatus(date);
        nodes.push({ date: date, kind: "action", status: st, title: title, when: when, desc: desc, guide: vsGuide(st, !!canRush) });
      }
      function target(date, title, when, desc) {
        nodes.push({ date: date, kind: "target", status: null, title: title, when: when, desc: desc, guide: null });
      }

      action(beginBy,
        T("Have your I-20 in hand and begin booking"),
        tpl(T("Start by {date}"), { date: vsFmt(beginBy) }),
        T("Your school must have issued the I-20 by now — that is where the Funding Gap Calculator's “coverable” result needs to have landed. With it, start the DS-160, pay the SEVIS fee, and open appointment booking."),
        false);

      action(bookApptBy,
        tpl(T("Book your interview at {city}"), { city: vsPostCity() }),
        tpl(T("Book by {date}"), { date: vsFmt(bookApptBy) }),
        tpl(T("Appointment waits swing widely by post and can be paused entirely — this uses a conservative {min}–{max} week band, not a live figure. Confirm the current wait for your post before you rely on this date."),
          { min: wait.minW, max: wait.maxW }),
        false);

      action(sevisPayBy,
        T("SEVIS I-901 fee paid and cleared"),
        tpl(T("By {date}"), { date: vsFmt(sevisPayBy) }),
        T("This runs in parallel with booking — it simply has to clear at least three business days before your interview."),
        false);

      target(interviewBy,
        tpl(T("Interview at {city}"), { city: vsPostCity() }),
        tpl(T("By {date}"), { date: vsFmt(interviewBy) }),
        T("The interview itself. After a successful one, your passport is sent back with the visa."));

      target(visaInHandBy,
        T("Visa and passport back in hand"),
        tpl(T("By {date}"), { date: vsFmt(visaInHandBy) }),
        tpl(T("Allows {min}–{max} days for issuance and return, which administrative processing can extend."),
          { min: STEP.issuance.minDays, max: STEP.issuance.maxDays }));

      target(start,
        vsState.schoolB ? tpl(T("{school} begins"), { school: vsState.schoolB }) : T("Program begins"),
        tpl(T("Start · {date}"), { date: vsFmt(start) }),
        T("The fixed date everything here is measured back from."));

      nodes.sort(function (a, b) { return a.date - b.date || (a.kind === "target" ? 1 : -1); });

      // basis
      let basisText = tpl(T("Planning back from {date}, through a third-country interview at {city}."),
        { date: vsFmt(start), city: vsPostCity() });
      const worst = vsWorst(nodes);
      if (worst === "past") {
        basisText += " " + T("At today's date this is tight — some steps are already past their safe start. The line below marks what to begin first; treat rush processing and the soonest appointment as priorities.");
      }
      basis.textContent = basisText;

      vsRenderSpine("vs-b-spine", nodes);
      vsRenderLinks();
      return { ok: true, worstStatus: worst };
    }

    function vsWorst(nodes) {
      let worst = "ok";
      nodes.forEach(function (n) {
        if (n.status === "past") worst = "past";
        else if (n.status === "tight" && worst !== "past") worst = "tight";
      });
      return worst;
    }

    /* ---------- spine rendering (reuses the leveled-timeline component) ---------- */
    function vsRenderSpine(id, nodes) {
      const spine = vel(id);
      // keep the fill element, clear the items
      Array.prototype.slice.call(spine.querySelectorAll(".spine-item")).forEach(function (n) { n.remove(); });

      nodes.forEach(function (n, i) {
        const art = document.createElement("article");
        art.className = "spine-item vs-node " +
          (i % 2 === 0 ? "spine-item--left" : "spine-item--right") +
          (n.kind === "target" ? " vs-node--target" : "") +
          (n.status ? " vs-node--" + n.status : "");

        const when = document.createElement("span");
        when.className = "spine-season vs-when";
        when.textContent = n.when;
        art.appendChild(when);

        const h = document.createElement("h3");
        h.textContent = n.title;
        art.appendChild(h);

        if (n.status) {
          const chip = document.createElement("span");
          chip.className = "vs-status vs-status--" + n.status;
          chip.textContent = T(VS_STATUS_LABEL[n.status]);
          art.appendChild(chip);
        }

        const p = document.createElement("p");
        p.textContent = n.desc;
        art.appendChild(p);

        if (n.guide) {
          const g = document.createElement("p");
          g.className = "vs-guide";
          g.textContent = n.guide;
          art.appendChild(g);
        }
        spine.appendChild(art);
      });
    }

    /* ---------- Phase B alert + out-links ---------- */
    function vsRenderAlert() {
      const box = vel("vs-alert");
      box.innerHTML = "";
      const pause = VD.policyPause || {};
      const strong = document.createElement("b");
      const body = document.createElement("span");

      if (pause.active) {
        box.classList.add("is-critical");
        strong.textContent = pause.since
          ? tpl(T("As of {since}, new F-1 interview scheduling is paused."), { since: pause.since })
          : T("New F-1 interview scheduling is currently paused.");
        body.textContent = " " + (pause.note ? pause.note + " " : "") +
          T("This plan cannot run until scheduling resumes — check the State Department page before making any travel plans.");
      } else {
        box.classList.remove("is-critical");
        strong.textContent = T("Before you book anything, read this.");
        body.textContent = " " + T("Interview scheduling for F/M/J student visas has been paused globally by policy before — most recently in 2025 — and can be again with no notice. This schedule assumes normal operating conditions. Confirm current wait times and consular status for Ukraine before booking any non-refundable travel.");
      }
      box.appendChild(strong);
      box.appendChild(body);
    }

    function vsLinkBtn(href, label) {
      const a = document.createElement("a");
      a.className = "vs-link";
      a.href = href; a.target = "_blank"; a.rel = "noopener";
      a.textContent = label;
      return a;
    }
    function vsRenderLinks() {
      const wrap = vel("vs-links");
      wrap.innerHTML = "";
      const lead = document.createElement("span");
      lead.className = "vs-links-lead";
      lead.textContent = T("Check the live sources before you commit to travel:");
      wrap.appendChild(lead);
      wrap.appendChild(vsLinkBtn(VD.links.waitTimes, T("State Dept. wait times")));
      wrap.appendChild(vsLinkBtn(VD.links.kyivStatus, T("U.S. Embassy Kyiv status")));
      wrap.appendChild(vsLinkBtn(VD.links.sevis, T("Pay the SEVIS fee")));
    }

    /* ================= repeater UIs (rebuilt only on add/remove/toggle) ================= */

    function vsRenderDeadlines() {
      const wrap = vel("vs-deadlines");
      wrap.innerHTML = "";
      if (!vsState.deadlines.length) {
        const p = document.createElement("p");
        p.className = "vs-empty";
        p.textContent = T("Add each school you plan to apply to and its application deadline. The plan builds against the earliest.");
        wrap.appendChild(p);
      }
      vsState.deadlines.forEach(function (row) {
        const r = document.createElement("div");
        r.className = "vs-drow";

        const name = document.createElement("div");
        name.className = "form-field";
        const nl = document.createElement("label");
        nl.textContent = T("School");
        const ni = document.createElement("input");
        ni.type = "text"; ni.value = row.school; ni.placeholder = T("School name");
        ni.addEventListener("input", function () { row.school = this.value; vsSave(); vsRefreshA(); });
        name.appendChild(nl); name.appendChild(ni);

        const date = document.createElement("div");
        date.className = "form-field";
        const dl = document.createElement("label");
        dl.textContent = T("Application deadline");
        const di = document.createElement("input");
        di.type = "date"; di.value = row.date;
        di.addEventListener("input", function () { row.date = this.value; vsSave(); vsRefreshA(); });
        date.appendChild(dl); date.appendChild(di);

        const rm = document.createElement("button");
        rm.type = "button"; rm.className = "vs-remove";
        rm.textContent = T("Remove");
        rm.addEventListener("click", function () {
          vsState.deadlines = vsState.deadlines.filter(function (x) { return x.id !== row.id; });
          vsSave(); vsRenderDeadlines(); vsRefreshA();
        });

        r.appendChild(name); r.appendChild(date); r.appendChild(rm);
        wrap.appendChild(r);
      });
    }

    function vsRenderDocs() {
      const wrap = vel("vs-docs");
      wrap.innerHTML = "";
      vsState.docs.forEach(function (doc) {
        const r = document.createElement("div");
        r.className = "vs-docrow" + (doc.done ? " is-done" : "");

        const nameF = document.createElement("div");
        nameF.className = "form-field vs-docname";
        const ni = document.createElement("input");
        ni.type = "text"; ni.value = doc.name; ni.placeholder = T("Document name");
        ni.setAttribute("aria-label", T("Document name"));
        ni.addEventListener("input", function () { doc.name = this.value; vsSave(); vsRefreshA(); });
        nameF.appendChild(ni);
        if (doc.suggested) {
          const tag = document.createElement("span");
          tag.className = "vs-suggested";
          tag.textContent = T("suggested from your Record Helper");
          nameF.appendChild(tag);
        }

        const toggles = document.createElement("div");
        toggles.className = "vs-toggles";
        [
          ["apostille", T("Apostille")],
          ["translation", T("Translation")],
          ["older", T("Older / pre-1991")],
          ["done", T("Already done")]
        ].forEach(function (t) {
          const lab = document.createElement("label");
          lab.className = "vs-check";
          const cb = document.createElement("input");
          cb.type = "checkbox"; cb.checked = !!doc[t[0]];
          cb.addEventListener("change", function () {
            doc[t[0]] = this.checked;
            vsSave();
            vsRenderDocs();   // 'done' greys the row; toggles change the chain
            vsRefreshA();
          });
          lab.appendChild(cb);
          lab.appendChild(document.createTextNode(" " + t[1]));
          toggles.appendChild(lab);
        });

        const rm = document.createElement("button");
        rm.type = "button"; rm.className = "vs-remove";
        rm.textContent = T("Remove");
        rm.addEventListener("click", function () {
          vsState.docs = vsState.docs.filter(function (x) { return x.id !== doc.id; });
          vsSave(); vsRenderDocs(); vsRefreshA();
        });

        r.appendChild(nameF); r.appendChild(toggles); r.appendChild(rm);
        wrap.appendChild(r);
      });
    }

    /* recompute results only (never rebuilds the repeaters — the focus-loss
       trap from the Record Helper, HANDOFF §6) */
    function vsRefreshA() { if (!vel("vs-a-results").hidden) vsRunA(); }
    function vsRefreshB() { if (!vel("vs-b-results").hidden) vsRunB(); }

    /* ---------- phase switch ---------- */
    function vsShowPhase(phase) {
      vsState.phase = phase;
      vel("vs-phase-a").hidden = phase !== "a";
      vel("vs-phase-b").hidden = phase !== "b";
      Array.prototype.slice.call(vsRoot.querySelectorAll(".vs-phase-btn")).forEach(function (b) {
        const on = b.getAttribute("data-phase") === phase;
        b.classList.toggle("is-on", on);
        b.setAttribute("aria-pressed", on ? "true" : "false");
      });
      if (phase === "b") vsRenderAlert();
      vsSave();
    }

    /* ---------- sync scalar inputs ---------- */
    function vsSyncInputs() {
      vel("vs-translation").value = vsState.translation;
      vel("vs-school-b").value = vsState.schoolB;
      vel("vs-start").value = vsState.start;
      vel("vs-travel").value = vsState.travel;

      const postSel = vel("vs-post");
      postSel.innerHTML = "";
      (VD.posts || []).forEach(function (p) {
        const o = document.createElement("option");
        // Real city names have no translation and pass through unchanged;
        // the "Another post" pseudo-option is a UI label and does translate.
        o.value = p.id; o.textContent = T(p.city);
        postSel.appendChild(o);
      });
      const undo = document.createElement("option");
      undo.value = "undetermined"; undo.textContent = T("Not yet determined");
      postSel.appendChild(undo);
      postSel.value = vsState.post || "warsaw";

      const impA = vel("vs-a-import");
      if (vsImportedA) {
        impA.hidden = false;
        impA.textContent = T("Filled in from your saved shortlist and Record Helper — edit anything freely.");
      } else { impA.hidden = true; }

      const impB = vel("vs-b-import");
      if (vsImportedB) {
        impB.hidden = false;
        impB.textContent = tpl(T("Carried over from your earlier tools: {school}. Change it if you are attending elsewhere."), { school: vsState.schoolB });
      } else { impB.hidden = true; }
    }

    /* ---------- wiring ---------- */
    Array.prototype.slice.call(vsRoot.querySelectorAll(".vs-phase-btn")).forEach(function (b) {
      b.addEventListener("click", function () { vsShowPhase(b.getAttribute("data-phase")); });
    });

    vel("vs-add-school-btn").addEventListener("click", function () {
      const inp = vel("vs-add-school");
      vsState.deadlines.push({ id: vsSeq++, school: inp.value.trim(), date: "" });
      inp.value = "";
      vsSave(); vsRenderDeadlines(); vsRefreshA();
    });
    vel("vs-add-doc-btn").addEventListener("click", function () {
      const inp = vel("vs-add-doc");
      vsState.docs.push({ id: vsSeq++, name: inp.value.trim() || T("New document"), apostille: true, translation: true, older: false, done: false, suggested: false });
      inp.value = "";
      vsSave(); vsRenderDocs(); vsRefreshA();
    });
    vel("vs-translation").addEventListener("change", function () {
      vsState.translation = this.value; vsSave(); vsRefreshA();
    });

    ["schoolB:vs-school-b", "start:vs-start", "travel:vs-travel"].forEach(function (pair) {
      const k = pair.split(":")[0], id = pair.split(":")[1];
      vel(id).addEventListener("input", function () {
        vsState[k] = this.value;
        if (id === "vs-start") {
          const bad = this.value !== "" && !vsParse(this.value);
          vel("vs-start-err").textContent = bad ? T("Enter a valid date.") : "";
        }
        vsSave(); vsRefreshB();
      });
    });
    vel("vs-post").addEventListener("change", function () {
      vsState.post = this.value; vsSave(); vsRefreshB();
    });

    vel("vs-a-run").addEventListener("click", function () {
      vsRunA();
      vel("vs-a-results").scrollIntoView({ behavior: "smooth", block: "start" });
    });
    vel("vs-b-run").addEventListener("click", function () {
      const r = vsRunB();
      if (r.ok) vel("vs-b-results").scrollIntoView({ behavior: "smooth", block: "start" });
      else vel("vs-start-err").textContent = T("Enter your program start date to build the schedule.");
    });

    vel("vs-a-reset").addEventListener("click", function () {
      vsState.deadlines = [];
      vsState.docs = [
        { id: vsSeq++, name: T("Transcript / academic records"), apostille: true, translation: true, older: false, done: false, suggested: false },
        { id: vsSeq++, name: T("School-leaving certificate (diploma)"), apostille: true, translation: true, older: false, done: false, suggested: false }
      ];
      vsState.translation = "standard";
      vsImportedA = false;
      vsSave();
      vsRenderDeadlines(); vsRenderDocs(); vsSyncInputs();
      vel("vs-a-results").hidden = true;
    });
    vel("vs-b-reset").addEventListener("click", function () {
      vsState.schoolB = ""; vsState.start = ""; vsState.post = "warsaw"; vsState.travel = "";
      vsImportedB = false;
      vsSave();
      vsSyncInputs();
      vel("vs-b-results").hidden = true;
      vel("vs-start-err").textContent = "";
    });

    const vsVerified = vel("vs-verified");
    if (vsVerified && VD.verified) {
      vsVerified.textContent = tpl(T("Lead-time data last verified {when}."), { when: localDate(VD.verified) });
    }

    /* ---------- boot ---------- */
    vsLoad();
    vsRenderDeadlines();
    vsRenderDocs();
    vsSyncInputs();
    vsRenderAlert();
    vsShowPhase(vsState.phase);
    // If we already have enough to compute, show it rather than making the
    // student press a button for numbers the site already had.
    if (vsState.deadlines.some(function (r) { return vsParse(r.date); })) vsRunA();
    if (vsParse(vsState.start)) vsRunB();
  }
})();
