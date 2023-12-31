const authHeader = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  if (user && user.token) {
    // return { 'Authorization': `Bearer ${user.accessToken}` }
    return { "x-access-token": `${user.token}` };
  } else {
    return {};
  }
};

export default authHeader;
