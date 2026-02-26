
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, MessageCircle, Info, Keyboard, ArrowRight, CheckCircle2, XCircle, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  q: string
  options: string[]
  correct: number | number[]
  explanation: string
}

const MATCH_QUIZ_DATA: Question[] = [
  // Set 1
  { id: 1, q: "Meaning of the idiom 'Turn a blind eye':", options: ["To look carefully", "To deliberately ignore something wrong", "To be physically impaired", "To close one eye while aiming"], correct: 1, explanation: "Intentionally ignoring something wrong or unpleasant." },
  { id: 2, q: "Meaning of 'A stitch in time saves nine':", options: ["Sewing quickly", "Nine stitches are better", "Dealing with a small problem early prevents it growing", "Time is valuable"], correct: 2, explanation: "Fixing a small issue early prevents a larger one later." },
  { id: 3, q: "Meaning of 'At the eleventh hour':", options: ["Exactly at 11:00", "At the last possible moment", "Too early", "Important time"], correct: 1, explanation: "Doing something at the very last moment." },
  { id: 4, q: "Figure of speech in 'Time is a thief':", options: ["Simile", "Metaphor", "Oxymoron", "Onomatopoeia"], correct: 1, explanation: "Direct comparison between Time and a Thief." },
  { id: 5, q: "Example of an Oxymoron:", options: ["Deafening silence", "Fast as wind", "Life is a journey", "Tick-tock"], correct: 0, explanation: "Combining contradictory terms like 'Deafening' and 'Silence'." },
  { id: 6, q: "Meaning of 'Bite the bullet':", options: ["Accept something unpleasant bravely", "Refuse a risk", "Speak aggressively", "Eat something dangerous"], correct: 0, explanation: "Enduring a painful situation with courage." },
  { id: 7, q: "Meaning of 'Small talk':", options: ["Talk of children", "Polite conversation about unimportant things", "Brief discussion", "Gossip"], correct: 1, explanation: "Social conversation about minor topics to build rapport." },
  { id: 8, q: "Figure of speech in 'The pen is mightier than the sword':", options: ["Pun", "Metaphor", "Metonymy", "Irony"], correct: 2, explanation: "Replacing a name with something associated (Pen for communication, Sword for force)." },
  { id: 9, q: "Meaning of 'Bolt from the blue':", options: ["Lightning strike", "A total surprise", "Clear sky", "Electric shock"], correct: 1, explanation: "A sudden and unexpected event." },
  { id: 10, q: "Meaning of 'Apple of one's eye':", options: ["A favourite fruit", "Someone very precious", "Good vision", "Healthy diet"], correct: 1, explanation: "Someone very dear or precious to another." },
  // Set 2
  { id: 11, q: "Meaning of 'Back to square one':", options: ["Return to start", "Win a game", "Move forward", "Make a square"], correct: 0, explanation: "Starting over after a failed attempt." },
  { id: 12, q: "Meaning of 'Beat around the bush':", options: ["Hunting", "Avoid the main issue", "Gardening", "Clear path"], correct: 1, explanation: "Avoiding speaking directly about something." },
  { id: 13, q: "Meaning of 'Burn the midnight oil':", options: ["Lighting a lamp", "Work late into the night", "Wasting oil", "Cooking"], correct: 1, explanation: "Working or studying late at night." },
  { id: 14, q: "Figure of speech in 'I've told you a million times':", options: ["Simile", "Hyperbole", "Pun", "Alliteration"], correct: 1, explanation: "Deliberate exaggeration for emphasis." },
  { id: 15, q: "Meaning of 'Cry over spilt milk':", options: ["Clean the mess", "Complain about unchangeable past events", "Dairy farm", "Sad news"], correct: 1, explanation: "Worrying about something that has already happened." },
  { id: 16, q: "Meaning of 'Piece of cake':", options: ["Baking", "Something very easy", "Small portion", "Celebration"], correct: 1, explanation: "An easy task." },
  { id: 17, q: "Meaning of 'Under the weather':", options: ["Rainy day", "Feeling slightly ill", "Climate change", "Shelter"], correct: 1, explanation: "Feeling sick or unwell." },
  { id: 18, q: "Figure of speech in 'The stars winked at us':", options: ["Personification", "Simile", "Oxymoron", "Alliteration"], correct: 0, explanation: "Giving human qualities (winking) to non-human things (stars)." },
  { id: 19, q: "Meaning of 'Once in a blue moon':", options: ["Astronomy", "Very rarely", "Every month", "Full moon"], correct: 1, explanation: "Something that happens very infrequently." },
  { id: 20, q: "Meaning of 'Cost an arm and a leg':", options: ["Hospital bill", "Very expensive", "Surgery", "Cheap price"], correct: 1, explanation: "Extremely high price." },
  // Set 3 (21-30)
  { id: 21, q: "Meaning of 'Spill the beans':", options: ["Cooking error", "Reveal a secret", "Planting seeds", "Wasting food"], correct: 1, explanation: "Accidentally or intentionally revealing confidential information." },
  { id: 22, q: "Meaning of 'Break the ice':", options: ["Winter sports", "Start a conversation in a social setting", "Destroying things", "Melting"], correct: 1, explanation: "Relieving tension or starting a chat." },
  { id: 23, q: "Figure of speech in 'As brave as a lion':", options: ["Metaphor", "Simile", "Pun", "Irony"], correct: 1, explanation: "Comparison using 'as'." },
  { id: 24, q: "Meaning of 'Hit the nail on the head':", options: ["Carpentry", "To be precisely correct", "Physical injury", "Building"], correct: 1, explanation: "Describing exactly what is causing a situation." },
  { id: 25, q: "Meaning of 'Let the cat out of the bag':", options: ["Pet care", "Reveal a secret", "Animal rescue", "Escape"], correct: 1, explanation: "Accidentally telling a secret." },
  { id: 26, q: "Meaning of 'A blessing in disguise':", options: ["Magic trick", "A misfortune that results in something good", "Religion", "Hidden gift"], correct: 1, explanation: "Something that seemed bad at first but turned out well." },
  { id: 27, q: "Meaning of 'Kick the bucket':", options: ["Angry reaction", "To die", "Cleaning", "Farming"], correct: 1, explanation: "A common euphemism for death." },
  { id: 28, q: "Figure of speech in 'The buzz of the bees':", options: ["Metaphor", "Onomatopoeia", "Simile", "Hyperbole"], correct: 1, explanation: "Word that imitates a sound." },
  { id: 29, q: "Meaning of 'Barking up the wrong tree':", options: ["Dog behavior", "Looking in the wrong place", "Forestry", "Misunderstanding"], correct: 1, explanation: "Accusing the wrong person or pursuing the wrong path." },
  { id: 30, q: "Meaning of 'Add insult to injury':", options: ["First aid", "Worsen an already bad situation", "Mockery", "Painful remark"], correct: 1, explanation: "Making a situation even more unfavourable with further indignity." },
  // Set 4 (31-40)
  { id: 31, q: "Meaning of 'Call it a day':", options: ["Sunset", "Decide to stop working", "Morning routine", "Schedule"], correct: 1, explanation: "Ending a task for the time being." },
  { id: 32, q: "Meaning of 'Cut corners':", options: ["Geometric shapes", "Do something poorly to save time/money", "Tailoring", "Pathfinding"], correct: 1, explanation: "Reducing quality to save resources." },
  { id: 33, q: "Figure of speech in 'Original copy':", options: ["Simile", "Oxymoron", "Metaphor", "Pun"], correct: 1, explanation: "Contradictory terms used together." },
  { id: 34, q: "Meaning of 'Draw the line':", options: ["Sketching", "Set a limit on what is allowed", "Measurement", "Separation"], correct: 1, explanation: "Defining a boundary of acceptable behaviour." },
  { id: 35, q: "Meaning of 'Elephant in the room':", options: ["Safari", "An obvious major problem being avoided", "Large space", "Zoo"], correct: 1, explanation: "A huge topic people are ignoring." },
  { id: 36, q: "Meaning of 'Face the music':", options: ["Concert", "Accept unpleasant consequences", "Dancing", "Listening"], correct: 1, explanation: "Taking responsibility for actions." },
  { id: 37, q: "Meaning of 'Get out of hand':", options: ["Dropped object", "Become difficult to control", "Freedom", "Large size"], correct: 1, explanation: "Losing control of a situation." },
  { id: 38, q: "Figure of speech in 'Life is a roller coaster':", options: ["Simile", "Metaphor", "Irony", "Alliteration"], correct: 1, explanation: "Direct comparison without 'like/as'." },
  { id: 39, q: "Meaning of 'Give someone the cold shoulder':", options: ["Winter weather", "Intentionally ignoring someone", "Massage", "Unkindness"], correct: 1, explanation: "Being socially unresponsive to someone." },
  { id: 40, q: "Meaning of 'Hang in there':", options: ["Exercise", "Don't give up", "Cliffhanger", "Wait"], correct: 1, explanation: "Persistence in a difficult situation." },
  // Set 5 (41-50)
  { id: 41, q: "Meaning of 'In a nutshell':", options: ["Small container", "Briefly; in a few words", "Healthy food", "Hidden"], correct: 1, explanation: "Summarising succinctly." },
  { id: 42, q: "Meaning of 'Keep at arm's length':", options: ["Measurement", "Avoid intimacy or familiarity", "Boxing", "Protection"], correct: 1, explanation: "Maintaining distance from someone." },
  { id: 43, q: "Figure of speech in 'Big bad bear':", options: ["Metaphor", "Alliteration", "Simile", "Pun"], correct: 1, explanation: "Repetition of initial consonant sounds." },
  { id: 44, q: "Meaning of 'Last straw':", options: ["Drinking through a straw", "Final problem that makes a situation intolerable", "Waste", "Agriculture"], correct: 1, explanation: "The absolute limit of one's patience." },
  { id: 45, q: "Meaning of 'Make ends meet':", options: ["Knitting", "Earn just enough money to live", "Math problem", "Meeting people"], correct: 1, explanation: "Survival on a minimal budget." },
  { id: 46, q: "Meaning of 'Miss the boat':", options: ["Travel delay", "Too late to take an opportunity", "Sea sickness", "Swimming"], correct: 1, explanation: "Losing a chance due to being slow." },
  { id: 47, q: "Meaning of 'No pain, no gain':", options: ["Suffering", "Work hard for what you want", "Medicine", "Exercise"], correct: 1, explanation: "Hard work is necessary for success." },
  { id: 48, q: "Figure of speech in 'Bitter sweet':", options: ["Oxymoron", "Simile", "Metaphor", "Onomatopoeia"], correct: 0, explanation: "Opposite terms combined." },
  { id: 49, q: "Meaning of 'On cloud nine':", options: ["Aviation", "Very happy and excited", "Weather forecast", "High altitude"], correct: 1, explanation: "Extreme joy." },
  { id: 50, q: "Meaning of 'Put all eggs in one basket':", options: ["Farming", "Risk everything on a single venture", "Shopping", "Storage"], correct: 1, explanation: "Lacking diversification in risk." },
  // Set 6 (51-60)
  { id: 51, q: "Meaning of 'Rain on someone's parade':", options: ["Weather alert", "Spoil someone's plans or pleasure", "Public event", "Wet clothes"], correct: 1, explanation: "Ruining someone's moment of joy." },
  { id: 52, q: "Meaning of 'Read between the lines':", options: ["Vision test", "Find hidden meaning", "Reading fast", "Editing"], correct: 1, explanation: "Understanding what is implied but not stated." },
  { id: 53, q: "Figure of speech in 'The wind whispered through the trees':", options: ["Simile", "Personification", "Metaphor", "Pun"], correct: 1, explanation: "Human action (whispering) for wind." },
  { id: 54, q: "Meaning of 'Rule of thumb':", options: ["Hand measurement", "A broadly accurate guide based on experience", "Dictatorship", "Physics"], correct: 1, explanation: "A general practical rule." },
  { id: 55, q: "Meaning of 'See eye to eye':", options: ["Vision check", "Agree completely", "Face to face", "Staring contest"], correct: 1, explanation: "Complete agreement." },
  { id: 56, q: "Meaning of 'Sit on the fence':", options: ["Gardening", "Avoid making a decision", "Relaxing", "Boundary"], correct: 1, explanation: "Being undecided or neutral." },
  { id: 57, q: "Meaning of 'Take it with a grain of salt':", options: ["Cooking", "Listen with skepticism", "Healthy diet", "Small amount"], correct: 1, explanation: "Not believing something entirely." },
  { id: 58, q: "Figure of speech in 'He was a lion in the fight':", options: ["Simile", "Metaphor", "Hyperbole", "Oxymoron"], correct: 1, explanation: "Comparing a man to a lion directly." },
  { id: 59, q: "Meaning of 'Through thick and thin':", options: ["Physical weight", "Under all circumstances", "Texture", "Consistency"], correct: 1, explanation: "Persistence through difficult times." },
  { id: 60, q: "Meaning of 'Under the thumb of':", options: ["Massage", "Controlled by someone else", "Small size", "Pressure"], correct: 1, explanation: "Being dominated." },
  // Set 7 (61-70)
  { id: 61, q: "Meaning of 'Wild goose chase':", options: ["Hunting trip", "Foolish and hopeless pursuit", "Birds", "Fast running"], correct: 1, explanation: "Wasting time on a pointless search." },
  { id: 62, q: "Meaning of 'Wrap your head around something':", options: ["Hat", "Understand a complicated idea", "Injury", "Thinking"], correct: 1, explanation: "Mental processing of difficult info." },
  { id: 63, q: "Figure of speech in 'Crack! Boom! Pop!':", options: ["Simile", "Onomatopoeia", "Metaphor", "Irony"], correct: 1, explanation: "Words representing sounds." },
  { id: 64, q: "Meaning of 'Your guess is as good as mine':", options: ["Competition", "I have no idea", "Equal intelligence", "Prediction"], correct: 1, explanation: "Admitting ignorance about something." },
  { id: 65, q: "Meaning of 'Zero hour':", options: ["Midnight", "Vital operation start time", "Watch setting", "No time left"], correct: 1, explanation: "The decisive moment." },
  { id: 66, q: "Meaning of 'A man of straw':", options: ["Farmer", "A weak or characterless person", "Dummy", "Light weight"], correct: 1, explanation: "Someone without substance or integrity." },
  { id: 67, q: "Meaning of 'Against the clock':", options: ["Watch repair", "Fast as possible before deadline", "Racing", "Reverse time"], correct: 1, explanation: "Extreme haste." },
  { id: 68, q: "Figure of speech in 'She sells sea shells by the seashore':", options: ["Metaphor", "Alliteration", "Simile", "Oxymoron"], correct: 1, explanation: "Repetition of 's' sound." },
  { id: 69, q: "Meaning of 'Apple of discord':", options: ["Rotten fruit", "A subject of envy or strife", "Greek myth", "Healthy snack"], correct: 1, explanation: "Something causing disagreement." },
  { id: 70, q: "Meaning of 'At a snail's pace':", options: ["Gardening", "Moving very slowly", "Small steps", "Animal study"], correct: 1, explanation: "Extreme slowness." },
  // Set 8 (71-80)
  { id: 71, q: "Meaning of 'Bad blood':", options: ["Medical condition", "Feelings of hate between people", "Injury", "Poor quality"], correct: 1, explanation: "Hostility or grudge." },
  { id: 72, q: "Meaning of 'Ball in your court':", options: ["Tennis game", "Responsibility for next action is yours", "Playtime", "Decision"], correct: 1, explanation: "It's your turn to act." },
  { id: 73, q: "Figure of speech in 'The White House issued a statement':", options: ["Simile", "Metonymy", "Metaphor", "Irony"], correct: 1, explanation: "Using associated place name for the entity (President)." },
  { id: 74, q: "Meaning of 'Beat a dead horse':", options: ["Animal abuse", "Waste time on settled issues", "Ranch work", "Stupidity"], correct: 1, explanation: "Fruitless repetition." },
  { id: 75, q: "Meaning of 'Below the belt':", options: ["Boxing rule", "Unfair or cruel remark", "Low height", "Fashion"], correct: 1, explanation: "Unfair criticism." },
  { id: 76, q: "Meaning of 'Better late than never':", options: ["Time management", "Arrival delay is okay", "Punctuality", "Slow work"], correct: 1, explanation: "Doing something eventually is better than not at all." },
  { id: 77, q: "Meaning of 'Between a rock and a hard place':", options: ["Geology", "Faced with two difficult choices", "Trapped", "Construction"], correct: 1, explanation: "No good options available." },
  { id: 78, q: "Figure of speech in 'Parting is such sweet sorrow':", options: ["Simile", "Oxymoron", "Metaphor", "Pun"], correct: 1, explanation: "Contradictory terms 'Sweet' and 'Sorrow'." },
  { id: 79, q: "Meaning of 'Bite off more than you can chew':", options: ["Eating fast", "Take on a task too big", "Greed", "Jaw pain"], correct: 1, explanation: "Over-committing." },
  { id: 80, q: "Meaning of 'Blow one's own trumpet':", options: ["Music", "To praise oneself", "Noise", "Performance"], correct: 1, explanation: "Self-promotion or bragging." },
  // Set 9 (81-90)
  { id: 81, q: "Meaning of 'Break the bank':", options: ["Robbery", "Cost too much money", "Savings", "Finance"], correct: 1, explanation: "Extremely expensive." },
  { id: 82, q: "Meaning of 'By leaps and bounds':", options: ["Athletics", "Very rapidly", "Distance", "Jumping"], correct: 1, explanation: "Significant and fast progress." },
  { id: 83, q: "Figure of speech in 'He is no fool':", options: ["Simile", "Litotes", "Metaphor", "Pun"], correct: 1, explanation: "Understatement by using double negatives." },
  { id: 84, q: "Meaning of 'Call a spade a spade':", options: ["Gardening", "Speak plainly and directly", "Honesty", "Farming"], correct: 1, explanation: "Being blunt or honest." },
  { id: 85, q: "Meaning of 'Carry the day':", options: ["Work shift", "Be successful or win", "Loading", "Winning"], correct: 1, explanation: "Victorious outcome." },
  { id: 86, q: "Meaning of 'Catch someone red-handed':", options: ["Paint injury", "Catch in the act of wrongdoing", "Crime", "Blood"], correct: 1, explanation: "Irrefutable proof of guilt." },
  { id: 87, q: "Meaning of 'Change of heart':", options: ["Surgery", "Change in opinion or feeling", "Emotion", "Biological change"], correct: 1, explanation: "Altered perspective." },
  { id: 88, q: "Figure of speech in 'The desert was as dry as a bone':", options: ["Metaphor", "Simile", "Hyperbole", "Irony"], correct: 1, explanation: "Comparison using 'as'." },
  { id: 89, q: "Meaning of 'Close shave':", options: ["Barbershop", "Narrow escape from danger", "Smooth skin", "Safety"], correct: 1, explanation: "Barely avoiding disaster." },
  { id: 90, q: "Meaning of 'Crocodile tears':", options: ["Nature show", "False expression of sorrow", "Sadness", "Fake emotion"], correct: 1, explanation: "Insincere mourning." },
  // Set 10 (91-100)
  { id: 91, q: "Meaning of 'Dead ringer':", options: ["Bell", "An exact duplicate", "Ghost", "Signal"], correct: 1, explanation: "Identical resemblance." },
  { id: 92, q: "Meaning of 'Don't count your chickens...':", options: ["Farming", "Don't assume success prematurely", "Planning", "Math"], correct: 1, explanation: "Wait for results before celebrating." },
  { id: 93, q: "Figure of speech in 'O Romeo, Romeo! wherefore art thou Romeo?':", options: ["Simile", "Apostrophe", "Metaphor", "Pun"], correct: 1, explanation: "Addressing an absent or personified object/person." },
  { id: 94, q: "Meaning of 'Eat humble pie':", options: ["Cooking", "Apologize and accept being wrong", "Food review", "Dessert"], correct: 1, explanation: "Admitting error." },
  { id: 95, q: "Meaning of 'Every cloud has a silver lining':", options: ["Weather", "Difficult situations have positive sides", "Optimism", "Sky study"], correct: 1, explanation: "Finding hope in darkness." },
  { id: 96, q: "Meaning of 'Feather in one's cap':", options: ["Fashion", "An achievement to be proud of", "Bird study", "Hat decoration"], correct: 1, explanation: "Distinction or honour." },
  { id: 97, q: "Meaning of 'Fish out of water':", options: ["Fishing", "Unfamiliar/uncomfortable situation", "Aquarium", "Nature"], correct: 1, explanation: "Social awkwardness due to setting." },
  { id: 98, q: "Figure of speech in 'The ocean waved at us':", options: ["Simile", "Personification", "Metaphor", "Irony"], correct: 1, explanation: "Human action for nature." },
  { id: 99, q: "Meaning of 'Flash in the pan':", options: ["Cooking", "Successful for short time only", "Explosion", "Brief light"], correct: 1, explanation: "Temporary success." },
  { id: 100, q: "Meaning of 'Get wind of':", options: ["Weather", "Hear a rumor/secret", "Sailing", "News"], correct: 1, explanation: "Gaining information indirectly." },
  // NEW SETS (Set 11-20)
  { id: 101, q: "Meaning of 'Keep the wolf from the door':", options: ["Farming", "To earn enough money to afford basics", "Pest control", "Security"], correct: 1, explanation: "Earning just enough to survive." },
  { id: 102, q: "Figure of speech in 'Life is but a walking shadow':", options: ["Simile", "Metaphor", "Oxymoron", "Hyperbole"], correct: 1, explanation: "Direct comparison between Life and a Shadow." },
  { id: 103, q: "Meaning of 'Burn bridges':", options: ["War tactic", "Destroy relationships or paths of return", "Construction error", "Travel"], correct: 1, explanation: "Making it impossible to return to a previous state." },
  { id: 104, q: "Meaning of 'At the drop of a hat':", options: ["Fashion", "Immediately; without hesitation", "Accident", "Politeness"], correct: 1, explanation: "Doing something instantly." },
  { id: 105, q: "Figure of speech in 'O death, where is thy sting?':", options: ["Simile", "Apostrophe", "Metaphor", "Pun"], correct: 1, explanation: "Addressing an abstract concept (Death) directly." },
  { id: 106, q: "Meaning of 'Barking up the wrong tree':", options: ["Forestry", "Accusing the wrong person", "Pet behavior", "Confusion"], correct: 1, explanation: "Following a mistaken line of thought or action." },
  { id: 107, q: "Meaning of 'Call a spade a spade':", options: ["Gardening", "Speak plainly and directly", "Farming", "Honesty"], correct: 1, explanation: "Being blunt or honest about something." },
  { id: 108, q: "Figure of speech in 'Her beauty is like a red rose':", options: ["Metaphor", "Simile", "Oxymoron", "Irony"], correct: 1, explanation: "Comparison using 'like'." },
  { id: 109, q: "Meaning of 'Cold feet':", options: ["Winter weather", "To become nervous about a plan", "Poor circulation", "Fear"], correct: 1, explanation: "Hesitation or anxiety before a big event." },
  { id: 110, q: "Meaning of 'A dime a dozen':", options: ["Cheap price", "Something very common and of little value", "Currency exchange", "Rarity"], correct: 1, explanation: "Describes something easily found everywhere." },
  // Set 12
  { id: 111, q: "Meaning of 'A leopard cannot change its spots':", options: ["Zoology", "People cannot change their basic nature", "Fashion", "Adaptability"], correct: 1, explanation: "Basic character remains consistent over time." },
  { id: 112, q: "Figure of speech in 'Parting is such sweet sorrow':", options: ["Simile", "Oxymoron", "Metaphor", "Pun"], correct: 1, explanation: "Contradictory terms 'Sweet' and 'Sorrow' combined." },
  { id: 113, q: "Meaning of 'Elephant in the room':", options: ["Wildlife", "An obvious major problem being ignored", "Large space", "Zoo"], correct: 1, explanation: "A major issue that people avoid discussing." },
  { id: 114, q: "Meaning of 'Face the music':", options: ["Concert", "Accept unpleasant consequences", "Dancing", "Listening"], correct: 1, explanation: "Taking responsibility for one's actions." },
  { id: 115, q: "Figure of speech in 'The camel is the ship of the desert':", options: ["Simile", "Metaphor", "Onomatopoeia", "Irony"], correct: 1, explanation: "Direct comparison between Camel and Ship." },
  { id: 116, q: "Meaning of 'Get out of hand':", options: ["Physical injury", "Become difficult to control", "Freedom", "Large size"], correct: 1, explanation: "Losing control of a situation." },
  { id: 117, q: "Meaning of 'Give someone the cold shoulder':", options: ["Winter weather", "Intentionally ignoring someone", "Massage", "Unkindness"], correct: 1, explanation: "Being socially unresponsive to someone." },
  { id: 118, q: "Figure of speech in 'Why, then, O brawling love! O loving hate!':", options: ["Simile", "Oxymoron", "Metaphor", "Pun"], correct: 1, explanation: "Contradictory terms combined for effect." },
  { id: 119, q: "Meaning of 'Hit the nail on the head':", options: ["Carpentry", "To be precisely correct", "Physical injury", "Building"], correct: 1, explanation: "Describing exactly what is causing a situation." },
  { id: 120, q: "Meaning of 'In a nutshell':", options: ["Small container", "Briefly; in a few words", "Healthy food", "Hidden"], correct: 1, explanation: "Summarising succinctly." },
  // Set 13-20 follow... (Condensed for brevity but fully functional logic)
  { id: 121, q: "Meaning of 'Keep at arm's length':", options: ["Measurement", "Avoid intimacy or familiarity", "Boxing", "Protection"], correct: 1, explanation: "Maintaining distance from someone." },
  { id: 122, q: "Figure of speech in 'Sceptre and Crown must tumble down':", options: ["Simile", "Synecdoche", "Metaphor", "Pun"], correct: 1, explanation: "Using parts (Crown) to represent the whole (Monarchy)." },
  { id: 123, q: "Meaning of 'Last straw':", options: ["Drinking", "Final problem in a series", "Waste", "Agriculture"], correct: 1, explanation: "The absolute limit of patience." },
  { id: 124, q: "Meaning of 'Make ends meet':", options: ["Knitting", "Earn just enough money to survive", "Math", "Meeting"], correct: 1, explanation: "Survival on a minimal budget." },
  { id: 125, q: "Figure of speech in 'Variety is the spice of life':", options: ["Simile", "Metaphor", "Irony", "Alliteration"], correct: 1, explanation: "Direct comparison." },
  { id: 126, q: "Meaning of 'Miss the boat':", options: ["Travel delay", "Too late to take an opportunity", "Sea sickness", "Swimming"], correct: 1, explanation: "Losing a chance due to slowness." },
  { id: 127, q: "Meaning of 'No pain, no gain':", options: ["Suffering", "Work hard for success", "Medicine", "Exercise"], correct: 1, explanation: "Success requires effort." },
  { id: 128, q: "Figure of speech in 'The sun peered over the hill':", options: ["Simile", "Personification", "Metaphor", "Irony"], correct: 1, explanation: "Human action for nature." },
  { id: 129, q: "Meaning of 'On cloud nine':", options: ["Aviation", "Very happy and excited", "Weather", "High altitude"], correct: 1, explanation: "Extreme joy." },
  { id: 130, q: "Meaning of 'Once in a blue moon':", options: ["Astronomy", "Very rarely", "Every month", "Full moon"], correct: 1, explanation: "Infrequent event." },
  // Additional items 131-200 follow high-yield patterns...
  { id: 131, q: "Meaning of 'Piece of cake':", options: ["Baking", "Something very easy", "Small portion", "Celebration"], correct: 1, explanation: "An easy task." },
  { id: 132, q: "Figure of speech in 'My love is like a red, red rose':", options: ["Metaphor", "Simile", "Pun", "Irony"], correct: 1, explanation: "Comparison using 'like'." },
  { id: 133, q: "Meaning of 'Pull someone's leg':", options: ["Exercise", "To tease or joke", "Physical injury", "Help"], correct: 1, explanation: "Teasing someone." },
  { id: 134, q: "Meaning of 'Read between the lines':", options: ["Vision", "Find hidden meaning", "Reading fast", "Editing"], correct: 1, explanation: "Understanding implications." },
  { id: 135, q: "Figure of speech in 'The waves roared':", options: ["Simile", "Onomatopoeia", "Metaphor", "Irony"], correct: 1, explanation: "Word that imitates sound." },
  { id: 136, q: "Meaning of 'See eye to eye':", options: ["Vision", "Agree completely", "Face to face", "Staring"], correct: 1, explanation: "Complete agreement." },
  { id: 137, q: "Meaning of 'Sit on the fence':", options: ["Gardening", "Avoid making a decision", "Relaxing", "Boundary"], correct: 1, explanation: "Being undecided." },
  { id: 138, q: "Figure of speech in 'All the world's a stage':", options: ["Simile", "Metaphor", "Oxymoron", "Pun"], correct: 1, explanation: "Direct comparison." },
  { id: 139, q: "Meaning of 'Spill the beans':", options: ["Cooking", "Reveal a secret", "Planting", "Wasting"], correct: 1, explanation: "Revealing confidential info." },
  { id: 140, q: "Meaning of 'Take it with a grain of salt':", options: ["Cooking", "Listen with skepticism", "Healthy", "Small amount"], correct: 1, explanation: "Not believing entirely." },
  { id: 141, q: "Meaning of 'Through thick and thin':", options: ["Weight", "Under all circumstances", "Texture", "Consistency"], correct: 1, explanation: "Persistence through difficulty." },
  { id: 142, q: "Figure of speech in 'The child is father of the man':", options: ["Simile", "Paradox", "Metaphor", "Pun"], correct: 1, explanation: "A statement that seems contradictory but reveals a truth." },
  { id: 143, q: "Meaning of 'Under the weather':", options: ["Rain", "Feeling slightly ill", "Climate", "Shelter"], correct: 1, explanation: "Feeling sick." },
  { id: 144, q: "Meaning of 'Up in the air':", options: ["Aviation", "Uncertain or undecided", "Weather", "Flying"], correct: 1, explanation: "Something not yet settled." },
  { id: 145, q: "Figure of speech in 'Knowledge is power':", options: ["Simile", "Metaphor", "Irony", "Pun"], correct: 1, explanation: "Direct comparison." },
  { id: 146, q: "Meaning of 'When pigs fly':", options: ["Zoology", "Something that will never happen", "Aviation", "Humour"], correct: 1, explanation: "An impossibility." },
  { id: 147, q: "Meaning of 'Wild goose chase':", options: ["Hunting", "Foolish and hopeless pursuit", "Birds", "Racing"], correct: 1, explanation: "Pointless search." },
  { id: 148, q: "Figure of speech in 'I am so hungry I could eat a horse':", options: ["Simile", "Hyperbole", "Metaphor", "Irony"], correct: 1, explanation: "Extreme exaggeration." },
  { id: 149, q: "Meaning of 'Your guess is as good as mine':", options: ["Competition", "I have no idea", "Equal intelligence", "Prediction"], correct: 1, explanation: "Admitting ignorance." },
  { id: 150, q: "Meaning of 'Zero hour':", options: ["Midnight", "Vital operation start time", "Watch", "No time"], correct: 1, explanation: "Decisive moment." },
  { id: 151, q: "Meaning of 'Bark up the wrong tree':", options: ["Forestry", "Accuse the wrong person", "Pet behavior", "Confusion"], correct: 1, explanation: "Mistaken direction." },
  { id: 152, q: "Figure of speech in 'Her voice is music to my ears':", options: ["Simile", "Metaphor", "Oxymoron", "Pun"], correct: 1, explanation: "Direct comparison." },
  { id: 153, q: "Meaning of 'Bite off more than you can chew':", options: ["Eating", "Take on a task too big", "Greed", "Jaw pain"], correct: 1, explanation: "Over-committing." },
  { id: 154, q: "Meaning of 'Blessing in disguise':", options: ["Magic", "Misfortune with a good result", "Religion", "Hidden"], correct: 1, explanation: "Appeared bad, turned out good." },
  { id: 155, q: "Figure of speech in 'The leaves danced in the wind':", options: ["Simile", "Personification", "Metaphor", "Irony"], correct: 1, explanation: "Human action for nature." },
  { id: 156, q: "Meaning of 'Break the ice':", options: ["Sports", "Start a conversation", "Destroying", "Melting"], correct: 1, explanation: "Relieving social tension." },
  { id: 157, q: "Meaning of 'Burn the midnight oil':", options: ["Lighting", "Work late at night", "Wasting", "Cooking"], correct: 1, explanation: "Late-night work." },
  { id: 158, q: "Figure of speech in 'As busy as a bee':", options: ["Metaphor", "Simile", "Pun", "Irony"], correct: 1, explanation: "Comparison using 'as'." },
  { id: 159, q: "Meaning of 'Call it a day':", options: ["Sunset", "Decide to stop working", "Morning", "Schedule"], correct: 1, explanation: "Ending work." },
  { id: 160, q: "Meaning of 'Cost an arm and a leg':", options: ["Bill", "Very expensive", "Surgery", "Cheap"], correct: 1, explanation: "Extreme high price." },
  { id: 161, q: "Meaning of 'Cry over spilt milk':", options: ["Clean", "Worry over unchangeable past", "Dairy", "Sad"], correct: 1, explanation: "Past regrets." },
  { id: 162, q: "Figure of speech in 'Original copy':", options: ["Simile", "Oxymoron", "Metaphor", "Pun"], correct: 1, explanation: "Contradictory terms." },
  { id: 163, q: "Meaning of 'Cut corners':", options: ["Shapes", "Do poorly to save time/money", "Tailoring", "Paths"], correct: 1, explanation: "Reducing quality." },
  { id: 164, q: "Meaning of 'Don't count your chickens...':", options: ["Farming", "Don't assume success early", "Planning", "Math"], correct: 1, explanation: "Wait for results." },
  { id: 165, q: "Figure of speech in 'The stars winked':", options: ["Personification", "Simile", "Oxymoron", "Irony"], correct: 0, explanation: "Human quality for nature." },
  { id: 166, q: "Meaning of 'Elephant in the room':", options: ["Wildlife", "Obvious problem ignored", "Space", "Zoo"], correct: 1, explanation: "Ignored major issue." },
  { id: 167, q: "Meaning of 'Every cloud has a silver lining':", options: ["Weather", "Good in every bad situation", "Optimism", "Sky"], correct: 1, explanation: "Hope in darkness." },
  { id: 168, q: "Figure of speech in 'Life is a roller coaster':", options: ["Simile", "Metaphor", "Irony", "Alliteration"], correct: 1, explanation: "Direct comparison." },
  { id: 169, q: "Meaning of 'Face the music':", options: ["Concert", "Accept consequences", "Dancing", "Listening"], correct: 1, explanation: "Responsibility." },
  { id: 170, q: "Meaning of 'Get out of hand':", options: ["Dropped", "Difficult to control", "Freedom", "Size"], correct: 1, explanation: "Losing control." },
  { id: 171, q: "Meaning of 'Give the cold shoulder':", options: ["Weather", "Ignore someone", "Massage", "Unkind"], correct: 1, explanation: "Social rejection." },
  { id: 172, q: "Figure of speech in 'O my love is like a red rose':", options: ["Metaphor", "Simile", "Pun", "Irony"], correct: 1, explanation: "Comparison using 'like'." },
  { id: 173, q: "Meaning of 'Hang in there':", options: ["Exercise", "Don't give up", "Cliff", "Wait"], correct: 1, explanation: "Persistence." },
  { id: 174, q: "Meaning of 'Hit the nail on the head':", options: ["Carpentry", "Precisely correct", "Injury", "Building"], correct: 1, explanation: "Exactness." },
  { id: 175, q: "Figure of speech in 'The moon hide her face':", options: ["Simile", "Personification", "Metaphor", "Irony"], correct: 1, explanation: "Human action for nature." },
  { id: 176, q: "Meaning of 'In a nutshell':", options: ["Small", "Briefly", "Healthy", "Hidden"], correct: 1, explanation: "Succinct summary." },
  { id: 177, q: "Meaning of 'Jump on the bandwagon':", options: ["Music", "Follow popular trend", "Transport", "Exercise"], correct: 1, explanation: "Following the crowd." },
  { id: 178, q: "Figure of speech in 'The desert dry as a bone':", options: ["Metaphor", "Simile", "Hyperbole", "Irony"], correct: 1, explanation: "Comparison using 'as'." },
  { id: 179, q: "Meaning of 'Keep at arm's length':", options: ["Measure", "Avoid intimacy", "Boxing", "Protection"], correct: 1, explanation: "Maintaining distance." },
  { id: 180, q: "Meaning of 'Kill two birds with one stone':", options: ["Hunting", "Two tasks with one action", "Birds", "Stone"], correct: 1, explanation: "Efficiency." },
  { id: 181, q: "Meaning of 'Let the cat out of the bag':", options: ["Pet", "Reveal a secret", "Rescue", "Escape"], correct: 1, explanation: "Revealing secret." },
  { id: 182, q: "Figure of speech in 'Knowledge is power':", options: ["Simile", "Metaphor", "Irony", "Pun"], correct: 1, explanation: "Direct comparison." },
  { id: 183, q: "Meaning of 'Make ends meet':", options: ["Knitting", "Earn enough to live", "Math", "Meeting"], correct: 1, explanation: "Survival." },
  { id: 184, q: "Meaning of 'Miss the boat':", options: ["Delay", "Too late for chance", "Sickness", "Swimming"], correct: 1, explanation: "Lost opportunity." },
  { id: 185, q: "Figure of speech in 'Bitter sweet':", options: ["Oxymoron", "Simile", "Metaphor", "Irony"], correct: 0, explanation: "Contradictory terms." },
  { id: 186, q: "Meaning of 'No pain, no gain':", options: ["Suffering", "Effort for success", "Medicine", "Exercise"], correct: 1, explanation: "Hard work required." },
  { id: 187, q: "Meaning of 'Once in a blue moon':", options: ["Astronomy", "Very rarely", "Every month", "Full moon"], correct: 1, explanation: "Infrequent." },
  { id: 188, q: "Figure of speech in 'The ship of the desert':", options: ["Simile", "Metaphor", "Oxymoron", "Pun"], correct: 1, explanation: "Direct comparison." },
  { id: 189, q: "Meaning of 'Piece of cake':", options: ["Baking", "Something easy", "Portion", "Celebration"], correct: 1, explanation: "Easy task." },
  { id: 190, q: "Meaning of 'Pull someone's leg':", options: ["Exercise", "Tease or joke", "Injury", "Help"], correct: 1, explanation: "Teasing." },
  { id: 191, q: "Meaning of 'Rain on parade':", options: ["Weather", "Spoil pleasure", "Public", "Clothes"], correct: 1, explanation: "Ruining joy." },
  { id: 192, q: "Figure of speech in 'O death where is sting':", options: ["Simile", "Apostrophe", "Metaphor", "Pun"], correct: 1, explanation: "Addressing Death." },
  { id: 193, q: "Meaning of 'See eye to eye':", options: ["Vision", "Agree completely", "Face to face", "Staring"], correct: 1, explanation: "Agreement." },
  { id: 194, q: "Meaning of 'Sit on fence':", options: ["Garden", "Undecided", "Relax", "Boundary"], correct: 1, explanation: "Neutrality." },
  { id: 195, q: "Figure of speech in 'The waves roared':", options: ["Simile", "Onomatopoeia", "Metaphor", "Irony"], correct: 1, explanation: "Sound imitation." },
  { id: 196, q: "Meaning of 'Spill beans':", options: ["Cooking", "Reveal secret", "Plant", "Waste"], correct: 1, explanation: "Secret reveal." },
  { id: 197, q: "Meaning of 'Take with grain of salt':", options: ["Cooking", "Listen with skepticism", "Health", "Small"], correct: 1, explanation: "Skepticism." },
  { id: 198, q: "Figure of speech in 'The sun hide face':", options: ["Simile", "Personification", "Metaphor", "Irony"], correct: 1, explanation: "Human quality." },
  { id: 199, q: "Meaning of 'Through thick and thin':", options: ["Weight", "All circumstances", "Texture", "Consistency"], correct: 1, explanation: "Persistence." },
  { id: 200, q: "Meaning of 'Under weather':", options: ["Rain", "Feeling slightly ill", "Climate", "Shelter"], correct: 1, explanation: "Slightly ill." }
]

export default function MatchQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = Array.from({ length: 20 }, (_, i) => ({
    name: `Practice Set ${i + 1}`,
    range: [i * 10, (i + 1) * 10],
    desc: `Targets idiom & figure items ${i * 10 + 1}-${(i + 1) * 10}.`
  }))

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = MATCH_QUIZ_DATA.slice(range[0], range[1]).map(q => {
        const cloned = { ...q, options: [...q.options] }
        
        const oldCorrectIndices = Array.isArray(q.correct) ? q.correct : [q.correct];
        const correctOptions = oldCorrectIndices.map(idx => q.options[idx]);
        
        const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
        cloned.options = shuffled
        
        const newCorrectIndices = correctOptions.map(opt => shuffled.indexOf(opt));
        cloned.correct = Array.isArray(q.correct) ? newCorrectIndices : newCorrectIndices[0];
        
        return cloned
      })
      setQuestions([...selectedQuestions].sort(() => Math.random() - 0.5))
      setCurrentStep(0)
      setAnswers({})
      setIsFinished(false)
    }
  }, [selectedSetIndex])

  const scrollToTarget = useCallback(() => {
    const target = (currentStep > 0 && questionCardRef.current) ? questionCardRef.current : quizRef.current
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
    if (!isFinished && questions.length > 0) {
      const timer = setTimeout(scrollToTarget, 100)
      return () => clearTimeout(timer)
    }
  }, [currentStep, isFinished, questions.length, scrollToTarget])

  const nextQuestion = useCallback(() => {
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      setIsFinished(true)
      toast({ title: "Matching Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedSetIndex !== null && !isFinished && questions.length > 0) {
        const q = questions[currentStep]
        if (answers[q.id] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, selectedSetIndex, nextQuestion])

  const handleAnswer = (val: number) => {
    const qId = questions[currentStep].id
    if (answers[qId] !== undefined) return
    setAnswers({ ...answers, [qId]: val })
    
    setTimeout(() => {
      feedbackRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }, 100)
  }

  const isAnswerCorrect = (userAns: number, correctAns: number | number[]) => {
    if (Array.isArray(correctAns)) {
      return correctAns.includes(userAns)
    }
    return userAns === correctAns
  }

  const calculateScore = () => {
    let correct = 0
    let wrong = 0
    questions.forEach(q => {
      const ans = answers[q.id]
      if (ans === undefined) return
      if (isAnswerCorrect(ans, q.correct)) correct++
      else wrong++
    })
    return { correct, wrong, total: correct * 5 - wrong * 1 }
  }

  if (selectedSetIndex === null) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 4: Match Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Practice Selection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical set to target idioms, figures, and homonyms. Each set contains 10 high-yield items with anti-guess logic.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in-up">
            {quizSets.map((set, idx) => (
              <Card 
                key={idx} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedSetIndex(idx)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <MessageCircle className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">10 Items</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.name}</CardTitle>
                  <CardDescription className="mt-2 font-medium">{set.desc}</CardDescription>
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
        <div className="max-w-2xl mx-auto space-y-8">
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <MessageCircle className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Wrong</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Total Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                const { range } = quizSets[selectedSetIndex]
                const selectedQuestions = MATCH_QUIZ_DATA.slice(range[0], range[1]).map(q => {
                  const cloned = { ...q, options: [...q.options] }
                  const oldCorrectIndices = Array.isArray(q.correct) ? q.correct : [q.correct];
                  const correctOptions = oldCorrectIndices.map(idx => q.options[idx]);
                  const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
                  cloned.options = shuffled
                  const newCorrectIndices = correctOptions.map(opt => shuffled.indexOf(opt));
                  cloned.correct = Array.isArray(q.correct) ? newCorrectIndices : newCorrectIndices[0];
                  return cloned
                })
                setQuestions([...selectedQuestions].sort(() => Math.random() - 0.5))
                setCurrentStep(0)
                setAnswers({})
                setIsFinished(false)
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake randomized quiz
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Choose Another Set
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Strategic Review
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = isAnswerCorrect(userAns, q.correct)
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "Correct (+5)" : "Error (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-100/30" : "bg-red-100/30")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your Selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-100/30 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">{Array.isArray(q.correct) ? "Valid Options: " : "Correct Option: "}</strong>
                            {Array.isArray(q.correct)
                              ? q.correct.map(i => q.options[i]).join(" OR ")
                              : q.options[q.correct as number]
                            }
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-2 border-t">
                      <strong className="text-foreground">Clinical Insight:</strong> {q.explanation}
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

  if (questions.length === 0) return null

  const q = questions[currentStep]
  const userAnswer = answers[q.id]
  const isCorrect = userAnswer !== undefined && isAnswerCorrect(userAnswer, q.correct)

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Sets
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Matching Practice</h1>
              <p className="text-muted-foreground font-mono text-sm font-bold">Question {currentStep + 1} of {questions.length}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-1.5 bg-muted px-3 py-1 rounded-full text-[10px] font-bold text-muted-foreground">
              <Keyboard className="w-3 h-3" />
              PRESS ENTER
            </div>
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Code 101</Badge>
          </div>
        </div>

        <Progress value={(currentStep / questions.length) * 100} className="mb-12 h-2" />

        <Card className="border-none shadow-xl rounded-[2rem] overflow-hidden bg-white" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-2xl text-center leading-relaxed font-bold">{q.q}</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <RadioGroup 
              onValueChange={(val) => handleAnswer(parseInt(val))} 
              value={userAnswer?.toString()} 
              disabled={userAnswer !== undefined}
              className="grid gap-3"
            >
              {q.options.map((opt, i) => {
                const isSelected = userAnswer === i
                const isCorrectOption = isAnswerCorrect(i, q.correct)
                
                return (
                  <div 
                    key={i} 
                    onClick={() => handleAnswer(i)}
                    className={cn(
                      "flex items-center space-x-3 border p-5 rounded-2xl transition-all cursor-pointer group",
                      userAnswer === undefined && "hover:bg-primary/5 hover:border-primary/20",
                      isSelected && !isCorrect && "border-destructive bg-destructive/5 ring-1 ring-destructive/20 shadow-md",
                      isSelected && isCorrect && "border-green-500 bg-green-50 ring-1 ring-green-200 shadow-md",
                      userAnswer !== undefined && isCorrectOption && !isSelected && "border-green-500/50 bg-green-50/30"
                    )}
                  >
                    <RadioGroupItem value={i.toString()} id={`q-${q.id}-opt-${i}`} className="pointer-events-none" />
                    <Label 
                      htmlFor={`q-${q.id}-opt-${i}`} 
                      className="flex-1 cursor-pointer text-lg font-bold text-foreground leading-tight"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="inline-block w-8 text-primary font-mono">{String.fromCharCode(65 + i)}.</span>
                      {opt}
                    </Label>
                    {userAnswer !== undefined && isCorrectOption && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                    {isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive" />}
                  </div>
                )
              })}
            </RadioGroup>

            <AnimatePresence>
              {userAnswer !== undefined && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  className="mt-8 pt-8 border-t border-dashed"
                  ref={feedbackRef}
                >
                  <div className={cn("p-6 rounded-2xl", isCorrect ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100")}>
                    <div className="flex items-center gap-3 mb-3">
                      {isCorrect ? <CheckCircle2 className="w-6 h-6 text-green-600" /> : <XCircle className="w-6 h-6 text-red-600" />}
                      <span className={cn("text-xl font-bold", isCorrect ? "text-green-700" : "text-red-700")}>
                        {isCorrect ? "Perfect Scoop!" : "Brain Freeze!"}
                      </span>
                    </div>
                    <p className="text-muted-foreground leading-relaxed text-sm">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>
      </main>
    </div>
  )
}
