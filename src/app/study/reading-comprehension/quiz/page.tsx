
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, BookOpen, Info, CheckCircle2, XCircle, Keyboard, ArrowRight } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  text: string
  options: string[]
  correct: number
  explanation: string
}

type Passage = {
  id: string
  title: string
  description: string
  content: string
  questions: Question[]
}

const RC_PASSAGES: Passage[] = [
  {
    id: "dr-moo",
    title: "Dr. Moo and the Cosmic Continuum",
    description: "A narrative adventure exploring the intersection of grammar and time-travel.",
    content: "In the sprawling expanse of the cosmos, there existed a peculiar dimension known as The Milky Way, a realm where time flowed not in a straight line, but in loops of past, present, and future. Guarding this timeline was an unlikely hero: Dr. Moo, a time-travelling cow with a penchant for flawless English grammar. While other celestial beings concerned themselves with black holes, Dr. Moo focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms. One epoch, a rogue comet threatened to scramble the timeline, merging the past continuous with the future perfect. \"We must make your English legend-dairy with tenses,\" she bellowed, activating her temporal hooves. She galloped through the cosmic dust, actively rewriting the stars. Where the comet had passively destroyed galaxies, Dr. Moo actively restored them. By ensuring the subject-verb agreement of the universe was perfectly aligned, she saved the continuum from collapsing into a chaotic jumble of dangling participles, proving that the fabric of time is held together by good punctuation.",
    questions: [
      { id: 85, text: "Based on the passage, what is Dr. Moo’s primary mission in The Milky Way?", options: ["To study black holes and celestial bodies", "To prevent galaxies from colliding passively", "To guard the timeline by fixing grammatical and temporal paradoxes", "To teach other celestial beings how to travel through time"], correct: 2, explanation: "The text states Dr. Moo 'focused on fixing temporal paradoxes caused by misplaced modifiers and incorrect verb forms'." },
      { id: 86, text: "Choose the correct meaning of the word 'penchant' as used in the passage:", options: ["A strong dislike or aversion", "A deep understanding of physics", "A magical ability to travel", "A strong or habitual liking for something"], correct: 3, explanation: "'Penchant' refers to a strong inclination or habitual liking for something—in this case, flawless English grammar." },
      { id: 87, text: "Identify the Figure of Speech (Poetic Device) used in the phrase: \"Make your English legend-dairy with tenses.\"", options: ["Pun", "Simile", "Oxymoron", "Personification"], correct: 0, explanation: "It uses a play on the words 'legendary' and 'dairy' in reference to the cow (Dr. Moo)." },
      { id: 88, text: "According to the passage, what specific grammatical element saved the continuum from collapsing?", options: ["Misplaced modifiers", "Subject-verb agreement", "Future perfect tense", "Dangling participles"], correct: 1, explanation: "The text explicitly says: 'By ensuring the subject-verb agreement of the universe was perfectly aligned, she saved the continuum'." }
    ]
  },
  {
    id: "smart-classrooms",
    title: "The Evolution of Smart Classrooms",
    description: "A factual look at how AI is transforming the pedagogical landscape.",
    content: "The landscape of modern education is undergoing a seismic shift, driven by the advent of artificial intelligence. Traditional classrooms, once reliant entirely on static textbooks, are now embracing dynamic digital ecosystems. Central to this transformation are AI-powered smart test applications designed to assess student learning outcomes with unprecedented accuracy. These intelligent testing platforms adapt to a student's proficiency level in real-time, offering personalized quizzes that identify specific areas of improvement. Furthermore, specialized AI frameworks are being developed to assist teachers in navigating dense literature. For example, micro-analysis apps can quickly break down classic literary texts into easily digestible summaries, character arcs, and thematic explorations. This allows educators to spend less time on basic reading comprehension and more time fostering critical thinking and debate. As these educational technologies evolve, the focus is shifting from rote memorization to active engagement. The ultimate goal is not to replace the educator, but to equip them with highly targeted, efficient tools that make the process of teaching both literature and language more intuitive and engaging for the digital generation.",
    questions: [
      { id: 89, text: "What is the central idea of the passage?", options: ["AI applications will soon replace teachers in the classroom", "Modern education relies entirely on static textbooks and rote memorization", "AI tools are transforming education by providing targeted assessments and assisting teachers with complex texts", "Literature can no longer be taught without the use of micro-analysis apps"], correct: 2, explanation: "The passage discusses how AI tools enhance teaching and assessment rather than replacing the human element." },
      { id: 90, text: "Pick the option that is the Antonym of the word 'dynamic' as used in the passage:", options: ["Energetic", "Static", "Unprecedented", "Intuitive"], correct: 1, explanation: "'Dynamic' means characterized by constant change or progress; 'static' means lacking in movement or change." },
      { id: 91, text: "According to the passage, what is a specific benefit of using micro-analysis apps for literature?", options: ["They eliminate the need for students to read the original texts", "They allow educators to focus more on critical thinking rather than basic comprehension", "They automatically grade student essays with unprecedented accuracy", "They force students to engage in rote memorization of character arcs"], correct: 1, explanation: "The text states these apps allow educators to 'spend less time on basic reading comprehension and more time fostering critical thinking'." },
      { id: 92, text: "Match the words in List I with their appropriate Synonyms in List II (Advent, Proficiency, Dense, Intuitive):", options: ["A-III, B-II, C-I, D-IV", "A-II, B-III, C-I, D-IV", "A-II, B-I, C-III, D-IV", "A-IV, B-III, C-II, D-I"], correct: 1, explanation: "Advent (Arrival), Proficiency (Competence), Dense (Complicated), Intuitive (Instinctive)." }
    ]
  },
  {
    id: "morning-assembly",
    title: "The Echoes of the Morning Assembly",
    description: "A philosophical reflection on the moral and communal value of school assemblies.",
    content: "The morning assembly in a school is far more than a routine administrative gathering; it is the heartbeat of the educational community. When the sun first crests the horizon, casting long shadows across the courtyard, hundreds of voices unite in a collective pause before the chaos of the day begins. A well-crafted assembly script does not merely announce upcoming events; it weaves a narrative of inspiration, often drawing upon the profound lessons hidden within classic literature. Whether reflecting on the quiet resilience of a protagonist facing adversity or the poetic beauty of an untrodden path, the spoken word has the power to set the moral compass for the entire day. The microphone becomes a conduit for empathy, transforming sleepy-eyed students into active participants in a shared cultural experience. It is a fleeting window where stories of triumph, ethical dilemmas, and historical courage are breathed into life. Ultimately, the true magic of the morning assembly lies in its ability to anchor the wandering mind, reminding every student and teacher that they are part of a larger, unfolding story, and that every new dawn is a blank page waiting to be written with purpose.",
    questions: [
      { id: 93, text: "Identify the Figure of Speech used in the expression: \"it is the heartbeat of the educational community\".", options: ["Simile", "Personification", "Metaphor", "Alliteration"], correct: 2, explanation: "The assembly is directly compared to a heartbeat without using 'like' or 'as'." },
      { id: 94, text: "According to the passage, what role does a well-crafted assembly script play?", options: ["It simply lists the timetable for the day's classes", "It weaves an inspiring narrative that sets the day's moral compass", "It ensures students are fully awake by forcing them to participate", "It evaluates the students' understanding of classic literature"], correct: 1, explanation: "The text says it 'weaves a narrative of inspiration' and 'sets the moral compass for the entire day'." },
      { id: 95, text: "The phrase \"every new dawn is a blank page\" implies that:", options: ["Students must write an essay every morning", "The future is unwritten and each day offers a fresh start to act with purpose", "The school lacks printed materials and books", "The morning assembly erases the memories of the previous day"], correct: 1, explanation: "It is a metaphorical way of saying each day is a new beginning with fresh opportunities." },
      { id: 96, text: "Choose the correct synonym for the word 'conduit' as used in the passage:", options: ["Barrier", "Channel", "Obstacle", "Microphone"], correct: 1, explanation: "Contextually, 'conduit' refers to a channel or medium through which something (empathy) is transmitted." }
    ]
  },
  {
    id: "cooking-rice",
    title: "Cooking Rice",
    description: "A first-hand account of kitchen experimentation and culinary respect.",
    content: "(1) \"Who doesn't know how to cook rice? Cooking rice hardly takes time,\" said my father. So, I challenged myself. I switched from news to You Tube and typed, \"How to cook rice?\" I took one and a half cups of rice. Since I didn't have access to a rice cooker, I put the rice in a big pot. Firstly, the rice has to be washed to get rid of dust and starch. I thought I won't be able to drain the rice and that it will fall out of the pot. I observed the chef as I swirled the rice around and used my dexterous hands to drain it, not once, not twice, but three times. I looked down at the sink and saw less than 50 grains that made their way out of the pot. Suffice to say, I was up to the mark.\n(2) The video stated that the key to perfect rice is equal amount of rice and water. I have heard that professionals don't need to measure everything; they just know what the right amount is. But as this was my first time in the kitchen, I decided to experiment by not measuring the water needed for boiling the rice. I wanted the rice to be firm when bitten, just like pasta. I don't enjoy the texture of mushy rice. It has to have that chutzpah; it has to resist my biting power just for a bit before disintegrating.\n(3) After what seemed like 10 minutes, all the water disappeared. I went in to give it a good stir. To my surprise, some of the rice got stuck to the pot. I tried to scrape it off but to no avail. At the same time, there was a burning smell coming from it. I quickly turned the stove off. \"What have you done to the kitchen?\" My mother shouted while coming towards the kitchen. I managed to ward her off.\n(4) Finally, when the time came to taste my creation, I was surprised! It wasn't bad at all. The rice had the desired consistency. Sure, a little more salt would've been better, but I just added that while eating. The experience was fairly rewarding and memorable. It taught me a new sense of respect for those who cook food on a regular basis at home or are engaged in gourmet creations professionally.",
    questions: [
      { id: 1, text: "Father's question to the narrator, about knowing how to cook rice, was intended to", options: ["criticize the narrator's lack of abilities", "make the process sound simple", "encourage the narrator to take up cooking", "showcase his own expertise in cooking rice"], correct: 1, explanation: "The comment 'Who doesn't know...' implies the task is extremely basic and simple." },
      { id: 2, text: "Pick the option in which the meaning of 'switch(ed)' is NOT the same as it is in the passage.", options: ["He switched on the radio to listen to the news", "Forget these diet supplements and switch to yoga", "Mom switched to reading fiction recently", "The company will switch the trucks to other routes"], correct: 0, explanation: "In the passage, 'switch' means changing activities. In A, it means turning on a device." },
      { id: 3, text: "Choose the correct sequence of the process based on the passage:", options: ["4, 2, 1, 3, 5", "1, 3, 2, 5, 4", "4, 1, 5, 3, 2", "5, 1, 2, 4, 3"], correct: 2, explanation: "Correct sequence: Utensil (4), Wash (1), Swirl (5), Drain (3), Repeat (2)." },
      { id: 4, text: "The narrator says he has dexterous hands. NOT BEING dexterous means being", options: ["uncomfortable", "clumsy", "unclear", "clueless"], correct: 1, explanation: "Dexterous means skillful with hands; clumsy is the direct opposite." },
      { id: 5, text: "Which represents the correct ratio of water to rice for 'perfect rice'?", options: ["Equal amounts", "Double water", "Half water", "Triple water"], correct: 0, explanation: "The passage explicitly states 'equal amount of rice and water'." },
      { id: 6, text: "Risking experimentation on his maiden attempt shows that the narrator was", options: ["conscientious", "nervous", "presumptuous", "courteous"], correct: 2, explanation: "Taking such a risk as a beginner is considered presumptuous (over-confident)." },
      { id: 7, text: "Pick the option showing the CORRECT use of 'chutzpah'.", options: ["Duty to dispense chutzpah to everyone", "The speaker's stage presence was thin, but she's got chutzpah", "Code crack proved me to be a chutzpah", "Took over family's chutzpah to save it"], correct: 1, explanation: "Chutzpah means extreme self-confidence or audacity." },
      { id: 8, text: "What correctly states what DID NOT happen after the writer checked the rice?", options: ["Turning the stove off", "Being taken aback at the condition", "Forgetting to scrape stuck rice", "Smelling the delicious aroma"], correct: 3, explanation: "There was a 'burning smell', so a 'delicious aroma' did not happen." },
      { id: 9, text: "Which correctly lists the final feelings of the writer?", options: ["Frustrating and Disillusioning", "Amusing and Exacting", "Satisfying and Enlightening", "Frustrating and Satisfying"], correct: 2, explanation: "He describes the experience as 'fairly rewarding' and gaining 'new sense of respect'." },
      { id: 10, text: "The narrator's creation was", options: ["almost perfect to taste", "way off from what he wanted", "overly seasoned", "quite distasteful"], correct: 0, explanation: "He says 'It wasn't bad at all' and had the 'desired consistency'." }
    ]
  },
  {
    id: "bengal-tiger",
    title: "The Bengal Tiger",
    description: "An informational survey of India's National Animal and its conservation status.",
    content: "(1) Royal Bengal Tiger is the largest, fiercest, and powerful member of the Big Cat family in India. Royal Bengal Tigers, also known as Indian Tiger and Bengal Tiger, constitute a large population of the tiger family in the world. It is the National animal of India and is found mostly in India, China, Bhutan, Bangladesh, and Burma.\n(2) The biological name of this Big Cat is Panthera Tigris, which comes under the Felidae family under Mammalia category.\n(3) No two Bengal tigers look alike! Every Bengal Tigers has a unique stripe pattern. Their colour ranges from yellow to light orange, with stripes from dark brown to black. Some of the Bengal Tigers are white in colour. The tail is orange in colour with black rings. Unlike the other White Tigers that have blue eyes, Bengal Tigers have yellow irises. They live for 10 to 15 years.\n(4) Being fierce in nature, Royal Bengal Tigers are not much friendly in nature and live a solitary life, except in winters when they can be seen in a group of 3 or 4. Bengal tigers are fast runners and good swimmers. Tigers attack their prey in a stealth mode. They are usually spotted in swamps, mangroves, and grasslands.\n(5) Royal Bengal Tigers have very sharp memory; they never forget the faces. Their memory is sharper than humans and other animals.\n(6) We can find the largest population of Royal Bengal Tigers in India. As per the latest tiger census report 2017, there are 3,786 Royal Bengal Tigers in India. India has more than 75% of the total tiger population in the world. Along with India, neighbouring countries to India holds a somewhat decent population of Royal Bengal Tiger in the world. The latest census of the tigers in India and neighbouring countries are shown in the table: Bangladesh (300-460), Bhutan (80-460), China (30-35), India (2500-3800), Nepal (150-250).\n(7) To know about the latest tiger population is always government's concern, as they want to save this majestic animal from getting extinct. India has lost 97% of its Royal Bengal Tigers population in the last century. The main reason is Hunting, Poaching, Urbanization, Habitat loss and Illegal Wildlife Trade. Poaching means to illegally trade the tiger made products like tiger skin, tiger made jewellery, etc. These skin and jewellery are sold for millions in the international market. Poaching has reduced the number of tigers to just 3,800 from 1,000,000 in the starting of the 20th century.",
    questions: [
      { id: 11, text: "The biological name of the Bengal Tiger is Panthera ___:", options: ["Tiger", "Tigress", "Tigris", "Tigers"], correct: 2, explanation: "Paragraph 2 explicitly states the name is Panthera Tigris." },
      { id: 12, text: "Identify the characteristic(s) of Bengal Tigers mentioned:", options: ["Fast runners", "Attack in stealth mode", "Good swimmers", "All of these"], correct: 3, explanation: "Paragraph 4 lists all three as traits of the Bengal Tiger." },
      { id: 13, text: "According to the passage, when was the latest survey of tigers conducted?", options: ["2010", "2017", "2019", "2020"], correct: 1, explanation: "Paragraph 6 mentions the 'latest tiger census report 2017'." },
      { id: 14, text: "The number of tigers in which country ranges from 80 to 460?", options: ["Bangladesh", "Bhutan", "China", "Nepal"], correct: 1, explanation: "The table in Paragraph 6 lists Bhutan as having 80-460 tigers." },
      { id: 15, text: "Approximately what percentage of the world's tigers are found in India?", options: ["50%", "60%", "More than 75%", "90%"], correct: 2, explanation: "Paragraph 6 says 'India has more than 75% of the total tiger population'." },
      { id: 16, text: "Which pair of countries has approximately the same maximum tiger population (460)?", options: ["Nepal and Bangladesh", "Bhutan and Bangladesh", "China and Nepal", "Bangladesh and India"], correct: 1, explanation: "According to the table, both Bangladesh and Bhutan share a maximum of 460." },
      { id: 17, text: "Pick the correct reason for the reduction in tiger population:", options: ["Poaching", "Epidemic", "Climatic changes", "Soil erosion"], correct: 0, explanation: "Paragraph 7 lists Hunting and Poaching as main reasons." },
      { id: 18, text: "Which word is similar in meaning to 'Solitary'?", options: ["Accompanied", "Lonesome", "Sociable", "Gregarious"], correct: 1, explanation: "Solitary means alone; lonesome is the closest synonym." }
    ]
  },
  {
    id: "einstein-agony",
    title: "Einstein's Agony",
    description: "The transformation of a scientist into a sage following the atomic bombings.",
    content: "(1) The sage of science, Einstein, was sitting in a depressive and pensive mood one evening. His eyes were brimming with tears. The pain was evident on his face. He peeped out of the window of his room. The sun had set a few minutes back. The sky was filled with a reddish glow. At this sunset, he felt that it was humanity that had sunk into devilish darkness and the reddish glow in the sky was the blood of humanity spilling all over the sky from earth. With tired steps, he walked back to his chair and settled down. It was the 9th of August, 1945. Three days back, he had felt the same agony as if someone had torn him apart. He was deeply hurt and depressed when he heard on the radio that America had dropped an atom bomb on the Japanese city, Hiroshima. Today, within three days, another bomb was dropped on another city, Nagasaki and lakhs of people had been killed.\n(2) He had heard that the blast released so much energy that it had paled all past destructions in comparison and death had played out a pitiable dance of destruction. The flames that broke out of the bomb were burning, melting and exploding buildings. Scared of the heat of the bomb, people had jumped into lakes and rivers, but the water was boiling and the people too were burnt and killed. The animals in the water were already boiled to death. Animals, trees, herbs, fragrant flowering plants were all turned into ashes. The atomic energy destruction had just not stopped there. It had entered the atmosphere there and had spread radiation that would affect people for generations to come and would also bring about destructive irreversible biological change in animals and plants.\n(3) As the news of the atomic attack reached Einstein, and he became aware of the glaring horror of the abuse of atomic energy, his distress and restlessness knew no bounds. He could not control himself and picked up his violin to turn his mind on to other things. While playing the violin, he tried to dissolve his distress in its sad notes, but couldn't. He was burning on the embers of destruction; his heart was filled with an ocean of agony and tears just continued streaming uncontrollably out of his eyes. Night had fallen. His daughter came up and asked him to eat something as he had not taken anything for the last four days. His voice was restrained and he said, \"I don't feel like eating.\"\n(4) He could not sleep that night. Lying down, he was thinking how he had drawn the attention of the then American President Roosevelt towards the destructive powers of an atomic bomb. He had thought that this would be used to scare Hitler and put an end to the barbarism that Hitler was up to. However, Roosevelt kept him in the dark and made false promises. Eventually, he had abused Einstein's equation of E=mc² that resulted in the destructive experiments. His actions had made science and scientists as murderers. Einstein kept on thinking for a long time. Eventually, he slipped into sleep. When he woke up at dawn, there was a new dawn in him too. The atomic threat had transformed his heart.\n(5) The next day, he decided to disassociate himself from the scientific policy of the government and all governmental institutions. He decided to open educational institutions for children, adolescents, and youth-institutions where along with science, spirituality will be compulsorily taught.\n(6) To inaugurate this institution, he had invited two great philosophers, Bertrand Russell and Albert Schweitzer. Ten other great scientists who had won Nobel Prizes in different fields were also invited. They all saw a different Einstein, not a great scientist but a sage in him. The institution was opened by garlanding a photo of Mahatma Gandhi. While garlanding the Mahatma, he became emotional and said with a lump in his throat, 'I bow down to the great man who fought for the Independence of his country through non-violence. He could do so because he was a truthful man and a true spiritualist'.\n(7) Those who teach science should be taught spirituality too. Without harmony between science and spirituality, the destruction would continue unabated. A few years after this institution was built, a Japanese delegation came to meet him. Einstein broke down in the meeting and said, 'You can give me any punishment and I will accept it. Anyway, I have decided to lead my life in penitence'. The Japanese were moved by his sincerity and forgot their grief.",
    questions: [
      { id: 19, text: "Which musical instrument did Einstein play when he was in grief?", options: ["Harmonium", "Guitar", "Violin", "Flute"], correct: 2, explanation: "Paragraph 3 mentions he picked up his 'violin' to divert his mind." },
      { id: 20, text: "How did Einstein learn about the Hiroshima bombing?", options: ["Television", "Newspaper", "Radio", "Telephonic message"], correct: 2, explanation: "Paragraph 1 says he heard on the 'radio' about the bomb dropped on Hiroshima." },
      { id: 21, text: "What did Einstein say to the Japanese delegation?", options: ["You can give me any punishment and I will accept it", "I am not at fault", "What could I do?", "The President didn't agree"], correct: 0, explanation: "Paragraph 7 records his direct quote expressing complete penitence." },
      { id: 22, text: "What did Einstein do to show his displeasure over the attack?", options: ["Open a science lab", "Establish an Educational Institution", "Disassociate from Government Institutions", "Invite philosophers"], correct: 2, explanation: "Paragraph 5 says he decided to 'disassociate himself from the scientific policy of the government'." },
      { id: 23, text: "To what was Einstein's depressive mood compared?", options: ["Sunrise", "Sunset", "Devilish darkness", "Tired steps"], correct: 1, explanation: "The passage opens with him watching the 'sunset', linking his mood to that time." },
      { id: 24, text: "What made Einstein restless and sleepless?", options: ["Hit on America", "Hit on Nagasaki", "Hit on Hiroshima", "Both Nagasaki and Hiroshima"], correct: 3, explanation: "Both bombings (Hiroshima and Nagasaki) caused him extreme agony." },
      { id: 25, text: "Identify the event that led him to play an instrument to divert his mind:", options: ["Getting news of the attack", "Inventing sad notes", "Hitler's barbarism", "False promises"], correct: 0, explanation: "Paragraph 3 says 'As the news of the atomic attack reached Einstein... he picked up his violin'." },
      { id: 26, text: "According to Einstein, what turned scientists into murderers?", options: ["Wrong use of E=mc²", "False promises", "The bombings", "None of these"], correct: 0, explanation: "Paragraph 4 explains Roosevelt abused his equation, which made scientists as murderers." },
      { id: 27, text: "Which philosopher did Einstein invite to his institution?", options: ["Bertrand Russell", "Albert Schweitzer", "Both philosophers", "Neither philosopher"], correct: 2, explanation: "Paragraph 6 mentions both Russell and Schweitzer were invited." },
      { id: 28, text: "Why should science teachers also be taught spirituality?", options: ["Make science easier", "Help make weapons", "Give more power", "Enable science for human welfare"], correct: 3, explanation: "The text suggests spirituality ensures science is used for the welfare of others." }
    ]
  },
  {
    id: "stoicism",
    title: "Stoicism & Time Management",
    description: "Master the logic of time as a non-renewable resource.",
    content: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    questions: [
      { id: 29, text: "Select the activity that contributes to happiness from the options given below:", options: ["Watching random TV shows", "Arguing on social media", "Reading thought-provoking books", "Browsing the internet for news"], correct: 2, explanation: "The passage lists 'reading thought-provoking books' as a meaningful activity." },
      { id: 30, text: "Select the central idea of the passage from the options given below:", options: ["Consuming more information leads to happiness.", "Responding to global issues is essential.", "Happiness comes from following current events.", "Time is a valuable resource we should use it wisely."], correct: 3, explanation: "The core message is wise time management and focusing on factors within our control." },
      { id: 31, text: "Choose the best option to complete the sentence: Practicing indifference to uncontrollable things helps to achieve", options: ["Better focus on global events", "Fulfilling and lasting happiness", "Improved emotional reactivity", "A deeper knowledge of issues"], correct: 1, explanation: "Indifference to external, uncontrollable factors is described as the key to happiness." },
      { id: 32, text: "Choose an example of wasting time based on the passage from the options given below:", options: ["Scrolling social media profiles", "Walking in nature", "Spending time with family", "Writing and reflecting"], correct: 0, explanation: "Stalking social media profiles is explicitly labeled as a 'trivial pursuit' that wastes time." }
    ]
  },
  {
    id: "arjun",
    title: "Arjun the Artist",
    description: "A narrative on mentorship and artistic perseverance in Varanasi.",
    content: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    questions: [
      { id: 33, text: "Determine the primary theme illustrated in the passage:", options: ["The preventable hardships for those who choose artistic paths", "Conflicts between urban modernity and ancient traditions", "The fleeting beauty of monsoon afternoons encouraging passion", "The transformative influence of mentorship and passion"], correct: 3, explanation: "The focus is on how Raghav's guidance helped Arjun overcome adversity and find his voice." },
      { id: 34, text: "Evaluate the impact of Arjun's artwork as described in the passage:", options: ["His art remained confined within narrow lanes", "His work was mostly criticised and led to isolation", "His creations resonated deeply, uniting diverse cultures", "His art was solely a personal hobby"], correct: 2, explanation: "The passage notes his creations graced galleries beyond Varanasi, uniting cultures." },
      { id: 35, text: "Deduce the message the author conveys about overcoming obstacles:", options: ["Struggles are insurmountable barriers", "Every challenge offers an opportunity to grow", "Only those with privileged backgrounds can succeed", "Obstacles invariably lead to failure"], correct: 1, explanation: "Every challenge is described as a 'brushstroke in the masterpiece of his life'." },
      { id: 36, text: "Interpret the change in Arjun's outlook on life throughout the passage:", options: ["He viewed every hardship as an essential brushstroke", "He became indifferent to challenges", "He rejected the essential idea of change", "He focused solely on attaining commercial success"], correct: 0, explanation: "Arjun learned to see struggles as necessary parts of his journey." }
    ]
  },
  {
    id: "handicrafts",
    title: "Indian Handicrafts",
    description: "A survey of India's diverse and rich artistic heritage.",
    content: "India is renowned for its rich and diverse heritage of handicrafts, which reflect the country's deep cultural roots and artistic traditions. Each region in India has its own distinct craft, passed down through generations of artisans. These handicrafts showcase the intricate artistry, creativity, and skills of Indian craftsmen. In Kashmir, the famous Pashmina shawls and carpets are known for their delicate embroidery and luxurious feel. Rajasthan is a treasure trove of vibrant handicrafts, including its famous tie-and-dye fabrics, exquisite jewellery, and intricate meenakari work. Andhra Pradesh is recognised for its Bidriware, a form of metalwork, and the beautiful Pochampally sarees, which are known for their traditional ikat patterns. In Tamil Nadu, the intricate bronze sculptures and the traditional Kanjeevaram sarees are highly prized. Mysore is famous for its silk weaving and sandalwood products, while Kerala is known for its elegant ivory carvings and rosewood furniture. The terracotta figurines of Bankura, the delicate Chikan work from Lucknow, and the rich brocade and silk sarees from Banaras are a testament to India's diversity in craftsmanship. These handicrafts not only contribute to India's cultural heritage but also provide employment to millions of artisans across the country. Over the years, these traditional crafts have evolved while preserving their authenticity, creating a legacy of artistic excellence. Indian handicrafts are a testament to the timeless creativity and skill of the artisans who continue to keep these traditions alive for generations to come.",
    questions: [
      { id: 37, text: "Which of the following is NOT mentioned as a famous handicraft from Rajasthan?", options: ["Tie-and-dye fabrics", "Pashmina shawls", "Stone studded Jewellery", "Meenakari work"], correct: 1, explanation: "Pashmina shawls are specifically attributed to Kashmir in the passage." },
      { id: 38, text: "The traditional ikat patterns are found in ___ sarees from Andhra Pradesh.", options: ["Mysore", "Kanjeevaram", "Pochampally", "Banaras"], correct: 2, explanation: "The passage explicitly links Pochampally sarees with ikat patterns." },
      { id: 39, text: "According to the passage, what has helped preserve Indian handicrafts over the years?", options: ["Government support in all its fervor", "Modern technologies with the help of AI", "International demand for the renowned handicrafts", "Generational knowledge passed down by artisans"], correct: 3, explanation: "The text notes crafts are 'passed down through generations of artisans'." },
      { id: 40, text: "What does the passage primarily highlight?", options: ["The economic impact of our handicrafts", "The diversity and richness of Indian handicrafts", "The use of handicrafts in the daily lives", "The role of Indian handicrafts in modern design"], correct: 1, explanation: "The overall focus is the variety and cultural depth across different regions." }
    ]
  },
  {
    id: "tree-boy",
    title: "The Tree and the Little Boy",
    description: "A poignant fable about nature's selflessness and human greed.",
    content: "There is a lovely story of a tree and a little boy who used to play in its shade. They had become friends. One day, the boy sat leaning against the trunk of the tree, crying. He was hungry. \"Eat my fruit\" said the kind tree bending down one of its branches. The boy ate the fruit and was happy. The boy grew up. One day, he sat under the tree with an anxious look on his face. \"What is the matter?\" asked the tree. \"I am going to marry and I want a house to live in,\" said the young man. \"Cut down my branches and build your house,\" said the tree. The young man built a house with the branches of the tree. The young man became a sailor. One day, he sat under the tree with a worried look. \"What is the matter?\" asked the tree. \"My captain is a cruel fellow. I want a ship of my own,\" said the sailor. \"Cut down my trunk and build a ship.\" The sailor lost his ship and returned home as a helpless old man. On a cold winter's day, he stood where the tree once was, leaning on his stick and trembling with cold. \"Make a fire of me, and warm yourself\" said the stump of the tree. The stump of the unselfish tree burnt in the fire, softly humming a tune.",
    questions: [
      { id: 41, text: "Match the boy's states with their reasons correctly (Hungry, House, Ship, Fire):", options: ["A-IV, B-III, C-II, D-I", "A-III, B-II, C-I, D-IV", "A-I, B-III, C-II, D-IV", "A-II, B-I, C-IV, D-III"], correct: 1, explanation: "Based on the text: Crying (Hungry), Anxious (House), Worried (Ship), Stump (Fire)." },
      { id: 42, text: "The two protagonists of the story are:", options: ["Both innocent and naive", "One is intelligent and the other a fool", "Both cunning and selfish", "One is demanding/greedy, the other generous/supportive"], correct: 3, explanation: "The boy constantly demands, while the tree gives selflessly until the end." },
      { id: 43, text: "How were the tree and the little boy related to each other?", options: ["Close contenders in survival", "Close friends due to long association", "Colleagues working together", "Competitors in needs"], correct: 1, explanation: "The passage explicitly states 'They had become friends'." },
      { id: 44, text: "The story highlights a typical selfish human nature. Identify it:", options: ["Compassion and benevolence", "Conservation of forests", "Mindless greed for wealth", "Heartless and foolish exploitation of nature"], correct: 3, explanation: "The boy exploits the tree's resources without regard for its survival." },
      { id: 45, text: "The phrase 'The stump... softly humming a tune' means:", options: ["Trees sing when burnt", "The tree felt no pain in serving its friend", "The tree tried to forget its pain", "The tree was a fool"], correct: 1, explanation: "Humming symbolizes the tree's peace and contentment in its final act of selflessness." },
      { id: 46, text: "How would you define the relationship that the story illustrates?", options: ["Mutual symbiotic relationship", "Relationship based on deceit", "One sided relationship of love and support", "Disguised enmity"], correct: 2, explanation: "The tree provides all the care and support, while the boy only receives." }
    ]
  },
  {
    id: "shyness",
    title: "The Art of Silence and Shyness",
    description: "An introspective look at the benefits of being reserved.",
    content: "I must say that, beyond occasionally exposing me to laughter, my constitutional shyness has been of no great disadvantage to me. In fact, I can see that, on the contrary, it has been all to my advantage. My hesitancy in speech, which was once an annoyance, is now a pleasure. Its greatest pleasure has been that it has taught me the economy of words. I have naturally formed the habit of restraining my thoughts. And I can now, give myself the certificate that a thoughtless word hardly ever escapes of my tongue or pen. I do not recollect ever having had to regret anything in my speech or writing. I have thus been spared many a mishap and waste of time. Experience has taught me that silence is part of the spiritual discipline of a votary of truth. Proneness to exaggerate, to suppress or modify the truth, wittingly or unwittingly, is a natural weakness of man and silence is necessary in order to surmount it. A man of few words will rarely be thoughtless in his speech; he will measure every word.",
    questions: [
      { id: 47, text: "The expression 'my constitutional shyness' in the given passage means:", options: ["Shyness in Article 1", "Shyness in the Preamble", "Innate and natural shyness", "Pretended shyness"], correct: 2, explanation: "'Constitutional' here refers to one's natural character or physical makeup." },
      { id: 48, text: "The author as a matured individual believes that his shy nature brought him:", options: ["Great advantage in life", "Unmatched joy and enchantment", "Disadvantage in rituals", "Media coverage"], correct: 0, explanation: "The author explicitly states 'it has been all to my advantage'." },
      { id: 49, text: "The author due to his shy nature:", options: ["Aggressively attacked crowds", "Worked hard to hide his stammer", "Naturally formed the habit of restraining thoughts", "Became an ascetic"], correct: 2, explanation: "The text says he 'naturally formed the habit of restraining my thoughts'." },
      { id: 50, text: "The author claims that:", options: ["He has rarely spoken a thoughtless word", "He always speaks without thinking", "He has become prone to nightmares", "He became a great cricket player"], correct: 0, explanation: "He states that a 'thoughtless word hardly ever escapes' his tongue or pen." },
      { id: 51, text: "Experience has taught the author that:", options: ["Silence is better than laughter", "Silence is part of the spiritual discipline", "Silence is to be avoided", "Silence can never be attained"], correct: 1, explanation: "Paragraph 3 explicitly mentions silence as 'part of the spiritual discipline'." },
      { id: 52, text: "Match the phrases correctly (Few words, Hesitancy, Exaggerate, Shyness):", options: ["A-IV, B-III, C-II, D-I", "A-II, B-I, C-IV, D-III", "A-III, B-IV, C-I, D-II", "A-I, B-II, C-III, D-IV"], correct: 3, explanation: "Matching the author's specific claims to their descriptors." }
    ]
  },
  {
    id: "spirit",
    title: "The Sickness of Spirit",
    description: "A philosophical exploration of modern life's spiritual void.",
    content: "Unhappiness and discontent spring not only from poverty. Man is a strange creature, fundamentally different from other animals. He has far horizons, invincible hopes, creative energies, spiritual powers. If they are left undeveloped and unsatisfied, he may have all the comforts which wealth can give, but will still feel that life is not worthwhile. The great humanist writers, Shaw and Wells, Arnold Bennett and Galsworthy, expose the foibles, inconsistencies and weaknesses of modern life, but they ignore the deeper currents. The outward chaos and confusion of our life reflect the confusion of our hearts and minds. Constitutions, says Plato, \"are but the reflections in the outside world of the values which prevail in men's minds.\" There must be a change in the ideals we cherish. What is missing in our age is the soul; there is nothing wrong with the body. We suffer from sickness of spirit. We must discover our roots in the eternal and regain faith in the transcendent truth which will order life.",
    questions: [
      { id: 53, text: "The author implies that if eternal values are not regained, then:", options: ["The world will be flooded", "The sky will fall", "Civilization and society will be ruined", "The earth will fall into a black hole"], correct: 2, explanation: "The warning 'it will fall' refers to the structure of society and civilization." },
      { id: 54, text: "According to the author, humanist writers have ignored:", options: ["The spiritual aspect of life", "Religion and rituals", "Cultural progress", "Material welfare"], correct: 0, explanation: "They expose foibles but 'ignore the deeper currents' of spiritual power." },
      { id: 55, text: "How is man fundamentally different from other animals?", options: ["Power of speech", "Hopes, creative energies, and spiritual powers", "Money and achievement", "Physical prowess"], correct: 1, explanation: "These unique human capacities are listed as differentiators in the text." },
      { id: 56, text: "Unhappiness and discontent spring from:", options: ["Poverty alone", "Ignorance", "Poverty along with moral degradation", "Mental turmoil"], correct: 2, explanation: "The text links unhappiness to both lack of resources and undeveloped spirit." },
      { id: 57, text: "Despite wealth, man will feel incomplete if:", options: ["Prevented from mingling", "Creative energies and spiritual powers are unsatisfied", "Deserted by friends", "Failed to enroll in a university"], correct: 1, explanation: "The passage states that without these, life won't feel 'worthwhile'." }
    ]
  },
  {
    id: "team-building",
    title: "Team Building Exercises",
    description: "The historical origins and modern evolution of collaborative training.",
    content: "The phrase \"team building exercises\" may be new but the reality is not. Its origin goes back at least as far as the medieval tournaments. These provided knights with military training and the opportunity to make reputations. Individual jousting and hand-to hand combat came first. Then there were team events. In these, a group of knights fought against another group. These teams often stayed together and fought side-by-side in real battle. Team games today, such as football, baseball, cricket and hockey, are the distant descendants of such medieval tournaments. A crucial event in the movement from being a group to becoming a team can be the team building exercise. This can be based upon either (1) a substitute team task (for example, a business case study or a few days of outdoor activities) or (2) a real task (for example, going away for a weekend to plan company strategy). There are pros and cons to both approaches. The advantage of a substitute task type of event is that success or failure is not of paramount importance. Nor are there any technological or professional challenges to meet, so that people can concentrate on the essential issue of learning as to how to work more effectively together as a team.",
    questions: [
      { id: 58, text: "Choose the correct meaning of the word 'Crucial' from the options given:", options: ["decisive", "essential", "insignificant", "immature"], correct: 0, explanation: "In the context of changing a group to a team, 'crucial' means decisive or highly significant." },
      { id: 59, text: "Choose the option that is the Antonym of the word 'Descendent':", options: ["grandchildren", "heir", "ancestor", "children"], correct: 2, explanation: "Descendent refers to someone proceeding from an ancestor; ancestor is the correct opposite." },
      { id: 60, text: "Match the Task with appropriate Example (Substitute, Knights training, Team events, Real task):", options: ["A-I, B-III, C-IV, D-II", "A-I, B-IV, C-III, D-II", "A-I, B-II, C-III, D-IV", "A-IV, B-III, C-II, D-I"], correct: 0, explanation: "Matching examples from the text: Substitute (Outdoor activities), Knights (Jousting), Team (Real battle), Real task (Strategy planning)." },
      { id: 61, text: "According to the passage, the reality of 'team-building exercise' is that, it is:", options: ["advanced", "new", "ancient", "modern"], correct: 2, explanation: "The text notes the reality is not new and dates back to medieval tournaments, implying it is an ancient concept." },
      { id: 62, text: "According to the passage, a group of knights fought against another group in:", options: ["cricket", "hockey", "baseball", "real battle"], correct: 3, explanation: "The passage states knights often stayed together and fought side-by-side in 'real battle'." }
    ]
  },
  {
    id: "detachment",
    title: "Detachment - A Key to Simple Living",
    description: "A philosophical exploration of letting go to achieve mental clarity.",
    content: "When things aren't going well, we tend to think we are lacking in something. But if we want to change our current situation, we should first part with something, before we look to acquire something else. This is a fundamental tenet of simple living. Discard your attachments. Let go of your assumptions. Reduce your possessions. Living simply is also about discarding your physical and mental burdens. It's amazing how refreshed we can feel after a good cry. Crying clears out whatever weight you were carrying in your heart. You feel energized to try again. I have always felt that the Buddhist concept of the 'enlightened mind' - the Japanese characters for which depict a \"clean mind\" refers to this 'refreshment' of the spirit. The act of discarding, of detaching from mental and physical burdens, from the baggage that weighs us down, is extremely difficult. Sometimes it can be accompanied by real pain, as when we part with someone who is dear to us. But if you want to improve the way things are, if you want to live with a light heart, you must start by discarding. The moment you detach, a new abundance will flow into your life.",
    questions: [
      { id: 63, text: "What is the fundamental tenet of 'simple living?'", options: ["Realising that we are lacking in something", "Feeling energised everyday", "The act of letting go", "The act of attaining enlightenment"], correct: 2, explanation: "The passage defines simple living as starting by 'discarding' or letting go." },
      { id: 64, text: "Which among the following give a similar context to the word 'part' as used in the passage?", options: ["She is an essential part of the school", "Difficulties are part and parcel of life", "I am going to take part in the competition", "We must part our ways from the evil"], correct: 3, explanation: "In the passage, 'part with something' means to separate or leave; option D matches this sense of separation." },
      { id: 65, text: "Which among the following provide similar meaning to the word 'discard'?", options: ["Detach and Let go", "Detach and Derived", "Derived and Disadvantage", "Disadvantage only"], correct: 0, explanation: "'Discard' means to get rid of, which is synonymous with detaching or letting go." },
      { id: 66, text: "What can be the appropriate title for the passage?", options: ["Detachment - A key to simple living", "Enlightenment", "Burdens are a part of life", "Japanese way to improve"], correct: 0, explanation: "The central theme is how detachment leads to the simple living described." },
      { id: 67, text: "According to the passage, what are the qualities of 'a good cry'?", options: ["Makes you feel light and energized / way of detaching", "Way of detaching / sign of weakness", "Sign of weakness / waste of time", "Makes you feel light / an illusion"], correct: 0, explanation: "The text says crying 'clears out whatever weight' and makes you feel 'energized'." }
    ]
  },
  {
    id: "horse-autobiography",
    title: "The Autobiography of a Horse",
    description: "A first-person narrative reflecting on a life of service and contentment.",
    content: "The Autobiography of a Horse. Now that I am getting old and stiff in the joints, I like to meditate, while grazing in the pasture, on my foal days. I think that was the happiest part of my life. I had no work to do, and could run about after my mother, who was a fine white Arab mare, without any restraint. Most of my time was spent in the fields, where I nibbled the tender grass and capered about, while my mother was steadily grazing. But that could not last for ever. When I was old enough, the trainer came and, to my great indignation, fastened a long rope to my head, and then began driving me round and round in circles with his long whip. I was frightened and angry, but he went on till I was so tired that I could scarcely stand. However, my mother told me that it was no use of my resisting, and to make a long story short, I was at last thoroughly trained as a riding-horse. I was bought by a young officer as a polo pony, and I soon got to love the game. He was a kind master, and a good rider; and in the end I would do anything for him, and was quite proud when his side won the game. But he got into debt, and had to sell me; and I was bought by a gentleman and a lady who kept a buggy, and was trained to run in shafts. I hated this work; and I am afraid I gave a lot of trouble, by going as slowly as I could. When my driver gave me the whip, I started shying at any object on the road. And then I found that jibbing was a very good trick, and whenever I was whipped, I simply backed. My owner got disgusted at last, and sold me to a gentleman who was fond of hunting. I was delighted to get back to saddle-work; and thoroughly enjoyed my gallops with the hounds after the jackal in open country. But an accident put a stop to that jolly life; for one day my master pressed me to a big jump which I knew I could not do. I did my best but fell short, and fell. My master was thrown away and he broke his arm, and I badly sprained one of my legs. I was in a hospital for weeks, and then was sold to a gentleman who wanted a quiet riding-horse. He was a kind master, and used me well; and I was in his service for a good number of years. Now that I am old, he gives me very little work, and I spend most of my time grazing in the pasture, and leading a quiet, contented life.",
    questions: [
      { id: 68, text: "The word 'nibbled' as used in the passage means to:", options: ["take huge bites of food", "take small bites of food", "gulp away quickly", "keep eating for a long duration"], correct: 1, explanation: "Nibbling refers to eating in small, frequent bites." },
      { id: 69, text: "Arrange the steps taken by the trainer in the correct order (Circles, Rope, Tired, Anger, No resist):", options: ["A, B, C, D, E", "D, B, A, E, C", "B, C, D, A, E", "B, A, D, C, E"], correct: 3, explanation: "The sequence: Fastened rope (B), Move in circles (A), Angry/frightened (D), Tired (C), Mother's advice (E)." },
      { id: 70, text: "Find out a word from the passage which means 'very happy':", options: ["steadily", "tired", "disgusted", "delighted"], correct: 3, explanation: "Delighted is the only word in the list that conveys intense happiness." },
      { id: 71, text: "Being old, the horse:", options: ["hunts with hounds", "enjoys being polo horse", "likes to meditate and graze", "is unsatisfied with life"], correct: 2, explanation: "The old horse states he likes to 'meditate while grazing' and leads a 'contented life'." },
      { id: 72, text: "Which trick was NOT a part of the horse's coping mechanism when he was whipped?", options: ["Jibbing", "Galloping", "Shying", "Backing up"], correct: 1, explanation: "The horse used jibbing, shying, and backing up; galloping was part of the work he enjoyed, not a trick to avoid the whip." }
    ]
  },
  {
    id: "ai-education",
    title: "AI in Modern Education",
    description: "How AI is revolutionizing personalized learning and interactive teaching.",
    content: "In recent years, the integration of Artificial Intelligence (AI) in education has revolutionized how students learn and teachers instruct. Gone are the days of one-size-fits-all teaching methods. Today, AI-powered applications can analyze a student's learning pace, identify their weak areas, and generate customized tests to bridge knowledge gaps. For instance, a smart app can swiftly evaluate a student's grasp of complex grammar rules or literary devices, providing instant feedback that would otherwise take a teacher hours to compile. Furthermore, these smart applications assist educators in creating interactive lesson plans and managing administrative tasks, allowing them to focus more on actual teaching and mentorship. However, the rise of AI in classrooms is not without its critics. Skeptics argue that an over-reliance on technology might impede the development of critical thinking and diminish the vital human connection between teachers and students. They advocate for a balanced approach where AI serves as a supplementary tool rather than a replacement for the human intellect. Despite these concerns, it is undeniable that educational technology has made learning more accessible. Students in remote areas can now access high-quality educational resources, leveling the playing field. Ultimately, the future of education lies in the harmonious blend of innovative technology and empathetic human guidance.",
    questions: [
      { id: 73, text: "What is the central idea of the passage?", options: ["AI will completely replace human teachers", "Educational tech made traditional methods obsolete", "AI benefits education but needs a balanced, human-guided approach", "Remote students are the only true beneficiaries"], correct: 2, explanation: "The text emphasizes a 'harmonious blend' of tech and human guidance." },
      { id: 74, text: "Choose the option that is the Antonym of the word 'impede' as used in the passage:", options: ["Hinder", "Facilitate", "Obstruct", "Analyze"], correct: 1, explanation: "To impede means to delay/prevent; facilitate means to make an action easier." },
      { id: 75, text: "According to the passage, what is a primary concern raised by skeptics regarding AI in education?", options: ["Makes education too expensive", "Takes too many hours for feedback", "Might diminish critical thinking and human connection", "Focuses too much on grammar rules"], correct: 2, explanation: "The passage explicitly mentions 'impede the development of critical thinking and diminish the vital human connection'." },
      { id: 76, text: "Match the words with meanings (Revolutionized, Skeptic, Supplementary, Accessible):", options: ["A-III, B-I, C-II, D-IV", "A-IV, B-II, C-I, D-III", "A-I, B-III, C-IV, D-II", "A-III, B-IV, C-II, D-I"], correct: 0, explanation: "Revolutionized (Changed fundamentally), Skeptic (Doubts opinions), Supplementary (Addition), Accessible (Able to be reached)." }
    ]
  },
  {
    id: "elara-quill",
    title: "Elara and the Golden Quill",
    description: "A magical tale about the transformative power of language.",
    content: "Elara lived in a quaint village nestled between rolling hills. While other children played in the meadows, Elara spent her afternoons in the dusty attic of the local library, poring over ancient manuscripts. She was fascinated by the evolution of language and the strict rules of grammar that governed it. One rainy Tuesday, she stumbled upon a peculiar book bound in faded blue leather. It had no title, but the pages were filled with cryptic puzzles about active and passive voices, conditionals, and determiners. As she solved the first puzzle, a small, intricate wooden box hidden behind the bookshelf suddenly clicked open. Inside lay a golden quill. When Elara touched the quill, it felt warm, as if pulsating with a life of its own. She dipped it in an inkwell and wrote a simple sentence on a piece of parchment. To her amazement, the words lifted off the page, glowing with a soft, golden light, before transforming into a flurry of tiny, animated butterflies. Elara realized that this was no ordinary tool; it was an artifact that brought language to life. For years, she kept the quill a secret, using it to master the nuances of writing and eventually becoming the most celebrated author in the kingdom, proving that true magic lies in the power of words.",
    questions: [
      { id: 77, text: "Arrange the sequence of events as they occurred in Elara's life (Quill, Author, Manuscripts, Butterflies, Puzzles):", options: ["C, E, A, D, B", "C, A, E, B, D", "E, C, A, D, B", "A, E, C, D, B"], correct: 0, explanation: "Sequence: Library manuscripts (C), Solved puzzles (E), Discovered quill (A), Words to butterflies (D), Celebrated author (B)." },
      { id: 78, text: "Choose the correct meaning of the word 'cryptic' as used in the passage:", options: ["Obvious and straightforward", "Mysterious and difficult to understand", "Colorful and vibrant", "Extremely dangerous"], correct: 1, explanation: "Cryptic puzzles are those that are hidden in meaning or mysterious." },
      { id: 79, text: "Pick the option that correctly states what DID NOT happen when Elara used the quill:", options: ["Words lifted off the parchment", "Words glowed with golden light", "Words whispered grammar rules to her", "Words transformed into butterflies"], correct: 2, explanation: "The passage mentions glow and butterflies, but not whispering rules." },
      { id: 80, text: "What was the ultimate consequence of Elara keeping the quill a secret and using it?", options: ["Banished from village", "Lost ability to understand grammar", "Mastered writing and became a celebrated author", "Trapped in the attic forever"], correct: 2, explanation: "She used the artifact to 'master the nuances of writing and eventually becoming the most celebrated author'." }
    ]
  },
  {
    id: "canvas-memory",
    title: "The Canvas of Memory",
    description: "A poetic look at the art of selective memory and forgetting.",
    content: "Memory is a peculiar artist. It paints our past not with the precise strokes of a realist, but with the broad, emotional sweeps of an impressionist. When we look back at our lives, we rarely recall days in their chronological entirety. Instead, we remember fragments: the sharp scent of pine on a winter morning, the bitter sting of a spoken word, or the sudden, blinding warmth of an unexpected kindness. Time, the relentless sculptor, chips away at the mundane, leaving only the statues of our most profound experiences. Yet, this selective preservation is a necessary mercy. If we were forced to carry the weight of every single moment, the human mind would buckle under the sheer volume of existence. Forgetting is just as crucial as remembering. It is the blank space on the canvas that allows the vibrant colors of our core memories to stand out. Therefore, we should not lament the fading of ordinary days. Instead, we must cherish the masterpieces that remain in the gallery of our minds, understanding that the art of living involves both holding on and gracefully letting go.",
    questions: [
      { id: 81, text: "Identify the Figure of Speech used in 'Time, the relentless sculptor':", options: ["Simile", "Metaphor", "Oxymoron", "Alliteration"], correct: 1, explanation: "Time is directly compared to a sculptor without using 'like' or 'as'." },
      { id: 82, text: "According to the author, why is forgetting considered a 'necessary mercy'?", options: ["Remembrance makes us too intelligent", "Ordinary days are too painful", "Carrying every moment would overwhelm the mind", "Allows us to alter facts"], correct: 2, explanation: "The author states the mind would 'buckle under the sheer volume of existence' if every moment was kept." },
      { id: 83, text: "The author of the passage compares human memory to:", options: ["A realist painter", "An impressionist artist", "A relentless sculptor", "A blank canvas"], correct: 1, explanation: "The text says memory 'paints our past... with broad emotional sweeps of an impressionist'." },
      { id: 84, text: "Choose the correct synonym for the word 'lament' from the options given:", options: ["Celebrate", "Mourn", "Anticipate", "Ignore"], correct: 1, explanation: "Lamenting is expressing grief or sorrow; mourning is the correct synonym." }
    ]
  }
]

export default function RCQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionRef = useRef<HTMLDivElement>(null)
  const [selectedPassageId, setSelectedPassageId] = useState<string | null>(null)
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const selectedPassage = RC_PASSAGES.find(p => p.id === selectedPassageId)
  const questions = selectedPassage?.questions || []

  const scrollToTarget = useCallback(() => {
    // Starting from Q2, scroll to the top of the question card
    // Q1 scrolls to the top of the passage/quizRef
    const target = (currentStep > 0 && questionRef.current) ? questionRef.current : quizRef.current;
    if (target) {
      const offset = 100
      const bodyRect = document.body.getBoundingClientRect().top
      const elementRect = target.getBoundingClientRect().top
      const elementPosition = elementRect - bodyRect
      const offsetPosition = elementPosition - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })
    }
  }, [currentStep])

  useEffect(() => {
    if (selectedPassageId && !isFinished) {
      const timer = setTimeout(scrollToTarget, 100)
      return () => clearTimeout(timer)
    }
  }, [currentStep, selectedPassageId, isFinished, scrollToTarget])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Passage Complete!", description: "Check your performance analysis." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedPassageId && !isFinished) {
        const qId = questions[currentStep]?.id
        if (answers[qId] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, selectedPassageId, nextQuestion])

  const handleAnswer = (val: number) => {
    if (!selectedPassageId) return
    const qId = questions[currentStep].id
    setAnswers({ ...answers, [qId]: val })
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      if (ans === q.correct) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (!selectedPassageId) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 2: RC Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Reading Comprehension Mastery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a passage to begin your focused practice. Each set follows official CUET marking protocols.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {RC_PASSAGES.map((p) => (
              <Card 
                key={p.id} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedPassageId(p.id)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">{p.questions.length} Qs</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{p.title}</CardTitle>
                  <CardDescription className="line-clamp-2 mt-2">{p.description}</CardDescription>
                </CardHeader>
                <CardContent className="px-8 pb-8 pt-0 mt-auto">
                  <Button variant="outline" className="w-full rounded-xl border-primary/20 hover:bg-primary hover:text-white font-bold group">
                    Begin Set <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  if (isFinished) {
    const { correct, wrong, total } = calculateScore()
    return (
      <div className="min-h-screen bg-background py-12 px-4">
        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[3rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Trophy className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2">{selectedPassage.title} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct (+5)</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Errors (-1)</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8">
              <div className="text-sm opacity-70">Passage Total</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" className="flex-1 rounded-xl h-12 font-bold" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake Passage
              </Button>
              <Button variant="outline" size="lg" className="flex-1 rounded-xl h-12" onClick={() => {
                setSelectedPassageId(null)
                setIsFinished(false)
                setAnswers({})
                setCurrentStep(0)
              }}>
                Pick Another Passage
              </Button>
            </div>
          </Card>

          <section className="space-y-6">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-foreground">
              <Info className="w-5 h-5 text-primary" />
              Strategic Review
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[2rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-8 space-y-4">
                    <p className="font-bold text-lg text-foreground">{q.text}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-4 rounded-xl flex items-center gap-2 border", isCorrect ? "bg-green-100/30 border-green-200" : "bg-red-100/30 border-red-200")}>
                        {isCorrect ? <CheckCircle2 className="w-5 h-5 text-green-600" /> : <XCircle className="w-5 h-5 text-red-600" />}
                        <span><strong className="text-foreground">Your selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-4 rounded-xl flex items-center gap-2 border bg-green-100/30 border-green-200">
                          <CheckCircle2 className="w-5 h-5 text-green-600" />
                          <span><strong className="text-foreground">Correct Option:</strong> {q.options[q.correct]}</span>
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Strategy:</strong> {q.explanation}
                    </p>
                  </CardContent>
                </Card>
              )
            })}
          </section>
        </div>
      </div>
    )
  }

  const q = questions[currentStep]

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedPassageId(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> All Passages
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold text-primary">{selectedPassage.title}</h1>
              <p className="text-muted-foreground font-mono text-xs">Item {currentStep + 1} / {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <Card className="border-none shadow-sm bg-white/70 backdrop-blur-sm p-8 rounded-[2.5rem]">
            <div className="flex items-center gap-2 mb-6 text-primary font-bold text-xs tracking-widest uppercase">
              < BookOpen className="w-4 h-4" /> READING PASSAGE
            </div>
            <div className="text-foreground leading-relaxed italic text-lg space-y-4">
              {selectedPassage.content.split('\n').map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </Card>

          <div className="space-y-6" ref={questionRef}>
            <Card className="border-none shadow-xl rounded-[2.5rem] bg-white">
              <CardHeader className="p-8 pb-4">
                <CardTitle className="text-xl leading-snug font-bold text-foreground">{q.text}</CardTitle>
              </CardHeader>
              <CardContent className="p-8 pt-4">
                <RadioGroup onValueChange={(val) => handleAnswer(parseInt(val))} value={answers[q.id]?.toString()} className="grid gap-3">
                  {q.options.map((opt, i) => {
                    const isSelected = answers[q.id] === i
                    return (
                      <div 
                        key={i} 
                        onClick={() => handleAnswer(i)}
                        className={cn(
                          "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                          isSelected 
                            ? "border-primary bg-primary/10 ring-1 ring-primary/20 shadow-md" 
                            : "border-border hover:bg-primary/5 hover:border-primary/20"
                        )}
                      >
                        <RadioGroupItem value={i.toString()} id={`q-${q.id}-opt-${i}`} className="pointer-events-none" />
                        <Label 
                          htmlFor={`q-${q.id}-opt-${i}`} 
                          className="flex-1 cursor-pointer text-base font-bold text-foreground leading-tight"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span className="inline-block w-8 text-primary font-mono">{String.fromCharCode(65 + i)}.</span>
                          {opt}
                        </Label>
                      </div>
                    )
                  })}
                </RadioGroup>
              </CardContent>
            </Card>

            <div className="flex justify-between items-center">
              <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
                <ChevronLeft className="w-4 h-4 mr-1" /> Previous
              </Button>
              <Button size="lg" className="px-12 h-14 text-lg font-bold rounded-2xl shadow-xl group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
                {currentStep === questions.length - 1 ? "Submit Set" : "Next Question"} <Target className="w-5 h-5 ml-3 group-hover:scale-110 transition-transform" />
              </Button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
