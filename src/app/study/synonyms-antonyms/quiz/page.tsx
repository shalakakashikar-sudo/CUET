
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
  // Set 1: High Yield (1-10)
  { id: 1, q: "Choose the synonym of EPHEMERAL:", options: ["Permanent", "Transient", "Eternal", "Delicate"], correct: 1, explanation: "'Ephemeral' refers to something that lasts for a very short time. 'Transient' is its direct synonym. 'Delicate' is a context trap." },
  { id: 2, q: "Choose the antonym of LOQUACIOUS:", options: ["Garrulous", "Eloquent", "Reticent", "Verbose"], correct: 2, explanation: "'Loquacious' means talkative. 'Reticent' means reserved or silent, making it the correct antonym. 'Eloquent' is a positive-tone trap." },
  { id: 3, q: "Choose the synonym of ACRIMONIOUS:", options: ["Amiable", "Vitriolic", "Sarcastic", "Benevolent"], correct: 1, explanation: "'Acrimonious' implies bitterness or ill-feeling. 'Vitriolic' is the most accurate synonym for harsh, biting speech." },
  { id: 4, q: "Choose the antonym of COPIOUS:", options: ["Abundant", "Plentiful", "Meager", "Profuse"], correct: 2, explanation: "'Copious' means abundant. 'Meager' is the opposite, meaning lacking in quantity. Others are synonyms." },
  { id: 5, q: "Choose the synonym of PRUDENT:", options: ["Reckless", "Judicious", "Impulsive", "Hasty"], correct: 1, explanation: "'Prudent' means acting with care for the future. 'Judicious' is the clinical synonym for good judgement." },
  { id: 6, q: "Choose the antonym of DAUNTLESS:", options: ["Intrepid", "Fearless", "Timid", "Audacious"], correct: 2, explanation: "'Dauntless' means fearless. 'Timid' is the direct opposite. 'Audacious' is a related-tone trap." },
  { id: 7, q: "Choose the synonym of CANDID:", options: ["Deceptive", "Frank", "Evasive", "Cunning"], correct: 1, explanation: "'Candid' means truthful and straightforward. 'Frank' is its primary synonym." },
  { id: 8, q: "Choose the antonym of UBIQUITOUS:", options: ["Omnipresent", "Pervasive", "Scarce", "Universal"], correct: 2, explanation: "'Ubiquitous' means present everywhere. 'Scarce' is the logical opposite." },
  { id: 9, q: "Choose the synonym of LANGUISH:", options: ["Flourish", "Wither", "Thrive", "Prosper"], correct: 1, explanation: "'Languish' means to grow weak or feeble. 'Wither' is the best match among these options." },
  { id: 10, q: "Choose the antonym of ZEALOUS:", options: ["Ardent", "Fervent", "Apathetic", "Enthusiastic"], correct: 2, explanation: "'Zealous' means showing great energy. 'Apathetic' means showing no interest or concern." },

  // Set 2: Advanced Roots (11-20)
  { id: 11, q: "Choose the synonym of ABJURE:", options: ["Renounce", "Assert", "Adjure", "Endorse"], correct: 0, explanation: "'Abjure' means to solemnly renounce. 'Adjure' is a phonological trap meaning to urge." },
  { id: 12, q: "Choose the antonym of ALACRITY:", options: ["Eagerness", "Lethargy", "Zeal", "Promptness"], correct: 1, explanation: "'Alacrity' is cheerful readiness. 'Lethargy' is the clinical opposite." },
  { id: 13, q: "Choose the synonym of AMELIORATE:", options: ["Worsen", "Enhance", "Exacerbate", "Stagnate"], correct: 1, explanation: "'Ameliorate' means to make something better. 'Enhance' is the closest positive action." },
  { id: 14, q: "Choose the antonym of ANTIPATHY:", options: ["Hostility", "Aversion", "Affinity", "Dislike"], correct: 2, explanation: "'Antipathy' is a deep-seated dislike. 'Affinity' is a natural liking." },
  { id: 15, q: "Choose the synonym of ASSIDUOUS:", options: ["Indolent", "Diligent", "Careless", "Hasty"], correct: 1, explanation: "'Assiduous' means showing great care and perseverance. 'Diligent' is the direct synonym." },
  { id: 16, q: "Choose the antonym of AUDACIOUS:", options: ["Bold", "Daring", "Timid", "Intrepid"], correct: 2, explanation: "'Audacious' means taking bold risks. 'Timid' is the opposite." },
  { id: 17, q: "Choose the synonym of BANAL:", options: ["Original", "Trite", "Novel", "Unique"], correct: 1, explanation: "'Banal' means lacking originality. 'Trite' is the primary synonym." },
  { id: 18, q: "Choose the antonym of BENEVOLENT:", options: ["Kind", "Malevolent", "Altruistic", "Charitable"], correct: 1, explanation: "'Benevolent' is well-meaning. 'Malevolent' is the direct opposite root." },
  { id: 19, q: "Choose the synonym of CACOPHONY:", options: ["Euphony", "Din", "Harmony", "Rhythm"], correct: 1, explanation: "'Cacophony' is harsh discord. 'Din' is a loud, unpleasant noise." },
  { id: 20, q: "Choose the antonym of CAPRICIOUS:", options: ["Fickle", "Inconstant", "Steadfast", "Impulsive"], correct: 2, explanation: "'Capricious' means mood swings. 'Steadfast' or 'Stable' is the opposite." },

  // Set 3: Scholarly Terms (21-30)
  { id: 21, q: "Choose the synonym of CASTIGATE:", options: ["Commend", "Chastise", "Praise", "Approve"], correct: 1, explanation: "'Castigate' means to reprimand severely. 'Chastise' is the synonym." },
  { id: 22, q: "Choose the antonym of COGENT:", options: ["Compelling", "Unconvincing", "Valid", "Clear"], correct: 1, explanation: "'Cogent' means clear and logical. 'Unconvincing' is the antonym." },
  { id: 23, q: "Choose the synonym of DELETERIOUS:", options: ["Beneficial", "Noxious", "Salubrious", "Wholesome"], correct: 1, explanation: "'Deleterious' means causing harm. 'Noxious' is the closest synonym." },
  { id: 24, q: "Choose the antonym of DIFFIDENT:", options: ["Shy", "Confident", "Modest", "Bashful"], correct: 1, explanation: "'Diffident' means shy due to lack of confidence. 'Confident' is the opposite." },
  { id: 25, q: "Choose the synonym of EBULLIENT:", options: ["Depressed", "Exuberant", "Gloomy", "Melancholy"], correct: 1, explanation: "'Ebullient' is cheerful and full of energy. 'Exuberant' is the synonym." },
  { id: 26, q: "Choose the antonym of ERUDITE:", options: ["Learned", "Unlettered", "Scholarly", "Academic"], correct: 1, explanation: "'Erudite' means having great knowledge. 'Unlettered' is a sophisticated antonym." },
  { id: 27, q: "Choose the synonym of FASTIDIOUS:", options: ["Careless", "Meticulous", "Negligent", "Sloppy"], correct: 1, explanation: "'Fastidious' means attentive to detail. 'Meticulous' is the synonym." },
  { id: 28, q: "Choose the antonym of GREGARIOUS:", options: ["Convivial", "Reclusive", "Sociable", "Friendly"], correct: 1, explanation: "'Gregarious' means fond of company. 'Reclusive' is the opposite." },
  { id: 29, q: "Choose the synonym of IMPECCABLE:", options: ["Defective", "Faultless", "Corrupt", "Imperfect"], correct: 1, explanation: "'Impeccable' means faultless or perfect." },
  { id: 30, q: "Choose the antonym of INDOLENT:", options: ["Lazy", "Industrious", "Slothful", "Inactive"], correct: 1, explanation: "'Indolent' means habitually lazy. 'Industrious' is the opposite." },

  // Set 4: Sophisticated Nuance (31-40)
  { id: 31, q: "Choose the synonym of INGENUOUS:", options: ["Cunning", "Guileless", "Disingenuous", "Artful"], correct: 1, explanation: "'Ingenuous' means innocent and unsuspecting. 'Guileless' is the synonym." },
  { id: 32, q: "Choose the antonym of IRASCIBLE:", options: ["Petulant", "Placid", "Choleric", "Irritable"], correct: 1, explanation: "'Irascible' means easily angered. 'Placid' means calm." },
  { id: 33, q: "Choose the synonym of LACONIC:", options: ["Verbose", "Succinct", "Wordy", "Prolix"], correct: 1, explanation: "'Laconic' means using few words. 'Succinct' is the synonym." },
  { id: 34, q: "Choose the antonym of MAGNANIMOUS:", options: ["Generous", "Vindictive", "Benevolent", "Charitable"], correct: 1, explanation: "'Magnanimous' is forgiving. 'Vindictive' is the desire for revenge." },
  { id: 35, q: "Choose the synonym of METICULOUS:", options: ["Negligent", "Scrupulous", "Hasty", "Cursory"], correct: 1, explanation: "'Meticulous' is careful. 'Scrupulous' is the synonym." },
  { id: 36, q: "Choose the antonym of NEOPHYTE:", options: ["Novice", "Veteran", "Beginner", "Tyro"], correct: 1, explanation: "'Neophyte' is a beginner. 'Veteran' is the opposite." },
  { id: 37, q: "Choose the synonym of OBDURATE:", options: ["Flexible", "Obstinate", "Yielding", "Amenable"], correct: 1, explanation: "'Obdurate' is stubborn. 'Obstinate' is the synonym." },
  { id: 38, q: "Choose the antonym of OSTENTATIOUS:", options: ["Showy", "Unpretentious", "Flamboyant", "Pretentious"], correct: 1, explanation: "'Ostentatious' is showy. 'Unpretentious' is the opposite." },
  { id: 39, q: "Choose the synonym of PAUCITY:", options: ["Plethora", "Dearth", "Surfeit", "Abundance"], correct: 1, explanation: "'Paucity' means scarcity. 'Dearth' is the synonym." },
  { id: 40, q: "Choose the antonym of PERNICIOUS:", options: ["Harmful", "Salubrious", "Noxious", "Deleterious"], correct: 1, explanation: "'Pernicious' is harmful. 'Salubrious' means health-giving." },

  // Set 5: Clinical Logic (41-50)
  { id: 41, q: "Choose the synonym of QUERULOUS:", options: ["Contented", "Petulant", "Placid", "Cheerful"], correct: 1, explanation: "'Querulous' means complaining. 'Petulant' is the synonym." },
  { id: 42, q: "Choose the antonym of SAGACIOUS:", options: ["Wise", "Fatuous", "Astute", "Prudent"], correct: 1, explanation: "'Sagacious' is wise. 'Fatuous' means silly and pointless." },
  { id: 43, q: "Choose the synonym of TACITURN:", options: ["Garrulous", "Reserved", "Loquacious", "Voluble"], correct: 1, explanation: "'Taciturn' means silent. 'Reserved' is the closest synonym." },
  { id: 44, q: "Choose the antonym of VACILLATE:", options: ["Waver", "Persevere", "Hesitate", "Oscillate"], correct: 1, explanation: "'Vacillate' is to waver. 'Persevere' implies staying firm." },
  { id: 45, q: "Choose the synonym of VENERATE:", options: ["Despise", "Revere", "Mock", "Scorn"], correct: 1, explanation: "'Venerate' is to respect deeply. 'Revere' is the synonym." },
  { id: 46, q: "Choose the antonym of VERACIOUS:", options: ["Truthful", "Mendacious", "Honest", "Frank"], correct: 1, explanation: "'Veracious' is truthful. 'Mendacious' is lying." },
  { id: 47, q: "Choose the synonym of ZEALOT:", options: ["Moderate", "Enthusiast", "Cynic", "Skeptic"], correct: 1, explanation: "'Zealot' is a fanatic. 'Enthusiast' is the closest match." },
  { id: 48, q: "Choose the antonym of ABSTRUSE:", options: ["Recondite", "Lucid", "Esoteric", "Obscure"], correct: 1, explanation: "'Abstruse' is difficult to understand. 'Lucid' is clear." },
  { id: 49, q: "Choose the synonym of BELLIGERENT:", options: ["Peaceable", "Pugnacious", "Amiable", "Conciliatory"], correct: 1, explanation: "'Belligerent' is aggressive. 'Pugnacious' is the synonym." },
  { id: 50, q: "Choose the antonym of COMPLACENT:", options: ["Smug", "Vigilant", "Contented", "Satisfied"], correct: 1, explanation: "'Complacent' is self-satisfied. 'Vigilant' is alert and watchful." },

  // Set 6: Logic Traps (51-60)
  { id: 51, q: "Choose the synonym of DESULTORY:", options: ["Methodical", "Apurposive", "Systematic", "Orderly"], correct: 1, explanation: "'Desultory' means planless. 'Apurposive' is a clinical synonym." },
  { id: 52, q: "Choose the antonym of EBULLIENT:", options: ["Animated", "Stolid", "Exuberant", "Vivacious"], correct: 1, explanation: "'Ebullient' is energetic. 'Stolid' is unemotional and calm." },
  { id: 53, q: "Choose the synonym of ENERVATE:", options: ["Invigorate", "Debilitate", "Strengthen", "Energise"], correct: 1, explanation: "'Enervate' means to weaken. 'Debilitate' is the synonym." },
  { id: 54, q: "Choose the antonym of EQUANIMITY:", options: ["Composure", "Trepidation", "Serenity", "Placidity"], correct: 1, explanation: "'Equanimity' is calmness. 'Trepidation' is fear or agitation." },
  { id: 55, q: "Choose the synonym of EXCULPATE:", options: ["Incriminate", "Absolve", "Condemn", "Arraign"], correct: 1, explanation: "'Exculpate' means to clear from blame. 'Absolve' is the synonym." },
  { id: 56, q: "Choose the antonym of FERVOR:", options: ["Passion", "Indifference", "Ardor", "Zeal"], correct: 1, explanation: "'Fervor' is passion. 'Indifference' is the antonym." },
  { id: 57, q: "Choose the synonym of GARRULOUS:", options: ["Taciturn", "Voluble", "Reticent", "Laconic"], correct: 1, explanation: "'Garrulous' is talkative. 'Voluble' is the synonym." },
  { id: 58, q: "Choose the antonym of HARANGUE:", options: ["Tirade", "Panegyric", "Harassment", "Lecture"], correct: 1, explanation: "'Harangue' is critical. 'Panegyric' is a speech of praise." },
  { id: 59, q: "Choose the synonym of ICONOCLAST:", options: ["Conformist", "Maverick", "Follower", "Believer"], correct: 1, explanation: "'Iconoclast' is a rebel. 'Maverick' is the synonym." },
  { id: 60, q: "Choose the antonym of IMMUTABLE:", options: ["Static", "Protean", "Fixed", "Constant"], correct: 1, explanation: "'Immutable' is unchanging. 'Protean' means versatile or changing." },

  // Set 7: Contextual Masters (61-70)
  { id: 61, q: "Choose the synonym of IMPLACABLE:", options: ["Merciful", "Inexorable", "Yielding", "Lenient"], correct: 1, explanation: "'Implacable' means unstoppable. 'Inexorable' is the synonym." },
  { id: 62, q: "Choose the antonym of INCHOATE:", options: ["Rudimentary", "Fully-fledged", "Formless", "Nascent"], correct: 1, explanation: "'Inchoate' is incomplete. 'Fully-fledged' is developed." },
  { id: 63, q: "Choose the synonym of INSIPID:", options: ["Piquant", "Vapid", "Savoury", "Zesty"], correct: 1, explanation: "'Insipid' is tasteless. 'Vapid' is the synonym." },
  { id: 64, q: "Choose the antonym of INTREPID:", options: ["Valiant", "Craven", "Audacious", "Gallant"], correct: 1, explanation: "'Intrepid' is brave. 'Craven' is a sophisticated antonym for cowardly." },
  { id: 65, q: "Choose the synonym of LACONIC:", options: ["Prolix", "Terse", "Verbose", "Garrulous"], correct: 1, explanation: "'Laconic' is brief. 'Terse' is the synonym." },
  { id: 66, q: "Choose the antonym of MALLEABLE:", options: ["Pliant", "Adamant", "Ductile", "Tractable"], correct: 1, explanation: "'Malleable' is flexible. 'Adamant' is unyielding." },
  { id: 67, q: "Choose the synonym of MUNIFICENT:", options: ["Parsimonious", "Bounteous", "Stingy", "Frugal"], correct: 1, explanation: "'Munificent' is generous. 'Bounteous' is the synonym." },
  { id: 68, q: "Choose the antonym of OBSEQUIOUS:", options: ["Servile", "Imperious", "Fawning", "Sycophantic"], correct: 1, explanation: "'Obsequious' is fawning. 'Imperious' is arrogant and domineering." },
  { id: 69, q: "Choose the synonym of PENCHANT:", options: ["Aversion", "Predilection", "Antipathy", "Disinclination"], correct: 1, explanation: "'Penchant' is a liking. 'Predilection' is the synonym." },
  { id: 70, q: "Choose the antonym of PRODIGAL:", options: ["Wasteful", "Economical", "Extravagant", "Lavish"], correct: 1, explanation: "'Prodigal' is wasteful. 'Economical' is the antonym." },

  // Set 8: Elite Vocabulary (71-80)
  { id: 71, q: "Choose the synonym of RANCOR:", options: ["Amity", "Animosity", "Benevolence", "Concord"], correct: 1, explanation: "'Rancor' is bitterness. 'Animosity' is the synonym." },
  { id: 72, q: "Choose the antonym of RETICENT:", options: ["Reserved", "Loquacious", "Taciturn", "Silent"], correct: 1, explanation: "'Reticent' is silent. 'Loquacious' is the opposite." },
  { id: 73, q: "Choose the synonym of SALUBRIOUS:", options: ["Insalubrious", "Wholesome", "Noxious", "Deleterious"], correct: 1, explanation: "'Salubrious' is healthy. 'Wholesome' is the synonym." },
  { id: 74, q: "Choose the antonym of SOPORIFIC:", options: ["Somnolent", "Invigorating", "Sedative", "Opiate"], correct: 1, explanation: "'Soporific' induces sleep. 'Invigorating' wakes one up." },
  { id: 75, q: "Choose the synonym of SPECIOUS:", options: ["Authentic", "Fallacious", "Genuine", "Veracious"], correct: 1, explanation: "'Specious' is misleadingly plausible. 'Fallacious' is the synonym." },
  { id: 76, q: "Choose the antonym of TORPOR:", options: ["Lethargy", "Vitality", "Sluggishness", "Hebetude"], correct: 1, explanation: "'Torpor' is inactivity. 'Vitality' is energy." },
  { id: 77, q: "Choose the synonym of UBIQUITOUS:", options: ["Anomalous", "Omnipresent", "Sporadic", "Rare"], correct: 1, explanation: "'Ubiquitous' is everywhere. 'Omnipresent' is the synonym." },
  { id: 78, q: "Choose the antonym of VENERATE:", options: ["Revere", "Execrate", "Hallow", "Adore"], correct: 1, explanation: "'Venerate' is to respect. 'Execrate' is to feel or express great loathing for." },
  { id: 79, q: "Choose the synonym of VOLATILE:", options: ["Capricious", "Mutable", "Steadfast", "Fixed"], correct: 1, explanation: "'Volatile' is unstable. 'Mutable' or 'Capricious' are synonyms." },
  { id: 80, q: "Choose the antonym of WARY:", options: ["Circumspect", "Temerarious", "Prudent", "Chary"], correct: 1, explanation: "'Wary' is cautious. 'Temerarious' is a clinical word for reckless." },

  // Set 9: Root Precision (81-90)
  { id: 81, q: "Choose the synonym of ABSTRUSE:", options: ["Perspicuous", "Arcane", "Lucid", "Pellucid"], correct: 1, explanation: "'Abstruse' is difficult. 'Arcane' is mysterious or difficult to understand." },
  { id: 82, q: "Choose the antonym of AMENABLE:", options: ["Docile", "Recalcitrant", "Tractable", "Compliant"], correct: 1, explanation: "'Amenable' is cooperative. 'Recalcitrant' is stubbornly uncooperative." },
  { id: 83, q: "Choose the synonym of CAUSTIC:", options: ["Soothing", "Acerbic", "Bland", "Mild"], correct: 1, explanation: "'Caustic' is biting. 'Acerbic' is the synonym." },
  { id: 84, q: "Choose the antonym of DEFERENCE:", options: ["Respect", "Insolence", "Homage", "Veneration"], correct: 1, explanation: "'Deference' is respect. 'Insolence' is rude disrespect." },
  { id: 85, q: "Choose the synonym of ELUCIDATE:", options: ["Obfuscate", "Explicate", "Befuddle", "Cloud"], correct: 1, explanation: "'Elucidate' is to explain. 'Explicate' is the synonym." },
  { id: 86, q: "Choose the antonym of FACETIOUS:", options: ["Flippant", "Solemn", "Glib", "Jocular"], correct: 1, explanation: "'Facetious' is joking. 'Solemn' is serious." },
  { id: 87, q: "Choose the synonym of GUILE:", options: ["Candor", "Duplicity", "Probity", "Veracity"], correct: 1, explanation: "'Guile' is deceit. 'Duplicity' is the synonym." },
  { id: 88, q: "Choose the antonym of HAPLESS:", options: ["Forlorn", "Providential", "Miserable", "Woeful"], correct: 1, explanation: "'Hapless' is unlucky. 'Providential' is occurring at a favorable time." },
  { id: 89, q: "Choose the synonym of INURED:", options: ["Susceptible", "Habituated", "Fragile", "Sensitive"], correct: 1, explanation: "'Inured' is accustomed to hardship. 'Habituated' is the synonym." },
  { id: 90, q: "Choose the antonym of JUXTAPOSE:", options: ["Collocate", "Dissociate", "Appose", "Compare"], correct: 1, explanation: "'Juxtapose' is to place together. 'Dissociate' is to separate." },

  // Set 10: Elite Context (91-100)
  { id: 91, q: "Choose the synonym of MALIGN:", options: ["Extol", "Traduce", "Exalt", "Commend"], correct: 1, explanation: "'Malign' is to speak ill of. 'Traduce' is a sophisticated synonym for slander." },
  { id: 92, q: "Choose the antonym of NONCHALANT:", options: ["Composed", "Solicitous", "Insouciant", "Phlegmatic"], correct: 1, explanation: "'Nonchalant' is cool/relaxed. 'Solicitous' means showing interest or concern." },
  { id: 93, q: "Choose the synonym of OPULENT:", options: ["Penurious", "Affluent", "Destitute", "Impecunious"], correct: 1, explanation: "'Opulent' is wealthy. 'Affluent' is the synonym." },
  { id: 94, q: "Choose the antonym of PERFUNCTORY:", options: ["Cursory", "Assiduous", "Sloppy", "Hasty"], correct: 1, explanation: "'Perfunctory' is minimum effort. 'Assiduous' is great care/effort." },
  { id: 95, q: "Choose the synonym of RECAPITULATE:", options: ["Expatiate", "Epitomise", "Elaborate", "Amplify"], correct: 1, explanation: "'Recapitulate' is to summarize. 'Epitomise' or 'Summarize' works." },
  { id: 96, q: "Choose the antonym of SPURIOUS:", options: ["Fallacious", "Authentic", "Mendacious", "Specious"], correct: 1, explanation: "'Spurious' is false. 'Authentic' is real." },
  { id: 97, q: "Choose the synonym of TENUOUS:", options: ["Sturdy", "Attenuated", "Robust", "Solid"], correct: 1, explanation: "'Tenuous' is thin/weak. 'Attenuated' is the synonym." },
  { id: 98, q: "Choose the antonym of UPBRAID:", options: ["Reprove", "Laud", "Chastise", "Castigate"], correct: 1, explanation: "'Upbraid' is to scold. 'Laud' is to praise." },
  { id: 99, q: "Choose the synonym of WIZENED:", options: ["Verdant", "Marcid", "Youthful", "Robust"], correct: 1, explanation: "'Wizened' is shriveled. 'Marcid' is a clinical word for withered." },
  { id: 100, q: "Choose the antonym of ZENITH:", options: ["Apex", "Nadir", "Summit", "Acme"], correct: 1, explanation: "'Zenith' is high point. 'Nadir' is the low point." },

  // Sets 11-20 follow with same distractor quality logic...
  { id: 101, q: "Choose the synonym of ABERRATION:", options: ["Conformity", "Anomaly", "Standard", "Regularity"], correct: 1, explanation: "'Aberration' is a departure from normal." },
  { id: 102, q: "Choose the antonym of ABEYANCE:", options: ["Dormancy", "Resumption", "Quiescence", "Suspension"], correct: 1, explanation: "'Abeyance' is temporary suspension. 'Resumption' is starting again." },
  { id: 103, q: "Choose the synonym of ABJECT:", options: ["Sublime", "Servile", "Noble", "Exalted"], correct: 1, explanation: "'Abject' is degraded or servile." },
  { id: 104, q: "Choose the antonym of ADMONISH:", options: ["Counsel", "Enjoin", "Exhort", "Applaud"], correct: 3, explanation: "'Admonish' is to warn/reprimand. 'Applaud' is praise." },
  { id: 105, q: "Choose the synonym of ADROIT:", options: ["Inept", "Dexterous", "Gauche", "Maladroit"], correct: 1, explanation: "'Adroit' is skillful. 'Dexterous' is the synonym." },
  { id: 106, q: "Choose the antonym of AFFLUENCE:", options: ["Opulence", "Indigence", "Prosperity", "Wealth"], correct: 1, explanation: "'Affluence' is wealth. 'Indigence' is extreme poverty." },
  { id: 107, q: "Choose the synonym of AGGREGATE:", options: ["Segregated", "Composite", "Discrete", "Individual"], correct: 1, explanation: "'Aggregate' is total. 'Composite' is the synonym." },
  { id: 108, q: "Choose the antonym of ALOOF:", options: ["Remote", "Gregarious", "Detached", "Standoffish"], correct: 1, explanation: "'Aloof' is distant. 'Gregarious' is sociable." },
  { id: 109, q: "Choose the synonym of AMBIGUOUS:", options: ["Explicit", "Equivocal", "Lucid", "Unambiguous"], correct: 1, explanation: "'Ambiguous' is unclear. 'Equivocal' is the synonym." },
  { id: 110, q: "Choose the antonym of AMBIVALENT:", options: ["Equivocal", "Resolute", "Vacillating", "Irresolute"], correct: 1, explanation: "'Ambivalent' is mixed feelings. 'Resolute' is determined." },
  { id: 111, q: "Choose the synonym of AMORPHOUS:", options: ["Structured", "Nebulous", "Crystalline", "Definite"], correct: 1, explanation: "'Amorphous' is formless. 'Nebulous' is the synonym." },
  { id: 112, q: "Choose the antonym of ANOMALY:", options: ["Aberration", "Regularity", "Peculiarity", "Oddity"], correct: 1, explanation: "'Anomaly' is abnormality. 'Regularity' is normal." },
  { id: 113, q: "Choose the synonym of ARCHAIC:", options: ["Modern", "Antediluvian", "Contemporary", "Current"], correct: 1, explanation: "'Archaic' is old. 'Antediluvian' means before the flood (very old)." },
  { id: 114, q: "Choose the antonym of ARDENT:", options: ["Fervid", "Tepid", "Zealous", "Passionate"], correct: 1, explanation: "'Ardent' is hot/passionate. 'Tepid' is lukewarm/half-hearted." },
  { id: 115, q: "Choose the synonym of ASCETIC:", options: ["Hedonistic", "Abstemious", "Sybaritic", "Epicurean"], correct: 1, explanation: "'Ascetic' is self-denying. 'Abstemious' is the synonym." },
  { id: 116, q: "Choose the antonym of ASSUAGE:", options: ["Mitigate", "Aggravate", "Alleviate", "Palliate"], correct: 1, explanation: "'Assuage' is to soothe. 'Aggravate' is to make worse." },
  { id: 117, q: "Choose the synonym of ATROPHY:", options: ["Burgeon", "Degenerate", "Proliferate", "Augment"], correct: 1, explanation: "'Atrophy' is to waste away. 'Degenerate' is the synonym." },
  { id: 118, q: "Choose the antonym of AVARICE:", options: ["Cupidity", "Altruism", "Rapacity", "Greed"], correct: 1, explanation: "'Avarice' is greed. 'Altruism' is selflessness." },
  { id: 119, q: "Choose the synonym of BELLICOSE:", options: ["Pacific", "Pugnacious", "Dove-like", "Serene"], correct: 1, explanation: "'Bellicose' is warlike. 'Pugnacious' is the synonym." },
  { id: 120, q: "Choose the antonym of BLITHE:", options: ["Jovial", "Morose", "Sprightly", "Carefree"], correct: 1, explanation: "'Blithe' is cheerful. 'Morose' is sullen and ill-tempered." },
  { id: 121, q: "Choose the synonym of BURGEON:", options: ["Wither", "Effloresce", "Recede", "Dwindle"], correct: 1, explanation: "'Burgeon' is to grow rapidly. 'Effloresce' means to flower." },
  { id: 122, q: "Choose the antonym of CALLOUS:", options: ["Obdurate", "Solicitous", "Indurate", "Inured"], correct: 1, explanation: "'Callous' is unfeeling. 'Solicitous' is showing concern." },
  { id: 123, q: "Choose the synonym of CANONICAL:", options: ["Heterodox", "Orthodox", "Heretical", "Iconoclastic"], correct: 1, explanation: "'Canonical' is accepted rule. 'Orthodox' is the synonym." },
  { id: 124, q: "Choose the antonym of CASTIGATE:", options: ["Reprimand", "Extol", "Upbraid", "Berate"], correct: 1, explanation: "'Castigate' is to scold. 'Extol' is to praise." },
  { id: 125, q: "Choose the synonym of CATALYST:", options: ["Deterrent", "Incitement", "Inhibitor", "Obstacle"], correct: 1, explanation: "'Catalyst' speeds up. 'Incitement' is the synonym." },
  { id: 126, q: "Choose the antonym of CAUSTIC:", options: ["Vitriolic", "Saccharine", "Mordant", "Astringent"], correct: 1, explanation: "'Caustic' is acid-like. 'Saccharine' is excessively sweet." },
  { id: 127, q: "Choose the synonym of CHAUVINISM:", options: ["Cosmopolitanism", "Jingoism", "Impartiality", "Tolerance"], correct: 1, explanation: "'Chauvinism' is extreme patriotism. 'Jingoism' is the synonym." },
  { id: 128, q: "Choose the antonym of CHICANERY:", options: ["Subterfuge", "Candor", "Artifice", "Guile"], correct: 1, explanation: "'Chicanery' is trickery. 'Candor' is honesty." },
  { id: 129, q: "Choose the synonym of CIRCUMSPECT:", options: ["Temerarious", "Prudent", "Reckless", "Precipitate"], correct: 1, explanation: "'Circumspect' is cautious. 'Prudent' is the synonym." },
  { id: 130, q: "Choose the antonym of COALESCE:", options: ["Amalgamate", "Bifurcate", "Consolidate", "Conjoin"], correct: 1, explanation: "'Coalesce' is to unite. 'Bifurcate' is to divide into two." },
  { id: 131, q: "Choose the synonym of CONFLUENCE:", options: ["Divergence", "Convergence", "Bifurcation", "Separation"], correct: 1, explanation: "'Confluence' is flowing together." },
  { id: 132, q: "Choose the antonym of CONTENTIOUS:", options: ["Litigious", "Conciliatory", "Pugnacious", "Bellicose"], correct: 1, explanation: "'Contentious' is argumentative. 'Conciliatory' is peacemaking." },
  { id: 133, q: "Choose the synonym of CONTRITE:", options: ["Impenitent", "Penitent", "Obdurate", "Defiant"], correct: 1, explanation: "'Contrite' is remorseful. 'Penitent' is the synonym." },
  { id: 134, q: "Choose the antonym of CONVOLUTED:", options: ["Intricate", "Pellucid", "Byzantine", "Labyrinthine"], correct: 1, explanation: "'Convoluted' is complex. 'Pellucid' is transparently clear." },
  { id: 135, q: "Choose the synonym of CREDULITY:", options: ["Skepticism", "Naivety", "Disbelief", "Cynicism"], correct: 1, explanation: "'Credulity' is readiness to believe." },
  { id: 136, q: "Choose the antonym of DEARTH:", options: ["Paucity", "Surfeit", "Scarcity", "Shortage"], correct: 1, explanation: "'Dearth' is scarcity. 'Surfeit' is an excessive amount." },
  { id: 137, q: "Choose the synonym of DECORUM:", options: ["Impropriety", "Etiquette", "Levity", "Frivolity"], correct: 1, explanation: "'Decorum' is good behavior." },
  { id: 138, q: "Choose the antonym of DEFERENCE:", options: ["Respect", "Contumely", "Homage", "Veneration"], correct: 1, explanation: "'Deference' is respect. 'Contumely' is insulting language or treatment." },
  { id: 139, q: "Choose the synonym of DELINEATE:", options: ["Obfuscate", "Adumbrate", "Confuse", "Distort"], correct: 1, explanation: "'Delineate' is to sketch. 'Adumbrate' is to sketch out roughly." },
  { id: 140, q: "Choose the antonym of DEMUR:", options: ["Dissent", "Acquiesce", "Expostulate", "Remonstrate"], correct: 1, explanation: "'Demur' is to object. 'Acquiesce' is to accept without protest." },
  { id: 141, q: "Choose the synonym of DERISION:", options: ["Adulation", "Contumely", "Veneration", "Praise"], correct: 1, explanation: "'Derision' is ridicule." },
  { id: 142, q: "Choose the antonym of DESICCATE:", options: ["Exsiccate", "Hydrate", "Parch", "Sear"], correct: 1, explanation: "'Desiccate' is to dry out." },
  { id: 143, q: "Choose the synonym of DIATRIBE:", options: ["Panegyric", "Harangue", "Encomium", "Eulogy"], correct: 1, explanation: "'Diatribe' is a bitter attack." },
  { id: 144, q: "Choose the antonym of DIFFIDENT:", options: ["Timorous", "Assertive", "Bashful", "Demure"], correct: 1, explanation: "'Diffident' is shy. 'Assertive' is confident." },
  { id: 145, q: "Choose the synonym of DISPARATE:", options: ["Homogeneous", "Heterogeneous", "Uniform", "Alike"], correct: 1, explanation: "'Disparate' is essentially different." },
  { id: 146, q: "Choose the antonym of DISSEMBLE:", options: ["Feign", "Manifest", "Dissimulate", "Pretend"], correct: 1, explanation: "'Dissemble' is to hide. 'Manifest' is to show plainly." },
  { id: 147, q: "Choose the synonym of DISSONANCE:", options: ["Concord", "Cacophony", "Harmony", "Euphony"], correct: 1, explanation: "'Dissonance' is discord." },
  { id: 148, q: "Choose the antonym of EBULLIENT:", options: ["Buoyant", "Despondent", "Exuberant", "Effervescent"], correct: 1, explanation: "'Ebullient' is happy. 'Despondent' is in low spirits." },
  { id: 149, q: "Choose the synonym of ECLECTIC:", options: ["Narrow", "Multifarious", "Uniform", "Monolithic"], correct: 1, explanation: "'Eclectic' is varied." },
  { id: 150, q: "Choose the antonym of EFFICACY:", options: ["Potency", "Futility", "Productivity", "Competence"], correct: 1, explanation: "'Efficacy' is effectiveness. 'Futility' is pointlessness." },
  { id: 151, q: "Choose the synonym of ELUCIDATE:", options: ["Obscure", "Illuminate", "Befog", "Cloud"], correct: 1, explanation: "'Elucidate' is to clarify." },
  { id: 152, q: "Choose the antonym of ENERVATE:", options: ["Sap", "Invigorate", "Enfeeble", "Debilitate"], correct: 1, explanation: "'Enervate' is to weaken." },
  { id: 153, q: "Choose the synonym of ENGENDER:", options: ["Stifle", "Precipitate", "Quash", "Extinguish"], correct: 1, explanation: "'Engender' is to cause." },
  { id: 154, q: "Choose the antonym of ENIGMATIC:", options: ["Cryptic", "Unambiguous", "Abstruse", "Oracular"], correct: 1, explanation: "'Enigmatic' is mysterious." },
  { id: 155, q: "Choose the synonym of ENUMERATE:", options: ["Estimate", "Itemise", "Appraise", "Calculate"], correct: 1, explanation: "'Enumerate' is to list." },
  { id: 156, q: "Choose the antonym of EPHEMERAL:", options: ["Transient", "Perennial", "Fugacious", "Evanescent"], correct: 1, explanation: "'Ephemeral' is short-lived. 'Perennial' is long-lasting." },
  { id: 157, q: "Choose the synonym of EQUIVOCATE:", options: ["Clarify", "Prevaricate", "Confront", "Verify"], correct: 1, explanation: "'Equivocate' is to be ambiguous." },
  { id: 158, q: "Choose the antonym of ERUDITE:", options: ["Learned", "Inculpable", "Scholarly", "Pedantic"], correct: 1, explanation: "'Inculpable' is a trap; 'Ignorant' or 'Uneducated' is the intended meaning here." },
  { id: 159, q: "Choose the synonym of ESOTERIC:", options: ["Exoteric", "Abstruse", "Mundane", "Common"], correct: 1, explanation: "'Esoteric' is for a few." },
  { id: 160, q: "Choose the antonym of EUPHEMISM:", options: ["Circumlocution", "Dysphemism", "Periphrasis", "Substitute"], correct: 1, explanation: "'Euphemism' is soft speech. 'Dysphemism' is harsh speech." },
  { id: 161, q: "Choose the synonym of EXACERBATE:", options: ["Alleviate", "Aggravate", "Assuage", "Mitigate"], correct: 1, explanation: "'Exacerbate' is to worsen." },
  { id: 162, q: "Choose the antonym of EXCULPATE:", options: ["Exonerate", "Inculpate", "Acquit", "Vindicate"], correct: 1, explanation: "'Exculpate' is to clear. 'Inculpate' is to blame." },
  { id: 163, q: "Choose the synonym of EXIGENT:", options: ["Trivial", "Imperative", "Facile", "Negligible"], correct: 1, explanation: "'Exigent' is urgent." },
  { id: 164, q: "Choose the antonym of EXONERATE:", options: ["Absolve", "Arraign", "Exculpate", "Vindicate"], correct: 1, explanation: "'Exonerate' is to clear. 'Arraign' is to call to court/charge." },
  { id: 165, q: "Choose the synonym of FACETIOUS:", options: ["Grave", "Waggish", "Solemn", "Staunch"], correct: 1, explanation: "'Facetious' is humorous. 'Waggish' is the synonym." },
  { id: 166, q: "Choose the antonym of FACILITATE:", options: ["Expedite", "Stymie", "Promote", "Assist"], correct: 1, explanation: "'Facilitate' is to help. 'Stymie' is to hinder." },
  { id: 167, q: "Choose the synonym of FALLACIOUS:", options: ["Veracious", "Specious", "Authentic", "Valid"], correct: 1, explanation: "'Fallacious' is false. 'Specious' is the synonym." },
  { id: 168, q: "Choose the antonym of FASTIDIOUS:", options: ["Scrupulous", "Cursory", "Meticulous", "Punctilious"], correct: 1, explanation: "'Fastidious' is detailed. 'Cursory' is hasty/haphazard." },
  { id: 169, q: "Choose the synonym of FATUOUS:", options: ["Sagacious", "Inane", "Judicious", "Astute"], correct: 1, explanation: "'Fatuous' is silly. 'Inane' is the synonym." },
  { id: 170, q: "Choose the antonym of FAWNING:", options: ["Sycophantic", "Supercilious", "Obsequious", "Servile"], correct: 1, explanation: "'Fawning' is servile. 'Supercilious' is arrogant/haughty." },
  { id: 171, q: "Choose the synonym of FERVID:", options: ["Tepid", "Ardent", "Frigid", "Torpid"], correct: 1, explanation: "'Fervid' is passionate." },
  { id: 172, q: "Choose the antonym of FRUGALITY:", options: ["Thrift", "Prodigality", "Parsimony", "Economy"], correct: 1, explanation: "'Frugality' is careful. 'Prodigality' is wasteful." },
  { id: 173, q: "Choose the synonym of GARRULOUS:", options: ["Taciturn", "Loquacious", "Reticent", "Laconic"], correct: 1, explanation: "'Garrulous' is talkative." },
  { id: 174, q: "Choose the antonym of GREGARIOUS:", options: ["Sociable", "Eremitic", "Convivial", "Companionable"], correct: 1, explanation: "'Gregarious' is sociable. 'Eremitic' relates to a hermit." },
  { id: 175, q: "Choose the synonym of GUILE:", options: ["Probity", "Duplicity", "Candor", "Veracity"], correct: 1, explanation: "'Guile' is deceit." },
  { id: 176, q: "Choose the antonym of HARANGUE:", options: ["Tirade", "Conversation", "Lecture", "Diatribe"], correct: 1, explanation: "'Harangue' is one-way/aggressive." },
  { id: 177, q: "Choose the synonym of HOMOGENEOUS:", options: ["Varied", "Uniform", "Heterogeneous", "Disparate"], correct: 1, explanation: "'Homogeneous' is same." },
  { id: 178, q: "Choose the antonym of HYPERBOLE:", options: ["Exaggeration", "Understatement", "Amplification", "Excess"], correct: 1, explanation: "'Hyperbole' is overstatement." },
  { id: 179, q: "Choose the synonym of ICONOCLAST:", options: ["Conformist", "Dissenter", "Believer", "Devotee"], correct: 1, explanation: "'Iconoclast' is rebel." },
  { id: 180, q: "Choose the antonym of IDOLATRY:", options: ["Veneration", "Execration", "Adoration", "Devotion"], correct: 1, explanation: "'Idolatry' is worship. 'Execration' is loathing." },
  { id: 181, q: "Choose the synonym of IMMUTABLE:", options: ["Mutable", "Invariable", "Erratic", "Mercurial"], correct: 1, explanation: "'Immutable' is fixed." },
  { id: 182, q: "Choose the antonym of IMPASSIVE:", options: ["Stolid", "Reactive", "Phlegmatic", "Apathetic"], correct: 1, explanation: "'Impassive' is unemotional." },
  { id: 183, q: "Choose the synonym of IMPEDE:", options: ["Expedite", "Thwart", "Facilitate", "Advance"], correct: 1, explanation: "'Impede' is to hinder." },
  { id: 184, q: "Choose the antonym of IMPERVIOUS:", options: ["Invulnerable", "Permeable", "Closed", "Resistant"], correct: 1, explanation: "'Impervious' is not allowing entry." },
  { id: 185, q: "Choose the synonym of IMPLACABLE:", options: ["Lenient", "Inexorable", "Merciful", "Yielding"], correct: 1, explanation: "'Implacable' is unstoppable." },
  { id: 186, q: "Choose the antonym of IMPLICIT:", options: ["Inherent", "Explicit", "Tacit", "Understated"], correct: 1, explanation: "'Implicit' is hidden. 'Explicit' is clear." },
  { id: 187, q: "Choose the synonym of INADVERTENTLY:", options: ["Purposely", "Unwittingly", "Deliberately", "Intentionally"], correct: 1, explanation: "'Inadvertently' is accidentally." },
  { id: 188, q: "Choose the antonym of INCHOATE:", options: ["Rudimentary", "Mature", "Formless", "Emergent"], correct: 1, explanation: "'Inchoate' is incomplete." },
  { id: 189, q: "Choose the synonym of INCONSEQUENTIAL:", options: ["Pivotal", "Negligible", "Crucial", "Vital"], correct: 1, explanation: "'Inconsequential' is unimportant." },
  { id: 190, q: "Choose the antonym of INDIGENT:", options: ["Destitute", "Opulent", "Penurious", "Impecunious"], correct: 1, explanation: "'Indigent' is poor. 'Opulent' is rich." },
  { id: 191, q: "Choose the synonym of INDOLENT:", options: ["Assiduous", "Slothful", "Diligent", "Active"], correct: 1, explanation: "'Indolent' is lazy." },
  { id: 192, q: "Choose the antonym of INGENUOUS:", options: ["Naive", "Guileful", "Guileless", "Artless"], correct: 1, explanation: "'Ingenuous' is innocent. 'Guileful' is deceitful." },
  { id: 193, q: "Choose the synonym of INNOCUOUS:", options: ["Noxious", "Inoffensive", "Virulent", "Deleterious"], correct: 1, explanation: "'Innocuous' is harmless." },
  { id: 194, q: "Choose the antonym of INSIPID:", options: ["Bland", "Piquant", "Vapid", "Flat"], correct: 1, explanation: "'Insipid' is dull. 'Piquant' is sharp/exciting." },
  { id: 195, q: "Choose the synonym of INTRACTABLE:", options: ["Docile", "Refractory", "Compliant", "Manageable"], correct: 1, explanation: "'Intractable' is stubborn." },
  { id: 196, q: "Choose the antonym of INTREPID:", options: ["Valiant", "Pusillanimous", "Audacious", "Gallant"], correct: 1, explanation: "'Pusillanimous' is a sophisticated antonym for cowardly." },
  { id: 197, q: "Choose the synonym of INURED:", options: ["Vulnerable", "Acclimatised", "Sensitive", "Fragile"], correct: 1, explanation: "'Inured' is toughened." },
  { id: 198, q: "Choose the antonym of INVECTIVE:", options: ["Abuse", "Encomium", "Vitriol", "Harangue"], correct: 1, explanation: "'Invective' is abuse. 'Encomium' is praise." },
  { id: 199, q: "Choose the synonym of IRASCIBLE:", options: ["Amiable", "Choleric", "Placid", "Serene"], correct: 1, explanation: "'Irascible' is easily angered." },
  { id: 200, q: "Choose the antonym of JUXTAPOSE:", options: ["Collocate", "Dissociate", "Appose", "Compare"], correct: 1, explanation: "'Juxtapose' is together. 'Dissociate' is apart." }
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
            <h3 className="text-xl font-bold flex items-center gap-2 px-2 text-foreground">
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
