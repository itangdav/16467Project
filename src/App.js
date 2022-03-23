import './App.css';
import ChatBot from 'react-simple-chatbot';

function App() {
  // Fixed 


  return (
    <div className="App">
      {/* <header className="App-header"> </header> */}

      <ChatBot
        steps={[
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
              { value: 1, label: "Sure. Let's get started!", trigger: '7' },
              { value: 2, label: "I don't want to.", trigger: '8'},
            ],
          },
          {
            id: '7',
            message: 'Great! Choose your move please.',
            trigger: '9',
          },
          {
            id: '8',
            message: "I am sorry but you don't have a choice :P You do have a choice about which move you wanna make:",
            trigger: '9',
          },
          {
            id: '9',
            options: [
              { value: 1, label: "Rock", trigger: '10' },
              { value: 1, label: "Paper", trigger: '10' },
              { value: 1, label: "Scissor", trigger: '10' },
            ]
          },
          {
            id: '10',
            message: "And my move is: Rock. I win!",
            end: true,
          }
        ]}
      />
    </div>
  );
}

export default App;
