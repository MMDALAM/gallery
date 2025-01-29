exports.home = async (req, res, next) => {
  try {
    const text = "asdasdasdasd";
    return res.json({ text });
  } catch (err) {
    next(err);
  }
};
