import { Post } from "../types/posts.types.js"

export const MOCK_POSTS: Post[] = [
  {
    id: 1,
    author: "anonymous",
    isAnonymous: true,
    createdAt: "2026-04-07T22:13:00Z",
    title: "Har börjat få mörka tankar igen",
    description: "Jag trodde att jag mådde bättre men de senaste veckorna har tankarna kommit tillbaka. Jag känner mig trött på allt och vet inte riktigt vem jag kan prata med utan att oroa folk i min närhet. Har någon varit här och hittat ett sätt att bryta spiralen?",
    categories: ["anxiety", "loneliness"],
    triggerTags: ["suicidal-thoughts"],
    likes: 54
  },
  {
    id: 2,
    author: "throwaway_parent",
    isAnonymous: true,
    createdAt: "2026-04-06T19:02:00Z",
    title: "Kämpar med att vara en bra förälder",
    description: "Jag älskar mitt barn men känner mig konstant överväldigad och otillräcklig. Ibland blir jag arg snabbare än jag vill och får direkt skuldkänslor efteråt. Är rädd att jag gör fel hela tiden. Hur hanterar man den här pressen?",
    categories: ["parenting", "stress"],
    triggerTags: [],
    likes: 38
  },
  {
    id: 3,
    author: "lost_inside",
    isAnonymous: true,
    createdAt: "2026-04-05T23:47:00Z",
    title: "Svårt att sluta med destruktiva vanor",
    description: "Jag har hamnat i ett mönster där jag använder saker för att fly från hur jag mår. För stunden känns det bättre men efteråt mår jag ännu sämre. Jag skäms och vet inte hur jag ska bryta det här beteendet.",
    categories: ["other", "anxiety"],
    triggerTags: ["substance-abuse", "self-harm"],
    likes: 41
  }
]