
"use client"

import { useState, useEffect, useCallback, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Trophy, RefreshCw, ChevronLeft, Target, Layers, Info, CheckCircle2, XCircle, Keyboard, ArrowRight, AlertCircle, BookOpen } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import Link from "next/link"
import { cn } from "@/lib/utils"

type Question = {
  id: number
  parts: string[]
  q: string
  options: string[]
  correct: number
  explanation: string
}

const REARRANGE_QUIZ_DATA: Question[] = [
  // Set 1: Mixed Themes
  {
    id: 1,
    parts: ["the fragrance of jasmine drifted", "as the evening breeze passed through", "the open windows of the old house", "filling the room with a gentle sweetness"],
    q: "Rearrange the parts labelled A, B, C, D to form a meaningful sentence.",
    options: ["B-C-A-D", "A-B-C-D", "D-A-C-B", "C-A-D-B"],
    correct: 0,
    explanation: "The sentence starts with the setting (B), followed by the location (C), the primary action (A), and ends with the result (D)."
  },
  {
    id: 2,
    parts: ["due to the heavy rain forecast", "the annual function", "the committee decided to postpone", "for the entire region"],
    q: "Choose the correct sequence:",
    options: ["C-B-A-D", "A-B-C-D", "B-A-D-C", "D-B-C-A"],
    correct: 0,
    explanation: "Subject (Committee - C) + Verb (Postpone - B) + Object (Function) + Reason (Rain - A) + Scope (Region - D)."
  },
  {
    id: 3,
    parts: ["remains the cornerstone of human progress", "the ability to adapt and learn", "in an era of rapid technological change", "despite the risks of automation"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-B-A-D", "A-C-B-D", "D-A-C-B", "B-A-C-D"],
    correct: 0,
    explanation: "Begins with context (C), introduces subject (B), state (A), and ends with contrast (D)."
  },
  {
    id: 4,
    parts: ["when the explorers set out", "over the horizon", "scarcely had the sun risen", "on their perilous journey"],
    q: "Identify the correct sequence:",
    options: ["C-B-A-D", "B-A-C-D", "A-B-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Uses 'Scarcely had (C) ... when (A)' structure. Logical flow: Sunrise (C-B) leading to the start of the journey (A-D)."
  },
  {
    id: 5,
    parts: ["the jury found it difficult", "to reach a unanimous verdict", "due to conflicting testimonies", "although the evidence was clear"],
    q: "Rearrange the segments:",
    options: ["D-A-B-C", "A-B-C-D", "C-D-A-B", "B-C-D-A"],
    correct: 0,
    explanation: "Starts with the contrast (D), followed by the main difficulty (A), the specific goal (B), and the reason (C)."
  },
  {
    id: 6,
    parts: ["into the realm of quantum theory", "the observable phenomena", "physicists must look beyond", "to understand the complexities of the universe"],
    q: "Choose the logical order:",
    options: ["D-C-B-A", "A-B-C-D", "C-A-B-D", "B-D-C-A"],
    correct: 0,
    explanation: "Starts with the purpose (D), followed by the subject-requirement (C), the object (B), and the destination (A)."
  },
  {
    id: 7,
    parts: ["to isolate it from radioactive waste", "with minimal environmental impact", "not only did the scientist discover a new element", "but she also developed a method"],
    q: "Rearrange correctly:",
    options: ["C-D-A-B", "A-B-C-D", "B-A-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Correlative structure: Not only (C) ... but also (D) + purpose (A) + manner (B)."
  },
  {
    id: 8,
    parts: ["had already been relocated", "most of the survivors", "by the time the rescue team arrived", "to a safer facility"],
    q: "Choose the correct sequence:",
    options: ["C-B-A-D", "A-B-C-D", "D-A-C-B", "B-C-A-D"],
    correct: 0,
    explanation: "Time clause (C) followed by the subject (B) and the complete verb phrase (A-D)."
  },
  {
    id: 9,
    parts: ["at the international symposium", "having completed her research", "to a round of applause", "she presented her findings"],
    q: "Identify the coherent flow:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Participle phrase (B) leads to the main action (D) + location (A) + result (C)."
  },
  {
    id: 10,
    parts: ["the use of natural light", "the architect designed the building", "while minimizing energy consumption", "so that it would maximise"],
    q: "Rearrange the segments:",
    options: ["B-D-A-C", "A-B-C-D", "C-A-B-D", "D-B-C-A"],
    correct: 0,
    explanation: "Subject core (B) + purpose clause (D) + object (A) + contrast (C)."
  },
  // Set 2: Novelty & Adventure
  {
    id: 11,
    parts: ["of the industrial revolution", "written in the late 19th century", "through the eyes of a child", "the novel, explores the social injustices"],
    q: "Choose the correct order:",
    options: ["D-B-A-C", "A-B-C-D", "B-D-A-C", "C-A-B-D"],
    correct: 2,
    explanation: "Identifying the modified subject (B-D) followed by its focus (A) and perspective (C)."
  },
  {
    id: 12,
    parts: ["the hiker decided to proceed", "without any professional equipment", "despite being warned of the danger", "up the steep mountain slope"],
    q: "Rearrange logically:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Contrast (C) + Decision (A) + Direction (D) + Limitation (B)."
  },
  {
    id: 13,
    parts: ["as Leonardo da Vinci did", "possess such a wide range", "rarely does a single individual", "of intellectual and creative talents"],
    q: "Identify the correct sequence:",
    options: ["C-B-D-A", "A-B-C-D", "B-A-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Inversion 'Rarely does' (C) + Verb (B) + Object (D) + Comparison (A)."
  },
  {
    id: 14,
    parts: ["than a technical glitch", "and restart the entire scene", "no sooner had the play begun", "forced the actors to stop"],
    q: "Rearrange the segments:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Correlative structure: No sooner had (C) ... than (A) + resulting actions (D-B)."
  },
  {
    id: 15,
    parts: ["that interest rates will fall", "it is highly unlikely", "in the near future", "given the current economic climate"],
    q: "Choose the correct flow:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Context (D) + Dummy subject (B) + Content (A) + Time (C)."
  },
  {
    id: 16,
    parts: ["to ensure the safety of the passengers", "to the nearest available airport", "the airline pilot decided", "to divert the plane"],
    q: "Rearrange correctly:",
    options: ["A-C-D-B", "B-A-C-D", "C-D-A-B", "D-B-C-A"],
    correct: 0,
    explanation: "Purpose (A) + Subject (C) + Action (D) + Destination (B)."
  },
  {
    id: 17,
    parts: ["traditional newspapers have had", "to stay relevant in the 21st century", "with the rise of digital media", "to adapt their business models"],
    q: "Identify the logical order:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Cause (C) + Subject (A) + Immediate requirement (D) + Long-term goal (B)."
  },
  {
    id: 18,
    parts: ["the satellite will be launched", "from the space centre in Florida", "provided that the weather stays clear", "early tomorrow morning"],
    q: "Rearrange the segments:",
    options: ["C-A-D-B", "A-B-C-D", "D-C-B-A", "B-A-C-D"],
    correct: 0,
    explanation: "Condition (C) + Main event (A) + Time (D) + Source (B)."
  },
  {
    id: 19,
    parts: ["leave your luggage unattended", "under no circumstances should you", "while waiting in the departures lounge", "at the airport"],
    q: "Choose the correct sequence:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-B-C-A"],
    correct: 0,
    explanation: "Negative auxiliary inversion (B) + Verb phrase (A) + Temporal context (C) + Specific location (D)."
  },
  {
    id: 20,
    parts: ["a fascinating glimpse", "the ancient ruins provide", "into a long-lost civilisation", "having been discovered by chance"],
    q: "Rearrange to form a sentence:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Participle modifier (D) describing the ruins (B), leading to the outcome (A-C)."
  },
  // Set 3: Modern Change
  {
    id: 21,
    parts: ["through the melting of polar ice caps", "is becoming increasingly evident", "the impact of climate change", "and rising sea levels globally"],
    q: "Identify the correct order:",
    options: ["C-B-A-D", "A-B-C-D", "D-A-B-C", "B-C-D-A"],
    correct: 0,
    explanation: "Subject (C) + Verb (B) + Evidence (A-D)."
  },
  {
    id: 22,
    parts: ["transparency and collaboration", "in contrast to his predecessor", "across all levels of the company", "the new CEO emphasized"],
    q: "Rearrange the segments:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrastive phrase (B) + Subject-Verb (D) + Object (A) + Scope (C)."
  },
  {
    id: 23,
    parts: ["within its logistics department", "a new software system", "with a view to improving efficiency", "the company decided to implement"],
    q: "Choose the correct flow:",
    options: ["C-D-B-A", "A-B-C-D", "B-A-C-D", "D-C-B-A"],
    correct: 0,
    explanation: "Purpose (C) + Subject core (D) + Object (B) + Location (A)."
  },
  {
    id: 24,
    parts: ["much remains to be done", "before we can achieve", "true social and economic equality", "despite the significant progress made"],
    q: "Rearrange correctly:",
    options: ["D-A-B-C", "A-B-C-D", "C-D-A-B", "B-A-C-D"],
    correct: 0,
    explanation: "Contrast (D) + Main assertion (A) + Conditional timeframe (B-C)."
  },
  {
    id: 25,
    parts: ["that will continue to shape", "globalization is a reality", "the future of our society", "whether we like it or not"],
    q: "Identify the logical order:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Disjunctive context (D) + Main fact (B) + Defining clause (A-C)."
  },
  {
    id: 26,
    parts: ["has forced many households", "and cut back on non-essential items", "to reconsider their spending habits", "the sudden surge in inflation"],
    q: "Rearrange to form a coherent sentence:",
    options: ["D-A-C-B", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Cause (D) + Verb phrase (A) + Result 1 (C) + Result 2 (B)."
  },
  {
    id: 27,
    parts: ["can we hope to preserve", "only by embracing sustainable practices", "the delicate balance of our ecosystem", "for future generations"],
    q: "Choose the correct order:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Restrictive 'Only by' (B) + Auxiliary inversion (A) + Object (C) + Modifier (D)."
  },
  {
    id: 28,
    parts: ["contradicted the statements made", "which was captured on CCTV", "by the suspect during interrogation", "the witness's account of the event"],
    q: "Identify the logical sequence:",
    options: ["D-B-A-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Subject (D) + Relative clause (B) + Verb phrase (A) + Agent phrase (C)."
  },
  {
    id: 29,
    parts: ["above all else", "entrepreneurs must focus", "to be successful in the competitive market", "on innovation and customer satisfaction"],
    q: "Rearrange correctly:",
    options: ["C-B-D-A", "A-B-C-D", "B-D-A-C", "D-C-B-A"],
    correct: 0,
    explanation: "Purpose (C) + Requirement (B) + Focus area (D) + Emphasis (A)."
  },
  {
    id: 30,
    parts: ["can significantly improve mental health", "suggest that a balanced diet", "the findings of the study", "combined with regular exercise"],
    q: "Choose the coherent flow:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (B) + Complement (D) + Result (A)."
  },
  // Set 4: Science & Regulation
  {
    id: 31,
    parts: ["and coastal biodiversity", "has profound implications", "the rapid melting of glaciers", "for global sea levels"],
    q: "Rearrange to form a logical sentence:",
    options: ["C-B-D-A", "A-B-C-D", "D-A-B-C", "B-C-A-D"],
    correct: 0,
    explanation: "Subject (C) + Verb (B) + Target 1 (D) + Target 2 (A)."
  },
  {
    id: 32,
    parts: ["it provided valuable data", "although the experiment failed", "for future research directions", "to produce the expected results"],
    q: "Choose the correct sequence:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrastive opener (B-D) leading to the actual benefit (A-C)."
  },
  {
    id: 33,
    parts: ["their supporting documents", "all applicants must submit", "within thirty working days", "under the new regulations"],
    q: "Rearrange correctly:",
    options: ["D-B-A-C", "A-B-C-D", "B-A-C-D", "C-D-A-B"],
    correct: 0,
    explanation: "Operational context (D) + Subject (B) + Object (A) + Time limit (C)."
  },
  {
    id: 34,
    parts: ["revolutionised the treatment", "of infectious bacterial diseases", "the discovery of penicillin", "by Alexander Fleming in 1928"],
    q: "Identify the logical order:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Compound Subject (C-D) + Verb (A) + Object (B)."
  },
  {
    id: 35,
    parts: ["more efficient production methods", "and reduce their carbon footprint", "industries must adopt", "in order to achieve sustainability"],
    q: "Rearrange to form a sentence:",
    options: ["D-C-A-B", "A-B-C-D", "C-D-A-B", "B-A-C-D"],
    correct: 0,
    explanation: "Infinitive purpose (D) + Subject requirement (C) + Solution 1 (A) + Solution 2 (B)."
  },
  {
    id: 36,
    parts: ["and interact with one another", "has changed the way", "the proliferation of smartphones", "people consume information"],
    q: "Choose the coherent flow:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Cause (C) + Verb (B) + Object clause (D-A)."
  },
  {
    id: 37,
    parts: ["due to lack of infrastructure", "despite the technological advancements", "to widen in developing nations", "the digital divide continues"],
    q: "Rearrange correctly:",
    options: ["B-D-C-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast (B) + Subject (D) + Infinitive result (C) + Reason (A)."
  },
  {
    id: 38,
    parts: ["owing to unforeseen circumstances", "was delayed for several months", "the implementation of the project", "beyond the control of the team"],
    q: "Identify the logical sequence:",
    options: ["C-B-A-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Passive verb (B) + Cause (A) + Extension (D)."
  },
  {
    id: 39,
    parts: ["in the arid desert region", "only when the sun went down", "to drop significantly", "did the temperature begin"],
    q: "Choose the correct sequence:",
    options: ["B-D-C-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Restrictive time clause (B) + Inverted auxiliary (D) + Infinitive (C) + Location (A)."
  },
  {
    id: 40,
    parts: ["between the ground and space teams", "depended entirely on", "the success of the mission", "the seamless coordination"],
    q: "Rearrange to form a sentence:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Result (C) + Verb (B) + Necessary component (D) + Participants (A)."
  },
  // Set 5: Ethics & Philosophy
  {
    id: 41,
    parts: ["the pressures of modern life", "is often complicated by", "the pursuit of happiness", "and societal expectations"],
    q: "Identify the correct order:",
    options: ["C-B-A-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Concept (C) + Passive relation (B) + Factor 1 (A) + Factor 2 (D)."
  },
  {
    id: 42,
    parts: ["to solve real-world problems", "knowledge, once acquired,", "for the benefit of humanity", "must be applied diligently"],
    q: "Rearrange correctly:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (B) + Modal requirement (D) + Goal (A) + Beneficiary (C)."
  },
  {
    id: 43,
    parts: ["of daily administrative tasks", "without a clear vision", "in the trivial details", "it is easy to get lost"],
    q: "Choose the logical order:",
    options: ["B-D-C-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Conditional lack (B) + Dummy subject (D) + Location (C) + Scope (A)."
  },
  {
    id: 44,
    parts: ["from social media platforms", "to think critically about", "the teacher encouraged students", "the information they receive"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Action initiator (C) + Encouragement (B) + Target (D) + Source (A)."
  },
  {
    id: 45,
    parts: ["of ancient civilisations", "by examining the historical records", "historians can gain insights", "into the social structures"],
    q: "Identify the coherent flow:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Method (B) + Agent-Action (C) + Target (D) + Subject focus (A)."
  },
  {
    id: 46,
    parts: ["exhibited at the national gallery", "the artist used light and shadow", "to create a sense of depth", "in her latest masterpiece"],
    q: "Rearrange correctly:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject-Verb (B) + Method (C) + Location (D) + Final context (A)."
  },
  {
    id: 47,
    parts: ["unaware of the surrounding chaos", "despite the loud noise", "the baby continued to sleep", "soundly in the cradle"],
    q: "Choose the correct sequence:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast (B) + Main action (C) + Manner (D) + State (A)."
  },
  {
    id: 48,
    parts: ["to suggest new ideas", "the company values innovation", "and encourages its employees", "for improving the existing products"],
    q: "Identify the logical sequence:",
    options: ["B-C-A-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Statement of value (B) + Correlative action (C) + Goal (A) + Purpose (D)."
  },
  {
    id: 49,
    parts: ["not only expands vocabulary", "but also broadens perspective", "reading books regularly", "on diverse global cultures"],
    q: "Rearrange to form a logical sentence:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Correlative 1 (A) + Correlative 2 (B) + Scope (D)."
  },
  {
    id: 50,
    parts: ["the foundation of trust", "integrity and transparency", "is built in any relationship", "are the pillars upon which"],
    q: "Choose the coherent flow:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Core values (B) + Predicate link (D) + Target (A) + Outcome (C)."
  },
  // Scramble 51-100 logically...
  {
    id: 51,
    parts: ["is essential for maintaining", "the ecological balance", "the preservation of biodiversity", "of our planet's various habitats"],
    q: "Identify the correct order:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (A) + Focus (B) + Scope (D)."
  },
  {
    id: 52,
    parts: ["plants play a vital role", "by converting sunlight into energy", "in the global carbon cycle", "and oxygen production"],
    q: "Rearrange correctly:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Method (B) + Action (A) + Domain 1 (C) + Domain 2 (D)."
  },
  {
    id: 53,
    parts: ["whether life exists", "on other planets", "within our solar system", "scientists have long debated"],
    q: "Choose the logical order:",
    options: ["D-A-B-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Action (D) + Subject of debate (A) + Location (B) + Constraint (C)."
  },
  {
    id: 54,
    parts: ["to reduce marine pollution", "the restoration of coral reefs", "and rising ocean temperatures", "requires global cooperation"],
    q: "Rearrange to form a coherent statement:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (B) + Requirement (D) + Purpose 1 (A) + Purpose 2 (C)."
  },
  {
    id: 55,
    parts: ["thrive in deep-sea vents", "despite the harsh conditions", "where sunlight cannot reach", "certain species of extremophiles"],
    q: "Identify the coherent flow:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast (B) + Subject (D) + Action (A) + Defining location (C)."
  },
  {
    id: 56,
    parts: ["biological and social factors", "is a complex process", "the evolution of human language", "that involves both"],
    q: "Rearrange correctly:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (B) + Connector (D) + Categories (A)."
  },
  {
    id: 57,
    parts: ["can we mitigate the impact", "on future weather patterns", "only by reducing emissions", "of global warming"],
    q: "Choose the correct sequence:",
    options: ["C-A-D-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Restriction (C) + Inversion (A) + Target (D) + Effect (B)."
  },
  {
    id: 58,
    parts: ["has provided new insights", "into the migratory patterns", "the study of ancient DNA", "of early human civilisations"],
    q: "Identify the logical sequence:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (A) + Insight target (B) + Era (D)."
  },
  {
    id: 59,
    parts: ["reshaping the landscape", "while some volcanoes remain dormant", "others erupt with", "catastrophic force"],
    q: "Choose the correct sequence:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Comparative opener (B) + Contrast (C) + Intensity (D) + Outcome (A)."
  },
  {
    id: 60,
    parts: ["microscopic organisms", "depends on the survival", "the intricate web of life", "of even the smallest"],
    q: "Rearrange to form a sentence:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Requirement (B) + Degree (D) + Specifics (A)."
  },
  // Set 7: Economics
  {
    id: 61,
    parts: ["the volume of international trade", "and investment flows", "the fluctuations in exchange rates", "significantly affect"],
    q: "Identify the correct order:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (D) + Target 1 (A) + Target 2 (B)."
  },
  {
    id: 62,
    parts: ["across the country", "the central bank decided", "to stimulate economic growth", "to lower interest rates"],
    q: "Rearrange correctly:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose (C) + Decision maker (B) + Action (D) + Scope (A)."
  },
  {
    id: 63,
    parts: ["innovation and skill development", "competitiveness depends on", "rather than raw materials", "in an increasingly globalised economy"],
    q: "Choose the logical order:",
    options: ["D-B-A-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Context (D) + Subject-Verb (B) + Primary factor (A) + Secondary factor (C)."
  },
  {
    id: 64,
    parts: ["and national debt management", "between social welfare spending", "the implementation of fiscal policy", "is a delicate balancing act"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-D-B-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb phrase (D) + Comparative context (B-A)."
  },
  {
    id: 65,
    parts: ["unexpectedly resilient", "consumer demand remained", "during the holiday season", "despite the rising inflation"],
    q: "Identify the coherent flow:",
    options: ["D-B-A-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Contrast (D) + Subject (B) + State (A) + Time (C)."
  },
  {
    id: 66,
    parts: ["has transformed the retail sector", "by offering convenience", "the rise of e-commerce", "to shoppers worldwide"],
    q: "Rearrange correctly:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (A) + Method (B) + Target (D)."
  },
  {
    id: 67,
    parts: ["can investors protect", "their capital from", "only by diversifying portfolios", "market volatility"],
    q: "Choose the correct sequence:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Method (C) + Inversion (A) + Object (B) + Source of risk (D)."
  },
  {
    id: 68,
    parts: ["to retirees", "depends on the ratio", "the sustainability of social security", "of working-age people"],
    q: "Identify the logical sequence:",
    options: ["C-B-D-A", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Core issue (C) + Requirement (B) + Factor 1 (D) + Factor 2 (A)."
  },
  {
    id: 69,
    parts: ["are being taken over", "by intelligent machines", "many repetitive tasks", "with the rise of automation"],
    q: "Choose the correct sequence:",
    options: ["D-C-A-B", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Context (D) + Subject (C) + Verb (A) + Agent (B)."
  },
  {
    id: 70,
    parts: ["remains a major challenge", "in the 21st century", "the equitable distribution of wealth", "for developing nations"],
    q: "Rearrange to form a sentence:",
    options: ["C-A-D-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + State (A) + Target group (D) + Era (B)."
  },
  // Set 8: Tech
  {
    id: 71,
    parts: ["into daily life", "and privacy concerns", "the integration of artificial intelligence", "raises significant ethical"],
    q: "Identify the correct order:",
    options: ["C-A-D-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Domain (A) + Verb (D) + Object (B)."
  },
  {
    id: 72,
    parts: ["organisations must invest", "to improve cyber security", "and threat detection systems", "in advanced encryption"],
    q: "Rearrange correctly:",
    options: ["B-A-D-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose (B) + Requirement (A) + Area 1 (D) + Area 2 (C)."
  },
  {
    id: 73,
    parts: ["is now becoming", "a technological reality", "quantum computing, once a theory,", "with vast potential"],
    q: "Choose the logical order:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Current state (A) + Result (B) + Additive info (D)."
  },
  {
    id: 74,
    parts: ["data transmission speeds", "the development of 5G networks", "for mobile devices", "will enable faster"],
    q: "Rearrange to form a coherent statement:",
    options: ["B-D-A-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (B) + Verb (D) + Object (A) + Context (C)."
  },
  {
    id: 75,
    parts: ["the use of facial recognition", "due to potential bias", "technology remains controversial", "despite its advantages"],
    q: "Identify the coherent flow:",
    options: ["D-A-C-B", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Contrast (D) + Subject (A) + State (C) + Reason (B)."
  },
  {
    id: 76,
    parts: ["has allowed for", "the miniaturisation of components", "portable electronic devices", "the creation of powerful"],
    q: "Rearrange correctly:",
    options: ["B-A-D-C", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (B) + Verb (A) + Outcome (D) + Specifics (C)."
  },
  {
    id: 77,
    parts: ["can the infrastructure for", "electric vehicles be", "only with massive investment", "widely implemented"],
    q: "Choose the correct sequence:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Method (C) + Inversion (A) + Subject-Verb (B) + Adverb (D)."
  },
  {
    id: 78,
    parts: ["developers from different", "encourages collaboration among", "the open-source movement", "geographical locations"],
    q: "Identify the logical sequence:",
    options: ["C-B-A-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Initiator (C) + Verb (B) + Participants (A) + Scope (D)."
  },
  {
    id: 79,
    parts: ["more accessible to", "with the rise of the internet", "information has become", "the general public"],
    q: "Choose the correct sequence:",
    options: ["B-C-A-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Context (B) + Subject-Verb (C) + Status (A) + Audience (D)."
  },
  {
    id: 80,
    parts: ["expand our understanding", "fundamental physical laws", "space exploration missions", "of the universe's"],
    q: "Rearrange to form a sentence:",
    options: ["C-A-D-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (A) + Scope (D) + Object (B)."
  },
  // Set 9: Psychology
  {
    id: 81,
    parts: ["learn in different ways", "based on their strengths", "the theory of multiple intelligences", "suggests that students"],
    q: "Identify the correct order:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (D) + Content (A) + Method (B)."
  },
  {
    id: 82,
    parts: ["open-ended questions", "during classroom discussions", "to foster critical thinking", "teachers should encourage"],
    q: "Rearrange correctly:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose (C) + Subject core (D) + Object (A) + Context (B)."
  },
  {
    id: 83,
    parts: ["plays a crucial role", "and interpersonal relationships", "emotional intelligence, often undervalued,", "in successful leadership"],
    q: "Choose the logical order:",
    options: ["C-A-D-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb (A) + Domain 1 (D) + Domain 2 (B)."
  },
  {
    id: 84,
    parts: ["is as important as", "academic achievement", "the development of social skills", "for a child's growth"],
    q: "Rearrange to form a coherent statement:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Comparison (A) + Reference (B) + Context (D)."
  },
  {
    id: 85,
    parts: ["the benefits of handwriting", "for cognitive development", "despite the digital age", "remain well-documented"],
    q: "Identify the coherent flow:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast (C) + Subject (A) + Scope (B) + State (D)."
  },
  {
    id: 86,
    parts: ["due to the rapid", "obsolescence of technical skills", "the concept of lifelong learning", "is gaining momentum"],
    q: "Rearrange correctly:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Concept (C) + Current status (D) + Reason initiator (A) + Core problem (B)."
  },
  {
    id: 87,
    parts: ["the perspectives of", "can we truly understand", "others from different backgrounds", "only by practicing empathy"],
    q: "Choose the correct sequence:",
    options: ["D-B-A-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Method (D) + Inversion (B) + Object (A) + Source (C)."
  },
  {
    id: 88,
    parts: ["is a subject of", "ongoing psychological research", "the impact of social media", "on adolescent mental health"],
    q: "Identify the logical sequence:",
    options: ["C-D-A-B", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Scope (D) + Verb phrase (A) + Specific field (B)."
  },
  {
    id: 89,
    parts: ["professional and personal", "with the rise of remote work", "the boundaries between", "life have become blurred"],
    q: "Choose the correct sequence:",
    options: ["B-C-A-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Context (B) + Subject initiator (C) + Comparison group (A) + State (D)."
  },
  {
    id: 90,
    parts: ["aim to provide", "inclusive education policies", "equal learning opportunities", "to all students"],
    q: "Rearrange to form a sentence:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (B) + Goal (A) + Object (C) + Beneficiary (D)."
  },
  // Set 10: Arts
  {
    id: 91,
    parts: ["and government agencies", "the preservation of cultural heritage", "requires the active participation", "of local communities"],
    q: "Identify the correct order:",
    options: ["B-C-D-A", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Goal (B) + Requirement (C) + Participant 1 (D) + Participant 2 (A)."
  },
  {
    id: 92,
    parts: ["one must look beyond", "to appreciate abstract art", "the literal representation", "of forms and colours"],
    q: "Rearrange correctly:",
    options: ["B-A-C-D", "A-B-C-D", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Purpose (B) + Action core (A) + Rejection target (C) + Components (D)."
  },
  {
    id: 93,
    parts: ["continues to inspire", "contemporary composers", "across various genres", "classical music, though centuries old,"],
    q: "Choose the logical order:",
    options: ["D-A-B-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Modified subject (D) + Verb (A) + Target (B) + Scope (C)."
  },
  {
    id: 94,
    parts: ["values and priorities", "reflects the changing", "of human societies", "the evolution of architecture"],
    q: "Rearrange to form a coherent statement:",
    options: ["D-B-A-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Subject (D) + Verb (B) + Object (A) + Origin (C)."
  },
  {
    id: 95,
    parts: ["regional cinema continues", "to flourish in many", "despite the influence of Hollywood", "parts of the world"],
    q: "Identify the coherent flow:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Contrast (C) + Subject (A) + Infinitive result (B) + Location (D)."
  },
  {
    id: 96,
    parts: ["has led to", "hybrid musical forms", "the emergence of unique", "the synthesis of different styles"],
    q: "Rearrange correctly:",
    options: ["D-A-C-B", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Cause (D) + Verb (A) + Result initiator (C) + Specifics (B)."
  },
  {
    id: 97,
    parts: ["between people from", "can we build bridges", "only through cultural exchange", "different ethnic backgrounds"],
    q: "Choose the correct sequence:",
    options: ["C-B-A-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Method (C) + Inversion (B) + Target (A) + Source (D)."
  },
  {
    id: 98,
    parts: ["lies in its ability", "to evoke empathy and", "the power of literature", "challenge social norms"],
    q: "Identify the logical sequence:",
    options: ["C-A-B-D", "A-B-C-D", "B-C-D-A", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (C) + Verb phrase (A) + Purpose 1 (B) + Purpose 2 (D)."
  },
  {
    id: 99,
    parts: ["the traditional role of", "painting in portraiture", "was significantly transformed", "with the advent of photography"],
    q: "Choose the correct sequence:",
    options: ["D-A-B-C", "A-B-C-D", "B-C-D-A", "C-D-A-B"],
    correct: 0,
    explanation: "Cause (D) + Subject initiator (A) + Topic (B) + Result (C)."
  },
  {
    id: 100,
    parts: ["traditional folk dances", "are an essential part", "of the cultural identity", "of many indigenous groups"],
    q: "Rearrange to form a sentence:",
    options: ["A-B-C-D", "B-C-D-A", "C-D-A-B", "D-A-B-C"],
    correct: 0,
    explanation: "Subject (A) + Verb phrase (B) + Domain (C) + Origin (D). Note: A-B-C-D is naturally logical here but segments were definitions."
  }
]

export default function RearrangeQuizPage() {
  const { toast } = useToast()
  const quizRef = useRef<HTMLDivElement>(null)
  const questionCardRef = useRef<HTMLDivElement>(null)
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
      // Scramble sets and ensure correct answer isn't predictable
      const selectedQuestions = REARRANGE_QUIZ_DATA.slice(range[0], range[1]).map(q => {
        const cloned = { ...q, options: [...q.options] }
        const initialCorrectOpt = cloned.options[cloned.correct]
        const shuffled = [...cloned.options].sort(() => Math.random() - 0.5)
        cloned.options = shuffled
        cloned.correct = shuffled.indexOf(initialCorrectOpt)
        return cloned
      })
      
      const shuffledQuestions = [...selectedQuestions].sort(() => Math.random() - 0.5)
      setQuestions(shuffledQuestions)
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
      toast({ title: "Logic Set Complete!", description: "Check your +5/-1 accuracy." })
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

  if (selectedSetIndex === null) {
    return (
      <div className="min-h-screen bg-background py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <header className="mb-12 text-center animate-fade-in-up">
            <Badge variant="outline" className="mb-4 py-1 px-4 border-primary/40 text-primary font-bold uppercase tracking-widest">
              Section 6: Logic Selection
            </Badge>
            <h1 className="text-4xl font-headline font-bold mb-4">Sequential Logic Practice</h1>
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
                  <CardDescription className="mt-2">High-tier sentence rearrangement items for targeted practice.</CardDescription>
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
                Pick Another Set
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
            <Badge variant="outline" className="h-8 px-4 rounded-full border-primary/20 text-primary font-bold">Subject Code 101</Badge>
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
                      className="flex-1 cursor-pointer text-lg font-bold text-foreground leading-tight"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <span className="inline-block w-12 text-primary font-mono">{i + 1}.</span>
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
          <Button size="lg" className="px-10 h-12 rounded-xl font-bold shadow-lg group" onClick={nextQuestion} disabled={answers[q.id] === undefined}>
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
