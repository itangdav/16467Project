import './App.css';
import ChatBot from 'react-simple-chatbot';
import PaperIcon from './icons/paper.svg';
import RockIcon from './icons/rock.svg';
import ScissorIcon from './icons/scissors.svg';

function RPS() {
  return (
    <div className="rps-component">
      <div className="robot-move">
        <img src={PaperIcon} />
      </div>
      <div className="human-move">
        <img src={RockIcon} />
      </div>
    </div>
  )
}

function App() {
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
        message: "Please pick your move:",
        trigger: String(startId + 1),
      },
      {
        id: String(startId + 1),
        component: <RPS />,
        trigger: String(startId + 2),
      },
      {
        id: String(startId + 2),
        message: "I win!",
        trigger: String(startId + 3),
      }
    ]
  }

  let steps = starter.concat(newRound(starter.length + 1));
  steps.push({
    id: String(steps.length + 1),
    message: "Thank you for playing!",
    end: true,
  });

  return (
    <div className="App">
      {/* <header className="App-header"> </header> */}
      {/* <RPS /> */}

      <ChatBot
        steps={steps}
      />
    </div>
  );
}

export default App;
