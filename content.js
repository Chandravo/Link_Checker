// let popup;

// document.addEventListener("mouseover", function(event) {
//   let target = event.target;
//   while (target && target.tagName !== "A") {
//     target = target.parentElement;
//   }
//   if (target && target.href && (target.href.startsWith("http://") || target.href.startsWith("https://")) && !popup) {
//     const link = target.href;
//     popup = document.createElement("div");
//     popup.textContent = link;
//     popup.style.position = "fixed";
//     popup.style.top = event.clientY + "px";
//     popup.style.left = event.clientX + "px";
//     popup.style.backgroundColor = "white";
//     popup.style.border = "1px solid black";
//     popup.style.padding = "10px";
//     document.body.appendChild(popup);
//   }
// });

// document.addEventListener("mouseout", function(event) {
//   if (popup && !popup.contains(event.relatedTarget)) {
//     popup.remove();
//     popup = null;
//   }
// });

// let popup;

// function showPopup(link, x, y) {
//   popup = document.createElement("div");
//   popup.textContent = link;
//   popup.style.position = "fixed";
//   popup.style.top = y + "px";
//   popup.style.left = x + "px";
//   popup.style.backgroundColor = "white";
//   popup.style.border = "1px solid black";
//   popup.style.padding = "10px";
//   document.body.appendChild(popup);
// }

// function hidePopup() {
//   if (popup) {
//     popup.remove();
//     popup = null;
//   }
// }

// document.addEventListener("mouseover", function(event) {
//   let target = event.target;
//   while (target && target !== document && !target.tagName.match(/^(A|IFRAME)$/)) {
//     target = target.parentElement;
//   }
//   if (target && target.tagName === "A" && target.href && (target.href.startsWith("http://") || target.href.startsWith("https://")) && !popup) {
//     const link = target.href;
//     showPopup(link, event.clientX, event.clientY);
//   }
// });

// document.addEventListener("mouseout", function(event) {
//   if (popup && !popup.contains(event.relatedTarget)) {
//     hidePopup();
//   }
// });

// window.addEventListener("mouseover", function(event) {
//   const x = event.clientX;
//   const y = event.clientY;
//   const element = document.elementFromPoint(x, y);
//   let target = element;
//   while (target && target !== document && !target.tagName.match(/^(A|IFRAME)$/)) {
//     target = target.parentElement;
//   }
//   if (target && target.tagName === "A" && target.href && (target.href.startsWith("http://") || target.href.startsWith("https://")) && !popup) {
//     const link = target.href;
//     showPopup(link, x, y);
//   }
// });

// window.addEventListener("mouseout", function(event) {
//   if (popup && !popup.contains(event.relatedTarget)) {
//     hidePopup();
//   }
// });

// const fetch = require("node-fetch");
const API_KEY = 'JNMQeei4UGEtkhWajYIyRGtBw3IE6vZE';
const CORS_PROXY = 'https://cors-anywhere.herokuapp.com/';

function checkUrl(urlToCheck) {
  const encodedUrl = encodeURIComponent(urlToCheck);

  // create the API endpoint URL
  const apiEndpoint = CORS_PROXY + 'https://ipqualityscore.com/api/json/url/' + API_KEY + '/' + encodedUrl ;

  let resultString = 'The URL is ';

  // send the GET request to the API endpoint with the request body
  return fetch(apiEndpoint)
    .then(response => response.json())
    .then(data => {
      // handle the API response
      if (data.unsafe) {
        resultString += 'Unsafe\n';
      } else {
        resultString += 'Safe\n';
      }
      resultString += '\n|| Risk Score: ' + data.risk_score;

      return resultString;
    })
    .catch(error => {
      console.error('Error:', error);
    });
}

let popup;

function showPopup(link, x, y) {
  popup = document.createElement("div");
  // popup.textContent = link;
  popup.style.position = "fixed";
  popup.style.top = y + 20 + "px";
  popup.style.left = x + 20 + "px";
  popup.style.backgroundColor = "white";
  popup.style.border = "1px solid black";
  popup.style.padding = "10px";
  checkUrl(link)
  .then(result => {
    popup.textContent = result;
    // console.log(res);
    document.body.appendChild(popup);
  });
  
}

function hidePopup() {
  if (popup) {
    popup.remove();
    popup = null;
  }
}

document.addEventListener("mouseover", function(event) {
  let target = event.target;
  while (target && target !== document && !target.tagName.match(/^(A|IFRAME)$/)) {
    target = target.parentElement;
  }
  if (target && target.tagName === "A" && target.href && (target.href.startsWith("http://") || target.href.startsWith("https://")) && !popup) {
    const link = target.href;
    showPopup(link, event.clientX, event.clientY);
  } else if (target && target.tagName === "IFRAME") {
    const iframe = target;
    const rect = iframe.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    try {
      const doc = iframe.contentDocument;
      const element = doc.elementFromPoint(x, y);
      let aTag = element.closest('a');
      while (aTag && !aTag.href) {
        aTag = aTag.parentElement.closest('a');
      }
      if (aTag && !popup) {
        const link = aTag.href;
        showPopup(link, event.clientX, event.clientY);
      }
    } catch (err) {
      console.error(err);
    }
  }
});

document.addEventListener("mouseout", function(event) {
  if (popup && !popup.contains(event.relatedTarget)) {
    hidePopup();
  }
});

window.addEventListener("mouseover", function(event) {
  const x = event.clientX;
  const y = event.clientY;
  const element = document.elementFromPoint(x, y);
  let target = element;
  while (target && target !== document && !target.tagName.match(/^(A|IFRAME)$/)) {
    target = target.parentElement;
  }
  if (target && target.tagName === "A" && target.href && (target.href.startsWith("http://") || target.href.startsWith("https://")) && !popup) {
    const link = target.href;
    showPopup(link, x, y);
  } else if (target && target.tagName === "IFRAME") {
    const iframe = target;
    const rect = iframe.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    try {
      const doc = iframe.contentDocument;
      const element = doc.elementFromPoint(x, y);
      let aTag = element.closest('a');
      while (aTag && !aTag.href) {
        aTag = aTag.parentElement.closest('a');
      }
      if (aTag && !popup) {
        const link = aTag.href;
        showPopup(link, x, y);
      }
    } catch (err) {
      console.error(err);
    }
  }
});

window.addEventListener("mouseout", function(event) {
  if (popup && !popup.contains(event.relatedTarget)) {
    hidePopup();
  }
});

