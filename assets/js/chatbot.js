/*--------------------------------------------------------------
# Portfolio Chatbot
# Client-side Q&A widget grounded entirely in this portfolio's
# own content (about, skills, experience, projects, contact).
# No backend / API key required.
--------------------------------------------------------------*/
(function () {
  'use strict';

  var LINKS = {
    email: 'aayaan.gautam1999@gmail.com',
    phone: '+977 9861941779',
    github: 'https://github.com/awesomeaayaan',
    linkedin: 'https://www.linkedin.com/in/aayaan-gautam-5017a3219/',
    twitter: 'https://twitter.com/aayaan_gautam',
    cv: 'cv/Resume_aayaan.pdf'
  };

  function link(url, text) {
    return '<a href="' + url + '" target="_blank" rel="noopener">' + text + '</a>';
  }

  var INTENTS = [
    {
      id: 'greeting',
      keywords: ['hi', 'hello', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening', 'yo'],
      response: "Hey there! I'm a small assistant trained only on Aayaan's portfolio. Ask me about his skills, experience, projects, education, or how to contact him."
    },
    {
      id: 'thanks',
      keywords: ['thanks', 'thank you', 'thx', 'appreciate', 'cheers'],
      response: "You're welcome! Anything else you'd like to know about Aayaan?"
    },
    {
      id: 'who',
      keywords: ['who are you', 'who is aayaan', 'about aayaan', 'tell me about', 'introduce', 'yourself', 'about you'],
      response: "Aayaan Gautam is a Machine Learning & RPA Developer based in Bhaktapur, Nepal, and a B.Sc. CSIT graduate from Bhaktapur Multiple Campus (Tribhuvan University). He specializes in building end-to-end automation solutions and predictive models, currently working as a Software Engineer at QuickFox Consulting."
    },
    {
      id: 'skills',
      keywords: ['skill', 'skills', 'technology', 'technologies', 'tech stack', 'stack', 'programming language', 'know', 'proficient', 'expertise'],
      response: "Aayaan's core skills span:<br>" +
        "&bull; <strong>Programming:</strong> Python, C/C++, C#, Java<br>" +
        "&bull; <strong>Web:</strong> HTML, CSS, JavaScript, Bootstrap<br>" +
        "&bull; <strong>Backend:</strong> Django, Flask, Streamlit, .NET<br>" +
        "&bull; <strong>Databases:</strong> MySQL, PostgreSQL, SQLite, MongoDB<br>" +
        "&bull; <strong>Cloud/DevOps:</strong> Docker, Azure App Service, Git<br>" +
        "&bull; <strong>ML/Data Science:</strong> Scikit-Learn, NLTK, SpaCy, TensorFlow, PyTorch<br>" +
        "&bull; <strong>Tools:</strong> Elastic Stack, Selenium, Tableau, Jira"
    },
    {
      id: 'experience',
      keywords: ['experience', 'work history', 'job', 'career', 'quickfox', 'employer', 'worked', 'current role', 'current job'],
      response: "Aayaan has been at <strong>QuickFox Consulting</strong> since April 2023:<br>" +
        "&bull; <strong>Software Engineer</strong> (Jan 2024 &ndash; Present) &mdash; RPA solutions for banks like Nepal Bank, NMB Bank, Prime Bank and Everest Bank, integrating with Pumori and Finacle core banking systems.<br>" +
        "&bull; <strong>Associate Software Engineer</strong> (Jun &ndash; Dec 2023) &mdash; Elastic Stack analytics, RPA/Selenium automation, and AI-based table detection + OCR for financial documents.<br>" +
        "&bull; <strong>Software Engineering Intern</strong> (Apr &ndash; Jun 2023) &mdash; RPA tooling (UiPath, Blue Prism), Nepali Sign Language Detection using computer vision."
    },
    {
      id: 'education',
      keywords: ['education', 'degree', 'university', 'college', 'campus', 'graduate', 'study', 'studied', 'csit'],
      response: "Aayaan holds a <strong>B.Sc. in Computer Science and Information Technology (CSIT)</strong> from Bhaktapur Multiple Campus, Tribhuvan University (2019 &ndash; 2023, Batch 2075)."
    },
    {
      id: 'projects',
      keywords: ['project', 'projects', 'portfolio', 'built', 'built anything', 'github repo', 'showcase'],
      response: "A few of Aayaan's notable projects:<br>" +
        "&bull; <strong>Movie Recommendation System</strong> &mdash; content-based filtering with Scikit-Learn + Streamlit. " + link('https://github.com/awesomeaayaan/Movie-Recommendation-System', 'View code') + "<br>" +
        "&bull; <strong>Laptop Price Prediction</strong> &mdash; Random Forest regression model. " + link('https://github.com/awesomeaayaan/LaptopPricePrediction', 'View code') + "<br>" +
        "&bull; <strong>E-Ticket E-commerce</strong> &mdash; C#/.NET Core movie ticket booking platform. " + link('https://github.com/awesomeaayaan/E-MovieTickets', 'Code') + " / " + link('https://eticketsproject.azurewebsites.net/', 'Live demo') + "<br>" +
        "&bull; <strong>Spam Email Classifier</strong> &mdash; NLTK-based text classification. " + link('https://github.com/awesomeaayaan/Spam_Email_Classification', 'View code')
    },
    {
      id: 'services',
      keywords: ['service', 'services', 'offer', 'hire', 'help with', 'can you do', 'does he do'],
      response: "Aayaan offers: Computer Vision, RPA Development, Machine Learning, Backend Architecture, Data Intelligence, and Neural Networks / NLP work. Check the Services section for details on each."
    },
    {
      id: 'contact',
      keywords: ['contact', 'email', 'reach', 'phone', 'call', 'hire him', 'get in touch', 'reach out', 'number'],
      response: "You can reach Aayaan at " + link('mailto:' + LINKS.email, LINKS.email) + " or " + LINKS.phone + ", or just use the contact form below. He's based in Bhaktapur, Nepal."
    },
    {
      id: 'cv',
      keywords: ['cv', 'resume', 'download cv', 'download resume'],
      response: "You can download his full resume here: " + link(LINKS.cv, 'Download CV (PDF)') + "."
    },
    {
      id: 'social',
      keywords: ['linkedin', 'github', 'twitter', 'social', 'follow'],
      response: "Find him online: " + link(LINKS.github, 'GitHub') + " &middot; " + link(LINKS.linkedin, 'LinkedIn') + " &middot; " + link(LINKS.twitter, 'Twitter') + "."
    },
    {
      id: 'location',
      keywords: ['location', 'where', 'based', 'live', 'city', 'country', 'nepal'],
      response: "Aayaan is based in Bhaktapur, Nepal."
    }
  ];

  var FALLBACK = "I'm only trained on this portfolio, so I might not have that one. Try asking about Aayaan's skills, experience, education, projects, services, or how to contact him.";

  function normalize(text) {
    return text.toLowerCase().replace(/[^\w\s]/g, ' ').replace(/\s+/g, ' ').trim();
  }

  function matchIntent(rawInput) {
    var input = normalize(rawInput);
    var best = null;
    var bestScore = 0;

    INTENTS.forEach(function (intent) {
      var score = 0;
      intent.keywords.forEach(function (kw) {
        if (input.indexOf(kw) !== -1) {
          score += kw.split(' ').length;
        }
      });
      if (score > bestScore) {
        bestScore = score;
        best = intent;
      }
    });

    return best ? best.response : FALLBACK;
  }

  function escapeHtml(str) {
    var div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var widget = document.createElement('div');
    widget.className = 'chatbot-widget';
    widget.innerHTML =
      '<div class="chatbot-hint" id="chatbot-hint">' +
        'Got a question about me? Ask away' +
        '<button type="button" class="chatbot-hint-close" id="chatbot-hint-close" aria-label="Dismiss">&times;</button>' +
      '</div>' +
      '<button class="chatbot-toggle" aria-label="Open chat assistant">' +
        '<i class="bx bx-bot"></i><i class="bx bx-x"></i>' +
      '</button>' +
      '<div class="chatbot-window">' +
        '<div class="chatbot-header">' +
          '<div class="bx-bot-icon"><i class="bx bx-bot"></i></div>' +
          '<div class="chatbot-header-text">' +
            '<h4>Portfolio Assistant</h4>' +
            '<span>Answers from this site</span>' +
          '</div>' +
        '</div>' +
        '<div class="chatbot-messages" id="chatbot-messages"></div>' +
        '<div class="chatbot-suggestions" id="chatbot-suggestions"></div>' +
        '<div class="chatbot-input-row">' +
          '<input type="text" id="chatbot-input" placeholder="Ask about skills, projects, contact..." autocomplete="off">' +
          '<button id="chatbot-send" aria-label="Send message"><i class="bx bx-send"></i></button>' +
        '</div>' +
      '</div>';

    document.body.appendChild(widget);

    var toggleBtn = widget.querySelector('.chatbot-toggle');
    var messagesEl = widget.querySelector('#chatbot-messages');
    var suggestionsEl = widget.querySelector('#chatbot-suggestions');
    var inputEl = widget.querySelector('#chatbot-input');
    var sendBtn = widget.querySelector('#chatbot-send');

    var SUGGESTIONS = ['Skills?', 'Experience?', 'Projects?', 'Contact?'];
    var opened = false;

    function renderSuggestions() {
      suggestionsEl.innerHTML = '';
      SUGGESTIONS.forEach(function (label) {
        var chip = document.createElement('button');
        chip.type = 'button';
        chip.className = 'chatbot-chip';
        chip.textContent = label;
        chip.addEventListener('click', function () {
          handleUserMessage(label.replace('?', ''));
        });
        suggestionsEl.appendChild(chip);
      });
    }

    function addMessage(text, sender) {
      var msg = document.createElement('div');
      msg.className = 'chatbot-msg ' + sender;
      if (sender === 'user') {
        msg.textContent = text;
      } else {
        msg.innerHTML = text;
      }
      messagesEl.appendChild(msg);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function showTyping() {
      var typing = document.createElement('div');
      typing.className = 'chatbot-typing';
      typing.id = 'chatbot-typing-indicator';
      typing.innerHTML = '<span></span><span></span><span></span>';
      messagesEl.appendChild(typing);
      messagesEl.scrollTop = messagesEl.scrollHeight;
    }

    function removeTyping() {
      var typing = document.getElementById('chatbot-typing-indicator');
      if (typing) typing.remove();
    }

    function handleUserMessage(text) {
      text = text.trim();
      if (!text) return;
      addMessage(escapeHtml(text), 'user');
      inputEl.value = '';
      showTyping();
      window.setTimeout(function () {
        removeTyping();
        addMessage(matchIntent(text), 'bot');
      }, 450 + Math.random() * 350);
    }

    var hintEl = widget.querySelector('#chatbot-hint');
    var hintCloseBtn = widget.querySelector('#chatbot-hint-close');
    var hintTimer = null;

    function dismissHint() {
      hintEl.classList.remove('show');
      if (hintTimer) {
        window.clearTimeout(hintTimer);
        hintTimer = null;
      }
      try { window.sessionStorage.setItem('chatbotHintSeen', '1'); } catch (e) {}
    }

    hintEl.addEventListener('click', function () {
      dismissHint();
      if (!opened) toggleBtn.click();
    });

    hintCloseBtn.addEventListener('click', function (e) {
      e.stopPropagation();
      dismissHint();
    });

    toggleBtn.addEventListener('click', function () {
      opened = !opened;
      widget.classList.toggle('open', opened);
      toggleBtn.classList.remove('pulse');
      dismissHint();
      if (opened) {
        inputEl.focus();
      }
    });

    sendBtn.addEventListener('click', function () {
      handleUserMessage(inputEl.value);
    });

    inputEl.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        handleUserMessage(inputEl.value);
      }
    });

    renderSuggestions();
    addMessage("Hi! I'm a small assistant that only knows what's on this portfolio. Ask me about Aayaan's skills, experience, projects, or how to get in touch.", 'bot');
    window.setTimeout(function () {
      toggleBtn.classList.add('pulse');
    }, 1500);

    var hintAlreadySeen = false;
    try { hintAlreadySeen = window.sessionStorage.getItem('chatbotHintSeen') === '1'; } catch (e) {}

    if (!hintAlreadySeen) {
      window.setTimeout(function () {
        hintEl.classList.add('show');
        hintTimer = window.setTimeout(dismissHint, 8000);
      }, 2500);
    }
  });
})();
