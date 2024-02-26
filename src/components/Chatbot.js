import React, { useEffect } from 'react';

const Chatbot = () => {
  useEffect(() => {
    // Dialogflow messenger script
    const scriptSrc = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
    let dfMessengerScript = document.querySelector(`script[src="${scriptSrc}"]`);
    if (!dfMessengerScript) {
      dfMessengerScript = document.createElement('script');
      dfMessengerScript.src = scriptSrc;
      dfMessengerScript.onload = () => {
        // Initialization of the chatbot
        const dfMessengerContainer = document.getElementById('df-messenger-container');
        if (!dfMessengerContainer.querySelector('df-messenger')) {
          const dfMessengerTag = document.createElement('df-messenger');
          dfMessengerTag.setAttribute('intent', 'WELCOME');
          dfMessengerTag.setAttribute('chat-title', 'WildlifeHorizon');
          dfMessengerTag.setAttribute('agent-id', 'a7e41f97-6364-4c56-84dc-351c962c9e56');
          dfMessengerTag.setAttribute('language-code', 'en');
          dfMessengerContainer.appendChild(dfMessengerTag);
        }
      };
      document.body.appendChild(dfMessengerScript);
    }
  }, []);

  return <div id="df-messenger-container" />;
};

export default Chatbot;
