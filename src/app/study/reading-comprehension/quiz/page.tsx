
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
import Link from "next/link"
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
    id: "cooking-rice",
    title: "Cooking Rice",
    description: "A first-hand account of kitchen experimentation and culinary respect.",
    content: "(1) \"Who doesn't know how to cook rice? Cooking rice hardly takes time,\" said my father. So, I challenged myself. I switched from news to You Tube and typed, \"How to cook rice?\" I took one and a half cups of rice. Since I didn't have access to a rice cooker, I put the rice in a big pot. Firstly, the rice has to be washed to get rid of dust and starch. I thought I won't be able to drain the rice and that it will fall out of the pot. I observed the chef as I swirled the rice around and used my dexterous hands to drain it, not once, not twice, but three times. I looked down at the sink and saw less than 50 grains that made their way out of the pot. Suffice to say, I was up to the mark.\n(2) The video stated that the key to perfect rice is equal amount of rice and water. I have heard that professionals don't need to measure everything; they just know what the right amount is. But as this was my first time in the kitchen, I decided to experiment by not measuring the water needed for boiling the rice. I wanted the rice to be firm when bitten, just like pasta. I don't enjoy the texture of mushy rice. It has to have that chutzpah; it has to resist my biting power just for a bit before disintegrating.\n(3) After what seemed like 10 minutes, all the water disappeared. I went in to give it a good stir. To my surprise, some of the rice got stuck to the pot. I tried to scrape it off but to no avail. At the same time, there was a burning smell coming from it. I quickly turned the stove off. \"What have you done to the kitchen?\" My mother shouted while coming towards the kitchen. I managed to ward her off.\n(4) Finally, when the time came to taste my creation, I was surprised! It wasn't bad at all. The rice had the desired consistency. Sure, a little more salt would've been better, but I just added that while eating. The experience was fairly rewarding and memorable. It taught me a new sense of respect for those who cook food on a regular basis at home or are engaged in gourmet creations professionally.",
    questions: [
      { id: 1, text: "Father's question to the narrator about knowing how to cook rice was intended to:", options: ["criticize the narrator's lack of abilities", "make the process sound simple", "encourage the narrator to take up cooking", "showcase his own expertise in cooking rice"], correct: 1, explanation: "The father's comment 'Who doesn't know...' implies the task is so basic and simple that anyone should be able to do it." },
      { id: 2, text: "In the phrase 'I switched from news to YouTube...', pick the option where 'switch' is NOT used in the same context:", options: ["He switched on the radio to listen to the news", "Forget these diet supplements and switch to yoga", "Mom switched to reading fiction recently", "The company will switch the trucks to other routes"], correct: 0, explanation: "In the passage, 'switch' means to move from one activity to another. In option 1, it refers to turning on a device." },
      { id: 3, text: "Choose the correct sequence of the process based on the passage:", options: ["4, 2, 1, 3, 5", "1, 3, 2, 5, 4", "4, 1, 5, 3, 2", "5, 1, 2, 4, 3"], correct: 2, explanation: "The logical sequence is: 4 (put rice in utensil), 1 (wash rice), 5 (swirl), 3 (drain), 2 (repeat)." },
      { id: 4, text: "The narrator says he has dexterous hands. NOT BEING dexterous means being:", options: ["uncomfortable", "clumsy", "unclear", "clueless"], correct: 1, explanation: "Dexterous means showing skill with hands. Clumsy is the opposite." },
      { id: 5, text: "Which option represents the correct ratio of water to rice for 'perfect rice'?", options: ["Equal amounts", "Double water", "Half water", "Triple water"], correct: 0, explanation: "The passage explicitly states 'the key to perfect rice is equal amount of rice and water'." },
      { id: 6, text: "The fact that the narrator risked experimentation on his maiden attempt shows he was:", options: ["conscientious", "nervous", "presumptuous", "courteous"], correct: 2, explanation: "Presumptuous here refers to taking a risk or overstepping bounds of a beginner by ignoring standard measurements." },
      { id: 7, text: "Pick the option showing the CORRECT use of 'chutzpah':", options: ["Duty to dispense chutzpah to everyone", "She may not have presence, but she's got chutzpah", "Code crack proved me to be a chutzpah", "Took over family's chutzpah to save it"], correct: 1, explanation: "Chutzpah refers to extreme self-confidence or audacity, which fits describing someone's bold character." },
      { id: 8, text: "What correctly states what DID NOT happen after the writer checked the rice?", options: ["Turning the stove off", "Being taken aback at the condition", "Forgetting to scrape stuck rice", "Smelling the delicious aroma"], correct: 3, explanation: "The passage mentions a 'burning smell', so a 'delicious aroma' is the opposite of what happened." },
      { id: 9, text: "Which pair correctly lists the final feelings of the writer?", options: ["frustrating and disillusioning", "amusing and exacting", "satisfying and enlightening", "frustrating and satisfying"], correct: 2, explanation: "The narrator describes the experience as 'fairly rewarding' (satisfying) and gaining a 'new sense of respect' (enlightening)." },
      { id: 10, text: "The narrator's creation was:", options: ["almost perfect to taste", "way off from what he wanted", "overly seasoned", "quite distasteful"], correct: 0, explanation: "He states 'It wasn't bad at all' and had the 'desired consistency', implying it was near perfect for a first attempt." }
    ]
  },
  {
    id: "bengal-tiger",
    title: "The Bengal Tiger",
    description: "An informational survey of India's National Animal and its conservation status.",
    content: "(1) Royal Bengal Tiger is the largest, fiercest, and powerful member of the Big Cat family in India. Royal Bengal Tigers, also known as Indian Tiger and Bengal Tiger, constitute a large population of the tiger family in the world. It is the National animal of India and is found mostly in India, China, Bhutan, Bangladesh, and Burma.\n(2) The biological name of this Big Cat is Panthera Tigris, which comes under the Felidae family under Mammalia category.\n(3) No two Bengal tigers look alike! Every Bengal Tigers has a unique stripe pattern. Their colour ranges from yellow to light orange, with stripes from dark brown to black. Some of the Bengal Tigers are white in colour. The tail is orange in colour with black rings. Unlike the other White Tigers that have blue eyes, Bengal Tigers have yellow irises. They live for 10 to 15 years.\n(4) Being fierce in nature, Royal Bengal Tigers are not much friendly in nature and live a solitary life, except in winters when they can be seen in a group of 3 or 4. Bengal tigers are fast runners and good swimmers. Tigers attack their prey in a stealth mode. They are usually spotted in swamps, mangroves, and grasslands.\n(5) Royal Bengal Tigers have very sharp memory; they never forget the faces. Their memory is sharper than humans and other animals.\n(6) We can find the largest population of Royal Bengal Tigers in India. As per the latest tiger census report 2017, there are 3,786 Royal Bengal Tigers in India. India has more than 75% of the total tiger population in the world. Along with India, neighbouring countries to India holds a somewhat decent population of Royal Bengal Tiger in the world. The latest census of the tigers in India and neighbouring countries are shown in the table: Bangladesh (300-460), Bhutan (80-460), China (30-35), India (2500-3800), Nepal (150-250).\n(7) To know about the latest tiger population is always government's concern, as they want to save this majestic animal from getting extinct. India has lost 97% of its Royal Bengal Tigers population in the last century. The main reason is Hunting, Poaching, Urbanization, Habitat loss and Illegal Wildlife Trade. Poaching means to illegally trade the tiger made products like tiger skin, tiger made jewellery, etc. These skin and jewellery are sold for millions in the international market. Poaching has reduced the number of tigers to just 3,800 from 1,00,000 in the starting of the 20th century.",
    questions: [
      { id: 11, text: "The biological name of the Bengal Tiger is Panthera ___:", options: ["Tiger", "Tigress", "Tigris", "Tigers"], correct: 2, explanation: "Paragraph 2 explicitly states the biological name is Panthera Tigris." },
      { id: 12, text: "Identify the characteristic(s) of Bengal Tigers mentioned:", options: ["Fast runners", "Attack in stealth mode", "Good swimmers", "All of these"], correct: 3, explanation: "Paragraph 4 mentions they are fast runners, good swimmers, and attack in stealth mode." },
      { id: 13, text: "According to the passage, when was the latest survey of tigers conducted?", options: ["2010", "2017", "2019", "2020"], correct: 1, explanation: "Paragraph 6 mentions the 'latest tiger census report 2017'." },
      { id: 14, text: "The number of tigers in which country ranges from 80 to 460?", options: ["Bangladesh", "Bhutan", "China", "Nepal"], correct: 1, explanation: "The table data in paragraph 6 lists Bhutan as having 80-460 tigers." },
      { id: 15, text: "Approximately what percentage of the world's tigers are found in India?", options: ["50%", "60%", "More than 75%", "90%"], correct: 2, explanation: "Paragraph 6 states 'India has more than 75% of the total tiger population in the world'." },
      { id: 16, text: "Which pair of countries has approximately the same maximum tiger population (460)?", options: ["Nepal and Bangladesh", "Bhutan and Bangladesh", "China and Nepal", "Bangladesh and India"], correct: 1, explanation: "According to the table, both Bangladesh (300-460) and Bhutan (80-460) share a maximum range of 460." },
      { id: 17, text: "Pick the correct reason for the reduction in tiger population:", options: ["Poaching", "Epidemic", "Climatic changes", "Soil erosion"], correct: 0, explanation: "Paragraph 7 lists Hunting and Poaching as main reasons for population loss." },
      { id: 18, text: "Which word is similar in meaning to 'Solitary'?", options: ["Accompanied", "Lonesome", "Sociable", "Gregarious"], correct: 1, explanation: "Solitary means alone; lonesome is the closest synonym among the options." }
    ]
  },
  {
    id: "einstein-agony",
    title: "Einstein's Agony",
    description: "The transformation of a scientist into a sage following the atomic bombings.",
    content: "(1) The sage of science, Einstein, was sitting in a depressive and pensive mood one evening. His eyes were brimming with tears. The pain was evident on his face. He peeped out of the window of his room. The sun had set a few minutes back. The sky was filled with a reddish glow. At this sunset, he felt that it was humanity that had sunk into devilish darkness and the reddish glow in the sky was the blood of humanity spilling all over the sky from earth. With tired steps, he walked back to his chair and settled down. It was the 9th of August, 1945. Three days back, he had felt the same agony as if someone had torn him apart. He was deeply hurt and depressed when he heard on the radio that America had dropped an atom bomb on the Japanese city, Hiroshima. Today, within three days, another bomb was dropped on another city, Nagasaki and lakhs of people had been killed.\n(2) He had heard that the blast released so much energy that it had paled all past destructions in comparison and death had played out a pitiable dance of destruction. The flames that broke out of the bomb were burning, melting and exploding buildings. Scared of the heat of the bomb, people had jumped into lakes and rivers, but the water was boiling and the people too were burnt and killed. The animals in the water were already boiled to death. Animals, trees, herbs, fragrant flowering plants were all turned into ashes. The atomic energy destruction had just not stopped there. It had entered the atmosphere there and had spread radiation that would affect people for generations to come and would also bring about destructive irreversible biological change in animals and plants.\n(3) As the news of the atomic attack reached Einstein, and he became aware of the glaring horror of the abuse of atomic energy, his distress and restlessness knew no bounds. He could not control himself and picked up his violin to turn his mind on to other things. While playing the violin, he tried to dissolve his distress in its sad notes, but couldn't. He was burning on the embers of destruction; his heart was filled with an ocean of agony and tears just continued streaming uncontrollably out of his eyes. Night had fallen. His daughter came up and asked him to eat something as he had not taken anything for the last four days. His voice was restrained and he said, \"I don't feel like eating.\"\n(4) He could not sleep that night. Lying down, he was thinking how he had drawn the attention of the then American President Roosevelt towards the destructive powers of an atomic bomb. He had thought that this would be used to scare Hitler and put an end to the barbarism that Hitler was up to. However, Roosevelt kept him in the dark and made false promises. Eventually, he had abused Einstein's equation of E=mc² that resulted in the destructive experiments. His actions had made science and scientists as murderers. Einstein kept on thinking for a long time. Eventually, he slipped into sleep. When he woke up at dawn, there was a new dawn in him too. The atomic threat had transformed his heart.\n(5) The next day, he decided to disassociate himself from the scientific policy of the government and all governmental institutions. He decided to open educational institutions for children, adolescents, and youth-institutions where along with science, spirituality will be compulsorily taught.\n(6) To inaugurate this institution, he had invited two great philosophers, Bertrand Russell and Albert Schweitzer. Ten other great scientists who had won Nobel Prizes in different fields were also invited. They all saw a different Einstein, not a great scientist but a sage in him. The institution was opened by garlanding a photo of Mahatma Gandhi. While garlanding the Mahatma, he became emotional and said with a lump in his throat, 'I bow down to the great man who fought for the Independence of his country through non-violence. He could do so because he was a truthful man and a true spiritualist'.\n(7) Those who teach science should be taught spirituality too. Without harmony between science and spirituality, the destruction would continue unabated. A few years after this institution was built, a Japanese delegation came to meet him. Einstein broke down in the meeting and said, 'You can give me any punishment and I will accept it. Anyway, I have decided to lead my life in penitence'. The Japanese were moved by his sincerity and forgot their grief.",
    questions: [
      { id: 19, text: "Which musical instrument did Einstein play when he was in grief?", options: ["Harmonium", "Guitar", "Violin", "Flute"], correct: 2, explanation: "Paragraph 3 mentions he picked up his 'violin' to turn his mind to other things." },
      { id: 20, text: "How did Einstein learn about the dropping of the bomb on Hiroshima?", options: ["Television", "Newspaper", "Radio", "Telephonic message"], correct: 2, explanation: "Paragraph 1 states he heard on the 'radio' that America had dropped an atom bomb." },
      { id: 21, text: "What did Einstein say to the Japanese delegation?", options: ["You can give me any punishment and I will accept it", "I am not at fault", "What could I do?", "The President didn't agree to my advice"], correct: 0, explanation: "Paragraph 7 records his direct quote: 'You can give me any punishment and I will accept it.'" },
      { id: 22, text: "What action did Einstein take to show his displeasure over the atomic attack?", options: ["Open a science laboratory", "Establish an Educational Institution", "Disassociate himself from Governmental Institutions", "Invite two great philosophers"], correct: 2, explanation: "Paragraph 5 states he decided to 'disassociate himself from the scientific policy of the government and all governmental institutions'." },
      { id: 23, text: "To what was Einstein's depressive mood compared?", options: ["Sunrise", "Sunset", "Devilish darkness", "Tired steps"], correct: 1, explanation: "The passage opens with him in a depressive mood while watching the 'sunset', linking the two." },
      { id: 24, text: "What specifically made Einstein restless and sleepless?", options: ["The hit on America", "The hit on Nagasaki", "The hit on Hiroshima", "Both (2) and (3)"], correct: 3, explanation: "The bombings of both Hiroshima and Nagasaki caused his immense agony and sleeplessness." },
      { id: 25, text: "Identify the event that led Einstein to try playing an instrument to divert his mind:", options: ["Getting news of the atomic attack", "Inventing sad notes", "Hitler's barbarism", "False promises from Roosevelt"], correct: 0, explanation: "Paragraph 3 states 'As the news of the atomic attack reached Einstein... he picked up his violin'." },
      { id: 26, text: "According to Einstein, what turned science and scientists into murderers?", options: ["Wrong use of E=mc²", "False promises of Roosevelt", "The atomic bombings", "None of these"], correct: 0, explanation: "Paragraph 4 explains Roosevelt abused Einstein's equation, which 'made science and scientists as murderers'." },
      { id: 27, text: "Which philosopher did Einstein invite to inaugurate his new institution?", options: ["Bertrand Russell", "Albert Schweitzer", "Both (1) and (2)", "Neither (1) nor (2)"], correct: 2, explanation: "Paragraph 6 mentions he invited 'two great philosophers, Bertrand Russell and Albert Schweitzer'." },
      { id: 28, text: "Why does Einstein believe science teachers should also be taught spirituality?", options: ["To make science easier", "To help make deadly weapons", "To give more power to scientists", "To enable use of science for human welfare"], correct: 3, explanation: "The passage suggests spirituality provides the ethical balance needed to prevent science from being used for destruction." }
    ]
  },
  {
    id: "stoicism",
    title: "Stoicism & Time Management",
    description: "Master the logic of time as a non-renewable resource.",
    content: "It's essential to focus on what you control, especially when life feels difficult. This mindset is often overshadowed by the flood of information we consume daily. For instance, I spent 30 minutes this morning going down a rabbit hole after reading about Bitcoin. I ended up lost in unrelated Wikipedia pages. Stoicism teaches us that time is our most valuable resource. While it's nice to know many things, most of the information we consume has little real value. We waste time on trivial pursuits, like reading negative news, stalking social media profiles, or watching shows just to \"kill time.\" Why kill something so precious? We're quick to get upset by things we can't control. Responding to every little thing we encounter is a habit. But true happiness comes from accepting that we don't control most things. Worrying about global issues like recessions, wars, or natural disasters is unproductive. Indifference to things outside our control is the key to happiness. Happiness comes from meaningful activities: good friendships, enjoyable work, reading thought-provoking books, walking in nature, working out, or watching a great movie. For example, a recent Saturday was fulfilling because I spent time reading, writing, walking, and enjoying meals with family. Contrast that with another day when I got caught up in negative conversations about COVID. The negativity drained me, and I accomplished nothing useful. Things are the way they are. The best we can do is focus on what matters and how we spend our time.",
    questions: [
      { id: 29, text: "Select the activity that contributes to happiness from the options given below:", options: ["Watching random TV shows", "Arguing on social media", "Reading thought-provoking books", "Browsing the internet for news"], correct: 2, explanation: "The passage explicitly lists 'reading thought-provoking books' as a meaningful activity." },
      { id: 30, text: "Select the central idea of the passage from the options given below:", options: ["Consuming more information leads to happiness.", "Responding to global issues is essential.", "Happiness comes from following current events.", "Time is a valuable resource we should use it wisely."], correct: 3, explanation: "The core message is wise time management and focus on controllable factors." },
      { id: 31, text: "Choose the best option to complete the sentence: Practicing indifference to uncontrollable things helps to achieve", options: ["Better focus on global events", "Fulfilling and lasting happiness", "Improved emotional reactivity", "A deeper knowledge of issues"], correct: 1, explanation: "Indifference to external factors is described as the key to happiness." },
      { id: 32, text: "Choose an example of wasting time based on the passage from the options given below:", options: ["Scrolling social media profiles", "Walking in nature", "Spending time with family", "Writing and reflecting"], correct: 0, explanation: "Stalking social media profiles is explicitly labeled as a trivial pursuit that wastes time." }
    ]
  },
  {
    id: "arjun",
    title: "Arjun the Artist",
    description: "A narrative on mentorship and artistic perseverance in Varanasi.",
    content: "In the ancient city of Varanasi, Arjun found his world transformed one monsoon afternoon. Born into a family of hardworking labourers, he was expected to follow in his father's footsteps. Yet, Arjun harboured an unspoken passion for art that no one knew about. As dark clouds gathered and the first raindrops fell, he wandered through the narrow lanes of the old city, seeking solace from the predictable rhythms of life. That day, as he took refuge under a vibrant awning in a bustling market, Arjun encountered an old painter named Raghav. With paint-splattered hands and eyes that shimmered with decades of experience, Raghav noticed the spark in Arjun's eyes. He invited Arjun into his humble studio, where canvases whispered stories of love, loss, and hope. Inspired by Raghav's gentle mentorship, Arjun discovered his own unique style, blending tradition with innovation. Over time, his artwork became a mirror reflecting the emotions of the city, and his reputation grew. Arjun's journey from a reluctant son to an emerging artist was not without hardship. Yet, every challenge became a brushstroke in the masterpiece of his life. Eventually, his creations graced galleries beyond Varanasi, uniting cultures and hearts. In every piece, Arjun celebrated the resilience of the human spirit, proving that passion and perseverance can transform even the most ordinary life into a vibrant work of art. His journey, filled with unexpected lessons and creative breakthroughs, taught him that every struggle offered a chance to begin anew, inspiring his art with hope and transformation.",
    questions: [
      { id: 33, text: "Determine the primary theme illustrated in the passage:", options: ["The preventable hardships for those who choose artistic paths", "Conflicts between urban modernity and ancient traditions", "The fleeting beauty of monsoon afternoons encouraging passion", "The transformative influence of mentorship and following one's passion"], correct: 3, explanation: "The focus is on how Raghav's guidance helped Arjun overcome adversity and find his voice." },
      { id: 34, text: "Evaluate the impact of Arjun's artwork as described in the passage:", options: ["His art remained confined within narrow lanes", "His work was mostly criticised and led to isolation", "His creations resonated deeply, uniting diverse cultures", "His art was solely a personal hobby that never gained attention"], correct: 2, explanation: "The passage notes his creations graced galleries beyond Varanasi, uniting cultures." },
      { id: 35, text: "Deduce the message the author conveys about overcoming obstacles:", options: ["Struggles are insurmountable barriers", "Every challenge offers an opportunity to grow and transform", "Only those with privileged backgrounds can succeed", "Obstacles invariably lead to failure"], correct: 1, explanation: "Every challenge is described as a 'brushstroke in the masterpiece of his life'." },
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
      { id: 41, text: "Match the boy's states with their reasons correctly:", options: ["A-IV, B-III, C-II, D-I", "A-III, B-II, C-I, D-IV", "A-I, B-III, C-II, D-IV", "A-II, B-I, C-IV, D-III"], correct: 1, explanation: "Based on the text: Crying (Hungry), Anxious (House), Worried (Ship), Stump (Fire)." },
      { id: 42, text: "The two protagonists of the story are:", options: ["Both innocent and naive", "One is intelligent and the other a fool", "Both cunning and selfish", "One is demanding and greedy, the other generous and supportive"], correct: 3, explanation: "The boy constantly demands, while the tree gives selflessly until the end." },
      { id: 43, text: "How were the tree and the little boy related to each other?", options: ["Close contenders in survival", "Close friends due to long association", "Colleagues working together", "Competitors in needs"], correct: 1, explanation: "The passage explicitly states 'They had become friends'." },
      { id: 44, text: "The story highlights a typical selfish human nature. Identify it:", options: ["Compassion and benevolence", "Conservation of forests", "Mindless greed for wealth", "Heartless and foolish exploitation of nature"], correct: 3, explanation: "The boy exploits the tree's resources without regard for its survival." },
      { id: 45, text: "The phrase 'The stump of the unselfish tree burnt in the fire, softly humming a tune' means:", options: ["Trees sing when burnt", "The tree felt no pain in serving its friend", "The tree tried to forget its pain", "The tree was a fool"], correct: 1, explanation: "Humming symbolizes the tree's peace and contentment in its final act of selflessness." },
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
      { id: 52, text: "Match the phrases correctly (Few words: Rarely thoughtless; Hesitancy: Annoyance; Exaggerate: Weakness; Shyness: Laughter):", options: ["A-IV, B-III, C-II, D-I", "A-II, B-I, C-IV, D-III", "A-III, B-IV, C-I, D-II", "A-I, B-II, C-III, D-IV"], correct: 3, explanation: "Matching the author's specific claims to their descriptors." }
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
    // Starting question 2 (index 1), scroll to questionRef. Else scroll to quizRef.
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

  // --- SELECTION VIEW ---
  if (!selectedPassageId) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 2: RC
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Reading Comprehension Mastery</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a passage to begin your focused clinical practice. Target: 250/250 accuracy.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
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
                    Begin Assessment <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    )
  }

  // --- RESULTS VIEW ---
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

  // --- QUIZ VIEW ---
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
              <Button variant="ghost" onClick={() => {
                setCurrentStep(Math.max(0, currentStep - 1))
              }} disabled={currentStep === 0} className="rounded-xl font-bold">
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
