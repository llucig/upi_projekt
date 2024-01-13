function displayUserProfile() {
    const currentUser = getCurrentUser();
    const loggedInUserName = document.getElementById("loggedInUserName");
  
    if (currentUser) {
      // Postavljanje imena i prezimena
      loggedInUserName.innerText = `${currentUser.firstName} ${currentUser.lastName}`;
    }
  }