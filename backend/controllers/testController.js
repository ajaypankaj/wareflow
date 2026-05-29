export const dashboard = (
  req,
  res
) => {

  res.json({
    message:
      "Welcome to WareFlow Dashboard",
    user: req.user
  });
};

export const adminPanel = (
  req,
  res
) => {

  res.json({
    message:
      "Welcome Admin Panel"
  });
};