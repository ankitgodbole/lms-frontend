

function isEmail(email) {
     const emailRegex =
      /^[a-zA-Z0-9](\.?[a-zA-Z0-9_-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z]{2,})+$/;
    if (!emailRegex.test(email)) return false;

    return true;
  
}

export default isEmail;