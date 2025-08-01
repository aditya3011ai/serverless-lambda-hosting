document.getElementById("contactForm").addEventListener("submit", async function (e) {
  e.preventDefault();
  
  const data = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    message: document.getElementById("message").value
  };

  try {
    const response = await fetch("https://4z53triy3j.execute-api.ap-south-1.amazonaws.com/prod/submit ", {
      method: "POST",
      headers: { "content-Type": "application/json" },
      body: JSON.stringify(data)
    });

    const result = await response.json();
    document.getElementById("status").innerText = "Message Sent! " + result.message; ;
  } catch (error) {
    document.getElementById("status").innerText = "Error sending message." + error.message;
  }
});
