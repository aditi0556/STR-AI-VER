import { FlipText } from "@/components/magicui/flip-text";

("use client");

import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import useOutsideClick from "./hooks/useOutsideClick.jsx";

export default function Timeline() {
  const [active, setActive] = useState(null);
  const ref = useRef(null);
  const id = useId();

  useEffect(() => {
    function onKeyDown(event) {
      if (event.key === "Escape") {
        setActive(false);
      }
    }

    if (active && typeof active === "object") {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      <AnimatePresence>
        {active && typeof active === "object" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 h-full w-full z-10"
          />
        )}
      </AnimatePresence>
      <AnimatePresence>
        {active && typeof active === "object" ? (
          <div className="fixed inset-0    grid place-items-center z-[100]">
            <motion.button
              key={`button-${active.title}-${id}`}
              layout
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.05,
                },
              }}
              className="flex absolute top-2 right-2 lg:hidden items-center justify-center bg-white rounded-full h-6 w-6"
              onClick={() => setActive(null)}
            >
              <CloseIcon />
            </motion.button>
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] h-full md:h-fit md:max-h-[90%]  flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden"
            >
              {/* //img */}
              {/* <motion.div layoutId={`image-${active.title}-${id}`}>
                <img
                  width={200}
                  height={200}
                  src={active.src}
                  alt={active.title}
                  className="w-full h-80 lg:h-60 sm:rounded-tr-lg sm:rounded-tl-lg object-cover object-top"
                />
              </motion.div> */}

              <div className="bg-black/80 dark:bg-white  ">
                <div className="flex justify-between items-start p-4">
                  <div className="">
                    <motion.h3
                      layoutId={`title-${active.title}-${id}`}
                      className="font-bold dark:text-neutral-700 text-white"
                    >
                      {active.title}
                    </motion.h3>
                    <motion.p
                      layoutId={`description-${active.description}-${id}`}
                      className="text-neutral-600 font-bold dark:text-white"
                    >
                      {active.description}
                    </motion.p>
                  </div>

                  {/* <motion.a
                    layoutId={`button-${active.title}-${id}`}
                    href={active.ctaLink}
                    target="_blank"
                    className="px-4 py-3 text-sm rounded-full font-bold bg-green-500 text-white"
                  >
                    {active.ctaText}
                  </motion.a> */}
                </div>
                <div className="pt-4 relative px-4 ">
                  <motion.div
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-white p-2 text-xs md:text-sm lg:text-base h-40 md:h-fit pb-10 flex flex-col items-start  overflow-auto dark:text-neutral-600 [mask:linear-gradient(to_bottom,white,white,transparent)] [scrollbar-width:none] [-ms-overflow-style:none] [-webkit-overflow-scrolling:touch]"
                  >
                    {typeof active.content === "function"
                      ? active.content()
                      : active.content}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        ) : null}
      </AnimatePresence>
      <ul className="max-w-4xl mx-auto w-full gap-4 bg-[#060607]  rounded-2xl border-2">
        {cards.map((card, index) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={`card-${card.title}-${id}`}
            onClick={() => setActive(card)}
            className="p-4  flex flex-col md:flex-row justify-between items-center hover:bg-neutral-800 dark:hover:bg-amber-50 rounded-xl cursor-pointer"
          >
            <div className="flex flex-col md:flex-row  ">
              <motion.div layoutId={`image-${card.title}-${id}`}>
                {/* <img
                  width={100}
                  height={100}
                  src={card.src}
                  alt={card.title}
                  className="h-40 w-40 md:h-14 md:w-14 rounded-lg object-cover object-top"
                /> */}
              </motion.div>
              <div className="">
                <motion.h3
                  layoutId={`title-${card.title}-${id}`}
                  className="font-medium dark:text-neutral-800 text-neutral-200 text-center md:text-left"
                >
                  {card.title}
                </motion.h3>
                <motion.p
                  layoutId={`description-${card.description}-${id}`}
                  className="dark:text-neutral-600 text-white  text-center md:text-left"
                >
                  {card.description}
                </motion.p>
              </div>
            </div>
            <motion.button
              layoutId={`button-${card.title}-${id}`}
              className="px-4 py-2 text-sm rounded-full font-bold bg-gray-100 hover:bg-blue-700  hover:text-white text-black mt-4 md:mt-0"
            >
              View
            </motion.button>
          </motion.div>
        ))}
      </ul>
    </>
  );
}

export const CloseIcon = () => {
  return (
    <motion.svg
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      exit={{
        opacity: 0,
        transition: {
          duration: 0.05,
        },
      }}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 text-black"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M18 6l-12 12" />
      <path d="M6 6l12 12" />
    </motion.svg>
  );
};

const cards = [
  {
    description: "Learn The Basics",
    title: "Step 1",
    ctaText: "View",
    content: () => {
      return (
        <p>
          <ul>
            <li>Learn any language C++/Python/Java</li>
            <li>Build Up Logical Thinking</li>
            <li>Learn STL</li>
            <li>Learn basic Recursion</li>
            <li>Learn Basic Hashing</li>
          </ul>
        </p>
      );
    },
  },
  {
    description: "Learn Sorting Techniques",
    title: "Step 2",
    ctaText: "Play",

    content: () => {
      return (
        <p>
          <ul>
            <li>
              Sorting-1
              <ul>
                <li>&nbsp;&nbsp;Bubble Sort</li>
                <li>&nbsp;&nbsp;Selection Sort</li>
                <li>&nbsp;&nbsp;Insertion Sort</li>
              </ul>
            </li>
            <li>
              Sorting-2
              <li>&nbsp;&nbsp;Merge Sort</li>
              <li>&nbsp;&nbsp;Quick Sort</li>
            </li>
          </ul>
        </p>
      );
    },
  },

  {
    description: "Learn Arrays",
    title: "Step 3",
    ctaText: "Play",
    content: () => {
      return (
        <>
          <p>
            Cover the Basics <br />
            Cover Problem on Sliding Window
          </p>
        </>
      );
    },
  },
  {
    description: "Binary Search",
    title: "Step 4",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          {" "}
          Binary Search on Arrays
          <br />
          Binary Search on 2D Arrays
        </p>
      );
    },
  },
  {
    description: "Learn Strings",
    title: "Step 5",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Cover basics of Strings <br />
          Cover Esy to Medium Level Probleme
        </p>
      );
    },
  },
  {
    description: "Learn Linked Lists",
    title: "Step 6",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Types: singly, doubly, circular <br /> Insertion, deletion (head,
          tail, middle) <br /> Reversing a list
          <br /> Detecting cycles (Floyd’s algo), intersection of lists
        </p>
      );
    },
  },
  {
    description: "Learn Recursion",
    title: "Step 7",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Base & recursive cases <br /> Tail vs. head recursion <br />
          Backtracking problems (N-Queens, Sudoku) <br />
          Subset & permutation generation <br /> Recursion tree & time
          complexity <br /> Replace recursion with iteration (e.g. stack
          simulating recursion)
        </p>
      );
    },
  },
  {
    description: "Learn Bit Manipulation",
    title: "Step 8",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          {" "}
          Bitwise operators
          <br /> Check odd/even, set/clear/toggle bits
          <br /> Counting set bits (Brian Kernighan's algo)
          <br /> Power of 2 check
          <br /> XOR tricks (single number problems)
          <br /> Bitmask DP basics
        </p>
      );
    },
  },
  {
    description: "Learn Stacks And Queues",
    title: "Step 9",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Stack operations (push, pop, peek) <br /> Queue types: simple,
          circular, deque <br /> Applications: parentheses matching, browser
          history, undo, BFS
          <br /> Stack using queue and vice versa
        </p>
      );
    },
  },
  {
    description: "Heaps",
    title: "Step 10",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Types: Min-heap, Max-heap <br /> Heapify, insert, delete operations{" "}
          <br />
          Priority Queue implementation <br /> Heap sort <br />
          K largest/smallest elements <br /> Merge K sorted arrays/lists
        </p>
      );
    },
  },
  {
    description: "Greedy Algorithms",
    title: "Step 11",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          {" "}
          Activity selection <br /> Fractional knapsack <br /> Job scheduling
          with deadlines <br /> Huffman coding <br /> Minimum coins to make
          change <br /> Greedy vs. DP comparison
        </p>
      );
    },
  },
  {
    description: "Binary Trees and Binary Search Trees",
    title: "Step 12",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Traversals: inorder, preorder, postorder, level order <br /> Height,
          diameter, balance check <br /> Lowest common ancestor <br /> BST
          operations (insert, delete, search) <br />
          Tree to DLL, serialization/deserialization
        </p>
      );
    },
  },
  {
    description: "Graphs",
    title: "Step 13",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          {" "}
          Representations: adjacency list/matrix <br /> Traversals: BFS, DFS
          <br />
          Topological sort <br /> Shortest path: Dijkstra, Bellman-Ford <br />
          MST: Kruskal, Prim <br /> Union-Find, cycle detection
        </p>
      );
    },
  },
  {
    description: "Dynamic Programming",
    title: "Step 14",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Memoization, tabulation <br />
          0/1 Knapsack, unbounded knapsack <br /> Longest common subsequence
          (LCS), LIS <br />
          Matrix DP (e.g., unique paths) <br /> State transitions & overlapping
          subproblems
        </p>
      );
    },
  },
  {
    description: "Tries",
    title: "Step 15",
    ctaText: "Play",
    content: () => {
      return (
        <p>
          Insert, search, delete word <br /> Prefix search <br /> Word
          suggestions (autocomplete) <br /> Count prefix frequency <br /> Word
          dictionary with wildcards
        </p>
      );
    },
  },
];
