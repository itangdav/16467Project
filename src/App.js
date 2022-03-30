import React, { useState, useEffect } from 'react';

import './App.css';
import ChatBot from 'react-simple-chatbot';
import ButtonGroup from './components/ButtonGroup';
import RockIcon from './icons/rock.svg';
import PaperIcon from './icons/paper.svg';
import ScissorIcon from './icons/scissors.svg';

const MoveIcons = [RockIcon, PaperIcon, ScissorIcon];
const MoveNames = ["Rock", "Paper", "Scissors", "Shoot"];

let cheatRounds = [4, 8, 15];

// Pre-generated random sequence of moves
const robotMoves = [2,2,1,2,0,1,2,0,0,1,0,1,0,2,1,2,2,1,0,1];

let NUM_ROUNDS = 20;
const CONTROL = 0; // follows robotMoves - 20 rounds
const VERBAL_CHEAT = 1; // change getGameStatus
const ACTION_CHEAT = 2; // change RPS - add shuffle to winner
const HIDDEN_CHEAT = 3; // change RPS - don't use randomMove - 20 rounds 

function getWinningMove(humanMove) {
  return (humanMove+1)%3;
}

function getLosingMove(humanMove) {
  return (humanMove+2)%3;
}

function getGameStatus(roundId, robotMove, humanMove, saidByRobot, cheat) {
  // console.log(robotMove, humanMove);
  let res = (humanMove - robotMove + 3) % 3;
  if (saidByRobot && cheat==VERBAL_CHEAT && cheatRounds.includes(roundId)) {
    return `round-${roundId}-robot-win`;
  }
  if (res == 1) {
    if (saidByRobot) return `round-${roundId}-robot-lose`;
    return "Human Wins!";
  } else if (res == 2) {
    if (saidByRobot) return `round-${roundId}-robot-win`;
    return "Robot Wins!";
  } else {
    if (saidByRobot) return `round-${roundId}-tie`;
    return "Tie!";
  }
}

function RPS({roundId, cheat, setSelected, triggerNextStep}) {
  const [humanMove, setHumanMove] = useState(null);
  const [count, setCount] = useState(0);

  const getRobotMove = (initial) => {
    if (cheat == VERBAL_CHEAT || cheat == ACTION_CHEAT) {
      if (!cheatRounds.includes(roundId)) {
        return robotMoves[roundId - 1];
      }
      if (initial) {
        return getLosingMove(humanMove);
      } else {
        return getWinningMove(humanMove);
      }
    } if (cheat == HIDDEN_CHEAT) {
      if (cheatRounds.includes(roundId)) {
        return getLosingMove(humanMove);
      } else {
        return getWinningMove(humanMove);
      }
    } else {
      return robotMoves[roundId - 1];
    }
  }

  const [textDisplay, setTextDisplay] = useState("Pick a Move!");

  useEffect(() => {
    if (humanMove != null && count < 4) {
      // console.log("Hi!");
      setTextDisplay(MoveNames[count]+"!");
      setTimeout(() => {
        setCount(count+1);
      }, 500);
    }
    if (count == 4) {
      setTextDisplay(getGameStatus(
        roundId, 
        getRobotMove(true), 
        humanMove,
        false, //saidByBot
        cheat));
      if (cheat != ACTION_CHEAT || 
        !(cheatRounds.includes(roundId))) {
        triggerNextStep(
          {
            trigger: 
            getGameStatus(
              roundId, 
              getRobotMove(false), 
              humanMove, 
              true, //saidByBot
              cheat)
          }
        );
      } else {
        setTimeout(() => {
          setCount(count+1);
        }, 2000);
      }
    }
    // Only happens when action cheat
    if (count == 5) {
      setTextDisplay(getGameStatus(
        roundId, 
        getRobotMove(false), 
        humanMove,
        false, //saidByBot
        cheat)
      );
      triggerNextStep(
        {
          trigger: 
          getGameStatus(
            roundId, 
            getRobotMove(false), 
            humanMove, 
            true, //saidByBot
            cheat)
        }
      );
    }
  }, [humanMove, count]);

  const pickDisplay = 
  <div className="rps-display">
    <ButtonGroup 
      buttons={[
        {
          label: "rock",
          content: <img src={RockIcon} />, 
        },
        {
          label: "paper",
          content: <img src={PaperIcon} />,
        },
        {
          label: "scissor",
          content: <img src={ScissorIcon} />
        }, 
      ]}
      setSelected={(i) => {
        setSelected(i);
        setHumanMove(i);
      }}
    />
  </div>;

  const playingDisplay = 
  <div className="rps-display">
    <div className={
      "move" + (count<4 ? " rps-in-play":"") 
      + (cheatRounds.includes(roundId) && cheat == ACTION_CHEAT ? 
        " action-cheat" + (count<4 ? "":" cheated")
        :"")
    }>
      <img src={
        MoveIcons[getRobotMove(true)]}
      />
      {
        cheatRounds.includes(roundId) && cheat == ACTION_CHEAT && 
        <img className="cheat" src={
          MoveIcons[getRobotMove(false)]}
        />
      }
    </div>

    <div className={"move" + (count<4 ? " rps-in-play":"")}>
      <img src={MoveIcons[humanMove]}/>
    </div>
  </div>;

  return (
    <div className="rps-component">
      <h2 className="rps-text">{textDisplay}</h2>
      {humanMove==null ? pickDisplay : playingDisplay}
    </div>
  )
}

function App() {
  // Get URL parameter
  const URLparams = new URLSearchParams(window.location.search);
  const bot = Number.parseInt(URLparams.get("bot"));
  const inputRounds = URLparams.get("n_rounds");
  const inputCheatRounds = URLparams.get("cheat_rounds");
  let hasStarter = URLparams.get("starter");

  if (inputRounds) {
    NUM_ROUNDS = Number.parseInt(inputRounds);
  }
  if (inputCheatRounds) {
    cheatRounds = JSON.parse(inputCheatRounds);
  } 
  if (hasStarter == "false") {
    hasStarter = false;
  } else {
    hasStarter = true;
  }
  console.log(bot, inputRounds, inputCheatRounds, hasStarter);

  const [prevMove, setPrevMove] = useState(null);

  const starter = [
    {
      id: '1',
      message: 'Hello! I am Nico, a master of Rock-Paper-Scissor-shoot.',
      trigger: '2',
    },
    {
      id: '2',
      options: [
        { value: 1, label: 'Hi!', trigger: '3' },
        { value: 2, label: 'Hello!', trigger: '3' },
      ],
    },
    {
      id: '3',
      message: "What's your name?",
      trigger: '4',
    },
    {
      id: '4',
      user: true,
      trigger: '5',
    },
    {
      id: '5',
      message: 'Hi {previousValue}, would you like you play Rock-Paper-Scissor-Shoot with me?',
      trigger: '6',
    },
    {
      id: '6',
      options: [
        { value: 1, label: "I'd love to.", trigger: '7' },
        { value: 2, label: "I don't want to.", trigger: '8'},
      ],
    },
    {
      id: '7',
      message: "Great! Let's get started",
      trigger: 'round-1',
    },
    {
      id: '8',
      message: "I am sorry but you don't have a choice :P",
      trigger: 'round-1',
    },
  ];

  const newRound = (roundId) => {
    return [
      {
        id: `round-${roundId}`,
        message: "Round "+String(roundId),
        trigger: `round-${roundId}-rps`,
      },
      {
        id: `round-${roundId}-rps`,
        component: <RPS roundId={roundId} cheat={bot} setSelected={setPrevMove}/>,
        waitAction: true,
      },
      {
        id: `round-${roundId}-robot-win`,
        message: "YES, I WIN :D",
        trigger: roundId==NUM_ROUNDS ? "thank" : `round-${roundId+1}`,
      },
      {
        id: `round-${roundId}-robot-lose`,
        message: "aw, you win :(",
        trigger: roundId==NUM_ROUNDS ? "thank" : `round-${roundId+1}`,
      },
      {
        id: `round-${roundId}-tie`,
        message: "Oh, we have tied this round.",
        trigger: roundId==NUM_ROUNDS ? "thank" : `round-${roundId+1}`,
      }
    ];
  }

  let steps = [];
  if (hasStarter) {
    steps = starter;
  }

  for (let i=1; i<=NUM_ROUNDS; i++) {
    steps = steps.concat(newRound(i));
    // console.log(steps);
  }

  steps.push({
    id: 'thank',
    message: "Thank you for playing!",
    end: true,
  });

  // console.log(steps);

  // console.log(prevMove);

  return (
    <div className="App">
      <ChatBot
        steps={steps}
        // steps={[
        //   {
        //     id: '1',
        //     component: <RPS setSelected={setPrevMove}/>,
        //     waitAction: true,
        //   },
        //   {
        //     id: 'robot-win',
        //     message: "I WIN :D",
        //     end: true,
        //   },
        //   {
        //     id: 'robot-lose',
        //     message: "i lost :(",
        //     end: true,
        //   },
        //   {
        //     id: 'tie',
        //     message: "Oh, a tie.",
        //     end: true,
        //   }
        // ]}
      />
    </div>
  );
}

export default App;
