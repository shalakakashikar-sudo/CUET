
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Hash, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  q: string
  options: string[]
  correct: number
  explanation: string
}

const VOCAB_QUIZ_DATA: Question[] = [
  // Set 1
  { id: 1, q: "Choose the synonym of EPHEMERAL:", options: ["Permanent", "Transient", "Eternal", "Enduring"], correct: 1, explanation: "'Ephemeral' refers to something that lasts for a very short time. 'Transient' is its direct synonym." },
  { id: 2, q: "Choose the antonym of LOQUACIOUS:", options: ["Talkative", "Garrulous", "Verbose", "Reticent"], correct: 3, explanation: "'Loquacious' means talkative. 'Reticent' means reserved or silent, making it the correct antonym." },
  { id: 3, q: "Choose the synonym of ACRIMONIOUS:", options: ["Pleasant", "Bitter", "Amiable", "Joyful"], correct: 1, explanation: "'Acrimonious' implies bitterness or ill-feeling in speech or debate." },
  { id: 4, q: "Choose the antonym of COPIOUS:", options: ["Plentiful", "Abundant", "Meager", "Profuse"], correct: 2, explanation: "'Copious' means abundant in supply. 'Meager' is the opposite, meaning lacking in quantity." },
  { id: 5, q: "Choose the synonym of PRUDENT:", options: ["Reckless", "Impulsive", "Judicious", "Hasty"], correct: 2, explanation: "'Prudent' means acting with or showing care and thought for the future. 'Judicious' is a close synonym." },
  { id: 6, q: "Choose the antonym of DAUNTLESS:", options: ["Bold", "Intrepid", "Fearless", "Timid"], correct: 3, explanation: "'Dauntless' means showing fearlessness. 'Timid' means showing a lack of courage or confidence." },
  { id: 7, q: "Choose the synonym of CANDID:", options: ["Deceptive", "Evasive", "Frank", "Cunning"], correct: 2, explanation: "'Candid' means truthful and straightforward. 'Frank' is its direct synonym." },
  { id: 8, q: "Choose the antonym of UBIQUITOUS:", options: ["Omnipresent", "Pervasive", "Widespread", "Rare"], correct: 3, explanation: "'Ubiquitous' means present everywhere. 'Rare' is its logical opposite." },
  { id: 9, q: "Choose the synonym of LANGUISH:", options: ["Flourish", "Thrive", "Wither", "Prosper"], correct: 2, explanation: "'Languish' means to grow weak or feeble. 'Wither' captures this sense of decline." },
  { id: 10, q: "Choose the antonym of ZEALOUS:", options: ["Passionate", "Fervent", "Apathetic", "Enthusiastic"], correct: 2, explanation: "'Zealous' means showing great energy or enthusiasm. 'Apathetic' means showing no interest or concern." },
  // Set 2
  { id: 11, q: "Choose the synonym of ABJURE:", options: ["Assert", "Renounce", "Embrace", "Adopt"], correct: 1, explanation: "'Abjure' means to solemnly renounce a belief or claim." },
  { id: 12, q: "Choose the antonym of ALACRITY:", options: ["Eagerness", "Lethargy", "Zeal", "Promptness"], correct: 1, explanation: "'Alacrity' is brisk and cheerful readiness. 'Lethargy' is its opposite." },
  { id: 13, q: "Choose the synonym of AMELIORATE:", options: ["Worsen", "Improve", "Exacerbate", "Stagnate"], correct: 1, explanation: "'Ameliorate' means to make something better." },
  { id: 14, q: "Choose the antonym of ANTIPATHY:", options: ["Aversion", "Hostility", "Affinity", "Dislike"], correct: 2, explanation: "'Antipathy' is a deep-seated feeling of dislike. 'Affinity' is a natural liking." },
  { id: 15, q: "Choose the synonym of ASSIDUOUS:", options: ["Indolent", "Diligent", "Lazy", "Careless"], correct: 1, explanation: "'Assiduous' means showing great care and perseverance." },
  { id: 16, q: "Choose the antonym of AUDACIOUS:", options: ["Bold", "Daring", "Timid", "Fearless"], correct: 2, explanation: "'Audacious' means taking bold risks. 'Timid' is its opposite." },
  { id: 17, q: "Choose the synonym of BANAL:", options: ["Original", "Trite", "Fresh", "Novel"], correct: 1, explanation: "'Banal' means so lacking in originality as to be obvious and boring." },
  { id: 18, q: "Choose the antonym of BENEVOLENT:", options: ["Kind", "Charitable", "Malevolent", "Generous"], correct: 2, explanation: "'Benevolent' means well-meaning and kindly. 'Malevolent' means wishing evil to others." },
  { id: 19, q: "Choose the synonym of CACOPHONY:", options: ["Harmony", "Din", "Euphony", "Silence"], correct: 1, explanation: "'Cacophony' is a harsh, discordant mixture of sounds." },
  { id: 20, q: "Choose the antonym of CAPRICIOUS:", options: ["Fickle", "Inconstant", "Stable", "Variable"], correct: 2, explanation: "'Capricious' means given to sudden changes. 'Stable' is its opposite." },
  // Set 3
  { id: 21, q: "Choose the synonym of CASTIGATE:", options: ["Praise", "Chastise", "Commend", "Approve"], correct: 1, explanation: "'Castigate' means to reprimand someone severely." },
  { id: 22, q: "Choose the antonym of COGENT:", options: ["Compelling", "Vague", "Convincing", "Valid"], correct: 1, explanation: "'Cogent' means clear, logical, and convincing. 'Vague' lacks clarity." },
  { id: 23, q: "Choose the synonym of DELETERIOUS:", options: ["Helpful", "Harmful", "Beneficial", "Salubrious"], correct: 1, explanation: "'Deleterious' means causing harm or damage." },
  { id: 24, q: "Choose the antonym of DIFFIDENT:", options: ["Shy", "Confident", "Bashful", "Modest"], correct: 1, explanation: "'Diffident' means modest or shy due to lack of self-confidence." },
  { id: 25, q: "Choose the synonym of EBULLIENT:", options: ["Depressed", "Exuberant", "Gloomy", "Apathetic"], correct: 1, explanation: "'Ebullient' means cheerful and full of energy." },
  { id: 26, q: "Choose the antonym of ERUDITE:", options: ["Learned", "Ignorant", "Scholarly", "Educated"], correct: 1, explanation: "'Erudite' means having or showing great knowledge." },
  { id: 27, q: "Choose the synonym of FASTIDIOUS:", options: ["Careless", "Meticulous", "Sloppy", "Lax"], correct: 1, explanation: "'Fastidious' means very attentive to and concerned about accuracy and detail." },
  { id: 28, q: "Choose the antonym of GREGARIOUS:", options: ["Sociable", "Reclusive", "Convivial", "Friendly"], correct: 1, explanation: "'Gregarious' means fond of company; sociable." },
  { id: 29, q: "Choose the synonym of IMPECCABLE:", options: ["Flawed", "Faultless", "Defective", "Corrupt"], correct: 1, explanation: "'Impeccable' means in accordance with the highest standards; faultless." },
  { id: 30, q: "Choose the antonym of INDOLENT:", options: ["Lazy", "Industrious", "Idle", "Slothful"], correct: 1, explanation: "'Indolent' means wanting to avoid activity or exertion; lazy." },
  // Set 4
  { id: 31, q: "Choose the synonym of INGENUOUS:", options: ["Naive", "Cunning", "Deceitful", "Artful"], correct: 0, explanation: "'Ingenuous' means innocent and unsuspecting." },
  { id: 32, q: "Choose the antonym of IRASCIBLE:", options: ["Irritable", "Placid", "Choleric", "Petulant"], correct: 1, explanation: "'Irascible' means having a tendency to be easily angered. 'Placid' means calm." },
  { id: 33, q: "Choose the synonym of LACONIC:", options: ["Verbose", "Brief", "Wordy", "Garrulous"], correct: 1, explanation: "'Laconic' means using very few words." },
  { id: 34, q: "Choose the antonym of MAGNANIMOUS:", options: ["Generous", "Vindictive", "Charitable", "Benevolent"], correct: 1, explanation: "'Magnanimous' means generous or forgiving. 'Vindictive' means having a desire for revenge." },
  { id: 35, q: "Choose the synonym of METICULOUS:", options: ["Careless", "Scrupulous", "Hasty", "Negligent"], correct: 1, explanation: "'Meticulous' means showing great attention to detail." },
  { id: 36, q: "Choose the antonym of NEOPHYTE:", options: ["Beginner", "Veteran", "Novice", "Learner"], correct: 1, explanation: "'Neophyte' is a person who is new to a subject or skill." },
  { id: 37, q: "Choose the synonym of OBDURATE:", options: ["Yielding", "Obstinate", "Flexible", "Amenable"], correct: 1, explanation: "'Obdurate' means stubbornly refusing to change one's opinion." },
  { id: 38, q: "Choose the antonym of OSTENTATIOUS:", options: ["Showy", "Modest", "Pretentious", "Flamboyant"], correct: 1, explanation: "'Ostentatious' means characterized by pretentious display." },
  { id: 39, q: "Choose the synonym of PAUCITY:", options: ["Abundance", "Scarcity", "Plethora", "Surfeit"], correct: 1, explanation: "'Paucity' means the presence of something only in small or insufficient quantities." },
  { id: 40, q: "Choose the antonym of PERNICIOUS:", options: ["Harmful", "Beneficial", "Damaging", "Noxious"], correct: 1, explanation: "'Pernicious' means having a harmful effect, especially in a gradual or subtle way." },
  // Set 5
  { id: 41, q: "Choose the synonym of QUERULOUS:", options: ["Contented", "Petulant", "Cheerful", "Placid"], correct: 1, explanation: "'Querulous' means complaining in a petulant or whining manner." },
  { id: 42, q: "Choose the antonym of SAGACIOUS:", options: ["Wise", "Foolish", "Prudent", "Astute"], correct: 1, explanation: "'Sagacious' means having or showing keen mental discernment and good judgement." },
  { id: 43, q: "Choose the synonym of TACITURN:", options: ["Talkative", "Reticent", "Loquacious", "Garrulous"], correct: 1, explanation: "'Taciturn' means reserved or uncommunicative in speech." },
  { id: 44, q: "Choose the antonym of VACILLATE:", options: ["Waver", "Decide", "Hesitate", "Oscillate"], correct: 1, explanation: "'Vacillate' means to waver between different opinions or actions. 'Decide' is firm." },
  { id: 45, q: "Choose the synonym of VENERATE:", options: ["Despise", "Revere", "Scorn", "Mock"], correct: 1, explanation: "'Venerate' means to regard with great respect." },
  { id: 46, q: "Choose the antonym of VERACIOUS:", options: ["Truthful", "Mendacious", "Honest", "Frank"], correct: 1, explanation: "'Veracious' means speaking or representing the truth. 'Mendacious' means lying." },
  { id: 47, q: "Choose the synonym of ZEALOT:", options: ["Moderate", "Fanatic", "Cynic", "Skeptic"], correct: 1, explanation: "'Zealot' is a person who is fanatical and uncompromising in pursuit of their ideals." },
  { id: 48, q: "Choose the antonym of ABSTRUSE:", options: ["Obscure", "Lucid", "Esoteric", "Recondite"], correct: 1, explanation: "'Abstruse' means difficult to understand. 'Lucid' means easy to understand." },
  { id: 49, q: "Choose the synonym of BELLIGERENT:", options: ["Peaceable", "Pugnacious", "Friendly", "Amiable"], correct: 1, explanation: "'Belligerent' means hostile and aggressive." },
  { id: 50, q: "Choose the antonym of COMPLACENT:", options: ["Smug", "Dissatisfied", "Contented", "Satisfied"], correct: 1, explanation: "'Complacent' means showing uncritical satisfaction with oneself. 'Dissatisfied' is the opposite." },
  // Set 6
  { id: 51, q: "Choose the synonym of DESULTORY:", options: ["Systematic", "Casual", "Methodical", "Orderly"], correct: 1, explanation: "'Desultory' means lacking a plan, purpose, or enthusiasm." },
  { id: 52, q: "Choose the antonym of EBULLIENT:", options: ["Buoyant", "Depressed", "Cheerful", "Animated"], correct: 1, explanation: "'Ebullient' means cheerful and full of energy." },
  { id: 53, q: "Choose the synonym of ENERVATE:", options: ["Energise", "Exhaust", "Invigorate", "Strengthen"], correct: 1, explanation: "'Enervate' means to make someone feel drained of energy." },
  { id: 54, q: "Choose the antonym of EQUANIMITY:", options: ["Composure", "Agitation", "Serenity", "Calmness"], correct: 1, explanation: "'Equanimity' is calmness and composure, especially in a difficult situation." },
  { id: 55, q: "Choose the synonym of EXCULPATE:", options: ["Convict", "Exonerate", "Blame", "Accuse"], correct: 1, explanation: "'Exculpate' means to show or declare that someone is not guilty of wrongdoing." },
  { id: 56, q: "Choose the antonym of FERVOR:", options: ["Passion", "Apathy", "Ardor", "Eagerness"], correct: 1, explanation: "'Fervor' is intense and passionate feeling. 'Apathy' is a lack of interest." },
  { id: 57, q: "Choose the synonym of GARRULOUS:", options: ["Taciturn", "Voluble", "Reticent", "Silent"], correct: 1, explanation: "'Garrulous' means excessively talkative, especially on trivial matters." },
  { id: 58, q: "Choose the antonym of HARANGUE:", options: ["Tirade", "Conversation", "Lecture", "Diatribe"], correct: 1, explanation: "'Harangue' is a lengthy and aggressive speech." },
  { id: 59, q: "Choose the synonym of ICONOCLAST:", options: ["Believer", "Heretic", "Conformist", "Follower"], correct: 1, explanation: "'Iconoclast' is a person who attacks cherished beliefs or institutions." },
  { id: 60, q: "Choose the antonym of IMMUTABLE:", options: ["Fixed", "Variable", "Constant", "Eternal"], correct: 1, explanation: "'Immutable' means unchanging over time or unable to be changed." },
  // Set 7
  { id: 61, q: "Choose the synonym of IMPLACABLE:", options: ["Relentless", "Forgiving", "Merciful", "Yielding"], correct: 0, explanation: "'Implacable' means unable to be appeased or placated." },
  { id: 62, q: "Choose the antonym of INCHOATE:", options: ["Rudimentary", "Developed", "Formless", "Emerging"], correct: 1, explanation: "'Inchoate' means just begun and so not fully formed or developed." },
  { id: 63, q: "Choose the synonym of INSIPID:", options: ["Bland", "Exciting", "Flavourful", "Savory"], correct: 0, explanation: "'Insipid' means lacking flavour or interest." },
  { id: 64, q: "Choose the antonym of INTREPID:", options: ["Fearless", "Timid", "Brave", "Dauntless"], correct: 1, explanation: "'Intrepid' means fearless; adventurous." },
  { id: 65, q: "Choose the synonym of LACONIC:", options: ["Verbose", "Succinct", "Wordy", "Prolix"], correct: 1, explanation: "'Laconic' means using very few words." },
  { id: 66, q: "Choose the antonym of MALLEABLE:", options: ["Pliant", "Rigid", "Ductile", "Flexible"], correct: 1, explanation: "'Malleable' means easily influenced or shaped. 'Rigid' is unyielding." },
  { id: 67, q: "Choose the synonym of MUNIFICENT:", options: ["Stingy", "Bountiful", "Penurious", "Frugal"], correct: 1, explanation: "'Munificent' means very generous." },
  { id: 68, q: "Choose the antonym of OBSEQUIOUS:", options: ["Servile", "Domineering", "Fawning", "Sycophantic"], correct: 1, explanation: "'Obsequious' means obedient or attentive to an excessive degree." },
  { id: 69, q: "Choose the synonym of PENCHANT:", options: ["Dislike", "Inclination", "Aversion", "Hatred"], correct: 1, explanation: "'Penchant' means a strong or habitual liking for something." },
  { id: 70, q: "Choose the antonym of PRODIGAL:", options: ["Wasteful", "Parsimonious", "Extravagant", "Lavish"], correct: 1, explanation: "'Prodigal' means spending money freely and recklessly. 'Parsimonious' means very unwilling to spend." },
  // Set 8
  { id: 71, q: "Choose the synonym of RANCOR:", options: ["Amity", "Malice", "Goodwill", "Friendship"], correct: 1, explanation: "'Rancor' means bitterness or resentfulness." },
  { id: 72, q: "Choose the antonym of RETICENT:", options: ["Reserved", "Garrulous", "Quiet", "Taciturn"], correct: 1, explanation: "'Reticent' means not revealing one's thoughts easily." },
  { id: 73, q: "Choose the synonym of SALUBRIOUS:", options: ["Healthy", "Noxious", "Harmful", "Unwholesome"], correct: 0, explanation: "'Salubrious' means health-giving; healthy." },
  { id: 74, q: "Choose the antonym of SOPORIFIC:", options: ["Somnolent", "Stimulating", "Sedative", "Sleepy"], correct: 1, explanation: "'Soporific' means tending to induce sleep." },
  { id: 75, q: "Choose the synonym of SPECIOUS:", options: ["Genuine", "Deceptive", "Valid", "Authentic"], correct: 1, explanation: "'Specious' means superficially plausible, but actually wrong." },
  { id: 76, q: "Choose the antonym of TORPOR:", options: ["Lethargy", "Animation", "Sluggishness", "Inactivity"], correct: 1, explanation: "'Torpor' is a state of physical or mental inactivity." },
  { id: 77, q: "Choose the synonym of UBIQUITOUS:", options: ["Rare", "Pervasive", "Scarce", "Unique"], correct: 1, explanation: "'Ubiquitous' means present, appearing, or found everywhere." },
  { id: 78, q: "Choose the antonym of VENERATE:", options: ["Revere", "Dishonour", "Hallow", "Worship"], correct: 1, explanation: "'Venerate' means to regard with great respect." },
  { id: 79, q: "Choose the synonym of VOLATILE:", options: ["Stable", "Unstable", "Constant", "Steady"], correct: 1, explanation: "'Volatile' means liable to change rapidly and unpredictably." },
  { id: 80, q: "Choose the antonym of WARY:", options: ["Cautious", "Trusting", "Circumspect", "Alert"], correct: 1, explanation: "'Wary' means feeling or showing caution about possible dangers." },
  // Set 9
  { id: 81, q: "Choose the synonym of ABSTRUSE:", options: ["Lucid", "Recondite", "Simple", "Plain"], correct: 1, explanation: "'Abstruse' means difficult to understand; obscure." },
  { id: 82, q: "Choose the antonym of AMENABLE:", options: ["Compliant", "Intractable", "Docile", "Responsive"], correct: 1, explanation: "'Amenable' means open and responsive to suggestion." },
  { id: 83, q: "Choose the synonym of CAUSTIC:", options: ["Mild", "Acerbic", "Kind", "Soothing"], correct: 1, explanation: "'Caustic' means sarcastic in a scathing and bitter way." },
  { id: 84, q: "Choose the antonym of DEFERENCE:", options: ["Respect", "Contempt", "Homage", "Reverence"], correct: 1, explanation: "'Deference' is polite submission and respect." },
  { id: 85, q: "Choose the synonym of ELUCIDATE:", options: ["Confuse", "Clarify", "Obscure", "Cloud"], correct: 1, explanation: "'Elucidate' means to make something clear; explain." },
  { id: 86, q: "Choose the antonym of FACETIOUS:", options: ["Flippant", "Serious", "Glib", "Joking"], correct: 1, explanation: "'Facetious' means treating serious issues with deliberately inappropriate humour." },
  { id: 87, q: "Choose the synonym of GUILD:", options: ["Deceit", "Candor", "Honesty", "Frankness"], correct: 0, explanation: "'Guile' means sly or cunning intelligence." },
  { id: 88, q: "Choose the antonym of HAPLESS:", options: ["Unfortunate", "Lucky", "Wretched", "Miserable"], correct: 1, explanation: "'Hapless' means unfortunate." },
  { id: 89, q: "Choose the synonym of INURED:", options: ["Sensitive", "Hardened", "Fragile", "Delicate"], correct: 1, explanation: "'Inured' means accustomed to something, especially something unpleasant." },
  { id: 90, q: "Choose the antonym of JUXTAPOSE:", options: ["Collocate", "Separate", "Compare", "Match"], correct: 1, explanation: "'Juxtapose' means to place side by side for contrast." },
  // Set 10
  { id: 91, q: "Choose the synonym of MALIGN:", options: ["Praise", "Slander", "Commend", "Applaud"], correct: 1, explanation: "'Malign' means to speak about someone in a spitefully critical manner." },
  { id: 92, q: "Choose the antonym of NONCHALANT:", options: ["Calm", "Anxious", "Composed", "Indifferent"], correct: 1, explanation: "'Nonchalant' means feeling or appearing casually calm and relaxed." },
  { id: 93, q: "Choose the synonym of OPULENT:", options: ["Poor", "Wealthy", "Destitute", "Indigent"], correct: 1, explanation: "'Opulent' means ostentatiously costly and luxurious." },
  { id: 94, q: "Choose the antonym of PERFUNCTORY:", options: ["Cursory", "Thorough", "Careless", "Hasty"], correct: 1, explanation: "'Perfunctory' means carried out with a minimum of effort or reflection." },
  { id: 95, q: "Choose the synonym of RECAPITULATE:", options: ["Summarise", "Expand", "Elongate", "Prolong"], correct: 0, explanation: "'Recapitulate' means to summarise and state again the main points." },
  { id: 96, q: "Choose the antonym of SPURIOUS:", options: ["Deceptive", "Authentic", "Fake", "False"], correct: 1, explanation: "'Spurious' means not being what it purports to be; false." },
  { id: 97, q: "Choose the synonym of TENUOUS:", options: ["Robust", "Flimsy", "Strong", "Sturdy"], correct: 1, explanation: "'Tenuous' means very weak or slight." },
  { id: 98, q: "Choose the antonym of UPBRAID:", options: ["Scold", "Commend", "Chastise", "Reprimand"], correct: 1, explanation: "'Upbraid' means to find fault with someone; scold." },
  { id: 99, q: "Choose the synonym of WIZENED:", options: ["Youthful", "Shrivelled", "Fresh", "Smooth"], correct: 1, explanation: "'Wizened' means shrivelled or wrinkled with age." },
  { id: 100, q: "Choose the antonym of ZENITH:", options: ["Peak", "Nadir", "Summit", "Apex"], correct: 1, explanation: "'Zenith' is the time at which something is most powerful. 'Nadir' is the lowest point." },
  // Set 11
  { id: 101, q: "Choose the synonym of ABERRATION:", options: ["Normality", "Deviation", "Standard", "Regularity"], correct: 1, explanation: "'Aberration' refers to a departure from what is normal or expected." },
  { id: 102, q: "Choose the antonym of ABEYANCE:", options: ["Suspension", "Continuation", "Inactivity", "Dormancy"], correct: 1, explanation: "'Abeyance' means a state of temporary disuse or suspension. 'Continuation' is its direct opposite." },
  { id: 103, q: "Choose the synonym of ABJECT:", options: ["Proud", "Wretched", "Exalted", "Sublime"], correct: 1, explanation: "'Abject' describes something extremely bad, unpleasant, and degrading." },
  { id: 104, q: "Choose the antonym of ADMONISH:", options: ["Reprimand", "Praise", "Scold", "Chastise"], correct: 1, explanation: "'Admonish' means to warn or reprimand someone firmly." },
  { id: 105, q: "Choose the synonym of ADROIT:", options: ["Clumsy", "Skillful", "Awkward", "Incompetent"], correct: 1, explanation: "'Adroit' means clever or skillful in using the hands or mind." },
  { id: 106, q: "Choose the antonym of AFFLUENCE:", options: ["Wealth", "Poverty", "Riches", "Prosperity"], correct: 1, explanation: "'Affluence' is the state of having a great deal of money; wealth." },
  { id: 107, q: "Choose the synonym of AGGREGATE:", options: ["Individual", "Total", "Separate", "Single"], correct: 1, explanation: "'Aggregate' refers to a whole formed by combining several separate elements." },
  { id: 108, q: "Choose the antonym of ALOOF:", options: ["Reserved", "Friendly", "Distant", "Detached"], correct: 1, explanation: "'Aloof' means not friendly or forthcoming; cool and distant." },
  { id: 109, q: "Choose the synonym of AMBIGUOUS:", options: ["Clear", "Equivocal", "Explicit", "Definite"], correct: 1, explanation: "'Ambiguous' means open to more than one interpretation; not having one obvious meaning." },
  { id: 110, q: "Choose the antonym of AMBIVALENT:", options: ["Uncertain", "Decisive", "Irresolute", "Doubtful"], correct: 1, explanation: "'Ambivalent' means having mixed feelings or contradictory ideas about something." },
  // Set 12
  { id: 111, q: "Choose the synonym of AMORPHOUS:", options: ["Shapely", "Formless", "Structured", "Definite"], correct: 1, explanation: "'Amorphous' means without a clearly defined shape or form." },
  { id: 112, q: "Choose the antonym of ANOMALY:", options: ["Irregularity", "Normality", "Abnormality", "Deviation"], correct: 1, explanation: "'Anomaly' is something that deviates from what is standard, normal, or expected." },
  { id: 113, q: "Choose the synonym of ARCHAIC:", options: ["Modern", "Obsolete", "Contemporary", "Current"], correct: 1, explanation: "'Archaic' means very old or old-fashioned." },
  { id: 114, q: "Choose the antonym of ARDENT:", options: ["Passionate", "Indifferent", "Fervent", "Zealous"], correct: 1, explanation: "'Ardent' means very enthusiastic or passionate." },
  { id: 115, q: "Choose the synonym of ASCETIC:", options: ["Indulgent", "Austere", "Luxurious", "Sybaritic"], correct: 1, explanation: "'Ascetic' describes a person who practices severe self-discipline and abstention." },
  { id: 116, q: "Choose the antonym of ASSUAGE:", options: ["Relieve", "Exacerbate", "Soothe", "Calm"], correct: 1, explanation: "'Assuage' means to make an unpleasant feeling less intense." },
  { id: 117, q: "Choose the synonym of ATROPHY:", options: ["Growth", "Wither", "Flourish", "Strengthen"], correct: 1, explanation: "'Atrophy' means to waste away, typically due to the degeneration of cells." },
  { id: 118, q: "Choose the antonym of AVARICE:", options: ["Greed", "Generosity", "Cupidity", "Covetousness"], correct: 1, explanation: "'Avarice' is extreme greed for wealth or material gain." },
  { id: 119, q: "Choose the synonym of BELLICOSE:", options: ["Peaceful", "Pugnacious", "Amiable", "Conciliatory"], correct: 1, explanation: "'Bellicose' means demonstrating aggression and willingness to fight." },
  { id: 120, q: "Choose the antonym of BLITHE:", options: ["Happy", "Melancholy", "Cheerful", "Carefree"], correct: 1, explanation: "'Blithe' means showing a casual and cheerful indifference considered to be callous or improper." },
  // Set 13
  { id: 121, q: "Choose the synonym of BURGEON:", options: ["Decline", "Flourish", "Decrease", "Wither"], correct: 1, explanation: "'Burgeon' means to begin to grow or increase rapidly." },
  { id: 122, q: "Choose the antonym of CALLOUS:", options: ["Insensitive", "Compassionate", "Heartless", "Unfeeling"], correct: 1, explanation: "'Callous' means showing or having an insensitive and cruel disregard for others." },
  { id: 123, q: "Choose the synonym of CANONICAL:", options: ["Unorthodox", "Standard", "Unconventional", "Heretical"], correct: 1, explanation: "'Canonical' refers to something that is included in the list of sacred books or accepted as genuine." },
  { id: 124, q: "Choose the antonym of CASTIGATE:", options: ["Reprimand", "Praise", "Scold", "Chastise"], correct: 1, explanation: "'Castigate' means to reprimand someone severely." },
  { id: 125, q: "Choose the synonym of CATALYST:", options: ["Inhibitor", "Stimulant", "Hinderance", "Blockage"], correct: 1, explanation: "'Catalyst' is a person or thing that precipitates an event." },
  { id: 126, q: "Choose the antonym of CAUSTIC:", options: ["Sarcastic", "Gentle", "Biting", "Acerbic"], correct: 1, explanation: "'Caustic' means sarcastic in a scathing and bitter way." },
  { id: 127, q: "Choose the synonym of CHAUVINISM:", options: ["Tolerance", "Jingoism", "Open-mindedness", "Neutrality"], correct: 1, explanation: "'Chauvinism' is exaggerated or aggressive patriotism." },
  { id: 128, q: "Choose the antonym of CHICANERY:", options: ["Deception", "Honesty", "Trickery", "Duplicity"], correct: 1, explanation: "'Chicanery' is the use of trickery to achieve a political, financial, or legal purpose." },
  { id: 129, q: "Choose the synonym of CIRCUMSPECT:", options: ["Reckless", "Cautious", "Careless", "Rash"], correct: 1, explanation: "'Circumspect' means wary and unwilling to take risks." },
  { id: 130, q: "Choose the antonym of COALESCE:", options: ["Merge", "Separate", "Combine", "Unite"], correct: 1, explanation: "'Coalesce' means to come together to form one mass or whole." },
  // Set 14
  { id: 131, q: "Choose the synonym of CONFLUENCE:", options: ["Divergence", "Junction", "Separation", "Split"], correct: 1, explanation: "'Confluence' is the process of merging or joining." },
  { id: 132, q: "Choose the antonym of CONTENTIOUS:", options: ["Argumentative", "Agreeable", "Quarrelsome", "Combative"], correct: 1, explanation: "'Contentious' means causing or likely to cause an argument." },
  { id: 133, q: "Choose the synonym of CONTRITE:", options: ["Unrepentant", "Penitent", "Defiant", "Obdurate"], correct: 1, explanation: "'Contrite' means feeling or expressing remorse or penitence." },
  { id: 134, q: "Choose the antonym of CONVOLUTED:", options: ["Complex", "Simple", "Intricate", "Complicated"], correct: 1, explanation: "'Convoluted' means extremely complex and difficult to follow." },
  { id: 135, q: "Choose the synonym of CREDULITY:", options: ["Skepticism", "Gullibility", "Disbelief", "Suspicion"], correct: 1, explanation: "'Credulity' is a tendency to be too ready to believe that something is real or true." },
  { id: 136, q: "Choose the antonym of DEARTH:", options: ["Scarcity", "Abundance", "Lack", "Shortage"], correct: 1, explanation: "'Dearth' is a scarcity or lack of something." },
  { id: 137, q: "Choose the synonym of DECORUM:", options: ["Impropriety", "Propriety", "Rudeness", "Coarseness"], correct: 1, explanation: "'Decorum' is behavior in keeping with good taste and propriety." },
  { id: 138, q: "Choose the antonym of DEFERENCE:", options: ["Respect", "Disrespect", "Homage", "Reverence"], correct: 1, explanation: "'Deference' is humble submission and respect." },
  { id: 139, q: "Choose the synonym of DELINEATE:", options: ["Confuse", "Describe", "Distort", "Muddle"], correct: 1, explanation: "'Delineate' means to describe or portray something precisely." },
  { id: 140, q: "Choose the antonym of DEMUR:", options: ["Object", "Accept", "Protest", "Dissent"], correct: 1, explanation: "'Demur' means to raise doubts or objections or show reluctance." },
  // Set 15
  { id: 141, q: "Choose the synonym of DERISION:", options: ["Respect", "Mockery", "Admiration", "Praise"], correct: 1, explanation: "'Derision' is contemptuous ridicule or mockery." },
  { id: 142, q: "Choose the antonym of DESICCATE:", options: ["Dry", "Moisten", "Dehydrate", "Parch"], correct: 1, explanation: "'Desiccate' means to remove the moisture from something." },
  { id: 143, q: "Choose the synonym of DIATRIBE:", options: ["Encomium", "Tirade", "Praise", "Eulogy"], correct: 1, explanation: "'Diatribe' is a forceful and bitter verbal attack against someone or something." },
  { id: 144, q: "Choose the antonym of DIFFIDENT:", options: ["Shy", "Confident", "Timid", "Modest"], correct: 1, explanation: "'Diffident' means modest or shy due to a lack of self-confidence." },
  { id: 145, q: "Choose the synonym of DISPARATE:", options: ["Similar", "Distinct", "Uniform", "Alike"], correct: 1, explanation: "'Disparate' describes things that are essentially different in kind." },
  { id: 146, q: "Choose the antonym of DISSEMBLE:", options: ["Feign", "Reveal", "Pretend", "Disguise"], correct: 1, explanation: "'Dissemble' means to conceal one's true motives, feelings, or beliefs." },
  { id: 147, q: "Choose the synonym of DISSONANCE:", options: ["Harmony", "Discord", "Accord", "Agreement"], correct: 1, explanation: "'Dissonance' is a lack of harmony among musical notes or people." },
  { id: 148, q: "Choose the antonym of EBULLIENT:", options: ["Exuberant", "Depressed", "Cheerful", "Vivacious"], correct: 1, explanation: "'Ebullient' means cheerful and full of energy." },
  { id: 149, q: "Choose the synonym of ECLECTIC:", options: ["Narrow", "Diverse", "Restricted", "Uniform"], correct: 1, explanation: "'Eclectic' means deriving ideas, style, or taste from a broad and diverse range of sources." },
  { id: 150, q: "Choose the antonym of EFFICACY:", options: ["Effectiveness", "Incompetence", "Potency", "Success"], correct: 1, explanation: "'Efficacy' is the ability to produce a desired or intended result." },
  // Set 16
  { id: 151, q: "Choose the synonym of ELUCIDATE:", options: ["Confuse", "Clarify", "Obscure", "Cloud"], correct: 1, explanation: "'Elucidate' means to make something clear; explain." },
  { id: 152, q: "Choose the antonym of ENERVATE:", options: ["Exhaust", "Energise", "Fatigue", "Drain"], correct: 1, explanation: "'Enervate' means to cause someone to feel drained of energy or vitality." },
  { id: 153, q: "Choose the synonym of ENGENDER:", options: ["Stifle", "Produce", "Prevent", "Halt"], correct: 1, explanation: "'Engender' means to cause or give rise to a feeling, situation, or condition." },
  { id: 154, q: "Choose the antonym of ENIGMATIC:", options: ["Mysterious", "Clear", "Puzzling", "Perplexing"], correct: 1, explanation: "'Enigmatic' describes someone or something that is difficult to interpret or understand." },
  { id: 155, q: "Choose the synonym of ENUMERATE:", options: ["Guess", "List", "Estimate", "Appraise"], correct: 1, explanation: "'Enumerate' means to mention a number of things one by one." },
  { id: 156, q: "Choose the antonym of EPHEMERAL:", options: ["Transient", "Permanent", "Fleeting", "Short-lived"], correct: 1, explanation: "'Ephemeral' refers to something that lasts for a very short time." },
  { id: 157, q: "Choose the synonym of EQUIVOCATE:", options: ["Confront", "Prevaricate", "Be honest", "Clarify"], correct: 1, explanation: "'Equivocate' means to use ambiguous language so as to conceal the truth." },
  { id: 158, q: "Choose the antonym of ERUDITE:", options: ["Scholarly", "Ignorant", "Learned", "Academic"], correct: 1, explanation: "'Erudite' means having or showing great knowledge or learning." },
  { id: 159, q: "Choose the synonym of ESOTERIC:", options: ["Common", "Abstruse", "Public", "Universal"], correct: 1, explanation: "'Esoteric' refers to knowledge intended for or likely to be understood by only a small number of people." },
  { id: 160, q: "Choose the antonym of EUPHEMISM:", options: ["Substitute", "Dysphemism", "Polite term", "Understatement"], correct: 1, explanation: "'Euphemism' is a mild or indirect word or expression substituted for one considered to be too harsh." },
  // Set 17
  { id: 161, q: "Choose the synonym of EXACERBATE:", options: ["Alleviate", "Aggravate", "Soothe", "Calm"], correct: 1, explanation: "'Exacerbate' means to make a problem, bad situation, or negative feeling worse." },
  { id: 162, q: "Choose the antonym of EXCULPATE:", options: ["Exonerate", "Convict", "Acquit", "Clear"], correct: 1, explanation: "'Exculpate' means to show or declare that someone is not guilty of wrongdoing." },
  { id: 163, q: "Choose the synonym of EXIGENT:", options: ["Trivial", "Urgent", "Easy", "Facile"], correct: 1, explanation: "'Exigent' means pressing; demanding." },
  { id: 164, q: "Choose the antonym of EXONERATE:", options: ["Acquit", "Condemn", "Clear", "Exculpate"], correct: 1, explanation: "'Exonerate' means to absolve someone from blame for a fault or wrongdoing." },
  { id: 165, q: "Choose the synonym of FACETIOUS:", options: ["Serious", "Flippant", "Solemn", "Grave"], correct: 1, explanation: "'Facetious' means treating serious issues with deliberately inappropriate humor." },
  { id: 166, q: "Choose the antonym of FACILITATE:", options: ["Assist", "Hinder", "Ease", "Help"], correct: 1, explanation: "'Facilitate' means to make an action or process easy or easier." },
  { id: 167, q: "Choose the synonym of FALLACIOUS:", options: ["Truthful", "Erroneous", "Valid", "Authentic"], correct: 1, explanation: "'Fallacious' describes something based on a mistaken belief." },
  { id: 168, q: "Choose the antonym of FASTIDIOUS:", options: ["Meticulous", "Careless", "Scrupulous", "Exact"], correct: 1, explanation: "'Fastidious' means very attentive to and concerned about accuracy and detail." },
  { id: 169, q: "Choose the synonym of FATUOUS:", options: ["Sensible", "Inane", "Wise", "Intelligent"], correct: 1, explanation: "'Fatuous' means silly and pointless." },
  { id: 170, q: "Choose the antonym of FAWNING:", options: ["Sycophantic", "Arrogant", "Obsequious", "Servile"], correct: 1, explanation: "'Fawning' describes someone displaying exaggerated flattery or affection." },
  // Set 18
  { id: 171, q: "Choose the synonym of FERVID:", options: ["Indifferent", "Ardent", "Cold", "Apathetic"], correct: 1, explanation: "'Fervid' means intensely enthusiastic or passionate, especially to an excessive degree." },
  { id: 172, q: "Choose the antonym of FRUGALITY:", options: ["Thrift", "Prodigality", "Parsimony", "Economy"], correct: 1, explanation: "'Frugality' is the quality of being economical with money or food. 'Prodigality' is wasteful extravagance." },
  { id: 173, q: "Choose the synonym of GARRULOUS:", options: ["Reticent", "Voluble", "Taciturn", "Silent"], correct: 1, explanation: "'Garrulous' means excessively talkative, especially on trivial matters." },
  { id: 174, q: "Choose the antonym of GREGARIOUS:", options: ["Sociable", "Antisocial", "Convivial", "Friendly"], correct: 1, explanation: "'Gregarious' means fond of company; sociable." },
  { id: 175, q: "Choose the synonym of GUILE:", options: ["Candor", "Duplicity", "Honesty", "Sincerity"], correct: 1, explanation: "'Guile' means sly or cunning intelligence." },
  { id: 176, q: "Choose the antonym of HARANGUE:", options: ["Tirade", "Chat", "Lecture", "Diatribe"], correct: 1, explanation: "'Harangue' is a lengthy and aggressive speech." },
  { id: 177, q: "Choose the synonym of HOMOGENEOUS:", options: ["Varied", "Uniform", "Heterogeneous", "Diverse"], correct: 1, explanation: "'Homogeneous' describes things of the same kind; alike." },
  { id: 178, q: "Choose the antonym of HYPERBOLE:", options: ["Overstatement", "Understatement", "Exaggeration", "Excess"], correct: 1, explanation: "'Hyperbole' is exaggerated statements or claims not meant to be taken literally." },
  { id: 179, q: "Choose the synonym of ICONOCLAST:", options: ["Conformist", "Heretic", "Believer", "Follower"], correct: 1, explanation: "'Iconoclast' is a person who attacks cherished beliefs or institutions." },
  { id: 180, q: "Choose the antonym of IDOLATRY:", options: ["Adoration", "Contempt", "Veneration", "Devotion"], correct: 1, explanation: "'Idolatry' is extreme admiration, love, or reverence for something or someone." },
  // Set 19
  { id: 181, q: "Choose the synonym of IMMUTABLE:", options: ["Variable", "Fixed", "Changing", "Erratic"], correct: 1, explanation: "'Immutable' means unchanging over time or unable to be changed." },
  { id: 182, q: "Choose the antonym of IMPASSIVE:", options: ["Stolid", "Expressive", "Unemotional", "Apathetic"], correct: 1, explanation: "'Impassive' describes someone not feeling or showing emotion." },
  { id: 183, q: "Choose the synonym of IMPEDE:", options: ["Facilitate", "Obstruct", "Advance", "Help"], correct: 1, explanation: "'Impede' means to delay or prevent someone or something by obstructing them." },
  { id: 184, q: "Choose the antonym of IMPERVIOUS:", options: ["Vulnerable", "Unmoved", "Closed", "Resistant"], correct: 0, explanation: "'Impervious' means unable to be affected by. 'Vulnerable' is the opposite." },
  { id: 185, q: "Choose the synonym of IMPLACABLE:", options: ["Forgiving", "Relentless", "Yielding", "Merciful"], correct: 1, explanation: "'Implacable' means unable to be placated." },
  { id: 186, q: "Choose the antonym of IMPLICIT:", options: ["Inherent", "Explicit", "Tacit", "Indirect"], correct: 1, explanation: "'Implicit' means suggested though not directly expressed." },
  { id: 187, q: "Choose the synonym of INADVERTENTLY:", options: ["Deliberately", "Unintentionally", "Purposely", "Intentionally"], correct: 1, explanation: "'Inadvertently' means without intention; accidentally." },
  { id: 188, q: "Choose the antonym of INCHOATE:", options: ["Formless", "Mature", "Rudimentary", "Developing"], correct: 1, explanation: "'Inchoate' means just begun and so not fully formed or developed." },
  { id: 189, q: "Choose the synonym of INCONSEQUENTIAL:", options: ["Crucial", "Trivial", "Vital", "Significant"], correct: 1, explanation: "'Inconsequential' means not important or significant." },
  { id: 190, q: "Choose the antonym of INDIGENT:", options: ["Poor", "Wealthy", "Destitute", "Penniless"], correct: 1, explanation: "'Indigent' means poor; needy." },
  // Set 20
  { id: 191, q: "Choose the synonym of INDOLENT:", options: ["Industrious", "Slothful", "Diligent", "Active"], correct: 1, explanation: "'Indolent' means wanting to avoid activity or exertion; lazy." },
  { id: 192, q: "Choose the antonym of INGENUOUS:", options: ["Naive", "Disingenuous", "Innocent", "Trusting"], correct: 1, explanation: "'Ingenuous' means innocent and unsuspecting. 'Disingenuous' is the opposite." },
  { id: 193, q: "Choose the synonym of INNOCUOUS:", options: ["Harmful", "Harmless", "Toxic", "Noxious"], correct: 1, explanation: "'Innocuous' means not harmful or offensive." },
  { id: 194, q: "Choose the antonym of INSIPID:", options: ["Bland", "Flavourful", "Dull", "Uninteresting"], correct: 1, explanation: "'Insipid' means lacking flavor or interest." },
  { id: 195, q: "Choose the synonym of INTRACTABLE:", options: ["Docile", "Stubborn", "Compliant", "Manageable"], correct: 1, explanation: "'Intractable' means hard to control or deal with." },
  { id: 196, q: "Choose the antonym of INTREPID:", options: ["Brave", "Timid", "Fearless", "Dauntless"], correct: 1, explanation: "'Intrepid' means fearless; adventurous." },
  { id: 197, q: "Choose the synonym of INURED:", options: ["Sensitive", "Hardened", "Fragile", "Delicate"], correct: 1, explanation: "'Inured' means accustomed to something, especially something unpleasant." },
  { id: 198, q: "Choose the antonym of INVECTIVE:", options: ["Abuse", "Praise", "Vitriol", "Insult"], correct: 1, explanation: "'Invective' is insulting, abusive, or highly critical language." },
  { id: 199, q: "Choose the synonym of IRASCIBLE:", options: ["Amiable", "Irritable", "Placid", "Calm"], correct: 1, explanation: "'Irascible' means having a tendency to be easily angered." },
  { id: 200, q: "Choose the antonym of JUXTAPOSE:", options: ["Collocate", "Separate", "Compare", "Match"], correct: 1, explanation: "'Juxtapose' means to place side by side for contrast. 'Separate' is the opposite." }
]

export default function VocabQuizPage() {
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
    desc: `Targets high-yield word families ${i * 10 + 1}-${(i + 1) * 10}.`
  }))

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = VOCAB_QUIZ_DATA.slice(range[0], range[1]).map(q => {
        const cloned = { ...q, options: [...q.options] }
        const initialCorrectOpt = cloned.options[cloned.correct]
        const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
        cloned.options = shuffled
        cloned.correct = shuffled.indexOf(initialCorrectOpt)
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
      toast({ title: "Vocab Set Complete!", description: "Check your +5/-1 accuracy." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && selectedSetIndex !== null && !isFinished && questions.length > 0) {
        const qId = questions[currentStep].id
        if (answers[qId] !== undefined) {
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

  if (selectedSetIndex === null) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 3: Lexical Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Practice Selection</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical set to target specific word families. Each set contains 10 high-yield items with anti-guess logic applied.
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
                      <BookOpen className="w-6 h-6" />
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
              <Target className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
            <div className="grid grid-cols-2 gap-4 my-8">
              <div className="p-4 bg-green-50 rounded-2xl border border-green-100">
                <div className="text-xs font-bold text-green-700 uppercase">Correct</div>
                <div className="text-2xl font-bold text-green-700">+{correct * 5}</div>
              </div>
              <div className="p-4 bg-red-50 rounded-2xl border border-red-100">
                <div className="text-xs font-bold text-red-700 uppercase">Errors</div>
                <div className="text-2xl font-bold text-red-700">-{wrong}</div>
              </div>
            </div>
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Total Vocab Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                const { range } = quizSets[selectedSetIndex!]
                const selectedQuestions = VOCAB_QUIZ_DATA.slice(range[0], range[1]).map(q => {
                  const cloned = { ...q, options: [...q.options] }
                  const initialCorrectOpt = cloned.options[cloned.correct]
                  const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
                  cloned.options = shuffled
                  cloned.correct = shuffled.indexOf(initialCorrectOpt)
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
                Back to Dashboard
              </Button>
            </div>
          </Card>

          <section className="space-y-4">
            <h3 className="text-xl font-bold flex items-center gap-2 px-2">
              <Info className="w-5 h-5 text-primary" />
              Strategic Item Analysis
            </h3>
            {questions.map((q, idx) => {
              const userAns = answers[q.id]
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-3">
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-100/30" : "bg-red-100/30")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">Correct Option:</strong> {q.options[q.correct]}
                          </span>
                        </div>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground pt-4 border-t border-dashed">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
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
  const isCorrect = userAnswer !== undefined && userAnswer === q.correct

  return (
    <div className="min-h-screen bg-background">
      <main className="container mx-auto px-4 py-12 max-w-2xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Sets
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Lexical Practice</h1>
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
                const isCorrectOption = i === q.correct
                
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
                    <p className="text-muted-foreground leading-relaxed text-sm font-medium">
                      <strong className="text-foreground">Clinical Strategy:</strong> {q.explanation}
                    </p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        <div className="flex justify-between items-center mt-8">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold text-muted-foreground hover:text-primary">
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
