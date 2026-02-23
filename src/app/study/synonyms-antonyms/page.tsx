
"use client"

import { useState } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Search, Zap, BookOpen, AlertTriangle, ArrowRight, Hash, Star, Sparkles } from "lucide-react"
import Link from "next/link"
import { ModuleNavigator } from "@/components/study/ModuleNavigator"

const WORD_LIST = [
  { word: "Abjure", meaning: "To solemnly renounce a belief or claim", synonym: "Renounce, Forswear", antonym: "Affirm, Assert" },
  { word: "Abscond", meaning: "Leave hurriedly and secretly", synonym: "Flee, Escape", antonym: "Appear, Remain" },
  { word: "Acrimonious", meaning: "Angry and bitter (typically of speech)", synonym: "Sarcastic, Vitriolic", antonym: "Amiable, Sweet" },
  { word: "Alacrity", meaning: "Brisk and cheerful readiness", synonym: "Eagerness, Zeal", antonym: "Apathy, Lethargy" },
  { word: "Altruistic", meaning: "Selflessly caring for others", synonym: "Benevolent, Selfless", antonym: "Selfish, Egocentric" },
  { word: "Ameliorate", meaning: "To make something better", synonym: "Improve, Enhance", antonym: "Worsen, Exacerbate" },
  { word: "Anachronism", meaning: "Something out of its proper time", synonym: "Misplacement, Archaism", antonym: "Contemporary, Current" },
  { word: "Antipathy", meaning: "A deep-seated feeling of dislike", synonym: "Aversion, Hostility", antonym: "Affinity, Liking" },
  { word: "Assiduous", meaning: "Showing great care and perseverance", synonym: "Diligent, Meticulous", antonym: "Indolent, Lazy" },
  { word: "Audacious", meaning: "Showing a willingness to take risks", synonym: "Bold, Daring", antonym: "Timid, Cowardly" },
  { word: "Austere", meaning: "Severe or strict in manner", synonym: "Frugal, Spartan", antonym: "Luxurious, Ornate" },
  { word: "Banal", meaning: "Lacking in originality; boring", synonym: "Trite, Commonplace", antonym: "Original, Fresh" },
  { word: "Belligerent", meaning: "Hostile and aggressive", synonym: "Antagonistic, Pugnacious", antonym: "Peaceable, Friendly" },
  { word: "Benevolent", meaning: "Well-meaning and kindly", synonym: "Charitable, Kind", antonym: "Malevolent, Spiteful" },
  { word: "Boisterous", meaning: "Noisy, energetic, and cheerful", synonym: "Clamorous, Rowdy", antonym: "Quiet, Restrained" },
  { word: "Cacophony", meaning: "A harsh, discordant mixture of sounds", synonym: "Din, Discord", antonym: "Euphony, Harmony" },
  { word: "Candid", meaning: "Truthful and straightforward", synonym: "Frank, Honest", antonym: "Deceptive, Evasive" },
  { word: "Capricious", meaning: "Given to sudden changes of mood", synonym: "Fickle, Inconstant", antonym: "Stable, Consistent" },
  { word: "Castigate", meaning: "Reprimand someone severely", synonym: "Chastise, Scold", antonym: "Praise, Commend" },
  { word: "Caustic", meaning: "Sarcastic in a scathing way", synonym: "Acerbic, Biting", antonym: "Mild, Kind" },
  { word: "Censure", meaning: "Express severe disapproval", synonym: "Condemn, Criticize", antonym: "Approve, Praise" },
  { word: "Cogent", meaning: "Clear, logical, and convincing", synonym: "Compelling, Valid", antonym: "Vague, Weak" },
  { word: "Complacent", meaning: "Self-satisfied and uncritical", synonym: "Smug, Contented", antonym: "Dissatisfied, Humble" },
  { word: "Conciliatory", meaning: "Intended to placate or pacify", synonym: "Appeasing, Peaceful", antonym: "Antagonistic, Harsh" },
  { word: "Connoisseur", meaning: "An expert judge in matters of taste", synonym: "Expert, Pundit", antonym: "Ignoramus, Novice" },
  { word: "Conundrum", meaning: "A confusing and difficult problem", synonym: "Enigma, Riddle", antonym: "Solution, Answer" },
  { word: "Credulous", meaning: "Having a great readiness to believe", synonym: "Gullible, Naive", antonym: "Skeptical, Suspicious" },
  { word: "Cynic", meaning: "Believes people are motivated by selfishness", synonym: "Skeptic, Doubter", antonym: "Optimist, Believer" },
  { word: "Deleterious", meaning: "Causing harm or damage", synonym: "Harmful, Noxious", antonym: "Beneficial, Helpful" },
  { word: "Demure", meaning: "Reserved, modest, and shy", synonym: "Modest, Decorous", antonym: "Bold, Impudent" },
  { word: "Deride", meaning: "Express contempt for; ridicule", synonym: "Mock, Jeer", antonym: "Respect, Praise" },
  { word: "Desultory", meaning: "Lacking a plan, purpose, or enthusiasm", synonym: "Casual, Aimless", antonym: "Systematic, Methodical" },
  { word: "Diatribe", meaning: "A forceful and bitter verbal attack", synonym: "Tirade, Harangue", antonym: "Praise, Encomium" },
  { word: "Dichotomy", meaning: "A division between two things", synonym: "Split, Contrast", antonym: "Unity, Merger" },
  { word: "Diffident", meaning: "Modest or shy due to lack of confidence", synonym: "Shy, Bashful", antonym: "Confident, Bold" },
  { word: "Disingenuous", meaning: "Not candid or sincere", synonym: "Dishonest, Deceitful", antonym: "Sincere, Ingenuous" },
  { word: "Disparage", meaning: "Regard as being of little worth", synonym: "Belittle, Undervalue", antonym: "Praise, Overrate" },
  { word: "Disparate", meaning: "Essentially different in kind", synonym: "Diverse, Distinct", antonym: "Similar, Homogeneous" },
  { word: "Dissemble", meaning: "Disguise one's real feelings", synonym: "Dissimulate, Bluff", antonym: "Reveal, Manifest" },
  { word: "Dissonance", meaning: "Lack of harmony; disagreement", synonym: "Conflict, Discord", antonym: "Harmony, Accord" },
  { word: "Dogmatic", meaning: "Inclined to lay down principles as true", synonym: "Opinionated, Rigid", antonym: "Flexible, Skeptical" },
  { word: "Ebullient", meaning: "Cheerful and full of energy", synonym: "Exuberant, Buoyant", antonym: "Depressed, Gloomy" },
  { word: "Eclectic", meaning: "Deriving ideas from a wide range", synonym: "Diverse, Varied", antonym: "Narrow, Restricted" },
  { word: "Efficacy", meaning: "The ability to produce a desired result", synonym: "Effectiveness, Potency", antonym: "Inutility, Failure" },
  { word: "Elicit", meaning: "Evoke or draw out a reaction", synonym: "Evoke, Extract", antonym: "Hide, Repress" },
  { word: "Eloquent", meaning: "Fluent or persuasive in speaking", synonym: "Articulate, Silver-tongued", antonym: "Inarticulate, Mute" },
  { word: "Elucidate", meaning: "Make something clear; explain", synonym: "Explain, Clarify", antonym: "Confuse, Obscure" },
  { word: "Embellish", meaning: "Make more attractive by addition", synonym: "Decorate, Adorn", antonym: "Simplify, Deface" },
  { word: "Enervate", meaning: "To cause someone to feel drained", synonym: "Exhaust, Fatigue", antonym: "Invigorate, Energize" },
  { word: "Engender", meaning: "Cause or give rise to", synonym: "Produce, Create", antonym: "Stifle, Destroy" },
  { word: "Enigma", meaning: "A person or thing that is mysterious", synonym: "Mystery, Puzzle", antonym: "Clarity, Plainness" },
  { word: "Ephemeral", meaning: "Lasting a very short time", synonym: "Transient, Fleeting", antonym: "Permanent, Enduring" },
  { word: "Equanimity", meaning: "Calmness and composure", synonym: "Serenity, Composure", antonym: "Anxiety, Agitation" },
  { word: "Equivocate", meaning: "Use ambiguous language to conceal truth", synonym: "Prevaricate, Hedge", antonym: "Be honest, Speak plainly" },
  { word: "Erudite", meaning: "Having or showing great knowledge", synonym: "Learned, Scholarly", antonym: "Ignorant, Uneducated" },
  { word: "Esoteric", meaning: "Intended for only a few people", synonym: "Abstruse, Recondite", antonym: "Common, Public" },
  { word: "Euphemism", meaning: "A mild word used for a harsh one", synonym: "Polite term, Substitute", antonym: "Dysphemism, Harshness" },
  { word: "Exacerbate", meaning: "Make a problem worse", synonym: "Aggravate, Worsen", antonym: "Improve, Alleviate" },
  { word: "Exculpate", meaning: "Show that someone is not guilty", synonym: "Acquit, Exonerate", antonym: "Convict, Blame" },
  { word: "Exigent", meaning: "Pressing; demanding", synonym: "Urgent, Imperative", antonym: "Trivial, Easy" },
  { word: "Exonerate", meaning: "Absolve from blame", synonym: "Acquit, Clear", antonym: "Convict, Condemn" },
  { word: "Facetious", meaning: "Treating serious issues with humor", synonym: "Flippant, Glib", antonym: "Serious, Solemn" },
  { word: "Facilitate", meaning: "Make an action or process easy", synonym: "Assist, Help", antonym: "Hinder, Block" },
  { word: "Fallacious", meaning: "Based on a mistaken belief", synonym: "False, Erroneous", antonym: "True, Valid" },
  { word: "Fastidious", meaning: "Very attentive to accuracy and detail", synonym: "Meticulous, Scrupulous", antonym: "Careless, Lax" },
  { word: "Fatuous", meaning: "Silly and pointless", synonym: "Foolish, Inane", antonym: "Sensible, Wise" },
  { word: "Fawning", meaning: "Displaying exaggerated flattery", synonym: "Sycophantic, Obsequious", antonym: "Proud, Arrogant" },
  { word: "Fervid", meaning: "Intensely enthusiastic or passionate", synonym: "Ardent, Vehement", antonym: "Indifferent, Cold" },
  { word: "Frugality", meaning: "Prudence in avoiding waste", synonym: "Thrift, Parsimony", antonym: "Wastefulness, Lavishness" },
  { word: "Garrulous", meaning: "Excessively talkative", synonym: "Loquacious, Voluble", antonym: "Taciturn, Reticent" },
  { word: "Gregarious", meaning: "Fond of company; sociable", synonym: "Sociable, Convivial", antonym: "Reclusive, Antisocial" },
  { word: "Guile", meaning: "Sly or cunning intelligence", synonym: "Deceit, Duplicity", antonym: "Honesty, Candor" },
  { word: "Harangue", meaning: "A lengthy and aggressive speech", synonym: "Tirade, Lecture", antonym: "Conversation, Chat" },
  { word: "Homogeneous", meaning: "Of the same kind; alike", synonym: "Uniform, Consistent", antonym: "Heterogeneous, Varied" },
  { word: "Hyperbole", meaning: "Exaggerated statements", synonym: "Overstatement, Excess", antonym: "Understatement, Litotes" },
  { word: "Iconoclast", meaning: "One who attacks cherished beliefs", synonym: "Skeptic, Heretic", antonym: "Believer, Conformist" },
  { word: "Idolatry", meaning: "Extreme admiration or worship", synonym: "Adoration, Devotion", antonym: "Contempt, Scorn" },
  { word: "Immutable", meaning: "Unchanging over time", synonym: "Fixed, Constant", antonym: "Variable, Changing" },
  { word: "Impassive", meaning: "Not feeling or showing emotion", synonym: "Stolid, Apathetic", antonym: "Emotional, Reactive" },
  { word: "Impede", meaning: "Delay or prevent by obstruction", synonym: "Hinder, Obstruct", antonym: "Facilitate, Help" },
  { word: "Impervious", meaning: "Unable to be affected by", synonym: "Invulnerable, Closed", antonym: "Vulnerable, Susceptible" },
  { word: "Implacable", meaning: "Unable to be placated", synonym: "Relentless, Unstoppable", antonym: "Forgiving, Merciful" },
  { word: "Implicit", meaning: "Suggested though not expressed", synonym: "Inherent, Tacit", antonym: "Explicit, Stated" },
  { word: "Inadvertently", meaning: "Without intention; accidentally", synonym: "Unintentionally, By chance", antonym: "Deliberately, Purposefully" },
  { word: "Inchoate", meaning: "Just begun and not fully formed", synonym: "Rudimentary, Formless", antonym: "Developed, Mature" },
  { word: "Inconsequential", meaning: "Not important or significant", synonym: "Trivial, Negligible", antonym: "Crucial, Vital" },
  { word: "Indigent", meaning: "Poor; needy", synonym: "Destitute, Penniless", antonym: "Wealthy, Affluent" },
  { word: "Indolent", meaning: "Habitually lazy", synonym: "Slothful, Idle", antonym: "Industrious, Diligent" },
  { word: "Ingenuous", meaning: "Innocent and unsuspecting", synonym: "Naive, Guileless", antonym: "Disingenuous, Cunning" },
  { word: "Innocuous", meaning: "Not harmful or offensive", synonym: "Harmless, Safe", antonym: "Harmful, Toxic" },
  { word: "Insipid", meaning: "Lacking flavor or interest", synonym: "Bland, Dull", antonym: "Flavorful, Exciting" },
  { word: "Intractable", meaning: "Hard to control or deal with", synonym: "Stubborn, Unmanageable", antonym: "Docile, Compliant" },
  { word: "Intrepid", meaning: "Fearless; adventurous", synonym: "Brave, Dauntless", antonym: "Fearful, Timid" },
  { word: "Inured", meaning: "Accustomed to something unpleasant", synonym: "Hardened, Seasoned", antonym: "Sensitive, Fragile" },
  { word: "Invective", meaning: "Insulting or critical language", synonym: "Abuse, Vitriol", antonym: "Praise, Flattery" },
  { word: "Irascible", meaning: "Easily angered", synonym: "Choleric, Irritable", antonym: "Amiable, Placid" },
  { word: "Juxtapose", meaning: "Place side by side for contrast", synonym: "Collocate, Compare", antonym: "Separate, Disconnect" },
  { word: "Laconic", meaning: "Using very few words", synonym: "Brief, Concise", antonym: "Verbose, Wordy" },
  { word: "Lassitude", meaning: "A state of physical mental weariness", synonym: "Fatigue, Lethargy", antonym: "Vigor, Energy" },
  { word: "Loquacious", meaning: "Very talkative", synonym: "Garrulous, Verbose", antonym: "Reticent, Taciturn" },
  { word: "Magnanimous", meaning: "Generous or forgiving", synonym: "Charitable, Benevolent", antonym: "Mean, Vindictive" },
  { word: "Malinger", meaning: "Exaggerate illness to escape work", synonym: "Sham, Dodge", antonym: "Work, Persevere" },
  { word: "Malleable", meaning: "Easily influenced or shaped", synonym: "Pliant, Ductile", antonym: "Rigid, Unyielding" },
  { word: "Meticulous", meaning: "Showing great attention to detail", synonym: "Assiduous, Careful", antonym: "Sloppy, Careless" },
  { word: "Mitigate", meaning: "Make less severe or painful", synonym: "Alleviate, Assuage", antonym: "Aggravate, Worsen" },
  { word: "Mollify", meaning: "Appease the anger or anxiety", synonym: "Placate, Pacify", antonym: "Enrage, Irritate" },
  { word: "Munificent", meaning: "Very generous", synonym: "Bountiful, Lavish", antonym: "Penurious, Stingy" },
  { word: "Nefarious", meaning: "Wicked or criminal", synonym: "Villainous, Heinous", antonym: "Noble, Exemplary" },
  { word: "Neophyte", meaning: "A person who is new to a subject", synonym: "Novice, Beginner", antonym: "Veteran, Expert" },
  { word: "Obdurate", meaning: "Stubbornly refusing to change", synonym: "Obstinate, Pigheaded", antonym: "Amenable, Yielding" },
  { word: "Obsequious", meaning: "Obedient or attentive to an excessive degree", synonym: "Servile, Fawning", antonym: "Domineering, Arrogant" },
  { word: "Onerous", meaning: "Involving a great amount of effort", synonym: "Burdensome, Heavy", antonym: "Easy, Effortless" },
  { word: "Ostentatious", meaning: "Designed to impress or attract notice", synonym: "Showy, Pretentious", antonym: "Modest, Restrained" },
  { word: "Paradigm", meaning: "A typical example or pattern", synonym: "Model, Standard", antonym: "Anomaly, Exception" },
  { word: "Paucity", meaning: "The presence of something in small quantities", synonym: "Scarcity, Dearth", antonym: "Abundance, Wealth" },
  { word: "Pedantic", meaning: "Excessively concerned with minor details", synonym: "Precise, Fussy", antonym: "Casual, Simple" },
  { word: "Penchant", meaning: "A strong or habitual liking", synonym: "Inclination, Fondness", antonym: "Dislike, Aversion" },
  { word: "Pernicious", meaning: "Harmful in a subtle way", synonym: "Deleterious, Noxious", antonym: "Beneficial, Salubrious" },
  { word: "Phlegmatic", meaning: "Having an unemotional disposition", synonym: "Calm, Cool", antonym: "Excitable, Frantic" },
  { word: "Placate", meaning: "Make someone less angry or hostile", synonym: "Pacify, Mollify", antonym: "Provoke, Anger" },
  { word: "Plethora", meaning: "A large or excessive amount", synonym: "Abundance, Surfeit", antonym: "Scarcity, Lack" },
  { word: "Pragmatic", meaning: "Dealing with things realistically", synonym: "Practical, Realistic", antonym: "Idealistic, Impractical" },
  { word: "Prevaricate", meaning: "Speak or act in an evasive way", synonym: "Equivocate, Fib", antonym: "Be honest, Direct" },
  { word: "Probity", meaning: "The quality of having strong morals", synonym: "Integrity, Honesty", antonym: "Dishonesty, Corruption" },
  { word: "Prodigal", meaning: "Spending money freely and recklessly", synonym: "Wasteful, Extravagant", antonym: "Thrifty, Parsimonious" },
  { word: "Proliferate", meaning: "Increase rapidly in number", synonym: "Multiply, Burgeon", antonym: "Decrease, Dwindle" },
  { word: "Propensity", meaning: "An inclination to behave in a way", synonym: "Tendency, Proneness", antonym: "Inability, Disinclination" },
  { word: "Querulous", meaning: "Complaining in a whining manner", synonym: "Petulant, Peevish", antonym: "Contented, Cheerful" },
  { word: "Rancor", meaning: "Bitterness or resentfulness", synonym: "Malice, Spite", antonym: "Amity, Goodwill" },
  { word: "Recondite", meaning: "Obscure, not widely known", synonym: "Abstruse, Esoteric", antonym: "Simple, Lucid" },
  { word: "Reticent", meaning: "Not revealing one's thoughts easily", synonym: "Reserved, Quiet", antonym: "Garrulous, Talkative" },
  { word: "Sagacious", meaning: "Wise, good judgement", synonym: "Astute, Prudent", antonym: "Foolish, Naive" },
  { word: "Salubrious", synonym: "Healthy, Wholesome", antonym: "Harmful, Unhealthy", meaning: "Health-giving; healthy" },
  { word: "Soporific", meaning: "Causing sleepiness", synonym: "Sedative, Somnolent", antonym: "Stimulating, Invigorating" },
  { word: "Specious", meaning: "Plausible but wrong", synonym: "Misleading, Deceptive", antonym: "Genuine, Correct" },
  { word: "Sycophant", meaning: "A person who acts obsequiously to gain advantage", synonym: "Flatterer, Toady", antonym: "Rebel, Critic" },
  { word: "Taciturn", meaning: "Reserved or uncommunicative in speech", synonym: "Reticent, Quiet", antonym: "Talkative, Garrulous" },
  { word: "Tenuous", meaning: "Weak, fragile", synonym: "Feeble, Flimsy", antonym: "Robust, Strong" },
  { word: "Tirade", meaning: "A long, angry speech of criticism", synonym: "Diatribe, Rant", antonym: "Praise, Eulogy" },
  { word: "Torpor", meaning: "A state of physical or mental inactivity", synonym: "Lethargy, Sluggishness", antonym: "Animation, Vigor" },
  { word: "Ubiquitous", meaning: "Present everywhere", synonym: "Omnipresent, Pervasive", antonym: "Rare, Scarce" },
  { word: "Vacillate", meaning: "Waver between decisions", synonym: "Hesitate, Oscillate", antonym: "Resolve, Commit" },
  { word: "Venerate", meaning: "Regard with great respect", synonym: "Revere, Adore", antonym: "Despise, Dishonour" },
  { word: "Veracious", meaning: "Speaking or representing the truth", synonym: "Truthful, Honest", antonym: "Mendacious, Lying" },
  { word: "Verbose", meaning: "Using more words than needed", synonym: "Wordy, Garrulous", antonym: "Laconic, Succinct" },
  { word: "Vituperative", meaning: "Bitter and abusive", synonym: "Insulting, Scathing", antonym: "Kind, Flattering" },
  { word: "Volatile", meaning: "Liable to change rapidly", synonym: "Unstable, Fickle", antonym: "Stable, Constant" },
  { word: "Wary", meaning: "Feeling or showing caution", synonym: "Cautious, Circumspect", antonym: "Trusting, Reckless" },
  { word: "Zealot", meaning: "A person who is fanatical", synonym: "Fanatic, Enthusiast", antonym: "Moderate, Cynic" }
].sort((a, b) => a.word.localeCompare(b.word))

const PREFIXES = [
  { p: "a-, an-", m: "Without, Not", eg: "Amorphous, Anarchy" },
  { p: "ab-, abs-", m: "From, Away", eg: "Abduct, Abscond" },
  { p: "ad-", m: "To, Toward", eg: "Adhere, Adjoin" },
  { p: "ambi-", m: "Both", eg: "Ambidextrous, Ambivalent" },
  { p: "ante-", m: "Before", eg: "Antecedent, Antediluvian" },
  { p: "anti-", m: "Against", eg: "Antipathy, Antiseptic" },
  { p: "auto-", m: "Self", eg: "Autocrat, Autonomous" },
  { p: "bene-", m: "Good, Well", eg: "Benefactor, Benevolent" },
  { p: "bi-", m: "Two", eg: "Bilateral, Bisect" },
  { p: "circum-", m: "Around", eg: "Circumnavigate, Circumspect" },
  { p: "co-, con-, com-", m: "With, Together", eg: "Cooperate, Confluence" },
  { p: "contra-", m: "Against", eg: "Contradict, Contravention" },
  { p: "de-", m: "Down, Away from", eg: "Debase, Decelerate" },
  { p: "dis-", m: "Not, Away", eg: "Disparity, Dissuade" },
  { p: "epi-", m: "Upon", eg: "Epicentre, Epitome" },
  { p: "eu-", m: "Good, Well", eg: "Euphony, Euphemism" },
  { p: "ex-", m: "Out of, From", eg: "Exclude, Exhale" },
  { p: "extra-", m: "Outside, Beyond", eg: "Extravagant, Beyond" },
  { p: "hetero-", m: "Different", eg: "Heterogeneous, Heterodox" },
  { p: "homo-", m: "Same", eg: "Homogeneous, Homonym" },
  { p: "hyper-", m: "Over, Above", eg: "Hyperbole, Hypertension" },
  { p: "hypo-", m: "Under, Below", eg: "Hypodermic, Hypothesis" },
  { p: "in-, im-, il-, ir-", m: "Not", eg: "Innocuous, Impossible" },
  { p: "inter-", m: "Between", eg: "Intervene, Intermittent" },
  { p: "intra-", m: "Within", eg: "Intramural, Intrastate" },
  { p: "mal-", m: "Bad", eg: "Malediction, Malevolent" },
  { p: "mono-", m: "One", eg: "Monologue, Monarchy" },
  { p: "neo-", m: "New", eg: "Neophyte, Neologism" },
  { p: "omni-", m: "All", eg: "Omniscient, Omnipotent" },
  { p: "pan-", m: "All", eg: "Panacea, Pandemic" },
  { p: "per-", m: "Through, Thoroughly", eg: "Pervasive, Pernicious" },
  { p: "poly-", m: "Many", eg: "Polyglot, Polygon" },
  { p: "post-", m: "After", eg: "Posthumous, Posterity" },
  { p: "pre-", m: "Before", eg: "Precursor, Premonition" },
  { p: "pro-", m: "Forward, In favor", eg: "Proliferate, Propensity" },
  { p: "re-", m: "Again, Back", eg: "Recant, Rescind" },
  { p: "retro-", m: "Backward", eg: "Retrospective, Retrograde" },
  { p: "sub-", m: "Under", eg: "Subside, Subjugate" },
  { p: "super-", m: "Above, Over", eg: "Superfluous, Supersede" },
  { p: "syn-, sym-", m: "With, Together", eg: "Synthesis, Symbiosis" },
  { p: "trans-", m: "Across", eg: "Transgress, Transient" },
  { p: "uni-", m: "One", eg: "Uniform, Unique" }
]

const SUFFIXES = [
  { s: "-able, -ible", m: "Capable of", eg: "Tractable, Edible" },
  { s: "-acy", m: "State or quality", eg: "Accuracy, Privacy" },
  { s: "-al", m: "Act or process of", eg: "Refusal, Perusal" },
  { s: "-ance, -ence", m: "State or quality", eg: "Abundance, Persistence" },
  { s: "-ate", m: "To make", eg: "Ameliorate, Mitigate" },
  { s: "-dom", m: "Place or state", eg: "Freedom, Kingdom" },
  { s: "-er, -or", m: "One who", eg: "Orator, Orator" },
  { s: "-esque", m: "In the style of", eg: "Picturesque, Style" },
  { s: "-ful", m: "Full of", eg: "Bashful, Careful" },
  { s: "-ic, -ical", m: "Pertaining to", eg: "Dogmatic, Cynical" },
  { s: "-ify", m: "To make", eg: "Fortify, Clarify" },
  { s: "-ism", m: "Doctrine, belief", eg: "Stoicism, Pragmatism" },
  { s: "-ist", m: "One who", eg: "Optimist, Zealot" },
  { s: "-ity, -ty", m: "Quality of", eg: "Fidelity, Acrimoniosity" },
  { s: "-ive", m: "Nature of", eg: "Pervasive, Creative" },
  { s: "-ize", m: "To make", eg: "Crystallize, Harmonize" },
  { s: "-less", m: "Without", eg: "Painless, Ruthless" },
  { s: "-logy", m: "Study of", eg: "Biology, Entomology" },
  { s: "-ment", m: "Condition of", eg: "Enchantment, Argument" },
  { s: "-ness", m: "State of being", eg: "Happiness, Kindliness" },
  { s: "-ous", m: "Full of", eg: "Garrulous, Hazardous" },
  { s: "-ship", m: "Position held", eg: "Friendship, Hardship" },
  { s: "-tion, -sion", m: "State of being", eg: "Transition, Revision" }
]

export default function SynonymsPage() {
  const [search, setSearch] = useState("")

  const filteredWords = WORD_LIST.filter(w => 
    w.word.toLowerCase().includes(search.toLowerCase()) ||
    w.meaning.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background pb-20">
      <main className="container mx-auto px-4 py-12 max-w-6xl">
        <header className="mb-12 animate-fade-in-up">
          <div className="flex justify-between items-start">
            <div>
              <Badge className="mb-4 bg-primary/10 text-primary border-primary/20">Section 3 (50 Marks)</Badge>
              <h1 className="text-4xl font-headline font-bold mb-4 text-foreground">Lexical Intelligence</h1>
              <p className="text-muted-foreground text-lg max-w-2xl">Elite word repository inspired by the Blackbook of English Vocabulary. Master these word families to neutralise the -1 penalty.</p>
            </div>
            <Button size="lg" className="rounded-2xl font-bold shadow-lg" asChild>
              <Link href="/study/synonyms-antonyms/quiz">Start Topic Quiz</Link>
            </Button>
          </div>
        </header>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            <Card className="border-none shadow-sm bg-white overflow-hidden rounded-[2rem]">
              <CardHeader className="bg-primary/5 pb-8">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary rounded-2xl shadow-sm">
                    <Search className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <CardTitle className="text-2xl font-bold">Elite Word Repository</CardTitle>
                    <CardDescription className="font-medium">The essential words for CUET 2026 Code 101.</CardDescription>
                  </div>
                </div>
                <div className="mt-6">
                  <Input 
                    placeholder="Search by word or meaning..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="h-12 text-lg border-primary/20 focus-visible:ring-primary rounded-xl"
                  />
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ScrollArea className="h-[800px]">
                  <Table>
                    <TableHeader className="bg-muted/30 sticky top-0 z-10">
                      <TableRow>
                        <TableHead className="font-bold py-4 pl-8">Word & Meaning</TableHead>
                        <TableHead className="font-bold">Synonyms</TableHead>
                        <TableHead className="font-bold">Antonyms</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredWords.map((item, idx) => (
                        <TableRow key={idx} className="hover:bg-primary/5 transition-colors">
                          <TableCell className="py-4 pl-8">
                            <div className="font-bold text-primary text-base">{item.word}</div>
                            <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">{item.meaning}</div>
                          </TableCell>
                          <TableCell className="text-xs font-bold leading-relaxed">{item.synonym}</TableCell>
                          <TableCell className="text-xs font-bold text-destructive/80 leading-relaxed">{item.antonym}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </ScrollArea>
              </CardContent>
            </Card>

            <section className="space-y-8">
              <h2 className="text-2xl font-bold flex items-center gap-2 text-foreground">
                <Sparkles className="w-6 h-6 text-primary" />
                Morphological Master-Table
              </h2>
              <div className="grid md:grid-cols-2 gap-8">
                <Card className="border-none shadow-sm bg-secondary/10 rounded-[2rem]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-secondary-foreground font-bold">
                      <Zap className="w-5 h-5" />
                      Prefix Strategy Library
                    </CardTitle>
                    <CardDescription className="text-secondary-foreground/60 font-medium">Decode thousands of words by identifying their roots.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px] px-6 pb-6">
                      <div className="space-y-3">
                        {PREFIXES.map((item, i) => (
                          <div key={i} className="bg-white/50 p-3 rounded-xl border border-secondary/20 flex flex-col gap-1 shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="font-mono font-bold text-secondary-foreground text-sm">{item.p}</span>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.m}</span>
                            </div>
                            <div className="text-[10px] italic font-bold text-secondary-foreground/60">EG: {item.eg}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm bg-primary/10 rounded-[2rem]">
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center gap-2 text-primary font-bold">
                      <BookOpen className="w-5 h-5" />
                      Suffix Functional Map
                    </CardTitle>
                    <CardDescription className="text-primary/60 font-medium">Identify the nature and category of any clinical term.</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    <ScrollArea className="h-[500px] px-6 pb-6">
                      <div className="space-y-3">
                        {SUFFIXES.map((item, i) => (
                          <div key={i} className="bg-white/50 p-3 rounded-xl border border-primary/20 flex flex-col gap-1 shadow-sm">
                            <div className="flex justify-between items-center">
                              <span className="font-mono font-bold text-primary text-sm">{item.s}</span>
                              <span className="text-[10px] font-bold text-muted-foreground uppercase">{item.m}</span>
                            </div>
                            <div className="text-[10px] italic font-bold text-primary/60">EG: {item.eg}</div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          <aside className="space-y-6 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <ModuleNavigator />

            <Card className="bg-foreground text-background shadow-xl rounded-2xl overflow-hidden relative">
              <div className="absolute right-0 top-0 p-4 opacity-10">
                <AlertTriangle className="w-12 h-12" />
              </div>
              <CardHeader>
                <CardTitle className="text-lg text-primary font-bold">The Antonym Trap</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm leading-relaxed font-medium">
                <p>In CUET, when asking for a <strong>synonym</strong>, the <strong>antonym</strong> is almost ALWAYS provided as a distractor option.</p>
                <p>Always verify the prompt instructions before locking your choice. Precision maintains your +5 momentum.</p>
              </CardContent>
            </Card>

            <Card className="border-primary/20 rounded-2xl bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg font-bold">Daily Protocol</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="p-6 bg-muted rounded-[1.5rem] text-center border">
                  <div className="text-4xl font-bold text-primary mb-1">15</div>
                  <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Words Daily Intake</div>
                </div>
              </CardContent>
            </Card>

            <Button className="w-full h-14 rounded-2xl font-bold shadow-lg text-lg" asChild>
              <Link href="/quiz">Start Full Practise Set</Link>
            </Button>
          </aside>
        </div>
      </main>
    </div>
  )
}
