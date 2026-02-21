
"use client"

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { MessageCircle, Star, Sparkles, Lightbulb, Info, BookOpen } from "lucide-react"
import Link from "next/link"
import { useEffect } from "react"

const IDIOMS = [
  { idiom: "A blessing in disguise", meaning: "A misfortune that eventually results in something good happening later." },
  { idiom: "A dime a dozen", meaning: "Something very common and not particularly valuable." },
  { idiom: "A penny for your thoughts", meaning: "Asking someone what they are thinking about." },
  { idiom: "Actions speak louder than words", meaning: "People's intentions can be judged better by what they do than what they say." },
  { idiom: "Add fuel to the fire", meaning: "To make an already bad situation worse." },
  { idiom: "Add insult to injury", meaning: "To further a loss with mockery or indignity; to worsen an unfavorable situation." },
  { idiom: "At the eleventh hour", meaning: "At the very last moment." },
  { idiom: "Back to the drawing board", meaning: "When an attempt fails and it's time to start all over." },
  { idiom: "Barking up the wrong tree", meaning: "Looking in the wrong place or accusing the wrong person." },
  { idiom: "Beat around the bush", meaning: "Avoid talking about the main issue directly." },
  { idiom: "Better late than never", meaning: "It is better to arrive or do something late than not to do it at all." },
  { idiom: "Bite off more than you can chew", meaning: "Take on a task that is way too big." },
  { idiom: "Bite the bullet", meaning: "Endure a painful situation with courage." },
  { idiom: "Break a leg", meaning: "Good luck (usually said to performers)." },
  { idiom: "Break the ice", meaning: "To start a conversation in a socially awkward situation." },
  { idiom: "Burn the midnight oil", meaning: "To work late into the night." },
  { idiom: "Call it a day", meaning: "Decide to stop working on something." },
  { idiom: "Costs an arm and a leg", meaning: "Something that is very expensive." },
  { idiom: "Cry over spilt milk", meaning: "Complain about something that has already happened and cannot be changed." },
  { idiom: "Cut corners", meaning: "To do something poorly in order to save time or money." },
  { idiom: "Cut to the chase", meaning: "Skip the unnecessary details and get to the main point." },
  { idiom: "Don't count your chickens before they hatch", meaning: "Don't make plans based on events that haven't happened yet." },
  { idiom: "Don't put all your eggs in one basket", meaning: "Don't risk everything on a single venture." },
  { idiom: "Elephant in the room", meaning: "An obvious major problem that people are avoiding discussing." },
  { idiom: "Every cloud has a silver lining", meaning: "Every difficult situation has a positive side." },
  { idiom: "Get a taste of your own medicine", meaning: "Get treated the way you've been treating others." },
  { idiom: "Get out of hand", meaning: "To become difficult to control." },
  { idiom: "Give someone the cold shoulder", meaning: "Intentionally ignoring someone." },
  { idiom: "Go on a wild goose chase", meaning: "A hopeless search for something that is unattainable." },
  { idiom: "Hang in there", meaning: "Don't give up." },
  { idiom: "Hit the nail on the head", meaning: "To be precisely correct." },
  { idiom: "Hit the sack", meaning: "Go to sleep." },
  { idiom: "In a nutshell", meaning: "In a few words; briefly." },
  { idiom: "It takes two to tango", meaning: "Both people involved in a situation are equally responsible." },
  { idiom: "Jump on the bandwagon", meaning: "Follow a popular trend or activity." },
  { idiom: "Keep your chin up", meaning: "Remain positive during a difficult situation." },
  { idiom: "Kill two birds with one stone", meaning: "Accomplish two things with a single action." },
  { idiom: "Let sleeping dogs lie", meaning: "Avoid interfering in a situation that is currently stable." },
  { idiom: "Let the cat out of the bag", meaning: "Accidentally reveal a secret." },
  { idiom: "Make a long story short", meaning: "Come to the point without details." },
  { idiom: "Method to the madness", meaning: "A specific, rational plan behind seemingly crazy behavior." },
  { idiom: "Miss the boat", meaning: "It's too late to take an opportunity." },
  { idiom: "No pain, no gain", meaning: "You have to work hard for what you want." },
  { idiom: "On cloud nine", meaning: "Very happy and excited." },
  { idiom: "On thin ice", meaning: "In a risky or dangerous situation." },
  { idiom: "Once in a blue moon", meaning: "Very rarely; almost never." },
  { idiom: "Piece of cake", meaning: "Something very easy to do." },
  { idiom: "Pull someone's leg", meaning: "To tease or joke with someone." },
  { idiom: "Rain on someone's parade", meaning: "To spoil someone's plans or pleasure." },
  { idiom: "See eye to eye", meaning: "To agree completely with someone." },
  { idiom: "Sit on the fence", meaning: "Avoid making a decision or taking sides." },
  { idiom: "Spill the beans", meaning: "To reveal secret information." },
  { idiom: "Steal someone's thunder", meaning: "Take credit for someone else's achievement." },
  { idiom: "Take it with a grain of salt", meaning: "Don't take what someone says too seriously." },
  { idiom: "The ball is in your court", meaning: "It is your turn to make a decision or take action." },
  { idiom: "The best of both worlds", meaning: "A situation where you can enjoy the advantages of two very different things." },
  { idiom: "Through thick and thin", meaning: "Under all circumstances, no matter how difficult." },
  { idiom: "To get cold feet", meaning: "To become nervous or hesitant about a planned action." },
  { idiom: "To go the extra mile", meaning: "To do more than what is expected or required." },
  { idiom: "Under the weather", meaning: "Feeling slightly ill." },
  { idiom: "Up in the air", meaning: "Uncertain or undecided." },
  { idiom: "Weather the storm", meaning: "Successfully survive a difficult period." },
  { idiom: "When pigs fly", meaning: "Something that will never happen." },
  { idiom: "Wrap your head around something", meaning: "To understand a complicated idea or situation." },
  { idiom: "Your guess is as good as mine", meaning: "I have no idea." },
  { idiom: "A bird in the hand is worth two in the bush", meaning: "What you have is worth more than what you might get." },
  { idiom: "A chip on your shoulder", meaning: "Being angry about something that happened in the past." },
  { idiom: "A drop in the bucket", meaning: "A very small part of something big or whole." },
  { idiom: "A house of cards", meaning: "A plan or organization that is very weak and can easily fail." },
  { idiom: "A leopard can't change its spots", meaning: "You cannot change who you are." },
  { idiom: "A man of straw", meaning: "A weak or characterless person." },
  { idiom: "A piece of mind", meaning: "Telling someone exactly what you think, usually in an angry way." },
  { idiom: "Against the clock", meaning: "Trying to do something as fast as possible before a deadline." },
  { idiom: "All in the same boat", meaning: "In the same difficult situation as others." },
  { idiom: "An arm and a leg", meaning: "A large amount of money." },
  { idiom: "Apple of one's eye", meaning: "Someone very precious or dear." },
  { idiom: "At a snail's pace", meaning: "Moving very slowly." },
  { idiom: "Back to square one", meaning: "Return to the very beginning." },
  { idiom: "Bad blood", meaning: "Feelings of hate or strong dislike between people." },
  { idiom: "Ball in your court", meaning: "Responsibility for next action rests with you." },
  { idiom: "Be on the same page", meaning: "To have the same understanding or agreement." },
  { idiom: "Beat a dead horse", meaning: "Waste time on something that is already settled." },
  { idiom: "Below the belt", meaning: "Unfair or cruel (referring to a remark)." },
  { idiom: "Between a rock and a hard place", meaning: "Faced with two difficult choices." },
  { idiom: "Blow one's own trumpet", meaning: "To praise oneself." },
  { idiom: "Bolt from the blue", meaning: "A total surprise." },
  { idiom: "Break the bank", meaning: "To cost too much money." },
  { idiom: "By leaps and bounds", meaning: "Very rapidly." },
  { idiom: "Call a spade a spade", meaning: "To speak plainly and directly." },
  { idiom: "Carry the day", meaning: "To be successful or win." },
  { idiom: "Catch someone red-handed", meaning: "Catch someone in the act of doing something wrong." },
  { idiom: "Change of heart", meaning: "A change in opinion or feeling." },
  { idiom: "Checkered career", meaning: "A career marked by fluctuating fortunes." },
  { idiom: "Close shave", meaning: "A narrow escape from danger." },
  { idiom: "Come to a standstill", meaning: "To stop completely." },
  { idiom: "Couch potato", meaning: "A lazy person who watches too much TV." },
  { idiom: "Crocodile tears", meaning: "False expression of sorrow." },
  { idiom: "Dead ringer", meaning: "An exact duplicate." },
  { idiom: "Don't cry over spilt milk", meaning: "Don't worry about things that cannot be changed." },
  { idiom: "Double-edged sword", meaning: "Something that has both favorable and unfavorable consequences." },
  { idiom: "Down to earth", meaning: "Practical and realistic." },
  { idiom: "Draw the line", meaning: "To set a limit on what is allowed." },
  { idiom: "Eat humble pie", meaning: "To apologize and accept that you were wrong." },
  { idiom: "Face the music", meaning: "To accept the unpleasant consequences of one's actions." },
  { idiom: "Fair-weather friend", meaning: "A friend who is only there in good times." },
  { idiom: "Feather in one's cap", meaning: "An achievement to be proud of." },
  { idiom: "Fish out of water", meaning: "Someone in an unfamiliar and uncomfortable situation." },
  { idiom: "Flash in the pan", meaning: "Something that is successful for a short time but doesn't last." },
  { idiom: "Fly off the handle", meaning: "To lose one's temper suddenly." },
  { idiom: "Gain ground", meaning: "To make progress." },
  { idiom: "Get wind of", meaning: "To hear a rumor or secret information about something." },
  { idiom: "Give up the ghost", meaning: "To die or stop working." },
  { idiom: "Go through fire and water", meaning: "To undergo any risk or trouble." },
  { idiom: "Green thumb", meaning: "A natural talent for gardening." },
  { idiom: "Hard nut to crack", meaning: "A difficult problem to solve." },
  { idiom: "Heart in one's mouth", meaning: "Extremely nervous or afraid." },
  { idiom: "In the red", meaning: "Spending more money than is being earned." },
  { idiom: "In the same boat", meaning: "Sharing the same problems or circumstances." },
  { idiom: "Keep at arm's length", meaning: "To avoid intimacy or familiarity." },
  { idiom: "Keep the wolf from the door", meaning: "To earn enough money to afford basic necessities." },
  { idiom: "Lead someone up the garden path", meaning: "To deceive or mislead someone." },
  { idiom: "Lion's share", meaning: "The largest part of something." },
  { idiom: "Make both ends meet", meaning: "To earn just enough money to live on." },
  { idiom: "Nip in the bud", meaning: "To stop something at an early stage." },
  { idiom: "Not my cup of tea", meaning: "Not something that one likes or is interested in." },
  { idiom: "Off the cuff", meaning: "Without preparation; spontaneously." },
  { idiom: "On the cards", meaning: "Likely to happen." },
  { idiom: "Part and parcel", meaning: "An essential part of something." },
  { idiom: "Pay through the nose", meaning: "To pay an excessively high price." },
  { idiom: "Read between the lines", meaning: "To find hidden meaning." },
  { idiom: "Red tape", meaning: "Excessive bureaucracy or adherence to rules." },
  { idiom: "Rule of thumb", meaning: "A broadly accurate guide based on experience." },
  { idiom: "Sell like hot cakes", meaning: "To sell very quickly." },
  { idiom: "Take with a pinch of salt", meaning: "To listen with skepticism." },
  { idiom: "The last straw", meaning: "The final problem that makes a situation intolerable." },
  { idiom: "Through and through", meaning: "Completely; in every way." },
  { idiom: "Under the thumb of", meaning: "Controlled by someone else." },
  { idiom: "Wild goose chase", meaning: "A foolish and hopeless pursuit." },
  { idiom: "With a high hand", meaning: "In an arrogant or dictatorial manner." }
].sort((a, b) => a.idiom.localeCompare(b.idiom));

const FIGURES = [
  { name: "Alliteration", def: "Repetition of initial consonant sounds.", eg: "Peter Piper picked a peck of pickled peppers." },
  { name: "Anaphora", def: "Repetition of a word or phrase at the beginning of successive clauses.", eg: "Every breath you take, every move you make..." },
  { name: "Antithesis", def: "Contrast of ideas expressed by parallel arrangement of words.", eg: "Speech is silver, but silence is gold." },
  { name: "Apostrophe", def: "Addressing an absent person or personified object.", eg: "O wild West Wind, thou breath of Autumn's being." },
  { name: "Assonance", def: "Repetition of vowel sounds within nearby words.", eg: "The rain in Spain stays mainly in the plain." },
  { name: "Asyndeton", def: "Omission of conjunctions between parts of a sentence.", eg: "I came, I saw, I conquered." },
  { name: "Chiasmus", def: "Concepts are repeated in reverse order.", eg: "Never let a Fool Kiss You or a Kiss Fool You." },
  { name: "Consonance", def: "Repetition of consonant sounds within or at the end of words.", eg: "The lock stuck back in the crack." },
  { name: "Epistrophe", def: "Repetition of a word at the end of successive clauses.", eg: "Government of the people, by the people, for the people." },
  { name: "Euphemism", def: "A mild word used in place of a harsh one.", eg: "Passed away instead of died." },
  { name: "Hyperbaton", def: "Inversion of normal word order.", eg: "This is the sort of nonsense up with which I will not put." },
  { name: "Hyperbole", def: "Extreme exaggeration for emphasis.", eg: "I've told you a million times!" },
  { name: "Irony", def: "Contrast between expectation and reality.", eg: "A pilot has a fear of heights." },
  { name: "Litotes", def: "Understatement by using double negatives.", eg: "He is not the brightest bulb in the box." },
  { name: "Metaphor", def: "Direct comparison without using 'like' or 'as'.", eg: "Life is a roller coaster." },
  { name: "Metonymy", def: "Replacing a name with something closely associated.", eg: "The White House issued a statement (meaning the President)." },
  { name: "Onomatopoeia", def: "Words that imitate sounds.", eg: "The bees buzzed; the clock ticked." },
  { name: "Oxymoron", def: "Two contradictory terms used together.", eg: "Original copy; bittersweet." },
  { name: "Paradox", def: "A statement that seems contradictory but reveals a truth.", eg: "This is the beginning of the end." },
  { name: "Personification", def: "Giving human qualities to non-human things.", eg: "The stars winked at us." },
  { name: "Pleonasm", def: "Use of more words than necessary.", eg: "I saw it with my own eyes." },
  { name: "Polysyndeton", def: "Use of many conjunctions for effect.", eg: "He ran and jumped and laughed and cried." },
  { name: "Pun", def: "A play on words with multiple meanings or similar sounds.", eg: "I was wondering why the ball was getting bigger. Then it hit me." },
  { name: "Rhetorical Question", def: "A question asked for effect, not for an answer.", eg: "Do you want to be a failure for the rest of your life?" },
  { name: "Simile", def: "Comparison using 'like' or 'as'.", eg: "He is as brave as a lion." },
  { name: "Synecdoche", def: "A part used to represent the whole.", eg: "All hands on deck (meaning the whole crew)." },
  { name: "Tautology", def: "Saying the same thing twice in different words.", eg: "It's free of charge." },
  { name: "Understatement", def: "Presenting something as less important than it is.", eg: "It's just a flesh wound (after losing an arm)." },
  { name: "Zeugma", def: "A word applies to two others in different senses.", eg: "He took his hat and his leave." },
].sort((a, b) => a.name.localeCompare(b.name));

const HOMONYMS = [
  { w1: "Accept", m1: "To receive", w2: "Except", m2: "Excluding" },
  { w1: "Affect", m1: "To impact (verb)", w2: "Effect", m2: "The result (noun)" },
  { w1: "Altar", m1: "Sacred table in a church", w2: "Alter", m2: "To change" },
  { w1: "Ascent", m1: "A climb/upward path", w2: "Assent", m2: "Agreement" },
  { w1: "Bare", m1: "Uncovered", w2: "Bear", m2: "Large animal / To carry" },
  { w1: "Berth", m1: "A sleeping place in a train/ship", w2: "Birth", m2: "Coming into life" },
  { w1: "Brake", m1: "To stop a vehicle", w2: "Break", m2: "To shatter / A rest" },
  { w1: "Canvas", m1: "Strong cloth", w2: "Canvass", m2: "To seek votes/opinions" },
  { w1: "Complement", m1: "Enhances or completes", w2: "Compliment", m2: "Praise" },
  { w1: "Council", m1: "Advisory group", w2: "Counsel", m2: "Advice or a lawyer" },
  { w1: "Desert", m1: "Arid land", w2: "Dessert", m2: "Sweet dish" },
  { w1: "Dual", m1: "Twofold", w2: "Duel", m2: "A formal fight" },
  { w1: "Elicit", m1: "To draw out a response", w2: "Illicit", m2: "Illegal" },
  { w1: "Fair", m1: "Just or beautiful", w2: "Fare", m2: "Price of travel" },
  { w1: "Loose", m1: "Not tight", w2: "Lose", m2: "To be deprived of something" },
  { w1: "Peace", m1: "Calmness", w2: "Piece", m2: "A portion" },
  { w1: "Principal", m1: "Head of school", w2: "Principle", m2: "Fundamental rule" },
  { w1: "Quiet", m1: "Silent", w2: "Quite", m2: "Completely or very" },
  { w1: "Sight", m1: "Vision", w2: "Site", m2: "Location" },
  { w1: "Stationary", m1: "Not moving", w2: "Stationery", m2: "Writing materials" },
  { w1: "Weak", m1: "Not strong", w2: "Week", m2: "Seven days" },
  { w1: "Weather", m1: "Atmospheric state", w2: "Whether", m2: "If / Choice" },
  { w1: "Advice", m1: "A suggestion (noun)", w2: "Advise", m2: "To give a suggestion (verb)" },
  { w1: "Allowed", m1: "Permitted", w2: "Aloud", m2: "Out loud" },
  { w1: "Board", m1: "A piece of wood / To get on", w2: "Bored", m2: "Uninterested" },
  { w1: "By", m1: "Near / Through", w2: "Buy", m2: "To purchase" },
  { w1: "Cell", m1: "Small room / Basic unit", w2: "Sell", m2: "To exchange for money" },
  { w1: "Cite", m1: "To quote", w2: "Site", m2: "Place or location" },
  { w1: "Coarse", m1: "Rough in texture", w2: "Course", m2: "Path or direction / A subject" },
  { w1: "Deer", m1: "Animal", w2: "Dear", m2: "Beloved / Expensive" },
  { w1: "Die", m1: "To stop living", w2: "Dye", m2: "To color" },
  { w1: "Feat", m1: "An achievement", w2: "Feet", m2: "Plural of foot" },
  { w1: "Flour", m1: "Powder for baking", w2: "Flower", m2: "Part of a plant" },
  { w1: "For", m1: "Because of / In favor of", w2: "Four", m2: "The number 4" },
  { w1: "Grate", m1: "To shred / Metal frame", w2: "Great", m2: "Large / Excellent" },
  { w1: "Hair", m1: "On the head", w2: "Hare", m2: "Fast animal like a rabbit" },
  { w1: "Heal", m1: "To cure", w2: "Heel", m2: "Back of the foot" },
  { w1: "Hear", m1: "To listen", w2: "Here", m2: "In this place" },
  { w1: "Heard", m1: "Past of hear", w2: "Herd", m2: "Group of animals" },
  { w1: "Hole", m1: "An opening", w2: "Whole", m2: "Entire" },
  { w1: "Hour", m1: "60 minutes", w2: "Our", m2: "Belonging to us" },
  { w1: "Idle", m1: "Inactive", w2: "Idol", m2: "A statue / Person of worship" },
  { w1: "Knew", m1: "Past of know", w2: "New", m2: "Recent" },
  { w1: "Knight", m1: "Medieval warrior", w2: "Night", m2: "Time of darkness" },
  { w1: "Know", m1: "To understand", w2: "No", m2: "Negative response" },
  { w1: "Lead", m1: "Metal (noun)", w2: "Led", m2: "Past of lead (verb)" },
  { w1: "Mail", m1: "Post", w2: "Male", m2: "Man" },
  { w1: "Meat", m1: "Flesh of an animal", w2: "Meet", m2: "To encounter" },
  { w1: "Medal", m1: "An award", w2: "Meddle", m2: "To interfere" },
  { w1: "Morning", m1: "Early part of the day", w2: "Mourning", m2: "Grief after death" },
  { w1: "One", m1: "The number 1", w2: "Won", m2: "Past of win" },
  { w1: "Pail", m1: "A bucket", w2: "Pale", m2: "Light in color" },
  { w1: "Pain", m1: "Physical suffering", w2: "Pane", m2: "Sheet of glass" },
  { w1: "Pair", m1: "Two of a kind", w2: "Pear", m2: "A fruit" },
  { w1: "Passed", m1: "Past of pass", w2: "Past", m2: "Time gone by" },
  { w1: "Plain", m1: "Simple / Flat land", w2: "Plane", m2: "Airplane / Flat surface" },
  { w1: "Pray", m1: "To talk to God", w2: "Prey", m2: "Hunted animal" },
  { w1: "Rain", m1: "Water from sky", w2: "Reign", m2: "Rule of a monarch" },
  { w1: "Read", m1: "To scan text", w2: "Reed", m2: "Tall grass" },
  { w1: "Right", m1: "Correct / Direction", w2: "Write", m2: "To mark words" },
  { w1: "Road", m1: "Path for vehicles", w2: "Rode", m2: "Past of ride" },
  { w1: "Root", m1: "Base of a plant", w2: "Route", m2: "A path or way" },
  { w1: "Sail", m1: "To travel on water", w2: "Sale", m2: "Transaction of selling" },
  { w1: "Sea", m1: "Large body of salt water", w2: "See", m2: "To look" },
  { w1: "Sew", m1: "To stitch", w2: "So", m2: "Therefore" },
  { w1: "Stair", m1: "A step", w2: "Stare", m2: "To look intensely" },
  { w1: "Steal", m1: "To take without permission", w2: "Steel", m2: "A strong metal" },
  { w1: "Tail", m1: "End of an animal", w2: "Tale", m2: "A story" },
  { w1: "Threw", m1: "Past of throw", w2: "Through", m2: "From one side to other" },
  { w1: "To", m1: "Direction marker", w2: "Too", m2: "Also / Excessive" },
  { w1: "Waist", m1: "Part of the body", w2: "Waste", m2: "Useless material / To misuse" },
  { w1: "Wait", m1: "To stay in anticipation", w2: "Weight", m2: "Heaviness" },
  { w1: "Ware", m1: "Goods or items", w2: "Wear", m2: "To have on body" },
  { w1: "Which", m1: "Asking for choice", w2: "Witch", m2: "Person with magic" },
  { w1: "Wood", m1: "Material from trees", w2: "Would", m2: "Past of will" },
  { w1: "Your", m1: "Belonging to you", w2: "You're", m2: "Contraction of you are" },
  { w1: "Heir", m1: "Inheritor", w2: "Air", m2: "Atmosphere" },
  { w1: "Berry", m1: "Small fruit", w2: "Bury", m2: "To put in ground" },
  { w1: "Blue", m1: "The color", w2: "Blew", m2: "Past of blow" },
  { w1: "Bore", m1: "To drill / Not interesting", w2: "Boar", m2: "Wild pig" },
  { w1: "Chew", m1: "To grind with teeth", w2: "Choose", m2: "To pick" },
  { w1: "Days", m1: "24-hour periods", w2: "Daze", m2: "Stunned state" },
  { w1: "Done", m1: "Finished", w2: "Dun", m2: "Grayish-brown color" },
  { w1: "Ewe", m1: "Female sheep", w2: "You", m2: "The second person" },
  { w1: "Eye", m1: "Organ of sight", w2: "I", m2: "First person pronoun" },
  { w1: "Flea", m1: "Biting insect", w2: "Flee", m2: "To run away" },
  { w1: "Foul", m1: "Dirty / Unfair", w2: "Fowl", m2: "A bird" },
  { w1: "Gait", m1: "Way of walking", w2: "Gate", m2: "Entrance door" },
  { w1: "Gilt", m1: "Covered in gold", w2: "Guilt", m2: "Feeling of blame" },
  { w1: "Gnaw", m1: "To bite steadily", w2: "Know", m2: "To be aware" },
  { w1: "Groan", m1: "Moan in pain", w2: "Grown", m2: "Fully developed" },
  { w1: "Hail", m1: "Ice from sky", w2: "Hale", m2: "Strong and healthy" },
  { w1: "Hall", m1: "Corridor", w2: "Haul", m2: "To pull or drag" },
  { w1: "Heed", m1: "Pay attention", w2: "He'd", m2: "Contraction of he would" },
  { w1: "Hi", m1: "Greeting", w2: "High", m2: "Tall / Upward" },
  { w1: "Hire", m1: "To employ", w2: "Higher", m2: "More elevated" },
  { w1: "Hoarse", m1: "Rough voice", w2: "Horse", m2: "Equine animal" },
  { w1: "Inn", m1: "A small hotel", w2: "In", m2: "Inside" },
  { w1: "Its", m1: "Belonging to it", w2: "It's", m2: "Contraction of it is" },
  { w1: "Jam", m1: "Fruit spread / Stuck", w2: "Jamb", m2: "Side of a door" },
  { w1: "Knead", m1: "Work dough", w2: "Need", m2: "Necessity" },
  { w1: "Knot", m1: "Tied string", w2: "Not", m2: "Negative" },
  { w1: "Lain", m1: "Past participle of lie", w2: "Lane", m2: "Narrow road" },
  { w1: "Lax", m1: "Careless", w2: "Lacks", m2: "Does not have" },
  { w1: "Leek", m1: "Type of onion", w2: "Leak", m2: "Escape of fluid" },
  { w1: "Lesson", m1: "Unit of study", w2: "Lessen", m2: "To reduce" },
  { w1: "Lie", m1: "To recline / Untruth", w2: "Lye", m2: "Strong chemical" },
  { w1: "Links", m1: "Connections", w2: "Lynx", m2: "Wild cat" },
  { w1: "Loan", m1: "Borrowed money", w2: "Lone", m2: "Single" },
  { w1: "Maid", m1: "Female servant", w2: "Made", m2: "Past of make" },
  { w1: "Main", m1: "Most important", w2: "Mane", m2: "Hair on neck of lion/horse" },
  { w1: "Maze", m1: "Labyrinth", w2: "Maize", m2: "Corn" },
  { w1: "Minor", m1: "Underage", w2: "Miner", m2: "Worker in a mine" },
  { w1: "Mist", m1: "Light fog", w2: "Missed", m2: "Failed to catch/see" },
  { w1: "Navel", m1: "Belly button", w2: "Naval", m2: "Relating to ships" },
  { w1: "None", m1: "Not any", w2: "Nun", m2: "Religious woman" },
  { w1: "Oar", m1: "Paddle", w2: "Ore", m2: "Metal-bearing rock" },
  { w1: "Our", m1: "Belonging to us", w2: "Hour", m2: "Unit of time" },
  { w1: "Pale", m1: "White / Light color", w2: "Pail", m2: "Bucket" },
  { w1: "Pane", m1: "Window glass", w2: "Pain", m2: "Ache" },
  { w1: "Peak", m1: "Top of mountain", w2: "Peek", m2: "Secret look" },
  { w1: "Peel", m1: "Skin of fruit", w2: "Peal", m2: "Loud sound of bells" },
  { w1: "Pier", m1: "Structure into water", w2: "Peer", m2: "A look / An equal" },
  { w1: "Plum", m1: "Type of fruit", w2: "Plumb", m2: "To measure depth" },
  { w1: "Pole", m1: "Long rod", w2: "Poll", m2: "A survey" },
  { w1: "Pore", m1: "Tiny opening / To study", w2: "Poor", m2: "Lacking money" },
  { w1: "Presents", m1: "Gifts", w2: "Presence", m2: "State of being here" },
  { w1: "Profit", m1: "Financial gain", w2: "Prophet", m2: "Spiritual leader" },
  { w1: "Rain", m1: "Water from clouds", w2: "Rein", m2: "Control for horse" },
  { w1: "Raise", m1: "To lift", w2: "Rays", m2: "Beams of light" },
  { w1: "Read", m1: "To interpret text", w2: "Red", m2: "The color" },
  { w1: "Real", m1: "Actual", w2: "Reel", m2: "Cylinder for winding" },
  { w1: "Review", m1: "To examine again", w2: "Revue", m2: "Theatrical show" },
  { w1: "Right", m1: "Correct / Not left", w2: "Rite", m2: "Ceremony" },
  { w1: "Ring", m1: "Circle / Sound", w2: "Wring", m2: "To twist" },
  { w1: "Role", m1: "Part in a play", w2: "Roll", m2: "To turn / Bread unit" },
  { w1: "Rough", m1: "Not smooth", w2: "Ruff", m2: "Frilled collar" },
  { w1: "Sale", m1: "Selling of goods", w2: "Sail", m2: "Canvas on ship" },
  { w1: "Scene", m1: "Setting", w2: "Seen", m2: "Past of see" },
  { w1: "Some", m1: "An amount", w2: "Sum", m2: "Total" },
  { w1: "Son", m1: "Male child", w2: "Sun", m2: "The star" },
  { w1: "Sole", m1: "Bottom of foot / Only", w2: "Soul", m2: "Spiritual part" },
  { w1: "Stake", m1: "Post in ground / Risk", w2: "Steak", m2: "Slice of meat" },
  { w1: "Steel", m1: "Metal alloy", w2: "Steal", m2: "To thieve" },
  { w1: "Sun", m1: "The star", w2: "Son", m2: "Male child" },
  { w1: "Tail", m1: "End of animal", w2: "Tale", m2: "Story" },
  { w1: "Team", m1: "Group of people", w2: "Teem", m2: "To swarm" },
  { w1: "Their", m1: "Belonging to them", w2: "There", m2: "In that place" },
  { w1: "Threw", m1: "Past of throw", w2: "Through", m2: "By way of" },
  { w1: "Time", m1: "Progression of events", w2: "Thyme", m2: "Herb" },
  { w1: "Told", m1: "Past of tell", w2: "Tolled", m2: "Past of toll (bell)" },
  { w1: "Tow", m1: "To pull", w2: "Toe", m2: "Digit of foot" },
  { w1: "Two", m1: "Number 2", w2: "Too", m2: "Excessive / Also" },
  { w1: "Vain", m1: "Conceited / Unsuccessful", w2: "Vane", m2: "Weather blade" },
  { w1: "Vein", m1: "Blood vessel", w2: "Vain", m2: "Conceited" },
  { w1: "Vice", m1: "Bad habit", w2: "Vise", m2: "Gripping tool" },
  { w1: "Wait", m1: "Stay expecting", w2: "Weight", m2: "Heaviness" },
  { w1: "War", m1: "Conflict", w2: "Wore", m2: "Past of wear" },
  { w1: "Waste", m1: "Trash / Misuse", w2: "Waist", m2: "Middle of body" },
  { w1: "Wave", m1: "Gesture / Water surge", w2: "Waive", m2: "To give up rights" },
  { w1: "Wear", m1: "To have on", w2: "Where", m2: "In what place" },
  { w1: "Weather", m1: "Climate state", w2: "Whether", m2: "Choice indicator" },
  { w1: "Week", m1: "7 days", w2: "Weak", m2: "Lacking strength" },
  { w1: "Wet", m1: "Soaked", w2: "Whet", m2: "To sharpen" },
  { w1: "Which", m1: "Which one", w2: "Witch", m2: "Sorceress" },
  { w1: "Wine", m1: "Alcoholic drink", w2: "Whine", m2: "High-pitched cry" },
  { w1: "Wood", m1: "Timber", w2: "Would", m2: "Auxiliary verb" },
  { w1: "Write", m1: "Mark words", w2: "Right", m2: "Correct" },
  { w1: "Yoke", m1: "Wooden beam for oxen", w2: "Yolk", m2: "Yellow of egg" },
  { w1: "You're", m1: "You are", w2: "Your", m2: "Belonging to you" },
].sort((a, b) => a.w1.localeCompare(b.w1));

const PROVERBS = [
  { p: "A bird in the hand is worth two in the bush", m: "What you have for certain is better than risking it for more." },
  { p: "A chain is only as strong as its weakest link", m: "A group is only as strong as its most vulnerable member." },
  { p: "A drowning man will clutch at a straw", m: "A desperate person will try anything, no matter how unlikely." },
  { p: "A fool and his money are soon parted", m: "Foolish people spend their money unwisely." },
  { p: "A journey of a thousand miles begins with a single step", m: "Big tasks start with small actions." },
  { p: "A leopard cannot change its spots", m: "People cannot change their basic nature." },
  { p: "A penny saved is a penny earned", m: "Saving money is as good as making it." },
  { p: "A picture is worth a thousand words", m: "A visual image can convey complex ideas more effectively than text." },
  { p: "A rolling stone gathers no moss", m: "Someone who is always moving doesn't accumulate responsibilities or wealth." },
  { p: "A stitch in time saves nine", m: "Dealing with a problem early prevents it from becoming larger." },
  { p: "Actions speak louder than words", m: "What people do is more significant than what they say." },
  { p: "Adversity makes strange bedfellows", m: "In difficult times, people who are very different often cooperate." },
  { p: "All good things must come to an end", m: "Pleasant experiences eventually finish." },
  { p: "All that glitters is not gold", m: "Not everything that looks valuable actually is." },
  { p: "All's well that ends well", m: "If the final result is good, earlier problems don't matter." },
  { p: "An apple a day keeps the doctor away", m: "Eating healthy prevents illness." },
  { p: "An empty vessel makes much noise", m: "Foolish or ignorant people talk the most." },
  { p: "As you sow, so shall you reap", m: "Your actions determine your consequences." },
  { p: "Barking dogs seldom bite", m: "People who make big threats rarely act on them." },
  { p: "Beauty is in the eye of the beholder", m: "Different people have different ideas about what is beautiful." },
  { p: "Beggars cannot be choosers", m: "If you ask for help, you must accept what is offered." },
  { p: "Better late than never", m: "It's better to do something late than not at all." },
  { p: "Better safe than sorry", m: "Be cautious rather than taking unnecessary risks." },
  { p: "Birds of a feather flock together", m: "People with similar interests tend to spend time together." },
  { p: "Blood is thicker than water", m: "Family relationships are more important than others." },
  { p: "Charity begins at home", m: "You should help your family and friends before helping others." },
  { p: "Cleanliness is next to godliness", m: "Being clean is a very important virtue." },
  { p: "Curiosity killed the cat", m: "Being too inquisitive can lead to trouble." },
  { p: "Don't bite the hand that feeds you", m: "Don't act badly toward someone who helps you." },
  { p: "Don't count your chickens before they hatch", m: "Don't assume success until it actually happens." },
  { p: "Don't judge a book by its cover", m: "Don't form an opinion based only on appearance." },
  { p: "Don't put all your eggs in one basket", m: "Don't risk everything on a single venture." },
  { p: "Early bird catches the worm", m: "Starting early gives you an advantage." },
  { p: "Every cloud has a silver lining", m: "Every difficult situation has a positive side." },
  { p: "Every dog has its day", m: "Everyone will eventually have success or luck." },
  { p: "Failure is the stepping stone to success", m: "You learn and grow from your mistakes." },
  { p: "Fortune favors the bold", m: "Brave people are often lucky." },
  { p: "God helps those who help themselves", m: "Success comes to those who take action." },
  { p: "Great minds think alike", m: "Intelligent people often have the same ideas." },
  { p: "Haste makes waste", m: "Doing things too quickly leads to mistakes." },
  { p: "Honesty is the best policy", m: "Telling the truth is always the right choice." },
  { p: "If it ain't broke, don't fix it", m: "Don't try to improve something that is working well." },
  { p: "Ignorance is bliss", m: "Not knowing about a problem can make you happier." },
  { p: "It's no use crying over spilt milk", m: "Don't worry about things that have already happened." },
  { p: "Knowledge is power", m: "The more you know, the more influential you are." },
  { p: "Laughter is the best medicine", m: "Being happy helps you feel better." },
  { p: "Look before you leap", m: "Think about the consequences before taking action." },
  { p: "Make hay while the sun shines", m: "Take advantage of opportunities when they arise." },
  { p: "Necessity is the mother of invention", m: "Difficulties lead to new ideas." },
  { p: "No pain, no gain", m: "Hard work is necessary for success." },
  { p: "Out of sight, out of mind", m: "You forget about things that are not around you." },
  { p: "Practice makes perfect", m: "Doing something repeatedly makes you better at it." },
  { p: "Prevention is better than cure", m: "It's easier to stop a problem than fix it later." },
  { p: "Rome was not built in a day", m: "Important work takes time to complete." },
  { p: "The grass is always greener on the other side", m: "Other people's lives always seem better than your own." },
  { p: "The pen is mightier than the sword", m: "Writing and ideas are more influential than physical force." },
  { p: "Time heals all wounds", m: "Painful feelings eventually fade with time." },
  { p: "Two heads are better than one", m: "Collaborating leads to better solutions." },
  { p: "When in Rome, do as the Romans do", m: "Follow the customs of the place you are visiting." },
  { p: "Where there's a will, there's a way", m: "If you are determined, you will find success." },
  { p: "You can't have your cake and eat it too", m: "You can't have two conflicting things at once." },
  { p: "A bad workman always blames his tools", m: "Incompetent people never admit their own faults." },
  { p: "Absence makes the heart grow fonder", m: "You value things more when they are away." },
  { p: "Actions speak louder than words", m: "What you do is more important than what you say." },
  { p: "Better late than never", m: "It's better to arrive late than not at all." },
  { p: "Birds of a feather flock together", m: "Similar people like to be with each other." },
  { p: "Blood is thicker than water", m: "Family loyalty is very strong." },
  { p: "Don't judge a book by its cover", m: "Appearance isn't everything." },
  { p: "Early bird catches the worm", m: "Success comes to those who act early." },
  { p: "Every dog has its day", m: "Everyone has a time of success." },
  { p: "Great minds think alike", m: "Smart people have similar ideas." },
  { p: "Haste makes waste", m: "Rushing leads to errors." },
  { p: "Ignorance is bliss", m: "Sometimes it's better not to know." },
  { p: "Laughter is the best medicine", m: "Being happy helps health." },
  { p: "Look before you leap", m: "Consider risks first." },
  { p: "Make hay while the sun shines", m: "Use opportunities well." },
  { p: "Necessity is the mother of invention", m: "Need drives innovation." },
  { p: "Out of sight, out of mind", m: "We forget what we don't see." },
  { p: "Practice makes perfect", m: "Repetition brings skill." },
  { p: "Rome wasn't built in a day", m: "Achievement takes time." },
  { p: "Too many cooks spoil the broth", m: "Too many people working on one thing can ruin it." },
  { p: "Where there's a will, there's a way", m: "Determination leads to solutions." },
  { p: "You can't judge a book by its cover", m: "Looks can be deceiving." },
  { p: "All that glitters is not gold", m: "Appearance is not always reality." },
  { p: "An idle brain is the devil's workshop", m: "When you have nothing to do, you get into trouble." },
  { p: "Barking dogs seldom bite", m: "Threatening people rarely act." },
  { p: "Empty vessels make the most noise", m: "Ignorant people talk the loudest." },
  { p: "God helps those who help themselves", m: "Self-effort is key to success." },
  { p: "Knowledge is power", m: "Education gives you influence." },
  { p: "Prevention is better than cure", m: "Stopping a problem is better than fixing it." },
  { p: "Slow and steady wins the race", m: "Consistent effort is better than fast bursts." },
  { p: "The pen is mightier than the sword", m: "Ideas change the world more than force." },
  { p: "Time is money", m: "Don't waste time; it is valuable." },
  { p: "Variety is the spice of life", m: "New experiences make life interesting." },
  { p: "Waste not, want not", m: "Don't waste, and you won't be in need." },
  { p: "Watch the pennies and the pounds will take care of themselves", m: "Save small amounts, and you'll accumulate a lot." },
  { p: "You can't lead a horse to water but you can't make it drink", m: "You can give opportunity, but you can't force action." },
  { p: "Still waters run deep", m: "Quiet people often have deep thoughts." },
  { p: "The best things in life are free", m: "True happiness doesn't cost money." },
  { p: "The early bird catches the worm", m: "Early action leads to success." },
  { p: "The squeaky wheel gets the grease", m: "The one who complains gets attention." },
  { p: "There's no place like home", m: "Nowhere is as comfortable as your own house." },
  { p: "Tomorrow is another day", m: "You can always start fresh in the future." },
  { p: "Truth is stranger than fiction", m: "Real life is often more unbelievable than stories." },
  { p: "Two wrongs don't make a right", m: "Doing something bad in return for something bad is not helpful." },
  { p: "United we stand, divided we fall", m: "Cooperation is strength; division is weakness." },
  { p: "Wait for the dust to settle", m: "Wait for a situation to become clear before acting." },
  { p: "Walk a mile in someone else's shoes", m: "Try to understand someone's perspective before judging." },
  { p: "Water under the bridge", m: "Past events that cannot be changed." },
  { p: "Well begun is half done", m: "A good start makes a task much easier." },
  { p: "What goes around comes around", m: "Your actions will eventually affect you." },
  { p: "When the going gets tough, the tough get going", m: "Strong people take action in difficult times." },
  { p: "Where there's a will, there's a way", m: "If you are determined, you will find success." },
  { p: "Winning isn't everything, it's the only thing", m: "Success is the most important goal." },
  { p: "You are what you eat", m: "Healthy food makes a healthy body." },
  { p: "You can't make an omelette without breaking eggs", m: "To achieve something, you must risk or sacrifice something." },
  { p: "You get what you pay for", m: "Cheap things are often low quality." },
  { p: "Youth is wasted on the young", m: "Young people don't always appreciate their vitality." },
  { p: "Zero hour", m: "The time when a vital operation is set to begin." }
].sort((a, b) => a.p.localeCompare(b.p));

export default function MatchPage() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-5xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 4 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Match Proficiency</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Elite repository of Idioms, Figures of Speech, Homonyms, and Proverbs. Master these to secure full marks in Section 4.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/match-the-following/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Tabs defaultValue="idioms" className="w-full">
              <TabsList className="grid w-full grid-cols-4 h-12 bg-muted/50 p-1 rounded-xl">
                <TabsTrigger value="idioms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Idioms</TabsTrigger>
                <TabsTrigger value="figures" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Figures</TabsTrigger>
                <TabsTrigger value="homonyms" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Homonyms</TabsTrigger>
                <TabsTrigger value="proverbs" className="rounded-lg data-[state=active]:bg-white data-[state=active]:text-primary font-bold">Proverbs</TabsTrigger>
              </TabsList>

              <TabsContent value="idioms" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-2xl border-none">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                      <MessageCircle className="w-5 h-5" />
                      Elite Idioms Repository
                    </CardTitle>
                    <CardDescription className="text-primary/70 font-medium">Over 100 high-yield idioms for Code 101.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <Table>
                        <TableHeader className="bg-muted/30 sticky top-0 z-10">
                          <TableRow>
                            <TableHead className="text-foreground font-bold py-4 pl-8">Idiom</TableHead>
                            <TableHead className="text-foreground font-bold">Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {IDIOMS.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                              <TableCell className="font-bold text-primary py-4 pl-8">{item.idiom}</TableCell>
                              <TableCell className="text-xs text-muted-foreground font-medium pr-8">{item.meaning}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="figures" className="mt-8">
                <ScrollArea className="h-[600px] pr-4">
                  <div className="grid gap-4">
                    {FIGURES.map((item, i) => (
                      <Card key={i} className="border-none shadow-sm bg-white rounded-2xl hover:shadow-md transition-shadow">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg text-primary font-bold">{item.name}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm font-medium text-foreground">{item.def}</p>
                          <div className="mt-3 p-3 bg-primary/5 rounded-xl border border-primary/10">
                            <p className="text-xs text-muted-foreground italic font-bold">Example: <span className="text-primary">{item.eg}</span></p>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="homonyms" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-2xl border-none">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                      <Star className="w-5 h-5" />
                      Elite Homonyms Repository
                    </CardTitle>
                    <CardDescription className="text-primary/70 font-medium">Over 150 critical word pairs for Subject Code 101.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <div className="grid md:grid-cols-2 gap-px bg-border">
                        {HOMONYMS.map((item, i) => (
                          <div key={i} className="p-5 bg-white space-y-3 hover:bg-primary/5 transition-colors">
                            <div className="flex justify-between items-start gap-4">
                              <div className="flex flex-col">
                                <span className="font-bold text-primary text-base">{item.w1}</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.m1}</span>
                              </div>
                              <Info className="w-3 h-3 text-primary/30 shrink-0 mt-1" />
                            </div>
                            <div className="flex justify-between items-start gap-4 border-t pt-3">
                              <div className="flex flex-col">
                                <span className="font-bold text-accent text-base">{item.w2}</span>
                                <span className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.m2}</span>
                              </div>
                              <Sparkles className="w-3 h-3 text-accent/30 shrink-0 mt-1" />
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="proverbs" className="mt-8">
                <Card className="shadow-sm overflow-hidden rounded-2xl border-none">
                  <CardHeader className="bg-primary/5">
                    <CardTitle className="flex items-center gap-2 text-primary font-bold">
                      <BookOpen className="w-5 h-5" />
                      Hundreds of Elite Proverbs
                    </CardTitle>
                    <CardDescription className="text-primary/70 font-medium">Clinical repository of CUET-standard proverbs and meanings.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0 bg-white">
                    <ScrollArea className="h-[600px]">
                      <Table>
                        <TableHeader className="bg-muted/30 sticky top-0 z-10">
                          <TableRow>
                            <TableHead className="text-foreground font-bold py-4 pl-8">Proverb</TableHead>
                            <TableHead className="text-foreground font-bold">Meaning</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {PROVERBS.map((item, i) => (
                            <TableRow key={i} className="hover:bg-primary/5 transition-colors">
                              <TableCell className="font-bold text-primary py-4 pl-8">{item.p}</TableCell>
                              <TableCell className="text-xs text-muted-foreground font-medium pr-8">{item.m}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>

            <Card className="bg-primary/10 border-none shadow-sm rounded-2xl relative overflow-hidden">
              <div className="absolute right-0 top-0 p-4 opacity-5">
                <Star className="w-24 h-24 text-primary" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                  <Star className="w-5 h-5" />
                  Elite Deduction Strategy
                </CardTitle>
                <CardDescription className="text-primary/70 font-medium">The CUET Match section is designed for elimination. Use it to your advantage.</CardDescription>
              </CardHeader>
              <CardContent className="grid md:grid-cols-2 gap-4">
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <div className="text-xs font-bold text-primary uppercase mb-1">Rule of 100%</div>
                  <p className="text-sm font-medium leading-relaxed">Match the items you are absolutely certain about first. This often eliminates 2-3 trap options immediately.</p>
                </div>
                <div className="p-4 bg-white rounded-xl shadow-sm border border-primary/10">
                  <div className="text-xs font-bold text-primary uppercase mb-1">Contextual Clues</div>
                  <p className="text-sm font-medium leading-relaxed">Proverbs and idioms are figurative. If a literal option is provided, it's almost always a trap.</p>
                </div>
              </CardContent>
            </Card>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <Card className="bg-foreground text-background shadow-xl rounded-2xl border-none">
              <CardHeader>
                <CardTitle className="text-lg text-primary flex items-center gap-2 font-bold">
                  <Lightbulb className="w-5 h-5" />
                  Quick Tips
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm font-medium text-background/80">
                <p>Idioms and proverbs carry cultural wisdom; they are never literal.</p>
                <p>Figures of Speech require you to identify the <strong>intent</strong> behind the comparison.</p>
                <p className="text-primary font-bold italic">"Accuracy maintains your cool. Every correct match is +5."</p>
              </CardContent>
            </Card>
            
            <Card className="bg-white border-primary/20 shadow-sm rounded-2xl">
              <CardHeader>
                <CardTitle className="text-lg text-foreground font-bold">Daily Protocol</CardTitle>
                <CardDescription>Master 5 homonyms every morning.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {[
                  "Affect vs Effect",
                  "Principal vs Principle",
                  "Stationary vs Stationery",
                  "Elicit vs Illicit",
                  "Complement vs Compliment",
                  "Council vs Counsel"
                ].map((p, i) => (
                  <div key={i} className="flex gap-2 text-xs font-bold text-foreground/80 p-2 hover:bg-primary/5 rounded-lg transition-colors">
                    <Sparkles className="w-3 h-3 text-primary shrink-0 mt-0.5" />
                    {p}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Button className="w-full h-14 rounded-2xl font-bold shadow-lg text-lg" asChild>
              <Link href="/quiz">Start Full Practice Set</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
