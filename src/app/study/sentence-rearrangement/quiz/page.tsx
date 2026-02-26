
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Layers, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

type Question = {
  id: number
  parts: string[]
  q: string
  options: string[]
  correct: number
  explanation: string
}

const REARRANGE_QUIZ_DATA: Question[] = [
  // Set 1: Foundation (1-10)
  { id: 1, parts: ["the fragrance of jasmine drifted", "as the evening breeze passed through", "the open windows of the old house", "filling the room with a gentle sweetness"], q: "Rearrange the segments to form a meaningful sentence.", options: ["B-C-A-D", "A-B-C-D", "D-A-C-B", "C-A-D-B"], correct: 0, explanation: "The sentence starts with the setting (B), followed by the location (C), the primary action (A), and ends with the result (D)." },
  { id: 2, parts: ["the committee decided to postpone", "the annual function", "due to the heavy rain forecast", "for the entire region"], q: "Choose the correct sequence:", options: ["A-B-C-D", "C-B-A-D", "B-A-D-C", "D-B-C-A"], correct: 0, explanation: "Subject (Committee) + Verb (Postpone) + Object (Function) + Reason (Rain) + Scope (Region)." },
  { id: 3, parts: ["remains the cornerstone of human progress", "the ability to adapt and learn", "in an era of rapid technological change", "despite the risks of automation"], q: "Rearrange to form a coherent statement:", options: ["C-B-A-D", "A-C-B-D", "D-A-C-B", "B-A-C-D"], correct: 0, explanation: "Begins with context (C), introduces subject (B), state (A), and ends with contrast (D)." },
  { id: 4, parts: ["when the explorers set out", "over the horizon", "scarcely had the sun risen", "on their perilous journey"], q: "Identify the correct sequence:", options: ["C-B-A-D", "B-A-C-D", "A-B-C-D", "D-C-B-A"], correct: 0, explanation: "Uses 'Scarcely had (C) ... when (A)' structure. Logical flow: Sunrise (C-B) leading to the start of the journey (A-D)." },
  { id: 5, parts: ["the jury found it difficult", "to reach a unanimous verdict", "due to conflicting testimonies", "although the evidence was clear"], q: "Rearrange the segments:", options: ["D-A-B-C", "A-B-C-D", "C-D-A-B", "B-C-D-A"], correct: 0, explanation: "Starts with the contrast (D), followed by the main difficulty (A), the specific goal (B), and the reason (C)." },
  { id: 6, parts: ["into the realm of quantum theory", "the observable phenomena", "physicists must look beyond", "to understand the complexities of the universe"], q: "Choose the logical order:", options: ["D-C-B-A", "A-B-C-D", "C-A-B-D", "B-D-C-A"], correct: 0, explanation: "Starts with the purpose (D), followed by the subject-requirement (C), the object (B), and the destination (A)." },
  { id: 7, parts: ["to isolate it from radioactive waste", "with minimal environmental impact", "not only did the scientist discover a new element", "but she also developed a method"], q: "Rearrange correctly:", options: ["C-D-A-B", "A-B-C-D", "B-A-C-D", "D-C-B-A"], correct: 0, explanation: "Correlative structure: Not only (C) ... but also (D) + purpose (A) + manner (B)." },
  { id: 8, parts: ["had already been relocated", "most of the survivors", "by the time the rescue team arrived", "to a safer facility"], q: "Choose the correct sequence:", options: ["C-B-A-D", "A-B-C-D", "D-A-C-B", "B-C-A-D"], correct: 0, explanation: "Time clause (C) followed by the subject (B) and the complete verb phrase (A-D)." },
  { id: 9, parts: ["at the international symposium", "having completed her research", "to a round of applause", "she presented her findings"], q: "Identify the coherent flow:", options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"], correct: 0, explanation: "Participle phrase (B) leads to the main action (D) + location (A) + result (C)." },
  { id: 10, parts: ["the use of natural light", "the architect designed the building", "while minimising energy consumption", "so that it would maximise"], q: "Rearrange the segments:", options: ["B-D-A-C", "A-B-C-D", "C-A-B-D", "D-B-C-A"], correct: 0, explanation: "Subject core (B) + purpose clause (D) + object (A) + contrast (C)." },

  // Set 2: Novelty (11-20)
  { id: 11, parts: ["of the industrial revolution", "written in the late 19th century", "through the eyes of a child", "the novel explores the social injustices"], q: "Choose the correct order:", options: ["B-D-A-C", "A-B-C-D", "D-B-A-C", "C-A-B-D"], correct: 0, explanation: "Identifying the modified subject (B-D) followed by its focus (A) and perspective (C)." },
  { id: 12, parts: ["the hiker decided to proceed", "without any professional equipment", "despite being warned of the danger", "up the steep mountain slope"], q: "Rearrange logically:", options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"], correct: 0, explanation: "Contrast (C) + Decision (A) + Direction (D) + Limitation (B)." },
  { id: 13, parts: ["as Leonardo da Vinci did", "possess such a wide range", "rarely does a single individual", "of intellectual and creative talents"], q: "Identify the correct sequence:", options: ["C-B-D-A", "A-B-C-D", "B-A-C-D", "D-C-B-A"], correct: 0, explanation: "Inversion 'Rarely does' (C) + Verb (B) + Object (D) + Comparison (A)." },
  { id: 14, parts: ["than a technical glitch", "and restart the entire scene", "no sooner had the play begun", "forced the actors to stop"], q: "Rearrange the segments:", options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"], correct: 0, explanation: "Correlative structure: No sooner had (C) ... than (A) + resulting actions (D-B)." },
  { id: 15, parts: ["that interest rates will fall", "it is highly unlikely", "in the near future", "given the current economic climate"], q: "Choose the correct flow:", options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"], correct: 0, explanation: "Context (D) + Dummy subject (B) + Content (A) + Time (C)." },
  { id: 16, parts: ["to ensure the safety of the passengers", "to the nearest available airport", "the airline pilot decided", "to divert the plane"], q: "Rearrange correctly:", options: ["A-C-D-B", "B-A-C-D", "C-D-A-B", "D-B-C-A"], correct: 0, explanation: "Purpose (A) + Subject (C) + Action (D) + Destination (B)." },
  { id: 17, parts: ["traditional newspapers have had", "to stay relevant in the 21st century", "with the rise of digital media", "to adapt their business models"], q: "Identify the logical order:", options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"], correct: 0, explanation: "Cause (C) + Subject (A) + Immediate requirement (D) + Long-term goal (B)." },
  { id: 18, parts: ["the satellite will be launched", "from the space centre in Florida", "provided that the weather stays clear", "early tomorrow morning"], q: "Rearrange the segments:", options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"], correct: 0, explanation: "Condition (C) + Main event (A) + Time (D) + Source (B)." },
  { id: 19, parts: ["leave your luggage unattended", "under no circumstances should you", "while waiting in the departures lounge", "at the airport"], q: "Choose the correct sequence:", options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-B-C-A"], correct: 0, explanation: "Negative auxiliary inversion (B) + Verb phrase (A) + Temporal context (C) + Specific location (D)." },
  { id: 20, parts: ["a fascinating glimpse", "the ancient ruins provide", "into a long-lost civilisation", "having been discovered by chance"], q: "Rearrange to form a sentence:", options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"], correct: 0, explanation: "Participle modifier (D) describing the ruins (B), leading to the outcome (A-C)." },

  // Set 3: Intermediate Logic (21-30)
  { id: 21, parts: ["the particle began to oscillate", "until it reached a state of equilibrium", "upon being subjected to magnetic fields", "within the cryo-chamber"], q: "Rearrange correctly:", options: ["C-A-D-B", "A-B-C-D", "B-D-A-C", "D-C-A-B"], correct: 0, explanation: "Condition (C) leads to primary action (A) in a specific location (D) resulting in an endpoint (B)." },
  { id: 22, parts: ["the cognitive dissonance theory suggests", "individuals seek internal consistency", "when faced with conflicting beliefs", "to reduce psychological discomfort"], q: "Identify the logical flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Theory introduction (A) followed by the core mechanism (B), the trigger condition (C), and the objective (D)." },
  { id: 23, parts: ["the Supreme Court overturned the ruling", "citing a violation of the First Amendment", "after months of legal deliberation", "concerning the rights of digital content creators"], q: "Rearrange the segments:", options: ["C-A-B-D", "A-B-C-D", "D-C-B-A", "B-A-D-C"], correct: 0, explanation: "Chronological context (C) followed by the main judicial action (A), the legal rationale (B), and the specific subject matter (D)." },
  { id: 24, parts: ["to mitigate the effects of global warming", "world leaders reached a consensus", "despite the diverging interests of developing nations", "on a multi-trillion dollar green energy pact"], q: "Choose the correct sequence:", options: ["C-B-D-A", "A-B-C-D", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "The constraint (C) prefaces the main diplomatic achievement (B) on a specific topic (D) for an ultimate purpose (A)." },
  { id: 25, parts: ["the Renaissance period marked a shift", "towards humanism and individual expression", "breaking away from the rigid dogma", "of the mediaeval scholastic tradition"], q: "Rearrange to form a coherent statement:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject/Period (A) leads to the direction of change (B), which is contrasted with the previous state (C-D)." },
  { id: 26, parts: ["the central bank is expected to hike rates", "to curb the runaway inflation", "if the consumer price index continues to climb", "at its current unprecedented velocity"], q: "Identify the correct flow:", options: ["C-D-A-B", "A-B-C-D", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Condition (C-D) precedes the anticipated policy action (A) and its goal (B)." },
  { id: 27, parts: ["the archeologist uncovered a series of tablets", "during the excavation of the Mesopotamian ruins", "which provided a detailed account", "of the daily administrative lives of ancient scribes"], q: "Rearrange correctly:", options: ["B-A-C-D", "A-B-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Setting (B) leads to the discovery (A), followed by the significance of the findings (C-D)." },
  { id: 28, parts: ["the protagonist's descent into madness", "was meticulously detailed by the author", "through a series of unreliable narratives", "and jarring shifts in psychological perspective"], q: "Choose the correct flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "The subject (A) is followed by the author's action (B) and the stylistic methods used (C-D)." },
  { id: 29, parts: ["the silicon-based lifeform hypothesis", "remains a staple of speculative exobiology", "even though no empirical evidence", "has yet been found to support it"], q: "Rearrange to form a sentence:", options: ["A-B-C-D", "D-C-B-A", "B-A-D-C", "C-D-A-B"], correct: 0, explanation: "Introduces the hypothesis (A), states its current scientific status (B), and acknowledges the lack of data (C-D)." },
  { id: 30, parts: ["to understand the mechanism of synaptic pruning", "neuroscientists must observe the brain", "during the critical periods of adolescence", "using advanced non-invasive imaging techniques"], q: "Identify the logical order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Starts with the goal (A), followed by the required action (B), the specific timing (C), and the methodology (D)." },

  // Set 4: Academic Structures (31-40)
  { id: 31, parts: ["the concept of the 'categorical imperative'", "posits that moral actions are universal", "independent of the specific consequences", "of any particular situation"], q: "Rearrange logically:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Theory definition (B) + Constraint (C) + Context (D)." },
  { id: 32, parts: ["existentialism emphasizes individual freedom", "arguing that existence precedes essence", "and that humans are responsible for", "defining their own purpose in an indifferent universe"], q: "Identify the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Core philosophy (A) + Main argument (B) + Resulting responsibility (C-D)." },
  { id: 33, parts: ["by deconstructing binary oppositions", "the philosopher sought to expose", "the inherent instabilities of language", "which underpins our understanding of reality"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "C-D-A-B", "D-C-B-A"], correct: 0, explanation: "Method (A) + Subject action (B) + Target of investigation (C) + Significance (D)." },
  { id: 34, parts: ["the 'veil of ignorance' thought experiment", "requires us to design a society", "without knowing our own social position", "to ensure ultimate fairness and justice"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Experiment name (A) + Requirement (B) + Condition (C) + Purpose (D)." },
  { id: 35, parts: ["the dialectical process of history", "according to Hegel", "moves towards a state of absolute spirit", "through the synthesis of conflicting ideas"], q: "Identify the sequence:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Attributed source (B) + Goal (C) + Mechanism (D)." },
  { id: 36, parts: ["the 'Ship of Theseus' paradox", "questions whether an object", "remains the same if all its components", "are gradually replaced over time"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "C-D-A-B", "D-C-B-A"], correct: 0, explanation: "Paradox name (A) + Core question (B) + Specific condition (C-D)." },
  { id: 37, parts: ["utilitarianism evaluates moral worth", "based on the principle of utility", "which aims to maximise the total happiness", "for the greatest number of people"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Evaluation basis (B) + Objective (C-D)." },
  { id: 38, parts: ["the phenomenological approach", "requires a suspension of judgment", "concerning the existence of the external world", "to focus solely on conscious experience"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Approach (A) + Requirement (B) + Scope (C) + Goal (D)." },
  { id: 39, parts: ["the 'trolley problem' forces us", "to confront the moral trade-offs", "between deontological rules and", "consequentialist outcomes in ethical decision making"], q: "Rearrange to form a sentence:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Problem name (A) + Action forced (B) + Conflict (C-D)." },
  { id: 40, parts: ["the concept of 'simulacra'", "suggests that our reality is", "composed of copies of things", "that no longer have an original"], q: "Identify the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Claim (B) + Composition (C) + Nature of copies (D)." },

  // Set 5: Scientific Logic (41-50)
  { id: 41, parts: ["the CRISPR-Cas9 system", "allows for precise gene editing", "by using a guide RNA sequence", "to target specific DNA segments"], q: "Rearrange correctly:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "System name (A) + Function (B) + Mechanism (C) + Target (D)." },
  { id: 42, parts: ["the theory of plate tectonics", "explains the movement of the lithosphere", "resulting from convective currents", "within the Earth's mantle"], q: "Identify the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Theory (A) + Function (B) + Cause (C) + Location (D)." },
  { id: 43, parts: ["the detection of gravitational waves", "confirmed a major prediction", "of Einstein's general theory of relativity", "century after it was first proposed"], q: "Rearrange logically:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Event (A) + Impact (B) + Source (C) + Context (D)." },
  { id: 44, parts: ["the microbiome plays a vital role", "in regulating the human immune system", "by interacting with the gut-brain axis", "and maintaining metabolic homeostasis"], q: "Choose the sequence:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Primary role (B) + Mechanism (C) + Additional role (D)." },
  { id: 45, parts: ["quantum entanglement implies", "that two particles remain connected", "such that the state of one", "instantaneously influences the other regardless of distance"], q: "Identify the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Theory (A) + Implication (B) + Condition (C) + Outcome (D)." },
  { id: 46, parts: ["the second law of thermodynamics", "states that the total entropy", "of an isolated system", "can never decrease over time"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Content (B) + Scope (C) + Constraint (D)." },
  { id: 47, parts: ["the process of nuclear fusion", "powers the stars by merging", "hydrogen isotopes into helium", "releasing immense amounts of energy"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Action (B) + Mechanism (C) + Outcome (D)." },
  { id: 48, parts: ["the discovery of the Higgs boson", "provided the final piece of", "the Standard Model of particle physics", "explaining how particles acquire mass"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Event (A) + Role (B) + Context (C) + Function (D)." },
  { id: 49, parts: ["the expansion of the universe", "is being accelerated by dark energy", "a mysterious force that counteracts", "the gravitational pull of matter"], q: "Rearrange correctly:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Phenomenon (A) + Agent (B) + Definition (C) + Function (D)." },
  { id: 50, parts: ["ocean acidification occurs", "when the absorption of atmospheric CO2", "leads to a decrease in seawater pH", "threatening the survival of coral reefs"], q: "Identify the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Phenomenon (A) + Trigger (B) + Mechanism (C) + Impact (D)." },

  // Set 6: Global Dynamics (51-60)
  { id: 51, parts: ["the geopolitical shift", "towards a multipolar world order", "has challenged the dominance", "of traditional western alliances"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Direction (B) + Impact (C) + Object (D)." },
  { id: 52, parts: ["the advent of blockchain technology", "promises to decentralise finance", "by providing a secure and transparent", "ledger for all digital transactions"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Promise (B) + Method (C) + Scope (D)." },
  { id: 53, parts: ["the ethical implications", "of artificial general intelligence", "remain a subject of intense debate", "among policy makers and researchers"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Context (B) + Status (C) + Scope (D)." },
  { id: 54, parts: ["the Great Depression of the 1930s", "was exacerbated by high tariffs", "which crippled international trade", "and worsened the global economic crisis"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Event (A) + Cause (B) + Mechanism (C) + Impact (D)." },
  { id: 55, parts: ["the 'silent spring' publication", "by Rachel Carson in 1962", "ignited the modern environmental movement", "by exposing the dangers of pesticides"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Context (B) + Impact (C) + Method (D)." },
  { id: 56, parts: ["the transition to a circular economy", "requires a fundamental redesign", "of industrial production processes", "to eliminate waste and pollution"], q: "Identify the sequence:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Requirement (B) + Target (C) + Purpose (D)." },
  { id: 57, parts: ["the decoding of the human genome", "has paved the way", "for personalised medicine and gene therapy", "tailored to an individual's genetic profile"], q: "Rearrange logically:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Milestone (A) + Result (B) + Fields (C) + Customisation (D)." },
  { id: 58, parts: ["the proliferation of social media", "has fundamentally altered", "the nature of political discourse", "and public perception of truth"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Impact (B) + Nature (C) + Scope (D)." },
  { id: 59, parts: ["the establishment of the United Nations", "in the aftermath of World War II", "was intended to prevent future conflicts", "through international cooperation and diplomacy"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Context (B) + Intent (C) + Method (D)." },
  { id: 60, parts: ["the rise of the gig economy", "has created new challenges", "for traditional labour laws", "and social security systems"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Impact (B) + Target (C) + Scope (D)." },

  // Set 7: Theoretical Concepts (61-70)
  { id: 61, parts: ["the phenomenon of 'quantum decoherence'", "explains how quantum systems", "lose their interference effects", "when interacting with the environment"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Explanation (B) + Mechanism (C) + Condition (D)." },
  { id: 62, parts: ["the study of 'neuroplasticity' suggests", "that the brain can reorganise itself", "by forming new neural connections", "throughout an individual's entire lifespan"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Field (A) + Suggestion (B) + Method (C) + Timing (D)." },
  { id: 63, parts: ["the 'Big Bang' theory posits", "that the universe began", "as a near-infinite singularity", "billions of years ago"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Theory (A) + Claim (B) + State (C) + Time (D)." },
  { id: 64, parts: ["the development of 'synthetic biology'", "allows for the design", "of novel biological systems", "not found in the natural world"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Field (A) + Function (B) + Target (C) + Context (D)." },
  { id: 65, parts: ["the 'Goldilocks zone' refers to", "the habitable region around a star", "where liquid water can exist", "on the surface of a planet"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Term (A) + Definition (B) + Condition (C) + Location (D)." },
  { id: 66, parts: ["the theory of 'natural selection'", "describes the process whereby", "organisms better adapted to their environment", "tend to survive and reproduce"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Theory (A) + Description (B) + Subject (C) + Outcome (D)." },
  { id: 67, parts: ["the 'double-slit' experiment demonstrates", "the wave-particle duality of matter", "by showing that particles can", "behave like waves under certain conditions"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Experiment (A) + Demonstration (B) + Method (C) + Outcome (D)." },
  { id: 68, parts: ["the 'Standard Model' of particle physics", "describes the fundamental forces", "and the subatomic particles", "that constitute the known universe"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Model (A) + Function (B) + Components (C) + Scope (D)." },
  { id: 69, parts: ["the 'Turing test' evaluates", "the ability of a machine", "to exhibit intelligent behaviour", "indistinguishable from that of a human"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Test name (A) + Target (B) + Goal (C) + Criteria (D)." },
  { id: 70, parts: ["the 'Fermi paradox' highlights", "the apparent contradiction between", "the high probability of extraterrestrial life", "and the lack of evidence for it"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Paradox (A) + Nature (B) + Component 1 (C) + Component 2 (D)." },

  // Set 8: Historical Analysis (71-80)
  { id: 71, parts: ["the fall of the Roman Empire", "was a complex process involving", "internal political decay", "and external barbarian invasions"], q: "Rearrange correctly:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Event (A) + Nature (B) + Cause 1 (C) + Cause 2 (D)." },
  { id: 72, parts: ["the industrial revolution initiated", "a massive migration of people", "from rural agricultural areas", "to rapidly growing urban centres"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Event (A) + Outcome (B) + Source (C) + Destination (D)." },
  { id: 73, parts: ["the 'cold war' was characterized", "by intense geopolitical rivalry", "between the US and the USSR", "without direct military confrontation"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Period (A) + Nature (B) + Actors (C) + Constraint (D)." },
  { id: 74, parts: ["the 'Velvet Revolution' in Czechoslovakia", "marked a non-violent transition", "from communist rule to", "a parliamentary democratic republic"], q: "Rearrange logically:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Event (A) + Nature (B) + Source (C) + Result (D)." },
  { id: 75, parts: ["the establishment of the 'Silk Road'", "facilitated the exchange of", "goods, ideas, and technologies", "between the East and the West"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Function (B) + Items (C) + Scope (D)." },
  { id: 76, parts: ["the 'Magna Carta' signed in 1215", "established the principle that", "no one is above the law", "not even the monarch"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Outcome (B) + Principle (C) + Specificity (D)." },
  { id: 77, parts: ["the 'French Revolution' sought", "to dismantle the absolute monarchy", "and replace it with a system", "based on liberty, equality, and fraternity"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Event (A) + Goal (B) + System (C) + Basis (D)." },
  { id: 78, parts: ["the 'Meiji Restoration' in Japan", "led to rapid modernisation", "and industrialisation of the country", "in the late 19th century"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Event (A) + Outcome (B) + Nature (C) + Time (D)." },
  { id: 79, parts: ["the 'Age of Enlightenment' emphasised", "the use of reason and logic", "as the primary sources of authority", "rather than tradition or religion"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Period (A) + Emphasis (B) + Role (C) + Contrast (D)." },
  { id: 80, parts: ["the 'Green Revolution' refers to", "the large-scale increases in", "global food production", "resulting from technological advancements"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Term (A) + Nature (B) + Scope (C) + Cause (D)." },

  // Set 9: Legal & Social (81-90)
  { id: 81, parts: ["the 'rule of law' requires", "that all citizens and institutions", "are accountable to laws", "that are publicly promulgated"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Concept (A) + Subject (B) + Requirement (C) + Nature of laws (D)." },
  { id: 82, parts: ["the principle of 'habeas corpus'", "protects individuals from", "arbitrary and unlawful imprisonment", "without a fair trial"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Principle (A) + Function (B) + Protection (C) + Condition (D)." },
  { id: 83, parts: ["the 'separation of powers' doctrine", "divides the government into", "legislative, executive, and judicial branches", "to prevent the abuse of authority"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Doctrine (A) + Function (B) + Components (C) + Purpose (D)." },
  { id: 84, parts: ["the 'Universal Declaration of Human Rights'", "outlines the fundamental rights", "to which all human beings", "are inherently entitled"], q: "Rearrange logically:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Document (A) + Function (B) + Subject (C) + Status (D)." },
  { id: 85, parts: ["the 'precautionary principle' suggests", "taking protective measures", "even if some scientific cause-and-effect", "relationships are not fully established"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Principle (A) + Action (B) + Condition (C) + Uncertainty (D)." },
  { id: 86, parts: ["the 'social contract' theory posits", "that individuals consent", "to surrender some of their freedoms", "in exchange for social order"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Theory (A) + Consent (B) + Sacrifice (C) + Reward (D)." },
  { id: 87, parts: ["the 'burden of proof' rests", "on the party making a claim", "to provide sufficient evidence", "to support their position"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Concept (A) + Responsibility (B) + Requirement (C) + Goal (D)." },
  { id: 88, parts: ["the 'right to privacy' is often", "considered a fundamental human right", "essential for the protection", "of individual dignity and autonomy"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Status (B) + Importance (C) + Value (D)." },
  { id: 89, parts: ["the 'equality before the law' principle", "ensures that all individuals", "receive the same legal treatment", "regardless of their social status"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Principle (A) + Subject (B) + Outcome (C) + Scope (D)." },
  { id: 90, parts: ["the 'intellectual property' laws", "provide legal protection", "for the creations of the mind", "such as inventions and artistic works"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Function (B) + Target (C) + Examples (D)." },

  // Set 10: Communication & Linguistics (91-100)
  { id: 91, parts: ["the 'Sapir-Whorf hypothesis' suggests", "that the structure of a language", "influences the way its speakers", "conceptualise and perceive the world"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Hypothesis (A) + Factor (B) + Impact (C) + Outcome (D)." },
  { id: 92, parts: ["the 'universal grammar' theory posits", "that all human languages", "share a common underlying structure", "innate to the human mind"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Theory (A) + Scope (B) + Feature (C) + Source (D)." },
  { id: 93, parts: ["the 'morphology' of a language", "studies the internal structure of words", "and how they are formed", "from smaller units called morphemes"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Definition (B) + Process (C) + Units (D)." },
  { id: 94, parts: ["the 'phonology' of a language", "studies the systematic organisation of sounds", "and how they function", "within a particular linguistic system"], q: "Rearrange logically:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Definition (B) + Process (C) + Context (D)." },
  { id: 95, parts: ["the 'syntax' of a language", "describes the rules for", "combining words into phrases", "and sentences to convey meaning"], q: "Choose the flow:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Function (B) + Process (C) + Goal (D)." },
  { id: 96, parts: ["the 'semantics' of a language", "is the study of meaning", "conveyed through words, phrases,", "and larger linguistic units"], q: "Identify the order:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Definition (B) + Medium (C) + Scope (D)." },
  { id: 97, parts: ["the 'pragmatics' of a language", "examines how context", "influences the interpretation", "of meaning in social interaction"], q: "Rearrange accurately:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Focus (B) + Process (C) + Context (D)." },
  { id: 98, parts: ["the 'etymology' of a word", "traces its historical origins", "and how its form and meaning", "have changed over time"], q: "Choose the flow:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Function (B) + Nature of change (C) + Timing (D)." },
  { id: 99, parts: ["the 'sociolinguistics' field", "studies the relationship between", "language use and social factors", "such as class, gender, and ethnicity"], q: "Identify the order:", options: ["A-B-C-D", "C-D-A-B", "B-A-D-C", "D-C-B-A"], correct: 0, explanation: "Subject (A) + Function (B) + Relationship (C) + Factors (D)." },
  { id: 100, parts: ["the 'computational linguistics' field", "develops algorithms and models", "to process and analyse", "natural language data at scale"], q: "Rearrange correctly:", options: ["A-B-C-D", "B-A-C-D", "D-C-B-A", "C-D-A-B"], correct: 0, explanation: "Subject (A) + Action (B) + Goal (C) + Scope (D)." },
]

export default function RearrangeQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
  const feedbackRef = useRef<HTMLDivElement>(null)
  const [selectedSetIndex, setSelectedSetIndex] = useState<number | null>(null)
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [isFinished, setIsFinished] = useState(false)

  const quizSets = [
    { name: "Practice Set 1", range: [0, 10] },
    { name: "Practice Set 2", range: [10, 20] },
    { name: "Practice Set 3", range: [20, 30] },
    { name: "Practice Set 4", range: [30, 40] },
    { name: "Practice Set 5", range: [40, 50] },
    { name: "Practice Set 6", range: [50, 60] },
    { name: "Practice Set 7", range: [60, 70] },
    { name: "Practice Set 8", range: [70, 80] },
    { name: "Practice Set 9", range: [80, 90] },
    { name: "Practice Set 10", range: [90, 100] },
  ]

  useEffect(() => {
    if (selectedSetIndex !== null) {
      const { range } = quizSets[selectedSetIndex]
      const selectedQuestions = REARRANGE_QUIZ_DATA.slice(range[0], range[1]).map(q => {
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

      window.scrollTo({ top: offsetPosition, behavior: 'smooth' })
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
      toast({ title: "Examination Complete!", description: "Check your Subject Code 101 performance." })
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }
  }, [currentStep, questions.length, toast])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' && !isFinished && questions.length > 0) {
        const q = questions[currentStep]
        if (answers[q.id] !== undefined) {
          nextQuestion()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [answers, currentStep, questions, isFinished, nextQuestion])

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
              Section 6: Sequential Logic
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Practice Sets Selector</h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Select a clinical practice set to begin. Each set follows official CUET Subject Code 101 marking protocols.
            </p>
          </header>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in-up">
            {quizSets.map((set, idx) => (
              <Card 
                key={idx} 
                className="group border-none shadow-sm hover:shadow-xl transition-all duration-300 rounded-[2rem] bg-white/70 backdrop-blur-sm cursor-pointer overflow-hidden flex flex-col"
                onClick={() => setSelectedSetIndex(idx)}
              >
                <CardHeader className="p-8">
                  <div className="flex justify-between items-start mb-4">
                    <div className="p-3 bg-primary/10 rounded-xl text-primary">
                      <Layers className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="rounded-full font-bold">10 Items</Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:text-primary transition-colors">{set.name}</CardTitle>
                  <CardDescription className="mt-2">Standard logic sequences for targeted clinical practice.</CardDescription>
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
          <Card className="text-center p-8 border-none shadow-2xl rounded-[2rem] bg-white">
            <div className="bg-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Layers className="w-10 h-10 text-primary" />
            </div>
            <CardTitle className="text-3xl font-headline mb-2 font-bold">{quizSets[selectedSetIndex].name} Results</CardTitle>
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
            <div className="p-6 bg-foreground text-background rounded-[1.5rem] mb-8 shadow-xl">
              <div className="text-sm opacity-70 font-bold">Protocol Score</div>
              <div className="text-4xl font-bold">{total} / {questions.length * 5}</div>
            </div>
            <div className="flex flex-col gap-3">
              <Button size="lg" className="rounded-xl h-12 font-bold shadow-md" onClick={() => {
                setIsFinished(false)
                setCurrentStep(0)
                setAnswers({})
              }}>
                <RefreshCw className="w-4 h-4 mr-2" /> Retake this Set
              </Button>
              <Button variant="outline" size="lg" className="rounded-xl h-12 font-bold" onClick={() => setSelectedSetIndex(null)}>
                Back to Dashboard
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
              const isCorrect = userAns === q.correct
              return (
                <Card key={idx} className="border-none shadow-md overflow-hidden rounded-[1.5rem] bg-white">
                  <div className={cn("px-6 py-3 flex items-center justify-between", isCorrect ? "bg-green-50" : "bg-red-50")}>
                    <Badge variant={isCorrect ? "default" : "destructive"} className="rounded-full font-bold">
                      {isCorrect ? "CORRECT (+5)" : "ERROR (-1)"}
                    </Badge>
                  </div>
                  <CardContent className="p-6 space-y-4">
                    <div className="flex flex-col gap-2">
                      {q.parts.map((p, i) => (
                        <div key={i} className="text-xs font-mono font-bold text-muted-foreground flex items-start gap-2">
                          <span className="text-primary">{String.fromCharCode(65+i)}:</span> {p}
                        </div>
                      ))}
                    </div>
                    <p className="font-bold text-lg">{q.q}</p>
                    <div className="grid gap-2 text-sm">
                      <div className={cn("p-3 rounded-lg flex items-center gap-2", isCorrect ? "bg-green-50" : "bg-red-50")}>
                        {isCorrect ? <CheckCircle2 className="w-4 h-4 text-green-600" /> : <XCircle className="w-4 h-4 text-red-600" />}
                        <span><strong className="text-foreground">Your Selection:</strong> {userAns !== undefined ? q.options[userAns] : "Skipped"}</span>
                      </div>
                      {!isCorrect && (
                        <div className="p-3 rounded-lg bg-green-50 border border-green-200">
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span>
                            <strong className="text-foreground">Correct Sequence:</strong> {q.options[q.correct]}
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
      <main className="container mx-auto px-4 py-12 max-w-3xl">
        <div className="flex items-center justify-between mb-8" ref={quizRef}>
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" onClick={() => setSelectedSetIndex(null)} className="rounded-full">
              <ChevronLeft className="w-4 h-4 mr-1" /> Back
            </Button>
            <div>
              <h1 className="text-xl font-headline font-bold uppercase tracking-tight text-primary">Sequential Logic</h1>
              <p className="text-muted-foreground font-mono text-xs font-bold">Item {currentStep + 1} / {questions.length}</p>
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

        <Card className="border-none shadow-xl rounded-[2rem] bg-white mb-8 overflow-hidden" ref={questionCardRef}>
          <CardHeader className="bg-primary/5 pb-8 pt-10">
            <CardTitle className="text-xl text-center leading-relaxed mb-6 font-bold">{q.q}</CardTitle>
            <div className="flex flex-col gap-2">
              {q.parts.map((p, i) => (
                <div key={i} className="px-4 py-3 bg-white border border-primary/10 rounded-xl text-sm font-medium text-foreground shadow-sm flex items-start gap-3 group hover:border-primary/30 transition-colors">
                  <span className="font-mono font-bold text-primary bg-primary/5 w-6 h-6 flex items-center justify-center rounded-lg shrink-0">{String.fromCharCode(65 + i)}</span>
                  {p}
                </div>
              ))}
            </div>
          </CardHeader>
          <CardContent className="p-10 pt-6">
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
                      <span className="inline-block w-12 text-primary font-mono">{i + 1}.</span>
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

        <div className="flex justify-between items-center">
          <Button variant="ghost" onClick={() => setCurrentStep(Math.max(0, currentStep - 1))} disabled={currentStep === 0} className="rounded-xl font-bold">
            <ChevronLeft className="w-4 h-4 mr-1" /> Previous
          </Button>
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={userAnswer === undefined}>
            {currentStep === questions.length - 1 ? "Finish Set" : "Next Question"} <Target className="w-4 h-4 ml-2 group-hover:scale-110 transition-transform" />
          </Button>
        </div>

        <div className="mt-12 p-8 rounded-3xl bg-secondary/10 border border-secondary/20 flex gap-5 shadow-sm bg-white">
          <AlertCircle className="w-8 h-8 text-secondary-foreground shrink-0" />
          <div className="text-sm text-secondary-foreground font-bold">
            <strong className="block mb-1">Elite Protocol:</strong>
            Sequential items are high-yield but time-intensive. Use the "Opening Hook" strategy to save 30s per question. Every +5 counts towards your 250 goal.
          </div>
        </div>
      </main>
    </div>
  )
}
