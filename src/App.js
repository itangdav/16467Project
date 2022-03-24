import React, { useState, useEffect } from 'react';

import './App.css';
import ChatBot from 'react-simple-chatbot';
import ButtonGroup from './components/ButtonGroup';
import RockIcon from './icons/rock.svg';
import PaperIcon from './icons/paper.svg';
import ScissorIcon from './icons/scissors.svg';

const MoveIcons = [RockIcon, PaperIcon, ScissorIcon];
const MoveNames = ["Rock", "Paper", "Scissors", "Shoot"];

function getGameStatus(robotMove, humanMove, saidByRobot) {
  console.log(robotMove, humanMove);
  let res = (humanMove - robotMove + 3) % 3;
  if (res == 1) {
    if (saidByRobot) return "robot-lose";
    return "Human Wins!";
  } else if (res == 2) {
    if (saidByRobot) return "robot-win";
    return "Robot Wins!";
  } else {
    if (saidByRobot) return "tie";
    return "Tie!";
  }
}

function RPS({setSelected, triggerNextStep}) {
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
      }, 1000);
    }
    if (count == 4) {
      setTextDisplay(getGameStatus(2, localSelected, false));
      triggerNextStep({trigger: getGameStatus(2, localSelected, true)});
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
      trigger: '9',
    },
    {
      id: '8',
      message: "I am sorry but you don't have a choice :P",
      trigger: '9',
    },
  ];

  const newRound = (startId) => {
    return [
      {
        id: String(startId),
        component: <RPS setSelected={setPrevMove}/>,
        waitAction: true,
      },
    ]
  }

  const declare = [
    {
      id: 'robot-win',
      message: "I WIN :D",
      trigger: "thank",
    },
    {
      id: 'robot-lose',
      message: "i lost :(",
      trigger: "thank",
    },
    {
      id: 'tie',
      message: "Oh, a tie.",
      trigger: "thank",
    }
  ];

  let steps = starter.concat(newRound(starter.length + 1)).concat(declare);
  steps.push({
    id: 'thank',
    message: "Thank you for playing!",
    end: true,
  });

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
