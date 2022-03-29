import React, { useState, useEffect } from 'react';

import './App.css';
import ChatBot from 'react-simple-chatbot';
import ButtonGroup from './components/ButtonGroup';
import RockIcon from './icons/rock.svg';
import PaperIcon from './icons/paper.svg';
import ScissorIcon from './icons/scissors.svg';

const MoveIcons = [RockIcon, PaperIcon, ScissorIcon];
const MoveNames = ["Rock", "Paper", "Scissors", "Shoot"];

function getGameStatus(roundId, robotMove, humanMove, saidByRobot) {
  console.log(robotMove, humanMove);
  let res = (humanMove - robotMove + 3) % 3;
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

function RPS({roundId, setSelected, triggerNextStep}) {
  const [localSelected, setLocalSelected] = useState(null);
  const [count, setCount] = useState(0);

  let randomMove = 2; //

  const [textDisplay, setTextDisplay] = useState("Pick a Move!");

  useEffect(() => {
    if (localSelected != null && count < 4) {
      console.log("Hi!");
      setTextDisplay(MoveNames[count]+"!");
      setTimeout(() => {
        setCount(count+1);
      }, 500);
    }
    if (count == 4) {
      setTextDisplay(getGameStatus(roundId, 2, localSelected, false));
      console.log(getGameStatus(roundId, 2, localSelected, true));
      triggerNextStep({trigger: getGameStatus(roundId, 2, localSelected, true)});
    }
  }, [localSelected, count]);

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
        setLocalSelected(i);
      }}
    />
  </div>;

  const playingDisplay = 
  <div className="rps-display">
    <div className={"move human-move" + (count<4 ? " rps-in-play":"")}>
      <img src={MoveIcons[randomMove]}/>
    </div>
    <div className={"move human-move" + (count<4 ? " rps-in-play":"")}>
      <img src={MoveIcons[localSelected]}/>
    </div>
  </div>;

  return (
    <div className="rps-component">
      <h2 className="rps-text">{textDisplay}</h2>
      {localSelected==null ? pickDisplay : playingDisplay}
    </div>
  )
}

function App() {
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
        component: <RPS roundId={roundId} setSelected={setPrevMove}/>,
        waitAction: true,
      },
      {
        id: `round-${roundId}-robot-win`,
        message: "I WIN :D",
        trigger: roundId==20 ? "thank" : `round-${roundId+1}`,
      },
      {
        id: `round-${roundId}-robot-lose`,
        message: "i lost :(",
        trigger: roundId==20 ? "thank" : `round-${roundId+1}`,
      },
      {
        id: `round-${roundId}-tie`,
        message: "Oh, a tie.",
        trigger: roundId==20 ? "thank" : `round-${roundId+1}`,
      }
    ];
  }

  let steps = starter;

  for (let i=1; i<=20; i++) {
    steps = steps.concat(newRound(i));
    console.log(steps);
  }

  steps.push({
    id: 'thank',
    message: "Thank you for playing!",
    end: true,
  });

  console.log(steps);

  console.log(prevMove);

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
